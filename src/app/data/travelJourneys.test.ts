import { describe, expect, it } from "vitest";
import { isValidMonth } from "../components/travel-map/timing";
import { SOUTHERN_CALIFORNIA } from "./travelLocations";
import { journeys } from "./travelJourneys";

describe("journeys", () => {
  it("is ordered chronologically with sequential, unique order values", () => {
    journeys.forEach((journey, index) => {
      expect(journey.order).toBe(index + 1);
    });
    expect(new Set(journeys.map((j) => j.order)).size).toBe(journeys.length);
  });

  it("has non-decreasing (year, month) as order increases", () => {
    let lastKey = -Infinity;
    for (const journey of journeys) {
      const key = journey.start.year * 12 + (journey.start.month ?? 0);
      expect(key).toBeGreaterThanOrEqual(lastKey);
      lastKey = key;
    }
  });

  it("has a real, valid month for every journey in this dataset", () => {
    for (const journey of journeys) {
      expect(isValidMonth(journey.start.month)).toBe(true);
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

  it("has a real travel mode for every leg — nothing left unresolved in this dataset", () => {
    for (const journey of journeys) {
      for (const stop of journey.stops) {
        expect(stop.travelModeFromPrevious).toBeDefined();
      }
      if (journey.returnToOrigin) {
        expect(journey.returnTravelMode).toBeDefined();
      }
    }
  });

  it("uses Southern California — never LAX, LA, or Los Angeles — as the regional origin label", () => {
    expect(SOUTHERN_CALIFORNIA.name).toBe("Southern California");
    expect(SOUTHERN_CALIFORNIA.id).toBe("southern-california");
    const allNames = journeys.flatMap((j) => [j.origin.name, ...j.stops.map((s) => s.location.name)]);
    expect(allNames).not.toContain("LAX");
    expect(allNames).not.toContain("LA");
    expect(allNames).not.toContain("Los Angeles");
    // Still uses the real LAX-area coordinate for map placement, per plan.md.
    expect(SOUTHERN_CALIFORNIA.lat).toBeCloseTo(33.9416);
    expect(SOUTHERN_CALIFORNIA.lng).toBeCloseTo(-118.4085);
  });

  it("begins with Southern California as the origin, traveling first to Kauai in December 2004", () => {
    const first = journeys[0];
    expect(first.origin.id).toBe(SOUTHERN_CALIFORNIA.id);
    expect(first.stops[0].location.name).toBe("Kauai");
    expect(first.start).toEqual({ year: 2004, month: 12 });
    expect(first.returnToOrigin).toBe(true);
  });

  it("visits Ensenada in July 2006, not as the first journey", () => {
    const ensenada = journeys.find((j) => j.id === "ensenada-2006")!;
    expect(ensenada.start).toEqual({ year: 2006, month: 7 });
    expect(ensenada.order).toBeGreaterThan(1);
  });

  it("orders Ljubljana before Salzburg within January 2022", () => {
    const ljubljana = journeys.find((j) => j.id === "ljubljana-2022")!;
    const salzburg = journeys.find((j) => j.id === "salzburg-2022")!;
    expect(ljubljana.start.year).toBe(2022);
    expect(ljubljana.start.month).toBe(1);
    expect(salzburg.start.year).toBe(2022);
    expect(salzburg.start.month).toBe(1);
    expect(ljubljana.order).toBeLessThan(salzburg.order);
    expect(ljubljana.start.sequence).toBeLessThan(salzburg.start.sequence!);
  });

  it("returns from Villach to Southern California before the Santa Barbara trip", () => {
    const villachReturn = journeys.find((j) => j.id === "villach-return-2022")!;
    const santaBarbara = journeys.find((j) => j.id === "santa-barbara-2022")!;
    expect(villachReturn.order).toBeLessThan(santaBarbara.order);
    expect(villachReturn.returnToOrigin).toBe(false);
    expect(villachReturn.stops[0].location.id).toBe(SOUTHERN_CALIFORNIA.id);
  });

  it("places Santa Barbara before the Southern California to Munich relocation", () => {
    const santaBarbara = journeys.find((j) => j.id === "santa-barbara-2022")!;
    const munichArrival = journeys.find((j) => j.id === "munich-arrival-2022")!;
    expect(santaBarbara.order).toBeLessThan(munichArrival.order);
  });

  it("supports temporary hubs for Villach, Munich, and San Francisco", () => {
    const villachHub = journeys.filter((j) => j.hubId === "villach");
    const munichHub = journeys.filter((j) => j.hubId === "munich");
    const sfHub = journeys.filter((j) => j.hubId === "san-francisco");
    expect(villachHub.length).toBeGreaterThan(0);
    expect(munichHub.length).toBeGreaterThan(0);
    expect(sfHub.length).toBeGreaterThan(0);
    expect(villachHub.every((j) => j.origin.id === "villach" || j.stops.some((s) => s.location.id === "villach"))).toBe(true);
  });

  it("does not treat the September 2025 Villach trip as a hub for other journeys", () => {
    const villach2025 = journeys.find((j) => j.id === "villach-2025")!;
    expect(villach2025.hubId).toBeUndefined();
    expect(villach2025.origin.id).toBe(SOUTHERN_CALIFORNIA.id);
    expect(villach2025.returnToOrigin).toBe(true);
  });

  it("marks exactly the one-way relocations/returns as non-returning journeys", () => {
    const oneWay = journeys.filter((j) => !j.returnToOrigin);
    expect(oneWay.map((j) => j.id)).toEqual([
      "villach-arrival-2021",
      "villach-return-2022",
      "munich-arrival-2022",
      "munich-return-2022",
      "socal-sf-2022",
      "sf-socal-2022",
    ]);
  });

  it("represents the multi-stop journeys as real ordered stops", () => {
    const europe2010 = journeys.find((j) => j.id === "europe-mediterranean-2010")!;
    expect(europe2010.stops.map((s) => s.location.name)).toEqual([
      "London", "Paris", "Rome", "Genoa", "Marseille", "Barcelona", "Tunis", "Malta", "Sicily", "Rome",
    ]);

    const taipeiJapan2023 = journeys.find((j) => j.id === "taipei-japan-2023")!;
    expect(taipeiJapan2023.stops.map((s) => s.location.name)).toEqual(["Taipei", "Tokyo", "Kyoto", "Osaka"]);
    expect(taipeiJapan2023.stops.map((s) => s.travelModeFromPrevious)).toEqual(["air", "air", "train", "train"]);

    const taipeiShenzhenShanghai2024 = journeys.find((j) => j.id === "taipei-shenzhen-shanghai-2024")!;
    expect(taipeiShenzhenShanghai2024.stops.map((s) => s.location.name)).toEqual(["Taipei", "Shenzhen", "Shanghai"]);

    const centralCoast2025 = journeys.find((j) => j.id === "central-coast-2025")!;
    expect(centralCoast2025.stops.map((s) => s.location.name)).toEqual([
      "San Simeon", "Atascadero", "Morro Bay", "Pismo Beach", "Solvang", "Santa Barbara",
    ]);
    expect(centralCoast2025.stops.every((s) => s.travelModeFromPrevious === "automotive")).toBe(true);
  });
});
