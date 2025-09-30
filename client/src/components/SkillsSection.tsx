import { useEffect, useRef, useState } from "react";
import { type Skill, type Service } from "@shared/schema";

// Hardcoded skills data (temporary fix for API issues)
const hardcodedSkills: Skill[] = [
  { id: "1", name: "Electronics & Circuit Design", category: "Hardware", percentage: 90, iconClass: "fas fa-microchip" },
  { id: "2", name: "Embedded Systems (C/C++)", category: "Technical", percentage: 85, iconClass: "fas fa-code" },
  { id: "3", name: "React & Node.js", category: "Software", percentage: 80, iconClass: "fab fa-react" },
  { id: "4", name: "IoT & Cloud Integration", category: "Technical", percentage: 75, iconClass: "fas fa-cloud" },
  { id: "5", name: "MongoDB & Database Design", category: "Software", percentage: 70, iconClass: "fas fa-database" }
];

// Hardcoded services data (temporary fix for API issues)
const hardcodedServices: Service[] = [
  {
    id: "1",
    title: "Web Development",
    description: "Full-stack web applications using modern frameworks and databases with responsive design principles.",
    iconClass: "fas fa-code"
  },
  {
    id: "2", 
    title: "Project Development",
    description: "Custom embedded systems and IoT solutions from concept to deployment with hardware-software integration.",
    iconClass: "fas fa-microchip"
  },
  {
    id: "3",
    title: "Technical Tutoring", 
    description: "Mentoring in electronics, programming, and engineering concepts with hands-on project guidance.",
    iconClass: "fas fa-chalkboard-teacher"
  }
];

export function SkillsSection() {
  const skills = hardcodedSkills;
  const services = hardcodedServices;
  const skillsLoading = false;
  const servicesLoading = false;

  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5, rootMargin: "0px 0px -50px 0px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  if (skillsLoading || servicesLoading) {
    return (
      <section id="skills" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Skills & <span className="gradient-text">Services</span>
            </h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="glassmorphism rounded-xl p-8 animate-pulse">
              <div className="h-8 bg-muted rounded mb-8"></div>
              <div className="space-y-6">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-4 bg-muted rounded"></div>
                    <div className="h-3 bg-muted rounded"></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="glassmorphism rounded-xl p-6 animate-pulse">
                  <div className="h-20 bg-muted rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="skills" ref={sectionRef} className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4" data-testid="skills-title">
            Skills & <span className="gradient-text">Services</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="skills-description">
            Expertise spanning from hardware design to full-stack development.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Skills Section */}
          <div className="glassmorphism rounded-xl p-8" data-testid="skills-container">
            <h3 className="text-2xl font-semibold mb-8 text-center">Technical Skills</h3>

            <div className="space-y-6">
              {skills?.map((skill) => (
                <div key={skill.id} className="skill-item" data-testid={`skill-${skill.id}`}>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium flex items-center gap-2" data-testid={`skill-name-${skill.id}`}>
                      {skill.iconClass && <i className={skill.iconClass}></i>}
                      {skill.name}
                    </span>
                    <span className="text-muted-foreground" data-testid={`skill-percentage-${skill.id}`}>
                      {skill.percentage}%
                    </span>
                  </div>
                  <div className="bg-muted rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-primary to-accent h-3 rounded-full progress-bar transition-all duration-1000 ease-in-out"
                      style={{
                        width: isVisible ? `${skill.percentage}%` : "0%",
                      }}
                      data-testid={`skill-bar-${skill.id}`}
                    ></div>
                  </div>
                </div>
              ))}

              {!skills || skills.length === 0 ? (
                <div className="text-center py-8" data-testid="no-skills">
                  <p className="text-muted-foreground">No skills data available.</p>
                </div>
              ) : null}
            </div>
          </div>

          {/* Services Section */}
          <div className="space-y-6" data-testid="services-container">
            <h3 className="text-2xl font-semibold mb-8 text-center">Services</h3>

            {services?.map((service) => (
              <div
                key={service.id}
                className="glassmorphism rounded-xl p-6 hover:glow-effect transition-all duration-300"
                data-testid={`service-${service.id}`}
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/20 p-3 rounded-lg">
                    <i className={`${service.iconClass} text-primary text-xl`}></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2" data-testid={`service-title-${service.id}`}>
                      {service.title}
                    </h4>
                    <p className="text-muted-foreground" data-testid={`service-description-${service.id}`}>
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {!services || services.length === 0 ? (
              <div className="text-center py-8" data-testid="no-services">
                <p className="text-muted-foreground">No services data available.</p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
