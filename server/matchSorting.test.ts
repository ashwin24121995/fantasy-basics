import { describe, it, expect } from "vitest";
import {
  getUpcomingMatches,
  getLiveMatches,
  getCompletedMatches,
  type CurrentMatch,
} from "./cricketApi";

describe("Match Sorting", () => {
  // Mock match data with different dates
  const mockMatches: CurrentMatch[] = [
    {
      id: "match1",
      name: "Match 1 - Future",
      matchType: "t20",
      status: "Fixture",
      dateTimeGMT: "2026-01-15T10:00:00Z",
      matchStarted: false,
      matchEnded: false,
      t1: "Team A",
      t2: "Team B",
      t1img: "",
      t2img: "",
      score: [],
    },
    {
      id: "match2",
      name: "Match 2 - Live",
      matchType: "t20",
      status: "Live",
      dateTimeGMT: "2025-12-26T08:00:00Z",
      matchStarted: true,
      matchEnded: false,
      t1: "Team C",
      t2: "Team D",
      t1img: "",
      t2img: "",
      score: [],
    },
    {
      id: "match3",
      name: "Match 3 - Completed Recent",
      matchType: "t20",
      status: "Result",
      dateTimeGMT: "2025-12-25T14:00:00Z",
      matchStarted: true,
      matchEnded: true,
      t1: "Team E",
      t2: "Team F",
      t1img: "",
      t2img: "",
      score: [],
    },
    {
      id: "match4",
      name: "Match 4 - Future Earlier",
      matchType: "t20",
      status: "Fixture",
      dateTimeGMT: "2026-01-10T10:00:00Z",
      matchStarted: false,
      matchEnded: false,
      t1: "Team G",
      t2: "Team H",
      t1img: "",
      t2img: "",
      score: [],
    },
    {
      id: "match5",
      name: "Match 5 - Live Earlier",
      matchType: "t20",
      status: "Live",
      dateTimeGMT: "2025-12-26T06:00:00Z",
      matchStarted: true,
      matchEnded: false,
      t1: "Team I",
      t2: "Team J",
      t1img: "",
      t2img: "",
      score: [],
    },
    {
      id: "match6",
      name: "Match 6 - Completed Older",
      matchType: "t20",
      status: "Result",
      dateTimeGMT: "2025-12-20T10:00:00Z",
      matchStarted: true,
      matchEnded: true,
      t1: "Team K",
      t2: "Team L",
      t1img: "",
      t2img: "",
      score: [],
    },
  ];

  describe("getUpcomingMatches", () => {
    it("should return only upcoming matches (not started)", () => {
      const upcoming = getUpcomingMatches(mockMatches);
      
      expect(upcoming).toHaveLength(2);
      expect(upcoming.every(m => !m.matchStarted)).toBe(true);
    });

    it("should sort upcoming matches by date (earliest first)", () => {
      const upcoming = getUpcomingMatches(mockMatches);
      
      expect(upcoming[0].id).toBe("match4"); // Jan 10
      expect(upcoming[1].id).toBe("match1"); // Jan 15
      
      // Verify dates are in ascending order
      for (let i = 0; i < upcoming.length - 1; i++) {
        const currentDate = new Date(upcoming[i].dateTimeGMT).getTime();
        const nextDate = new Date(upcoming[i + 1].dateTimeGMT).getTime();
        expect(currentDate).toBeLessThanOrEqual(nextDate);
      }
    });
  });

  describe("getLiveMatches", () => {
    it("should return only live matches (started but not ended)", () => {
      const live = getLiveMatches(mockMatches);
      
      expect(live).toHaveLength(2);
      expect(live.every(m => m.matchStarted && !m.matchEnded)).toBe(true);
    });

    it("should sort live matches by start time (earliest first)", () => {
      const live = getLiveMatches(mockMatches);
      
      expect(live[0].id).toBe("match5"); // 06:00
      expect(live[1].id).toBe("match2"); // 08:00
      
      // Verify dates are in ascending order
      for (let i = 0; i < live.length - 1; i++) {
        const currentDate = new Date(live[i].dateTimeGMT).getTime();
        const nextDate = new Date(live[i + 1].dateTimeGMT).getTime();
        expect(currentDate).toBeLessThanOrEqual(nextDate);
      }
    });
  });

  describe("getCompletedMatches", () => {
    it("should return only completed matches (ended)", () => {
      const completed = getCompletedMatches(mockMatches);
      
      expect(completed).toHaveLength(2);
      expect(completed.every(m => m.matchEnded)).toBe(true);
    });

    it("should sort completed matches by date (most recent first)", () => {
      const completed = getCompletedMatches(mockMatches);
      
      expect(completed[0].id).toBe("match3"); // Dec 25 (more recent)
      expect(completed[1].id).toBe("match6"); // Dec 20 (older)
      
      // Verify dates are in descending order (most recent first)
      for (let i = 0; i < completed.length - 1; i++) {
        const currentDate = new Date(completed[i].dateTimeGMT).getTime();
        const nextDate = new Date(completed[i + 1].dateTimeGMT).getTime();
        expect(currentDate).toBeGreaterThanOrEqual(nextDate);
      }
    });
  });

  describe("Edge cases", () => {
    it("should handle empty array", () => {
      expect(getUpcomingMatches([])).toEqual([]);
      expect(getLiveMatches([])).toEqual([]);
      expect(getCompletedMatches([])).toEqual([]);
    });

    it("should handle array with only one match type", () => {
      const onlyUpcoming: CurrentMatch[] = [{
        id: "match1",
        name: "Match 1",
        matchType: "t20",
        status: "Fixture",
        dateTimeGMT: "2026-01-15T10:00:00Z",
        matchStarted: false,
        matchEnded: false,
        t1: "Team A",
        t2: "Team B",
        t1img: "",
        t2img: "",
        score: [],
      }];

      expect(getUpcomingMatches(onlyUpcoming)).toHaveLength(1);
      expect(getLiveMatches(onlyUpcoming)).toHaveLength(0);
      expect(getCompletedMatches(onlyUpcoming)).toHaveLength(0);
    });
  });
});
