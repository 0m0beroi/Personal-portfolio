export function AboutSection() {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4" data-testid="about-title">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="about-description">
            Passionate about creating innovative solutions that merge hardware expertise with modern software development.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Education Card */}
          <div className="glassmorphism rounded-xl p-8 hover:glow-effect transition-all duration-300" data-testid="education-card">
            <div className="text-center mb-6">
              <i className="fas fa-graduation-cap text-4xl text-primary mb-4"></i>
              <h3 className="text-2xl font-semibold mb-2">Education</h3>
            </div>
            <div className="space-y-4">
              <div data-testid="education-details">
                <h4 className="font-semibold text-primary">B.Tech in Electronics & Communication</h4>
                <p className="text-muted-foreground">BBDNIIT</p>
                <p className="text-sm text-muted-foreground">Graduating 2027</p>
              </div>
            </div>
          </div>

          {/* Certifications Card */}
          <div className="glassmorphism rounded-xl p-8 hover:glow-effect transition-all duration-300" data-testid="certifications-card">
            <div className="text-center mb-6">
              <i className="fas fa-certificate text-4xl text-primary mb-4"></i>
              <h3 className="text-2xl font-semibold mb-2">Certifications</h3>
            </div>
            <div className="space-y-4">
              <div className="border-l-4 border-primary pl-4" data-testid="certification-cloud">
                <h4 className="font-semibold">Cloud Computing</h4>
                <p className="text-sm text-muted-foreground">Infosys Springboard</p>
              </div>
              <div className="border-l-4 border-primary pl-4" data-testid="certification-drone">
                <h4 className="font-semibold">Drone Bootcamp</h4>
                <p className="text-sm text-muted-foreground">CDAC Patna</p>
              </div>
            </div>
          </div>

          {/* Bio Card */}
          <div className="glassmorphism rounded-xl p-8 hover:glow-effect transition-all duration-300 md:col-span-2 lg:col-span-1" data-testid="bio-card">
            <div className="text-center mb-6">
              <i className="fas fa-user text-4xl text-primary mb-4"></i>
              <h3 className="text-2xl font-semibold mb-2">Bio</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed" data-testid="bio-text">
              A dedicated engineering student with a unique blend of ECE hardware knowledge and modern web development skills. 
              Passionate about IoT, embedded systems, and creating digital experiences that make technology accessible.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
