import { describe, expect, it } from "vitest";
import { MUNICH, SAN_FRANCISCO, SOUTHERN_CALIFORNIA, VILLACH, type Location } from "../../data/travelLocations";
import { journeys, type Journey } from "../../data/travelJourneys";
import { buildRouteLegs, validateJourneys } from "./routeLegs";

const TAIPEI: Location = { id: "taipei", name: "Taipei", country: "Taiwan", lat: 25.03, lng: 121.57 };
const SHENZHEN: Location = { id: "shenzhen", name: "Shenzhen", country: "China", lat: 22.54, lng: 114.06 };
const SHANGHAI: Location = { id: "shanghai", name: "Shanghai", country: "China", lat: 31.23, lng: 121.47 };

describe("buildRouteLegs — real dataset", () => {
  const legs = buildRouteLegs(journeys);

  it("preserves chronological journey order across generated legs", () => {
    for (let i = 1; i < legs.length; i++) {
      expect(legs[i].order).toBeGreaterThan(legs[i - 1].order);
    }
    const journeyIdOrderOfFirstAppearance = journeys.map((j) => j.id);
    const seen = new Set<string>();
    const legJourneyOrder: string[] = [];
    for (const leg of legs) {
      if (!seen.has(leg.journeyId)) {
        seen.add(leg.journeyId);
        legJourneyOrder.push(leg.journeyId);
      }
    }
    expect(legJourneyOrder).toEqual(journeyIdOrderOfFirstAppearance);
  });

  it("generates Southern California -> Kauai -> Southern California as the very first journey", () => {
    const out = legs.find((l) => l.journeyId === "kauai-2004" && l.direction === "outbound")!;
    const ret = legs.find((l) => l.journeyId === "kauai-2004" && l.direction === "return")!;
    expect(out.origin.id).toBe(SOUTHERN_CALIFORNIA.id);
    expect(out.destination.id).toBe("kauai");
    expect(ret.origin.id).toBe("kauai");
    expect(ret.destination.id).toBe(SOUTHERN_CALIFORNIA.id);
  });

  it("generates the multi-stop Southern California -> Taipei -> Shenzhen -> Shanghai -> Southern California journey in order, without a mid-trip return", () => {
    const journeyLegs = legs.filter((l) => l.journeyId === "taipei-shenzhen-shanghai-2024");
    expect(journeyLegs.map((l) => `${l.origin.name}->${l.destination.name}`)).toEqual([
      "Southern California->Taipei",
      "Taipei->Shenzhen",
      "Shenzhen->Shanghai",
      "Shanghai->Southern California",
    ]);
    const returns = journeyLegs.filter((l) => l.direction === "return");
    expect(returns).toHaveLength(1);
  });

  it("does not return to Southern California between the April 2010 European stops", () => {
    const journeyLegs = legs.filter((l) => l.journeyId === "europe-mediterranean-2010");
    const midTripReturns = journeyLegs.slice(0, -1).filter((l) => l.destination.id === SOUTHERN_CALIFORNIA.id);
    expect(midTripReturns).toHaveLength(0);
    expect(journeyLegs[journeyLegs.length - 1].destination.id).toBe(SOUTHERN_CALIFORNIA.id);
  });

  it("uses air and train modes correctly for the November 2023 Taipei/Japan journey", () => {
    const journeyLegs = legs.filter((l) => l.journeyId === "taipei-japan-2023" && l.direction === "outbound");
    expect(journeyLegs.map((l) => l.travelMode)).toEqual(["air", "air", "train", "train"]);
  });

  it("preserves all stops in order for the December 2025 Central Coast road trip", () => {
    const journeyLegs = legs.filter((l) => l.journeyId === "central-coast-2025" && l.direction === "outbound");
    expect(journeyLegs.map((l) => l.destination.name)).toEqual([
      "San Simeon", "Atascadero", "Morro Bay", "Pismo Beach", "Solvang", "Santa Barbara",
    ]);
    expect(journeyLegs.every((l) => l.travelMode === "automotive")).toBe(true);
  });

  it("uses Villach as the origin for its round-trip journeys", () => {
    for (const journeyId of ["vienna-2021", "florence-2021", "ljubljana-2022", "salzburg-2022", "venice-2022"]) {
      const outLeg = legs.find((l) => l.journeyId === journeyId && l.direction === "outbound")!;
      const returnLeg = legs.find((l) => l.journeyId === journeyId && l.direction === "return")!;
      expect(outLeg.origin.id).toBe(VILLACH.id);
      expect(returnLeg.destination.id).toBe(VILLACH.id);
    }
  });

  it("uses Munich as the origin for its round-trip journeys", () => {
    for (const journeyId of ["madrid-2022", "prague-2022"]) {
      const outLeg = legs.find((l) => l.journeyId === journeyId && l.direction === "outbound")!;
      expect(outLeg.origin.id).toBe(MUNICH.id);
    }
  });

  it("uses San Francisco as the origin for the Durham round trip", () => {
    const outLeg = legs.find((l) => l.journeyId === "durham-2022" && l.direction === "outbound")!;
    const returnLeg = legs.find((l) => l.journeyId === "durham-2022" && l.direction === "return")!;
    expect(outLeg.origin.id).toBe(SAN_FRANCISCO.id);
    expect(returnLeg.destination.id).toBe(SAN_FRANCISCO.id);
  });

  it("does not invent a return leg for the one-way relocation/return journeys", () => {
    const villachMove = legs.filter((l) => l.journeyId === "villach-arrival-2021");
    expect(villachMove).toHaveLength(1);
    expect(villachMove[0].origin.id).toBe(SOUTHERN_CALIFORNIA.id);
    expect(villachMove[0].destination.id).toBe(VILLACH.id);
    expect(villachMove[0].isRelocation).toBe(true);

    const munichMove = legs.filter((l) => l.journeyId === "munich-arrival-2022");
    expect(munichMove).toHaveLength(1);
    expect(munichMove[0].destination.id).toBe(MUNICH.id);

    const villachReturn = legs.filter((l) => l.journeyId === "villach-return-2022");
    expect(villachReturn).toHaveLength(1);
    expect(villachReturn[0].destination.id).toBe(SOUTHERN_CALIFORNIA.id);
  });

  it("carries every leg's real travel mode through unchanged", () => {
    const cruiseOut = legs.find((l) => l.journeyId === "orlando-caribbean-2013" && l.direction === "outbound")!;
    expect(cruiseOut.travelMode).toBe("air");
    const cruiseLeg = legs.find((l) => l.journeyId === "orlando-caribbean-2013" && l.destination.id === "british-virgin-islands")!;
    expect(cruiseLeg.travelMode).toBe("boat");

    const roadTripLeg = legs.find((l) => l.journeyId === "ireland-2016" && l.destination.id === "galway")!;
    expect(roadTripLeg.travelMode).toBe("automotive");
  });

  it("gives every generated leg a defined travel mode", () => {
    for (const leg of legs) {
      expect(leg.travelMode).toBeDefined();
    }
  });

  it("does not create a synthetic hub-transition leg between journeys", () => {
    const journeyIds = new Set(journeys.map((j) => j.id));
    for (const leg of legs) {
      expect(journeyIds.has(leg.journeyId)).toBe(true);
    }
  });

  it("never generates a leg whose origin and destination are identical", () => {
    for (const leg of legs) {
      expect(leg.origin.id).not.toBe(leg.destination.id);
    }
  });

  it("passes validation with no errors", () => {
    expect(validateJourneys(journeys)).toEqual([]);
  });

  it("handles an empty journey list safely", () => {
    expect(buildRouteLegs([])).toEqual([]);
  });
});

describe("buildRouteLegs — synthetic journeys", () => {
  it("supports different travel modes for different legs within the same journey", () => {
    const journey: Journey = {
      id: "mixed-mode-journey",
      order: 1,
      origin: SOUTHERN_CALIFORNIA,
      start: { year: 2019, month: 1 },
      returnToOrigin: true,
      returnTravelMode: "air",
      stops: [
        { location: TAIPEI, travelModeFromPrevious: "air" },
        { location: SHENZHEN, travelModeFromPrevious: "train" },
        { location: SHANGHAI, travelModeFromPrevious: "automotive" },
      ],
    };

    const legs = buildRouteLegs([journey]);
    expect(legs.map((l) => l.travelMode)).toEqual(["air", "train", "automotive", "air"]);
  });

  it("ends at the last stop without a return leg when returnToOrigin is false", () => {
    const journey: Journey = {
      id: "one-way",
      order: 1,
      origin: SOUTHERN_CALIFORNIA,
      start: { year: 2019, month: 1 },
      returnToOrigin: false,
      stops: [{ location: TAIPEI, travelModeFromPrevious: "air" }],
    };

    const legs = buildRouteLegs([journey]);
    expect(legs).toHaveLength(1);
    expect(legs[0].destination.id).toBe(TAIPEI.id);
  });

  it("throws a detailed error instead of silently skipping invalid journeys", () => {
    const badJourney = {
      id: "bad",
      order: 1,
      origin: SOUTHERN_CALIFORNIA,
      start: { year: 2019, month: 1 },
      returnToOrigin: true,
      // Missing returnTravelMode and stops[].travelModeFromPrevious on purpose.
      stops: [{ location: TAIPEI }],
    } as unknown as Journey;

    expect(() => buildRouteLegs([badJourney])).toThrow(/missing travel mode/i);
  });

  it("flags a leg whose origin and destination are identical", () => {
    const journey: Journey = {
      id: "self-loop",
      order: 1,
      origin: SOUTHERN_CALIFORNIA,
      start: { year: 2019, month: 1 },
      returnToOrigin: false,
      stops: [{ location: SOUTHERN_CALIFORNIA, travelModeFromPrevious: "air" }],
    };

    expect(() => buildRouteLegs([journey])).toThrow(/identical/i);
  });

  it("flags an out-of-chronological-order journey list", () => {
    const later: Journey = {
      id: "later",
      order: 1,
      origin: SOUTHERN_CALIFORNIA,
      start: { year: 2020, month: 1 },
      returnToOrigin: false,
      stops: [{ location: TAIPEI, travelModeFromPrevious: "air" }],
    };
    const earlier: Journey = {
      id: "earlier",
      order: 2,
      origin: SOUTHERN_CALIFORNIA,
      start: { year: 2010, month: 1 },
      returnToOrigin: false,
      stops: [{ location: SHENZHEN, travelModeFromPrevious: "air" }],
    };

    expect(validateJourneys([later, earlier]).some((e) => /chronological order/.test(e))).toBe(true);
  });

  it("flags a journey with an empty stop list", () => {
    const journey = {
      id: "empty",
      order: 1,
      origin: SOUTHERN_CALIFORNIA,
      start: { year: 2019, month: 1 },
      returnToOrigin: false,
      stops: [],
    } as Journey;

    expect(validateJourneys([journey]).some((e) => /no stops/.test(e))).toBe(true);
  });
});
