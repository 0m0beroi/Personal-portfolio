const { randomUUID } = require('crypto');

// Minimal storage implementation for messages
class MemStorage {
  constructor() {
    this.messages = new Map();
  }

  async createMessage(message) {
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

module.exports = async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    try {
      // Basic validation
      const { name, email, message } = req.body;
      if (!name || !email || !message) {
        return res.status(400).json({ message: 'Name, email, and message are required' });
      }

      const newMessage = await storage.createMessage(req.body);
      return res.status(201).json(newMessage);
    } catch (error) {
      console.error('API Error:', error);
      return res.status(500).json({ message: 'Failed to send message' });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
};