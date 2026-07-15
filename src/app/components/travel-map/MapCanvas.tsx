import { AnimatePresence, motion } from "motion/react";
import type { GeoPoint } from "../../data/travelLocations";
import { MAP_VIEW_SIZE, project } from "./geo";
import type { RouteLeg } from "./routeLegs";
import { getTravelModeStyle } from "./travelModes";
import { WORLD_SILHOUETTE } from "./worldSilhouette";

interface MapCanvasProps {
  legs: RouteLeg[];
  /** -1 = nothing shown yet; legs.length = complete (all markers, no active line). */
  activeLegIndex: number;
}

function coordKey(point: GeoPoint) {
  return `${point.lat.toFixed(2)},${point.lng.toFixed(2)}`;
}

function legPathD(leg: RouteLeg) {
  const origin = project(leg.origin.lat, leg.origin.lng);
  const destination = project(leg.destination.lat, leg.destination.lng);
  return `M ${origin.x} ${origin.y} L ${destination.x} ${destination.y}`;
}

export function MapCanvas({ legs, activeLegIndex }: MapCanvasProps) {
  const { width, height } = MAP_VIEW_SIZE;

  const visitedPoints = new Map<string, GeoPoint>();
  for (let i = 0; i <= activeLegIndex && i < legs.length; i++) {
    visitedPoints.set(coordKey(legs[i].origin), legs[i].origin);
    visitedPoints.set(coordKey(legs[i].destination), legs[i].destination);
  }

  const activeLeg = activeLegIndex >= 0 && activeLegIndex < legs.length ? legs[activeLegIndex] : null;
  const activeStyle = activeLeg ? getTravelModeStyle(activeLeg.travelMode) : null;
  const currentPointKey = activeLeg ? coordKey(activeLeg.destination) : null;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-full h-auto relative z-10"
      style={{ maxHeight: "420px" }}
      aria-hidden="true"
    >
      <g className="fill-muted-foreground/10">
        {WORLD_SILHOUETTE.map((polygon, i) => (
          <polygon
            key={`land-${i}`}
            points={polygon
              .map((vertex) => {
                const { x, y } = project(vertex.lat, vertex.lng);
                return `${x},${y}`;
              })
              .join(" ")}
          />
        ))}
      </g>

      <g>
        {Array.from(visitedPoints.entries()).map(([key, point]) => {
          const { x, y } = project(point.lat, point.lng);
          const isCurrent = key === currentPointKey;
          return (
            <motion.g
              key={key}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.35, ease: "backOut" }}
              style={{ transformOrigin: `${x}px ${y}px` }}
            >
              {isCurrent && (
                <motion.circle
                  cx={x}
                  cy={y}
                  r={6}
                  className="fill-none stroke-brand-blue"
                  strokeWidth="1.5"
                  initial={{ opacity: 0.6, scale: 1 }}
                  animate={{ opacity: 0, scale: 2.2 }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
                />
              )}
              <circle
                cx={x}
                cy={y}
                r={isCurrent ? 5 : 3.5}
                className={isCurrent ? "fill-brand-blue" : "fill-brand-blue-light"}
              />
            </motion.g>
          );
        })}
      </g>

      <AnimatePresence mode="wait">
        {activeLeg && activeStyle && (
          <motion.path
            key={activeLeg.id}
            data-testid="active-route-path"
            d={legPathD(activeLeg)}
            fill="none"
            strokeWidth={2}
            strokeLinecap="round"
            strokeDasharray={activeStyle.dashed ? "6 4" : undefined}
            className={activeStyle.strokeClassName}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.9 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        )}
      </AnimatePresence>
    </svg>
  );
}
