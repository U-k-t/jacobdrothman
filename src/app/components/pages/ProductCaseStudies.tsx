import { Users, Target, BarChart } from "lucide-react";

export function ProductCaseStudies() {
  const caseStudies = [
    {
      title: "AI Infrastructure Product Launch",
      company: "Infineon Technologies",
      impact: "$30M+ revenue generated",
      description: "Owned the product roadmap for a line of components serving AI infrastructure customers at Infineon Technologies. Translated customer requirements into feature and positioning decisions, then worked cross-functionally with engineering and go-to-market teams to take the product from requirements through launch — a requirements-to-roadmap-to-launch process that applies just as directly to software products.",
      metrics: [
        "$30M+ revenue generated",
        "20%+ adoption increase in a high-growth market",
        "Directly informed division roadmap strategy",
      ],
    },
    {
      title: "B2B Marketplace Co-Founding",
      company: "Trusty (formerly Glacier)",
      impact: "$1.2M in seed funding",
      description: "Co-founded a B2B proptech marketplace for broker-sourced comparables, enabling listing discovery and purchase workflows for commercial real estate professionals. Owned the discovery-to-roadmap process end to end — translating broker research into requirements and prioritized feature concepts, then running experiments and journey analysis to validate needs and guide pivots.",
      metrics: [
        "Led product from 0-to-1 as a co-founder",
        "$1.2M in VC funding, informed by early GTM traction",
        "Broker research directly shaped the product roadmap",
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
