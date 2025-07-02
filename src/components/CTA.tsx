import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Zap, Crown } from "lucide-react";

const CTA = () => {
  return (
    <section id="cta" className="py-24 px-6 bg-gradient-to-br from-background via-primary/5 to-accent/5">
      <div className="max-w-4xl mx-auto text-center">
        {/* Main CTA */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm border border-primary/30 rounded-full px-6 py-3 mb-8 animate-glow">
            <Star className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-foreground">Ready to Create?</span>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-bold mb-8">
            <span className="text-gradient">Try Imageto</span>
            <br />
            <span className="text-glow">Free Today</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            No sign-up needed. Just type and create stunning AI images in seconds.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
            <Button 
              className="btn-ai-primary group text-xl px-12 py-6"
              onClick={() => {
                alert('🎨 AI Image Creator coming soon! Connect to Supabase to enable full functionality including image generation, user accounts, and more.');
              }}
            >
              <Zap className="mr-3 w-6 h-6" />
              Start Creating Now
              <ArrowRight className="ml-3 w-6 h-6 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
          
          <p className="text-sm text-muted-foreground">
            Free forever • No credit card required • Create unlimited images
          </p>
        </div>
        
        {/* Feature Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div 
            className="card-ai group cursor-pointer"
            onClick={() => {
              const featuresSection = document.getElementById('features');
              featuresSection?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-2xl mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-ai-button">
              <Zap className="w-8 h-8 text-primary-foreground" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-gradient transition-colors duration-300">
              Explore Gallery
            </h3>
            <p className="text-muted-foreground text-sm">
              See what others have created with Imageto
            </p>
          </div>
          
          <div 
            className="card-ai group cursor-pointer"
            onClick={() => {
              const howItWorksSection = document.getElementById('how-it-works');
              howItWorksSection?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-secondary rounded-2xl mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-ai-glow">
              <Star className="w-8 h-8 text-secondary-foreground" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-gradient transition-colors duration-300">
              Try Examples
            </h3>
            <p className="text-muted-foreground text-sm">
              Start with our curated prompt examples
            </p>
          </div>
          
          <div 
            className="card-ai group cursor-pointer relative overflow-hidden"
            onClick={() => {
              alert('💎 Pro features coming soon! Connect to Supabase to unlock premium styles, HD downloads, and advanced AI models.');
            }}
          >
            <div className="absolute top-2 right-2">
              <Crown className="w-5 h-5 text-accent" />
            </div>
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-2xl mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <Crown className="w-8 h-8 text-accent-foreground" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-gradient transition-colors duration-300">
              Upgrade to Pro
            </h3>
            <p className="text-muted-foreground text-sm">
              Unlock premium styles and HD downloads
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;