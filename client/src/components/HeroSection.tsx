import { Button } from "@/components/ui/button";

export function HeroSection() {
  const scrollToPortfolio = () => {
    const element = document.querySelector("#portfolio");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20">
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 background-pattern"></div>
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="glassmorphism rounded-2xl p-12 max-w-4xl mx-auto">
          <div className="floating-animation">
            <h1 className="text-5xl md:text-7xl font-bold mb-6" data-testid="hero-title">
              Om <span className="gradient-text">Oberoi</span>
            </h1>
          </div>

          <p className="text-xl md:text-2xl text-muted-foreground mb-4" data-testid="hero-subtitle">
            Electronics & Communication Engineer | Web Developer | Innovator
          </p>

          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto" data-testid="hero-description">
            Bridging the gap between hardware and software with cutting-edge solutions in embedded systems and full-stack development.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={scrollToPortfolio}
              className="bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:glow-effect transition-all duration-300 transform hover:scale-105"
              data-testid="cta-view-work"
            >
              View My Work
            </Button>
            <Button
              variant="outline"
              onClick={scrollToContact}
              className="glassmorphism px-8 py-4 rounded-lg font-semibold hover:glow-effect transition-all duration-300 transform hover:scale-105"
              data-testid="cta-get-in-touch"
            >
              Get In Touch
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
