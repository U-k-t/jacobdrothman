import { useCallback, useEffect, useRef, useState } from "react";
import type { RouteLeg } from "./routeLegs";
import { computeGapPauseMs, TIMING_CONFIG } from "./timing";

interface UseTravelMapAnimationOptions {
  legs: RouteLeg[];
}

interface UseTravelMapAnimationResult {
  containerRef: React.RefObject<HTMLDivElement | null>;
  /** -1 before the first leg starts; legs.length once every leg has played. */
  activeLegIndex: number;
  isReducedMotion: boolean;
  isComplete: boolean;
  /** Resets to Los Angeles / the first leg and replays. Jumps straight to the end for reduced motion. */
  replay: () => void;
}

/**
 * Delay before revealing `legs[nextIndex]`, in milliseconds: the time it takes the previous
 * leg's path to finish drawing, plus a dwell at its destination, plus — only when the next leg
 * belongs to a *different* journey — a pause scaled to the real calendar gap between the two
 * journeys' start dates. Stops within the same journey never get that calendar-gap pause.
 */
function delayBeforeLeg(legs: RouteLeg[], nextIndex: number): number {
  if (nextIndex <= 0 || nextIndex >= legs.length) {
    return 0;
  }
  const previous = legs[nextIndex - 1];
  const next = legs[nextIndex];
  const gapPauseMs =
    previous.journeyId === next.journeyId
      ? 0
      : computeGapPauseMs({ month: previous.month, year: previous.year }, { month: next.month, year: next.year });
  return TIMING_CONFIG.legDurationMs + TIMING_CONFIG.dwellMs + gapPauseMs;
}

/**
 * Drives the sequential leg-by-leg route animation: starts once the map scrolls
 * into view, holds one leg "active" at a time with pacing derived from the real
 * month/year gap between journeys, and collapses straight to the complete state
 * for prefers-reduced-motion. A single timeout ref is cleared at the top of every
 * effect run so overlapping timers can never accumulate, on replay or otherwise.
 * Cleans up its timer and observer on unmount.
 */
export function useTravelMapAnimation({ legs }: UseTravelMapAnimationOptions): UseTravelMapAnimationResult {
  const legCount = legs.length;
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number | null>(null);
  // Incremented every time a step is (re)scheduled, on replay, and on unmount. A scheduled
  // callback captures the token it was issued and checks it before touching state, so a stale
  // callback reference invoked out of band (not just one cancelled via clearTimeout) can never
  // resurrect a previous leg. Belt-and-suspenders alongside clearPendingTimeout below.
  const runIdRef = useRef(0);
  const [isReducedMotion, setIsReducedMotion] = useState(() =>
    typeof window !== "undefined" && typeof window.matchMedia === "function"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false,
  );
  const [hasStarted, setHasStarted] = useState(false);
  const [activeLegIndex, setActiveLegIndex] = useState(-1);

  const clearPendingTimeout = useCallback(() => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setIsReducedMotion(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (isReducedMotion && legCount > 0) {
      clearPendingTimeout();
      setHasStarted(true);
      setActiveLegIndex(legCount);
    }
  }, [isReducedMotion, legCount, clearPendingTimeout]);

  useEffect(() => {
    if (isReducedMotion || legCount === 0 || hasStarted) return;

    const node = containerRef.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setHasStarted(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setHasStarted(true);
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [isReducedMotion, legCount, hasStarted]);

  useEffect(() => {
    clearPendingTimeout();

    if (!hasStarted || isReducedMotion || legCount === 0 || activeLegIndex >= legCount) {
      return;
    }

    const nextIndex = activeLegIndex + 1;
    const delay = activeLegIndex < 0 ? 0 : delayBeforeLeg(legs, nextIndex);
    const runId = ++runIdRef.current;
    timeoutRef.current = window.setTimeout(() => {
      // Stale-callback guard: if a newer step (or replay) has been scheduled since this
      // timeout was created, runIdRef.current will have moved on — ignore this callback
      // even if something invoked it outside of the normal clearTimeout path.
      if (runIdRef.current !== runId) return;
      setActiveLegIndex((prev) => Math.min(prev + 1, legCount));
    }, delay);

    return clearPendingTimeout;
  }, [hasStarted, isReducedMotion, legCount, activeLegIndex, legs, clearPendingTimeout]);

  const replay = useCallback(() => {
    // Deliberately does not touch the timer or runIdRef directly: the step-timer effect
    // above already clears-and-reschedules (bumping runIdRef itself) on every actual
    // activeLegIndex change, which is the single source of truth for "no overlapping
    // timers." Bumping runIdRef here unconditionally would invalidate a still-pending,
    // still-valid timer whenever replay() is called more than once in the same tick
    // without the resulting state actually changing (React bails out of re-rendering,
    // so the effect never reruns to reschedule) — the effect-owned bump is sufficient
    // because it only ever fires when a timer is genuinely superseded.
    if (isReducedMotion) {
      setHasStarted(true);
      setActiveLegIndex(legCount);
      return;
    }
    setHasStarted(true);
    setActiveLegIndex(-1);
  }, [isReducedMotion, legCount]);

  useEffect(() => {
    return () => {
      runIdRef.current++;
    };
  }, []);

  return {
    containerRef,
    activeLegIndex,
    isReducedMotion,
    isComplete: legCount === 0 || activeLegIndex >= legCount,
    replay,
  };
}
