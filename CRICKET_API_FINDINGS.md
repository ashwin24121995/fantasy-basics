# Cricket API Research - Upcoming Matches Issue

## Problem
- fantasybasics.com shows "Upcoming (0)" matches
- khelosmart.com shows "Upcoming (64)" matches
- Both use the same Cricket API

## Root Cause
Current implementation uses `/currentMatches` endpoint which only returns TODAY's matches (live + completed today).
It does NOT return future/upcoming matches.

## Solution
Use `/matches` endpoint (All Matches List) instead of `/currentMatches`.

### API Endpoints Comparison

**Current (Wrong):**
- Endpoint: `https://api.cricapi.com/v1/currentMatches`
- Returns: Only matches happening TODAY
- Result: 0 upcoming matches (because all today's matches have started)

**Correct:**
- Endpoint: `https://api.cricapi.com/v1/matches`
- Returns: ALL matches (past, present, future)
- Result: Will include upcoming matches scheduled for future dates

### API Documentation
Source: https://cricketdata.org/how-to-use-cricket-data-api.aspx

**All Matches List API:**
- URL: `https://api.cricapi.com/v1/matches?apikey={API_KEY}&offset={OFFSET}`
- Description: "A large list of all matches covered"
- Returns: All matches including future ones
- Pagination: 25 matches per page (use offset parameter for more)

**Current Matches List API:**
- URL: `https://api.cricapi.com/v1/currentMatches?apikey={API_KEY}&offset={OFFSET}`
- Description: "Current matches only (today's matches)"
- Returns: Only matches happening today
- Limitation: Does NOT include future matches

## Implementation Plan
1. Update `server/cricketApi.ts` to use `/matches` endpoint
2. Keep the same filtering logic (matchStarted, matchEnded fields)
3. Test that upcoming matches now appear
4. Deploy to production

## API Key
Using paid unlimited API key: `1a822521-d7e0-46ff-98d3-3e51020863f3`
- Unlimited hits per day
- Valid until: 18 Jan 2026
- Status: Active
