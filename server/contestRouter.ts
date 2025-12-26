import { router, publicProcedure, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import {
  createContest,
  getContestById,
  getContestsByMatch,
  updateContestEntries,
  createUserContestEntry,
  getUserContestsByUser,
} from "./db";

export const contestRouter = router({
  // Get contests for a specific match
  getContestsByMatch: publicProcedure
    .input(z.object({ matchId: z.string() }))
    .query(async ({ input }) => {
      try {
        return await getContestsByMatch(input.matchId);
      } catch (error) {
        console.error("Error fetching contests:", error);
        throw new Error("Failed to fetch contests");
      }
    }),

  // Get contest by ID
  getContestById: publicProcedure
    .input(z.object({ contestId: z.number() }))
    .query(async ({ input }) => {
      try {
        return await getContestById(input.contestId);
      } catch (error) {
        console.error("Error fetching contest:", error);
        throw new Error("Failed to fetch contest");
      }
    }),

  // Create a new contest (admin only for now)
  createContest: protectedProcedure
    .input(
      z.object({
        matchId: z.string(),
        name: z.string(),
        description: z.string().optional(),
        entryFee: z.number().min(0),
        prizePool: z.number().min(0),
        maxEntries: z.number().min(1),
        startTime: z.string(), // ISO date string
      })
    )
    .mutation(async ({ input }) => {
      try {
        const contestId = await createContest({
          matchId: input.matchId,
          name: input.name,
          description: input.description || null,
          entryFee: input.entryFee.toString(),
          prizePool: input.prizePool.toString(),
          maxEntries: input.maxEntries,
          currentEntries: 0,
          status: "upcoming",
          startTime: new Date(input.startTime),
          endTime: null,
        });

        return { contestId };
      } catch (error) {
        console.error("Error creating contest:", error);
        throw new Error("Failed to create contest");
      }
    }),

  // Join a contest
  joinContest: protectedProcedure
    .input(
      z.object({
        contestId: z.number(),
        userTeamId: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        // Get contest details
        const contest = await getContestById(input.contestId);
        if (!contest) {
          throw new Error("Contest not found");
        }

        // Check if contest is full
        if (contest.currentEntries >= contest.maxEntries) {
          throw new Error("Contest is full");
        }

        // Check if contest has started
        if (new Date() > contest.startTime) {
          throw new Error("Contest has already started");
        }

        // Create user contest entry
        const entryId = await createUserContestEntry({
          userId: ctx.user.id,
          contestId: input.contestId,
          userTeamId: input.userTeamId,
          entryFee: contest.entryFee,
          finalRank: null,
          winnings: "0",
        });

        // Update contest entries count
        await updateContestEntries(input.contestId, 1);

        return { entryId, success: true };
      } catch (error) {
        console.error("Error joining contest:", error);
        if (error instanceof Error) {
          throw error;
        }
        throw new Error("Failed to join contest");
      }
    }),

  // Get user's contest entries
  getUserContests: protectedProcedure.query(async ({ ctx }) => {
    try {
      return await getUserContestsByUser(ctx.user.id);
    } catch (error) {
      console.error("Error fetching user contests:", error);
      throw new Error("Failed to fetch user contests");
    }
  }),
});
