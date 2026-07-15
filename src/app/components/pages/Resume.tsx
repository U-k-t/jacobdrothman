import { Briefcase, GraduationCap, Award } from "lucide-react";

export function Resume() {
  const experience = [
    {
      title: "Senior Product Manager",
      company: "Infineon Technologies",
      period: "Apr 2025 - Present",
      achievements: [
        "Launched AI infrastructure product solutions generating $30M+ revenue by translating customer requirements into roadmap, feature, and positioning decisions",
        "Defined product strategy and prioritized customer-driven improvements that increased adoption 20%+ in a high-growth market",
        "Improved internal CRM workflow adoption 30% by identifying stakeholder friction, standardizing processes, and enabling users across teams",
        "Presented market and product priorities to senior leadership, informing division strategy and roadmap decisions",
      ],
    },
    {
      title: "Product Manager II",
      company: "Infineon Technologies",
      period: "Apr 2024 - Mar 2025",
      achievements: [
        "Led 3 product teams through roadmap prioritization and execution across $25M+ in annual revenue initiatives",
        "Reallocated resources from underperforming segments to drive eight-figure incremental revenue growth",
        "Prioritized roadmap initiatives across customer demand, technical feasibility, and revenue impact",
      ],
    },
    {
      title: "Product Manager I",
      company: "Infineon Technologies",
      period: "Dec 2022 - Mar 2024",
      achievements: [
        "Translated market requirements into 5 product concepts projecting $120M+ revenue, influencing roadmap prioritization",
        "Analyzed funnel performance to identify conversion gaps, prioritize experiments, and guide product improvements",
        "Conducted portfolio analysis to sunset underperforming features and prioritize high-ROI opportunities",
      ],
    },
    {
      title: "Associate Product Manager",
      company: "Infineon Technologies",
      period: "Jun 2021 - Nov 2022",
      achievements: [
        "Built Python reporting automation, reducing manual analysis 10+ hours/week and improving performance tracking",
        "Built KPI dashboards for 6 teams to track adoption, monitor product performance, and inform roadmap decisions",
        "Synthesized customer and stakeholder interviews into product requirements and roadmap recommendations",
      ],
    },
    {
      title: "Co-Founder",
      company: "Trusty (formerly Glacier)",
      period: "Mar 2020 - Sep 2021",
      achievements: [
        "Co-founded B2B proptech marketplace for broker-sourced comparables, enabling listing discovery and purchase workflows",
        "Led discovery-to-roadmap process, translating broker research into requirements, user stories, and prioritized feature concepts",
        "Ran discovery experiments, A/B tests, and journey analysis to validate broker needs and guide product pivots",
        "Led early GTM outreach, securing adopter validation and investor interest contributing to $1.2M VC funding",
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
