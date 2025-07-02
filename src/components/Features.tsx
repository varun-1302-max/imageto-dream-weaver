import { Check, Zap, Shield, Smartphone, Palette, Edit, Star, Globe } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Text-to-Image Magic",
    description: "Transform any description into stunning visuals with our advanced AI engine."
  },
  {
    icon: Star,
    title: "Ultra-Realistic Outputs",
    description: "Generate photorealistic images or choose from stylized artistic renderings."
  },
  {
    icon: Globe,
    title: "Real-Time Rendering",
    description: "Watch your images come to life in seconds with our lightning-fast processing."
  },
  {
    icon: Edit,
    title: "Voice & Text Editing",
    description: "Modify your creations with simple voice commands or text instructions."
  },
  {
    icon: Palette,
    title: "Multiple Art Styles",
    description: "Choose from dozens of styles: 3D, Anime, Oil Painting, Watercolor, and more."
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your creations are safe with enterprise-grade security and privacy protection."
  },
  {
    icon: Smartphone,
    title: "Mobile & Desktop",
    description: "Create stunning images anywhere with our responsive cross-platform design."
  },
  {
    icon: Check,
    title: "HD & 4K Downloads",
    description: "Export your masterpieces in multiple high-quality formats for any purpose."
  }
];

const Features = () => {
  return (
    <section id="features" className="py-24 px-6 bg-gradient-to-br from-background to-muted/30">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-card/20 backdrop-blur-sm border border-secondary/30 rounded-full px-6 py-3 mb-6">
            <Star className="w-5 h-5 text-secondary" />
            <span className="text-sm font-medium text-foreground">Features You'll Love</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-foreground">Everything you need to</span>
            <br />
            <span className="text-gradient">create amazing images</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Packed with powerful features designed to unleash your creativity and bring your wildest ideas to life.
          </p>
        </div>
        
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="card-ai group">
              {/* Icon */}
              <div className="mb-6">
                <div className="w-16 h-16 bg-gradient-secondary rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-ai-glow">
                  <feature.icon className="w-8 h-8 text-secondary-foreground" />
                </div>
              </div>
              
              {/* Content */}
              <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-gradient transition-colors duration-300">
                {feature.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
        
        {/* Feature Highlights */}
        <div className="bg-gradient-card rounded-3xl p-8 md:p-12 border border-border/50 shadow-ai-card">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                <span className="text-gradient">Premium Quality</span> meets{" "}
                <span className="text-glow">Free Access</span>
              </h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <Check className="w-6 h-6 text-primary flex-shrink-0" />
                  <span className="text-muted-foreground">No sign-up required for basic features</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-6 h-6 text-primary flex-shrink-0" />
                  <span className="text-muted-foreground">Unlimited creativity with premium styles</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-6 h-6 text-primary flex-shrink-0" />
                  <span className="text-muted-foreground">Commercial use rights included</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-6 h-6 text-primary flex-shrink-0" />
                  <span className="text-muted-foreground">24/7 customer support</span>
                </div>
              </div>
              
              <button 
                className="btn-ai-secondary"
                onClick={() => {
                  alert('💎 Pro features coming soon! Connect to Supabase to unlock premium styles, HD downloads, and advanced AI models.');
                }}
              >
                Upgrade to Pro
              </button>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-primary/20 rounded-2xl p-8 backdrop-blur-sm border border-primary/30">
                <div className="text-center">
                  <div className="text-4xl font-bold text-gradient mb-2">10M+</div>
                  <div className="text-muted-foreground mb-4">Images Generated</div>
                  
                  <div className="text-4xl font-bold text-gradient mb-2">500K+</div>
                  <div className="text-muted-foreground mb-4">Happy Creators</div>
                  
                  <div className="text-4xl font-bold text-gradient mb-2">99.9%</div>
                  <div className="text-muted-foreground">Uptime</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;