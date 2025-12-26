/**
 * Cricket API Integration Tests
 * Validates that the CRICKET_API_KEY is correctly configured and working
 */

import { describe, it, expect } from "vitest";
import { getCurrentMatches } from "./cricketApi";

describe("Cricket API Integration", () => {
  it("should successfully fetch current matches with valid API key", async () => {
    // This test validates that the CRICKET_API_KEY environment variable is set
    // and can successfully authenticate with the Cricket Data API
    const result = await getCurrentMatches();
    
    // The API should return an array directly (makeApiRequest extracts data property)
    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    
    // If there are matches, verify structure
    if (result.length > 0) {
      const match = result[0];
      expect(match).toHaveProperty("id");
      expect(match).toHaveProperty("name");
    }
    
    console.log(`✓ Cricket API key validated successfully. Found ${result.length} current matches.`);
  }, 15000); // 15 second timeout for API call
});
