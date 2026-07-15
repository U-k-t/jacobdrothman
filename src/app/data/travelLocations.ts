export interface Location {
  id: string;
  name: string;
  country: string;
  lat: number;
  lng: number;
}

/** Known transportation modes. `undefined` on a leg means "not yet recorded" — never guessed. */
export type TravelMode = "automotive" | "train" | "boat" | "air";

/**
 * Reusable home-base points. Southern California trips use LAX as a stand-in for the
 * general SoCal area (including San Diego-origin travel, which isn't modeled separately
 * at this visual scale) — see plan.md.
 */
export const LAX: Location = {
  id: "lax",
  name: "Los Angeles",
  country: "United States",
  lat: 33.9416,
  lng: -118.4085,
};
export const VILLACH: Location = {
  id: "villach",
  name: "Villach",
  country: "Austria",
  lat: 46.61,
  lng: 13.85,
};
export const MUNICH: Location = {
  id: "munich",
  name: "Munich",
  country: "Germany",
  lat: 48.14,
  lng: 11.58,
};
