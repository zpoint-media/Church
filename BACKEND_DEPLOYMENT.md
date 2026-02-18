# 🚀 Backend Deployment Guide - Fix Server Error 404

## The Problem
Your site shows "Server error 404" because:
- ✅ Frontend is deployed on Netlify
- ❌ Backend API is NOT deployed anywhere

## The Solution - Deploy Backend to Render (FREE)

### Step 1: Create Render Account
1. Go to https://render.com
2. Sign up with GitHub (easiest option)

### Step 2: Create New Web Service
1. In Render dashboard, click **"New +"** button (top right)
2. Select **"Web Service"**
3. Click **"Build and deploy from a Git repository"**
4. Click **"Connect account"** if needed, or select your GitHub
5. Find your repository: **Tomisin-11/Mafoluku1** (or whatever your repo name is)
6. Click **"Connect"**

### Step 3: Configure the Web Service

Fill in these settings:

**Name**: `mafoluku-api` (or any name you want)

**Region**: Choose closest to you (e.g., Oregon/Frankfurt)

**Branch**: `main`

**Root Directory**: Leave blank

**Runtime**: `Node`

**Build Command**:
```
cd server && npm install
```

**Start Command**:
```
cd server && node index.js
```

**Instance Type**: Select **"Free"** (free tier is enough)

### Step 4: Add Environment Variables in Render

Scroll down to **"Environment Variables"** section and add these:

Click **"Add Environment Variable"** for each:

1. **Key**: `MONGODB_URI`  
   **Value**: `mongodb+srv://kolade443_db_user:Mafoluku1@cluster0.xtnsgu0.mongodb.net/church-cms`

2. **Key**: `JWT_SECRET`  
   **Value**: `your_super_secret_jwt_key_change_this_in_production_12345`

3. **Key**: `ADMIN_EMAIL`  
   **Value**: `admin@church.com`

4. **Key**: `ADMIN_PASSWORD`  
   **Value**: `Admin@123`

5. **Key**: `PORT`  
   **Value**: `10000`

6. **Key**: `NODE_ENV`  
   **Value**: `production`

### Step 5: Deploy!
1. Click **"Create Web Service"** at the bottom
2. Wait for deployment (takes 2-5 minutes)
3. Once done, you'll get a URL like: `https://mafoluku-api.onrender.com`
4. **COPY THIS URL** - you'll need it!

### Step 6: Test Your Backend
Visit: `https://your-render-url.onrender.com/api/health`

You should see:
```json
{"status":"ok","time":"2026-02-13T..."}
```

If you see this ✅ - your backend is working!

---

## Part 2: Connect Frontend to Backend

### Step 7: Add API URL to Netlify

1. Go to Netlify dashboard
2. Select your site: **mafoluku1**
3. Go to **Site settings → Environment variables**
4. Click **"Add a variable"**
5. Add this variable:

   **Key**: `VITE_API_URL`  
   **Value**: `https://your-render-url.onrender.com/api`
   
   Example: `https://mafoluku-api.onrender.com/api`

6. **Important**: Make sure to include `/api` at the end!

### Step 8: Redeploy Frontend
1. Still in Netlify, go to **"Deploys"** tab
2. Click **"Trigger deploy" → "Clear cache and deploy site"**
3. Wait for deployment to finish

### Step 9: Test!
1. Go to your site: `https://mafoluku1.netlify.app/admin/login`
2. Try logging in with:
   - Email: `admin@church.com`
   - Password: `Admin@123`

✅ **It should work now!**

---

## 🔍 Troubleshooting

### "Server error 404" still showing?
- Check that VITE_API_URL in Netlify has `/api` at the end
- Verify your Render backend is running (check the URL)
- Clear your browser cache

### Backend not deploying on Render?
- Check the logs in Render dashboard
- Verify all environment variables are set
- Make sure MongoDB connection string is correct

### CORS errors?
The CORS is already configured to allow your Netlify domain. If you changed your Netlify site name, you may need to update server/index.js

---

## 📝 Summary

✅ Logo replaced with new image  
✅ Backend configured for Render deployment  
✅ Frontend configured to connect to backend  
✅ CORS updated for Netlify domain  

**What you need to do:**
1. Deploy backend to Render (Steps 1-6)
2. Add VITE_API_URL to Netlify (Step 7)
3. Redeploy frontend (Step 8)
4. Test! (Step 9)

---

## 💰 Cost
- **Render Free Tier**: $0/month
- **Netlify Free Tier**: $0/month
- **Total**: FREE! 🎉

**Note**: Render free tier spins down after 15 minutes of inactivity, so the first request after inactivity might take 30-60 seconds to wake up. This is normal for free tier.
