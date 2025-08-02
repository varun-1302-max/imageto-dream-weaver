import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Loader2, Wand2, Download, RefreshCw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [currentPrompt, setCurrentPrompt] = useState("");

  const examplePrompts = [
    "A monkey in Kashi, speaking Telugu in a low poly 3D style",
    "A futuristic cityscape at sunset with flying cars",
    "A magical forest with glowing mushrooms and fairy lights",
    "A steampunk robot playing piano in an elegant ballroom",
    "A cosmic whale swimming through nebula clouds in space"
  ];

  const validateInput = (input: string): { valid: boolean; error?: string } => {
    const trimmed = input.trim();
    
    if (!trimmed) {
      return { valid: false, error: "Please enter a prompt" };
    }
    
    if (trimmed.length < 3) {
      return { valid: false, error: "Prompt must be at least 3 characters long" };
    }
    
    if (trimmed.length > 1000) {
      return { valid: false, error: "Prompt must be less than 1000 characters" };
    }
    
    return { valid: true };
  };

  const generateImage = async () => {
    const validation = validateInput(prompt);
    if (!validation.valid) {
      toast.error(validation.error);
      return;
    }

    setIsGenerating(true);
    try {
      console.log('Generating image with prompt:', prompt.trim());
      
      const { data, error } = await supabase.functions.invoke('generate-image', {
        body: { prompt: prompt.trim() }
      });

      console.log('Image generation response:', { data, error });

      if (error) {
        console.error('Image generation error:', error);
        // Handle different types of errors
        if (error.message?.includes('401') || error.message?.includes('Authentication')) {
          toast.error("Please sign in to generate images");
        } else if (error.message?.includes('429') || error.message?.includes('rate limit')) {
          toast.error("Too many requests. Please wait before trying again.");
        } else if (error.message?.includes('Failed to fetch')) {
          toast.error("Network error. Please check your connection and try again.");
        } else {
          toast.error(`Service error: ${error.message}`);
        }
        throw error;
      }

      if (data?.error) {
        console.error('API returned error:', data.error);
        // Handle API-returned errors with user-friendly messages
        const errorMessage = data.error;
        if (errorMessage.includes('inappropriate') || errorMessage.includes('content')) {
          toast.error("Please try a different prompt that's appropriate for image generation");
        } else if (errorMessage.includes('rate limit')) {
          toast.error("You've reached your generation limit. Please try again later.");
        } else if (errorMessage.includes('OpenAI')) {
          toast.error("AI service temporarily unavailable. Please try again later.");
        } else {
          toast.error(`Generation failed: ${errorMessage}`);
        }
        throw new Error(data.error);
      }

      if (!data?.imageUrl) {
        console.error('No image URL returned:', data);
        toast.error("Image generation failed - no image was returned");
        throw new Error("No image was generated");
      }

      console.log('Image generated successfully:', data.imageUrl);
      setGeneratedImage(data.imageUrl);
      setCurrentPrompt(prompt.trim());
      toast.success("Image generated successfully!");
    } catch (error: any) {
      console.error('Error generating image:', error);
      
      // Only show additional error if one wasn't already shown above
      if (!error.message?.includes('rate limit') && 
          !error.message?.includes('inappropriate') && 
          !error.message?.includes('Authentication')) {
        if (error.message?.includes('Failed to fetch')) {
          toast.error("Network error. Please check your connection and try again.");
        } else if (!toast) {
          toast.error("Image generation failed. Please try again.");
        }
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadImage = () => {
    if (!generatedImage) return;
    
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = `imageto-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Image downloaded!");
  };

  const useExamplePrompt = (example: string) => {
    setPrompt(example);
  };

  return (
    <section id="image-generator" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-card/20 backdrop-blur-sm border border-primary/30 rounded-full px-6 py-3 mb-6">
            <Wand2 className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-foreground">AI Image Creator</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-gradient">Create</span>{" "}
            <span className="text-foreground">Amazing</span>{" "}
            <span className="text-glow">Images</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Describe what you want to see and watch AI bring your imagination to life in seconds.
          </p>
        </div>

        {/* Input Section */}
        <Card className="card-ai p-8 mb-8">
          <div className="space-y-6">
            <div>
              <Label htmlFor="prompt" className="text-lg font-semibold mb-4 block">
                Describe your image
              </Label>
                <Input
                  id="prompt"
                  value={prompt}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Prevent extremely long inputs
                    if (value.length <= 1000) {
                      setPrompt(value);
                    }
                  }}
                  placeholder="A monkey in Kashi, speaking Telugu in a low poly 3D style"
                  className="h-12 text-lg"
                  onKeyPress={(e) => e.key === 'Enter' && !isGenerating && generateImage()}
                  maxLength={1000}
                />
                {prompt.length > 900 && (
                  <p className="text-sm text-amber-500 mt-1">
                    {1000 - prompt.length} characters remaining
                  </p>
                )}
            </div>

            <Button
              onClick={generateImage}
              disabled={isGenerating || !prompt.trim()}
              className="btn-ai-primary w-full h-12 text-lg"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                  Creating your image...
                </>
              ) : (
                <>
                  <Wand2 className="mr-2 w-5 h-5" />
                  Generate Image
                </>
              )}
            </Button>
          </div>
        </Card>

        {/* Example Prompts */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 text-center">Try these examples:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {examplePrompts.map((example, index) => (
              <Button
                key={index}
                variant="outline"
                onClick={() => useExamplePrompt(example)}
                className="h-auto p-4 text-left whitespace-normal text-sm"
                disabled={isGenerating}
              >
                "{example}"
              </Button>
            ))}
          </div>
        </div>

        {/* Generated Image */}
        {generatedImage && (
          <Card className="card-ai p-6">
            <div className="text-center space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">Your Generated Image</h3>
                <p className="text-muted-foreground mb-4">"{currentPrompt}"</p>
              </div>
              
              <div className="relative inline-block">
                <img
                  src={generatedImage}
                  alt={currentPrompt}
                  className="max-w-full h-auto rounded-lg shadow-ai-glow"
                />
              </div>
              
              <div className="flex gap-4 justify-center">
                <Button
                  onClick={downloadImage}
                  className="btn-ai-outline"
                >
                  <Download className="mr-2 w-4 h-4" />
                  Download
                </Button>
                
                <Button
                  onClick={generateImage}
                  disabled={isGenerating}
                  className="btn-ai-secondary"
                >
                  <RefreshCw className="mr-2 w-4 h-4" />
                  Regenerate
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </section>
  );
};

export default ImageGenerator;