import { CheckCircle, Zap, Users2 } from "lucide-react";

export function ProcessImprovement() {
  const improvements = [
    {
      title: "Agile Transformation",
      context: "Growing startup transitioning from ad-hoc to structured development",
      challenge: "Team struggling with unclear priorities, missed deadlines, and low morale",
      solution: "Implemented two-week sprints with clear ceremonies, defined roles, and transparent backlog management",
      results: [
        "30% increase in team velocity",
        "90% on-time delivery rate",
        "Improved team satisfaction scores",
      ],
    },
    {
      title: "Cross-Functional Collaboration Framework",
      context: "Siloed teams causing communication breakdowns and duplicated work",
      challenge: "Engineering, design, and marketing working in isolation, leading to misaligned priorities",
      solution: "Created shared OKRs, bi-weekly sync meetings, and collaborative roadmap planning sessions",
      results: [
        "50% reduction in duplicate efforts",
        "Faster time-to-market for new features",
        "Stronger alignment on company goals",
      ],
    },
    {
      title: "User Research Integration",
      context: "Product decisions being made without user validation",
      challenge: "Features shipped based on assumptions rather than user needs",
      solution: "Established regular user interviews, usability testing, and feedback loops integrated into sprint planning",
      results: [
        "75% of features validated before development",
        "Reduced feature abandonment rate",
        "Higher user satisfaction scores",
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
