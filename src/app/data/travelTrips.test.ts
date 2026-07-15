import { describe, expect, it } from "vitest";
import { trips } from "./travelTrips";

describe("trips", () => {
  it("is ordered chronologically with sequential, unique order values", () => {
    trips.forEach((trip, index) => {
      expect(trip.order).toBe(index + 1);
    });
    expect(new Set(trips.map((t) => t.order)).size).toBe(trips.length);
  });

  it("has non-decreasing years as order increases", () => {
    let lastYear = -Infinity;
    for (const trip of trips) {
      if (!trip.year) continue;
      const year = Number(trip.year);
      expect(year).toBeGreaterThanOrEqual(lastYear);
      lastYear = year;
    }
  });

  it("has valid coordinates and required fields for every trip", () => {
    for (const trip of trips) {
      expect(trip.id).toBeTruthy();
      expect(trip.destination.name).toBeTruthy();
      expect(trip.destination.lat).toBeGreaterThanOrEqual(-90);
      expect(trip.destination.lat).toBeLessThanOrEqual(90);
      expect(trip.destination.lng).toBeGreaterThanOrEqual(-180);
      expect(trip.destination.lng).toBeLessThanOrEqual(180);
      expect(trip.hub).toBeTruthy();
    }
  });

  it("has unique trip ids", () => {
    const ids = trips.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("only marks travelMode where the source content already names it", () => {
    const resolved = trips.filter((t) => t.travelMode);
    // Every currently-resolved mode is a cruise (boat) or the Ireland road trip (automotive).
    for (const trip of resolved) {
      expect(["boat", "automotive"]).toContain(trip.travelMode);
    }
    // Most trips remain unresolved by design (not guessed) — see plan.md.
    expect(resolved.length).toBeLessThan(trips.length);
  });

  it("marks exactly the two known relocations as moves", () => {
    const moves = trips.filter((t) => t.kind === "move");
    expect(moves.map((t) => t.id)).toEqual(["villach-2021", "munich-2022"]);
  });
});
