-- Fix the security issues from the previous migration

-- First, let's create policies for any tables that have RLS enabled but no policies
-- Check if we need to create policies for the image_generations table

-- Create a policy for image_generations INSERT operations that require authentication
CREATE POLICY "Users can create their own images - authenticated only" 
ON public.image_generations 
FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = user_id);

-- Update existing policies to require authentication instead of allowing anonymous access
DROP POLICY IF EXISTS "Users can view their own images" ON public.image_generations;
DROP POLICY IF EXISTS "Users can update their own images" ON public.image_generations;
DROP POLICY IF EXISTS "Users can delete their own images" ON public.image_generations;

CREATE POLICY "Users can view their own images - authenticated only" 
ON public.image_generations 
FOR SELECT 
TO authenticated 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own images - authenticated only" 
ON public.image_generations 
FOR UPDATE 
TO authenticated 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own images - authenticated only" 
ON public.image_generations 
FOR DELETE 
TO authenticated 
USING (auth.uid() = user_id);

-- Fix storage policies to require authentication
DROP POLICY IF EXISTS "Users can view their own images" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own images" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own images" ON storage.objects;

-- Create proper storage policies for authenticated users only
CREATE POLICY "Authenticated users can view generated images" 
ON storage.objects 
FOR SELECT 
TO authenticated 
USING (bucket_id = 'generated-images');

CREATE POLICY "Authenticated users can upload generated images" 
ON storage.objects 
FOR INSERT 
TO authenticated 
WITH CHECK (bucket_id = 'generated-images' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Authenticated users can update their own generated images" 
ON storage.objects 
FOR UPDATE 
TO authenticated 
USING (bucket_id = 'generated-images' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Authenticated users can delete their own generated images" 
ON storage.objects 
FOR DELETE 
TO authenticated 
USING (bucket_id = 'generated-images' AND auth.uid()::text = (storage.foldername(name))[1]);