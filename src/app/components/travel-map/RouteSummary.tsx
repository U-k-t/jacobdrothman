import type { RouteLeg } from "./routeLegs";
import { getTravelModeLabel } from "./travelModes";

interface RouteSummaryProps {
  legs: RouteLeg[];
}

/** Always-rendered accessible summary of the full route, for screen readers and reduced-motion visitors. */
export function RouteSummary({ legs }: RouteSummaryProps) {
  return (
    <div className="sr-only">
      <h2>Travel route, in chronological order</h2>
      {legs.length === 0 ? (
        <p>No trips to show yet.</p>
      ) : (
        <ol>
          {legs.map((leg) => (
            <li key={leg.id}>
              {leg.isRelocation
                ? leg.label
                : leg.direction === "outbound"
                  ? `Traveled from ${leg.origin.name} to ${leg.destination.name}`
                  : `Returned from ${leg.origin.name} to ${leg.destination.name}`}
              {leg.year ? `, ${leg.year}` : ""} — travel mode: {getTravelModeLabel(leg.travelMode)}.
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
