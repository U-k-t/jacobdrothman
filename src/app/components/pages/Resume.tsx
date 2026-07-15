import { Download, Briefcase, GraduationCap, Award } from "lucide-react";

export function Resume() {
  const experience = [
    {
      title: "Senior Product Manager",
      company: "Tech Company Inc.",
      period: "2022 - Present",
      achievements: [
        "Led product strategy for flagship B2B platform serving 100+ enterprise clients",
        "Increased user retention by 35% through AI-powered feature development",
        "Managed cross-functional team of 12 engineers, designers, and data analysts",
        "Launched 3 major product initiatives generating $5M in new ARR",
      ],
    },
    {
      title: "Product Manager",
      company: "FinTech Startup",
      period: "2020 - 2022",
      achievements: [
        "Drove mobile app redesign that increased DAU by 150%",
        "Implemented data-driven A/B testing framework across all product teams",
        "Reduced customer support tickets by 40% through UX improvements",
        "Built and maintained product roadmap aligned with company OKRs",
      ],
    },
    {
      title: "Associate Product Manager",
      company: "E-commerce Platform",
      period: "2018 - 2020",
      achievements: [
        "Owned checkout flow optimization, increasing conversion rate by 22%",
        "Conducted user research and competitive analysis for new market expansion",
        "Collaborated with engineering to reduce page load times by 45%",
        "Launched seller tools that onboarded 500+ new merchants",
      ],
    },
  ];

  const education = [
    {
      degree: "MBA, Technology Management",
      school: "University Name",
      year: "2018",
    },
    {
      degree: "BS, Computer Science",
      school: "University Name",
      year: "2014",
    },
  ];

  const skills = {
    "Product Management": [
      "Product Strategy",
      "Roadmap Planning",
      "User Research",
      "A/B Testing",
      "Analytics",
      "Agile/Scrum",
    ],
    "Technical": [
      "SQL",
      "Python",
      "JavaScript",
      "React",
      "APIs",
      "Git",
    ],
    "Tools": [
      "Jira",
      "Figma",
      "Mixpanel",
      "Amplitude",
      "Looker",
      "Notion",
    ],
  };

  return (
    <div className="min-h-[calc(100vh-theme(spacing.16))]">
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-12">
            <h1>Resume</h1>
            <button className="flex items-center gap-2 bg-gradient-to-r from-[#1fa2ff] to-[#60b8ff] text-white px-6 py-3 rounded-lg hover:shadow-lg hover:shadow-[#1fa2ff]/25 transition-all self-start">
              <Download size={20} />
              Download PDF
            </button>
          </div>

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
                      <span className="text-muted-foreground">•</span>
                      <span className="text-sm text-muted-foreground">{edu.year}</span>
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
