import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
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

function Harness({ legCount, stepMs }: { legCount: number; stepMs?: number }) {
  const { containerRef, activeLegIndex, isComplete, isReducedMotion, replay } = useTravelMapAnimation({
    legCount,
    stepMs,
  });
  return (
    <div ref={containerRef} data-testid="root">
      <span data-testid="active-leg-index">{activeLegIndex}</span>
      <span data-testid="is-complete">{String(isComplete)}</span>
      <span data-testid="is-reduced-motion">{String(isReducedMotion)}</span>
      <button onClick={replay}>Replay trips</button>
    </div>
  );
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
    render(<Harness legCount={3} stepMs={100} />);

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(screen.getByTestId("active-leg-index").textContent).toBe("-1");
  });

  it("steps through one leg at a time and reaches the final leg", () => {
    render(<Harness legCount={3} stepMs={100} />);
    const observer = MockIntersectionObserver.instances[0];

    act(() => {
      observer.callback([{ isIntersecting: true }]);
    });
    act(() => {
      vi.advanceTimersByTime(0);
    });
    expect(screen.getByTestId("active-leg-index").textContent).toBe("0");

    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(screen.getByTestId("active-leg-index").textContent).toBe("1");

    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(screen.getByTestId("active-leg-index").textContent).toBe("2");

    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(screen.getByTestId("active-leg-index").textContent).toBe("3");
    expect(screen.getByTestId("is-complete").textContent).toBe("true");

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(screen.getByTestId("active-leg-index").textContent).toBe("3");
  });

  it("replay mid-animation cancels the pending timer instead of letting it overlap", () => {
    render(<Harness legCount={3} stepMs={50} />);
    const observer = MockIntersectionObserver.instances[0];

    act(() => {
      observer.callback([{ isIntersecting: true }]);
    });
    act(() => {
      vi.advanceTimersByTime(0);
    });
    // Now on leg 0, with a timer pending to advance to leg 1 in 50ms.
    expect(screen.getByTestId("active-leg-index").textContent).toBe("0");

    const clearTimeoutSpy = vi.spyOn(window, "clearTimeout");
    const replayButton = screen.getByText("Replay trips");

    act(() => {
      replayButton.click();
    });
    // The pending "advance to leg 1" timer must be cancelled, not left to fire later.
    expect(clearTimeoutSpy).toHaveBeenCalled();
    expect(screen.getByTestId("active-leg-index").textContent).toBe("-1");

    // If the cancelled timer had *not* been cleared, this advance would double-fire
    // and skip a leg. Clicking replay a few more times in a row must never leave
    // more than one timer pending, however many times it's pressed.
    act(() => {
      replayButton.click();
      replayButton.click();
    });
    act(() => {
      vi.advanceTimersByTime(0);
    });
    expect(screen.getByTestId("active-leg-index").textContent).toBe("0");

    act(() => {
      vi.advanceTimersByTime(50);
    });
    expect(screen.getByTestId("active-leg-index").textContent).toBe("1");

    act(() => {
      vi.advanceTimersByTime(50);
    });
    expect(screen.getByTestId("active-leg-index").textContent).toBe("2");

    act(() => {
      vi.advanceTimersByTime(50);
    });
    expect(screen.getByTestId("active-leg-index").textContent).toBe("3");
    expect(screen.getByTestId("is-complete").textContent).toBe("true");
  });

  it("shows the complete state immediately when prefers-reduced-motion is set, without timers", () => {
    setReducedMotion(true);
    render(<Harness legCount={4} stepMs={100} />);

    expect(screen.getByTestId("is-reduced-motion").textContent).toBe("true");
    expect(screen.getByTestId("active-leg-index").textContent).toBe("4");
    expect(screen.getByTestId("is-complete").textContent).toBe("true");
    expect(MockIntersectionObserver.instances.length).toBe(0);
  });

  it("replay under reduced motion jumps straight back to complete, without animating", () => {
    setReducedMotion(true);
    render(<Harness legCount={3} stepMs={100} />);

    const replayButton = screen.getByText("Replay trips");
    act(() => {
      replayButton.click();
    });

    expect(screen.getByTestId("active-leg-index").textContent).toBe("3");
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(screen.getByTestId("active-leg-index").textContent).toBe("3");
  });

  it("handles an empty leg list safely", () => {
    render(<Harness legCount={0} stepMs={100} />);

    expect(screen.getByTestId("active-leg-index").textContent).toBe("-1");
    expect(screen.getByTestId("is-complete").textContent).toBe("true");
  });

  it("cleans up the observer and timer when the component unmounts", () => {
    const clearTimeoutSpy = vi.spyOn(window, "clearTimeout");
    const { unmount } = render(<Harness legCount={3} stepMs={100} />);
    const observer = MockIntersectionObserver.instances[0];

    act(() => {
      observer.callback([{ isIntersecting: true }]);
    });

    unmount();

    expect(observer.disconnect).toHaveBeenCalled();
    expect(clearTimeoutSpy).toHaveBeenCalled();
  });
});
