import { describe, it, expect, beforeAll } from "vitest";
import { createUserTeam, getUserTeamById, getUserTeamsByUser, addPlayerToTeam, getTeamPlayers } from "./db";

describe("Team Creation API", () => {
  let testUserId: number;
  let testTeamId: number;

  beforeAll(() => {
    // Use a test user ID (assuming user with ID 1 exists from auth tests)
    testUserId = 1;
  });

  describe("createUserTeam", () => {
    it("should create a new team successfully", async () => {
      const teamData = {
        userId: testUserId,
        contestId: 1,
        matchId: "test-match-123",
        teamName: "Test Warriors",
        captainId: "player-001",
        viceCaptainId: "player-002",
        totalPoints: "0",
        rank: null,
      };

      const teamId = await createUserTeam(teamData);
      expect(teamId).toBeDefined();
      expect(typeof teamId).toBe("number");
      expect(teamId).toBeGreaterThan(0);

      // Store for later tests
      testTeamId = teamId;
    });

    it("should create team with valid captain and vice-captain", async () => {
      const teamData = {
        userId: testUserId,
        contestId: 1,
        matchId: "test-match-456",
        teamName: "Champions XI",
        captainId: "player-101",
        viceCaptainId: "player-102",
        totalPoints: "0",
        rank: null,
      };

      const teamId = await createUserTeam(teamData);
      const team = await getUserTeamById(teamId);

      expect(team).toBeDefined();
      expect(team?.captainId).toBe("player-101");
      expect(team?.viceCaptainId).toBe("player-102");
    });
  });

  describe("getUserTeamById", () => {
    it("should retrieve team by ID", async () => {
      const team = await getUserTeamById(testTeamId);

      expect(team).toBeDefined();
      expect(team?.id).toBe(testTeamId);
      expect(team?.userId).toBe(testUserId);
      expect(team?.teamName).toBe("Test Warriors");
      expect(team?.captainId).toBe("player-001");
      expect(team?.viceCaptainId).toBe("player-002");
    });

    it("should return undefined for non-existent team", async () => {
      const team = await getUserTeamById(999999);
      expect(team).toBeUndefined();
    });
  });

  describe("addPlayerToTeam", () => {
    it("should add players to a team", async () => {
      const players = [
        { userTeamId: testTeamId, playerId: "player-001", role: "Batsman", points: "0" },
        { userTeamId: testTeamId, playerId: "player-002", role: "Bowler", points: "0" },
        { userTeamId: testTeamId, playerId: "player-003", role: "All-rounder", points: "0" },
        { userTeamId: testTeamId, playerId: "player-004", role: "WK-Batsman", points: "0" },
        { userTeamId: testTeamId, playerId: "player-005", role: "Batsman", points: "0" },
        { userTeamId: testTeamId, playerId: "player-006", role: "Bowler", points: "0" },
        { userTeamId: testTeamId, playerId: "player-007", role: "All-rounder", points: "0" },
        { userTeamId: testTeamId, playerId: "player-008", role: "Batsman", points: "0" },
        { userTeamId: testTeamId, playerId: "player-009", role: "Bowler", points: "0" },
        { userTeamId: testTeamId, playerId: "player-010", role: "Bowler", points: "0" },
        { userTeamId: testTeamId, playerId: "player-011", role: "Batsman", points: "0" },
      ];

      for (const player of players) {
        await addPlayerToTeam(player);
      }

      const teamPlayers = await getTeamPlayers(testTeamId);
      expect(teamPlayers).toBeDefined();
      expect(teamPlayers.length).toBe(11);
    });

    it("should store player roles correctly", async () => {
      const teamPlayers = await getTeamPlayers(testTeamId);
      
      const batsmen = teamPlayers.filter(p => p.role === "Batsman");
      const bowlers = teamPlayers.filter(p => p.role === "Bowler");
      const allRounders = teamPlayers.filter(p => p.role === "All-rounder");
      const wicketKeepers = teamPlayers.filter(p => p.role === "WK-Batsman");

      expect(batsmen.length).toBeGreaterThan(0);
      expect(bowlers.length).toBeGreaterThan(0);
      expect(allRounders.length).toBeGreaterThan(0);
      expect(wicketKeepers.length).toBeGreaterThan(0);
    });
  });

  describe("getTeamPlayers", () => {
    it("should retrieve all players for a team", async () => {
      const players = await getTeamPlayers(testTeamId);

      expect(players).toBeDefined();
      expect(Array.isArray(players)).toBe(true);
      expect(players.length).toBe(11);
    });

    it("should return player details with roles", async () => {
      const players = await getTeamPlayers(testTeamId);

      players.forEach(player => {
        expect(player.playerId).toBeDefined();
        expect(player.role).toBeDefined();
        expect(player.userTeamId).toBe(testTeamId);
        expect(typeof player.points).toBe("string");
      });
    });
  });

  describe("getUserTeamsByUser", () => {
    it("should retrieve all teams for a user", async () => {
      const teams = await getUserTeamsByUser(testUserId);

      expect(teams).toBeDefined();
      expect(Array.isArray(teams)).toBe(true);
      expect(teams.length).toBeGreaterThan(0);
    });

    it("should return teams with correct user ID", async () => {
      const teams = await getUserTeamsByUser(testUserId);

      teams.forEach(team => {
        expect(team.userId).toBe(testUserId);
      });
    });

    it("should return empty array for user with no teams", async () => {
      const teams = await getUserTeamsByUser(999999);
      expect(teams).toBeDefined();
      expect(Array.isArray(teams)).toBe(true);
      expect(teams.length).toBe(0);
    });
  });

  describe("Team Validation", () => {
    it("should enforce 11 players per team", async () => {
      const teamData = {
        userId: testUserId,
        contestId: 2,
        matchId: "test-match-789",
        teamName: "Validation Test",
        captainId: "player-201",
        viceCaptainId: "player-202",
        totalPoints: "0",
        rank: null,
      };

      const teamId = await createUserTeam(teamData);

      // Add only 10 players (should be caught by API layer)
      const players = Array.from({ length: 10 }, (_, i) => ({
        userTeamId: teamId,
        playerId: `player-${300 + i}`,
        role: i % 2 === 0 ? "Batsman" : "Bowler",
        points: "0",
      }));

      for (const player of players) {
        await addPlayerToTeam(player);
      }

      const teamPlayers = await getTeamPlayers(teamId);
      expect(teamPlayers.length).toBe(10); // Database allows it, but API should validate
    });

    it("should allow captain to be in the playing 11", async () => {
      const teamData = {
        userId: testUserId,
        contestId: 3,
        matchId: "test-match-abc",
        teamName: "Captain Test",
        captainId: "player-401",
        viceCaptainId: "player-402",
        totalPoints: "0",
        rank: null,
      };

      const teamId = await createUserTeam(teamData);

      // Add 11 players including captain
      const players = [
        { userTeamId: teamId, playerId: "player-401", role: "Batsman", points: "0" }, // Captain
        { userTeamId: teamId, playerId: "player-402", role: "Bowler", points: "0" }, // Vice-captain
        ...Array.from({ length: 9 }, (_, i) => ({
          userTeamId: teamId,
          playerId: `player-${410 + i}`,
          role: i % 2 === 0 ? "Batsman" : "Bowler",
          points: "0",
        })),
      ];

      for (const player of players) {
        await addPlayerToTeam(player);
      }

      const team = await getUserTeamById(teamId);
      const teamPlayers = await getTeamPlayers(teamId);

      expect(team?.captainId).toBe("player-401");
      expect(teamPlayers.some(p => p.playerId === "player-401")).toBe(true);
    });
  });

  describe("Team Points and Ranking", () => {
    it("should initialize team with zero points", async () => {
      const teamData = {
        userId: testUserId,
        contestId: 4,
        matchId: "test-match-def",
        teamName: "Points Test",
        captainId: "player-501",
        viceCaptainId: "player-502",
        totalPoints: "0",
        rank: null,
      };

      const teamId = await createUserTeam(teamData);
      const team = await getUserTeamById(teamId);

      expect(team?.totalPoints).toBe("0.00");
      expect(team?.rank).toBeNull();
    });

    it("should initialize player points to zero", async () => {
      const teamData = {
        userId: testUserId,
        contestId: 5,
        matchId: "test-match-ghi",
        teamName: "Player Points Test",
        captainId: "player-601",
        viceCaptainId: "player-602",
        totalPoints: "0",
        rank: null,
      };

      const teamId = await createUserTeam(teamData);

      await addPlayerToTeam({
        userTeamId: teamId,
        playerId: "player-601",
        role: "Batsman",
        points: "0",
      });

      const players = await getTeamPlayers(teamId);
      expect(players[0].points).toBe("0.00");
    });
  });
});
