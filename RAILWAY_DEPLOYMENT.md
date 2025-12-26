# Railway Deployment Guide for Kavera Fantasy Cricket

## 🚨 Current Issue

Your production website (fantasybasics.com) is showing database connection errors:
```
Failed query: select from users where users.email = ?
```

This means Railway doesn't have a database configured or environment variables set up.

---

## ✅ Step-by-Step Fix

### 1. Add MySQL Database to Railway

1. Go to your Railway dashboard: https://railway.app/dashboard
2. Open your `fantasy_basics` project
3. Click **"+ New"** → **"Database"** → **"Add MySQL"**
4. Railway will automatically create a MySQL database and set the `DATABASE_URL` environment variable

**Alternative:** If you prefer PostgreSQL, you can use that instead (just change the connection string format).

---

### 2. Set Required Environment Variables

In your Railway project settings, add these environment variables:

#### Required Variables:

```bash
# Database (automatically set when you add MySQL database)
DATABASE_URL=mysql://user:password@host:port/database

# JWT Secret (generate a random string)
JWT_SECRET=your-super-secret-jwt-key-change-this-to-random-string

# Cricket API Key (from cricketdata.org)
CRICKET_API_KEY=your-cricket-api-key-here

# Node Environment
NODE_ENV=production
```

#### How to Generate JWT_SECRET:
Run this command in your terminal:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

#### How to Get CRICKET_API_KEY:
1. Go to https://cricketdata.org/
2. Sign up for an account
3. Get your API key from the dashboard

---

### 3. Run Database Migrations

After adding the database, you need to create the tables. Railway should automatically run migrations on deployment, but if not:

#### Option A: Let Railway run it automatically
Make sure your `package.json` has this in scripts:
```json
"build": "vite build && esbuild server/_core/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist && pnpm db:push"
```

#### Option B: Run manually via Railway CLI
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Link to your project
railway link

# Run migrations
railway run pnpm db:push
```

---

### 4. Configure Build & Start Commands

In Railway project settings, set:

**Build Command:**
```bash
pnpm install && pnpm build
```

**Start Command:**
```bash
pnpm start
```

**Root Directory:** (leave as `/` or set to your project root)

---

### 5. Deploy

After setting up the database and environment variables:

1. Railway will automatically redeploy
2. Wait for deployment to complete (check logs)
3. Visit fantasybasics.com and test registration/login

---

## 🔍 Troubleshooting

### If registration still fails:

1. **Check Railway logs:**
   - Go to Railway dashboard
   - Click on your service
   - View "Deployments" → Click latest deployment → "View Logs"
   - Look for database connection errors

2. **Verify DATABASE_URL format:**
   ```
   mysql://username:password@host:port/database
   ```

3. **Test database connection:**
   Add this to your Railway service and check logs:
   ```bash
   railway run node -e "console.log(process.env.DATABASE_URL)"
   ```

4. **Check if tables exist:**
   - Go to Railway MySQL database
   - Click "Data" tab
   - Verify `users`, `teams`, `contests` tables exist
   - If not, run `pnpm db:push` manually

### Common Errors:

**Error:** `ECONNREFUSED` or `Connection timeout`
- **Fix:** Database not added or DATABASE_URL incorrect

**Error:** `Table 'users' doesn't exist`
- **Fix:** Run `pnpm db:push` to create tables

**Error:** `JWT_SECRET is not defined`
- **Fix:** Add JWT_SECRET environment variable

---

## 📋 Checklist

- [ ] MySQL database added to Railway project
- [ ] DATABASE_URL environment variable set (automatic)
- [ ] JWT_SECRET environment variable set
- [ ] CRICKET_API_KEY environment variable set  
- [ ] NODE_ENV=production set
- [ ] Build command configured: `pnpm install && pnpm build`
- [ ] Start command configured: `pnpm start`
- [ ] Database migrations run (`pnpm db:push`)
- [ ] Deployment successful (check logs)
- [ ] Test registration on fantasybasics.com
- [ ] Test login on fantasybasics.com
- [ ] Verify navigation updates to DASHBOARD/LOGOUT after login

---

## 🎯 Expected Result

After completing these steps:

✅ Registration should work without errors
✅ Login should work and set JWT cookie
✅ Navigation should show DASHBOARD/LOGOUT when logged in
✅ Dashboard should be accessible
✅ All database queries should work

---

## 💡 Need Help?

If you're still seeing errors after following this guide:

1. Share the Railway deployment logs
2. Share the exact error message from the browser console
3. Verify all environment variables are set correctly in Railway dashboard
