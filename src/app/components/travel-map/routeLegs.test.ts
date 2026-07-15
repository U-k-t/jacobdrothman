import { describe, expect, it } from "vitest";
import { LAX, MUNICH, VILLACH } from "../../data/travelLocations";
import { trips } from "../../data/travelTrips";
import { buildRouteLegs } from "./routeLegs";

describe("buildRouteLegs", () => {
  const legs = buildRouteLegs(trips);

  it("preserves chronological trip order across generated legs", () => {
    for (let i = 1; i < legs.length; i++) {
      expect(legs[i].order).toBeGreaterThan(legs[i - 1].order);
    }
    // Every trip id appears in the same relative order as `trips`.
    const tripIdOrderOfFirstAppearance = trips.map((t) => t.id);
    const seen = new Set<string>();
    const legTripOrder: string[] = [];
    for (const leg of legs) {
      if (!seen.has(leg.tripId)) {
        seen.add(leg.tripId);
        legTripOrder.push(leg.tripId);
      }
    }
    expect(legTripOrder).toEqual(tripIdOrderOfFirstAppearance);
  });

  it("defaults trips to LAX as origin and destination for a normal roundtrip", () => {
    const out = legs.find((l) => l.id === "ensenada-2006-out")!;
    const ret = legs.find((l) => l.id === "ensenada-2006-return")!;
    expect(out.origin.id).toBe(LAX.id);
    expect(out.destination.id).toBe("ensenada");
    expect(ret.origin.id).toBe("ensenada");
    expect(ret.destination.id).toBe(LAX.id);
  });

  it("uses Villach as the origin for the Vienna-through-Venice group", () => {
    for (const tripId of ["vienna-2021-out", "florence-2021-out", "ljubljana-2022-out", "venice-2022-out"]) {
      const leg = legs.find((l) => l.id === tripId)!;
      expect(leg.origin.id).toBe(VILLACH.id);
    }
    for (const tripId of ["vienna-2021-return", "florence-2021-return", "ljubljana-2022-return", "venice-2022-return"]) {
      const leg = legs.find((l) => l.id === tripId)!;
      expect(leg.destination.id).toBe(VILLACH.id);
    }
  });

  it("returns from Villach to LAX before the next non-Villach trip", () => {
    const venetoReturnIndex = legs.findIndex((l) => l.id === "venice-2022-return");
    const transitionIndex = legs.findIndex(
      (l) => l.isRelocation && l.origin.id === VILLACH.id && l.destination.id === LAX.id,
    );
    const salzburgOutIndex = legs.findIndex((l) => l.id === "salzburg-2022-out");

    expect(transitionIndex).toBeGreaterThan(venetoReturnIndex);
    expect(salzburgOutIndex).toBeGreaterThan(transitionIndex);

    const salzburgOut = legs[salzburgOutIndex];
    expect(salzburgOut.origin.id).toBe(LAX.id);
  });

  it("uses Munich as the origin for the Madrid-through-Prague group", () => {
    for (const tripId of [
      "madrid-2022-out",
      "amsterdam-2022-out",
      "berlin-2022-out",
      "turin-2022-out",
      "budapest-2022-out",
      "geneva-2022-out",
      "barcelona-2022-out",
      "prague-2022-out",
    ]) {
      const leg = legs.find((l) => l.id === tripId)!;
      expect(leg.origin.id).toBe(MUNICH.id);
    }
  });

  it("returns from Munich to LAX after the group completes", () => {
    const pragueReturnIndex = legs.findIndex((l) => l.id === "prague-2022-return");
    const transitionIndex = legs.findIndex(
      (l) => l.isRelocation && l.origin.id === MUNICH.id && l.destination.id === LAX.id,
    );
    const taipeiOutIndex = legs.findIndex((l) => l.id === "taipei-2023-out");

    expect(transitionIndex).toBeGreaterThan(pragueReturnIndex);
    expect(taipeiOutIndex).toBeGreaterThan(transitionIndex);
    expect(legs[taipeiOutIndex].origin.id).toBe(LAX.id);
  });

  it("models the initial relocations as one-way legs with no return", () => {
    const villachMove = legs.find((l) => l.id === "move-villach-2021")!;
    expect(villachMove.origin.id).toBe(LAX.id);
    expect(villachMove.destination.id).toBe(VILLACH.id);
    expect(legs.some((l) => l.id === "move-villach-2021-return")).toBe(false);

    const munichMove = legs.find((l) => l.id === "move-munich-2022")!;
    expect(munichMove.origin.id).toBe(LAX.id);
    expect(munichMove.destination.id).toBe(MUNICH.id);
  });

  it("does not duplicate return legs for a single roundtrip trip", () => {
    const returnsForVenice = legs.filter((l) => l.tripId === "venice-2022" && l.direction === "return");
    expect(returnsForVenice).toHaveLength(1);
  });

  it("carries the known travel modes through unchanged and leaves the rest unresolved", () => {
    const cruiseOut = legs.find((l) => l.id === "med-cruise-2010-out")!;
    expect(cruiseOut.travelMode).toBe("boat");

    const roadTripOut = legs.find((l) => l.id === "ireland-2016-out")!;
    expect(roadTripOut.travelMode).toBe("automotive");

    const londonOut = legs.find((l) => l.id === "london-2010-out")!;
    expect(londonOut.travelMode).toBeUndefined();
  });

  it("handles an empty trip list safely", () => {
    expect(buildRouteLegs([])).toEqual([]);
  });
});
