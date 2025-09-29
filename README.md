# 🚀 Om Oberoi - Personal Portfolio

A modern, responsive portfolio website built with React, TypeScript, and Express.js, showcasing my projects, skills, and professional experience as an Electronics & Communication Engineer and Full-Stack Developer.

![Portfolio Preview](https://img.shields.io/badge/Status-Live-success?style=for-the-badge)
![Version](https://img.shields.io/badge/Version-1.0.0-blue?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

## ✨ Features

### 🎨 **Modern Design**
- **Glassmorphism UI** with blur effects and translucent elements
- **Dark/Light Theme** toggle with smooth transitions
- **Responsive Design** optimized for all devices (mobile, tablet, desktop)
- **Smooth Animations** using Framer Motion
- **Gradient Text Effects** and hover animations

### 📱 **Core Sections**
- **Hero Section** - Professional introduction with call-to-action buttons
- **About Section** - Detailed background and expertise
- **Portfolio Section** - Showcase of featured projects with individual detail pages
- **Skills Section** - Technical and professional skills with progress indicators
- **Contact Section** - Contact form with social media integration
- **Admin Dashboard** - Content management system for dynamic updates

### 🔧 **Advanced Features**
- **Full-Stack Architecture** with Express.js backend
- **Database Integration** using Drizzle ORM with PostgreSQL
- **Authentication System** with JWT tokens
- **Content Management** - Add/edit projects, skills, and services
- **Contact Form** with email notifications
- **SEO Optimized** with proper meta tags and semantic HTML
- **Performance Optimized** with code splitting and lazy loading

## 🛠️ Tech Stack

### **Frontend**
- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe JavaScript for better development experience
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Framer Motion** - Animation library for smooth interactions
- **React Query** - Server state management and caching
- **Wouter** - Lightweight client-side routing

### **Backend**
- **Express.js** - Fast, minimalist web framework
- **TypeScript** - Type-safe server-side development
- **Drizzle ORM** - Modern TypeScript ORM
- **PostgreSQL** - Reliable relational database
- **JWT** - JSON Web Tokens for authentication
- **Bcrypt** - Password hashing for security

### **Development Tools**
- **ESBuild** - Fast JavaScript bundler
- **PostCSS** - CSS transformation tool
- **TSX** - TypeScript execution engine for development

## 🚀 Quick Start

### **Prerequisites**
- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL database

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/0m0beroi/Personal-portfolio.git
   cd Personal-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/portfolio"
   SESSION_SECRET="your-super-secret-jwt-key"
   NODE_ENV="development"
   PORT=5000
   ```

4. **Database Setup**
   ```bash
   npm run db:push
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

6. **Open in Browser**
   Navigate to `http://localhost:5000`

## 📁 Project Structure

```
📦 Portfolio/
├── 📂 client/                 # Frontend React application
│   ├── 📂 src/
│   │   ├── 📂 components/     # Reusable UI components
│   │   │   ├── 📂 ui/         # Radix UI components
│   │   │   ├── HeroSection.tsx
│   │   │   ├── PortfolioSection.tsx
│   │   │   ├── ContactSection.tsx
│   │   │   └── ...
│   │   ├── 📂 pages/          # Application pages
│   │   │   ├── Home.tsx
│   │   │   ├── Projects.tsx
│   │   │   ├── ProjectDetail.tsx
│   │   │   └── Admin.tsx
│   │   ├── 📂 hooks/          # Custom React hooks
│   │   ├── 📂 lib/            # Utility functions and API
│   │   └── main.tsx           # Application entry point
│   └── index.html             # HTML template
├── 📂 server/                 # Backend Express application
│   ├── index.ts               # Server entry point
│   ├── routes.ts              # API routes definition
│   ├── storage.ts             # Database operations
│   └── vite.ts                # Vite integration
├── 📂 shared/                 # Shared TypeScript schemas
│   └── schema.ts              # Database and validation schemas
├── package.json               # Dependencies and scripts
├── drizzle.config.ts          # Database configuration
├── tailwind.config.ts         # Tailwind CSS configuration
└── vite.config.ts             # Vite build configuration
```

## 🗄️ Database Schema

The application uses PostgreSQL with the following main tables:

- **`projects`** - Portfolio projects with images, links, and technologies
- **`skills`** - Technical and professional skills with categories
- **`services`** - Services offered with descriptions
- **`messages`** - Contact form submissions
- **`users`** - Admin user accounts

## 🎯 Available Scripts

```bash
# Development
npm run dev          # Start development server with hot reload

# Production
npm run build        # Build for production
npm start           # Start production server

# Database
npm run db:push     # Push schema changes to database

# Type Checking
npm run check       # Run TypeScript type checking
```

## 🌐 Live Demo

Visit the live portfolio: [https://your-portfolio-url.com](https://your-portfolio-url.com)

## 📱 Responsive Design

The portfolio is fully responsive and optimized for:
- 📱 **Mobile devices** (320px and up)
- 📱 **Tablets** (768px and up)
- 💻 **Desktops** (1024px and up)
- 🖥️ **Large screens** (1440px and up)

## 🎨 Design System

### **Colors**
- **Primary**: Blue gradient (#3B82F6 to #8B5CF6)
- **Background**: Dynamic based on theme
- **Glassmorphism**: Semi-transparent with backdrop blur

### **Typography**
- **Font Family**: Inter (primary), JetBrains Mono (code)
- **Font Sizes**: Responsive scaling with clamp()

### **Components**
- **Cards**: Glassmorphism effect with hover animations
- **Buttons**: Gradient backgrounds with glow effects
- **Forms**: Clean design with proper validation

## 🚀 Deployment

### **Vercel Deployment**
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### **Manual Deployment**
1. Build the application: `npm run build`
2. Upload `dist/` folder to your server
3. Set up environment variables
4. Start with: `npm start`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

**Om Oberoi**
- 🌐 Portfolio: [https://your-portfolio-url.com](https://your-portfolio-url.com)
- 💼 LinkedIn: [https://www.linkedin.com/in/omoberoi](https://www.linkedin.com/in/omoberoi)
- 💻 GitHub: [https://github.com/0m0beroi](https://github.com/0m0beroi)
- 📧 Email: your-email@gmail.com

## 🙏 Acknowledgments

- [Radix UI](https://radix-ui.com/) for accessible component primitives
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Framer Motion](https://framer.com/motion/) for smooth animations
- [Lucide Icons](https://lucide.dev/) for beautiful icons
- [Font Awesome](https://fontawesome.com/) for additional icons

---

⭐ **Star this repository if you found it helpful!**

![GitHub stars](https://img.shields.io/github/stars/0m0beroi/Personal-portfolio?style=social)
![GitHub forks](https://img.shields.io/github/forks/0m0beroi/Personal-portfolio?style=social)