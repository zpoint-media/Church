# 🔐 Security & Deployment Guide

## ⚠️ IMPORTANT: Your Credentials Were Exposed

Your MongoDB credentials and JWT secret were accidentally committed to your repository. **You must rotate these credentials immediately** before deploying.

### 🔄 Step 1: Rotate Your Credentials (CRITICAL)

#### MongoDB Database Credentials
1. Go to your MongoDB Atlas dashboard: https://cloud.mongodb.com
2. Navigate to Database Access
3. **Delete the old user**: `kolade443_db_user`
4. Create a new database user with a strong password
5. Update the connection string with the new credentials

#### JWT Secret
Generate a new, strong JWT secret:
```bash
# You can use this command to generate a random secret:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 📋 Step 2: Set Up Netlify Environment Variables

1. Go to your Netlify site dashboard
2. Navigate to: **Site settings → Build & deploy → Environment → Environment variables**
3. Add the following variables:

   | Variable Name | Value | Example |
   |--------------|-------|---------|
   | `MONGODB_URI` | Your NEW MongoDB connection string | `mongodb+srv://newuser:newpassword@cluster0.xxx.mongodb.net/church-cms` |
   | `JWT_SECRET` | Your NEW JWT secret | `a7f3d9e2b1c4a8f6d3e9b2c1a7f4d8e3b9c2a1f7d4e8b3c9a2f1d7e4b8c3a9` |
   | `ADMIN_EMAIL` | Your admin email | `admin@yourchurch.com` |
   | `ADMIN_PASSWORD` | Your admin password | Use a strong password |
   | `PORT` | Server port | `5000` |

### 🧹 Step 3: Clean Your Git History (REQUIRED)

Since the secrets were committed to your repository, they exist in your Git history. You must clean this:

```bash
# Install BFG Repo-Cleaner
# Download from: https://rtyley.github.io/bfg-repo-cleaner/

# Clone your repo fresh
git clone --mirror https://github.com/Tomisin-11/Mafoluku1.git

# Remove the .env file from all commits
bfg --delete-files .env Mafoluku1.git

# Clean up
cd Mafoluku1.git
git reflog expire --expire=now --all
git gc --prune=now --aggressive

# Force push (WARNING: This rewrites history)
git push --force
```

**Alternative using git filter-repo** (recommended):
```bash
# Install git-filter-repo
pip install git-filter-repo

# Clone your repo fresh
git clone https://github.com/Tomisin-11/Mafoluku1.git
cd Mafoluku1

# Remove .env from all history
git filter-repo --path server/.env --invert-paths

# Force push
git push origin --force --all
```

### 🚀 Step 4: Deploy to Netlify

1. Push this cleaned version to GitHub:
```bash
git add .
git commit -m "Security: Remove secrets from repo, add to gitignore"
git push origin main
```

2. In Netlify, trigger a new deploy (it will use the environment variables you set)

### 📝 Step 5: Local Development Setup

For local development, create a `.env` file in the `server/` directory:

```bash
cd server
cp .env.example .env
```

Then edit `.env` with your credentials. This file will NOT be committed (it's in .gitignore).

### ✅ Verification Checklist

- [ ] Deleted old MongoDB user and created new one
- [ ] Generated new JWT secret
- [ ] Set all environment variables in Netlify dashboard
- [ ] Cleaned Git history to remove committed secrets
- [ ] Force pushed cleaned history to GitHub
- [ ] `.env` files are listed in `.gitignore`
- [ ] No `.env` file exists in the repository
- [ ] Netlify deploy succeeds

### 🔍 Additional Security Tips

1. **Never commit secrets**: Always use environment variables
2. **Use strong passwords**: For admin accounts and database users
3. **Rotate credentials regularly**: Change passwords and secrets periodically
4. **Monitor access**: Check MongoDB Atlas and Netlify logs regularly
5. **Enable 2FA**: On GitHub, MongoDB Atlas, and Netlify accounts

### 📞 Need Help?

- Netlify Secrets Scanning Docs: https://ntl.fyi/configure-secrets-scanning
- MongoDB Atlas Security: https://www.mongodb.com/docs/atlas/security/
- Git History Cleaning: https://rtyley.github.io/bfg-repo-cleaner/

---

**Note**: The original credentials that were exposed:
- MongoDB URI: `mongodb+srv://kolade443_db_user:HeH1qUdbXnCUdIHQ@cluster0.xtnsgu0.mongodb.net/church-cms`
- These credentials should be considered compromised and must be rotated.
