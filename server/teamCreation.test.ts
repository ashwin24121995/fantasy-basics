import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { appRouter } from "./routers";
import { getDb } from "./db";
import { users, userTeams as teams, teamPlayers } from "../drizzle/schema";
import { eq } from "drizzle-orm";
import type { TrpcContext } from "./_core/context";

describe("Team Creation Integration Tests", () => {
  let testUserId: number;
  let testMatchId: string;
  let caller: ReturnType<typeof appRouter.createCaller>;

  beforeAll(async () => {
    const db = await getDb();
    // Create a test user with unique ID to avoid conflicts
    const uniqueId = `test-team-${Date.now()}`;
    const [user] = await db
      .insert(users)
      .values({
        openId: uniqueId,
        name: "Team Test User",
        email: `${uniqueId}@test.com`,
        passwordHash: "hash",
        loginMethod: "email",
        role: "user",
      })
      .$returningId();

    testUserId = user.id;
    testMatchId = "test-match-123";

    // Create caller with authenticated context
    const ctx: TrpcContext = {
      user: {
        id: testUserId,
        openId: "test-team-creation-user",
        name: "Team Test User",
        email: "teamtest@test.com",
        role: "user",
        loginMethod: "email",
        createdAt: new Date(),
        updatedAt: new Date(),
        lastSignedIn: new Date(),
      },
      req: { protocol: "https", headers: {} } as TrpcContext["req"],
      res: {} as TrpcContext["res"],
    };
    
    caller = appRouter.createCaller(ctx);
  });

  afterAll(async () => {
    const db = await getDb();
    // Cleanup: Delete test data in correct order (foreign keys)
    // First get all team IDs for this user
    const userTeams = await db.select({ id: teams.id }).from(teams).where(eq(teams.userId, testUserId));
    
    // Delete team players for each team
    for (const team of userTeams) {
      await db.delete(teamPlayers).where(eq(teamPlayers.userTeamId, team.id));
    }
    
    // Then delete teams
    await db.delete(teams).where(eq(teams.userId, testUserId));
    
    // Finally delete user
    await db.delete(users).where(eq(users.id, testUserId));
  });

  it("should create a team with 11 players", async () => {
    const result = await caller.teams.createTeam({
      contestId: 1,
      matchId: testMatchId,
      teamName: "Test Dream Team",
      captainId: "player1",
      viceCaptainId: "player2",
      players: [
        { playerId: "player1", role: "BAT" },
        { playerId: "player2", role: "BAT" },
        { playerId: "player3", role: "BAT" },
        { playerId: "player4", role: "BOWL" },
        { playerId: "player5", role: "BOWL" },
        { playerId: "player6", role: "BOWL" },
        { playerId: "player7", role: "ALL" },
        { playerId: "player8", role: "ALL" },
        { playerId: "player9", role: "WK" },
        { playerId: "player10", role: "BAT" },
        { playerId: "player11", role: "BOWL" },
      ],
    });

    expect(result).toBeDefined();
    expect(result.teamId).toBeTypeOf("number");
    expect(result.success).toBe(true);
  });

  it("should reject team with less than 11 players", async () => {
    await expect(
      caller.teams.createTeam({
        contestId: 1,
        matchId: testMatchId,
        teamName: "Incomplete Team",
        captainId: "player1",
        viceCaptainId: "player2",
        players: [
          { playerId: "player1", role: "BAT" },
          { playerId: "player2", role: "BAT" },
          { playerId: "player3", role: "BAT" },
        ],
      })
    ).rejects.toThrow("A team must have exactly 11 players");
  });

  it("should reject team with more than 11 players", async () => {
    await expect(
      caller.teams.createTeam({
        contestId: 1,
        matchId: testMatchId,
        teamName: "Too Many Players",
        captainId: "player1",
        viceCaptainId: "player2",
        players: [
          { playerId: "player1", role: "BAT" },
          { playerId: "player2", role: "BAT" },
          { playerId: "player3", role: "BAT" },
          { playerId: "player4", role: "BOWL" },
          { playerId: "player5", role: "BOWL" },
          { playerId: "player6", role: "BOWL" },
          { playerId: "player7", role: "ALL" },
          { playerId: "player8", role: "ALL" },
          { playerId: "player9", role: "WK" },
          { playerId: "player10", role: "BAT" },
          { playerId: "player11", role: "BOWL" },
          { playerId: "player12", role: "BAT" }, // Extra player
        ],
      })
    ).rejects.toThrow("A team must have exactly 11 players");
  });

  it("should retrieve user's teams", async () => {
    // First create a team
    await caller.teams.createTeam({
      contestId: 1,
      matchId: testMatchId,
      teamName: "Retrieve Test Team",
      captainId: "player1",
      viceCaptainId: "player2",
      players: [
        { playerId: "player1", role: "BAT" },
        { playerId: "player2", role: "BAT" },
        { playerId: "player3", role: "BAT" },
        { playerId: "player4", role: "BOWL" },
        { playerId: "player5", role: "BOWL" },
        { playerId: "player6", role: "BOWL" },
        { playerId: "player7", role: "ALL" },
        { playerId: "player8", role: "ALL" },
        { playerId: "player9", role: "WK" },
        { playerId: "player10", role: "BAT" },
        { playerId: "player11", role: "BOWL" },
      ],
    });

    // Then retrieve it
    const teams = await caller.teams.getUserTeams();
    
    expect(teams).toBeDefined();
    expect(Array.isArray(teams)).toBe(true);
    expect(teams.length).toBeGreaterThan(0);
    expect(teams[0]).toHaveProperty("teamName");
    expect(teams[0]).toHaveProperty("matchId");
  });

  it("should retrieve team by ID with players", async () => {
    // Create a team
    const createResult = await caller.teams.createTeam({
      contestId: 1,
      matchId: testMatchId,
      teamName: "Get By ID Team",
      captainId: "player1",
      viceCaptainId: "player2",
      players: [
        { playerId: "player1", role: "BAT" },
        { playerId: "player2", role: "BAT" },
        { playerId: "player3", role: "BAT" },
        { playerId: "player4", role: "BOWL" },
        { playerId: "player5", role: "BOWL" },
        { playerId: "player6", role: "BOWL" },
        { playerId: "player7", role: "ALL" },
        { playerId: "player8", role: "ALL" },
        { playerId: "player9", role: "WK" },
        { playerId: "player10", role: "BAT" },
        { playerId: "player11", role: "BOWL" },
      ],
    });

    // Retrieve by ID
    const team = await caller.teams.getTeamById({ teamId: createResult.teamId });
    
    expect(team).toBeDefined();
    expect(team.teamName).toBe("Get By ID Team");
    expect(team.players).toBeDefined();
    expect(team.players.length).toBe(11);
    expect(team.captainId).toBeDefined();
    expect(team.viceCaptainId).toBeDefined();
  });
});
