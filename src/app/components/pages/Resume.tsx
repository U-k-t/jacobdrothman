import { Link } from "react-router";
import { Briefcase, GraduationCap, Award } from "lucide-react";

export function Resume() {
  const experience = [
    {
      title: "Manager, Product Marketing",
      scope: "Product scope: Senior Product Manager",
      company: "Infineon Technologies",
      period: "Apr 2025 - Sep 2026",
      achievements: [
        "Product ownership and launch: owned feature and positioning decisions through launch and production ramp for an AI-infrastructure product line (semiconductor hardware), with customer requirements coming mainly from power-module makers and direct NVIDIA engineering. The line has generated $30M+ in realized revenue to date and won a strategic NVIDIA platform slot",
        "Analytics and adoption: improved internal CRM and analytics adoption 30% (active/licensed users) by writing documentation and training and standardizing workflows across teams",
        "Leadership communication: presented market and product priorities to senior leadership, informing division strategy and roadmap decisions",
      ],
    },
    {
      title: "Staff Specialist, Product Marketing",
      scope: "Product scope: Product Manager II",
      company: "Infineon Technologies",
      period: "Apr 2024 - Mar 2025",
      achievements: [
        "Roadmap and prioritization: coordinated prioritization and execution across 3 cross-functional product teams (leadership across teams, no direct reports), weighing customer demand, technical feasibility, and revenue impact",
        "Customer discovery: ran a Greater China discovery trip with 13 customer visits, observed customer design behavior, and turned it into a footprint-compatible larger-package roadmap input. Identified $55M+ in CRM pipeline value (pipeline, not recognized revenue)",
      ],
    },
    {
      title: "Senior Engineer, Product Marketing",
      scope: "Product scope: Product Manager I",
      company: "Infineon Technologies",
      period: "Nov 2022 - Mar 2024",
      achievements: [
        "Translated market requirements into 5 product concepts with $120M+ in aggregate projected five-year revenue (projections; the concepts were not greenlit)",
        "Used funnel and portfolio analysis to find conversion gaps, sunset underperforming features, and prioritize higher-ROI opportunities",
      ],
    },
    {
      title: "Product Marketing Specialist (Infineon Graduate Program)",
      scope: "Product scope: Associate Product Manager",
      company: "Infineon Technologies",
      period: "Jun 2021 - Nov 2022",
      achievements: [
        "Synthesized customer and stakeholder interviews into product requirements and roadmap recommendations, and built Excel/Tableau KPI dashboards used by 6 teams to monitor launches and inform roadmap decisions",
        "Built a Python automation that prompted account managers on all overdue opportunities instead of only the top 10 per division. Users estimated the weekly process fell from roughly six hours to 30 minutes",
      ],
    },
    {
      title: "Co-Founder",
      scope: "Product and technical lead, including architecture and implementation; one of four co-founders",
      company: "Trusty (formerly Glacier)",
      period: "Mar 2020 - Sep 2021",
      achievements: [
        "Discovery and MVP: co-founded a B2B proptech marketplace for broker-sourced comparables. Broker conversations, usability sessions, open demos, and competitive walkthroughs with 25+ participants informed three major pivots and a prioritized MVP with search, reporting, and a live Stripe purchase flow for early adopters",
        "Led early GTM outreach that produced LOIs from 2-3 brokerages (demand signals, not paid customers). The work contributed to a pre-seed round of $120K for 10% equity ($1.2M valuation); I did not close the round",
      ],
    },
  ];

  const education = [
    {
      degree: "BS, Computer Science, Minor in Entrepreneurship and Business Management",
      school: "California State Polytechnic University, Pomona",
      year: "",
    },
  ];

  const skills = {
    "Product": [
      "Roadmapping & Prioritization",
      "Customer Discovery",
      "Requirements & Launch",
      "Stakeholder Management",
    ],
    "Data & Technical": [
      "SQL",
      "Python",
      "Excel / VBA",
      "Tableau",
      "Funnel Analysis",
      "Systems Design",
    ],
  };

  return (
    <div className="min-h-[calc(100vh-theme(spacing.16))]">
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="mb-4">Resume</h1>
          <p className="text-lg text-muted-foreground mb-12">
            Product leader with 5+ years owning roadmap and prioritization decisions, customer discovery, and launches at Infineon. Computer Science degree, plus startup experience as a co-founder. Moving into software product management.
          </p>

          <div className="space-y-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-[#1fa2ff]/20 to-[#60b8ff]/20 rounded-lg flex items-center justify-center">
                  <Briefcase className="text-[#1fa2ff]" size={20} />
                </div>
                <h2>Experience</h2>
              </div>
              <p className="text-sm text-muted-foreground mb-6">
                Official titles are shown as headings. "Product scope" is my own mapping of each role to product management levels, not a title I held.{" "}
                <Link to="/work" className="text-[#1fa2ff] hover:underline">See the work behind it</Link>.
              </p>
              <div className="space-y-8">
                {experience.map((job, index) => (
                  <div key={index} className="border-l-2 border-[#1fa2ff]/30 pl-6">
                    <h3 className="mb-1">{job.title}</h3>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-muted-foreground">{job.company}</span>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-sm text-muted-foreground">{job.period}</span>
                    </div>
                    {job.scope && (
                      <p className="text-sm text-muted-foreground/80 mb-3">{job.scope}</p>
                    )}
                    <ul className="space-y-2">
                      {job.achievements.map((achievement, achievementIndex) => (
                        <li
                          key={achievementIndex}
                          className="flex items-start gap-2 text-muted-foreground"
                        >
                          <span className="text-[#1fa2ff] mt-1">•</span>
                          <span>
                            {(() => {
                              const m = achievement.match(/^([^:]{3,32}): (.*)$/s);
                              return m ? (
                                <>
                                  <span className="text-foreground font-medium">{m[1]}:</span> {m[2]}
                                </>
                              ) : (
                                achievement
                              );
                            })()}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-[#1fa2ff]/20 to-[#60b8ff]/20 rounded-lg flex items-center justify-center">
                  <GraduationCap className="text-[#1fa2ff]" size={20} />
                </div>
                <h2>Education</h2>
              </div>
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <div key={index} className="border-l-2 border-[#1fa2ff]/30 pl-6">
                    <h3 className="mb-1">{edu.degree}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">{edu.school}</span>
                      {edu.year && (
                        <>
                          <span className="text-muted-foreground">•</span>
                          <span className="text-sm text-muted-foreground">{edu.year}</span>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-[#1fa2ff]/20 to-[#60b8ff]/20 rounded-lg flex items-center justify-center">
                  <Award className="text-[#1fa2ff]" size={20} />
                </div>
                <h2>Skills</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {Object.entries(skills).map(([category, skillList]) => (
                  <div key={category} className="bg-card border border-border rounded-lg p-6">
                    <h3 className="mb-3">{category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {skillList.map((skill) => (
                        <span
                          key={skill}
                          className="bg-accent px-3 py-1 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
