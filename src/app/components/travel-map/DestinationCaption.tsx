import type { RouteLeg } from "./routeLegs";
import { getTravelModeLabel } from "./travelModes";

interface DestinationCaptionProps {
  activeLeg: RouteLeg | null;
}

/** Shows only the active leg's destination name (+ travel mode) — nothing else. */
export function DestinationCaption({ activeLeg }: DestinationCaptionProps) {
  if (!activeLeg) {
    return null;
  }

  return (
    <div className="mt-4 text-center" aria-live="polite">
      <p className="text-sm text-foreground">{activeLeg.destination.name}</p>
      <p className="text-xs text-muted-foreground mt-1">
        Travel mode: {getTravelModeLabel(activeLeg.travelMode)}
      </p>
    </div>
  );
}
