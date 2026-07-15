/**
 * Deliberately rough, originally-authored continent silhouettes — NOT traced from
 * any third-party map dataset, GeoJSON package, or copyrighted source. Each shape
 * is a small hand-picked set of lat/lng vertices approximating a landmass's rough
 * extent, meant only as a subtle backdrop so destinations read as "roughly in the
 * right part of the world" — not as an accurate or authoritative map. See
 * plan.md for why this approach was chosen over a real map dataset/library.
 */
export interface LatLng {
  lat: number;
  lng: number;
}

export const WORLD_SILHOUETTE: LatLng[][] = [
  // North America (including a rough Alaska/Baja extent for the destinations that need it)
  [
    { lat: 71, lng: -156 },
    { lat: 60, lng: -140 },
    { lat: 49, lng: -125 },
    { lat: 32, lng: -117 },
    { lat: 22, lng: -106 },
    { lat: 18, lng: -95 },
    { lat: 25, lng: -97 },
    { lat: 30, lng: -90 },
    { lat: 45, lng: -80 },
    { lat: 47, lng: -60 },
    { lat: 60, lng: -65 },
    { lat: 71, lng: -95 },
  ],
  // South America
  [
    { lat: 12, lng: -72 },
    { lat: 5, lng: -52 },
    { lat: -8, lng: -35 },
    { lat: -23, lng: -43 },
    { lat: -34, lng: -58 },
    { lat: -55, lng: -68 },
    { lat: -40, lng: -73 },
    { lat: -18, lng: -70 },
  ],
  // Europe
  [
    { lat: 36, lng: -9 },
    { lat: 44, lng: -9 },
    { lat: 51, lng: -5 },
    { lat: 58, lng: 8 },
    { lat: 60, lng: 25 },
    { lat: 50, lng: 40 },
    { lat: 42, lng: 30 },
    { lat: 36, lng: 23 },
  ],
  // Africa
  [
    { lat: 37, lng: -6 },
    { lat: 32, lng: 20 },
    { lat: 31, lng: 32 },
    { lat: 12, lng: 43 },
    { lat: -5, lng: 40 },
    { lat: -34, lng: 20 },
    { lat: -18, lng: 12 },
    { lat: 5, lng: 9 },
    { lat: 15, lng: -17 },
  ],
  // Asia
  [
    { lat: 40, lng: 26 },
    { lat: 55, lng: 40 },
    { lat: 70, lng: 90 },
    { lat: 60, lng: 140 },
    { lat: 35, lng: 140 },
    { lat: 20, lng: 110 },
    { lat: 8, lng: 100 },
    { lat: 8, lng: 77 },
    { lat: 25, lng: 60 },
    { lat: 35, lng: 45 },
  ],
  // Australia
  [
    { lat: -10, lng: 142 },
    { lat: -12, lng: 131 },
    { lat: -20, lng: 114 },
    { lat: -34, lng: 115 },
    { lat: -38, lng: 145 },
    { lat: -28, lng: 153 },
  ],
];
