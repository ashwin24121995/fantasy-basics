/**
 * Cricket Data API Integration Service
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
// TYPE DEFINITIONS
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
    offsetRows: number;
    totalRows: number;
    queryTime: number;
    s: number;
    cache: number;
  };
}

export interface MatchData {
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

export interface CurrentMatch {
  id: string;
  name: string;
  matchType: string;
  status: string;
  venue: string;
  date: string;
  dateTimeGMT: string;
  teams: string[];
  score: ScoreInfo[];
  series_id: string;
  ms?: "fixture" | "live" | "result"; // match state (optional, may not be provided)
  t1: string; // team 1 name
  t2: string; // team 2 name
  t1img: string;
  t2img: string;
  matchStarted: boolean;
  matchEnded: boolean;
  fantasyEnabled: boolean;
  bbbEnabled: boolean;
  hasSquad: boolean;
  teamInfo?: Array<{name: string; shortname: string; img: string}>;
}

export interface PlayerInfo {
  id: string;
  name: string;
  role: string;
  battingStyle: string;
  bowlingStyle: string;
  playerImg: string;
}

export interface FantasySquad {
  id: string;
  name: string;
  players: {
    [teamName: string]: PlayerInfo[];
  };
}

export interface FantasyPoints {
  id: string;
  name: string;
  points: {
    [playerId: string]: {
      name: string;
      points: number;
    };
  };
}

export interface MatchScorecard {
  id: string;
  name: string;
  status: string;
  score: ScoreInfo[];
  scorecard: {
    innings: string;
    batting: BattingPerformance[];
    bowling: BowlingPerformance[];
  }[];
}

export interface BattingPerformance {
  id: string;
  name: string;
  r: number; // runs
  b: number; // balls
  "4s": number;
  "6s": number;
  sr: number; // strike rate
  dismissal: string;
}

export interface BowlingPerformance {
  id: string;
  name: string;
  o: number; // overs
  m: number; // maidens
  r: number; // runs
  w: number; // wickets
  eco: number; // economy
}

// ============================================
// API CLIENT FUNCTIONS
// ============================================

/**
 * Generic API request handler with caching
 */
async function makeApiRequest<T>(
  endpoint: string,
  params: Record<string, any> = {},
  cacheTTL: number = 60
): Promise<T> {
  const cacheKey = `${endpoint}:${JSON.stringify(params)}`;
  
  // Check cache first
  const cachedData = cache.get<T>(cacheKey);
  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await axios.get<CricketApiResponse<T>>(`${CRICKET_API_BASE_URL}/${endpoint}`, {
      params: {
        apikey: CRICKET_API_KEY,
        ...params,
      },
      timeout: 60000, // 60 seconds - increased from 10s to handle API delays
    });

    if (response.data.status !== "success") {
      throw new Error(`API request failed: ${response.data.status}`);
    }

    const data = response.data.data;
    
    // Cache the response
    cache.set(cacheKey, data, cacheTTL);
    
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Cricket API Error: ${error.message}`);
    }
    throw error;
  }
}

/**
 * Get all matches (upcoming, live, and recent)
 * Uses /matches endpoint with multiple pages to include future matches
 * Cache for 60 seconds
 */
export async function getCurrentMatches(): Promise<CurrentMatch[]> {
  const cacheKey = "all_matches_multi_page";
  
  // Check cache first
  const cachedData = cache.get<CurrentMatch[]>(cacheKey);
  if (cachedData) {
    return cachedData;
  }

  try {
    const allMatches: CurrentMatch[] = [];
    const pagesToFetch = 15; // Fetch 15 pages (375 matches) to ensure we get upcoming matches
    
    // Fetch multiple pages in parallel for better performance
    const promises = [];
    for (let page = 0; page < pagesToFetch; page++) {
      const offset = page * 25;
      promises.push(
        axios.get<CricketApiResponse<CurrentMatch[]>>(`${CRICKET_API_BASE_URL}/matches`, {
          params: {
            apikey: CRICKET_API_KEY,
            offset,
          },
          timeout: 60000, // 60 seconds - increased from 10s for parallel requests
        })
      );
    }

    const responses = await Promise.all(promises);
    
    // Combine all matches
    for (const response of responses) {
      if (response.data.status === "success" && response.data.data) {
        allMatches.push(...response.data.data);
      }
    }

    // Remove duplicates based on match ID
    const uniqueMatches = Array.from(
      new Map(allMatches.map(match => [match.id, match])).values()
    );

    // Cache the combined results
    cache.set(cacheKey, uniqueMatches, 60);
    
    return uniqueMatches;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Cricket API Error: ${error.message}`);
    }
    throw error;
  }
}

/**
 * Get detailed match information
 * Cache for 60 seconds
 */
export async function getMatchInfo(matchId: string): Promise<MatchData> {
  return makeApiRequest<MatchData>("match_info", { id: matchId }, 60);
}

/**
 * Get fantasy squad for a match
 * Cache for 5 minutes (squad doesn't change frequently)
 */
export async function getFantasySquad(matchId: string): Promise<FantasySquad> {
  return makeApiRequest<FantasySquad>("match_squad", { id: matchId }, 300);
}

/**
 * Get match scorecard with player performance
 * Cache for 30 seconds for live matches
 */
export async function getMatchScorecard(matchId: string): Promise<MatchScorecard> {
  return makeApiRequest<MatchScorecard>("match_scorecard", { id: matchId }, 30);
}

/**
 * Get fantasy points for players in a match
 * Cache for 30 seconds for live matches
 */
export async function getFantasyPoints(matchId: string): Promise<FantasyPoints> {
  return makeApiRequest<FantasyPoints>("match_points", { id: matchId }, 30);
}

/**
 * Get player information
 * Cache for 1 hour (player info rarely changes)
 */
export async function getPlayerInfo(playerId: string): Promise<PlayerInfo> {
  return makeApiRequest<PlayerInfo>("players_info", { id: playerId }, 3600);
}

/**
 * Clear all cached data (useful for testing or manual refresh)
 */
export function clearCache(): void {
  cache.clear();
}

/**
 * Filter matches by state
 */
export function filterMatchesByState(
  matches: CurrentMatch[],
  state: "fixture" | "live" | "result"
): CurrentMatch[] {
  return matches.filter((match) => match.ms === state);
}

/**
 * Get upcoming matches (today and future)
 */
export function getUpcomingMatches(matches: CurrentMatch[]): CurrentMatch[] {
  return matches
    .filter((match) => {
      // Match is upcoming if it hasn't started yet
      return !match.matchStarted;
    })
    .sort((a, b) => {
      // Sort by date (earliest first)
      return new Date(a.dateTimeGMT).getTime() - new Date(b.dateTimeGMT).getTime();
    });
}

/**
 * Get live matches (only matches that are actually live RIGHT NOW)
 */
export function getLiveMatches(matches: CurrentMatch[]): CurrentMatch[] {
  return matches
    .filter((match) => {
      // Use the Cricket API's ms (match state) field to determine if match is live
      // ms can be: "fixture" (not started), "live" (currently live), "result" (ended)
      if (match.ms === "live") return true;
      
      // Fallback: if ms field is not provided, use matchStarted/matchEnded flags
      // This ensures backward compatibility if API doesn't always provide ms
      if (!match.ms && match.matchStarted && !match.matchEnded) {
        // Additional check: only show if match is within last 24 hours to avoid stale data
        const matchDate = new Date(match.dateTimeGMT);
        const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
        return matchDate >= oneDayAgo;
      }
      
      return false;
    })
    .sort((a, b) => {
      // Sort by start time (earliest first for live matches)
      return new Date(a.dateTimeGMT).getTime() - new Date(b.dateTimeGMT).getTime();
    });
}

/**
 * Get completed matches
 */
export function getCompletedMatches(matches: CurrentMatch[]): CurrentMatch[] {
  return matches
    .filter((match) => match.matchEnded)
    .sort((a, b) => {
      // Sort by date (most recent first for completed matches)
      return new Date(b.dateTimeGMT).getTime() - new Date(a.dateTimeGMT).getTime();
    });
}
