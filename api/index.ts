import { VercelRequest, VercelResponse } from '@vercel/node';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';

// Minimal storage implementation for Vercel
class MemStorage {
  private users = new Map();
  private projects = new Map();
  private skills = new Map();
  private services = new Map();
  private messages = new Map();

  constructor() {
    this.initializeDefaultData();
  }

  private initializeDefaultData() {
    // Initialize default admin user
    const adminId = randomUUID();
    const adminUser = {
      id: adminId,
      username: 'admin',
      password: '$2a$10$rGqy9YdyXXhLN8NXzZKhtu.mSBgGMKjM8kLEz0KzDJ8Dp.8yQ8Bxu' // password: "admin123"
    };
    this.users.set(adminId, adminUser);

    // Initialize default projects
    const defaultProjects = [
      {
        title: "Wi-Fi Repeater using ESP32",
        description: "Advanced Wi-Fi signal amplification system using ESP32 microcontroller with custom firmware for extended range coverage.",
        category: "IoT",
        status: "Completed",
        imageUrl: "https://images.unsplash.com/photo-1544117519-31a4b719223d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
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

    defaultProjects.forEach((project) => {
      const id = randomUUID();
      const now = new Date();
      this.projects.set(id, {
        ...project,
        id,
        createdAt: now,
        updatedAt: now,
        imageUrl: project.imageUrl || null,
        githubUrl: project.githubUrl || null,
        liveUrl: (project as any).liveUrl || null,
        technologies: project.technologies || null
      });
    });

    // Initialize default skills
    const defaultSkills = [
      { name: "Electronics & Circuit Design", category: "Hardware", percentage: 90, iconClass: "fas fa-microchip" },
      { name: "Embedded Systems (C/C++)", category: "Technical", percentage: 85, iconClass: "fas fa-code" },
      { name: "React & Node.js", category: "Software", percentage: 80, iconClass: "fab fa-react" },
      { name: "IoT & Cloud Integration", category: "Technical", percentage: 75, iconClass: "fas fa-cloud" },
      { name: "MongoDB & Database Design", category: "Software", percentage: 70, iconClass: "fas fa-database" }
    ];

    defaultSkills.forEach((skill) => {
      const id = randomUUID();
      this.skills.set(id, {
        ...skill,
        id,
        iconClass: skill.iconClass || null
      });
    });

    // Initialize default services
    const defaultServices = [
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

    defaultServices.forEach((service) => {
      const id = randomUUID();
      this.services.set(id, { ...service, id });
    });
  }

  // Methods
  async getUser(id: string) { return this.users.get(id); }
  async getUserByUsername(username: string) {
    return Array.from(this.users.values()).find((user: any) => user.username === username);
  }
  async getAllProjects() {
    return Array.from(this.projects.values()).sort((a: any, b: any) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }
  async getAllSkills() {
    return Array.from(this.skills.values()).sort((a: any, b: any) => b.percentage - a.percentage);
  }
  async getAllServices() {
    return Array.from(this.services.values());
  }
  async getAllMessages() {
    return Array.from(this.messages.values()).sort((a: any, b: any) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }
  async createMessage(message: any) {
    const id = randomUUID();
    const newMessage = {
      ...message,
      id,
      isRead: false,
      createdAt: new Date()
    };
    this.messages.set(id, newMessage);
    return newMessage;
  }
}

const storage = new MemStorage();
const JWT_SECRET = process.env.SESSION_SECRET || 'fallback-secret-key';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { pathname } = new URL(req.url || '', `http://${req.headers.host}`);

  try {
    // Auth routes
    if (pathname === '/api/auth/login' && req.method === 'POST') {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ message: 'Username and password required' });
      }

      const user = await storage.getUserByUsername(username);
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const isValidPassword = await bcrypt.compare(password, (user as any).password);
      if (!isValidPassword) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign(
        { id: (user as any).id, username: (user as any).username },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      return res.status(200).json({
        token,
        user: { id: (user as any).id, username: (user as any).username }
      });
    }

    // Public API routes
    if (pathname === '/api/projects' && req.method === 'GET') {
      const projects = await storage.getAllProjects();
      return res.status(200).json(projects);
    }

    if (pathname === '/api/skills' && req.method === 'GET') {
      const skills = await storage.getAllSkills();
      return res.status(200).json(skills);
    }

    if (pathname === '/api/services' && req.method === 'GET') {
      const services = await storage.getAllServices();
      return res.status(200).json(services);
    }

    if (pathname === '/api/messages' && req.method === 'POST') {
      const message = await storage.createMessage(req.body);
      return res.status(201).json(message);
    }

    // 404 for unmatched API routes
    return res.status(404).json({ message: 'API route not found' });

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}