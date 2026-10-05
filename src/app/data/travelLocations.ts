export interface Location {
  id: string;
  name: string;
  country: string;
  lat: number;
  lng: number;
}

/** Known transportation modes — every leg in the dataset resolves to one of these. */
export type TravelMode = "automotive" | "train" | "boat" | "air";

/**
 * Reusable location records. One canonical record per place — journeys reference these
 * objects rather than duplicating coordinates. See plan.md ("Coordinate approximations")
 * for the documented approximations used for broad regions/islands.
 */

/**
 * Regional home base. Displayed as "Southern California" everywhere user-facing (never
 * "LAX"/"LA"/"Los Angeles") because travel from this base originated from both Los Angeles
 * and San Diego over the years — a distinction not meaningful at this map's scale. The
 * coordinate is the LAX-area point, used as a regional approximation for map placement only.
 */
export const SOUTHERN_CALIFORNIA: Location = {
  id: "southern-california",
  name: "Southern California",
  country: "United States",
  lat: 33.9416,
  lng: -118.4085,
};

export const VILLACH: Location = { id: "villach", name: "Villach", country: "Austria", lat: 46.6111, lng: 13.8558 };
export const MUNICH: Location = { id: "munich", name: "Munich", country: "Germany", lat: 48.1351, lng: 11.582 };
export const SAN_FRANCISCO: Location = {
  id: "san-francisco",
  name: "San Francisco",
  country: "United States",
  lat: 37.7749,
  lng: -122.4194,
};

/** Lihue, Kauai's primary town — used as the representative point for the island. */
export const KAUAI: Location = { id: "kauai", name: "Kauai", country: "United States", lat: 21.9811, lng: -159.3711 };
export const ENSENADA: Location = { id: "ensenada", name: "Ensenada", country: "Mexico", lat: 31.87, lng: -116.62 };
export const LAS_VEGAS: Location = { id: "las-vegas", name: "Las Vegas", country: "United States", lat: 36.1699, lng: -115.1398 };
export const GRAND_CANYON_VILLAGE: Location = {
  id: "grand-canyon-village",
  name: "Grand Canyon Village",
  country: "United States",
  lat: 36.0544,
  lng: -112.1401,
};
export const YOSEMITE: Location = { id: "yosemite", name: "Yosemite", country: "United States", lat: 37.8651, lng: -119.5383 };
export const MAMMOTH_LAKES: Location = { id: "mammoth-lakes", name: "Mammoth Lakes", country: "United States", lat: 37.6485, lng: -118.9721 };
export const ORLANDO: Location = { id: "orlando", name: "Orlando", country: "United States", lat: 28.5383, lng: -81.3792 };
/** Road Town, Tortola — the territory's capital, used as the representative point for the BVI. */
export const BRITISH_VIRGIN_ISLANDS: Location = {
  id: "british-virgin-islands",
  name: "British Virgin Islands",
  country: "United Kingdom",
  lat: 18.4207,
  lng: -64.6399,
};
/** Basseterre — the capital, used as the representative point for Saint Kitts and Nevis. */
export const SAINT_KITTS_AND_NEVIS: Location = {
  id: "saint-kitts-and-nevis",
  name: "Saint Kitts and Nevis",
  country: "Saint Kitts and Nevis",
  lat: 17.3026,
  lng: -62.7177,
};
export const BOSTON: Location = { id: "boston", name: "Boston", country: "United States", lat: 42.3601, lng: -71.0589 };
export const ITHACA: Location = { id: "ithaca", name: "Ithaca", country: "United States", lat: 42.444, lng: -76.5019 };
export const PHILADELPHIA: Location = { id: "philadelphia", name: "Philadelphia", country: "United States", lat: 39.9526, lng: -75.1652 };
export const PRINCETON: Location = { id: "princeton", name: "Princeton", country: "United States", lat: 40.3487, lng: -74.6591 };
export const MANHATTAN: Location = { id: "manhattan", name: "Manhattan", country: "United States", lat: 40.7831, lng: -73.9712 };
export const NEW_HAVEN: Location = { id: "new-haven", name: "New Haven", country: "United States", lat: 41.3083, lng: -72.9279 };
export const PROVIDENCE: Location = { id: "providence", name: "Providence", country: "United States", lat: 41.824, lng: -71.4128 };
export const PUERTO_RICO: Location = { id: "puerto-rico", name: "Puerto Rico", country: "United States", lat: 18.4655, lng: -66.1057 };
/** Charlotte Amalie — the territorial capital, used as the representative point for the USVI. */
export const US_VIRGIN_ISLANDS: Location = {
  id: "us-virgin-islands",
  name: "United States Virgin Islands",
  country: "United States",
  lat: 18.3419,
  lng: -64.9307,
};
/** St. George's — the capital, used as the representative point for Grenada. */
export const GRENADA: Location = { id: "grenada", name: "Grenada", country: "Grenada", lat: 12.0561, lng: -61.7488 };
export const DOOLIN: Location = { id: "doolin", name: "Doolin", country: "Ireland", lat: 52.9756, lng: -9.3801 };
export const GALWAY: Location = { id: "galway", name: "Galway", country: "Ireland", lat: 53.2707, lng: -9.0568 };
export const BALLINA: Location = { id: "ballina", name: "Ballina", country: "Ireland", lat: 54.1151, lng: -9.1544 };
export const LIMERICK: Location = { id: "limerick", name: "Limerick", country: "Ireland", lat: 52.6638, lng: -8.6267 };
export const KILLARNEY: Location = { id: "killarney", name: "Killarney", country: "Ireland", lat: 52.0599, lng: -9.5044 };
export const DUBLIN: Location = { id: "dublin", name: "Dublin", country: "Ireland", lat: 53.3498, lng: -6.2603 };
export const SEATTLE: Location = { id: "seattle", name: "Seattle", country: "United States", lat: 47.6062, lng: -122.3321 };
export const VICTORIA: Location = { id: "victoria", name: "Victoria", country: "Canada", lat: 48.4284, lng: -123.3656 };
export const JUNEAU: Location = { id: "juneau", name: "Juneau", country: "United States", lat: 58.3019, lng: -134.4197 };
export const LONDON: Location = { id: "london", name: "London", country: "United Kingdom", lat: 51.5074, lng: -0.1278 };
export const PARIS: Location = { id: "paris", name: "Paris", country: "France", lat: 48.8566, lng: 2.3522 };
export const ROME: Location = { id: "rome", name: "Rome", country: "Italy", lat: 41.9028, lng: 12.4964 };
export const GENOA: Location = { id: "genoa", name: "Genoa", country: "Italy", lat: 44.4056, lng: 8.9463 };
export const MARSEILLE: Location = { id: "marseille", name: "Marseille", country: "France", lat: 43.2965, lng: 5.3698 };
export const BARCELONA: Location = { id: "barcelona", name: "Barcelona", country: "Spain", lat: 41.3874, lng: 2.1686 };
export const TUNIS: Location = { id: "tunis", name: "Tunis", country: "Tunisia", lat: 36.8065, lng: 10.1815 };
/** Valletta — the capital, used as the representative point for Malta. */
export const MALTA: Location = { id: "malta", name: "Malta", country: "Malta", lat: 35.8989, lng: 14.5146 };
/** Palermo — Sicily's largest city, used as the representative point since no specific city was named. */
export const SICILY: Location = { id: "sicily", name: "Sicily", country: "Italy", lat: 38.1157, lng: 13.3615 };
export const NEW_ORLEANS: Location = { id: "new-orleans", name: "New Orleans", country: "United States", lat: 29.9511, lng: -90.0715 };
export const VIENNA: Location = { id: "vienna", name: "Vienna", country: "Austria", lat: 48.2082, lng: 16.3738 };
export const FLORENCE: Location = { id: "florence", name: "Florence", country: "Italy", lat: 43.7696, lng: 11.2558 };
export const LJUBLJANA: Location = { id: "ljubljana", name: "Ljubljana", country: "Slovenia", lat: 46.0569, lng: 14.5058 };
export const SALZBURG: Location = { id: "salzburg", name: "Salzburg", country: "Austria", lat: 47.8095, lng: 13.055 };
export const VENICE: Location = { id: "venice", name: "Venice", country: "Italy", lat: 45.4408, lng: 12.3155 };
export const SANTA_BARBARA: Location = { id: "santa-barbara", name: "Santa Barbara", country: "United States", lat: 34.4208, lng: -119.6982 };
export const MADRID: Location = { id: "madrid", name: "Madrid", country: "Spain", lat: 40.4168, lng: -3.7038 };
export const AMSTERDAM: Location = { id: "amsterdam", name: "Amsterdam", country: "Netherlands", lat: 52.3676, lng: 4.9041 };
export const BERLIN: Location = { id: "berlin", name: "Berlin", country: "Germany", lat: 52.52, lng: 13.405 };
export const TURIN: Location = { id: "turin", name: "Turin", country: "Italy", lat: 45.0703, lng: 7.6869 };
export const BUDAPEST: Location = { id: "budapest", name: "Budapest", country: "Hungary", lat: 47.4979, lng: 19.0402 };
export const LYON: Location = { id: "lyon", name: "Lyon", country: "France", lat: 45.764, lng: 4.8357 };
export const PRAGUE: Location = { id: "prague", name: "Prague", country: "Czechia", lat: 50.0755, lng: 14.4378 };
export const DURHAM: Location = { id: "durham", name: "Durham", country: "United States", lat: 35.994, lng: -78.8986 };
export const SACRAMENTO: Location = { id: "sacramento", name: "Sacramento", country: "United States", lat: 38.5816, lng: -121.4944 };
export const TAIPEI: Location = { id: "taipei", name: "Taipei", country: "Taiwan", lat: 25.033, lng: 121.5654 };
export const TOKYO: Location = { id: "tokyo", name: "Tokyo", country: "Japan", lat: 35.6762, lng: 139.6503 };
export const KYOTO: Location = { id: "kyoto", name: "Kyoto", country: "Japan", lat: 35.0116, lng: 135.7681 };
export const OSAKA: Location = { id: "osaka", name: "Osaka", country: "Japan", lat: 34.6937, lng: 135.5023 };
export const SHENZHEN: Location = { id: "shenzhen", name: "Shenzhen", country: "China", lat: 22.5431, lng: 114.0579 };
export const SHANGHAI: Location = { id: "shanghai", name: "Shanghai", country: "China", lat: 31.2304, lng: 121.4737 };
export const SAN_SIMEON: Location = { id: "san-simeon", name: "San Simeon", country: "United States", lat: 35.6386, lng: -121.1892 };
export const ATASCADERO: Location = { id: "atascadero", name: "Atascadero", country: "United States", lat: 35.4894, lng: -120.6707 };
export const MORRO_BAY: Location = { id: "morro-bay", name: "Morro Bay", country: "United States", lat: 35.3658, lng: -120.8499 };
export const PISMO_BEACH: Location = { id: "pismo-beach", name: "Pismo Beach", country: "United States", lat: 35.1428, lng: -120.6413 };
export const SOLVANG: Location = { id: "solvang", name: "Solvang", country: "United States", lat: 34.5958, lng: -120.1376 };
export const ZURICH: Location = { id: "zurich", name: "Zurich", country: "Switzerland", lat: 47.3769, lng: 8.5417 };
