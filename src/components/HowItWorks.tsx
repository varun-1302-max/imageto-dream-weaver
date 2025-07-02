import { MessageSquare, Palette, Wand2, Download } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    title: "Type your imagination",
    description: "Describe your vision in simple words. Our AI understands natural language and creative concepts.",
    example: '"A monkey in Kashi, speaking Telugu in a low poly 3D style"'
  },
  {
    icon: Palette,
    title: "Select your style",
    description: "Choose from dozens of artistic styles: Realistic, 3D, Anime, Cyberpunk, Oil Painting, Watercolor & more.",
    example: "Realistic • 3D • Anime • Cyberpunk"
  },
  {
    icon: Wand2,
    title: "Generate with AI",
    description: "Watch our smart engine transform your text into stunning visuals in real-time rendering.",
    example: "Magic happens in seconds"
  },
  {
    icon: Download,
    title: "Edit or Download",
    description: "Customize your creation, regenerate variations, or export in HD or 4K quality.",
    example: "HD • 4K • Multiple formats"
  }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-card/20 backdrop-blur-sm border border-primary/30 rounded-full px-6 py-3 mb-6">
            <Wand2 className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-foreground">How It Works</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-gradient">Simple.</span>{" "}
            <span className="text-foreground">Powerful.</span>{" "}
            <span className="text-glow">Magical.</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Creating stunning AI images has never been easier. Follow these simple steps and watch your imagination come to life.
          </p>
        </div>
        
        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="card-ai group relative">
              {/* Step Number */}
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg shadow-ai-button">
                {index + 1}
              </div>
              
              {/* Icon */}
              <div className="mb-6">
                <step.icon className="w-12 h-12 text-primary group-hover:scale-110 transition-transform duration-300" />
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-gradient transition-colors duration-300">
                {step.title}
              </h3>
              
              <p className="text-muted-foreground mb-4 leading-relaxed">
                {step.description}
              </p>
              
              {/* Example */}
              <div className="text-sm text-primary/80 font-medium bg-primary/10 rounded-lg px-3 py-2 border border-primary/20">
                {step.example}
              </div>
            </div>
          ))}
        </div>
        
        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-lg text-muted-foreground mb-6">
            Ready to create your first AI masterpiece?
          </p>
          <button 
            className="btn-ai-primary"
            onClick={() => {
              const ctaSection = document.getElementById('cta');
              ctaSection?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Try It Free Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;