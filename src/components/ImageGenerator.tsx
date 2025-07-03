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

  const generateImage = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }

    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-image', {
        body: { prompt: prompt.trim() }
      });

      if (error) {
        throw error;
      }

      if (data.error) {
        throw new Error(data.error);
      }

      setGeneratedImage(data.imageUrl);
      setCurrentPrompt(prompt);
      toast.success("Image generated successfully!");
    } catch (error) {
      console.error('Error generating image:', error);
      toast.error(error.message || "Failed to generate image. Please try again.");
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
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="A monkey in Kashi, speaking Telugu in a low poly 3D style"
                className="h-12 text-lg"
                onKeyPress={(e) => e.key === 'Enter' && !isGenerating && generateImage()}
              />
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