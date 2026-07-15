import { LAX, type GeoPoint, type TravelMode } from "../../data/travelLocations";
import type { Trip } from "../../data/travelTrips";

export interface RouteLeg {
  id: string;
  /** Sequential animation order across the whole generated route. */
  order: number;
  origin: GeoPoint;
  destination: GeoPoint;
  travelMode?: TravelMode;
  direction: "outbound" | "return";
  /** True for one-way relocations (initial hub moves, or auto-inserted hub-exit transitions). */
  isRelocation: boolean;
  /** Which authored trip this leg belongs to. */
  tripId: string;
  label: string;
  year?: string;
}

/**
 * Derives every animated route leg from the authored trip list. Nothing here is
 * hand-duplicated: "roundtrip" trips produce an outbound + return leg pair, "move"
 * trips produce a single one-way leg, and whenever a trip's declared home base
 * differs from the currently-active one, a hub-transition leg is generated
 * automatically (this is what produces "Villach -> LAX" and "Munich -> LAX").
 */
export function buildRouteLegs(trips: Trip[]): RouteLeg[] {
  const legs: RouteLeg[] = [];
  let effectiveHub: GeoPoint = LAX;
  let order = 0;
  const nextOrder = () => ++order;

  for (const trip of trips) {
    if (trip.hub.id !== effectiveHub.id) {
      legs.push({
        id: `transition-${effectiveHub.id}-to-${trip.hub.id}-before-${trip.id}`,
        order: nextOrder(),
        origin: effectiveHub,
        destination: trip.hub,
        travelMode: undefined,
        direction: "outbound",
        isRelocation: true,
        tripId: trip.id,
        label:
          trip.hub.id === LAX.id
            ? `Returned to ${trip.hub.name}`
            : `Relocated to ${trip.hub.name}`,
        year: trip.year,
      });
      effectiveHub = trip.hub;
    }

    if (trip.kind === "move") {
      legs.push({
        id: `move-${trip.id}`,
        order: nextOrder(),
        origin: effectiveHub,
        destination: trip.destination,
        travelMode: trip.travelMode,
        direction: "outbound",
        isRelocation: true,
        tripId: trip.id,
        label: trip.caption ?? `Moved to ${trip.destination.name}`,
        year: trip.year,
      });
      effectiveHub = trip.destination;
      continue;
    }

    legs.push({
      id: `${trip.id}-out`,
      order: nextOrder(),
      origin: trip.hub,
      destination: trip.destination,
      travelMode: trip.travelMode,
      direction: "outbound",
      isRelocation: false,
      tripId: trip.id,
      label: trip.destination.name,
      year: trip.year,
    });
    legs.push({
      id: `${trip.id}-return`,
      order: nextOrder(),
      origin: trip.destination,
      destination: trip.hub,
      travelMode: trip.travelMode,
      direction: "return",
      isRelocation: false,
      tripId: trip.id,
      label: `Returned to ${trip.hub.name}`,
      year: trip.year,
    });
  }

  return legs;
}
