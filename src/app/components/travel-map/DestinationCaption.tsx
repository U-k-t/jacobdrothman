import type { RouteLeg } from "./routeLegs";
import { formatJourneyDate } from "./timing";
import { getTravelModeLabel } from "./travelModes";

interface DestinationCaptionProps {
  activeLeg: RouteLeg | null;
  /** Shown only before the first leg begins, so the status area is never blank on load. */
  initialLocationName?: string;
}

/** Shows only the active leg's destination name, date, and travel mode — nothing else. */
export function DestinationCaption({ activeLeg, initialLocationName }: DestinationCaptionProps) {
  if (activeLeg) {
    return (
      <div className="mt-4 text-center" aria-live="polite">
        <p className="text-sm text-foreground">{activeLeg.destination.name}</p>
        <p className="text-xs text-muted-foreground mt-1">
          {formatJourneyDate({ month: activeLeg.month, year: activeLeg.year })}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Travel mode: {getTravelModeLabel(activeLeg.travelMode)}
        </p>
      </div>
    );
  }

  if (initialLocationName) {
    return (
      <div className="mt-4 text-center" aria-live="polite">
        <p className="text-sm text-foreground">{initialLocationName}</p>
      </div>
    );
  }

  return null;
}
