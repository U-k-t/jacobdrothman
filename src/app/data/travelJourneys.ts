import { LAX, MUNICH, VILLACH, type Location, type TravelMode } from "./travelLocations";

/**
 * Real travel journeys, sourced from the year-grouped list in `Travel.tsx`.
 * Ordered chronologically ascending (earliest visit first) — same 34 real
 * entries as the previous trip-based model, nothing added, removed, or
 * reordered. Route legs are *generated* from this list by `routeLegs.ts`,
 * not hand-duplicated here.
 *
 * Known simplifications (documented in plan.md — not fabricated data):
 * - Cruise/region journeys ("Mediterranean Cruise", "Caribbean Cruise", "Alaska Cruise",
 *   "Ireland (road trip)", "New England (college tour)") use a representative coordinate
 *   for the named region, since no specific single city was given.
 * - Order *within* a single year (notably 2022's 12 journeys) follows the order already
 *   listed in `Travel.tsx`; the source doesn't specify day-level chronology.
 *
 * Dates: every journey currently has only a `year` — no month has ever been recorded in
 * the source content. `start.month` is left `undefined` throughout rather than guessed;
 * see `timing.ts`'s documented fallback for how pacing/sorting treats a missing month.
 *
 * travelMode is only set where the source content already names it (cruise -> boat,
 * road trip -> automotive). Every other leg is left `undefined` ("not yet recorded")
 * rather than guessed — see plan.md for the full list of what's still unresolved.
 */

export interface JourneyStop {
  location: Location;
  /** Mode used to travel from the previous point (the origin, or the prior stop) to this one. */
  travelModeFromPrevious?: TravelMode;
  /** Only set when a specific stop's date is individually known (rare — see plan.md). */
  month?: number;
  year?: number;
}

export interface Journey {
  /** Stable unique id. */
  id: string;
  /** 1-based chronological visit order. */
  order: number;
  origin: Location;
  start: {
    /** 1–12. Left `undefined` when the source data only records a year — never guessed. */
    month?: number;
    year: number;
  };
  /** One or more ordered stops after the origin. */
  stops: JourneyStop[];
  /**
   * Required (never optional/defaulted) so a return leg is only ever generated when the
   * journey definition explicitly says the traveler returned to the origin.
   */
  returnToOrigin: boolean;
  /** Mode for the final stop -> origin leg. Only meaningful when returnToOrigin is true. */
  returnTravelMode?: TravelMode;
  /** Descriptive only — which temporary hub era this journey belongs to, if any. */
  hubId?: "villach" | "munich";
  caption?: string;
}

export const journeys: Journey[] = [
  {
    id: "ensenada-2006",
    order: 1,
    origin: LAX,
    start: { year: 2006 },
    returnToOrigin: true,
    stops: [{ location: { id: "ensenada", name: "Ensenada", country: "Mexico", lat: 31.87, lng: -116.62 } }],
  },

  {
    id: "london-2010",
    order: 2,
    origin: LAX,
    start: { year: 2010 },
    returnToOrigin: true,
    stops: [{ location: { id: "london", name: "London", country: "United Kingdom", lat: 51.51, lng: -0.13 } }],
  },
  {
    id: "paris-2010",
    order: 3,
    origin: LAX,
    start: { year: 2010 },
    returnToOrigin: true,
    stops: [{ location: { id: "paris", name: "Paris", country: "France", lat: 48.86, lng: 2.35 } }],
  },
  {
    id: "rome-2010",
    order: 4,
    origin: LAX,
    start: { year: 2010 },
    returnToOrigin: true,
    stops: [{ location: { id: "rome", name: "Rome", country: "Italy", lat: 41.9, lng: 12.5 } }],
  },
  {
    id: "med-cruise-2010",
    order: 5,
    origin: LAX,
    start: { year: 2010 },
    returnToOrigin: true,
    returnTravelMode: "boat",
    caption: "Cruise",
    stops: [
      {
        location: { id: "med-cruise", name: "Mediterranean Cruise", country: "Mediterranean", lat: 38.0, lng: 15.0 },
        travelModeFromPrevious: "boat",
      },
    ],
  },

  {
    id: "caribbean-cruise-2013",
    order: 6,
    origin: LAX,
    start: { year: 2013 },
    returnToOrigin: true,
    returnTravelMode: "boat",
    caption: "Cruise",
    stops: [
      {
        location: { id: "caribbean-cruise", name: "Caribbean Cruise", country: "Caribbean", lat: 18.0, lng: -66.0 },
        travelModeFromPrevious: "boat",
      },
    ],
  },

  {
    id: "new-england-2014",
    order: 7,
    origin: LAX,
    start: { year: 2014 },
    returnToOrigin: true,
    caption: "College tour",
    stops: [{ location: { id: "new-england", name: "New England", country: "United States", lat: 42.36, lng: -71.06 } }],
  },
  {
    id: "puerto-rico-2014",
    order: 8,
    origin: LAX,
    start: { year: 2014 },
    returnToOrigin: true,
    stops: [{ location: { id: "puerto-rico", name: "Puerto Rico", country: "United States", lat: 18.22, lng: -66.59 } }],
  },
  {
    id: "caribbean-cruise-2014",
    order: 9,
    origin: LAX,
    start: { year: 2014 },
    returnToOrigin: true,
    returnTravelMode: "boat",
    caption: "Cruise",
    stops: [
      {
        location: { id: "caribbean-cruise-b", name: "Caribbean Cruise", country: "Caribbean", lat: 18.0, lng: -66.0 },
        travelModeFromPrevious: "boat",
      },
    ],
  },

  {
    id: "seattle-2015",
    order: 10,
    origin: LAX,
    start: { year: 2015 },
    returnToOrigin: true,
    stops: [{ location: { id: "seattle", name: "Seattle", country: "United States", lat: 47.61, lng: -122.33 } }],
  },
  {
    id: "alaska-cruise-2015",
    order: 11,
    origin: LAX,
    start: { year: 2015 },
    returnToOrigin: true,
    returnTravelMode: "boat",
    caption: "Cruise, with stops in Canada",
    stops: [
      {
        location: { id: "alaska-cruise", name: "Alaska Cruise", country: "United States / Canada", lat: 58.3, lng: -134.42 },
        travelModeFromPrevious: "boat",
      },
    ],
  },

  {
    id: "ireland-2016",
    order: 12,
    origin: LAX,
    start: { year: 2016 },
    returnToOrigin: true,
    returnTravelMode: "automotive",
    caption: "Road trip",
    stops: [
      {
        location: { id: "ireland", name: "Ireland", country: "Ireland", lat: 53.35, lng: -6.26 },
        travelModeFromPrevious: "automotive",
      },
    ],
  },

  {
    id: "villach-2021",
    order: 13,
    origin: LAX,
    start: { year: 2021 },
    returnToOrigin: false,
    hubId: "villach",
    caption: "Moved for work",
    stops: [{ location: VILLACH }],
  },
  {
    id: "vienna-2021",
    order: 14,
    origin: VILLACH,
    start: { year: 2021 },
    returnToOrigin: true,
    hubId: "villach",
    stops: [{ location: { id: "vienna", name: "Vienna", country: "Austria", lat: 48.21, lng: 16.37 } }],
  },
  {
    id: "florence-2021",
    order: 15,
    origin: VILLACH,
    start: { year: 2021 },
    returnToOrigin: true,
    hubId: "villach",
    stops: [{ location: { id: "florence", name: "Florence", country: "Italy", lat: 43.77, lng: 11.26 } }],
  },

  {
    id: "ljubljana-2022",
    order: 16,
    origin: VILLACH,
    start: { year: 2022 },
    returnToOrigin: true,
    hubId: "villach",
    stops: [{ location: { id: "ljubljana", name: "Ljubljana", country: "Slovenia", lat: 46.06, lng: 14.51 } }],
  },
  {
    id: "venice-2022",
    order: 17,
    origin: VILLACH,
    start: { year: 2022 },
    returnToOrigin: true,
    hubId: "villach",
    stops: [{ location: { id: "venice", name: "Venice", country: "Italy", lat: 45.44, lng: 12.32 } }],
  },

  {
    id: "salzburg-2022",
    order: 18,
    origin: LAX,
    start: { year: 2022 },
    returnToOrigin: true,
    stops: [
      { location: { id: "salzburg", name: "Salzburg", country: "Austria", lat: 47.8, lng: 13.04 } },
      { location: { id: "hallstatt", name: "Hallstatt", country: "Austria", lat: 47.5622, lng: 13.6493 } },
    ],
  },

  {
    id: "munich-2022",
    order: 19,
    origin: LAX,
    start: { year: 2022 },
    returnToOrigin: false,
    hubId: "munich",
    caption: "Moved for work",
    stops: [{ location: MUNICH }],
  },
  {
    id: "madrid-2022",
    order: 20,
    origin: MUNICH,
    start: { year: 2022 },
    returnToOrigin: true,
    hubId: "munich",
    stops: [{ location: { id: "madrid", name: "Madrid", country: "Spain", lat: 40.42, lng: -3.7 } }],
  },
  {
    id: "amsterdam-2022",
    order: 21,
    origin: MUNICH,
    start: { year: 2022 },
    returnToOrigin: true,
    hubId: "munich",
    stops: [{ location: { id: "amsterdam", name: "Amsterdam", country: "Netherlands", lat: 52.37, lng: 4.9 } }],
  },
  {
    id: "berlin-2022",
    order: 22,
    origin: MUNICH,
    start: { year: 2022 },
    returnToOrigin: true,
    hubId: "munich",
    stops: [{ location: { id: "berlin", name: "Berlin", country: "Germany", lat: 52.52, lng: 13.4 } }],
  },
  {
    id: "turin-2022",
    order: 23,
    origin: MUNICH,
    start: { year: 2022 },
    returnToOrigin: true,
    hubId: "munich",
    stops: [{ location: { id: "turin", name: "Turin", country: "Italy", lat: 45.07, lng: 7.69 } }],
  },
  {
    id: "budapest-2022",
    order: 24,
    origin: MUNICH,
    start: { year: 2022 },
    returnToOrigin: true,
    hubId: "munich",
    stops: [{ location: { id: "budapest", name: "Budapest", country: "Hungary", lat: 47.5, lng: 19.04 } }],
  },
  {
    id: "geneva-2022",
    order: 25,
    origin: MUNICH,
    start: { year: 2022 },
    returnToOrigin: true,
    hubId: "munich",
    stops: [
      { location: { id: "geneva", name: "Geneva", country: "Switzerland", lat: 46.2, lng: 6.14 } },
      { location: { id: "lyon", name: "Lyon", country: "France", lat: 45.764, lng: 4.8357 } },
    ],
  },
  {
    id: "barcelona-2022",
    order: 26,
    origin: MUNICH,
    start: { year: 2022 },
    returnToOrigin: true,
    hubId: "munich",
    stops: [{ location: { id: "barcelona", name: "Barcelona", country: "Spain", lat: 41.39, lng: 2.17 } }],
  },
  {
    id: "prague-2022",
    order: 27,
    origin: MUNICH,
    start: { year: 2022 },
    returnToOrigin: true,
    hubId: "munich",
    stops: [{ location: { id: "prague", name: "Prague", country: "Czechia", lat: 50.09, lng: 14.42 } }],
  },

  {
    id: "taipei-2023",
    order: 28,
    origin: LAX,
    start: { year: 2023 },
    returnToOrigin: true,
    stops: [{ location: { id: "taipei-2023", name: "Taipei", country: "Taiwan", lat: 25.03, lng: 121.57 } }],
  },
  {
    id: "tokyo-2023",
    order: 29,
    origin: LAX,
    start: { year: 2023 },
    returnToOrigin: true,
    stops: [
      { location: { id: "tokyo", name: "Tokyo", country: "Japan", lat: 35.68, lng: 139.69 } },
      { location: { id: "kyoto", name: "Kyoto", country: "Japan", lat: 35.0116, lng: 135.7681 } },
      { location: { id: "osaka", name: "Osaka", country: "Japan", lat: 34.6937, lng: 135.5023 } },
    ],
  },

  {
    id: "taipei-2024",
    order: 30,
    origin: LAX,
    start: { year: 2024 },
    returnToOrigin: true,
    stops: [
      { location: { id: "taipei-2024", name: "Taipei", country: "Taiwan", lat: 25.03, lng: 121.57 } },
      { location: { id: "shenzhen", name: "Shenzhen", country: "China", lat: 22.5431, lng: 114.0579 } },
      { location: { id: "shanghai-2024", name: "Shanghai", country: "China", lat: 31.23, lng: 121.47 } },
    ],
  },
  {
    id: "shanghai-2024",
    order: 31,
    origin: LAX,
    start: { year: 2024 },
    returnToOrigin: true,
    stops: [
      { location: { id: "shanghai-2024b", name: "Shanghai", country: "China", lat: 31.23, lng: 121.47 } },
      { location: { id: "taipei-2024b", name: "Taipei", country: "Taiwan", lat: 25.03, lng: 121.57 } },
    ],
  },

  {
    id: "central-coast-2025",
    order: 32,
    origin: LAX,
    start: { year: 2025 },
    returnToOrigin: true,
    stops: [{ location: { id: "central-coast", name: "California Central Coast", country: "United States", lat: 35.28, lng: -120.66 } }],
  },

  {
    id: "zurich-2026",
    order: 33,
    origin: LAX,
    start: { year: 2026 },
    returnToOrigin: true,
    stops: [{ location: { id: "zurich", name: "Zurich", country: "Switzerland", lat: 47.38, lng: 8.54 } }],
  },
  {
    id: "rome-2026",
    order: 34,
    origin: LAX,
    start: { year: 2026 },
    returnToOrigin: true,
    stops: [{ location: { id: "rome-2026", name: "Rome", country: "Italy", lat: 41.9, lng: 12.5 } }],
  },
];
