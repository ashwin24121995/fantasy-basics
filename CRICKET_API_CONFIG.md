# Cricket API Configuration

## API Details

**Provider:** cricketdata.org  
**Base URL:** `https://api.cricapi.com/v1/`  
**API Key:** `afb22ee0-add7-48b4-af1d-bdf319c03c9d`  
**Account:** Rahul Singh (sonu.singh3622@yahoo.in)  
**Subscription:** Paid plan with Fantasy API access (expires Jan 18, 2026, auto-renews)

## Current Implementation Status

✅ **GOOD NEWS:** The current implementation is already using the correct API!

The existing code in `/home/ubuntu/fantasy_basics/server/cricketApi.ts` is already configured correctly:
- Base URL: `https://api.cricapi.com/v1` ✅ (line 9)
- Request format: GET with `apikey` query parameter ✅ (line 210-214)
- Endpoints: `currentMatches`, `match_info`, `match_squad`, etc. ✅

## What Needs to be Fixed

**ONLY** update the API key in the environment variables:

1. **Development (Manus):** Already set via `CRICKET_API_KEY` environment variable
2. **Production (Railway):** Need to set `CRICKET_API_KEY=afb22ee0-add7-48b4-af1d-bdf319c03c9d`

## API Endpoints (Already Implemented)

1. **Current Matches:** `GET /currentMatches?apikey={key}&offset={offset}`
2. **Match Info:** `GET /match_info?apikey={key}&id={matchId}`
3. **Fantasy Squad:** `GET /match_squad?apikey={key}&id={matchId}`
4. **Match Scorecard:** `GET /match_scorecard?apikey={key}&id={matchId}`
5. **Fantasy Points:** `GET /match_points?apikey={key}&id={matchId}`
6. **Player Info:** `GET /players_info?apikey={key}&id={playerId}`

## Example Response (Current Matches)

```json
{
  "apikey": "afb22ee0-add7-48b4-af1d-bdf319c03c9d",
  "data": [
    {
      "id": "5ab314c7-e95f-441c-b22e-cd1ee7a2b399",
      "name": "Sharjah Warriorz vs Desert Vipers, 28th Match",
      "matchType": "t20",
      "status": "Desert Vipers need 92 runs in 71 balls",
      "venue": "Sharjah Cricket Stadium, Sharjah",
      "date": "2025-12-26",
      "dateTimeGMT": "2025-12-26T14:30:00",
      "teams": ["Sharjah Warriorz", "Desert Vipers"]
    }
  ],
  "status": "success",
  "info": {
    "hitsToday": 3372,
    "hitsLimit": 500,
    "server": 18,
    "offsetRows": 0,
    "totalRows": 30,
    "queryTime": 2169
  }
}
```

## Conclusion

**NO CODE CHANGES NEEDED!** The implementation is correct. Just need to:
1. Update `CRICKET_API_KEY` in Railway environment variables
2. Test that matches are loading correctly
