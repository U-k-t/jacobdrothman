import type { RouteLeg } from "./routeLegs";
import { formatJourneyDate } from "./timing";
import { getTravelModeLabel } from "./travelModes";

interface DestinationCaptionProps {
  activeLeg: RouteLeg | null;
  /** Announced only before the first leg begins, so assistive tech isn't left silent on load. */
  initialLocationName?: string;
}

/**
 * Screen-reader-only live announcement of the active leg's destination, date, and travel mode.
 * Movement is communicated visually through the map's points and path, not visible text — this
 * region has no visual footprint (no space reserved for it) but keeps assistive tech informed of
 * progress in real time, alongside (not instead of) the always-present `RouteSummary`.
 */
export function DestinationCaption({ activeLeg, initialLocationName }: DestinationCaptionProps) {
  if (activeLeg) {
    return (
      <p className="sr-only" aria-live="polite">
        {activeLeg.destination.name}, {formatJourneyDate({ month: activeLeg.month, year: activeLeg.year })} —
        travel mode: {getTravelModeLabel(activeLeg.travelMode)}.
      </p>
    );
  }

  if (initialLocationName) {
    return (
      <p className="sr-only" aria-live="polite">
        {initialLocationName}
      </p>
    );
  }

  return null;
}
