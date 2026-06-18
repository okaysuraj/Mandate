<h1 align="center">🏢 Mandate - Enterprise Team Workspace</h1>

<p align="center">
  <strong>The ultimate MERN stack task management, calendar, and collaboration platform.</strong>
</p>

## ✨ Highlights

Mandate goes beyond simple to-do lists, providing a comprehensive, real-time workspace for modern teams:

- 🧱 **Enterprise-Grade Architecture:** Built with MongoDB, Express, React, Node.js, and Redis.
- ⚡ **Real-Time Collaboration:** Powered by WebSockets (Socket.io) to keep multiple team members in sync effortlessly.
- 🗂️ **Workspaces & Projects:** Segregate context seamlessly with team workspaces and custom project groupings.
- 📋 **Dynamic Views:** Switch instantly between Today, Upcoming, Calendar, and interactive Kanban boards.
- 📅 **Integrated Calendar:** Manage events, meetings, and deadlines in a sleek monthly interface.
- 🚀 **High Performance:** Utilizing Redis caching strategies for lightning-fast task retrieval and rate limiting.
- 🧪 **Fully Tested:** Comprehensive automated backend API and frontend Playwright E2E test suites.
- 🎨 **Premium UI/UX:** Responsive, dark-mode enabled interface built with Tailwind CSS, DaisyUI, and Framer Motion.

---

## 📖 Documentation

For detailed technical specifications, APIs, and deployment instructions, see our comprehensive `docs/` folder:

- [Architecture Overview](docs/ARCHITECTURE.md) - System design and database schema.
- [API Reference](docs/API_REFERENCE.md) - REST endpoints and WebSocket events.
- [Testing Guide](docs/TESTING.md) - Running unit, integration, and E2E tests.
- [Deployment Guide](docs/DEPLOYMENT.md) - Step-by-step production hosting via Netlify and Render.

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas (or local MongoDB)
- Redis instance (Upstash or local)

### 1. Backend Setup
```bash
cd backend
npm install

# Create a .env file with:
# PORT=5001
# MONGO_URI=your_mongo_connection_string
# JWT_SECRET=your_secret_key
# REDIS_URL=your_redis_connection_url

npm run dev
```

### 2. Frontend Setup
```bash
cd frontend
npm install

# Create a .env file with:
# VITE_API_URL=http://localhost:5001

npm run dev
```

Visit `http://localhost:5173` to explore your workspace!
