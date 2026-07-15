import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { RouteLeg } from "./routeLegs";

// Motion's real exit/enter animations don't resolve deterministically under jsdom's
// fake timers, so this suite mocks `motion/react` down to plain DOM elements —
// what's under test here is MapCanvas's *structural* contract (exactly one active
// path at a time, keyed to the current leg), not the animation choreography itself
// (verified manually in-browser instead).
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
    AnimatePresence: (props: { children?: React.ReactNode }) => props.children,
  };
});

const { MapCanvas } = await import("./MapCanvas");

const LAX_POINT = { id: "lax", name: "Los Angeles", country: "United States", lat: 33.94, lng: -118.4 };
const ENSENADA_POINT = { id: "ensenada", name: "Ensenada", country: "Mexico", lat: 31.87, lng: -116.62 };

const legA: RouteLeg = {
  id: "leg-a",
  order: 1,
  origin: LAX_POINT,
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
  destination: LAX_POINT,
  travelMode: "boat",
  direction: "return",
  isRelocation: false,
  journeyId: "ensenada-2006",
  label: "Returned to Los Angeles",
  year: 2006,
};

describe("MapCanvas", () => {
  it("shows the Los Angeles origin marker immediately, before any leg has started", () => {
    const { container } = render(<MapCanvas legs={[legA, legB]} activeLegIndex={-1} />);
    expect(container.querySelectorAll('[data-testid="active-route-path"]')).toHaveLength(0);
    // One marker group should already be rendered for the LAX origin.
    expect(container.querySelectorAll("circle").length).toBeGreaterThan(0);
  });

  it("renders exactly one active path for the current leg", () => {
    const { container } = render(<MapCanvas legs={[legA, legB]} activeLegIndex={0} />);
    expect(container.querySelectorAll('[data-testid="active-route-path"]')).toHaveLength(1);
  });

  it("replaces the previous leg's path instead of accumulating it", () => {
    const { container, rerender } = render(<MapCanvas legs={[legA, legB]} activeLegIndex={0} />);
    const firstD = container.querySelector('[data-testid="active-route-path"]')?.getAttribute("d");

    rerender(<MapCanvas legs={[legA, legB]} activeLegIndex={1} />);
    const paths = container.querySelectorAll('[data-testid="active-route-path"]');
    expect(paths).toHaveLength(1);
    expect(paths[0].getAttribute("d")).not.toBe(firstD);
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

  it("handles an empty legs array safely", () => {
    const { container } = render(<MapCanvas legs={[]} activeLegIndex={-1} />);
    expect(container.querySelectorAll('[data-testid="active-route-path"]')).toHaveLength(0);
  });
});
