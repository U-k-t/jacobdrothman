import { describe, expect, it } from "vitest";
import { computeGapPauseMs, formatJourneyDate, isValidMonth, monthsSinceEpoch, TIMING_CONFIG } from "./timing";

describe("monthsSinceEpoch", () => {
  it("uses the real month when valid", () => {
    expect(monthsSinceEpoch({ month: 3, year: 2022 })).toBe(2022 * 12 + 3);
  });

  it("falls back to the documented fallback month when the month is missing", () => {
    expect(monthsSinceEpoch({ year: 2022 })).toBe(2022 * 12 + TIMING_CONFIG.fallbackMonth);
  });

  it("falls back when the month is invalid rather than trusting it", () => {
    expect(monthsSinceEpoch({ month: 13, year: 2022 })).toBe(2022 * 12 + TIMING_CONFIG.fallbackMonth);
    expect(monthsSinceEpoch({ month: 0, year: 2022 })).toBe(2022 * 12 + TIMING_CONFIG.fallbackMonth);
  });
});

describe("computeGapPauseMs", () => {
  it("gives a one-year gap a longer pause than a one-month gap", () => {
    // Dec 2024 -> Jan 2025 (1 month) vs Dec 2024 -> Dec 2025 (12 months), per the requirement's own examples.
    const oneMonthGap = computeGapPauseMs({ month: 12, year: 2024 }, { month: 1, year: 2025 });
    const oneYearGap = computeGapPauseMs({ month: 12, year: 2024 }, { month: 12, year: 2025 });
    expect(oneYearGap).toBeGreaterThan(oneMonthGap);
  });

  it("gives closely spaced trips (same month) the configured minimum pause", () => {
    const pause = computeGapPauseMs({ month: 3, year: 2022 }, { month: 3, year: 2022 });
    expect(pause).toBe(TIMING_CONFIG.minGapPauseMs);
  });

  it("caps long gaps at the configured maximum instead of scaling further", () => {
    const fiveYearGap = computeGapPauseMs({ month: 1, year: 2016 }, { month: 1, year: 2021 });
    const tenYearGap = computeGapPauseMs({ month: 1, year: 2016 }, { month: 1, year: 2026 });
    expect(fiveYearGap).toBe(TIMING_CONFIG.maxGapPauseMs);
    expect(tenYearGap).toBe(TIMING_CONFIG.maxGapPauseMs);
  });

  it("is calculated from the centralized configuration, not hardcoded per gap", () => {
    const customConfig = { ...TIMING_CONFIG, minGapPauseMs: 1000, maxGapPauseMs: 1000 };
    // With min === max, every gap must collapse to that single configured value.
    const pause = computeGapPauseMs({ year: 2010 }, { year: 2020 }, customConfig);
    expect(pause).toBe(1000);
  });

  it("never returns a negative pause for out-of-order or identical dates", () => {
    const pause = computeGapPauseMs({ year: 2022 }, { year: 2020 });
    expect(pause).toBe(TIMING_CONFIG.minGapPauseMs);
  });
});

describe("formatJourneyDate", () => {
  it("formats a known month and year", () => {
    expect(formatJourneyDate({ month: 3, year: 2022 })).toBe("March 2022");
  });

  it("shows only the year when the month is unknown, never fabricating one", () => {
    expect(formatJourneyDate({ year: 2022 })).toBe("2022");
  });

  it("fails safely and shows year-only for an invalid month rather than crashing", () => {
    expect(formatJourneyDate({ month: 13, year: 2022 })).toBe("2022");
    expect(formatJourneyDate({ month: 0, year: 2022 })).toBe("2022");
    expect(formatJourneyDate({ month: Number.NaN, year: 2022 })).toBe("2022");
  });

  it("handles an undefined date safely", () => {
    expect(formatJourneyDate(undefined)).toBe("");
  });
});

describe("isValidMonth", () => {
  it("accepts 1 through 12 and rejects everything else", () => {
    expect(isValidMonth(1)).toBe(true);
    expect(isValidMonth(12)).toBe(true);
    expect(isValidMonth(0)).toBe(false);
    expect(isValidMonth(13)).toBe(false);
    expect(isValidMonth(undefined)).toBe(false);
    expect(isValidMonth(Number.NaN)).toBe(false);
  });
});
