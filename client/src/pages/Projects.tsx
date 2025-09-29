import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { type Project } from "@shared/schema";
import { motion } from "framer-motion";

export default function Projects() {
  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-500/20 text-green-500 hover:bg-green-500/30";
      case "in progress":
        return "bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30";
      default:
        return "bg-blue-500/20 text-blue-500 hover:bg-blue-500/30";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "web development":
        return "fas fa-globe";
      case "mobile app":
        return "fas fa-mobile-alt";
      case "desktop app":
        return "fas fa-desktop";
      case "hardware":
        return "fas fa-microchip";
      case "iot":
        return "fas fa-wifi";
      default:
        return "fas fa-code";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
          <div className="absolute inset-0 background-pattern opacity-5"></div>
          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <div className="h-12 bg-muted rounded-lg animate-pulse mb-6"></div>
              <div className="h-6 bg-muted rounded-lg animate-pulse max-w-2xl mx-auto"></div>
            </div>
          </div>
        </section>

        {/* Projects Grid Loading */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="glassmorphism animate-pulse">
                  <div className="w-full h-48 bg-muted rounded-t-lg"></div>
                  <CardHeader>
                    <div className="h-6 bg-muted rounded mb-2"></div>
                    <div className="h-4 bg-muted rounded"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="h-4 bg-muted rounded"></div>
                      <div className="h-4 bg-muted rounded w-3/4"></div>
                      <div className="flex gap-2 mt-4">
                        <div className="h-6 bg-muted rounded w-16"></div>
                        <div className="h-6 bg-muted rounded w-16"></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="absolute inset-0 background-pattern opacity-5"></div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              My <span className="gradient-text">Portfolio</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Explore my portfolio of innovative projects combining cutting-edge technology 
              with practical solutions. From web applications to hardware innovations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-10 border-b border-border/50">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap gap-4 justify-center">
            <Button variant="outline" className="glassmorphism hover:glow-effect">
              <i className="fas fa-th-large mr-2"></i>
              All Portfolio ({projects?.length || 0})
            </Button>
            <Button variant="ghost" className="hover:bg-primary/10">
              <i className="fas fa-globe mr-2"></i>
              Web Development
            </Button>
            <Button variant="ghost" className="hover:bg-primary/10">
              <i className="fas fa-mobile-alt mr-2"></i>
              Mobile Apps
            </Button>
            <Button variant="ghost" className="hover:bg-primary/10">
              <i className="fas fa-microchip mr-2"></i>
              Hardware
            </Button>
            <Button variant="ghost" className="hover:bg-primary/10">
              <i className="fas fa-wifi mr-2"></i>
              IoT Solutions
            </Button>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          {!projects || projects.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="glassmorphism rounded-xl p-12 max-w-md mx-auto">
                <i className="fas fa-folder-open text-6xl text-muted-foreground mb-6"></i>
                <h3 className="text-2xl font-semibold mb-4">Portfolio Coming Soon</h3>
                <p className="text-muted-foreground">
                  Portfolio items will appear here once they're added.
                </p>
              </div>
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="glassmorphism hover:glow-effect transition-all duration-300 transform hover:scale-105 group overflow-hidden">
                    {project.imageUrl && (
                      <div className="relative overflow-hidden">
                        <img
                          src={project.imageUrl}
                          alt={project.title}
                          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute top-4 left-4">
                          <Badge className={getStatusColor(project.status)}>
                            {project.status}
                          </Badge>
                        </div>
                        <div className="absolute top-4 right-4">
                          <Badge variant="secondary" className="glassmorphism">
                            <i className={`${getCategoryIcon(project.category)} mr-1`}></i>
                            {project.category}
                          </Badge>
                        </div>
                      </div>
                    )}
                    
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span className="group-hover:gradient-text transition-all duration-300">
                          {project.title}
                        </span>
                      </CardTitle>
                      <CardDescription className="line-clamp-2">
                        {project.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      {project.technologies && project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.slice(0, 3).map((tech, techIndex) => (
                            <Badge
                              key={techIndex}
                              variant="outline"
                              className="text-xs glassmorphism"
                            >
                              {tech}
                            </Badge>
                          ))}
                          {project.technologies.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{project.technologies.length - 3} more
                            </Badge>
                          )}
                        </div>
                      )}

                      <div className="flex gap-2 pt-2">
                        <Link href={`/projects/${project.id}`} className="flex-1">
                          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground group-hover:glow-effect transition-all duration-300">
                            <i className="fas fa-eye mr-2"></i>
                            View Details
                          </Button>
                        </Link>
                        
                        <div className="flex gap-2">
                          {project.githubUrl && (
                            <Button
                              variant="outline"
                              size="icon"
                              className="glassmorphism hover:glow-effect"
                              onClick={() => project.githubUrl && window.open(project.githubUrl, "_blank")}
                            >
                              <i className="fab fa-github"></i>
                            </Button>
                          )}
                          {project.liveUrl && (
                            <Button
                              variant="outline"
                              size="icon"
                              className="glassmorphism hover:glow-effect"
                              onClick={() => project.liveUrl && window.open(project.liveUrl, "_blank")}
                            >
                              <i className="fas fa-external-link-alt"></i>
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}