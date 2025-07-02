import { Sparkles, Twitter, Github, Mail, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-16 px-6 bg-gradient-to-t from-background to-muted/20 border-t border-border/50">
      <div className="max-w-6xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold text-gradient">Imageto</span>
            </div>
            
            <p className="text-muted-foreground mb-6 max-w-md leading-relaxed">
              Create stunning AI-generated images with just a few words. 
              Transform your imagination into breathtaking visuals in seconds.
            </p>
            
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 bg-card/50 hover:bg-primary/20 rounded-lg flex items-center justify-center transition-colors duration-300 group">
                <Twitter className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
              </a>
              <a href="#" className="w-10 h-10 bg-card/50 hover:bg-primary/20 rounded-lg flex items-center justify-center transition-colors duration-300 group">
                <Github className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
              </a>
              <a href="#" className="w-10 h-10 bg-card/50 hover:bg-primary/20 rounded-lg flex items-center justify-center transition-colors duration-300 group">
                <Mail className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
              </a>
            </div>
          </div>
          
          {/* Product Links */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Product</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300">Features</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300">Gallery</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300">Pricing</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300">API</a></li>
            </ul>
          </div>
          
          {/* Company Links */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300">About</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300">Blog</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300">Careers</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300">Contact</a></li>
            </ul>
          </div>
        </div>
        
        {/* Newsletter */}
        <div className="bg-gradient-card rounded-2xl p-8 mb-12 border border-border/50">
          <div className="text-center md:text-left md:flex md:items-center md:justify-between">
            <div className="mb-6 md:mb-0">
              <h4 className="text-xl font-bold text-foreground mb-2">
                Stay updated with <span className="text-gradient">AI innovations</span>
              </h4>
              <p className="text-muted-foreground">
                Get the latest features, tips, and creative inspiration delivered to your inbox.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 md:max-w-md">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 bg-input border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="btn-ai-secondary whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        {/* Bottom Footer */}
        <div className="pt-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground text-sm">
              © 2024 Imageto. All rights reserved.
            </p>
            
            <div className="flex items-center gap-6 text-sm">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300">Privacy Policy</a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300">Terms of Service</a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300">Cookie Policy</a>
            </div>
            
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500" />
              <span>for creators</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;