import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { RouteLeg } from "./routeLegs";

// Motion's real exit/enter animations don't resolve deterministically under jsdom's
// fake timers, so this suite mocks `motion/react` down to plain DOM elements —
// what's under test here is MapCanvas's *structural* contract (exactly one active
// path at a time, keyed to the current leg, removed synchronously — no lingering exit
// phase), not the animation choreography itself (verified manually in-browser instead).
vi.mock("motion/react", async () => {
  const React = await import("react");
  function stripMotionProps({ initial, animate, exit, transition, ...rest }: Record<string, unknown>) {
    return rest;
  }
  function makeMotionComponent(tag: string) {
    return function MotionMock(props: Record<string, unknown>) {
      return React.createElement(tag, stripMotionProps(props));
    };
  }
  return {
    motion: {
      path: makeMotionComponent("path"),
      g: makeMotionComponent("g"),
      circle: makeMotionComponent("circle"),
    },
  };
});

const { MapCanvas } = await import("./MapCanvas");

const SOCAL_POINT = { id: "southern-california", name: "Southern California", country: "United States", lat: 33.94, lng: -118.4 };
const ENSENADA_POINT = { id: "ensenada", name: "Ensenada", country: "Mexico", lat: 31.87, lng: -116.62 };
const VILLACH_POINT = { id: "villach", name: "Villach", country: "Austria", lat: 46.61, lng: 13.85 };

const legA: RouteLeg = {
  id: "leg-a",
  order: 1,
  origin: SOCAL_POINT,
  destination: ENSENADA_POINT,
  travelMode: undefined,
  direction: "outbound",
  isRelocation: false,
  journeyId: "ensenada-2006",
  label: "Ensenada",
  year: 2006,
};

const legB: RouteLeg = {
  id: "leg-b",
  order: 2,
  origin: ENSENADA_POINT,
  destination: SOCAL_POINT,
  travelMode: "boat",
  direction: "return",
  isRelocation: false,
  journeyId: "ensenada-2006",
  label: "Returned to Southern California",
  year: 2006,
};

describe("MapCanvas", () => {
  it("shows the Southern California origin marker immediately, before any leg has started", () => {
    const { container } = render(<MapCanvas legs={[legA, legB]} activeLegIndex={-1} />);
    expect(container.querySelectorAll('[data-testid="active-route-path"]')).toHaveLength(0);
    // One marker group should already be rendered for the Southern California origin.
    expect(container.querySelectorAll("circle").length).toBeGreaterThan(0);
  });

  it("renders exactly one active path for the current leg", () => {
    const { container } = render(<MapCanvas legs={[legA, legB]} activeLegIndex={0} />);
    expect(container.querySelectorAll('[data-testid="active-route-path"]')).toHaveLength(1);
  });

  it("removes the previous leg's path before the next one begins, instead of accumulating it", () => {
    const { container, rerender } = render(<MapCanvas legs={[legA, legB]} activeLegIndex={0} />);
    const firstD = container.querySelector('[data-testid="active-route-path"]')?.getAttribute("d");

    rerender(<MapCanvas legs={[legA, legB]} activeLegIndex={1} />);
    const paths = container.querySelectorAll('[data-testid="active-route-path"]');
    expect(paths).toHaveLength(1);
    expect(paths[0].getAttribute("d")).not.toBe(firstD);
  });

  it("renders a fresh path for two consecutive legs that share identical origin, destination, and mode", () => {
    const legX: RouteLeg = { ...legA, id: "leg-x", travelMode: "boat" };
    const legY: RouteLeg = { ...legA, id: "leg-y", travelMode: "boat" };
    const { container, rerender } = render(<MapCanvas legs={[legX, legY]} activeLegIndex={0} />);
    expect(container.querySelectorAll('[data-testid="active-route-path"]')).toHaveLength(1);

    rerender(<MapCanvas legs={[legX, legY]} activeLegIndex={1} />);
    const paths = container.querySelectorAll('[data-testid="active-route-path"]');
    expect(paths).toHaveLength(1);
  });

  it("never accumulates more than one path across a full multi-leg playthrough", () => {
    const legC: RouteLeg = { ...legA, id: "leg-c", origin: SOCAL_POINT, destination: VILLACH_POINT };
    const legs = [legA, legB, legC];
    const { container, rerender } = render(<MapCanvas legs={legs} activeLegIndex={-1} />);
    for (let index = 0; index < legs.length; index++) {
      rerender(<MapCanvas legs={legs} activeLegIndex={index} />);
      expect(container.querySelectorAll('[data-testid="active-route-path"]')).toHaveLength(1);
    }
    rerender(<MapCanvas legs={legs} activeLegIndex={legs.length} />);
    expect(container.querySelectorAll('[data-testid="active-route-path"]')).toHaveLength(0);
  });

  it("colors the active path using the configured class for its travel mode", () => {
    const { container } = render(<MapCanvas legs={[legA, legB]} activeLegIndex={1} />);
    const path = container.querySelector('[data-testid="active-route-path"]');
    expect(path?.getAttribute("class")).toContain("stroke-travel-mode-boat");
  });

  it("shows an unresolved-mode dashed style when travel mode is not recorded", () => {
    const { container } = render(<MapCanvas legs={[legA, legB]} activeLegIndex={0} />);
    const path = container.querySelector('[data-testid="active-route-path"]');
    expect(path?.getAttribute("class")).toContain("stroke-travel-mode-unresolved");
    expect(path?.getAttribute("stroke-dasharray")).toBeTruthy();
  });

  it("shows no active path once complete", () => {
    const { container } = render(<MapCanvas legs={[legA, legB]} activeLegIndex={2} />);
    expect(container.querySelectorAll('[data-testid="active-route-path"]')).toHaveLength(0);
  });

  it("shares one projection/viewBox between markers, paths, and the world silhouette", () => {
    const { container } = render(<MapCanvas legs={[legA, legB]} activeLegIndex={0} />);
    const svg = container.querySelector("svg");
    expect(svg?.getAttribute("viewBox")).toBe("0 0 1000 500");
    expect(container.querySelectorAll("polygon").length).toBeGreaterThan(0);
  });

  it("uses an enlarged max height now that the legend and caption no longer reserve space", () => {
    const { container } = render(<MapCanvas legs={[legA, legB]} activeLegIndex={0} />);
    const svg = container.querySelector("svg") as SVGSVGElement;
    expect(svg.style.maxHeight).toBe("560px");
    expect(svg.getAttribute("class")).toContain("w-full");
    expect(svg.getAttribute("class")).toContain("h-auto");
  });

  it("handles an empty legs array safely", () => {
    const { container } = render(<MapCanvas legs={[]} activeLegIndex={-1} />);
    expect(container.querySelectorAll('[data-testid="active-route-path"]')).toHaveLength(0);
  });
});
