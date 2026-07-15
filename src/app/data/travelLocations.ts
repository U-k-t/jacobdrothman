export interface GeoPoint {
  id: string;
  name: string;
  lat: number;
  lng: number;
}

/** Known transportation modes. `undefined` on a trip/leg means "not yet recorded" — never guessed. */
export type TravelMode = "automotive" | "train" | "boat" | "air";

/**
 * Reusable home-base points. Southern California trips use LAX as a stand-in for the
 * general SoCal area (including San Diego-origin travel, which isn't modeled separately
 * at this visual scale) — see plan.md.
 */
export const LAX: GeoPoint = { id: "lax", name: "Los Angeles (LAX)", lat: 33.9416, lng: -118.4085 };
export const VILLACH: GeoPoint = { id: "villach", name: "Villach", lat: 46.61, lng: 13.85 };
export const MUNICH: GeoPoint = { id: "munich", name: "Munich", lat: 48.14, lng: 11.58 };
