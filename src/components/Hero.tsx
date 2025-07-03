import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-background">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="AI Image Generation" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/60 to-transparent"></div>
      </div>
      
      {/* Animated Background Mesh */}
      <div className="absolute inset-0 bg-ai-mesh animate-pulse-slow"></div>
      
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-card/20 backdrop-blur-sm border border-primary/30 rounded-full px-6 py-3 mb-8 animate-float">
          <Sparkles className="w-5 h-5 text-primary" />
          <span className="text-sm font-medium text-foreground">AI-Powered Image Generation</span>
        </div>
        
        {/* Main Heading */}
        <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight">
          <span className="text-gradient">Create</span>{" "}
          <span className="text-foreground">stunning</span>
          <br />
          <span className="text-foreground">images with</span>{" "}
          <span className="text-glow">AI</span>
        </h1>
        
        {/* Subheading */}
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
          Transform your imagination into breathtaking visuals in seconds. 
          Whether you're an artist, marketer, or dreamer — <span className="text-gradient font-semibold">Imageto</span> brings your ideas to life.
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
          <Button 
            className="btn-ai-primary group"
            onClick={() => {
              const createSection = document.getElementById('image-generator');
              createSection?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Start Creating Now
            <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Button>
          
          <Button 
            className="btn-ai-outline group"
            onClick={() => {
              const featuresSection = document.getElementById('features');
              featuresSection?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <Zap className="mr-2 w-5 h-5" />
            Explore Gallery
          </Button>
        </div>
        
        {/* Quick Demo Text */}
        <div className="text-sm text-muted-foreground">
          <span className="opacity-75">Try it free:</span>{" "}
          <span className="text-gradient font-medium">"A monkey in Kashi, speaking Telugu in a low poly 3D style"</span>
        </div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-float"></div>
      <div className="absolute bottom-32 right-20 w-32 h-32 bg-secondary/20 rounded-full blur-xl animate-float" style={{animationDelay: '2s'}}></div>
      <div className="absolute top-1/2 right-10 w-16 h-16 bg-accent/20 rounded-full blur-xl animate-float" style={{animationDelay: '4s'}}></div>
    </section>
  );
};

export default Hero;