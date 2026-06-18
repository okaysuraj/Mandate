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

### Key Components
- `HomePage.jsx`: The primary dashboard coordinating view routing (Kanban, Calendar, Today).
- `KanbanBoard.jsx`: Drag-and-drop enabled board grouping tasks by status.
- `CalendarView.jsx`: A full monthly calendar view displaying events and task deadlines.
- `TodoModal.jsx` / `EventModal.jsx`: Advanced modal interfaces containing rich forms for entity creation.
- `Context Providers`: 
  - `AuthContext`: Manages JWT tokens and user session.
  - `WorkspaceContext`: Maintains the currently active workspace context.
  - `SocketContext`: Maintains the persistent WebSocket connection to the backend.

## Environment Variables
Create a `.env` file in this directory:
```env
VITE_API_URL=http://localhost:5001
```

## Available Scripts

- `npm run dev`: Starts the Vite development server with HMR.
- `npm run build`: Compiles and minifies the application for production deployment.
- `npx playwright test`: Runs the automated End-to-End browser test suite.

## Theming
We utilize **Tailwind CSS** for comprehensive utility-first styling. The application includes a dynamic Dark Mode toggle that adjusts CSS variables globally. Typography is driven by `Space Grotesk` and `Inter` via Google Fonts.
