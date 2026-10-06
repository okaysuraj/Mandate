# Mandate backend

Express REST API and authenticated Socket.IO server, with Firebase identity verification and MongoDB transactions.

Use Node.js 22 or newer and a MongoDB replica set or sharded cluster. Install with npm ci, configure .env from .env.example, run npm run db:audit, then npm run db:migrate after reviewing the audit. Production disables automatic index creation.

npm test runs API/security tests against an isolated MongoDB replica set. npm run db:repair previews quarantine candidates; --apply explicitly applies the repair. No starter demonstration tasks are seeded.

See [the audit report](../docs/AUDIT.md) for verification evidence, configuration requirements, remaining release gates and database recovery notes.
