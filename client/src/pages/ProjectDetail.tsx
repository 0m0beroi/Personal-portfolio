import { useQuery } from "@tanstack/react-query";
import { useParams, Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { type Project } from "@shared/schema";
import { motion } from "framer-motion";
import { ArrowLeft, Github, ExternalLink, Calendar, Tag, Code, Wrench } from "lucide-react";

export default function ProjectDetail() {
  const { id } = useParams();
  const [, navigate] = useLocation();
  
  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const project = projects?.find(p => p.id === id);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-500/20 text-green-500 border-green-500/30";
      case "in progress":
        return "bg-yellow-500/20 text-yellow-500 border-yellow-500/30";
      default:
        return "bg-blue-500/20 text-blue-500 border-blue-500/30";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "fas fa-check-circle";
      case "in progress":
        return "fas fa-clock";
      default:
        return "fas fa-play-circle";
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
        <div className="container mx-auto px-6 py-12">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-muted rounded w-48"></div>
            <div className="h-16 bg-muted rounded"></div>
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="h-64 bg-muted rounded-xl"></div>
                <div className="space-y-4">
                  <div className="h-6 bg-muted rounded"></div>
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="h-32 bg-muted rounded-xl"></div>
                <div className="h-24 bg-muted rounded-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="glassmorphism rounded-xl p-12 max-w-md mx-auto">
            <i className="fas fa-exclamation-triangle text-6xl text-yellow-500 mb-6"></i>
            <h2 className="text-2xl font-semibold mb-4">Portfolio Item Not Found</h2>
            <p className="text-muted-foreground mb-6">
              The portfolio item you're looking for doesn't exist or has been removed.
            </p>
            <Link href="/projects">
              <Button className="bg-primary hover:bg-primary/90">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Portfolio
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-12 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="absolute inset-0 background-pattern opacity-5"></div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Breadcrumb */}
            <nav className="mb-6" aria-label="Breadcrumb">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
                <i className="fas fa-chevron-right text-xs"></i>
                <Link href="/projects" className="hover:text-primary transition-colors">
                  Projects
                </Link>
                <i className="fas fa-chevron-right text-xs"></i>
                <span className="text-foreground font-medium">{project.title}</span>
              </div>
            </nav>

            <Link href="/projects">
              <Button variant="ghost" className="mb-6 hover:bg-primary/10">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Portfolio
              </Button>
            </Link>
            
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <Badge className={getStatusColor(project.status)}>
                    <i className={`${getStatusIcon(project.status)} mr-2`}></i>
                    {project.status}
                  </Badge>
                  <Badge variant="secondary" className="glassmorphism">
                    <i className={`${getCategoryIcon(project.category)} mr-2`}></i>
                    {project.category}
                  </Badge>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  <span className="gradient-text">{project.title}</span>
                </h1>
                
                <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-4">
                  {project.liveUrl && (
                    <Button 
                      size="lg" 
                      className="bg-primary hover:bg-primary/90 glow-effect"
                      onClick={() => project.liveUrl && window.open(project.liveUrl, "_blank")}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Live Demo
                    </Button>
                  )}
                  {project.githubUrl && (
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="glassmorphism hover:glow-effect"
                      onClick={() => project.githubUrl && window.open(project.githubUrl, "_blank")}
                    >
                      <Github className="w-4 h-4 mr-2" />
                      View Source Code
                    </Button>
                  )}
                </div>
              </div>

              {project.imageUrl && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="lg:w-1/2"
                >
                  <div className="relative rounded-xl overflow-hidden glassmorphism hover:glow-effect transition-all duration-300">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-64 lg:h-80 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-2 space-y-8"
            >
              {/* Project Overview */}
              <Card className="glassmorphism">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <i className="fas fa-info-circle mr-3 text-primary"></i>
                    Project Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                </CardContent>
              </Card>

              {/* Technologies Used */}
              {project.technologies && project.technologies.length > 0 && (
                <Card className="glassmorphism">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Code className="w-5 h-5 mr-3 text-primary" />
                      Technologies Used
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {project.technologies.map((tech, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          <Badge 
                            variant="secondary" 
                            className="w-full justify-center glassmorphism hover:glow-effect transition-all duration-300 py-2"
                          >
                            {tech}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Key Features */}
              <Card className="glassmorphism">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <i className="fas fa-star mr-3 text-primary"></i>
                    Key Features
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-muted-foreground">Modern and responsive user interface design</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-muted-foreground">Optimized performance and loading speeds</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-muted-foreground">Cross-platform compatibility and accessibility</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-muted-foreground">Secure and scalable architecture implementation</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6"
            >
              {/* Project Details */}
              <Card className="glassmorphism">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Wrench className="w-5 h-5 mr-3 text-primary" />
                    Project Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Status</span>
                    <Badge className={getStatusColor(project.status)}>
                      {project.status}
                    </Badge>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Category</span>
                    <Badge variant="secondary">
                      <i className={`${getCategoryIcon(project.category)} mr-1`}></i>
                      {project.category}
                    </Badge>
                  </div>
                  {project.createdAt && (
                    <>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Created</span>
                        <span className="text-sm">
                          {new Date(project.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Actions */}
              <Card className="glassmorphism">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {project.liveUrl && (
                    <Button 
                      className="w-full bg-primary hover:bg-primary/90"
                      onClick={() => project.liveUrl && window.open(project.liveUrl, "_blank")}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </Button>
                  )}
                  {project.githubUrl && (
                    <Button 
                      variant="outline" 
                      className="w-full glassmorphism hover:glow-effect"
                      onClick={() => project.githubUrl && window.open(project.githubUrl, "_blank")}
                    >
                      <Github className="w-4 h-4 mr-2" />
                      Source Code
                    </Button>
                  )}
                  <Link href="/projects" className="block">
                    <Button variant="ghost" className="w-full">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Full Portfolio
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Share */}
              <Card className="glassmorphism">
                <CardHeader>
                  <CardTitle>Share Project</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      // You could add a toast notification here
                    }}
                  >
                    <i className="fas fa-link mr-2"></i>
                    Copy Link
                  </Button>
                  <div className="grid grid-cols-1 gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`, "_blank")}
                    >
                      <i className="fab fa-linkedin mr-2"></i>
                      Share on LinkedIn
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}