import type { RouteLeg } from "./routeLegs";
import { formatJourneyDate } from "./timing";
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
        <p>No journeys to show yet.</p>
      ) : (
        <ol>
          {legs.map((leg) => (
            <li key={leg.id}>
              {leg.isRelocation
                ? `Moved from ${leg.origin.name} to ${leg.destination.name}`
                : leg.direction === "outbound"
                  ? `Traveled from ${leg.origin.name} to ${leg.destination.name}`
                  : `Returned from ${leg.origin.name} to ${leg.destination.name}`}
              , {formatJourneyDate({ month: leg.month, year: leg.year })} — travel mode:{" "}
              {getTravelModeLabel(leg.travelMode)}.
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
