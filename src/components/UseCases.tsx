import { Palette, Smartphone, Camera, Brain, Briefcase, Lightbulb } from "lucide-react";

const useCases = [
  {
    icon: Palette,
    title: "Artists & Designers",
    description: "Create concept art, illustrations, and visual inspiration for your creative projects.",
    features: ["Concept Art", "Character Design", "Visual References", "Style Exploration"]
  },
  {
    icon: Smartphone,
    title: "App & Web Developers",
    description: "Generate unique assets, backgrounds, and visual elements for your applications.",
    features: ["UI Assets", "Hero Images", "Icons & Graphics", "Placeholder Content"]
  },
  {
    icon: Camera,
    title: "Social Media Creators",
    description: "Stand out with eye-catching visuals that engage your audience across platforms.",
    features: ["Post Graphics", "Story Content", "Profile Assets", "Viral Visuals"]
  },
  {
    icon: Brain,
    title: "Students & Presenters",
    description: "Enhance presentations and educational content with compelling visual aids.",
    features: ["Presentation Slides", "Educational Graphics", "Infographic Elements", "Visual Essays"]
  },
  {
    icon: Briefcase,
    title: "Marketers & Brands",
    description: "Create stunning marketing materials and brand assets that convert customers.",
    features: ["Ad Creatives", "Brand Assets", "Product Mockups", "Campaign Visuals"]
  },
  {
    icon: Lightbulb,
    title: "Entrepreneurs",
    description: "Bring your business ideas to life with professional-quality visual content.",
    features: ["Pitch Decks", "Product Concepts", "Brand Identity", "Marketing Materials"]
  }
];

const UseCases = () => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-card/20 backdrop-blur-sm border border-accent/30 rounded-full px-6 py-3 mb-6">
            <Lightbulb className="w-5 h-5 text-accent" />
            <span className="text-sm font-medium text-foreground">Use Cases</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-foreground">Perfect for</span>{" "}
            <span className="text-gradient">every creator</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From artists to entrepreneurs, Imageto empowers professionals across industries to create stunning visuals.
          </p>
        </div>
        
        {/* Use Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => (
            <div key={index} className="card-ai group">
              {/* Icon */}
              <div className="mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-accent/20 to-primary/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <useCase.icon className="w-8 h-8 text-accent" />
                </div>
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-gradient transition-colors duration-300">
                {useCase.title}
              </h3>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {useCase.description}
              </p>
              
              {/* Features List */}
              <div className="space-y-2">
                {useCase.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-card rounded-3xl p-12 border border-border/50 shadow-ai-card">
            <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              <span className="text-gradient">Join 500K+ creators</span> who trust Imageto
            </h3>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Start creating professional-quality images today. No experience required, unlimited possibilities.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-ai-primary">
                Start Creating for Free
              </button>
              <button className="btn-ai-outline">
                View Example Gallery
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UseCases;