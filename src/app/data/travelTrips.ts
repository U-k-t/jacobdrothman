import { LAX, MUNICH, VILLACH, type GeoPoint, type TravelMode } from "./travelLocations";

/**
 * Real travel trips, sourced from the year-grouped list in `Travel.tsx`.
 * Ordered chronologically ascending (earliest visit first) — same 34 real
 * entries as before, unchanged order. Each trip is authored data; the
 * outbound/return route legs (and hub-transition legs) are *generated* from
 * this list by `routeLegs.ts`, not hand-duplicated here.
 *
 * Known simplifications (documented in plan.md — not fabricated data):
 * - Multi-city trips (e.g. "Tokyo, Kyoto & Osaka") get one marker at the first-named city.
 * - Cruise/region trips ("Mediterranean Cruise", "Caribbean Cruise", "Alaska Cruise",
 *   "Ireland (road trip)", "New England (college tour)") use a representative coordinate
 *   for the named region, since no specific single city was given.
 * - Order *within* a single year (notably 2022's 12 stops) follows the order already
 *   listed in `Travel.tsx`; the source doesn't specify day-level chronology.
 *
 * travelMode is only set where the source content already names it (cruise -> boat,
 * road trip -> automotive). Every other trip is left `undefined` ("not yet recorded")
 * rather than guessed — see plan.md for the full list of what's still unresolved.
 */

export interface Trip {
  /** Stable unique id. */
  id: string;
  /** 1-based chronological visit order. */
  order: number;
  destination: GeoPoint;
  /** Home base this trip departs from and returns to. */
  hub: GeoPoint;
  /** "roundtrip" = normal excursion (out + back). "move" = one-way relocation, no return leg. */
  kind: "roundtrip" | "move";
  travelMode?: TravelMode;
  year?: string;
  caption?: string;
}

export const trips: Trip[] = [
  { id: "ensenada-2006", order: 1, hub: LAX, kind: "roundtrip", year: "2006", destination: { id: "ensenada", name: "Ensenada", lat: 31.87, lng: -116.62 } },

  { id: "london-2010", order: 2, hub: LAX, kind: "roundtrip", year: "2010", destination: { id: "london", name: "London", lat: 51.51, lng: -0.13 } },
  { id: "paris-2010", order: 3, hub: LAX, kind: "roundtrip", year: "2010", destination: { id: "paris", name: "Paris", lat: 48.86, lng: 2.35 } },
  { id: "rome-2010", order: 4, hub: LAX, kind: "roundtrip", year: "2010", destination: { id: "rome", name: "Rome", lat: 41.9, lng: 12.5 } },
  { id: "med-cruise-2010", order: 5, hub: LAX, kind: "roundtrip", year: "2010", travelMode: "boat", caption: "Cruise", destination: { id: "med-cruise", name: "Mediterranean Cruise", lat: 38.0, lng: 15.0 } },

  { id: "caribbean-cruise-2013", order: 6, hub: LAX, kind: "roundtrip", year: "2013", travelMode: "boat", caption: "Cruise", destination: { id: "caribbean-cruise", name: "Caribbean Cruise", lat: 18.0, lng: -66.0 } },

  { id: "new-england-2014", order: 7, hub: LAX, kind: "roundtrip", year: "2014", caption: "College tour", destination: { id: "new-england", name: "New England", lat: 42.36, lng: -71.06 } },
  { id: "puerto-rico-2014", order: 8, hub: LAX, kind: "roundtrip", year: "2014", destination: { id: "puerto-rico", name: "Puerto Rico", lat: 18.22, lng: -66.59 } },
  { id: "caribbean-cruise-2014", order: 9, hub: LAX, kind: "roundtrip", year: "2014", travelMode: "boat", caption: "Cruise", destination: { id: "caribbean-cruise-b", name: "Caribbean Cruise", lat: 18.0, lng: -66.0 } },

  { id: "seattle-2015", order: 10, hub: LAX, kind: "roundtrip", year: "2015", destination: { id: "seattle", name: "Seattle", lat: 47.61, lng: -122.33 } },
  { id: "alaska-cruise-2015", order: 11, hub: LAX, kind: "roundtrip", year: "2015", travelMode: "boat", caption: "Cruise, with stops in Canada", destination: { id: "alaska-cruise", name: "Alaska Cruise", lat: 58.3, lng: -134.42 } },

  { id: "ireland-2016", order: 12, hub: LAX, kind: "roundtrip", year: "2016", travelMode: "automotive", caption: "Road trip", destination: { id: "ireland", name: "Ireland", lat: 53.35, lng: -6.26 } },

  { id: "villach-2021", order: 13, hub: LAX, kind: "move", year: "2021", caption: "Moved for work", destination: VILLACH },
  { id: "vienna-2021", order: 14, hub: VILLACH, kind: "roundtrip", year: "2021", destination: { id: "vienna", name: "Vienna", lat: 48.21, lng: 16.37 } },
  { id: "florence-2021", order: 15, hub: VILLACH, kind: "roundtrip", year: "2021", destination: { id: "florence", name: "Florence", lat: 43.77, lng: 11.26 } },

  { id: "ljubljana-2022", order: 16, hub: VILLACH, kind: "roundtrip", year: "2022", destination: { id: "ljubljana", name: "Ljubljana", lat: 46.06, lng: 14.51 } },
  { id: "venice-2022", order: 17, hub: VILLACH, kind: "roundtrip", year: "2022", destination: { id: "venice", name: "Venice", lat: 45.44, lng: 12.32 } },

  { id: "salzburg-2022", order: 18, hub: LAX, kind: "roundtrip", year: "2022", destination: { id: "salzburg", name: "Salzburg & Hallstatt", lat: 47.8, lng: 13.04 } },

  { id: "munich-2022", order: 19, hub: LAX, kind: "move", year: "2022", caption: "Moved for work", destination: MUNICH },
  { id: "madrid-2022", order: 20, hub: MUNICH, kind: "roundtrip", year: "2022", destination: { id: "madrid", name: "Madrid", lat: 40.42, lng: -3.7 } },
  { id: "amsterdam-2022", order: 21, hub: MUNICH, kind: "roundtrip", year: "2022", destination: { id: "amsterdam", name: "Amsterdam", lat: 52.37, lng: 4.9 } },
  { id: "berlin-2022", order: 22, hub: MUNICH, kind: "roundtrip", year: "2022", destination: { id: "berlin", name: "Berlin", lat: 52.52, lng: 13.4 } },
  { id: "turin-2022", order: 23, hub: MUNICH, kind: "roundtrip", year: "2022", destination: { id: "turin", name: "Turin", lat: 45.07, lng: 7.69 } },
  { id: "budapest-2022", order: 24, hub: MUNICH, kind: "roundtrip", year: "2022", destination: { id: "budapest", name: "Budapest", lat: 47.5, lng: 19.04 } },
  { id: "geneva-2022", order: 25, hub: MUNICH, kind: "roundtrip", year: "2022", destination: { id: "geneva", name: "Geneva & Lyon", lat: 46.2, lng: 6.14 } },
  { id: "barcelona-2022", order: 26, hub: MUNICH, kind: "roundtrip", year: "2022", destination: { id: "barcelona", name: "Barcelona", lat: 41.39, lng: 2.17 } },
  { id: "prague-2022", order: 27, hub: MUNICH, kind: "roundtrip", year: "2022", destination: { id: "prague", name: "Prague", lat: 50.09, lng: 14.42 } },

  { id: "taipei-2023", order: 28, hub: LAX, kind: "roundtrip", year: "2023", destination: { id: "taipei-2023", name: "Taipei", lat: 25.03, lng: 121.57 } },
  { id: "tokyo-2023", order: 29, hub: LAX, kind: "roundtrip", year: "2023", destination: { id: "tokyo", name: "Tokyo, Kyoto & Osaka", lat: 35.68, lng: 139.69 } },

  { id: "taipei-2024", order: 30, hub: LAX, kind: "roundtrip", year: "2024", destination: { id: "taipei-2024", name: "Taipei, Shenzhen & Shanghai", lat: 25.03, lng: 121.57 } },
  { id: "shanghai-2024", order: 31, hub: LAX, kind: "roundtrip", year: "2024", destination: { id: "shanghai", name: "Shanghai & Taipei", lat: 31.23, lng: 121.47 } },

  { id: "central-coast-2025", order: 32, hub: LAX, kind: "roundtrip", year: "2025", destination: { id: "central-coast", name: "California Central Coast", lat: 35.28, lng: -120.66 } },

  { id: "zurich-2026", order: 33, hub: LAX, kind: "roundtrip", year: "2026", destination: { id: "zurich", name: "Zurich", lat: 47.38, lng: 8.54 } },
  { id: "rome-2026", order: 34, hub: LAX, kind: "roundtrip", year: "2026", destination: { id: "rome-2026", name: "Rome", lat: 41.9, lng: 12.5 } },
];
