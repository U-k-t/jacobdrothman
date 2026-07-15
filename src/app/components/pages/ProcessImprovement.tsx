import { CheckCircle, Zap, Users2 } from "lucide-react";

export function ProcessImprovement() {
  const improvements = [
    {
      title: "Reporting Automation",
      context: "Product performance tracking relied on manual, recurring analysis across teams",
      challenge: "Manual reporting was slow and inconsistent, eating into time that should have gone toward roadmap work",
      solution: "Built Python automation to generate recurring reports, and built KPI dashboards for 6 teams to track adoption and monitor product performance",
      results: [
        "10+ hours/week of manual analysis eliminated",
        "Consistent performance tracking across 6 teams",
        "Freed up time for roadmap-level decision-making",
      ],
    },
    {
      title: "Funnel Analysis for Roadmap Prioritization",
      context: "Roadmap decisions needed a clearer read on where users were dropping off",
      challenge: "Without a systematic view of funnel performance, it was hard to prioritize the highest-impact experiments",
      solution: "Analyzed funnel performance to identify conversion gaps, then used those findings to prioritize experiments and guide product improvements",
      results: [
        "Conversion gaps identified and prioritized systematically",
        "Experimentation roadmap grounded in funnel data",
        "Improvements guided by evidence rather than assumption",
      ],
    },
  ];

  return (
    <div className="min-h-[calc(100vh-theme(spacing.16))]">
      <section className="py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="mb-6">Process Improvement</h1>

          <p className="text-lg text-muted-foreground mb-12">
            Streamlining workflows and fostering collaboration to help teams work smarter, not harder. Here's how I've driven meaningful process improvements.
          </p>

          <div className="space-y-12">
            {improvements.map((improvement, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-lg p-8"
              >
                <h2 className="mb-4">{improvement.title}</h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="mb-2">Context</h3>
                    <p className="text-muted-foreground">{improvement.context}</p>
                  </div>

                  <div>
                    <h3 className="mb-2">Challenge</h3>
                    <p className="text-muted-foreground">{improvement.challenge}</p>
                  </div>

                  <div>
                    <h3 className="mb-2">Solution</h3>
                    <p className="text-muted-foreground">{improvement.solution}</p>
                  </div>

                  <div>
                    <h3 className="mb-3">Results</h3>
                    <div className="grid sm:grid-cols-3 gap-4">
                      {improvement.results.map((result, resultIndex) => (
                        <div
                          key={resultIndex}
                          className="flex items-start gap-3 bg-accent/50 rounded-lg p-4"
                        >
                          <CheckCircle className="text-[#1fa2ff] flex-shrink-0 mt-0.5" size={20} />
                          <span className="text-sm">{result}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-accent/50 border border-border rounded-lg p-8">
            <h2 className="mb-6">Process Improvement Philosophy</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="w-10 h-10 bg-gradient-to-br from-[#1fa2ff]/20 to-[#60b8ff]/20 rounded-lg flex items-center justify-center mb-4">
                  <Users2 className="text-[#1fa2ff]" size={20} />
                </div>
                <h3 className="mb-2">People First</h3>
                <p className="text-muted-foreground">
                  The best processes empower people, not constrain them. Involve the team in designing workflows.
                </p>
              </div>
              <div>
                <div className="w-10 h-10 bg-gradient-to-br from-[#1fa2ff]/20 to-[#60b8ff]/20 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="text-[#1fa2ff]" size={20} />
                </div>
                <h3 className="mb-2">Start Small</h3>
                <p className="text-muted-foreground">
                  Incremental changes are easier to adopt and measure. Build momentum with quick wins.
                </p>
              </div>
              <div>
                <div className="w-10 h-10 bg-gradient-to-br from-[#1fa2ff]/20 to-[#60b8ff]/20 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle className="text-[#1fa2ff]" size={20} />
                </div>
                <h3 className="mb-2">Measure Impact</h3>
                <p className="text-muted-foreground">
                  Define success metrics upfront and track them consistently. Adjust based on data, not assumptions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
