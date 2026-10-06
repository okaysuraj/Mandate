# Mandate backend

Express REST API and authenticated Socket.IO server, with Firebase identity verification and MongoDB transactions.

Use Node.js 22 or newer and a MongoDB replica set or sharded cluster. Install with npm ci, create `.env` with the settings below, run npm run db:audit, then npm run db:migrate after reviewing the audit. Production disables automatic index creation.

Required credentials: `MONGO_URI`, `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, and `FIREBASE_PRIVATE_KEY`. Quote the private key and encode its newlines as `\n`.

Local settings: `NODE_ENV=development`, `PORT=5001`, `FRONTEND_URL=http://localhost:5173`, and `CORS_ORIGINS=http://localhost:5173,http://localhost:8081`. Leave `TRUST_PROXY_HOPS` unset locally; in production, set it to your actual proxy hop count and replace the web origins with deployment values.

Optional integrations use `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET` for uploads; `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_PRO_PRICE_ID`, and `STRIPE_TEAM_PRICE_ID` for billing; and `GEMINI_API_KEY` and `GEMINI_MODEL` for AI.

npm run db:repair previews quarantine candidates; --apply explicitly applies the repair. No starter demonstration tasks are seeded.

See [the development notes](../docs/AUDIT.md) for configuration requirements, remaining release work and database recovery notes.
