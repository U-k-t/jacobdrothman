import { useCallback, useEffect, useRef, useState } from "react";

interface UseTravelMapAnimationOptions {
  /** Total number of route legs to animate through. */
  legCount: number;
  /** Milliseconds to hold each leg active before advancing to the next. */
  stepMs?: number;
}

interface UseTravelMapAnimationResult {
  containerRef: React.RefObject<HTMLDivElement | null>;
  /** -1 before the first leg starts; legCount once every leg has played. */
  activeLegIndex: number;
  isReducedMotion: boolean;
  isComplete: boolean;
  /** Resets to the first leg and replays. Jumps straight to the end for reduced motion. */
  replay: () => void;
}

/**
 * Drives the sequential leg-by-leg route animation: starts once the map scrolls
 * into view, holds one leg "active" at a time, and collapses straight to the
 * complete state for prefers-reduced-motion. A single timeout ref is cleared at
 * the top of every effect run so overlapping timers can never accumulate, on
 * replay or otherwise. Cleans up its timer and observer on unmount.
 */
export function useTravelMapAnimation({
  legCount,
  stepMs = 900,
}: UseTravelMapAnimationOptions): UseTravelMapAnimationResult {
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number | null>(null);
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

    const delay = activeLegIndex < 0 ? 0 : stepMs;
    timeoutRef.current = window.setTimeout(() => {
      setActiveLegIndex((prev) => Math.min(prev + 1, legCount));
    }, delay);

    return clearPendingTimeout;
  }, [hasStarted, isReducedMotion, legCount, activeLegIndex, stepMs, clearPendingTimeout]);

  const replay = useCallback(() => {
    // Deliberately does not touch the timer directly: the step-timer effect above
    // already clears-and-reschedules on every activeLegIndex change, which is the
    // single source of truth for "no overlapping timers." Clearing here too would
    // risk cancelling that effect's own pending kickoff timer without anything left
    // to reschedule it, if replay() fires again before state actually changes.
    if (isReducedMotion) {
      setHasStarted(true);
      setActiveLegIndex(legCount);
      return;
    }
    setHasStarted(true);
    setActiveLegIndex(-1);
  }, [isReducedMotion, legCount]);

  return {
    containerRef,
    activeLegIndex,
    isReducedMotion,
    isComplete: legCount === 0 || activeLegIndex >= legCount,
    replay,
  };
}
