import { Users, Target, BarChart } from "lucide-react";

export function ProductCaseStudies() {
  const caseStudies = [
    {
      title: "AI Infrastructure Product Launch",
      company: "Infineon Technologies · Product Marketing (semiconductor hardware)",
      impact: "$30M+ realized revenue to date",
      description: "Inherited a power-component program for AI servers after its prior owner left, at a time when customer requirements were moving faster than the roadmap. Requirements came mainly from power-module makers, plus direct NVIDIA engineering. I synthesized them into specification and package priorities, defended roadmap capacity, and owned feature and positioning decisions through launch and production ramp, as a project within a broader program owned by my manager. The key tradeoff was choosing the technology that was available and fit the customer's launch window over waiting for a more mature generation. This is semiconductor hardware, not an AI software product, but the requirements-to-launch tradeoffs are the same ones software teams make.",
      metrics: [
        "$30M+ realized revenue to date for the product line",
        "Won a strategic NVIDIA platform slot",
        "Owned feature and positioning decisions through launch and production ramp",
      ],
    },
    {
      title: "B2B Marketplace Co-Founding",
      company: "Trusty (formerly Glacier) · Co-Founder, product and technical · no longer operating",
      impact: "Shipped MVP with live Stripe purchase flow",
      description: "One of four co-founders of a B2B proptech marketplace for broker-sourced commercial real estate comparables. The original property-insights idea needed data that wasn't available in usable form, and brokers held comparable sale and lease data informally. I led discovery-to-roadmap work, translating broker conversations, task-based usability sessions, open demos, and competitive walkthroughs into requirements and prioritized search, reporting, and purchasing workflows, and handled architecture and implementation. The research informed three major pivots and the team shipped a working comparables marketplace.",
      metrics: [
        "25+ research participants, mostly target brokers, informed three pivots",
        "LOIs from 2-3 brokerages (demand signals, not paid customers)",
        "Contributed to a pre-seed round: $120K for 10% equity ($1.2M valuation); I did not close the round",
      ],
    },
  ];

  return (
    <div className="min-h-[calc(100vh-theme(spacing.16))]">
      <section className="py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="mb-6">Product Case Studies</h1>

          <p className="text-lg text-muted-foreground mb-12">
            Real-world examples of how I've driven product success through user research, strategic thinking, and cross-functional collaboration.
          </p>

          <div className="space-y-12">
            {caseStudies.map((study, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-lg p-8 hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                  <div>
                    <h2 className="mb-2">{study.title}</h2>
                    <p className="text-muted-foreground">{study.company}</p>
                  </div>
                  <div className="bg-gradient-to-br from-[#1fa2ff]/20 to-[#60b8ff]/20 text-[#1fa2ff] px-4 py-2 rounded-lg self-start">
                    {study.impact}
                  </div>
                </div>

                <p className="text-muted-foreground mb-6">{study.description}</p>

                <div className="grid sm:grid-cols-3 gap-4">
                  {study.metrics.map((metric, metricIndex) => (
                    <div
                      key={metricIndex}
                      className="flex items-start gap-3 bg-accent/50 rounded-lg p-4"
                    >
                      <BarChart className="text-[#1fa2ff] flex-shrink-0 mt-0.5" size={20} />
                      <span className="text-sm">{metric}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-accent/50 border border-border rounded-lg p-8">
            <h2 className="mb-6">My Approach to Product Development</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="w-10 h-10 bg-gradient-to-br from-[#1fa2ff]/20 to-[#60b8ff]/20 rounded-lg flex items-center justify-center mb-4">
                  <Users className="text-[#1fa2ff]" size={20} />
                </div>
                <h3 className="mb-2">User-Centered</h3>
                <p className="text-muted-foreground">
                  Start with deep user research and continuous feedback loops to ensure we're solving real problems.
                </p>
              </div>
              <div>
                <div className="w-10 h-10 bg-gradient-to-br from-[#1fa2ff]/20 to-[#60b8ff]/20 rounded-lg flex items-center justify-center mb-4">
                  <Target className="text-[#1fa2ff]" size={20} />
                </div>
                <h3 className="mb-2">Data-Driven</h3>
                <p className="text-muted-foreground">
                  Use metrics and analytics to validate hypotheses and make informed decisions at every stage.
                </p>
              </div>
              <div>
                <div className="w-10 h-10 bg-gradient-to-br from-[#1fa2ff]/20 to-[#60b8ff]/20 rounded-lg flex items-center justify-center mb-4">
                  <BarChart className="text-[#1fa2ff]" size={20} />
                </div>
                <h3 className="mb-2">Iterative</h3>
                <p className="text-muted-foreground">
                  Ship fast, learn quickly, and continuously improve based on real-world usage and feedback.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
