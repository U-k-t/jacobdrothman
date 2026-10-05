// Single source of truth for the Work hub and case-study pages.
// Every entry follows the PM case-study format:
// problem, role (mine vs. team), key decision/tradeoff, what I did, result, what I learned, optional hindsight.

export type WorkEntry = {
  heading?: string; // only needed when a case study holds several distinct initiatives
  keyResult?: string; // one-line result for the jump index on multi-initiative pages
  problem: string;
  role: {
    mine: string; // what I personally owned
    team?: string; // what others owned or contributed
  };
  tradeoff: string; // the call I made and what it traded against, in one statement
  did: string; // what I did
  result: string[];
  learned: string; // a product lesson specific to what happened
  differently?: string; // optional: only where the source supports real hindsight
};

// Any text in "[Question: ...]" brackets is a fact only I can supply. It renders as a visible
// to-do. Answer it or delete it before publishing; do not guess at facts the source doesn't support.

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
        role: {
          mine:
            "I owned this project within the program: synthesizing customer requirements, setting specification and package priorities, defending roadmap capacity, and the feature and positioning decisions through launch and ramp.",
          team:
            "The broader program was owned by my manager. [Question: which teams designed, qualified, and manufactured the product, and what did each own? One line per team is enough.]",
        },
        tradeoff:
          "I chose to launch with the technology that was available and fit the customer's launch window rather than wait for the more mature generation, balancing the customer's efficiency requirements against feasibility. [Question: what concrete downside did launching with the available technology accept, and how did the customer respond to it?]",
        did:
          "Gathered requirements from module partners and the customer's engineers directly, set the specification and package priorities, and defended roadmap capacity. The product launched and ramped to production.",
        result: [
          "$30M+ realized revenue to date for the product line",
          "Won a strategic NVIDIA platform slot",
        ],
        learned:
          "The customer's launch window was the binding constraint, and the product that fit it won the platform slot. [Question: what did talking directly to the customer's engineers tell you that feedback from the module makers alone did not?]",
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
        role: {
          mine:
            "I led discovery-to-roadmap work and owned architecture and implementation.",
          team:
            "One of four co-founders. [Question: what did the other three co-founders own (for example sales, fundraising, broker relationships)?] I contributed to the pre-seed round but did not close it.",
        },
        tradeoff:
          "I let what brokers said and did, not our original idea, set direction. That led to three pivots, including the path from property insights to listings to broker-sourced comparables, and a roadmap focused on search, reporting, and purchasing workflows.",
        did:
          "Ran discovery through conversations, task-based usability sessions, open demos, and competitive walkthroughs, then turned findings into the roadmap. Built a working comparables marketplace MVP with search, reporting, and a live Stripe purchase flow for early adopters.",
        result: [
          "Shipped an MVP with search, reporting, and a live Stripe purchase flow for early adopters",
          "25+ research participants, mostly target brokers, informed three pivots",
          "LOIs from 2-3 brokerages (demand signals, not paid customers)",
          "Contributed to a pre-seed round: $120K for 10% equity ($1.2M valuation). I did not close the round.",
        ],
        learned:
          "The data we needed lived informally with brokers rather than in any usable dataset, so the product had to start from what brokers already held. [Question: what was the single most surprising thing brokers told you or did in a session, and which pivot did it trigger?]",
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
        role: {
          mine:
            "I spotted the bottleneck on my own and built the automation myself, during the Infineon graduate program.",
          team:
            "Account managers were the recipients and acted on the prompts. [Question: who owned the manual process before, and who approved rolling out the automation?]",
        },
        tradeoff:
          "I automated outreach to cover the full overdue set instead of continuing to prioritize the top 10 per division. [Question: did covering the full set have any downside, such as more messages reaching account managers? Say so only if it actually came up.]",
        did:
          "Built a Python automation that contacts account managers, prompting date updates or design-win confirmation.",
        result: [
          "Coverage expanded from the top accounts to the full overdue set",
          "Users estimated the weekly process fell from roughly six hours to 30 minutes (about 92% less time)",
        ],
        learned:
          "The top-10 cutoff came from manual capacity, so the fix was to remove the capacity limit rather than refine the ranking.",
      },
      {
        heading: "Excel VBA reporting tool",
        keyResult: "Adopted by 5 PMs",
        problem:
          "Product managers spent a large share of their time preparing funnel and distribution data for analysis.",
        role: {
          mine: "I built the tool.",
          team:
            "Five PMs adopted and used it. [Question: did someone request it, and who supplied or owned the source data?]",
        },
        tradeoff:
          "I consolidated funnel and distribution data into one tool, segmented by region and filterable by use case, instead of leaving each PM to prepare it separately.",
        did: "Built an Excel VBA tool that consolidated funnel and distribution data.",
        result: [
          "Adopted by 5 PMs",
          "Users estimated 10+ hours saved weekly and 95% less analysis prep time",
        ],
        learned:
          "The time cost was in preparing the data, not analyzing it, so a shared, filterable view removed most of the work.",
      },
      {
        heading: "Excel/Tableau KPI dashboards",
        keyResult: "Used by 6 teams to monitor launches",
        problem:
          "Teams needed a shared view of product KPIs and launch performance, and it was hard to spot deviations or products with high pipeline but low revenue.",
        role: {
          mine:
            "I consolidated the product KPIs into Excel/Tableau dashboards and used them to surface deviations and products with high pipeline but low revenue.",
          team:
            "Six teams used the dashboards to monitor launches. [Question: who owned the underlying data sources the dashboards drew on?]",
        },
        tradeoff:
          "I centralized product KPIs into one shared view so deviations and high-pipeline, low-revenue products were visible in one place.",
        did: "Built Excel/Tableau dashboards that consolidated product KPIs and launch performance.",
        result: [
          "Used by 6 teams to monitor launches and inform roadmap decisions",
          "Surfaced products with high pipeline but low revenue",
        ],
        learned:
          "Pipeline and revenue need to be read together: products with high pipeline but low revenue were hard to spot until the KPIs sat in one view.",
      },
      {
        heading: "CRM and analytics adoption",
        keyResult: "30% increase in adoption (active and licensed users)",
        problem:
          "Teams used Infineon's Microsoft Dynamics CRM and Power BI in different ways. Inconsistent processes and unclear best practices created friction and data-quality problems.",
        role: {
          mine:
            "I interviewed stakeholders, reviewed usage data, and wrote the documentation and training.",
          team:
            "I did not build Dynamics or Power BI. [Question: who owned the platforms, and who ran or attended the training?]",
        },
        tradeoff:
          "I standardized how teams use the existing platforms and documented best practices.",
        did: "Wrote documentation and training, clarified best practices, and standardized workflows across teams.",
        result: [
          "30% increase in adoption, based on active and licensed user counts",
        ],
        learned:
          "The problem was inconsistent use of tools that already existed, so the lever was shared practice and training rather than new functionality.",
      },
    ],
  },
];

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);
