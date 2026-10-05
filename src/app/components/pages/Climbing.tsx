import { useEffect } from "react";
import { Award, MapPin } from "lucide-react";

export function Climbing() {
  useEffect(() => {
    const previous = document.title;
    document.title = "Climbing | Jacob Rothman";
    return () => {
      document.title = previous;
    };
  }, []);

  const outdoorAreas = [
    { area: "Stoney Point, CA", problems: ["Slime", "Spiral", "Gomers Pile"] },
    { area: "Tramway, CA", problems: ["Terminator", "+ various attempts"] },
    { area: "The Brickyard, CA", problems: ["Various attempts"] },
  ];

  const gyms = ["Los Angeles", "Sacramento", "Munich", "Tokyo", "Shenzhen"];

  return (
    <div className="min-h-[calc(100vh-theme(spacing.16))]">
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="mb-6">Rock Climbing</h1>

          <p className="text-lg text-muted-foreground mb-12">
            I boulder about twice a week, in gyms and outdoors in Southern California. I've
            also climbed in gyms in Munich, Tokyo, and Shenzhen.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mb-12">
            <div className="bg-accent/50 border border-border rounded-lg p-6 flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-brand/20 to-brand-soft/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Award className="text-brand-strong" size={20} />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Current level</div>
                <div>V6 consistently, one V7 send</div>
              </div>
            </div>
            <div className="bg-accent/50 border border-border rounded-lg p-6 flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-brand/20 to-brand-soft/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin className="text-brand-strong" size={20} />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Frequency</div>
                <div>~2x per week</div>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="mb-6">Outdoor Areas (Southern California)</h2>
            <div className="space-y-4">
              {outdoorAreas.map((entry) => (
                <div
                  key={entry.area}
                  className="bg-card border border-border rounded-lg p-6 hover:shadow-md hover:border-brand/30 transition-all"
                >
                  <h3 className="mb-3">{entry.area}</h3>
                  <div className="flex flex-wrap gap-2">
                    {entry.problems.map((problem) => (
                      <span
                        key={problem}
                        className="bg-accent px-3 py-1 rounded-full text-sm text-muted-foreground"
                      >
                        {problem}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-12">
            <h2 className="mb-6">Gyms I've Climbed At</h2>
            <div className="flex flex-wrap gap-2">
              {gyms.map((gym) => (
                <span
                  key={gym}
                  className="bg-accent px-3 py-1 rounded-full text-sm text-muted-foreground"
                >
                  {gym}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
