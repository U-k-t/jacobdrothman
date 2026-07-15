/**
 * Centralized pacing configuration for the travel animation. Nothing in the
 * animation hardcodes a per-journey delay — every pause is derived from these
 * values plus the actual month/year gap between journeys. See plan.md for the
 * full rationale and worked examples.
 */
export const TIMING_CONFIG = {
  /** Floor: even a same-month/same-year gap between journeys gets at least this pause. */
  minGapPauseMs: 250,
  /** Ceiling: a multi-year gap never waits longer than this, so it can't stall the animation. */
  maxGapPauseMs: 2200,
  /** How long a single leg's path takes to draw (visual, matches the `motion` transition duration). */
  legDurationMs: 300,
  /** How long to hold at a stop before continuing, independent of any calendar-gap pause. */
  dwellMs: 200,
  /** Used only when a journey's real month is unknown — an internal computation input, never displayed. */
  fallbackMonth: 6,
  /** Gap size (in months) at which the pause formula saturates at maxGapPauseMs. */
  referenceGapMonths: 60,
} as const;

export type TimingConfig = typeof TIMING_CONFIG;

/** True for any real calendar month (1–12). Guards against malformed data instead of throwing. */
export function isValidMonth(month: number | undefined): month is number {
  return typeof month === "number" && Number.isInteger(month) && month >= 1 && month <= 12;
}

interface JourneyDate {
  month?: number;
  year: number;
}

/** Months-since-epoch, applying the documented fallback month when the real one is unknown or invalid. */
export function monthsSinceEpoch(date: JourneyDate, config: TimingConfig = TIMING_CONFIG): number {
  const month = isValidMonth(date.month) ? date.month : config.fallbackMonth;
  return date.year * 12 + month;
}

/**
 * Square-root-compressed pause between two journeys' start dates. Preserves "longer gap ->
 * longer pause" monotonically while keeping a single multi-year gap from dominating the
 * animation's total runtime (capped at maxGapPauseMs once the gap reaches referenceGapMonths).
 */
export function computeGapPauseMs(from: JourneyDate, to: JourneyDate, config: TimingConfig = TIMING_CONFIG): number {
  const gapMonths = Math.max(0, monthsSinceEpoch(to, config) - monthsSinceEpoch(from, config));
  const normalized = Math.min(1, Math.sqrt(gapMonths / config.referenceGapMonths));
  return config.minGapPauseMs + (config.maxGapPauseMs - config.minGapPauseMs) * normalized;
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/** Formats a journey/leg date for display. Never fabricates a month — shows year-only if unknown or invalid. */
export function formatJourneyDate(date: { month?: number; year: number } | undefined): string {
  if (!date) return "";
  if (isValidMonth(date.month)) {
    return `${MONTH_NAMES[date.month - 1]} ${date.year}`;
  }
  return `${date.year}`;
}
