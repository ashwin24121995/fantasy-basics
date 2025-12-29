# Railway Deployment Quick Start

## ✅ Your Website is Ready for Railway!

**GitHub Repository**: https://github.com/ashwin24121995/fantasy-basics.git  
**Latest Commit**: All features including status badges pushed successfully

---

## 🚀 Deploy in 5 Minutes

### Step 1: Create Railway Project

1. Go to https://railway.app and log in with GitHub
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"**
4. Choose **`ashwin24121995/fantasy-basics`**
5. Railway will auto-detect Node.js and start building

### Step 2: Add MySQL Database

1. In your Railway project, click **"+ New"** → **"Database"** → **"Add MySQL"**
2. Railway automatically sets `DATABASE_URL` environment variable
3. Wait for database to be ready (green status)

### Step 3: Set Environment Variables

Go to your Railway project → **Variables** tab and add:

```bash
# Required - Cricket API
CRICKET_API_KEY=your_cricket_api_key_from_cricketdata.org

# Required - JWT Secret (generate random string)
JWT_SECRET=your_random_32_character_secret

# Required - Manus OAuth (if using Manus auth)
VITE_APP_ID=your_manus_app_id
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://auth.manus.im
OWNER_OPEN_ID=your_owner_open_id
OWNER_NAME=your_owner_name

# Required - Manus APIs
BUILT_IN_FORGE_API_URL=https://api.manus.im/forge
BUILT_IN_FORGE_API_KEY=your_forge_api_key
VITE_FRONTEND_FORGE_API_KEY=your_frontend_forge_api_key
VITE_FRONTEND_FORGE_API_URL=https://api.manus.im/forge

# Required - Production mode
NODE_ENV=production
```

**Generate JWT_SECRET**:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Get CRICKET_API_KEY**:
- Sign up at https://cricketdata.org/
- Get API key from dashboard

### Step 4: Run Database Migrations

After deployment completes:

**Option A: Automatic (Recommended)**
- Migrations run automatically on first deployment
- Check logs to verify tables were created

**Option B: Manual**
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and link project
railway login
railway link

# Run migrations
railway run pnpm db:push
```

### Step 5: Configure Domain

**Free Railway Domain:**
1. Go to Settings → Domains
2. Click **"Generate Domain"**
3. Get URL like `fantasy-basics.up.railway.app`

**Custom Domain (fantasybasics.com):**
1. Click **"Custom Domain"**
2. Enter `fantasybasics.com`
3. Add CNAME record to your DNS:
   - Type: CNAME
   - Name: @ (or www)
   - Value: (provided by Railway)

---

## 📦 What's Already Configured

✅ **Build Configuration**
- Build command: `pnpm install && pnpm build`
- Start command: `pnpm start`
- Port: Automatically uses Railway's `PORT` variable

✅ **Database Schema**
- Users table with authentication
- Teams table for fantasy teams
- Contests table for competitions
- All relationships configured

✅ **Features Deployed**
- User registration & login
- Match data from Cricket API
- Fantasy team creation
- Contest management
- Live match tracking
- Status badges (LIVE/UPCOMING/COMPLETED)
- Responsive design
- Footer with company info

✅ **Environment**
- Node.js 22.x
- pnpm package manager
- MySQL database
- Express server
- React 19 frontend
- tRPC API

---

## 🔍 Verify Deployment

After deployment completes:

1. **Check Build Logs**
   - Railway dashboard → Deployments → Latest → View Logs
   - Look for "Build succeeded" message

2. **Check Runtime Logs**
   - Railway dashboard → Logs tab
   - Look for "Server running on port 3000" message

3. **Test Website**
   - Visit your Railway URL
   - Test registration: Create new account
   - Test login: Log in with credentials
   - Test navigation: Check all pages load
   - Test matches: Verify match data loads

4. **Verify Database**
   - Railway dashboard → MySQL → Data tab
   - Check if tables exist: users, teams, contests
   - Verify data is being saved

---

## ⚠️ Common Issues & Fixes

### Issue: "Database connection failed"
**Fix**: 
- Verify MySQL database is added to Railway project
- Check `DATABASE_URL` is automatically set
- Wait 1-2 minutes for database to be fully ready

### Issue: "Table 'users' doesn't exist"
**Fix**:
- Run `railway run pnpm db:push` manually
- Or redeploy to trigger automatic migrations

### Issue: "Cricket API key invalid"
**Fix**:
- Verify `CRICKET_API_KEY` is set correctly
- Check API key is active at cricketdata.org
- Ensure no extra spaces in the key

### Issue: "Port already in use"
**Fix**:
- This shouldn't happen on Railway
- If it does, check server code uses `process.env.PORT`

### Issue: "Build failed"
**Fix**:
- Check Railway build logs for specific error
- Verify `pnpm-lock.yaml` is committed to GitHub
- Ensure all dependencies are in `package.json`

---

## 📊 Monitoring

**View Logs:**
- Railway dashboard → Your service → Logs tab
- Real-time logs of all server activity

**Check Metrics:**
- Railway dashboard → Metrics tab
- CPU, memory, network usage

**Set Up Alerts:**
- Railway dashboard → Settings → Notifications
- Get notified of deployment failures

---

## 🎯 Post-Deployment Checklist

- [ ] Railway project created and deployed
- [ ] MySQL database added and connected
- [ ] All environment variables set
- [ ] Database migrations completed
- [ ] Website accessible at Railway URL
- [ ] Registration working
- [ ] Login working
- [ ] Match data loading
- [ ] Custom domain configured (if applicable)
- [ ] Auto-deploy enabled from GitHub

---

## 📚 Additional Resources

- **Full Deployment Guide**: See `RAILWAY_DEPLOYMENT.md` for detailed instructions
- **Railway Docs**: https://docs.railway.app
- **Railway Discord**: https://discord.gg/railway
- **GitHub Repository**: https://github.com/ashwin24121995/fantasy-basics

---

## 💡 Next Steps After Deployment

1. **Test thoroughly**: Create test accounts, teams, and contests
2. **Monitor logs**: Watch for any errors in first 24 hours
3. **Set up backups**: Configure Railway database backups
4. **Add monitoring**: Set up uptime monitoring (e.g., UptimeRobot)
5. **Configure SSL**: Railway provides SSL automatically
6. **Set up CI/CD**: Auto-deploy is already enabled from GitHub

---

**Deployment Date**: December 29, 2025  
**Version**: Latest with status badges feature  
**Status**: ✅ Ready for Production
