import { Briefcase, GraduationCap, Award } from "lucide-react";

export function Resume() {
  const experience = [
    {
      title: "Manager, Product Marketing",
      scope: "Role scope: Senior Product Manager level (translated title, not the official one)",
      company: "Infineon Technologies",
      period: "Apr 2025 - Sep 2026",
      achievements: [
        "Owned feature and positioning decisions through launch and production ramp for an AI-infrastructure product line (semiconductor hardware), with customer requirements coming mainly from power-module makers and direct NVIDIA engineering. The line has generated $30M+ in realized revenue to date and won a strategic NVIDIA platform slot",
        "Improved internal CRM and analytics adoption 30% (active/licensed users) by identifying stakeholder friction, writing documentation and training, and standardizing workflows across teams",
        "Presented market and product priorities to senior leadership, informing division strategy and roadmap decisions",
      ],
    },
    {
      title: "Staff Specialist, Product Marketing",
      scope: "Role scope: Product Manager II level (translated title, not the official one)",
      company: "Infineon Technologies",
      period: "Apr 2024 - Mar 2025",
      achievements: [
        "Coordinated roadmap prioritization and execution across 3 cross-functional product teams (leadership across teams, no direct reports)",
        "Ran a Greater China discovery trip with 13 customer visits, observed customer design behavior, and turned it into a footprint-compatible larger-package roadmap input. Identified $55M+ in CRM pipeline value (pipeline, not recognized revenue)",
        "Prioritized roadmap initiatives across customer demand, technical feasibility, and revenue impact",
      ],
    },
    {
      title: "Senior Engineer, Product Marketing",
      scope: "Role scope: Product Manager I level (translated title, not the official one)",
      company: "Infineon Technologies",
      period: "Nov 2022 - Mar 2024",
      achievements: [
        "Translated market requirements into 5 product concepts with $120M+ in aggregate projected five-year revenue (projections; the concepts were not greenlit)",
        "Analyzed funnel performance to identify conversion gaps and guide product improvements",
        "Conducted portfolio analysis to sunset underperforming features and prioritize high-ROI opportunities",
      ],
    },
    {
      title: "Product Marketing Specialist (Infineon Graduate Program)",
      scope: "Role scope: Associate Product Manager level (translated title, not the official one)",
      company: "Infineon Technologies",
      period: "Jun 2021 - Nov 2022",
      achievements: [
        "Built a Python automation that prompted account managers on the full set of overdue opportunities instead of only the top 10 per division. Users estimated the weekly process fell from roughly six hours to 30 minutes",
        "Built an Excel VBA reporting tool adopted by 5 PMs; users estimated it saved 10+ hours per week",
        "Built Excel/Tableau KPI dashboards used by 6 teams to monitor launches and inform roadmap decisions",
        "Synthesized customer and stakeholder interviews into product requirements and roadmap recommendations",
      ],
    },
    {
      title: "Co-Founder",
      scope: "Product and technical lead, including architecture and implementation; one of four co-founders",
      company: "Trusty (formerly Glacier)",
      period: "Mar 2020 - Sep 2021",
      achievements: [
        "Co-founded a B2B proptech marketplace for broker-sourced comparables and shipped an MVP with search, reporting, and a live Stripe purchase flow for early adopters",
        "Led discovery-to-roadmap work, translating broker research into requirements, user stories, and prioritized search, reporting, and purchasing workflows",
        "Ran broker conversations, task-based usability sessions, open demos, and competitive walkthroughs with 25+ participants, which informed three major pivots",
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
      "Strategy",
      "Roadmapping & Prioritization",
      "User Research",
      "Requirements",
      "Stakeholder Management",
      "Success Metrics",
    ],
    "Technical": [
      "Python",
      "JavaScript",
      "API Design",
      "Systems Design",
      "Cloud (AWS, Azure, GCP)",
      "Git",
      "Jira",
    ],
    "Data Analysis": [
      "SQL",
      "Excel",
      "Dashboarding (Tableau, PowerBI)",
      "Funnel Analysis",
    ],
  };

  return (
    <div className="min-h-[calc(100vh-theme(spacing.16))]">
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="mb-12">Resume</h1>

          <div className="space-y-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-[#1fa2ff]/20 to-[#60b8ff]/20 rounded-lg flex items-center justify-center">
                  <Briefcase className="text-[#1fa2ff]" size={20} />
                </div>
                <h2>Experience</h2>
              </div>
              <div className="space-y-8">
                {experience.map((job, index) => (
                  <div key={index} className="border-l-2 border-[#1fa2ff]/30 pl-6">
                    <h3 className="mb-1">{job.title}</h3>
                    {job.scope && (
                      <p className="text-sm text-muted-foreground mb-1">{job.scope}</p>
                    )}
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="text-muted-foreground">{job.company}</span>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-sm text-muted-foreground">{job.period}</span>
                    </div>
                    <ul className="space-y-2">
                      {job.achievements.map((achievement, achievementIndex) => (
                        <li
                          key={achievementIndex}
                          className="flex items-start gap-2 text-muted-foreground"
                        >
                          <span className="text-[#1fa2ff] mt-1">•</span>
                          <span>{achievement}</span>
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
              <div className="grid md:grid-cols-3 gap-6">
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
