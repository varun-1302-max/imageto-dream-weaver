import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import UseCases from "@/components/UseCases";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-background">
      <Hero />
      <HowItWorks />
      <Features />
      <UseCases />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;
