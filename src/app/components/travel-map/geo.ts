/** Equirectangular lat/lng -> SVG viewBox projection, shared by markers, route legs, and the world silhouette. */
export interface ProjectionSize {
  width: number;
  height: number;
}

/** Shared viewBox dimensions — every projected element (markers, legs, silhouette) uses this exact size. */
export const MAP_VIEW_SIZE: ProjectionSize = { width: 1000, height: 500 };

export function project(lat: number, lng: number, size: ProjectionSize = MAP_VIEW_SIZE): { x: number; y: number } {
  const x = ((lng + 180) / 360) * size.width;
  const y = ((90 - lat) / 180) * size.height;
  return { x, y };
}
