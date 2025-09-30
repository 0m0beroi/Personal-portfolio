const { randomUUID } = require('crypto');

// Minimal storage implementation for skills
class MemStorage {
  constructor() {
    this.skills = new Map();
    this.initializeDefaultSkills();
  }

  initializeDefaultSkills() {
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
  }

  async getAllSkills() {
    return Array.from(this.skills.values()).sort((a, b) => b.percentage - a.percentage);
  }
}

const storage = new MemStorage();

module.exports = async function handler(req, res) {
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
      const skills = await storage.getAllSkills();
      return res.status(200).json(skills);
    } catch (error) {
      console.error('API Error:', error);
      return res.status(500).json({ message: 'Failed to fetch skills' });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
};