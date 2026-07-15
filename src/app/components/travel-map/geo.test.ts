import { describe, expect, it } from "vitest";
import { MAP_VIEW_SIZE, project } from "./geo";

describe("project", () => {
  it("maps (0, 0) to the middle of the shared view", () => {
    const { x, y } = project(0, 0);
    expect(x).toBeCloseTo(MAP_VIEW_SIZE.width / 2);
    expect(y).toBeCloseTo(MAP_VIEW_SIZE.height / 2);
  });

  it("maps the lat/lng extremes to the corners of the shared view", () => {
    expect(project(90, -180)).toEqual({ x: 0, y: 0 });
    expect(project(-90, 180)).toEqual({ x: MAP_VIEW_SIZE.width, y: MAP_VIEW_SIZE.height });
  });

  it("is a pure, deterministic function of lat/lng — the same coordinate always projects identically", () => {
    // This is what guarantees markers/route legs and the world silhouette stay in sync:
    // both call this same function with no other shared state.
    expect(project(48.21, 16.37)).toEqual(project(48.21, 16.37));
  });
});
