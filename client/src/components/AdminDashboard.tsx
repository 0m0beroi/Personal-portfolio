import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { apiRequest } from "@/lib/queryClient";
import { type Message, type Project, type Skill } from "@shared/schema";

export function AdminDashboard() {
  const { user, login, logout, isAuthenticated } = useAuth();
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: stats } = useQuery<{
    projects: number;
    skills: number;
    messages: number;
    totalMessages: number;
  }>({
    queryKey: ["/api/admin/stats"],
    enabled: isAuthenticated,
  });

  const { data: messages, isLoading: messagesLoading } = useQuery<Message[]>({
    queryKey: ["/api/admin/messages"],
    enabled: isAuthenticated,
  });

  const { data: projects } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
    enabled: isAuthenticated,
  });

  const { data: skills } = useQuery<Skill[]>({
    queryKey: ["/api/skills"],
    enabled: isAuthenticated,
  });

  const loginMutation = useMutation({
    mutationFn: async (credentials: { username: string; password: string }) => {
      const response = await apiRequest("POST", "/api/auth/login", credentials);
      return response.json();
    },
    onSuccess: (data) => {
      login(data.token, data.user);
      toast({
        title: "Login successful",
        description: "Welcome to the admin dashboard!",
      });
    },
    onError: () => {
      toast({
        title: "Login failed",
        description: "Invalid username or password.",
        variant: "destructive",
      });
    },
  });

  const markAsReadMutation = useMutation({
    mutationFn: async (messageId: string) => {
      const response = await apiRequest("PATCH", `/api/admin/messages/${messageId}/read`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/messages"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
    },
  });

  const deleteMessageMutation = useMutation({
    mutationFn: async (messageId: string) => {
      const response = await apiRequest("DELETE", `/api/admin/messages/${messageId}`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/messages"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
      toast({
        title: "Message deleted",
        description: "The message has been successfully deleted.",
      });
    },
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginForm.username || !loginForm.password) {
      toast({
        title: "Please fill in all fields",
        description: "Username and password are required.",
        variant: "destructive",
      });
      return;
    }
    loginMutation.mutate(loginForm);
  };

  const handleLogout = () => {
    logout();
    setLoginForm({ username: "", password: "" });
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  if (!isAuthenticated) {
    return (
      <section id="admin" className="py-20 bg-muted/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4" data-testid="admin-title">
              Admin <span className="gradient-text">Dashboard</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Manage portfolio content, projects, and messages (Admin access required).
            </p>
          </div>

          <div className="max-w-md mx-auto glassmorphism rounded-xl p-8" data-testid="login-form-container">
            <h3 className="text-2xl font-semibold mb-6 text-center">Admin Login</h3>
            <form onSubmit={handleLogin} className="space-y-6" data-testid="login-form">
              <div>
                <Label htmlFor="admin-username" className="block text-sm font-medium mb-2">
                  Username
                </Label>
                <Input
                  type="text"
                  id="admin-username"
                  name="username"
                  value={loginForm.username}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, username: e.target.value }))}
                  placeholder="admin"
                  required
                  data-testid="input-username"
                />
              </div>

              <div>
                <Label htmlFor="admin-password" className="block text-sm font-medium mb-2">
                  Password
                </Label>
                <Input
                  type="password"
                  id="admin-password"
                  name="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                  placeholder="••••••••"
                  required
                  data-testid="input-password"
                />
              </div>

              <Button
                type="submit"
                disabled={loginMutation.isPending}
                className="w-full bg-primary text-primary-foreground py-4 px-6 rounded-lg font-semibold hover:glow-effect transition-all duration-300"
                data-testid="button-login"
              >
                {loginMutation.isPending ? "Logging in..." : "Login to Dashboard"}
                <i className="fas fa-sign-in-alt ml-2"></i>
              </Button>
            </form>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="admin" className="py-20 bg-muted/50">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-16">
          <div className="text-center flex-1">
            <h2 className="text-4xl font-bold mb-4" data-testid="admin-dashboard-title">
              Admin <span className="gradient-text">Dashboard</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Welcome back, {user?.username}!
            </p>
          </div>
          <Button onClick={handleLogout} variant="outline" data-testid="button-logout">
            Logout <i className="fas fa-sign-out-alt ml-2"></i>
          </Button>
        </div>

        {/* Dashboard Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="glassmorphism" data-testid="stat-projects">
            <CardContent className="p-6 text-center">
              <i className="fas fa-project-diagram text-3xl text-primary mb-3"></i>
              <h4 className="text-2xl font-bold">{stats?.projects || 0}</h4>
              <p className="text-muted-foreground">Projects</p>
            </CardContent>
          </Card>

          <Card className="glassmorphism" data-testid="stat-skills">
            <CardContent className="p-6 text-center">
              <i className="fas fa-tools text-3xl text-primary mb-3"></i>
              <h4 className="text-2xl font-bold">{stats?.skills || 0}</h4>
              <p className="text-muted-foreground">Skills</p>
            </CardContent>
          </Card>

          <Card className="glassmorphism" data-testid="stat-messages">
            <CardContent className="p-6 text-center">
              <i className="fas fa-envelope text-3xl text-primary mb-3"></i>
              <h4 className="text-2xl font-bold">{stats?.messages || 0}</h4>
              <p className="text-muted-foreground">Unread Messages</p>
            </CardContent>
          </Card>

          <Card className="glassmorphism" data-testid="stat-total-messages">
            <CardContent className="p-6 text-center">
              <i className="fas fa-chart-line text-3xl text-primary mb-3"></i>
              <h4 className="text-2xl font-bold">{stats?.totalMessages || 0}</h4>
              <p className="text-muted-foreground">Total Messages</p>
            </CardContent>
          </Card>
        </div>

        {/* Management Tabs */}
        <Tabs defaultValue="messages" className="w-full" data-testid="admin-tabs">
          <TabsList className="grid w-full grid-cols-3 glassmorphism">
            <TabsTrigger value="messages" data-testid="tab-messages">Messages</TabsTrigger>
            <TabsTrigger value="projects" data-testid="tab-projects">Projects</TabsTrigger>
            <TabsTrigger value="skills" data-testid="tab-skills">Skills</TabsTrigger>
          </TabsList>

          <TabsContent value="messages" className="mt-8" data-testid="messages-content">
            <Card className="glassmorphism">
              <CardHeader>
                <CardTitle>Contact Messages</CardTitle>
              </CardHeader>
              <CardContent>
                {messagesLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="p-4 border rounded-lg animate-pulse">
                        <div className="h-4 bg-muted rounded mb-2"></div>
                        <div className="h-20 bg-muted rounded"></div>
                      </div>
                    ))}
                  </div>
                ) : messages && messages.length > 0 ? (
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`p-4 border rounded-lg ${message.isRead ? 'bg-muted/50' : 'bg-background'}`}
                        data-testid={`message-${message.id}`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold">{message.name}</h4>
                            <p className="text-sm text-muted-foreground">{message.email}</p>
                          </div>
                          <div className="flex gap-2">
                            {!message.isRead && (
                              <Button
                                size="sm"
                                onClick={() => markAsReadMutation.mutate(message.id)}
                                disabled={markAsReadMutation.isPending}
                                data-testid={`button-mark-read-${message.id}`}
                              >
                                Mark as Read
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => deleteMessageMutation.mutate(message.id)}
                              disabled={deleteMessageMutation.isPending}
                              data-testid={`button-delete-${message.id}`}
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                        <p className="text-sm">{message.message}</p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {new Date(message.createdAt!).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8" data-testid="no-messages">
                    <p className="text-muted-foreground">No messages yet.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects" className="mt-8" data-testid="projects-content">
            <Card className="glassmorphism">
              <CardHeader>
                <CardTitle>Project Management</CardTitle>
              </CardHeader>
              <CardContent>
                {projects && projects.length > 0 ? (
                  <div className="grid gap-4">
                    {projects.map((project) => (
                      <div key={project.id} className="p-4 border rounded-lg" data-testid={`project-${project.id}`}>
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold">{project.title}</h4>
                            <p className="text-sm text-muted-foreground">{project.category}</p>
                            <p className="text-sm">{project.description}</p>
                          </div>
                          <span className={`px-2 py-1 rounded text-xs ${
                            project.status === "Completed" ? "bg-green-100 text-green-800" :
                            project.status === "In Progress" ? "bg-yellow-100 text-yellow-800" :
                            "bg-blue-100 text-blue-800"
                          }`}>
                            {project.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8" data-testid="no-projects-admin">
                    <p className="text-muted-foreground">No projects available.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="skills" className="mt-8" data-testid="skills-content">
            <Card className="glassmorphism">
              <CardHeader>
                <CardTitle>Skills Management</CardTitle>
              </CardHeader>
              <CardContent>
                {skills && skills.length > 0 ? (
                  <div className="grid gap-4">
                    {skills.map((skill) => (
                      <div key={skill.id} className="p-4 border rounded-lg" data-testid={`skill-admin-${skill.id}`}>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            {skill.iconClass && <i className={skill.iconClass}></i>}
                            <div>
                              <h4 className="font-semibold">{skill.name}</h4>
                              <p className="text-sm text-muted-foreground">{skill.category}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-lg font-bold">{skill.percentage}%</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8" data-testid="no-skills-admin">
                    <p className="text-muted-foreground">No skills available.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
