# Railway Database Setup Guide

## Problem
Your production site (fantasybasics.com) shows login errors because the database tables haven't been created yet.

**Error:** `Failed query: select ... from users where usersemail = ?`

## Solution
Run the database migration on your Railway MySQL database to create all required tables.

---

## Option 1: Use Railway CLI (Recommended - Fastest)

### Step 1: Install Railway CLI
```bash
npm install -g @railway/cli
```

### Step 2: Login to Railway
```bash
railway login
```

### Step 3: Link to Your Project
```bash
cd /path/to/fantasy_basics
railway link
```
Select your project from the list.

### Step 4: Run Migration
```bash
railway run pnpm db:push
```

This will automatically:
- Connect to your production database
- Create all 8 tables (users, matches, players, contests, user_teams, team_players, user_contests, contact_submissions)
- Add all indexes
- Apply all schema changes

---

## Option 2: Use Railway Web Dashboard (Manual SQL)

### Step 1: Access Railway Dashboard
1. Go to https://railway.app/
2. Login to your account
3. Select your `fantasy_basics` project
4. Click on the **MySQL** service

### Step 2: Open Database Query Tool
1. In the MySQL service page, click on the **"Data"** tab
2. Or click **"Query"** to open the SQL query editor

### Step 3: Run Migration SQL
Copy and paste the contents of `production_migration.sql` (located in your project root) into the query editor and execute it.

**Important:** The SQL file contains multiple statements. You may need to run them in sections if Railway limits query size.

---

## Option 3: Use MySQL Client (Advanced)

### Step 1: Get Database Connection String
1. Go to Railway dashboard → MySQL service
2. Click on **"Connect"** tab
3. Copy the connection string (format: `mysql://user:password@host:port/database`)

### Step 2: Connect with MySQL Client
```bash
mysql -h [host] -u [user] -p[password] -P [port] [database]
```

### Step 3: Run Migration File
```bash
mysql -h [host] -u [user] -p[password] -P [port] [database] < production_migration.sql
```

---

## Verify Tables Were Created

After running the migration, verify all tables exist:

```sql
SHOW TABLES;
```

You should see 8 tables:
- `users`
- `matches`
- `players`
- `contests`
- `user_teams`
- `team_players`
- `user_contests`
- `contact_submissions`

Check the users table structure:
```sql
DESCRIBE users;
```

---

## Test Login After Migration

1. Go to https://fantasybasics.com/register
2. Create a new account with:
   - Full Name
   - Email
   - Password (min 8 characters)
3. Click "CREATE FREE ACCOUNT"
4. You should be redirected to the dashboard
5. Try logging out and logging back in to verify login works

---

## Troubleshooting

### Error: "Table already exists"
If you see this error, it means some tables were partially created. You can either:
1. Drop the existing tables and re-run the migration
2. Or skip the CREATE TABLE statements and only run the ALTER TABLE statements

### Error: "Connection refused"
- Check that your Railway MySQL service is running
- Verify the DATABASE_URL environment variable is set correctly
- Ensure your IP is not blocked by Railway's firewall

### Error: "Access denied"
- Verify your database credentials are correct
- Check that the user has CREATE and ALTER permissions

---

## Next Steps

After tables are created:
1. ✅ Test registration at https://fantasybasics.com/register
2. ✅ Test login at https://fantasybasics.com/login
3. ✅ Verify user dashboard loads correctly
4. ✅ Check that matches page shows cricket data
5. ✅ Test creating a fantasy team

---

## Database Schema Overview

### Users Table
- Stores user accounts with email/password authentication
- Fields: id, name, email, passwordHash, role, dateOfBirth, age, state, etc.
- Age verification (18+) and geo-restriction support

### Matches Table
- Caches match data from Cricket Data API
- Fields: id, name, matchType, dateTimeGMT, matchState, team1, team2, scores, etc.
- Indexed by matchState and dateTimeGMT for fast queries

### Players Table
- Caches player data from Cricket Data API
- Fields: id, name, role, battingStyle, bowlingStyle, imageUrl

### Contests Table
- Fantasy contests for matches
- Fields: id, matchId, name, maxEntries, currentEntries, status, startTime

### User Teams Table
- User's fantasy teams for contests
- Fields: id, userId, contestId, matchId, teamName, captainId, viceCaptainId, totalPoints

### Team Players Table
- Players selected in each user team
- Fields: id, userTeamId, playerId, role, points

### User Contests Table
- Tracks user entries in contests
- Fields: id, userId, contestId, userTeamId, finalRank

### Contact Submissions Table
- Contact form submissions
- Fields: id, name, email, subject, message, status

---

## Need Help?

If you encounter any issues:
1. Check Railway logs for database connection errors
2. Verify DATABASE_URL environment variable is set
3. Ensure MySQL service is running in Railway dashboard
4. Contact Railway support if database access issues persist
