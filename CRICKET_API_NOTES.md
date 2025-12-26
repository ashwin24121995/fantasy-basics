# Cricket API Documentation Notes

## API Provider: cricketdata.org

**Base URL:** Not explicitly shown in docs, but based on examples it appears to use POST requests with JSON body

**Authentication:** 
- API Key format: GUID (xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)
- Passed in request body as `apikey` parameter

**User Credentials (provided):**
- Email: sonu.singh3622@yahoo.in
- Password: PwD74O1920.657
- Need to login to get API key from member area

## Key API Endpoints

### Current Matches List
- Returns list of current matches (upcoming, live, recent)
- Input parameters:
  - `apikey`: Your API key (GUID format)
  - `offset`: Pagination offset (default 0, page size 25)
- Response format:
  ```json
  {
    "apikey": "[your api key]",
    "status": "success",
    "data": [...],
    "info": {
      "hitsToday": 10,
      "hitsLimit": 500,
      "credits": 0,
      "server": 18,
      "offsetRows": 0,
      "totalRows": 249,
      "queryTime": 10
    }
  }
  ```

### All Matches List
- Full list of all matches covered
- Same input/output format as Current Matches

### Match Info
- Detailed information about a specific match
- Input: `apikey`, `id` (match ID)

### Fantasy API
- Separate section for fantasy-related endpoints
- Link: https://cricketdata.org/how-to-use-fantasy-cricket-api.aspx

## Important Notes

1. **Pagination:** Default page size is 25 items. Use `offset` parameter to get more results.
2. **Response Structure:** All responses have `status`, `data`, and `info` objects
3. **Optional Fields:** Some JSON keys may not exist, check before reading
4. **Rate Limits:** `hitsLimit` shows API call limit (500 in example)

## Next Steps

1. Login to cricketdata.org with provided credentials
2. Get API key from member area
3. Update `/home/ubuntu/fantasy_basics/server/cricketApi.ts` with:
   - New base URL
   - New API key
   - Updated request format (if different from current implementation)
4. Test API connection
