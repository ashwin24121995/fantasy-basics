import { describe, it, expect } from "vitest";
import { getLiveMatches } from "./cricketApi";
import type { CurrentMatch } from "./cricketApi";

describe("Live Match Filtering", () => {
  // Helper to create a mock match
  const createMatch = (
    id: string,
    dateTimeGMT: string,
    matchStarted: boolean,
    matchEnded: boolean
  ): CurrentMatch => ({
    id,
    name: `Test Match ${id}`,
    matchType: "t20",
    status: matchStarted ? "Live" : "Fixture",
    dateTimeGMT,
    teams: ["Team A", "Team B"],
    teamInfo: [
      { name: "Team A", shortname: "TA", img: "" },
      { name: "Team B", shortname: "TB", img: "" },
    ],
    score: [],
    series_id: "test-series",
    fantasyEnabled: true,
    bbbEnabled: false,
    hasSquad: true,
    matchStarted,
    matchEnded,
  });

  it("should show matches that started within last 7 days and haven't ended", () => {
    const now = new Date();
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const twoDaysAgo = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000);

    const matches = [
      createMatch("1", yesterday.toISOString(), true, false), // Started yesterday, not ended
      createMatch("2", twoDaysAgo.toISOString(), true, false), // Started 2 days ago, not ended
    ];

    const liveMatches = getLiveMatches(matches);
    expect(liveMatches).toHaveLength(2);
    expect(liveMatches[0].id).toBe("2"); // Sorted by date (earliest first)
    expect(liveMatches[1].id).toBe("1");
  });

  it("should NOT show matches older than 7 days", () => {
    const now = new Date();
    const eightDaysAgo = new Date(now.getTime() - 8 * 24 * 60 * 60 * 1000);
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const matches = [
      createMatch("1", eightDaysAgo.toISOString(), true, false), // 8 days ago - should be filtered out
      createMatch("2", thirtyDaysAgo.toISOString(), true, false), // 30 days ago - should be filtered out
    ];

    const liveMatches = getLiveMatches(matches);
    expect(liveMatches).toHaveLength(0);
  });

  it("should NOT show matches that haven't started yet", () => {
    const now = new Date();
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    const matches = [
      createMatch("1", tomorrow.toISOString(), false, false), // Not started yet
    ];

    const liveMatches = getLiveMatches(matches);
    expect(liveMatches).toHaveLength(0);
  });

  it("should NOT show matches that have ended", () => {
    const now = new Date();
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    const matches = [
      createMatch("1", yesterday.toISOString(), true, true), // Started and ended
    ];

    const liveMatches = getLiveMatches(matches);
    expect(liveMatches).toHaveLength(0);
  });

  it("should handle multi-day Test matches (started 5 days ago, still ongoing)", () => {
    const now = new Date();
    const fiveDaysAgo = new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000);

    const matches = [
      createMatch("1", fiveDaysAgo.toISOString(), true, false), // Test match started 5 days ago
    ];

    const liveMatches = getLiveMatches(matches);
    expect(liveMatches).toHaveLength(1);
    expect(liveMatches[0].id).toBe("1");
  });

  it("should filter out abandoned matches from months ago", () => {
    const now = new Date();
    const threeMonthsAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    const matches = [
      createMatch("1", threeMonthsAgo.toISOString(), true, false), // Abandoned match - should be filtered
      createMatch("2", yesterday.toISOString(), true, false), // Real live match - should be shown
    ];

    const liveMatches = getLiveMatches(matches);
    expect(liveMatches).toHaveLength(1);
    expect(liveMatches[0].id).toBe("2");
  });

  it("should return empty array when no matches are live", () => {
    const now = new Date();
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    const matches = [
      createMatch("1", tomorrow.toISOString(), false, false), // Not started
      createMatch("2", yesterday.toISOString(), true, true), // Ended
    ];

    const liveMatches = getLiveMatches(matches);
    expect(liveMatches).toHaveLength(0);
  });

  it("should sort live matches by start time (earliest first)", () => {
    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000);
    const twoDaysAgo = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000);
    const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);

    const matches = [
      createMatch("1", oneDayAgo.toISOString(), true, false),
      createMatch("2", threeDaysAgo.toISOString(), true, false),
      createMatch("3", twoDaysAgo.toISOString(), true, false),
    ];

    const liveMatches = getLiveMatches(matches);
    expect(liveMatches).toHaveLength(3);
    expect(liveMatches[0].id).toBe("2"); // 3 days ago (earliest)
    expect(liveMatches[1].id).toBe("3"); // 2 days ago
    expect(liveMatches[2].id).toBe("1"); // 1 day ago (most recent)
  });

  it("should handle edge case: match exactly 7 days ago", () => {
    const now = new Date();
    const exactlySevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const matches = [
      createMatch("1", exactlySevenDaysAgo.toISOString(), true, false),
    ];

    const liveMatches = getLiveMatches(matches);
    // Should be included (>= 7 days ago)
    expect(liveMatches).toHaveLength(1);
  });
});
