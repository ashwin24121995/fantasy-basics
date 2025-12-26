import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean, decimal, index } from "drizzle-orm/mysql-core";

/**
 * Fantasy Basics Database Schema
 * Designed for Daily Fantasy Cricket with real-time match data integration
 */

// ============================================
// USERS TABLE
// ============================================
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  
  // Age verification and geo-restriction fields
  dateOfBirth: timestamp("dateOfBirth"),
  age: int("age"),
  isAgeVerified: boolean("isAgeVerified").default(false).notNull(),
  state: varchar("state", { length: 100 }), // User's state for geo-restriction
  isRestricted: boolean("isRestricted").default(false).notNull(), // True if from restricted state
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// ============================================
// MATCHES TABLE - Cache match data from Cricket Data API
// ============================================
export const matches = mysqlTable("matches", {
  id: varchar("id", { length: 255 }).primaryKey(), // Match ID from Cricket Data API
  seriesId: varchar("seriesId", { length: 255 }),
  name: varchar("name", { length: 255 }).notNull(),
  matchType: varchar("matchType", { length: 50 }), // t20, odi, test
  dateTimeGMT: timestamp("dateTimeGMT").notNull(),
  venue: text("venue"),
  
  // Match status
  status: varchar("status", { length: 100 }), // Human-readable status
  matchState: mysqlEnum("matchState", ["fixture", "live", "result"]).notNull(), // Machine state
  
  // Team information (stored as JSON)
  team1: varchar("team1", { length: 255 }),
  team2: varchar("team2", { length: 255 }),
  team1Img: text("team1Img"),
  team2Img: text("team2Img"),
  
  // Score information (stored as JSON)
  scoreData: text("scoreData"), // JSON string with detailed score
  
  // Series information
  seriesName: varchar("seriesName", { length: 255 }),
  
  // Fantasy flags
  fantasyEnabled: boolean("fantasyEnabled").default(true).notNull(),
  hasSquad: boolean("hasSquad").default(false).notNull(),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  matchStateIdx: index("match_state_idx").on(table.matchState),
  dateTimeIdx: index("date_time_idx").on(table.dateTimeGMT),
}));

export type Match = typeof matches.$inferSelect;
export type InsertMatch = typeof matches.$inferInsert;

// ============================================
// PLAYERS TABLE - Cache player data from Cricket Data API
// ============================================
export const players = mysqlTable("players", {
  id: varchar("id", { length: 255 }).primaryKey(), // Player ID from Cricket Data API
  name: varchar("name", { length: 255 }).notNull(),
  role: varchar("role", { length: 100 }), // Batsman, Bowler, All-rounder, WK-Batsman
  battingStyle: varchar("battingStyle", { length: 100 }),
  bowlingStyle: varchar("bowlingStyle", { length: 100 }),
  imageUrl: text("imageUrl"),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Player = typeof players.$inferSelect;
export type InsertPlayer = typeof players.$inferInsert;

// ============================================
// CONTESTS TABLE - Fantasy contests for matches
// ============================================
export const contests = mysqlTable("contests", {
  id: int("id").autoincrement().primaryKey(),
  matchId: varchar("matchId", { length: 255 }).notNull(),
  
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  
  // Contest details
  maxEntries: int("maxEntries").notNull(),
  currentEntries: int("currentEntries").default(0).notNull(),
  
  // Contest status
  status: mysqlEnum("status", ["upcoming", "live", "completed", "cancelled"]).default("upcoming").notNull(),
  
  // Timing
  startTime: timestamp("startTime").notNull(),
  endTime: timestamp("endTime"),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  matchIdIdx: index("match_id_idx").on(table.matchId),
  statusIdx: index("status_idx").on(table.status),
}));

export type Contest = typeof contests.$inferSelect;
export type InsertContest = typeof contests.$inferInsert;

// ============================================
// USER TEAMS TABLE - User's fantasy teams
// ============================================
export const userTeams = mysqlTable("user_teams", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  contestId: int("contestId").notNull(),
  matchId: varchar("matchId", { length: 255 }).notNull(),
  
  teamName: varchar("teamName", { length: 255 }).notNull(),
  captainId: varchar("captainId", { length: 255 }), // Player ID
  viceCaptainId: varchar("viceCaptainId", { length: 255 }), // Player ID
  
  // Fantasy points
  totalPoints: decimal("totalPoints", { precision: 10, scale: 2 }).default("0.00").notNull(),
  rank: int("rank"),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  userIdIdx: index("user_id_idx").on(table.userId),
  contestIdIdx: index("contest_id_idx").on(table.contestId),
  matchIdIdx: index("match_id_idx").on(table.matchId),
}));

export type UserTeam = typeof userTeams.$inferSelect;
export type InsertUserTeam = typeof userTeams.$inferInsert;

// ============================================
// TEAM PLAYERS TABLE - Players in each user team
// ============================================
export const teamPlayers = mysqlTable("team_players", {
  id: int("id").autoincrement().primaryKey(),
  userTeamId: int("userTeamId").notNull(),
  playerId: varchar("playerId", { length: 255 }).notNull(),
  
  // Player role in team
  role: varchar("role", { length: 100 }), // Batsman, Bowler, All-rounder, WK-Batsman
  
  // Fantasy points for this player in this match
  points: decimal("points", { precision: 10, scale: 2 }).default("0.00").notNull(),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, (table) => ({
  userTeamIdIdx: index("user_team_id_idx").on(table.userTeamId),
  playerIdIdx: index("player_id_idx").on(table.playerId),
}));

export type TeamPlayer = typeof teamPlayers.$inferSelect;
export type InsertTeamPlayer = typeof teamPlayers.$inferInsert;

// ============================================
// USER CONTESTS TABLE - Track user contest entries
// ============================================
export const userContests = mysqlTable("user_contests", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  contestId: int("contestId").notNull(),
  userTeamId: int("userTeamId").notNull(),
  
  // Results
  finalRank: int("finalRank"),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, (table) => ({
  userIdIdx: index("user_id_idx").on(table.userId),
  contestIdIdx: index("contest_id_idx").on(table.contestId),
}));

export type UserContest = typeof userContests.$inferSelect;
export type InsertUserContest = typeof userContests.$inferInsert;

// ============================================
// CONTACT FORM SUBMISSIONS TABLE
// ============================================
export const contactSubmissions = mysqlTable("contact_submissions", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  subject: varchar("subject", { length: 255 }).notNull(),
  message: text("message").notNull(),
  
  // Status tracking
  status: mysqlEnum("status", ["new", "in_progress", "resolved"]).default("new").notNull(),
  
  // User association (optional - if logged in)
  userId: int("userId"),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  statusIdx: index("status_idx").on(table.status),
  emailIdx: index("email_idx").on(table.email),
}));

export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type InsertContactSubmission = typeof contactSubmissions.$inferInsert;
