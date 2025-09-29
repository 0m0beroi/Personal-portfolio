import { type User, type InsertUser, type Project, type InsertProject, type Skill, type InsertSkill, type Service, type InsertService, type Message, type InsertMessage } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Project methods
  getAllProjects(): Promise<Project[]>;
  getProjectById(id: string): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: string, project: Partial<InsertProject>): Promise<Project | undefined>;
  deleteProject(id: string): Promise<boolean>;

  // Skill methods
  getAllSkills(): Promise<Skill[]>;
  createSkill(skill: InsertSkill): Promise<Skill>;
  updateSkill(id: string, skill: Partial<InsertSkill>): Promise<Skill | undefined>;
  deleteSkill(id: string): Promise<boolean>;

  // Service methods
  getAllServices(): Promise<Service[]>;
  createService(service: InsertService): Promise<Service>;
  updateService(id: string, service: Partial<InsertService>): Promise<Service | undefined>;
  deleteService(id: string): Promise<boolean>;

  // Message methods
  getAllMessages(): Promise<Message[]>;
  createMessage(message: InsertMessage): Promise<Message>;
  markMessageAsRead(id: string): Promise<boolean>;
  deleteMessage(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private projects: Map<string, Project>;
  private skills: Map<string, Skill>;
  private services: Map<string, Service>;
  private messages: Map<string, Message>;

  constructor() {
    this.users = new Map();
    this.projects = new Map();
    this.skills = new Map();
    this.services = new Map();
    this.messages = new Map();
    
    // Initialize with default data
    this.initializeDefaultData();
  }

  private initializeDefaultData() {
    // Create default admin user
    const adminId = randomUUID();
    const adminUser: User = {
      id: adminId,
      username: "admin",
      password: "$2a$10$rGqy9YdyXXhLN8NXzZKhtu.mSBgGMKjM8kLEz0KzDJ8Dp.8yQ8Bxu", // password: "admin123"
    };
    this.users.set(adminId, adminUser);

    // Initialize default skills
    const defaultSkills: InsertSkill[] = [
      { name: "Electronics & Circuit Design", category: "Hardware", percentage: 90, iconClass: "fas fa-microchip" },
      { name: "Embedded Systems (C/C++)", category: "Technical", percentage: 85, iconClass: "fas fa-code" },
      { name: "React & Node.js", category: "Software", percentage: 80, iconClass: "fab fa-react" },
      { name: "IoT & Cloud Integration", category: "Technical", percentage: 75, iconClass: "fas fa-cloud" },
      { name: "MongoDB & Database Design", category: "Software", percentage: 70, iconClass: "fas fa-database" },
    ];

    defaultSkills.forEach(skill => {
      const id = randomUUID();
      this.skills.set(id, { 
        ...skill, 
        id,
        iconClass: skill.iconClass || null
      });
    });

    // Initialize default services
    const defaultServices: InsertService[] = [
      {
        title: "Web Development",
        description: "Full-stack web applications using modern frameworks and databases with responsive design principles.",
        iconClass: "fas fa-code"
      },
      {
        title: "Project Development",
        description: "Custom embedded systems and IoT solutions from concept to deployment with hardware-software integration.",
        iconClass: "fas fa-microchip"
      },
      {
        title: "Technical Tutoring",
        description: "Mentoring in electronics, programming, and engineering concepts with hands-on project guidance.",
        iconClass: "fas fa-chalkboard-teacher"
      }
    ];

    defaultServices.forEach(service => {
      const id = randomUUID();
      this.services.set(id, { ...service, id });
    });

    // Initialize default projects
    const defaultProjects: InsertProject[] = [
      {
        title: "Wi-Fi Repeater using ESP32",
        description: "Advanced Wi-Fi signal amplification system using ESP32 microcontroller with custom firmware for extended range coverage.",
        category: "IoT",
        status: "Completed",
        imageUrl: "https://pixabay.com/get/g4e6bab65ae9a03c5a069b4bf958aea72d4462e4e7f382c58aab2627ad46de66fcae631eea0e4a376418e13c1f34124c80b7e85d73b058f0f33a6b19e8fb73021_1280.jpg",
        githubUrl: "https://github.com/om-oberoi/wifi-repeater-esp32",
        technologies: ["ESP32", "C++", "WiFi", "IoT"]
      },
      {
        title: "Wearable Oscilloscope Smartwatch",
        description: "Innovative wearable device that functions as a portable oscilloscope for real-time signal analysis and debugging.",
        category: "Wearable",
        status: "In Progress",
        imageUrl: "https://images.unsplash.com/photo-1544117519-31a4b719223d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
        githubUrl: "https://github.com/om-oberoi/oscilloscope-smartwatch",
        technologies: ["Arduino", "Display", "Sensors", "PCB Design"]
      },
      {
        title: "Smart Career Booster Series",
        description: "Comprehensive career development platform with AI-driven recommendations and skill assessment tools.",
        category: "Education",
        status: "Completed",
        imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
        githubUrl: "https://github.com/om-oberoi/career-booster",
        liveUrl: "https://career-booster.example.com",
        technologies: ["React", "Node.js", "MongoDB", "AI/ML"]
      }
    ];

    defaultProjects.forEach(project => {
      const id = randomUUID();
      const now = new Date();
      this.projects.set(id, { 
        ...project, 
        id, 
        createdAt: now,
        updatedAt: now,
        imageUrl: project.imageUrl || null,
        githubUrl: project.githubUrl || null,
        liveUrl: project.liveUrl || null,
        technologies: project.technologies || null
      });
    });
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Project methods
  async getAllProjects(): Promise<Project[]> {
    return Array.from(this.projects.values()).sort((a, b) => 
      new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
    );
  }

  async getProjectById(id: string): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async createProject(project: InsertProject): Promise<Project> {
    const id = randomUUID();
    const now = new Date();
    const newProject: Project = { 
      ...project, 
      id, 
      createdAt: now,
      updatedAt: now,
      imageUrl: project.imageUrl || null,
      githubUrl: project.githubUrl || null,
      liveUrl: project.liveUrl || null,
      technologies: project.technologies || null
    };
    this.projects.set(id, newProject);
    return newProject;
  }

  async updateProject(id: string, project: Partial<InsertProject>): Promise<Project | undefined> {
    const existing = this.projects.get(id);
    if (!existing) return undefined;
    
    const updated: Project = {
      ...existing,
      ...Object.fromEntries(
        Object.entries(project).filter(([_, value]) => value !== undefined)
      ),
      updatedAt: new Date(),
      // Ensure optional fields are properly normalized to null if provided
      ...(project.imageUrl !== undefined && { imageUrl: project.imageUrl || null }),
      ...(project.githubUrl !== undefined && { githubUrl: project.githubUrl || null }),
      ...(project.liveUrl !== undefined && { liveUrl: project.liveUrl || null }),
      ...(project.technologies !== undefined && { technologies: project.technologies || null }),
    };
    this.projects.set(id, updated);
    return updated;
  }

  async deleteProject(id: string): Promise<boolean> {
    return this.projects.delete(id);
  }

  // Skill methods
  async getAllSkills(): Promise<Skill[]> {
    return Array.from(this.skills.values()).sort((a, b) => b.percentage - a.percentage);
  }

  async createSkill(skill: InsertSkill): Promise<Skill> {
    const id = randomUUID();
    const newSkill: Skill = { 
      ...skill, 
      id,
      iconClass: skill.iconClass || null
    };
    this.skills.set(id, newSkill);
    return newSkill;
  }

  async updateSkill(id: string, skill: Partial<InsertSkill>): Promise<Skill | undefined> {
    const existing = this.skills.get(id);
    if (!existing) return undefined;
    
    const updated: Skill = {
      ...existing,
      ...Object.fromEntries(
        Object.entries(skill).filter(([_, value]) => value !== undefined)
      ),
      // Ensure iconClass is properly normalized to null if provided
      ...(skill.iconClass !== undefined && { iconClass: skill.iconClass || null }),
    };
    this.skills.set(id, updated);
    return updated;
  }

  async deleteSkill(id: string): Promise<boolean> {
    return this.skills.delete(id);
  }

  // Service methods
  async getAllServices(): Promise<Service[]> {
    return Array.from(this.services.values());
  }

  async createService(service: InsertService): Promise<Service> {
    const id = randomUUID();
    const newService: Service = { ...service, id };
    this.services.set(id, newService);
    return newService;
  }

  async updateService(id: string, service: Partial<InsertService>): Promise<Service | undefined> {
    const existing = this.services.get(id);
    if (!existing) return undefined;
    
    const updated: Service = { ...existing, ...service };
    this.services.set(id, updated);
    return updated;
  }

  async deleteService(id: string): Promise<boolean> {
    return this.services.delete(id);
  }

  // Message methods
  async getAllMessages(): Promise<Message[]> {
    return Array.from(this.messages.values()).sort((a, b) => 
      new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
    );
  }

  async createMessage(message: InsertMessage): Promise<Message> {
    const id = randomUUID();
    const newMessage: Message = { 
      ...message, 
      id, 
      isRead: false,
      createdAt: new Date()
    };
    this.messages.set(id, newMessage);
    return newMessage;
  }

  async markMessageAsRead(id: string): Promise<boolean> {
    const message = this.messages.get(id);
    if (!message) return false;
    
    this.messages.set(id, { ...message, isRead: true });
    return true;
  }

  async deleteMessage(id: string): Promise<boolean> {
    return this.messages.delete(id);
  }
}

export const storage = new MemStorage();
