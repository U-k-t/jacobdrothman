import { Link } from "react-router";
import { ArrowRight, Linkedin, FileText } from "lucide-react";

const LINKEDIN_URL = "https://www.linkedin.com/in/jacob-rothman/";

const stats = [
  { value: "5+ yrs", label: "Product experience, Infineon 2021 – 2026" },
  { value: "$30M+", label: "Realized revenue to date from an AI-infrastructure hardware product line" },
  { value: "30%", label: "Increase in internal CRM and analytics adoption (active/licensed users)" },
  { value: "25+", label: "Research participants in Trusty discovery, mostly target brokers" },
];

// Cards read as a progression: scale, then 0-to-1, then internal tooling.
// To swap the last card for a software project (e.g. Fountain), replace its
// object below. Every field is plain data, so no layout changes are needed.
const featured = [
  {
    stage: "Commercial scale",
    title: "AI-infrastructure product line",
    org: "Infineon · Product Marketing (semiconductor hardware)",
    context:
      "Inherited a program whose customer requirements were moving faster than the roadmap. Requirements came mainly from power-module makers, plus direct NVIDIA engineering.",
    decision:
      "Chose the technology that was available and fit the customer's launch window over waiting for a more mature generation, balancing efficiency requirements against feasibility.",
    outcomes: [
      "$30M+ realized revenue to date",
      "Won a strategic NVIDIA platform slot",
      "Owned feature and positioning decisions through launch and production ramp",
    ],
  },
  {
    stage: "0 → 1",
    title: "B2B marketplace for broker-sourced comps",
    org: "Trusty (formerly Glacier) · Co-Founder, product and technical · no longer operating",
    context:
      "The original property-insights idea needed commercial real estate data that wasn't available in usable form. Brokers held comparable sale and lease data informally.",
    decision:
      "Broker interviews, task-based usability sessions, and competitive walkthroughs drove three pivots, from property insights to listings to comparables.",
    outcomes: [
      "Shipped an MVP with search, reporting, and a live Stripe purchase flow",
      "Signed LOIs from 2–3 brokerages (demand signals, not paid customers)",
      "Contributed to a pre-seed round: $120K for 10% equity",
    ],
  },
  {
    stage: "Internal tools",
    title: "Three separate internal builds",
    org: "Infineon · Product Marketing · each build has its own users and results",
    context:
      "Not one project. A Python outreach automation, an Excel VBA reporting tool, and Excel/Tableau KPI dashboards, each built to remove a different manual step.",
    decision:
      "Python outreach automation: overdue-opportunity outreach was limited to the top 10 per division because it took too long by hand, so I automated it to reach the full overdue set.",
    outcomes: [
      "Python automation: coverage grew from top 10 per division to the full set; users estimated the weekly process fell from about six hours to 30 minutes",
      "Excel VBA reporting tool: adopted by 5 PMs; users estimated 10+ hours saved weekly",
      "Excel/Tableau KPI dashboards: used by 6 teams to monitor launches; no time-savings figure",
    ],
  },
];

const practices = [
  {
    title: "I watch what customers do",
    body: "On a Greater China trip with 13 customer visits, I observed how engineers actually designed, and that surfaced a footprint-compatible larger-package requirement that interviews alone hadn't.",
  },
  {
    title: "I close out work that stopped paying off",
    body: "When a customer switched parts, I reassessed the product, cut scope, and closed it out instead of finishing it.",
  },
  {
    title: "I build when it's faster than asking",
    body: "At Trusty I handled architecture and implementation alongside product. At Infineon I wrote the Python and VBA tooling described above myself.",
  },
  {
    title: "I own the customer message during a problem",
    body: "During a roughly two-month production issue, I coordinated production, quality, and sales and owned customer communication while engineering and quality led the fix. On-time delivery protected a $10M+ at-risk opportunity.",
  },
];

export function Home() {
  return (
    <div className="min-h-[calc(100vh-theme(spacing.16))]">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1fa2ff]/10 via-transparent to-[#60b8ff]/5 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-28 relative">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-wider text-[#1fa2ff] mb-4">
              Jacob Rothman · Product management for B2B software and fintech
            </p>
            <h1 className="text-4xl lg:text-6xl mb-6 tracking-tight">
              CS-trained product manager who turns customer research into{" "}
              <span className="bg-gradient-to-r from-[#1fa2ff] to-[#60b8ff] bg-clip-text text-transparent">
                shipped products
              </span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
              5+ years owning roadmap, customer, and launch decisions for technical products at Infineon. Now focused on B2B software and fintech.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/portfolio/product-case-studies"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#1fa2ff] to-[#60b8ff] text-white px-6 py-3 rounded-lg hover:shadow-lg hover:shadow-[#1fa2ff]/25 transition-all"
              >
                View My Work
                <ArrowRight size={20} />
              </Link>
              <Link
                to="/resume"
                className="inline-flex items-center gap-2 border-2 border-[#1fa2ff] text-[#1fa2ff] px-6 py-3 rounded-lg hover:bg-[#1fa2ff]/10 transition-colors"
              >
                <FileText size={20} />
                Resume
              </Link>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border-2 border-border px-6 py-3 rounded-lg hover:bg-accent transition-colors"
              >
                <Linkedin size={20} />
                LinkedIn
              </a>
            </div>
          </div>

          <dl className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-14 max-w-5xl">
            {stats.map((stat) => (
              <div key={stat.label} className="border-l-2 border-[#1fa2ff]/40 pl-4">
                <dt className="text-2xl lg:text-3xl text-[#1fa2ff]">{stat.value}</dt>
                <dd className="text-sm text-muted-foreground mt-1">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
            <h2 className="text-3xl">Selected Work</h2>
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-1 text-[#1fa2ff] hover:gap-2 transition-all"
            >
              All work
              <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            {featured.map((item, index) => (
              <article
                key={item.title}
                className="bg-card border border-border rounded-lg p-6 flex flex-col hover:shadow-lg hover:border-[#1fa2ff]/30 transition-all"
              >
                <span className="self-start text-xs bg-gradient-to-br from-[#1fa2ff]/20 to-[#60b8ff]/20 text-[#1fa2ff] px-3 py-1 rounded-full mb-4">
                  {index + 1}. {item.stage}
                </span>
                <h3 className="mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{item.org}</p>
                <p className="text-muted-foreground mb-4">{item.context}</p>
                <p className="text-sm mb-5">
                  <span className="text-[#1fa2ff]">Decision: </span>
                  {item.decision}
                </p>
                <ul className="space-y-2 mt-auto">
                  {item.outcomes.map((outcome) => (
                    <li key={outcome} className="flex items-start gap-2 text-sm">
                      <span className="text-[#1fa2ff] mt-0.5">→</span>
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <div className="mt-8">
            <Link
              to="/portfolio/product-case-studies"
              className="inline-flex items-center gap-1 text-[#1fa2ff] hover:gap-2 transition-all"
            >
              Read the case studies
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl mb-10">How I Work</h2>
          <div className="grid md:grid-cols-2 gap-x-10 gap-y-8">
            {practices.map((p) => (
              <div key={p.title} className="border-l-2 border-[#1fa2ff]/30 pl-5">
                <h3 className="mb-2">{p.title}</h3>
                <p className="text-muted-foreground">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl mb-4">Get in touch</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            I'm looking for product roles in software, especially productivity and fintech. Get in touch to discuss a role or learn more about my work.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#1fa2ff] to-[#60b8ff] text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
            >
              Contact Me
              <ArrowRight size={20} />
            </Link>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border-2 border-[#1fa2ff] text-[#1fa2ff] px-6 py-3 rounded-lg hover:bg-[#1fa2ff]/10 transition-colors"
            >
              <Linkedin size={20} />
              LinkedIn
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
