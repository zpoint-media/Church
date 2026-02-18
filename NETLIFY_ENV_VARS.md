# Netlify Environment Variables - Quick Setup

## Required Environment Variables

Add these in Netlify: **Site settings → Build & deploy → Environment → Environment variables**

### Variables to Add:

1. **MONGODB_URI**
   - **IMPORTANT**: Generate a NEW connection string with NEW credentials
   - Format: `mongodb+srv://USERNAME:PASSWORD@cluster0.XXXXX.mongodb.net/church-cms`
   - Get from: MongoDB Atlas → Connect → Drivers

2. **JWT_SECRET**
   - **IMPORTANT**: Generate a NEW secret
   - Use this command: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
   - Example: `7d3f9e2b1c4a8f6d3e9b2c1a7f4d8e3b9c2a1f7d4e8b3c9a2f1d7e4b8c3a9f2`

3. **ADMIN_EMAIL**
   - Your admin login email
   - Example: `admin@yourchurch.com`

4. **ADMIN_PASSWORD**
   - Secure admin password
   - Use a strong password (12+ characters, mix of letters, numbers, symbols)

5. **PORT** (optional)
   - Value: `5000`

## After Setting Variables:

1. ✅ Save all environment variables in Netlify
2. ✅ Deploy your site (use the cleaned code in this zip)
3. ✅ The build should now succeed!

## ⚠️ Remember:

- **DO NOT** commit the `.env` file to Git
- **DO** rotate your old credentials (they were exposed)
- **DO** clean your Git history as described in DEPLOYMENT_SECURITY_GUIDE.md
