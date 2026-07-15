import { Users, Target, BarChart } from "lucide-react";

export function ProductCaseStudies() {
  const caseStudies = [
    {
      title: "Mobile App Redesign",
      company: "FinTech Startup",
      impact: "150% increase in user engagement",
      description: "Led a complete mobile app redesign based on extensive user research and data analysis. Collaborated with design and engineering to deliver a seamless experience.",
      metrics: [
        "150% increase in daily active users",
        "40% reduction in support tickets",
        "4.8 star rating on app stores",
      ],
    },
    {
      title: "B2B SaaS Platform Launch",
      company: "Enterprise Software Company",
      impact: "$2M ARR in first year",
      description: "Defined product vision and go-to-market strategy for a new B2B platform. Coordinated cross-functional teams through beta, launch, and iteration phases.",
      metrics: [
        "$2M ARR within 12 months",
        "25 enterprise customers onboarded",
        "95% customer satisfaction score",
      ],
    },
    {
      title: "AI-Powered Feature Suite",
      company: "Marketing Tech Platform",
      impact: "35% improvement in user retention",
      description: "Championed the integration of AI capabilities to automate repetitive tasks. Balanced innovation with user trust and transparency.",
      metrics: [
        "35% improvement in user retention",
        "60% reduction in time to complete key tasks",
        "Featured in industry publications",
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
