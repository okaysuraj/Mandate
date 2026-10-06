# 🎨 Mandate Frontend

This directory contains the React-based Single Page Application (SPA) for Mandate. Built for speed, reactivity, and a premium user experience.

## Tech Stack
- **Framework:** React 19 + Vite
- **Routing:** React Router v7
- **Styling:** Tailwind CSS + DaisyUI
- **Animations:** Framer Motion
- **State Management:** React Context API
- **Data Fetching:** Axios
- **Real-Time:** Socket.io-client

## Architecture & Layouts
The frontend is composed of contextual layouts utilizing a highly responsive sidebar architecture.

## Environment Variables
Create a `.env` file in this directory:
```env
VITE_API_BASE_URL=http://localhost:5001
```

Add `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID`, `VITE_FIREBASE_STORAGE_BUCKET`, `VITE_FIREBASE_MESSAGING_SENDER_ID`, and `VITE_FIREBASE_APP_ID` using the Firebase web app configuration for the backend's project. For production builds, set `VITE_API_BASE_URL` to the HTTPS backend origin. Restart Vite after changing environment variables.

## Available Scripts

- `npm run dev`: Starts the Vite development server with HMR.
- `npm run build`: Compiles and minifies the application for production deployment.
