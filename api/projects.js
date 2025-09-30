const { randomUUID } = require('crypto');

// Minimal storage implementation for Vercel
class MemStorage {
  constructor() {
    this.projects = new Map();
    this.initializeDefaultProjects();
  }

  initializeDefaultProjects() {
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
        liveUrl: project.liveUrl || null,
        technologies: project.technologies || null
      });
    });
  }

  async getAllProjects() {
    return Array.from(this.projects.values()).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }
}

const storage = new MemStorage();

module.exports = async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    try {
      const projects = await storage.getAllProjects();
      return res.status(200).json(projects);
    } catch (error) {
      console.error('API Error:', error);
      return res.status(500).json({ message: 'Failed to fetch projects' });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
};