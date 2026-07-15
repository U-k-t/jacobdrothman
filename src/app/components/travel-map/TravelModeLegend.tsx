import type { TravelMode } from "../../data/travelLocations";
import type { RouteLeg } from "./routeLegs";
import { getTravelModeStyle } from "./travelModes";

interface TravelModeLegendProps {
  legs: RouteLeg[];
}

/** Small, unobtrusive legend — only shows modes actually present in the generated legs. */
export function TravelModeLegend({ legs }: TravelModeLegendProps) {
  const modesPresent = new Set<TravelMode | undefined>(legs.map((leg) => leg.travelMode));
  const entries = Array.from(modesPresent).map((mode) => ({ mode, style: getTravelModeStyle(mode) }));

  if (entries.length === 0) {
    return null;
  }

  return (
    <div
      className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-muted-foreground"
      aria-hidden="true"
    >
      {entries.map(({ mode, style }) => (
        <span key={mode ?? "unresolved"} className="inline-flex items-center gap-1.5">
          <span className={`inline-block h-2 w-2 rounded-full ${style.fillClassName}`} />
          {style.label}
        </span>
      ))}
    </div>
  );
}
