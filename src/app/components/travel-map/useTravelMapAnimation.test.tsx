import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { journeys } from "../../data/travelJourneys";
import { LAX } from "../../data/travelLocations";
import { buildRouteLegs } from "./routeLegs";
import type { RouteLeg } from "./routeLegs";
import { computeGapPauseMs, TIMING_CONFIG } from "./timing";
import { useTravelMapAnimation } from "./useTravelMapAnimation";

type Entry = { isIntersecting: boolean };
type Callback = (entries: Entry[]) => void;

class MockIntersectionObserver {
  static instances: MockIntersectionObserver[] = [];
  callback: Callback;
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  constructor(callback: Callback) {
    this.callback = callback;
    MockIntersectionObserver.instances.push(this);
  }
}

function setReducedMotion(matches: boolean) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches,
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  })) as unknown as typeof window.matchMedia;
}

function Harness({ legs }: { legs: RouteLeg[] }) {
  const { containerRef, activeLegIndex, isComplete, isReducedMotion, replay } = useTravelMapAnimation({ legs });
  return (
    <div ref={containerRef} data-testid="root">
      <span data-testid="active-leg-index">{activeLegIndex}</span>
      <span data-testid="is-complete">{String(isComplete)}</span>
      <span data-testid="is-reduced-motion">{String(isReducedMotion)}</span>
      <button onClick={replay}>Replay trips</button>
    </div>
  );
}

const LOCATION_A = { id: "a", name: "A", country: "Testland", lat: 0, lng: 0 };
const LOCATION_B = { id: "b", name: "B", country: "Testland", lat: 1, lng: 1 };
const LOCATION_C = { id: "c", name: "C", country: "Testland", lat: 2, lng: 2 };

function makeLeg(overrides: Partial<RouteLeg>): RouteLeg {
  return {
    id: "leg",
    order: 1,
    origin: LOCATION_A,
    destination: LOCATION_B,
    travelMode: undefined,
    direction: "outbound",
    isRelocation: false,
    journeyId: "journey-1",
    label: "B",
    year: 2020,
    ...overrides,
  };
}

describe("useTravelMapAnimation", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    MockIntersectionObserver.instances = [];
    // @ts-expect-error test mock
    window.IntersectionObserver = MockIntersectionObserver;
    // @ts-expect-error test mock
    global.IntersectionObserver = MockIntersectionObserver;
    setReducedMotion(false);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("does not advance until the map enters the viewport", () => {
    render(<Harness legs={[makeLeg({ id: "l1" }), makeLeg({ id: "l2" })]} />);

    act(() => {
      vi.advanceTimersByTime(10000);
    });

    expect(screen.getByTestId("active-leg-index").textContent).toBe("-1");
  });

  it("begins the first leg immediately once the map is in view, with no artificial delay", () => {
    render(<Harness legs={[makeLeg({ id: "l1" })]} />);
    const observer = MockIntersectionObserver.instances[0];

    act(() => {
      observer.callback([{ isIntersecting: true }]);
    });
    act(() => {
      vi.advanceTimersByTime(0);
    });
    expect(screen.getByTestId("active-leg-index").textContent).toBe("0");
  });

  it("applies a longer pause for a one-year journey gap than a one-month gap", () => {
    const baseDelay = TIMING_CONFIG.legDurationMs + TIMING_CONFIG.dwellMs;
    const oneMonthGapPause = computeGapPauseMs({ month: 12, year: 2024 }, { month: 1, year: 2025 });
    const oneYearGapPause = computeGapPauseMs({ month: 12, year: 2024 }, { month: 12, year: 2025 });
    expect(oneYearGapPause).toBeGreaterThan(oneMonthGapPause);

    const legsOneMonthGap = [
      makeLeg({ id: "l1", journeyId: "j1", year: 2024, month: 12 }),
      makeLeg({ id: "l2", journeyId: "j2", year: 2025, month: 1 }),
    ];
    const legsOneYearGap = [
      makeLeg({ id: "l1", journeyId: "j1", year: 2024, month: 12 }),
      makeLeg({ id: "l2", journeyId: "j2", year: 2025, month: 12 }),
    ];

    // One-month gap: waiting just past its exact required delay must be enough to advance.
    const { unmount: unmount1 } = render(<Harness legs={legsOneMonthGap} />);
    const observer1 = MockIntersectionObserver.instances[0];
    act(() => observer1.callback([{ isIntersecting: true }]));
    act(() => vi.advanceTimersByTime(0));
    act(() => vi.advanceTimersByTime(baseDelay + oneMonthGapPause + 10));
    const advancedWithSmallGap = screen.getByTestId("active-leg-index").textContent === "1";
    unmount1();

    // One-year gap: the same window (calibrated to the *smaller* gap) must not be enough yet.
    render(<Harness legs={legsOneYearGap} />);
    const observer2 = MockIntersectionObserver.instances[MockIntersectionObserver.instances.length - 1];
    act(() => observer2.callback([{ isIntersecting: true }]));
    act(() => vi.advanceTimersByTime(0));
    act(() => vi.advanceTimersByTime(baseDelay + oneMonthGapPause + 10));
    const advancedWithLargeGap = screen.getByTestId("active-leg-index").textContent === "1";

    expect(advancedWithSmallGap).toBe(true);
    expect(advancedWithLargeGap).toBe(false);
  });

  it("does not apply a calendar-gap pause between stops in the same journey", () => {
    const legs = [
      makeLeg({ id: "l1", journeyId: "same-journey", year: 2016 }),
      makeLeg({ id: "l2", journeyId: "same-journey", year: 2021 }), // huge year gap, but same journey
    ];
    render(<Harness legs={legs} />);
    const observer = MockIntersectionObserver.instances[0];
    act(() => observer.callback([{ isIntersecting: true }]));
    act(() => vi.advanceTimersByTime(0));
    // Only leg-duration + dwell should be needed — no multi-year gap pause — since both legs
    // belong to the same journey.
    act(() => vi.advanceTimersByTime(TIMING_CONFIG.legDurationMs + TIMING_CONFIG.dwellMs));
    expect(screen.getByTestId("active-leg-index").textContent).toBe("1");
  });

  it("reaches the final leg and stops advancing once complete", () => {
    // Distinct, widely-separated journeys/years so every step pays the full max gap pause.
    const legs = [
      makeLeg({ id: "l1", journeyId: "j1", year: 2000 }),
      makeLeg({ id: "l2", journeyId: "j2", year: 2010 }),
      makeLeg({ id: "l3", journeyId: "j3", year: 2020 }),
    ];
    render(<Harness legs={legs} />);
    const observer = MockIntersectionObserver.instances[0];
    act(() => observer.callback([{ isIntersecting: true }]));

    const step = TIMING_CONFIG.legDurationMs + TIMING_CONFIG.dwellMs + TIMING_CONFIG.maxGapPauseMs;
    act(() => vi.advanceTimersByTime(0));
    act(() => vi.advanceTimersByTime(step));
    act(() => vi.advanceTimersByTime(step));
    act(() => vi.advanceTimersByTime(step));
    expect(screen.getByTestId("active-leg-index").textContent).toBe("3");
    expect(screen.getByTestId("is-complete").textContent).toBe("true");

    act(() => vi.advanceTimersByTime(10000));
    expect(screen.getByTestId("active-leg-index").textContent).toBe("3");
  });

  it("replay resets to Los Angeles and restarts at LAX -> Ensenada using the real dataset", () => {
    const legs = buildRouteLegs(journeys);
    render(<Harness legs={legs} />);
    const observer = MockIntersectionObserver.instances[0];

    act(() => observer.callback([{ isIntersecting: true }]));
    act(() => vi.advanceTimersByTime(0));
    expect(screen.getByTestId("active-leg-index").textContent).toBe("0");
    expect(legs[0].origin.id).toBe(LAX.id);
    expect(legs[0].destination.name).toBe("Ensenada");

    // Advance a bit further into the animation...
    act(() => vi.advanceTimersByTime(TIMING_CONFIG.legDurationMs + TIMING_CONFIG.dwellMs + TIMING_CONFIG.maxGapPauseMs));

    const replayButton = screen.getByText("Replay trips");
    act(() => replayButton.click());
    expect(screen.getByTestId("active-leg-index").textContent).toBe("-1");

    act(() => vi.advanceTimersByTime(0));
    expect(screen.getByTestId("active-leg-index").textContent).toBe("0");
  });

  it("replay mid-animation cancels the pending timer instead of letting it overlap", () => {
    const legs = [makeLeg({ id: "l1" }), makeLeg({ id: "l2" }), makeLeg({ id: "l3" })];
    render(<Harness legs={legs} />);
    const observer = MockIntersectionObserver.instances[0];

    act(() => observer.callback([{ isIntersecting: true }]));
    act(() => vi.advanceTimersByTime(0));
    expect(screen.getByTestId("active-leg-index").textContent).toBe("0");

    const clearTimeoutSpy = vi.spyOn(window, "clearTimeout");
    const replayButton = screen.getByText("Replay trips");

    act(() => replayButton.click());
    expect(clearTimeoutSpy).toHaveBeenCalled();
    expect(screen.getByTestId("active-leg-index").textContent).toBe("-1");

    act(() => {
      replayButton.click();
      replayButton.click();
    });
    act(() => vi.advanceTimersByTime(0));
    expect(screen.getByTestId("active-leg-index").textContent).toBe("0");
  });

  it("shows the complete state immediately when prefers-reduced-motion is set, without timers", () => {
    setReducedMotion(true);
    const legs = [makeLeg({ id: "l1" }), makeLeg({ id: "l2" }), makeLeg({ id: "l3" }), makeLeg({ id: "l4" })];
    render(<Harness legs={legs} />);

    expect(screen.getByTestId("is-reduced-motion").textContent).toBe("true");
    expect(screen.getByTestId("active-leg-index").textContent).toBe("4");
    expect(screen.getByTestId("is-complete").textContent).toBe("true");
    expect(MockIntersectionObserver.instances.length).toBe(0);

    // No forced multi-year-gap waits should ever occur under reduced motion.
    act(() => vi.advanceTimersByTime(0));
    expect(screen.getByTestId("active-leg-index").textContent).toBe("4");
  });

  it("handles an empty leg list safely", () => {
    render(<Harness legs={[]} />);
    expect(screen.getByTestId("active-leg-index").textContent).toBe("-1");
    expect(screen.getByTestId("is-complete").textContent).toBe("true");
  });

  it("cleans up the observer and timer when the component unmounts", () => {
    const clearTimeoutSpy = vi.spyOn(window, "clearTimeout");
    const { unmount } = render(<Harness legs={[makeLeg({ id: "l1" }), makeLeg({ id: "l2" })]} />);
    const observer = MockIntersectionObserver.instances[0];

    act(() => observer.callback([{ isIntersecting: true }]));
    unmount();

    expect(observer.disconnect).toHaveBeenCalled();
    expect(clearTimeoutSpy).toHaveBeenCalled();
  });
});
