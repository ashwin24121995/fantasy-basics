/**
 * Validation test for Cricket API credentials
 * This test verifies that the CRICKET_API_KEY is valid and working
 */

import { describe, it, expect } from "vitest";
import { getCurrentMatches } from "./cricketApi";

describe("Cricket API Key Validation", () => {
  it("should successfully fetch current matches with valid API key", async () => {
    // This test validates that the CRICKET_API_KEY environment variable is set correctly
    // and can successfully fetch data from the Cricket API
    
    const matches = await getCurrentMatches();
    
    // Verify that we got a response (even if empty array)
    expect(matches).toBeDefined();
    expect(Array.isArray(matches)).toBe(true);
    
    // If there are matches, verify the structure
    if (matches.length > 0) {
      const firstMatch = matches[0];
      expect(firstMatch).toHaveProperty("id");
      expect(firstMatch).toHaveProperty("name");
      expect(firstMatch).toHaveProperty("teams");
      expect(Array.isArray(firstMatch.teams)).toBe(true);
    }
    
    console.log(`✅ Cricket API Key is valid! Fetched ${matches.length} matches.`);
  }, 15000); // 15 second timeout for API call
});
