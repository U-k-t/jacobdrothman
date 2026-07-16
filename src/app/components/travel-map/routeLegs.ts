import type { Location, TravelMode } from "../../data/travelLocations";
import type { Journey } from "../../data/travelJourneys";
import { isValidMonth } from "./timing";

export interface RouteLeg {
  id: string;
  /** Sequential animation order across the whole generated route. */
  order: number;
  origin: Location;
  destination: Location;
  travelMode?: TravelMode;
  direction: "outbound" | "return";
  /** True only for the final leg of a journey that does not return to its origin. */
  isRelocation: boolean;
  /** Which authored journey this leg belongs to. */
  journeyId: string;
  label: string;
  month?: number;
  year: number;
}

const VALID_TRAVEL_MODES: readonly TravelMode[] = ["automotive", "train", "boat", "air"];

function isValidCoordinate(location: Location): boolean {
  return (
    typeof location.lat === "number" &&
    location.lat >= -90 &&
    location.lat <= 90 &&
    typeof location.lng === "number" &&
    location.lng >= -180 &&
    location.lng <= 180
  );
}

function journeySortKey(journey: Journey): number {
  const month = isValidMonth(journey.start.month) ? journey.start.month : 0;
  return journey.start.year * 12 + month;
}

/**
 * Validates the authored journey list *before* any legs are generated. Returns a list of
 * human-readable problems instead of throwing directly, so callers can report everything wrong
 * at once rather than fixing errors one at a time.
 */
export function validateJourneys(journeys: Journey[]): string[] {
  const errors: string[] = [];
  const seenJourneyIds = new Set<string>();
  const locationsById = new Map<string, Location>();

  journeys.forEach((journey, index) => {
    const where = `journey[${index}] (id: "${journey.id}")`;

    if (!journey.id) {
      errors.push(`${where}: missing id.`);
    } else if (seenJourneyIds.has(journey.id)) {
      errors.push(`${where}: duplicate journey id "${journey.id}".`);
    } else {
      seenJourneyIds.add(journey.id);
    }

    if (!journey.origin) {
      errors.push(`${where}: missing origin location.`);
    }

    if (!Number.isInteger(journey.start.year) || journey.start.year < 1900) {
      errors.push(`${where}: invalid year "${journey.start.year}".`);
    }
    if (journey.start.month !== undefined && !isValidMonth(journey.start.month)) {
      errors.push(`${where}: invalid month "${journey.start.month}" (must be 1-12).`);
    }

    if (typeof journey.returnToOrigin !== "boolean") {
      errors.push(`${where}: returnToOrigin must be an explicit boolean.`);
    }

    if (!journey.stops || journey.stops.length === 0) {
      errors.push(`${where}: journey has no stops.`);
    }

    if (journey.returnToOrigin && journey.returnTravelMode === undefined) {
      errors.push(`${where}: returnToOrigin is true but returnTravelMode is missing.`);
    }
    if (journey.returnToOrigin && journey.returnTravelMode !== undefined && !VALID_TRAVEL_MODES.includes(journey.returnTravelMode)) {
      errors.push(`${where}: unsupported returnTravelMode "${journey.returnTravelMode}".`);
    }

    for (const [stopIndex, stop] of (journey.stops ?? []).entries()) {
      const stopWhere = `${where} stop[${stopIndex}]`;
      if (!stop.location) {
        errors.push(`${stopWhere}: missing location.`);
        continue;
      }
      if (!stop.location.name || !stop.location.country) {
        errors.push(`${stopWhere}: location "${stop.location.id}" is missing a name or country.`);
      }
      if (!isValidCoordinate(stop.location)) {
        errors.push(`${stopWhere}: location "${stop.location.id}" has invalid coordinates.`);
      }
      if (stop.travelModeFromPrevious === undefined) {
        errors.push(`${stopWhere}: missing travel mode.`);
      } else if (!VALID_TRAVEL_MODES.includes(stop.travelModeFromPrevious)) {
        errors.push(`${stopWhere}: unsupported travel mode "${stop.travelModeFromPrevious}".`);
      }
      if (stop.month !== undefined && !isValidMonth(stop.month)) {
        errors.push(`${stopWhere}: invalid month "${stop.month}" (must be 1-12).`);
      }

      const existing = locationsById.get(stop.location.id);
      if (existing && (existing.lat !== stop.location.lat || existing.lng !== stop.location.lng || existing.name !== stop.location.name)) {
        errors.push(`${stopWhere}: location id "${stop.location.id}" reused with conflicting data.`);
      } else if (!existing) {
        locationsById.set(stop.location.id, stop.location);
      }
    }
  });

  for (let i = 1; i < journeys.length; i++) {
    if (journeySortKey(journeys[i]) < journeySortKey(journeys[i - 1])) {
      errors.push(
        `journey[${i}] (id: "${journeys[i].id}") is out of chronological order relative to journey[${i - 1}] (id: "${journeys[i - 1].id}").`,
      );
    }
  }

  const sameMonthGroups = new Map<string, { journey: Journey; index: number }[]>();
  journeys.forEach((journey, index) => {
    const key = `${journey.start.year}-${journey.start.month ?? "?"}`;
    const group = sameMonthGroups.get(key) ?? [];
    group.push({ journey, index });
    sameMonthGroups.set(key, group);
  });
  for (const group of sameMonthGroups.values()) {
    if (group.length < 2) continue;
    const withSequence = group.filter((entry) => entry.journey.start.sequence !== undefined);
    for (let i = 1; i < withSequence.length; i++) {
      const prev = withSequence[i - 1];
      const curr = withSequence[i];
      if ((curr.journey.start.sequence as number) <= (prev.journey.start.sequence as number)) {
        errors.push(
          `journey "${curr.journey.id}" has a sequence value that doesn't increase after journey "${prev.journey.id}" within the same month.`,
        );
      }
    }
  }

  return errors;
}

/**
 * Derives every animated route leg from the authored journey list. A journey's stops are
 * visited in order (origin -> stop 1 -> stop 2 -> ... -> last stop), and a return leg back
 * to the origin is generated *only* when `returnToOrigin` is true — never inferred or
 * defaulted. Journeys are otherwise independent: no synthetic "transition" leg is created
 * between one journey's end and the next journey's origin, even if they differ — the
 * animation layer treats that origin as already-current rather than fabricating an
 * untracked transition.
 *
 * Validates the input first and throws a single, detailed error if anything is wrong —
 * invalid journeys are never silently skipped.
 */
export function buildRouteLegs(journeys: Journey[]): RouteLeg[] {
  const journeyErrors = validateJourneys(journeys);
  if (journeyErrors.length > 0) {
    throw new Error(`Invalid travel journey data:\n${journeyErrors.map((e) => `- ${e}`).join("\n")}`);
  }

  const legs: RouteLeg[] = [];
  let order = 0;
  const nextOrder = () => ++order;

  for (const journey of journeys) {
    const isOneWay = !journey.returnToOrigin;
    let previous: Location = journey.origin;

    journey.stops.forEach((stop, index) => {
      const isLastStop = index === journey.stops.length - 1;
      legs.push({
        id: `${journey.id}-leg-${index}`,
        order: nextOrder(),
        origin: previous,
        destination: stop.location,
        travelMode: stop.travelModeFromPrevious,
        direction: "outbound",
        isRelocation: isOneWay && isLastStop,
        journeyId: journey.id,
        label: stop.location.name,
        month: stop.month ?? journey.start.month,
        year: stop.year ?? journey.start.year,
      });
      previous = stop.location;
    });

    if (journey.returnToOrigin) {
      legs.push({
        id: `${journey.id}-return`,
        order: nextOrder(),
        origin: previous,
        destination: journey.origin,
        travelMode: journey.returnTravelMode,
        direction: "return",
        isRelocation: false,
        journeyId: journey.id,
        label: `Returned to ${journey.origin.name}`,
        month: journey.start.month,
        year: journey.start.year,
      });
    }
  }

  const legErrors: string[] = [];
  legs.forEach((leg, index) => {
    if (leg.origin.id === leg.destination.id) {
      legErrors.push(`leg[${index}] (id: "${leg.id}"): origin and destination are identical ("${leg.origin.id}").`);
    }
  });
  if (legErrors.length > 0) {
    throw new Error(`Invalid generated route legs:\n${legErrors.map((e) => `- ${e}`).join("\n")}`);
  }

  return legs;
}
