// Single source of truth for the Work hub and case-study pages.
// Every entry answers the same five questions: problem, role, decision, shipped, result.

export type WorkEntry = {
  heading?: string; // only needed when a case study holds several distinct initiatives
  keyResult?: string; // one-line result for the jump index on multi-initiative pages
  problem: string;
  role: string;
  decision: string;
  shipped: string;
  result: string[];
};

export type CaseStudy = {
  slug: string;
  title: string;
  org: string;
  tag: string;
  summary: string; // one line for the hub card
  headline: string; // lead result shown on the hub card
  note?: string;
  entries: WorkEntry[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "ai-infrastructure-launch",
    title: "AI-infrastructure product launch",
    org: "Infineon Technologies · Product Marketing (semiconductor hardware)",
    tag: "Commercial scale",
    summary:
      "Took over a power-component program for AI servers and chose the launch path that fit the customer's timeline.",
    headline: "$30M+ realized revenue to date",
    note: "The product is semiconductor hardware, not AI software. The work will be familiar to software PMs: reconciling customer requirements into roadmap and launch tradeoffs.",
    entries: [
      {
        problem:
          "Customer requirements for AI-server power components were moving faster than the existing roadmap, and I inherited the program after its prior owner left.",
        role:
          "I synthesized requirements from power-module makers and direct NVIDIA engineering, set specification and package priorities, and defended roadmap capacity. This was a project within a broader program owned by my manager.",
        decision:
          "Choose the technology that was available and fit the customer's launch window over waiting for a more mature generation, balancing efficiency requirements against feasibility.",
        shipped:
          "The product launched and ramped to production. I owned the feature and positioning decisions through both.",
        result: [
          "$30M+ realized revenue to date for the product line",
          "Won a strategic NVIDIA platform slot",
        ],
      },
    ],
  },
  {
    slug: "trusty-marketplace",
    title: "B2B marketplace for broker-sourced comps",
    org: "Trusty (formerly Glacier) · Co-Founder, product and technical · no longer operating",
    tag: "0 → 1",
    summary:
      "Co-founded a commercial real estate comps marketplace and let broker research drive three pivots.",
    headline: "Shipped an MVP with a live Stripe purchase flow",
    entries: [
      {
        problem:
          "The original property-insights idea needed commercial real estate data that wasn't available in usable form. Brokers held comparable sale and lease data informally.",
        role:
          "One of four co-founders. I led discovery-to-roadmap work and handled architecture and implementation.",
        decision:
          "Follow what brokers said and did in conversations, task-based usability sessions, open demos, and competitive walkthroughs, which led to three pivots: from property insights to listings to broker-sourced comparables. Prioritize search, reporting, and purchasing workflows.",
        shipped:
          "A working comparables marketplace MVP with search, reporting, and a live Stripe purchase flow for early adopters.",
        result: [
          "Shipped an MVP with search, reporting, and a live Stripe purchase flow for early adopters",
          "25+ research participants, mostly target brokers, informed three pivots",
          "LOIs from 2-3 brokerages (demand signals, not paid customers)",
          "Contributed to a pre-seed round: $120K for 10% equity ($1.2M valuation). I did not close the round.",
        ],
      },
    ],
  },
  {
    slug: "product-operations",
    title: "Scaling product operations",
    org: "Infineon Technologies · Product Marketing",
    tag: "Product operations & automation",
    summary:
      "Automation, reporting, and adoption work that gave product teams back time and a shared view of the business. Four separate initiatives, each with its own users and results.",
    headline: "30% higher CRM and analytics adoption",
    note: "These are distinct initiatives with separate users and metrics. Time savings are user estimates, not controlled studies.",
    entries: [
      {
        heading: "Overdue-opportunity outreach automation (Python)",
        keyResult: "Outreach coverage grew from the top 10 per division to the full overdue set",
        problem:
          "Manual outreach limited operations to contacting the top 10 overdue opportunities per division, so most were never followed up.",
        role: "I identified the bottleneck independently and built the automation myself, during the Infineon graduate program.",
        decision:
          "Automate outreach so it could cover the full overdue set, not just the top 10 per division.",
        shipped:
          "A Python automation that contacts account managers, prompting date updates or design-win confirmation.",
        result: [
          "Coverage expanded from the top accounts to the full overdue set",
          "Users estimated the weekly process fell from roughly six hours to 30 minutes (about 92% less time)",
        ],
      },
      {
        heading: "Excel VBA reporting tool",
        keyResult: "Adopted by 5 PMs",
        problem:
          "Product managers spent a large share of their time preparing funnel and distribution data for analysis.",
        role: "I built the tool.",
        decision:
          "Consolidate funnel and distribution data in one tool, segmented by region and filterable by use case.",
        shipped: "An Excel VBA tool that consolidated funnel and distribution data.",
        result: [
          "Adopted by 5 PMs",
          "Users estimated 10+ hours saved weekly and 95% less analysis prep time",
        ],
      },
      {
        heading: "Excel/Tableau KPI dashboards",
        keyResult: "Used by 6 teams to monitor launches",
        problem:
          "Teams needed a shared view of product KPIs and launch performance, and it was hard to spot deviations or products with high pipeline but low revenue.",
        role: "I consolidated the product KPIs into Excel/Tableau dashboards and used them to surface deviations and products with high pipeline but low revenue.",
        decision:
          "Centralize product KPIs into a shared view, so deviations and high-pipeline, low-revenue products were visible in one place.",
        shipped: "Excel/Tableau dashboards that consolidated product KPIs and launch performance.",
        result: [
          "Used by 6 teams to monitor launches and inform roadmap decisions",
          "Surfaced products with high pipeline but low revenue",
        ],
      },
      {
        heading: "CRM and analytics adoption",
        keyResult: "30% increase in adoption (active and licensed users)",
        problem:
          "Teams used Infineon's Microsoft Dynamics CRM and Power BI in different ways. Inconsistent processes and unclear best practices created friction and data-quality problems.",
        role:
          "I interviewed stakeholders, reviewed usage data, and wrote the documentation and training. I did not build Dynamics or Power BI.",
        decision: "Standardize how teams use the existing platforms and document best practices.",
        shipped: "Documentation, training, clarified best practices, and standardized workflows across teams.",
        result: [
          "30% increase in adoption, based on active and licensed user counts",
        ],
      },
    ],
  },
];

export type SideProject = {
  title: string;
  tech: string;
  description: string;
};

// Secondary to the case studies. Only projects with supported facts belong here.
export const sideProjects: SideProject[] = [
  {
    title: "Fountain",
    tech: "Python, Discord API, Raspberry Pi, systemd · built with Claude Code · July 2026",
    description:
      "An apartment availability and rent-change monitor I built for my partner and me during an active rental search. It checks listings hourly, compares each run to the previous snapshot, and sends Discord alerts when availability or rent changes. It runs continuously on a Raspberry Pi via a systemd timer.",
  },
];

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);
