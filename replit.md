# Om Oberoi Portfolio Website

## Overview

A modern, full-stack portfolio website for Om Oberoi, an Electronics & Communication Engineering student at BBDNIIT. The application showcases projects, skills, and professional information through a glassmorphism-designed interface with dynamic content management capabilities. Built as a comprehensive portfolio solution that bridges hardware expertise with software development skills.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **React with TypeScript**: Component-based architecture using functional components and hooks
- **Routing**: Wouter for lightweight client-side routing with support for hash-based navigation
- **State Management**: TanStack Query for server state management and caching
- **UI Framework**: Radix UI primitives with shadcn/ui components for accessible design system
- **Styling**: TailwindCSS with custom glassmorphism utilities and CSS variables for theming
- **Theme System**: Context-based dark/light mode toggle with persistent localStorage

### Backend Architecture
- **Express.js Server**: RESTful API with middleware for logging, authentication, and error handling
- **Authentication**: JWT-based admin authentication with bcrypt password hashing
- **Data Layer**: In-memory storage implementation with interface for future database integration
- **Development Setup**: Vite integration for hot module replacement and development server

### Database Design
- **Schema Definition**: Drizzle ORM with PostgreSQL dialect for type-safe database operations
- **Tables**: Users, Projects, Skills, Services, and Messages with UUID primary keys
- **Relationships**: Structured data model supporting portfolio content management

### Security & Authentication
- **JWT Tokens**: Stateless authentication for admin access
- **Password Security**: bcrypt hashing for secure credential storage
- **Protected Routes**: Middleware-based route protection for admin endpoints
- **CORS Configuration**: Proper cross-origin resource sharing setup

### Content Management
- **Dynamic Portfolio**: Database-driven project, skill, and service management
- **Admin Dashboard**: Full CRUD operations for portfolio content
- **Contact System**: Message handling with read/unread status tracking
- **File Upload Support**: Infrastructure for project images and assets

### Responsive Design
- **Mobile-First Approach**: TailwindCSS breakpoints for responsive layouts
- **Glassmorphism Effects**: Semi-transparent cards with backdrop blur effects
- **Animation System**: CSS transitions and transforms for smooth interactions
- **Accessibility**: ARIA labels and semantic HTML structure

## External Dependencies

### Core Technologies
- **Vite**: Build tool and development server with HMR support
- **TypeScript**: Type safety across frontend and backend code
- **Node.js**: Server runtime environment

### UI & Styling
- **Radix UI**: Accessible component primitives for complex UI elements
- **TailwindCSS**: Utility-first CSS framework with custom configuration
- **Font Awesome**: Icon library for consistent iconography
- **Google Fonts**: Web typography with Inter and custom font stacks

### Database & ORM
- **Drizzle ORM**: Type-safe database toolkit with PostgreSQL support
- **Neon Database**: Serverless PostgreSQL database service (configured but not yet connected)

### Authentication & Security
- **jsonwebtoken**: JWT token generation and verification
- **bcryptjs**: Password hashing and comparison utilities

### Development Tools
- **ESBuild**: Fast JavaScript bundler for production builds
- **PostCSS**: CSS preprocessing with Autoprefixer
- **React Query**: Server state management and caching layer

### Cloud Services
- **Replit Deployment**: Platform-specific plugins for development and deployment
- **Environment Variables**: Secure configuration management for sensitive data