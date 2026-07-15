import { Github, ExternalLink } from "lucide-react";

export function SoftwareProjects() {
  const projects = [
    {
      title: "Product Analytics Dashboard",
      tech: "React, TypeScript, D3.js, PostgreSQL",
      description: "Built an internal analytics dashboard to track product metrics and user behavior. Enabled the team to make data-driven decisions without relying on external tools.",
      features: [
        "Real-time user activity tracking",
        "Customizable metric visualization",
        "Cohort analysis and retention reports",
        "Export functionality for presentations",
      ],
      github: "https://github.com",
      demo: "https://example.com",
    },
    {
      title: "Customer Feedback Aggregator",
      tech: "Python, FastAPI, React, MongoDB",
      description: "Automated tool that aggregates customer feedback from multiple sources (support tickets, surveys, social media) and surfaces insights using sentiment analysis.",
      features: [
        "Multi-source data integration",
        "Sentiment analysis with ML",
        "Trend detection and alerting",
        "Customizable tagging system",
      ],
      github: "https://github.com",
    },
    {
      title: "Sprint Planning Assistant",
      tech: "Node.js, Express, Vue.js, Jira API",
      description: "Chrome extension that helps teams estimate story points more accurately using historical data and team velocity patterns.",
      features: [
        "Historical velocity analysis",
        "Smart story point suggestions",
        "Capacity planning tools",
        "Jira integration",
      ],
      github: "https://github.com",
    },
  ];

  return (
    <div className="min-h-[calc(100vh-theme(spacing.16))]">
      <section className="py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="mb-6">Software Projects</h1>

          <p className="text-lg text-muted-foreground mb-12">
            Side projects and tools I've built to solve real problems. My technical background helps me bridge the gap between product vision and engineering reality.
          </p>

          <div className="space-y-10">
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-lg p-8 hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div>
                    <h2 className="mb-2">{project.title}</h2>
                    <p className="text-sm text-muted-foreground">{project.tech}</p>
                  </div>
                  <div className="flex gap-3">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm border border-border px-4 py-2 rounded-lg hover:bg-accent transition-colors"
                      >
                        <Github size={16} />
                        Code
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm bg-gradient-to-r from-[#1fa2ff] to-[#60b8ff] text-white px-4 py-2 rounded-lg hover:shadow-md transition-all"
                      >
                        <ExternalLink size={16} />
                        Demo
                      </a>
                    )}
                  </div>
                </div>

                <p className="text-muted-foreground mb-6">{project.description}</p>

                <div>
                  <h3 className="mb-3">Key Features</h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {project.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <span className="text-[#1fa2ff] mt-1">→</span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-accent/50 border border-border rounded-lg p-8">
            <h2 className="mb-4">Why I Code</h2>
            <p className="text-muted-foreground mb-4">
              My engineering background gives me a unique advantage as a product manager. I can:
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-[#1fa2ff] mt-1">•</span>
                <span>Have technical discussions with engineering teams in their language</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#1fa2ff] mt-1">•</span>
                <span>Make realistic scope and timeline estimates</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#1fa2ff] mt-1">•</span>
                <span>Prototype solutions quickly to test ideas</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#1fa2ff] mt-1">•</span>
                <span>Understand technical constraints and trade-offs</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#1fa2ff] mt-1">•</span>
                <span>Build internal tools when off-the-shelf solutions don't fit</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
