# Setup Guide

## Local Development

```bash
npm install       # installs root + server deps
npm run dev       # starts backend (:5000) + frontend (:5173) together
```

Admin login: `admin@church.com` / `Admin@123`

---

## Hosting (Netlify frontend + Render backend)

This project has two parts:
- **Frontend** → Netlify (static site)
- **Backend** → Render (Node/Express server)

### Step 1: Deploy the backend to Render

1. Push this repo to GitHub
2. Go to [render.com](https://render.com) → New Web Service
3. Connect your repo, set root directory to `server/`
4. Build command: `npm install`
5. Start command: `node index.js`
6. Add environment variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   PORT=5000
   ```
7. Copy your Render URL, e.g. `https://your-app.onrender.com`

### Step 2: Deploy the frontend to Netlify

1. Go to [netlify.com](https://netlify.com) → New site from Git
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Add environment variable in Netlify dashboard:
   ```
   VITE_API_URL=https://your-app.onrender.com/api
   ```
   ⚠️ This is critical — without it, the admin panel won't connect to the backend.

### Step 3: Update CORS in server/index.js

Add your Netlify URL to the `allowed` array in `server/index.js`:
```js
"https://your-site.netlify.app",
```

---

## Why the page was blank

The `Verse` component had a bug where `refs` (a new array) was declared 
outside `useEffect` but used as a dependency — causing infinite re-renders 
that crashed the browser tab. This has been fixed.

## Why admin showed "backend not running"

When hosted on Netlify, the Express backend isn't running there — it must 
be deployed separately (e.g. Render) and connected via `VITE_API_URL`.
