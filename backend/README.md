# ⚙️ Mandate Backend

This directory contains the robust Node.js/Express REST API and Socket.io server that powers Mandate. 

## Tech Stack
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (Mongoose ORM)
- **Caching & Limiting:** Redis
- **Real-time:** Socket.io
- **Security:** Helmet, CORS, Express-Rate-Limit, JWT
- **Testing:** Jest, Supertest, MongoDB-Memory-Server

## Core Architecture
The backend uses a standard MVC (Model-View-Controller) structure optimized for scalability.

### Key Features
- **JWT Authentication:** Secure stateless authentication.
- **Workspace Isolation:** All queries strictly filter by `workspaceId` to ensure multi-tenant security.
- **Redis Caching:** High-frequency routes (`/api/todos`) are cached for 5 minutes and automatically invalidated upon write operations.
- **WebSocket Broadcasts:** All mutations emit corresponding real-time events (`todo_updated`, `event_created`, etc.) exclusively to the active Workspace room.
- **Automated Reminders:** A cron job (`reminderService.js`) polls every minute to generate notifications for tasks due in the next 15 minutes.

## Environment Variables
Create a `.env` file in this directory:
```env
PORT=5001
MONGO_URI=mongodb://localhost:27017/mandate
JWT_SECRET=super_secret_jwt_key
REDIS_URL=redis://localhost:6379
```

## Available Scripts

- `npm run dev`: Starts the Nodemon development server.
- `npm test`: Runs the isolated Jest integration test suite (spins up an in-memory MongoDB database automatically).

## Security Measures
- **Rate Limiting:** Global rate limiting is applied via Express and Redis.
- **HTTP Headers:** Helmet is configured to secure Express apps by setting various HTTP headers.
- **Input Validation:** Enforced strictly via Mongoose Schemas.
