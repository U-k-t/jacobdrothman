import { useMemo } from "react";
import { trips } from "../data/travelTrips";
import { DestinationCaption } from "./travel-map/DestinationCaption";
import { MapCanvas } from "./travel-map/MapCanvas";
import { ReplayButton } from "./travel-map/ReplayButton";
import { RouteSummary } from "./travel-map/RouteSummary";
import { TravelModeLegend } from "./travel-map/TravelModeLegend";
import { buildRouteLegs } from "./travel-map/routeLegs";
import { useTravelMapAnimation } from "./travel-map/useTravelMapAnimation";

export function TravelMap() {
  const legs = useMemo(() => buildRouteLegs(trips), []);
  const { containerRef, activeLegIndex, replay } = useTravelMapAnimation({
    legCount: legs.length,
  });

  const activeLeg = activeLegIndex >= 0 && activeLegIndex < legs.length ? legs[activeLegIndex] : null;

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-gradient-to-br from-[#1fa2ff]/5 to-[#60b8ff]/10 border border-[#1fa2ff]/20 rounded-lg p-8 mb-12 overflow-hidden"
    >
      <MapCanvas legs={legs} activeLegIndex={activeLegIndex} />

      <div className="min-h-[3.5rem]">
        <DestinationCaption activeLeg={activeLeg} />
      </div>

      <TravelModeLegend legs={legs} />

      <div className="mt-4 flex justify-center">
        <ReplayButton onReplay={replay} />
      </div>

      <RouteSummary legs={legs} />
    </div>
  );
}
