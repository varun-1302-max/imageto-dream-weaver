import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Trash2, History, RefreshCw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

interface ImageGeneration {
  id: string;
  prompt: string;
  image_url: string;
  created_at: string;
}

const ImageHistory = () => {
  const [images, setImages] = useState<ImageGeneration[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchImages = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('image_generations')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) {
        console.error('Error fetching images:', error);
        toast.error("Failed to load image history");
      } else {
        setImages(data || []);
      }
    } catch (error) {
      console.error('Error fetching images:', error);
      toast.error("Failed to load image history");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [user]);

  const downloadImage = async (imageUrl: string, prompt: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `imageto-${prompt.slice(0, 30).replace(/[^a-zA-Z0-9]/g, '-')}-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      window.URL.revokeObjectURL(url);
      toast.success("Image downloaded!");
    } catch (error) {
      toast.error("Failed to download image");
    }
  };

  const deleteImage = async (id: string) => {
    try {
      const { error } = await supabase
        .from('image_generations')
        .delete()
        .eq('id', id);

      if (error) {
        toast.error("Failed to delete image");
      } else {
        setImages(prev => prev.filter(img => img.id !== id));
        toast.success("Image deleted");
      }
    } catch (error) {
      toast.error("Failed to delete image");
    }
  };

  if (loading) {
    return (
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your image history...</p>
        </div>
      </section>
    );
  }

  if (images.length === 0) {
    return (
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <History className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2">No images yet</h3>
          <p className="text-muted-foreground mb-6">
            Create your first AI image to see it appear here!
          </p>
          <Button
            onClick={() => {
              const generator = document.getElementById('image-generator');
              generator?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-ai-primary"
          >
            Generate Your First Image
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section id="image-history" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-card/20 backdrop-blur-sm border border-primary/30 rounded-full px-6 py-3 mb-6">
            <History className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-foreground">Your Creations</span>
          </div>
          
          <div className="flex items-center justify-center gap-4 mb-6">
            <h2 className="text-4xl md:text-6xl font-bold">
              <span className="text-gradient">Image</span>{" "}
              <span className="text-foreground">History</span>
            </h2>
            
            <Button
              onClick={fetchImages}
              variant="ghost"
              size="sm"
              className="gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </Button>
          </div>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore all the amazing images you've created with AI.
          </p>
        </div>

        {/* Images Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image) => (
            <Card key={image.id} className="card-ai overflow-hidden group">
              <div className="aspect-square relative overflow-hidden">
                <img
                  src={image.image_url}
                  alt={image.prompt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                
                {/* Overlay with actions */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                  <Button
                    size="sm"
                    onClick={() => downloadImage(image.image_url, image.prompt)}
                    className="btn-ai-outline"
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => deleteImage(image.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <div className="p-4">
                <p className="text-sm text-muted-foreground mb-2">
                  {new Date(image.created_at).toLocaleDateString()}
                </p>
                <p className="text-sm line-clamp-2 text-foreground">
                  "{image.prompt}"
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImageHistory;