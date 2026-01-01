/**
 * Cricket Data API Integration Service (Updated)
 * Uses /cricScore endpoint as per official documentation
 * Provides real-time cricket match data with caching for performance optimization
 */

import axios from "axios";

// API Configuration
const CRICKET_API_BASE_URL = "https://api.cricapi.com/v1";
const CRICKET_API_KEY = process.env.CRICKET_API_KEY || "1a822521-d7e0-46ff-98d3-3e51020863f3";

// Cache configuration
interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

class SimpleCache {
  private cache: Map<string, CacheEntry<any>> = new Map();

  set<T>(key: string, data: T, ttlSeconds: number = 60): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl: ttlSeconds * 1000,
    });
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    const age = Date.now() - entry.timestamp;
    if (age > entry.ttl) {
      this.cache.delete(key);
      return null;
    }

    return entry.data as T;
  }

  clear(): void {
    this.cache.clear();
  }
}

const cache = new SimpleCache();

// ============================================
// TYPE DEFINITIONS (Updated for /cricScore endpoint)
// ============================================

export interface CricketApiResponse<T> {
  apikey: string;
  data: T;
  status: string;
  info?: {
    hitsToday: number;
    hitsUsed: number;
    hitsLimit: number;
    credits: number;
    server: number;
    queryTime: number;
    s: number;
  };
}

/**
 * Match data from /cricScore endpoint
 * This is the simplified, faster format with ms field
 */
export interface CricScoreMatch {
  id: string;
  dateTimeGMT: string;
  matchType: string; // "t20" | "odi" | "test"
  status: string; // Human-readable status like "Dubai Capitals won by 6 wkts"
  ms: "live" | "result" | "fixture"; // Machine-readable status - KEY FIELD!
  t1: string; // Team 1 name with shortcode, e.g., "Dubai Capitals [DC]"
  t2: string; // Team 2 name with shortcode
  t1s: string; // Team 1 score, e.g., "157/4 (18.3)"
  t2s: string; // Team 2 score
  t1img: string; // Team 1 logo URL
  t2img: string; // Team 2 logo URL
  series: string; // Series name
}

/**
 * Normalized match format for frontend consumption
 * Converts CricScoreMatch to a format similar to our old CurrentMatch
 */
export interface CurrentMatch {
  id: string;
  name: string;
  matchType: string;
  status: string;
  venue: string;
  date: string;
  dateTimeGMT: string;
  teams: string[];
  teamInfo: TeamInfo[];
  score: ScoreInfo[];
  series_id: string;
  fantasyEnabled: boolean;
  bbbEnabled: boolean;
  hasSquad: boolean;
  matchStarted: boolean;
  matchEnded: boolean;
  ms: "live" | "result" | "fixture"; // Added ms field for status filtering
}

export interface TeamInfo {
  name: string;
  shortname: string;
  img: string;
}

export interface ScoreInfo {
  r: number; // runs
  w: number; // wickets
  o: number; // overs
  inning: string;
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Parse team name and shortcode from format "Team Name [SHORT]"
 */
function parseTeamName(teamStr: string): { name: string; shortname: string } {
  const match = teamStr.match(/^(.+?)\s*\[([^\]]+)\]$/);
  if (match) {
    return { name: match[1].trim(), shortname: match[2].trim() };
  }
  return { name: teamStr, shortname: teamStr };
}

/**
 * Parse score string like "157/4 (18.3)" into structured data
 */
function parseScore(scoreStr: string, teamName: string, inningNum: number): ScoreInfo | null {
  if (!scoreStr) return null;
  
  const match = scoreStr.match(/^(\d+)\/(\d+)\s*\(([0-9.]+)\)$/);
  if (match) {
    return {
      r: parseInt(match[1]),
      w: parseInt(match[2]),
      o: parseFloat(match[3]),
      inning: `${teamName} Inning ${inningNum}`,
    };
  }
  return null;
}

/**
 * Convert CricScoreMatch to CurrentMatch format
 * This maintains backward compatibility with existing frontend code
 */
function convertToCurrentMatch(cricMatch: CricScoreMatch): CurrentMatch {
  const team1 = parseTeamName(cricMatch.t1);
  const team2 = parseTeamName(cricMatch.t2);
  
  const score: ScoreInfo[] = [];
  const score1 = parseScore(cricMatch.t1s, team1.name, 1);
  const score2 = parseScore(cricMatch.t2s, team2.name, 2);
  if (score1) score.push(score1);
  if (score2) score.push(score2);

  return {
    id: cricMatch.id,
    name: `${team1.name} vs ${team2.name}`,
    matchType: cricMatch.matchType,
    status: cricMatch.status,
    venue: "", // Not available in /cricScore endpoint
    date: cricMatch.dateTimeGMT.split("T")[0],
    dateTimeGMT: cricMatch.dateTimeGMT,
    teams: [team1.name, team2.name],
    teamInfo: [
      { name: team1.name, shortname: team1.shortname, img: cricMatch.t1img },
      { name: team2.name, shortname: team2.shortname, img: cricMatch.t2img },
    ],
    score,
    series_id: "", // Not available in /cricScore endpoint
    fantasyEnabled: true,
    bbbEnabled: true,
    hasSquad: true,
    matchStarted: cricMatch.ms === "live" || cricMatch.ms === "result",
    matchEnded: cricMatch.ms === "result",
    ms: cricMatch.ms, // KEY FIELD for filtering!
  };
}

// ============================================
// API FUNCTIONS
// ============================================

/**
 * Get all matches using /cricScore endpoint
 * This endpoint returns all matches with the crucial 'ms' field for status filtering
 * Cache for 60 seconds as recommended in documentation
 */
export async function getCurrentMatches(): Promise<CurrentMatch[]> {
  const cacheKey = "cricscore_all_matches";
  
  // Check cache first
  const cachedData = cache.get<CurrentMatch[]>(cacheKey);
  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await axios.get<CricketApiResponse<CricScoreMatch[]>>(
      `${CRICKET_API_BASE_URL}/cricScore`,
      {
        params: {
          apikey: CRICKET_API_KEY,
        },
        timeout: 60000, // 60 seconds
      }
    );

    if (response.data.status !== "success") {
      throw new Error(`API request failed: ${response.data.status}`);
    }

    // Convert CricScoreMatch[] to CurrentMatch[] for backward compatibility
    const matches = response.data.data.map(convertToCurrentMatch);

    // Cache the response
    cache.set(cacheKey, matches, 60); // 60-second TTL as per documentation
    
    return matches;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Cricket API Error: ${error.message}`);
    }
    throw error;
  }
}

/**
 * Get match squad data
 * Uses /match_squad endpoint as shown in documentation
 */
export async function getMatchSquad(matchId: string): Promise<any> {
  const cacheKey = `match_squad:${matchId}`;
  
  // Check cache first
  const cachedData = cache.get<any>(cacheKey);
  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await axios.get<CricketApiResponse<any>>(
      `${CRICKET_API_BASE_URL}/match_squad`,
      {
        params: {
          apikey: CRICKET_API_KEY,
          id: matchId,
        },
        timeout: 60000,
      }
    );

    if (response.data.status !== "success") {
      throw new Error(`API request failed: ${response.data.status}`);
    }

    const data = response.data.data;
    
    // Cache the response
    cache.set(cacheKey, data, 300); // 5-minute TTL for squad data
    
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Cricket API Error: ${error.message}`);
    }
    throw error;
  }
}

/**
 * Get live matches
 * Filters matches where ms === "live"
 */
export async function getLiveMatches(): Promise<CurrentMatch[]> {
  const allMatches = await getCurrentMatches();
  return allMatches.filter(match => match.ms === "live");
}

/**
 * Get upcoming matches
 * Filters matches where ms === "fixture" and sorts by date
 */
export async function getUpcomingMatches(): Promise<CurrentMatch[]> {
  const allMatches = await getCurrentMatches();
  return allMatches
    .filter(match => match.ms === "fixture")
    .sort((a, b) => new Date(a.dateTimeGMT).getTime() - new Date(b.dateTimeGMT).getTime());
}

/**
 * Get completed matches
 * Filters matches where ms === "result" and sorts by date (newest first)
 */
export async function getCompletedMatches(): Promise<CurrentMatch[]> {
  const allMatches = await getCurrentMatches();
  return allMatches
    .filter(match => match.ms === "result")
    .sort((a, b) => new Date(b.dateTimeGMT).getTime() - new Date(a.dateTimeGMT).getTime());
}

/**
 * Clear all cached data
 */
export function clearCache(): void {
  cache.clear();
}


// ============================================
// ADDITIONAL API ENDPOINTS (for backward compatibility)
// ============================================

/**
 * Get detailed match information
 * Note: /cricScore doesn't provide detailed info, so we use /match_info endpoint
 * Cache for 60 seconds
 */
export async function getMatchInfo(matchId: string): Promise<any> {
  const cacheKey = `match_info:${matchId}`;
  
  // Check cache first
  const cachedData = cache.get<any>(cacheKey);
  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await axios.get<CricketApiResponse<any>>(
      `${CRICKET_API_BASE_URL}/match_info`,
      {
        params: {
          apikey: CRICKET_API_KEY,
          id: matchId,
        },
        timeout: 60000,
      }
    );

    if (response.data.status !== "success") {
      throw new Error(`API request failed: ${response.data.status}`);
    }

    const data = response.data.data;
    
    // Cache the response
    cache.set(cacheKey, data, 60);
    
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Cricket API Error: ${error.message}`);
    }
    throw error;
  }
}

/**
 * Get fantasy squad for a match
 * Cache for 5 minutes (squad doesn't change frequently)
 */
export async function getFantasySquad(matchId: string): Promise<any> {
  return getMatchSquad(matchId); // Reuse the existing function
}

/**
 * Get match scorecard with player performance
 * Cache for 30 seconds for live matches
 */
export async function getMatchScorecard(matchId: string): Promise<any> {
  const cacheKey = `match_scorecard:${matchId}`;
  
  // Check cache first
  const cachedData = cache.get<any>(cacheKey);
  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await axios.get<CricketApiResponse<any>>(
      `${CRICKET_API_BASE_URL}/match_scorecard`,
      {
        params: {
          apikey: CRICKET_API_KEY,
          id: matchId,
        },
        timeout: 60000,
      }
    );

    if (response.data.status !== "success") {
      throw new Error(`API request failed: ${response.data.status}`);
    }

    const data = response.data.data;
    
    // Cache the response
    cache.set(cacheKey, data, 30);
    
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Cricket API Error: ${error.message}`);
    }
    throw error;
  }
}

/**
 * Get fantasy points for players in a match
 * Cache for 30 seconds for live matches
 */
export async function getFantasyPoints(matchId: string): Promise<any> {
  const cacheKey = `match_points:${matchId}`;
  
  // Check cache first
  const cachedData = cache.get<any>(cacheKey);
  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await axios.get<CricketApiResponse<any>>(
      `${CRICKET_API_BASE_URL}/match_points`,
      {
        params: {
          apikey: CRICKET_API_KEY,
          id: matchId,
        },
        timeout: 60000,
      }
    );

    if (response.data.status !== "success") {
      throw new Error(`API request failed: ${response.data.status}`);
    }

    const data = response.data.data;
    
    // Cache the response
    cache.set(cacheKey, data, 30);
    
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Cricket API Error: ${error.message}`);
    }
    throw error;
  }
}
