import { router, publicProcedure } from "./_core/trpc";
import { z } from "zod";
import {
  getCurrentMatches,
  getMatchInfo,
  getFantasySquad,
  getMatchScorecard,
  getFantasyPoints,
  getLiveMatches,
  getUpcomingMatches,
  getCompletedMatches,
} from "./cricketApi";
import { upsertMatch, getMatchById, getMatchesByState, getAllMatches } from "./db";

export const matchRouter = router({
  // Get all current matches from API
  getCurrentMatches: publicProcedure.query(async () => {
    try {
      const matches = await getCurrentMatches();
      
      // Cache matches in database
      for (const match of matches) {
        // Use ms field for match state, default to 'fixture' if not provided
        const matchState: "fixture" | "live" | "result" = match.ms || "fixture";
        
        await upsertMatch({
          id: match.id,
          seriesId: match.series_id,
          name: match.name,
          matchType: match.matchType,
          dateTimeGMT: new Date(match.dateTimeGMT),
          venue: match.venue || null,
          status: match.status,
          matchState: matchState,
          team1: match.t1,
          team2: match.t2,
          team1Img: match.t1img,
          team2Img: match.t2img,
          scoreData: JSON.stringify(match.score),
          seriesName: null,
          fantasyEnabled: match.fantasyEnabled || false,
          hasSquad: match.hasSquad || false,
        });
      }
      
      return matches;
    } catch (error) {
      console.error("Error fetching current matches:", error);
      throw new Error("Failed to fetch matches");
    }
  }),

  // Get upcoming matches
  getUpcomingMatches: publicProcedure.query(async () => {
    try {
      const allMatches = await getCurrentMatches();
      return getUpcomingMatches(allMatches);
    } catch (error) {
      console.error("Error fetching upcoming matches:", error);
      throw new Error("Failed to fetch upcoming matches");
    }
  }),

  // Get live matches
  getLiveMatches: publicProcedure.query(async () => {
    try {
      const allMatches = await getCurrentMatches();
      return getLiveMatches(allMatches);
    } catch (error) {
      console.error("Error fetching live matches:", error);
      throw new Error("Failed to fetch live matches");
    }
  }),

  // Get completed matches
  getCompletedMatches: publicProcedure.query(async () => {
    try {
      const allMatches = await getCurrentMatches();
      return getCompletedMatches(allMatches);
    } catch (error) {
      console.error("Error fetching completed matches:", error);
      throw new Error("Failed to fetch completed matches");
    }
  }),

  // Get match details by ID
  getMatchById: publicProcedure
    .input(z.object({ matchId: z.string() }))
    .query(async ({ input }) => {
      try {
        // Try to get from database first
        const dbMatch = await getMatchById(input.matchId);
        if (dbMatch) {
          return dbMatch;
        }

        // If not in database, fetch from API
        const apiMatch = await getMatchInfo(input.matchId);
        
        // Cache in database
        await upsertMatch({
          id: apiMatch.id,
          seriesId: apiMatch.series_id,
          name: apiMatch.name,
          matchType: apiMatch.matchType,
          dateTimeGMT: new Date(apiMatch.dateTimeGMT),
          venue: apiMatch.venue || null,
          status: apiMatch.status,
          matchState: "fixture", // Will be updated when match data is available
          team1: apiMatch.teamInfo[0]?.name || null,
          team2: apiMatch.teamInfo[1]?.name || null,
          team1Img: apiMatch.teamInfo[0]?.img || null,
          team2Img: apiMatch.teamInfo[1]?.img || null,
          scoreData: JSON.stringify(apiMatch.score),
          seriesName: null,
          fantasyEnabled: apiMatch.fantasyEnabled,
          hasSquad: apiMatch.hasSquad,
        });

        return await getMatchById(input.matchId);
      } catch (error) {
        console.error("Error fetching match:", error);
        throw new Error("Failed to fetch match details");
      }
    }),

  // Get fantasy squad for a match
  getFantasySquad: publicProcedure
    .input(z.object({ matchId: z.string() }))
    .query(async ({ input }) => {
      try {
        return await getFantasySquad(input.matchId);
      } catch (error) {
        console.error("Error fetching fantasy squad:", error);
        throw new Error("Failed to fetch fantasy squad");
      }
    }),

  // Get match scorecard
  getMatchScorecard: publicProcedure
    .input(z.object({ matchId: z.string() }))
    .query(async ({ input }) => {
      try {
        return await getMatchScorecard(input.matchId);
      } catch (error) {
        console.error("Error fetching match scorecard:", error);
        throw new Error("Failed to fetch match scorecard");
      }
    }),

  // Get fantasy points for a match
  getFantasyPoints: publicProcedure
    .input(z.object({ matchId: z.string() }))
    .query(async ({ input }) => {
      try {
        return await getFantasyPoints(input.matchId);
      } catch (error) {
        console.error("Error fetching fantasy points:", error);
        throw new Error("Failed to fetch fantasy points");
      }
    }),
});
