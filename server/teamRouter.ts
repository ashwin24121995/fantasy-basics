import { router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import {
  createUserTeam,
  getUserTeamById,
  getUserTeamsByUser,
  addPlayerToTeam,
  getTeamPlayers,
  upsertPlayer,
} from "./db";

export const teamRouter = router({
  // Create a new team
  createTeam: protectedProcedure
    .input(
      z.object({
        contestId: z.number(),
        matchId: z.string(),
        teamName: z.string(),
        captainId: z.string(),
        viceCaptainId: z.string(),
        players: z.array(
          z.object({
            playerId: z.string(),
            role: z.string(),
          })
        ),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        // Validate team composition
        if (input.players.length !== 11) {
          throw new Error("A team must have exactly 11 players");
        }

        // Create the team
        const teamId = await createUserTeam({
          userId: ctx.user.id,
          contestId: input.contestId,
          matchId: input.matchId,
          teamName: input.teamName,
          captainId: input.captainId,
          viceCaptainId: input.viceCaptainId,
          totalPoints: "0",
          rank: null,
        });

        // Add players to the team
        for (const player of input.players) {
          await addPlayerToTeam({
            userTeamId: teamId,
            playerId: player.playerId,
            role: player.role,
            points: "0",
          });
        }

        return { teamId, success: true };
      } catch (error) {
        console.error("Error creating team:", error);
        if (error instanceof Error) {
          throw error;
        }
        throw new Error("Failed to create team");
      }
    }),

  // Get team by ID
  getTeamById: protectedProcedure
    .input(z.object({ teamId: z.number() }))
    .query(async ({ input }) => {
      try {
        const team = await getUserTeamById(input.teamId);
        if (!team) {
          throw new Error("Team not found");
        }

        const players = await getTeamPlayers(input.teamId);

        return {
          ...team,
          players,
        };
      } catch (error) {
        console.error("Error fetching team:", error);
        throw new Error("Failed to fetch team");
      }
    }),

  // Get all teams for current user
  getUserTeams: protectedProcedure.query(async ({ ctx }) => {
    try {
      return await getUserTeamsByUser(ctx.user.id);
    } catch (error) {
      console.error("Error fetching user teams:", error);
      throw new Error("Failed to fetch user teams");
    }
  }),

  // Get teams for a specific contest
  getTeamsByContest: protectedProcedure
    .input(z.object({ contestId: z.number() }))
    .query(async ({ ctx, input }) => {
      try {
        const allTeams = await getUserTeamsByUser(ctx.user.id);
        return allTeams.filter((team) => team.contestId === input.contestId);
      } catch (error) {
        console.error("Error fetching teams by contest:", error);
        throw new Error("Failed to fetch teams");
      }
    }),
});
