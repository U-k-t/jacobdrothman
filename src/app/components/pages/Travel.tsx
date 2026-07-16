import { MapPin } from "lucide-react";
import { useMemo } from "react";
import { journeys, type Journey } from "../../data/travelJourneys";
import { TravelMap } from "../TravelMap";

/** Unique stop names in visit order (a stop like "Rome" revisited later collapses to one label). */
function uniqueStopNames(journey: Journey): string[] {
  return Array.from(new Set(journey.stops.map((stop) => stop.location.name)));
}

function journeyLabel(journey: Journey): string {
  const base = uniqueStopNames(journey).join(" & ");
  return journey.caption ? `${base} (${journey.caption})` : base;
}

/**
 * Year-grouped display chips, derived directly from the same `journeys` dataset that drives
 * the animated map — not a hand-maintained duplicate — so this list can't drift from the map.
 */
function buildTimeline(source: Journey[]) {
  const byYear = new Map<number, string[]>();
  for (const journey of source) {
    const places = byYear.get(journey.start.year) ?? [];
    places.push(journeyLabel(journey));
    byYear.set(journey.start.year, places);
  }
  return Array.from(byYear.entries())
    .sort((a, b) => b[0] - a[0])
    .map(([year, places]) => ({ year: String(year), places }));
}

export function Travel() {
  const timeline = useMemo(() => buildTimeline(journeys), []);

  return (
    <div className="min-h-[calc(100vh-theme(spacing.16))]">
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="mb-6">Travel Adventures</h1>

          <p className="text-lg text-muted-foreground mb-12">
            I grew up in Southern California, and travel has been a constant since — from
            family trips and cruises early on to two work relocations to Europe (Villach,
            Austria in 2021, then Munich, Germany in 2022) that put most of the continent
            within a short flight. That same curiosity has taken me across East Asia and
            back home to explore more of California too.
          </p>

          <TravelMap />

          <div className="space-y-6">
            {timeline.map((entry) => (
              <div
                key={entry.year}
                className="bg-card border border-border rounded-lg p-6 hover:shadow-md hover:border-[#1fa2ff]/30 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#1fa2ff]/20 to-[#60b8ff]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-[#1fa2ff]" size={20} />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-2">{entry.year}</h3>
                    <div className="flex flex-wrap gap-2">
                      {entry.places.map((place, index) => (
                        <span
                          key={`${entry.year}-${index}-${place}`}
                          className="bg-accent px-3 py-1 rounded-full text-sm text-muted-foreground"
                        >
                          {place}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-accent/50 border border-border rounded-lg p-6">
            <h3 className="mb-3">What Travel Teaches Me</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Empathy for diverse user needs and cultural contexts</li>
              <li>• Adaptability when plans change unexpectedly</li>
              <li>• The importance of research and preparation</li>
              <li>• How to communicate across language and cultural barriers</li>
              <li>• Finding creative solutions with limited resources</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
