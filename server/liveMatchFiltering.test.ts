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

  it("should show matches with ms='live' status", () => {
    const now = new Date();
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const twoDaysAgo = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000);

    const matches: CurrentMatch[] = [
      { ...createMatch("1", yesterday.toISOString(), true, false), ms: "live" },
      { ...createMatch("2", twoDaysAgo.toISOString(), true, false), ms: "live" },
    ];

    const liveMatches = getLiveMatches(matches);
    expect(liveMatches).toHaveLength(2);
    expect(liveMatches[0].id).toBe("2"); // Sorted by date (earliest first)
    expect(liveMatches[1].id).toBe("1");
  });

  it("should NOT show matches with ms='fixture' or ms='result'", () => {
    const now = new Date();
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    const matches: CurrentMatch[] = [
      { ...createMatch("1", yesterday.toISOString(), false, false), ms: "fixture" }, // Not started
      { ...createMatch("2", yesterday.toISOString(), true, true), ms: "result" }, // Ended
    ];

    const liveMatches = getLiveMatches(matches);
    expect(liveMatches).toHaveLength(0);
  });

  it("should use fallback logic when ms field is not provided (within 24 hours)", () => {
    const now = new Date();
    const twelveHoursAgo = new Date(now.getTime() - 12 * 60 * 60 * 1000);

    const matches: CurrentMatch[] = [
      { ...createMatch("1", twelveHoursAgo.toISOString(), true, false), ms: undefined }, // Started 12h ago, no ms field
    ];

    const liveMatches = getLiveMatches(matches);
    expect(liveMatches).toHaveLength(1);
    expect(liveMatches[0].id).toBe("1");
  });

  it("should NOT use fallback for matches older than 24 hours without ms field", () => {
    const now = new Date();
    const twoDaysAgo = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000);

    const matches: CurrentMatch[] = [
      { ...createMatch("1", twoDaysAgo.toISOString(), true, false), ms: undefined }, // 2 days ago, no ms field
    ];

    const liveMatches = getLiveMatches(matches);
    expect(liveMatches).toHaveLength(0);
  });

  it("should show multi-day Test matches if ms='live'", () => {
    const now = new Date();
    const fiveDaysAgo = new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000);

    const matches: CurrentMatch[] = [
      { ...createMatch("1", fiveDaysAgo.toISOString(), true, false), ms: "live" }, // Test match started 5 days ago but still live
    ];

    const liveMatches = getLiveMatches(matches);
    expect(liveMatches).toHaveLength(1);
    expect(liveMatches[0].id).toBe("1");
  });

  it("should only show matches with ms='live', not old abandoned matches", () => {
    const now = new Date();
    const threeMonthsAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    const matches: CurrentMatch[] = [
      { ...createMatch("1", threeMonthsAgo.toISOString(), true, false), ms: undefined }, // Old abandoned match - no ms field
      { ...createMatch("2", yesterday.toISOString(), true, false), ms: "live" }, // Real live match
    ];

    const liveMatches = getLiveMatches(matches);
    expect(liveMatches).toHaveLength(1);
    expect(liveMatches[0].id).toBe("2");
  });

  it("should return empty array when no matches have ms='live'", () => {
    const now = new Date();
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    const matches: CurrentMatch[] = [
      { ...createMatch("1", yesterday.toISOString(), false, false), ms: "fixture" }, // Not started
      { ...createMatch("2", yesterday.toISOString(), true, true), ms: "result" }, // Ended
    ];

    const liveMatches = getLiveMatches(matches);
    expect(liveMatches).toHaveLength(0);
  });

  it("should sort live matches by start time (earliest first)", () => {
    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000);
    const twoDaysAgo = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000);
    const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);

    const matches: CurrentMatch[] = [
      { ...createMatch("1", oneDayAgo.toISOString(), true, false), ms: "live" },
      { ...createMatch("2", threeDaysAgo.toISOString(), true, false), ms: "live" },
      { ...createMatch("3", twoDaysAgo.toISOString(), true, false), ms: "live" },
    ];

    const liveMatches = getLiveMatches(matches);
    expect(liveMatches).toHaveLength(3);
    expect(liveMatches[0].id).toBe("2"); // 3 days ago (earliest)
    expect(liveMatches[1].id).toBe("3"); // 2 days ago
    expect(liveMatches[2].id).toBe("1"); // 1 day ago (most recent)
  });

  it("should handle edge case: match exactly 24 hours ago with fallback", () => {
    const now = new Date();
    const exactlyOneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    const matches: CurrentMatch[] = [
      { ...createMatch("1", exactlyOneDayAgo.toISOString(), true, false), ms: undefined },
    ];

    const liveMatches = getLiveMatches(matches);
    // Should be included (within 24 hours)
    expect(liveMatches).toHaveLength(1);
  });
});
