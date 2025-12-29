# Environment Variables Checklist for Railway

## Required Environment Variables

Copy these to your Railway project's Variables tab:

### 🔐 Authentication & Security

```bash
# JWT Secret - Generate with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
JWT_SECRET=your_random_32_character_secret_here
```

### 🏏 Cricket API

```bash
# Get from https://cricketdata.org/
CRICKET_API_KEY=your_cricket_api_key_here
```

### 🔑 Manus OAuth (if using Manus authentication)

```bash
VITE_APP_ID=your_manus_app_id
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://auth.manus.im
OWNER_OPEN_ID=your_owner_open_id
OWNER_NAME=your_owner_name
```

### 🛠️ Manus Built-in APIs

```bash
BUILT_IN_FORGE_API_URL=https://api.manus.im/forge
BUILT_IN_FORGE_API_KEY=your_forge_api_key
VITE_FRONTEND_FORGE_API_KEY=your_frontend_forge_api_key
VITE_FRONTEND_FORGE_API_URL=https://api.manus.im/forge
```

### 🗄️ Database

```bash
# Automatically set when you add MySQL database to Railway
DATABASE_URL=mysql://username:password@host:port/database
```

### ⚙️ Application Configuration

```bash
NODE_ENV=production
```

---

## Optional Environment Variables

### 📊 Analytics (Optional)

```bash
VITE_ANALYTICS_ENDPOINT=your_analytics_endpoint
VITE_ANALYTICS_WEBSITE_ID=your_website_id
```

### 🎨 Branding (Optional)

```bash
VITE_APP_TITLE=Fantasy Basics
VITE_APP_LOGO=https://your-logo-url.com/logo.png
```

---

## How to Set Variables in Railway

1. Go to your Railway project dashboard
2. Click on your service
3. Go to **Variables** tab
4. Click **"+ New Variable"**
5. Enter variable name and value
6. Click **"Add"**
7. Railway will automatically redeploy with new variables

---

## Verification Checklist

After setting all variables:

- [ ] `JWT_SECRET` is set (32+ characters)
- [ ] `CRICKET_API_KEY` is set and valid
- [ ] `DATABASE_URL` is set (automatic when MySQL added)
- [ ] `NODE_ENV=production` is set
- [ ] Manus OAuth variables set (if using Manus auth)
- [ ] Manus API variables set (if using Manus features)
- [ ] Railway deployment completed successfully
- [ ] Check logs for any "undefined environment variable" errors
- [ ] Test registration and login on deployed site

---

## Common Mistakes to Avoid

❌ **Don't** include quotes around variable values in Railway  
✅ **Do** enter values directly: `my_secret_key_123`

❌ **Don't** add spaces before or after values  
✅ **Do** trim whitespace: `abc123` not ` abc123 `

❌ **Don't** commit `.env` file to GitHub  
✅ **Do** set variables in Railway dashboard only

❌ **Don't** use development values in production  
✅ **Do** use production API keys and secrets

---

## Security Best Practices

1. **Never commit secrets to GitHub**
   - Add `.env` to `.gitignore` (already done)
   - Use Railway's Variables tab for all secrets

2. **Use strong JWT_SECRET**
   - Minimum 32 characters
   - Random alphanumeric string
   - Generate with crypto.randomBytes()

3. **Rotate secrets regularly**
   - Change JWT_SECRET every 90 days
   - Update API keys when compromised
   - Monitor for unauthorized access

4. **Limit API key permissions**
   - Use read-only keys where possible
   - Set rate limits on Cricket API
   - Monitor API usage

---

## Troubleshooting

### Error: "JWT_SECRET is not defined"
**Fix**: Add `JWT_SECRET` variable in Railway dashboard and redeploy

### Error: "CRICKET_API_KEY is not defined"
**Fix**: Add `CRICKET_API_KEY` variable in Railway dashboard and redeploy

### Error: "Database connection failed"
**Fix**: Verify MySQL database is added and `DATABASE_URL` is set automatically

### Error: "Cannot read environment variable"
**Fix**: 
- Check variable name spelling (case-sensitive)
- Verify variable is set in Railway dashboard
- Restart deployment after adding variables

---

## Quick Reference

| Variable | Required | Source | Notes |
|----------|----------|--------|-------|
| `JWT_SECRET` | ✅ Yes | Generate random | Min 32 chars |
| `CRICKET_API_KEY` | ✅ Yes | cricketdata.org | Active subscription |
| `DATABASE_URL` | ✅ Yes | Railway MySQL | Auto-set |
| `NODE_ENV` | ✅ Yes | Manual | Set to "production" |
| `VITE_APP_ID` | ⚠️ If using Manus | Manus dashboard | OAuth app ID |
| `OAUTH_SERVER_URL` | ⚠️ If using Manus | Fixed | https://api.manus.im |
| `VITE_OAUTH_PORTAL_URL` | ⚠️ If using Manus | Fixed | https://auth.manus.im |
| `OWNER_OPEN_ID` | ⚠️ If using Manus | Manus profile | Your user ID |
| `OWNER_NAME` | ⚠️ If using Manus | Manus profile | Your name |
| `BUILT_IN_FORGE_API_URL` | ⚠️ If using Manus | Fixed | https://api.manus.im/forge |
| `BUILT_IN_FORGE_API_KEY` | ⚠️ If using Manus | Manus dashboard | Server API key |
| `VITE_FRONTEND_FORGE_API_KEY` | ⚠️ If using Manus | Manus dashboard | Frontend API key |
| `VITE_FRONTEND_FORGE_API_URL` | ⚠️ If using Manus | Fixed | https://api.manus.im/forge |
| `VITE_ANALYTICS_ENDPOINT` | ❌ Optional | Your analytics | If using analytics |
| `VITE_ANALYTICS_WEBSITE_ID` | ❌ Optional | Your analytics | If using analytics |
| `VITE_APP_TITLE` | ❌ Optional | Manual | App display name |
| `VITE_APP_LOGO` | ❌ Optional | Manual | Logo URL |

---

**Last Updated**: December 29, 2025  
**For**: Railway Deployment  
**Project**: Fantasy Basics
