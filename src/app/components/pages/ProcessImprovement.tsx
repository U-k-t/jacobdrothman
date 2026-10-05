import { CheckCircle, Zap, Users2 } from "lucide-react";

export function ProcessImprovement() {
  const improvements = [
    {
      title: "Overdue-Opportunity Outreach Automation (Python)",
      context: "Infineon graduate program. Manual outreach limited operations to contacting the top 10 overdue opportunities per division",
      challenge: "Outreach took enough time by hand that most overdue opportunities were never followed up",
      solution: "Independently identified the bottleneck and built a Python automation that contacts account managers across the full overdue set, prompting date updates or design-win confirmation",
      results: [
        "Coverage expanded from the top accounts to the full overdue set",
        "Users estimated the weekly process fell from roughly six hours to 30 minutes (about 92% less time)",
        "User estimates, not a controlled time study",
      ],
    },
    {
      title: "Excel VBA Reporting Tool",
      context: "Product managers needed funnel and distribution data consolidated for analysis",
      challenge: "Analysis prep took a large share of PM time",
      solution: "Built an Excel VBA tool that consolidated funnel and distribution data, segmented by region and filterable by use case",
      results: [
        "Adopted by 5 PMs",
        "Users estimated 10+ hours saved weekly",
        "Users estimated 95% less analysis prep time (user estimates, not a controlled study)",
      ],
    },
    {
      title: "Excel/Tableau KPI Dashboards",
      context: "Teams needed a shared view of product KPIs and launch performance",
      challenge: "Spotting deviations, and products with high pipeline but low revenue, across the portfolio",
      solution: "Built Excel/Tableau dashboards that consolidated product KPIs and surfaced deviations and high-pipeline, low-revenue products",
      results: [
        "Used by 6 teams to monitor launches and inform roadmap decisions",
        "Surfaced high-pipeline, low-revenue products",
        "No verified time-savings figure",
      ],
    },
    {
      title: "CRM and Analytics Adoption",
      context: "Infineon's Microsoft Dynamics CRM and Power BI tools. Inconsistent processes and unclear best practices created friction and data-quality problems",
      challenge: "Teams used the same tools in different ways",
      solution: "Interviewed stakeholders, reviewed usage data, wrote documentation and training, clarified best practices, and standardized workflows across teams",
      results: [
        "30% increase in adoption, based on active and licensed user counts",
        "Improved use of existing platforms; I did not build Dynamics or Power BI",
        "No independently measured data-quality figure",
      ],
    },
  ];

  return (
    <div className="min-h-[calc(100vh-theme(spacing.16))]">
      <section className="py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="mb-6">Process Improvement</h1>

          <p className="text-lg text-muted-foreground mb-12">
            Streamlining workflows and fostering collaboration to help teams work smarter, not harder. Four separate examples, each with its own users and results.
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
