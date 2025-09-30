import { VercelRequest, VercelResponse } from '@vercel/node';
import { randomUUID } from 'crypto';

// Minimal storage implementation for services
class MemStorage {
  private services = new Map();

  constructor() {
    this.initializeDefaultServices();
  }

  private initializeDefaultServices() {
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

  async getAllServices() {
    return Array.from(this.services.values());
  }
}

const storage = new MemStorage();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    try {
      const services = await storage.getAllServices();
      return res.status(200).json(services);
    } catch (error) {
      console.error('API Error:', error);
      return res.status(500).json({ message: 'Failed to fetch services' });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}