import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { type Project } from "@shared/schema";

export function PortfolioSection() {
  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "text-green-500";
      case "in progress":
        return "text-yellow-500";
      default:
        return "text-blue-500";
    }
  };

  if (isLoading) {
    return (
      <section id="portfolio" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              My <span className="gradient-text">Portfolio</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glassmorphism rounded-xl overflow-hidden animate-pulse">
                <div className="w-full h-48 bg-muted"></div>
                <div className="p-6 space-y-4">
                  <div className="h-4 bg-muted rounded"></div>
                  <div className="h-6 bg-muted rounded"></div>
                  <div className="h-20 bg-muted rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="portfolio" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4" data-testid="portfolio-title">
            My <span className="gradient-text">Portfolio</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="portfolio-description">
            Explore my latest projects combining hardware innovation with software excellence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects?.map((project) => (
            <div
              key={project.id}
              className="glassmorphism rounded-xl overflow-hidden hover:glow-effect transition-all duration-300 transform hover:scale-105"
              data-testid={`project-card-${project.id}`}
            >
              {project.imageUrl && (
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                  data-testid={`project-image-${project.id}`}
                />
              )}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-medium" data-testid={`project-category-${project.id}`}>
                    {project.category}
                  </span>
                  <span className={`text-sm font-medium ${getStatusColor(project.status)}`} data-testid={`project-status-${project.id}`}>
                    {project.status}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-2" data-testid={`project-title-${project.id}`}>
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-4" data-testid={`project-description-${project.id}`}>
                  {project.description}
                </p>
                
                {project.technologies && project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4" data-testid={`project-technologies-${project.id}`}>
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="bg-secondary/50 text-secondary-foreground px-2 py-1 rounded text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex gap-2">
                  <Button
                    className="flex-1 bg-primary text-primary-foreground py-2 px-4 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                    data-testid={`project-view-details-${project.id}`}
                  >
                    View Details
                  </Button>
                  {project.githubUrl && (
                    <Button
                      variant="outline"
                      size="icon"
                      className="glassmorphism hover:glow-effect"
                      onClick={() => {
                        if (project.githubUrl) {
                          window.open(project.githubUrl, "_blank", "noopener,noreferrer");
                        }
                      }}
                      data-testid={`project-github-${project.id}`}
                    >
                      <i className="fab fa-github"></i>
                    </Button>
                  )}
                  {project.liveUrl && (
                    <Button
                      variant="outline"
                      size="icon"
                      className="glassmorphism hover:glow-effect"
                      onClick={() => {
                        if (project.liveUrl) {
                          window.open(project.liveUrl, "_blank", "noopener,noreferrer");
                        }
                      }}
                      data-testid={`project-live-${project.id}`}
                    >
                      <i className="fas fa-external-link-alt"></i>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {!projects || projects.length === 0 ? (
          <div className="text-center py-12" data-testid="no-projects">
            <p className="text-muted-foreground">No projects available at the moment.</p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
