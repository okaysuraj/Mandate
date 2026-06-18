# 🚀 Deployment Guide

This guide details how to deploy the Mandate platform in a robust production environment.

## Strategy
- **Frontend:** Hosted on **Netlify** (Globally distributed CDN, excellent for Vite/React SPAs).
- **Backend:** Hosted on **Render** (Fully managed PaaS, great for Express/WebSockets).
- **Database:** Hosted on **MongoDB Atlas**.
- **Cache:** Hosted on **Upstash Redis**.

---

## 1. Provision Databases

### MongoDB Atlas
1. Create a free cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Go to **Database Access** and create a user with read/write privileges.
3. Go to **Network Access** and allow IP `0.0.0.0/0` (Allow from anywhere).
4. Click **Connect -> Connect your application** and copy the `MONGO_URI` connection string.

### Upstash Redis
1. Create a free Redis database on [Upstash](https://upstash.com/).
2. Copy the "Redis URL" connection string.

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
   - `REDIS_URL` = `<Your Upstash String>`
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
