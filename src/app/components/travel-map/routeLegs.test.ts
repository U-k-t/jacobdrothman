import { describe, expect, it } from "vitest";
import { LAX, MUNICH, VILLACH, type Location } from "../../data/travelLocations";
import { journeys, type Journey } from "../../data/travelJourneys";
import { buildRouteLegs } from "./routeLegs";

const ENSENADA: Location = { id: "ensenada", name: "Ensenada", country: "Mexico", lat: 31.87, lng: -116.62 };
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

  it("generates LAX -> Ensenada -> LAX as the very first journey", () => {
    const out = legs.find((l) => l.journeyId === "ensenada-2006" && l.direction === "outbound")!;
    const ret = legs.find((l) => l.journeyId === "ensenada-2006" && l.direction === "return")!;
    expect(out.origin.id).toBe(LAX.id);
    expect(out.destination.id).toBe("ensenada");
    expect(ret.origin.id).toBe("ensenada");
    expect(ret.destination.id).toBe(LAX.id);
  });

  it("generates the multi-stop LAX -> Taipei -> Shenzhen -> Shanghai -> LAX journey in order", () => {
    const journeyLegs = legs.filter((l) => l.journeyId === "taipei-2024");
    expect(journeyLegs.map((l) => `${l.origin.name}->${l.destination.name}`)).toEqual([
      "Los Angeles->Taipei",
      "Taipei->Shenzhen",
      "Shenzhen->Shanghai",
      "Shanghai->Los Angeles",
    ]);
  });

  it("does not insert an automatic return leg between Taipei, Shenzhen, and Shanghai", () => {
    const journeyLegs = legs.filter((l) => l.journeyId === "taipei-2024");
    const returns = journeyLegs.filter((l) => l.direction === "return");
    expect(returns).toHaveLength(1);
    expect(returns[0].destination.id).toBe(LAX.id);
  });

  it("uses Villach as the origin for its round-trip journeys", () => {
    for (const journeyId of ["vienna-2021", "florence-2021", "ljubljana-2022", "venice-2022"]) {
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

  it("does not invent a return leg for the one-way relocation journeys", () => {
    const villachMove = legs.filter((l) => l.journeyId === "villach-2021");
    expect(villachMove).toHaveLength(1);
    expect(villachMove[0].origin.id).toBe(LAX.id);
    expect(villachMove[0].destination.id).toBe(VILLACH.id);
    expect(villachMove[0].isRelocation).toBe(true);

    const munichMove = legs.filter((l) => l.journeyId === "munich-2022");
    expect(munichMove).toHaveLength(1);
    expect(munichMove[0].destination.id).toBe(MUNICH.id);
  });

  it("carries the known travel modes through unchanged and leaves the rest unresolved", () => {
    const cruiseOut = legs.find((l) => l.journeyId === "med-cruise-2010" && l.direction === "outbound")!;
    expect(cruiseOut.travelMode).toBe("boat");

    const roadTripOut = legs.find((l) => l.journeyId === "ireland-2016" && l.direction === "outbound")!;
    expect(roadTripOut.travelMode).toBe("automotive");

    const londonOut = legs.find((l) => l.journeyId === "london-2010" && l.direction === "outbound")!;
    expect(londonOut.travelMode).toBeUndefined();
  });

  it("does not create a synthetic hub-transition leg between journeys", () => {
    // No leg should exist whose origin/destination pair isn't part of some journey's own
    // origin -> stops -> (return) chain — i.e. every leg's journeyId must be a real journey.
    const journeyIds = new Set(journeys.map((j) => j.id));
    for (const leg of legs) {
      expect(journeyIds.has(leg.journeyId)).toBe(true);
    }
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
      origin: LAX,
      start: { year: 2019 },
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
      origin: LAX,
      start: { year: 2019 },
      returnToOrigin: false,
      stops: [{ location: TAIPEI }],
    };

    const legs = buildRouteLegs([journey]);
    expect(legs).toHaveLength(1);
    expect(legs[0].destination.id).toBe(TAIPEI.id);
  });
});
