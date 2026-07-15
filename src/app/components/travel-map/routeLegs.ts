import type { Location, TravelMode } from "../../data/travelLocations";
import type { Journey } from "../../data/travelJourneys";

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

/**
 * Derives every animated route leg from the authored journey list. A journey's stops are
 * visited in order (origin -> stop 1 -> stop 2 -> ... -> last stop), and a return leg back
 * to the origin is generated *only* when `returnToOrigin` is true — never inferred or
 * defaulted. Journeys are otherwise independent: no synthetic "transition" leg is created
 * between one journey's end and the next journey's origin, even if they differ (e.g. the
 * next journey starting fresh from LAX after a Munich-based trip) — the animation layer
 * treats that origin as already-current rather than fabricating an untracked transition.
 */
export function buildRouteLegs(journeys: Journey[]): RouteLeg[] {
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

  return legs;
}
