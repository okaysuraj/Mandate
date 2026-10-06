# Mandate

Task management and team collaboration with a React web app, Expo mobile app, and Express API.

`backend/` contains the API, `frontend/` the web app, `mobile/` the native app, and `shared/` common logic.

## Requirements

Node.js 22+, npm, a MongoDB replica set (local or Atlas), and a Firebase project with Authentication enabled.

## Local development

From the repository root, install dependencies:

```sh
npm ci --prefix backend
npm ci --prefix frontend
npm ci --prefix mobile
```

Create `.env` in `backend/`, `frontend/`, and `mobile/` if missing. Backend requires `MONGO_URI`, `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, and a quoted `FIREBASE_PRIVATE_KEY` with escaped `\n` newlines. Use `NODE_ENV=development`, `PORT=5001`, and `FRONTEND_URL=http://localhost:5173`; see [backend configuration](backend/README.md) for CORS and optional integrations.

Set frontend `VITE_API_BASE_URL=http://localhost:5001`. Both clients require Firebase settings: `API_KEY`, `AUTH_DOMAIN`, `PROJECT_ID`, `STORAGE_BUCKET`, `MESSAGING_SENDER_ID`, and `APP_ID`, prefixed with `VITE_FIREBASE_` for web and `EXPO_PUBLIC_FIREBASE_` for mobile. Keep private credentials in the backend; `.env` files are ignored by Git.

Start the backend and web app together:

```sh
npm run dev
```

Open http://localhost:5173; the API runs at http://localhost:5001. Restart the servers after environment changes.

For mobile, run `npm run start --prefix mobile`. Leave `EXPO_PUBLIC_API_URL` blank to use Expo's host address, or set `EXPO_PUBLIC_API_IP` to your computer's LAN IP. Connect the phone to the same network; Android emulator overrides can use `10.0.2.2`.

## Production

Set backend `NODE_ENV=production`, `FRONTEND_URL`, and `CORS_ORIGINS` to the deployed web origin. Set frontend `VITE_API_BASE_URL` and mobile `EXPO_PUBLIC_API_URL` to the HTTPS API origin before building. Configure secrets through the deployment environment.

Build the web app with `npm run build --prefix frontend` and serve `frontend/dist` with SPA routing. Run the API with `npm start`. Review database changes with `npm run db:audit --prefix backend` before applying migrations; see [backend setup](backend/README.md).

## Contributing

Run `npm run lint --prefix frontend` and `npm run build --prefix frontend` before submitting changes. Describe the change and how you verified it in your pull request.

See [development notes](docs/AUDIT.md), [feature coverage](docs/PARITY.md), and [content publishing](docs/public-pages/README.md) for remaining work and operations.
