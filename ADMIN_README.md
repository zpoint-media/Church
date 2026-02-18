# Mafoluku Parish CMS — Admin Panel Setup Guide

## Overview

This admin system lets you edit **all text content** on the church website through a beautiful dashboard, with changes saved to MongoDB and reflected live on the site.

---

## Architecture

```
Church-main/
├── server/          ← Node.js + Express + MongoDB backend API
│   ├── index.js     ← Server entry point
│   ├── models/      ← User.js, Content.js (Mongoose schemas)
│   ├── routes/      ← auth.js, content.js
│   ├── middleware/  ← auth.js (JWT protect)
│   ├── seed.js      ← Seeds DB with initial content
│   └── .env.example ← Environment variable template
│
└── src/
    ├── admin/       ← React admin dashboard
    │   ├── AdminApp.jsx         ← Router for all /admin/* routes
    │   ├── AdminLogin.jsx       ← Login page
    │   ├── AdminLayout.jsx      ← Sidebar + layout
    │   ├── AdminDashboard.jsx   ← Overview/stats page
    │   ├── context/AuthContext.jsx
    │   ├── editors/
    │   │   ├── HomeEditor.jsx
    │   │   ├── AboutEditor.jsx
    │   │   ├── EventHighlightEditor.jsx
    │   │   ├── EventsGridEditor.jsx
    │   │   ├── SermonsEditor.jsx
    │   │   ├── VerseEditor.jsx
    │   │   └── FooterEditor.jsx
    │   ├── components/FieldEditor.jsx
    │   └── api.js               ← API utility
    │
    └── hooks/useContent.js      ← Hook used by site pages to fetch content
```

---

## Setup Instructions

### Step 1 — MongoDB

Install MongoDB locally or use MongoDB Atlas (free cloud):
- **Local**: https://www.mongodb.com/try/download/community
- **Atlas**: https://www.mongodb.com/atlas/database

### Step 2 — Backend Server

```bash
# Navigate to the server folder
cd server

# Install dependencies
npm install

# Create your .env file
cp .env.example .env
# Then edit .env with your MongoDB URI and a secret key

# Seed the database (creates default admin + all content)
npm run seed

# Start the server
npm run dev    # development (with nodemon)
# or
npm start      # production
```

The server runs at **http://localhost:5000**

### Step 3 — Frontend

```bash
# From the Church-main root
npm install

# Create .env (optional — defaults to http://localhost:5000/api)
echo "VITE_API_URL=http://localhost:5000/api" > .env.local

# Start the dev server
npm run dev
```

### Step 4 — Access the Admin Panel

Open **http://localhost:5173/admin**

Default credentials (set in seed.js / .env):
- **Email**: admin@church.com
- **Password**: Admin@123

> ⚠️ Change these immediately in production!

---

## What You Can Edit

| Section | URL | Fields |
|---------|-----|--------|
| Home Hero | `/admin/home` | Slides: subtitle, title, text, button labels |
| About | `/admin/about` | Parish name, description, 4 feature cards |
| Event Highlight | `/admin/event-highlight` | Upcoming event + latest sermon details |
| Events Grid | `/admin/events-grid` | All 6 event cards with date, time, title, address |
| Sermons | `/admin/sermons` | All sermon cards: category, title, description, scripture |
| Verse Section | `/admin/verse` | Bible verse fallback slides |
| Footer | `/admin/footer` | Newsletter, news items, links, social links, copyright |

---

## Environment Variables

**server/.env**
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/church-cms
JWT_SECRET=your_super_secret_key_here
ADMIN_EMAIL=admin@church.com
ADMIN_PASSWORD=Admin@123
```

**src/.env.local** (optional)
```
VITE_API_URL=http://localhost:5000/api
```

---

## How It Works

1. **Site pages** use the `useContent()` hook which fetches from the API with a session cache and falls back to hardcoded defaults if the server is unreachable.
2. **Admin editors** call `PUT /api/content/:section` (JWT-protected) to save changes.
3. Changes are immediately reflected on the site (next page load / cache refresh).

---

## Production Deployment

1. Deploy the `server/` folder to any Node.js host (Railway, Render, Heroku, VPS)
2. Set environment variables on the host
3. Update `VITE_API_URL` in your frontend `.env` to point to the production server
4. Build the frontend: `npm run build`
