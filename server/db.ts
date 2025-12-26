import { eq, and, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { 
  InsertUser, 
  users, 
  matches, 
  InsertMatch,
  contests,
  InsertContest,
  userTeams,
  InsertUserTeam,
  teamPlayers,
  InsertTeamPlayer,
  players,
  InsertPlayer,
  userContests,
  InsertUserContest,
  contactSubmissions,
  InsertContactSubmission
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

// ============================================
// USER FUNCTIONS
// ============================================

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function getUserById(userId: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(users).where(eq(users.id, userId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getUserByEmail(email: string) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function updateUserProfile(userId: number, data: Partial<InsertUser>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.update(users).set(data).where(eq(users.id, userId));
}

// ============================================
// MATCH FUNCTIONS
// ============================================

export async function upsertMatch(match: InsertMatch) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.insert(matches).values(match).onDuplicateKeyUpdate({
    set: match,
  });
}

export async function getMatchById(matchId: string) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(matches).where(eq(matches.id, matchId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getMatchesByState(state: "fixture" | "live" | "result") {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(matches).where(eq(matches.matchState, state));
}

export async function getAllMatches() {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(matches).orderBy(desc(matches.dateTimeGMT));
}

// ============================================
// PLAYER FUNCTIONS
// ============================================

export async function upsertPlayer(player: InsertPlayer) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.insert(players).values(player).onDuplicateKeyUpdate({
    set: player,
  });
}

export async function getPlayerById(playerId: string) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(players).where(eq(players.id, playerId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// ============================================
// CONTEST FUNCTIONS
// ============================================

export async function createContest(contest: InsertContest) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(contests).values(contest);
  return result[0].insertId;
}

export async function getContestById(contestId: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(contests).where(eq(contests.id, contestId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getContestsByMatch(matchId: string) {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(contests).where(eq(contests.matchId, matchId));
}

export async function updateContestEntries(contestId: number, increment: number = 1) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const contest = await getContestById(contestId);
  if (!contest) throw new Error("Contest not found");

  const newEntries = contest.currentEntries + increment;
  await db.update(contests).set({ currentEntries: newEntries }).where(eq(contests.id, contestId));
}

// ============================================
// USER TEAM FUNCTIONS
// ============================================

export async function createUserTeam(team: InsertUserTeam) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(userTeams).values(team);
  return result[0].insertId;
}

export async function getUserTeamById(teamId: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(userTeams).where(eq(userTeams.id, teamId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getUserTeamsByUser(userId: number) {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(userTeams).where(eq(userTeams.userId, userId)).orderBy(desc(userTeams.createdAt));
}

export async function getUserTeamsByContest(contestId: number) {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(userTeams).where(eq(userTeams.contestId, contestId));
}

export async function updateUserTeamPoints(teamId: number, points: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.update(userTeams).set({ totalPoints: points.toString() }).where(eq(userTeams.id, teamId));
}

// ============================================
// TEAM PLAYER FUNCTIONS
// ============================================

export async function addPlayerToTeam(teamPlayer: InsertTeamPlayer) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.insert(teamPlayers).values(teamPlayer);
}

export async function getTeamPlayers(teamId: number) {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(teamPlayers).where(eq(teamPlayers.userTeamId, teamId));
}

export async function updatePlayerPoints(teamPlayerId: number, points: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.update(teamPlayers).set({ points: points.toString() }).where(eq(teamPlayers.id, teamPlayerId));
}

// ============================================
// USER CONTEST FUNCTIONS
// ============================================

export async function createUserContestEntry(entry: InsertUserContest) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(userContests).values(entry);
  return result[0].insertId;
}

export async function getUserContestsByUser(userId: number) {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(userContests).where(eq(userContests.userId, userId)).orderBy(desc(userContests.createdAt));
}

export async function getUserContestsByContest(contestId: number) {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(userContests).where(eq(userContests.contestId, contestId));
}

export async function updateUserContestResult(entryId: number, rank: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.update(userContests).set({ 
    finalRank: rank
  }).where(eq(userContests.id, entryId));
}

// ============================================
// CONTACT FORM FUNCTIONS
// ============================================

export async function submitContactForm(data: Omit<InsertContactSubmission, 'createdAt' | 'updatedAt' | 'status'>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(contactSubmissions).values({
    ...data,
    status: 'new'
  });
  
  return {
    id: result[0].insertId
  };
}
