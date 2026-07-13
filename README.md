<h1 align="center">🏢 Mandate - Enterprise Team Workspace</h1>

<p align="center">
  <strong>The ultimate MERN stack task management, calendar, and collaboration platform.</strong>
</p>

## ✨ Highlights

Mandate goes beyond simple to-do lists, providing a comprehensive, real-time workspace for modern teams:

- 🧱 **Enterprise-Grade Architecture:** Built with MongoDB Atlas, Express, React, and Node.js.
- ⚡ **Real-Time Collaboration:** Powered by WebSockets (Socket.io) to keep multiple team members in sync effortlessly.
- 🗂️ **Workspaces & Projects:** Segregate context seamlessly with team workspaces and custom project groupings.
- 📋 **Dynamic Views:** Switch instantly between Today, Upcoming, Calendar, and interactive Kanban boards.
- 📅 **Integrated Calendar:** Manage events, meetings, and deadlines in a sleek monthly interface.
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
- MongoDB Atlas

### 1. Backend Setup
```bash
cd backend
npm install

# Create a .env file with:
# PORT=5001
# MONGO_URI=your_mongo_connection_string
# JWT_SECRET=your_secret_key

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

# 🚀 Deployment Guide

This guide details how to deploy the Mandate platform in a robust production environment.

## Strategy
- **Frontend:** Hosted on **Netlify** (Globally distributed CDN, excellent for Vite/React SPAs).
- **Backend:** Hosted on **Render** (Fully managed PaaS, great for Express/WebSockets).
- **Database:** Hosted on **MongoDB Atlas**.

---

## 1. Provision Databases

### MongoDB Atlas
1. Create a free cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Go to **Database Access** and create a user with read/write privileges.
3. Go to **Network Access** and allow IP `0.0.0.0/0` (Allow from anywhere).
4. Click **Connect -> Connect your application** and copy the `MONGO_URI` connection string.

---

## 2. Deploy Backend (Render)

1. Push your code to GitHub.
2. Sign up for [Render](https://render.com/).
3. Create a **New Web Service** and connect your GitHub repository.
4. **Configuration:**
   - **Root Directory:** `backend`
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start` (Make sure `start` is mapped to `node src/server.js` in `backend/package.json`)
5. **Environment Variables:**
   - `MONGO_URI` = `<Your MongoDB String>`
   - `JWT_SECRET` = `<Generate a secure random string>`
   - `PORT` = `10000`
6. Click **Deploy**. Once finished, copy the provided `onrender.com` URL.

---

## 3. Deploy Frontend (Netlify)

1. Sign up for [Netlify](https://www.netlify.com/).
2. Click **Add new site** -> **Import an existing project** from GitHub.
3. Select your repository.
4. **Configuration:**
   - **Base directory:** `frontend`
   - **Build command:** `npm run build`
   - **Publish directory:** `frontend/dist`
5. **Environment Variables:**
   - Click "Add environment variables".
   - Key: `VITE_API_URL`
   - Value: `<Your Render Backend URL>` (e.g., `https://mandate-api.onrender.com`)
6. Click **Deploy site**.
7. *Crucial Routing Fix:* In Netlify, React Router requires a `_redirects` file in the `public/` directory containing `/* /index.html 200` to prevent 404s on refresh. (This should already be handled by Vite configurations).

Congratulations! Mandate is now live.
