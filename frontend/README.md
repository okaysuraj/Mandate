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
- **Testing:** Playwright E2E

## Architecture & Layouts
The frontend is composed of contextual layouts utilizing a highly responsive sidebar architecture.

## Environment Variables
Create a `.env` file in this directory:
```env
VITE_API_URL=http://localhost:5001
```

## Available Scripts

- `npm run dev`: Starts the Vite development server with HMR.
- `npm run build`: Compiles and minifies the application for production deployment.
- `npx playwright test`: Runs the automated End-to-End browser test suite.
