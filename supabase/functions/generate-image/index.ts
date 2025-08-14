import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

// Security headers including CORS
const securityHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Content-Security-Policy': "default-src 'self'; img-src 'self' data: https:; script-src 'self'",
};

// Rate limiting store (in-memory for demo - use Redis in production)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Input validation
const validatePrompt = (prompt: string): { valid: boolean; error?: string } => {
  if (!prompt || typeof prompt !== 'string') {
    return { valid: false, error: 'Prompt is required and must be a string' };
  }
  
  const trimmed = prompt.trim();
  if (trimmed.length < 3) {
    return { valid: false, error: 'Prompt must be at least 3 characters long' };
  }
  
  if (trimmed.length > 1000) {
    return { valid: false, error: 'Prompt must be less than 1000 characters' };
  }
  
  // Basic content filtering
  const bannedWords = ['nsfw', 'nude', 'naked', 'sex', 'porn', 'explicit'];
  const lowerPrompt = trimmed.toLowerCase();
  for (const word of bannedWords) {
    if (lowerPrompt.includes(word)) {
      return { valid: false, error: 'Prompt contains inappropriate content' };
    }
  }
  
  return { valid: true };
};

// Rate limiting check
const checkRateLimit = (userId: string): { allowed: boolean; error?: string } => {
  const now = Date.now();
  const key = userId;
  const limit = 10; // 10 requests per hour
  const windowMs = 60 * 60 * 1000; // 1 hour
  
  const userLimit = rateLimitStore.get(key);
  
  if (!userLimit || now > userLimit.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + windowMs });
    return { allowed: true };
  }
  
  if (userLimit.count >= limit) {
    return { allowed: false, error: 'Rate limit exceeded. Please try again later.' };
  }
  
  userLimit.count++;
  return { allowed: true };
};

// Sanitize error messages
const sanitizeError = (error: any): string => {
  if (typeof error === 'string') {
    // Remove sensitive information
    return error.replace(/api[_-]?key|token|secret|password/gi, '[REDACTED]');
  }
  
  if (error?.message) {
    return sanitizeError(error.message);
  }
  
  return 'An unexpected error occurred';
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: securityHeaders });
  }

  try {
    console.log('=== Generate Image Function Started ===');
    const startTime = Date.now();
    
    // Parse and validate request
    let requestData;
    try {
      requestData = await req.json();
    } catch (e) {
      console.error('Invalid JSON in request body');
      return new Response(
        JSON.stringify({ error: "Invalid request format" }), 
        { 
          status: 400, 
          headers: { ...securityHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }
    
    const { prompt, size = "1024x1024" } = requestData;
    console.log('Request payload received:', { promptLength: prompt?.length, size });
    
    // Validate prompt
    const promptValidation = validatePrompt(prompt);
    if (!promptValidation.valid) {
      return new Response(
        JSON.stringify({ error: promptValidation.error }), 
        { 
          status: 400, 
          headers: { ...securityHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY');
    console.log('Environment variables check:', {
      supabaseUrl: !!supabaseUrl,
      supabaseKey: !!supabaseKey,
      openAIKey: !!Deno.env.get('OPENAI_API_KEY'),
      allEnvKeys: Object.keys(Deno.env.toObject())
    });
    
    if (!supabaseUrl || !supabaseKey) {
      console.error('Missing Supabase environment variables');
      return new Response(
        JSON.stringify({ error: "Service temporarily unavailable" }), 
        { 
          status: 503, 
          headers: { ...securityHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Generate anonymous user ID for rate limiting
    const userIP = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'anonymous';
    const anonymousUserId = `anon_${userIP}`;
    
    // Check rate limiting
    const rateLimitCheck = checkRateLimit(anonymousUserId);
    if (!rateLimitCheck.allowed) {
      console.warn(`Rate limit exceeded for IP ${userIP}`);
      return new Response(
        JSON.stringify({ error: rateLimitCheck.error }), 
        { 
          status: 429, 
          headers: { 
            ...securityHeaders, 
            'Content-Type': 'application/json',
            'Retry-After': '3600' // 1 hour
          } 
        }
      );
    }

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      console.error('OpenAI API key not configured');
      return new Response(
        JSON.stringify({ error: "Service temporarily unavailable" }), 
        { 
          status: 503, 
          headers: { ...securityHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('Generating image with prompt length:', prompt.length);
    
    // Content moderation check using OpenAI
    try {
      const moderationResponse = await fetch('https://api.openai.com/v1/moderations', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openAIApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          input: prompt
        }),
      });

      if (moderationResponse.ok) {
        const moderationData = await moderationResponse.json();
        if (moderationData.results?.[0]?.flagged) {
          console.warn('Content flagged by moderation:', moderationData.results[0].categories);
          return new Response(
            JSON.stringify({ error: "Content not appropriate for image generation" }), 
            { 
              status: 400, 
              headers: { ...securityHeaders, 'Content-Type': 'application/json' } 
            }
          );
        }
      }
    } catch (moderationError) {
      console.warn('Moderation check failed:', moderationError);
      // Continue without moderation if service is down
    }

    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'dall-e-3',
        prompt: prompt,
        n: 1,
        size: size,
        quality: 'hd',
        response_format: 'url'
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('OpenAI API error:', { status: response.status, error: errorData });
      
      // Sanitize error message
      const sanitizedMessage = sanitizeError(errorData.error?.message || 'Image generation failed');
      
      return new Response(
        JSON.stringify({ error: sanitizedMessage }), 
        { 
          status: response.status >= 500 ? 503 : 400, 
          headers: { ...securityHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const data = await response.json();
    const imageUrl = data.data[0].url;

    // Download the image from OpenAI URL for storage
    const imageResponse = await fetch(imageUrl);
    const imageBlob = new Uint8Array(await imageResponse.arrayBuffer());
    
    // Generate unique filename
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `public/${timestamp}-${crypto.randomUUID()}.png`;

    // Upload to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('generated-images')
      .upload(filename, imageBlob, {
        contentType: 'image/png',
        cacheControl: '3600'
      });

    let storedImageUrl = imageUrl; // Fallback to OpenAI URL
    if (!uploadError && uploadData) {
      // Get public URL
      const { data: urlData } = supabase.storage
        .from('generated-images')
        .getPublicUrl(filename);
      
      if (urlData?.publicUrl) {
        storedImageUrl = urlData.publicUrl;
      }
    } else {
      console.warn('Failed to upload to storage, using OpenAI URL:', uploadError);
    }

    const processingTime = Date.now() - startTime;
    console.log('Image generated and saved successfully', { processingTime, anonymousUserId });

    return new Response(
      JSON.stringify({ 
        imageUrl: storedImageUrl,
        prompt: prompt.trim()
      }), 
      {
        headers: { ...securityHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in generate-image function:', error);
    
    // Sanitize error message
    const sanitizedMessage = sanitizeError(error);
    
    return new Response(
      JSON.stringify({ error: sanitizedMessage }), 
      {
        status: 500,
        headers: { ...securityHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});