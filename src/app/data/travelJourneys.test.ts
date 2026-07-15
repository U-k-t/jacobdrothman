import { describe, expect, it } from "vitest";
import { isValidMonth } from "../components/travel-map/timing";
import { LAX } from "./travelLocations";
import { journeys } from "./travelJourneys";

describe("journeys", () => {
  it("is ordered chronologically with sequential, unique order values", () => {
    journeys.forEach((journey, index) => {
      expect(journey.order).toBe(index + 1);
    });
    expect(new Set(journeys.map((j) => j.order)).size).toBe(journeys.length);
  });

  it("has non-decreasing years as order increases", () => {
    let lastYear = -Infinity;
    for (const journey of journeys) {
      expect(journey.start.year).toBeGreaterThanOrEqual(lastYear);
      lastYear = journey.start.year;
    }
  });

  it("has a valid month whenever one is recorded, and leaves it unset otherwise", () => {
    for (const journey of journeys) {
      if (journey.start.month !== undefined) {
        expect(isValidMonth(journey.start.month)).toBe(true);
      }
      for (const stop of journey.stops) {
        if (stop.month !== undefined) {
          expect(isValidMonth(stop.month)).toBe(true);
        }
      }
    }
  });

  it("always has at least one stop, with valid coordinates", () => {
    for (const journey of journeys) {
      expect(journey.stops.length).toBeGreaterThan(0);
      for (const stop of journey.stops) {
        expect(stop.location.name).toBeTruthy();
        expect(stop.location.country).toBeTruthy();
        expect(stop.location.lat).toBeGreaterThanOrEqual(-90);
        expect(stop.location.lat).toBeLessThanOrEqual(90);
        expect(stop.location.lng).toBeGreaterThanOrEqual(-180);
        expect(stop.location.lng).toBeLessThanOrEqual(180);
      }
    }
  });

  it("always states returnToOrigin explicitly as a boolean", () => {
    for (const journey of journeys) {
      expect(typeof journey.returnToOrigin).toBe("boolean");
    }
  });

  it("has unique journey ids", () => {
    const ids = journeys.map((j) => j.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("begins with LAX as the origin, traveling first to Ensenada", () => {
    const first = journeys[0];
    expect(first.origin.id).toBe(LAX.id);
    expect(first.stops[0].location.name).toBe("Ensenada");
    expect(first.returnToOrigin).toBe(true);
  });

  it("only marks travelMode where the source content already names it", () => {
    const allModes = journeys.flatMap((j) => [
      ...j.stops.map((s) => s.travelModeFromPrevious),
      j.returnTravelMode,
    ]);
    const resolved = allModes.filter((mode): mode is NonNullable<typeof mode> => mode !== undefined);
    for (const mode of resolved) {
      expect(["boat", "automotive"]).toContain(mode);
    }
    expect(resolved.length).toBeLessThan(allModes.length);
  });

  it("marks exactly the two known relocations as non-returning journeys", () => {
    const oneWay = journeys.filter((j) => !j.returnToOrigin);
    expect(oneWay.map((j) => j.id)).toEqual(["villach-2021", "munich-2022"]);
  });

  it("represents the already-known multi-city trips as real multi-stop journeys", () => {
    const taipeiShenzhenShanghai = journeys.find((j) => j.id === "taipei-2024")!;
    expect(taipeiShenzhenShanghai.stops.map((s) => s.location.name)).toEqual(["Taipei", "Shenzhen", "Shanghai"]);

    const tokyoKyotoOsaka = journeys.find((j) => j.id === "tokyo-2023")!;
    expect(tokyoKyotoOsaka.stops.map((s) => s.location.name)).toEqual(["Tokyo", "Kyoto", "Osaka"]);
  });
});
