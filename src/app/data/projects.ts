// Product projects shown on /work#projects and /work/projects/:slug.
// Ordered by maturity and real-world validation, not recency.
// Rules: no invented metrics, usage counts, or feedback. Public copy has no unresolved placeholders.
// Open items for the author (not rendered): Unmissable's 2022 tech stack is unverified, so it is omitted;
// add it to `stack` once confirmed. Lead time for the Neuschwanstein tickets is unknown, so none is stated.

export type ProductProject = {
  slug: string;
  title: string;
  tagline: string; // one line for the hub card
  maturity: string; // short badge on the card and page
  maturityNote?: string; // second line of status, e.g. a year
  userProblem: string[];
  targetUser: string;
  hypothesis: string;
  decisions: { decision: string; why: string }[];
  workflow: string[];
  usage: string[];
  next: { intro?: string; items: string[] };
  stack: string[]; // empty means the section is hidden
};

export const productProjects: ProductProject[] = [
  {
    slug: "fountain",
    title: "Fountain",
    tagline: "Checks one apartment building's inventory and rent every hour and pings me when something changes.",
    maturity: "Built and used",
    maturityNote: "Used during a real apartment search",
    userProblem: [
      "Apartment hunting meant checking property inventory and pricing by hand, over and over. Availability changed often, and revisiting the same pages was a poor use of time.",
    ],
    targetUser:
      "A renter actively watching availability at a property during a live apartment search. The validated users are me and my partner. It has not been used by anyone else.",
    hypothesis:
      "If inventory and rent are checked automatically and only meaningful changes trigger an alert, a renter can stop checking manually and still hear about new units or price changes.",
    decisions: [
      {
        decision: "Monitor one defined property, not a rental marketplace",
        why: "We had a specific building and two floor plans in mind. A narrow scope kept it simple and accurate.",
      },
      {
        decision: "Check on a recurring schedule and compare to the last snapshot",
        why: "Each hourly run is diffed against the previous successful run, so the product reports change instead of restating what is available.",
      },
      {
        decision: "Alert only on material changes",
        why: "New availability, a unit going away, or a base-rent change. A run with no news sends nothing, so the alerts stay worth reading.",
      },
      {
        decision: "Deliver alerts through Discord",
        why: "We already use it, so there is no new app to check. Alerts can include a highlighted floor-plan image showing where the unit is.",
      },
      {
        decision: "Keep it lightweight and personal",
        why: "It was built for one search, not as a generalized platform. It is considered functionally complete for that search.",
      },
    ],
    workflow: [
      "Fountain checks the building's inventory every hour",
      "It compares current availability with the previous snapshot",
      "It identifies material inventory or rent changes",
      "If there are any, it sends a Discord alert, with a floor-plan image when possible",
      "I decide whether the change is worth acting on",
    ],
    usage: [
      "Fountain was used by me and my partner during an active apartment search to replace repeated manual checks of property inventory. It ran continuously and sent real alerts during that search.",
      "I have not tracked alert counts, units found, or time saved, so I am not claiming any.",
    ],
    next: {
      intro: "Future ideas, not built:",
      items: [
        "Support additional properties",
        "Make property configuration easier",
        "Improve alert relevance",
        "Add a change history or comparison view",
        "A single whole-property map instead of one image per floor (noted as not implemented in the project plan)",
      ],
    },
    stack: [
      "Python",
      "Discord webhook",
      "Pillow",
      "Raspberry Pi Zero W",
      "systemd timer",
      "SightMap inventory feed",
    ],
  },
  {
    slug: "unmissable",
    title: "Unmissable",
    tagline: "Watches sold-out attractions and alerts you when tickets reappear.",
    maturity: "MVP built and used",
    maturityNote: "Initial MVP: 2022",
    userProblem: [
      "Popular attractions can look completely sold out well before a trip, but inventory can come back later through cancellations or other changes.",
      "Travelers who still want to go end up refreshing booking pages by hand, and short-lived openings are easy to miss.",
    ],
    targetUser:
      "A traveler trying to book a specific high-demand attraction after normal inventory looks sold out. The usage so far has been narrow and travel-specific: me and friends.",
    hypothesis:
      "If sold-out ticket inventory is monitored automatically and a traveler is alerted when availability returns, they can get into experiences that would otherwise take constant manual checking.",
    decisions: [
      {
        decision: "Start with specific sold-out attractions",
        why: "A broad ticket marketplace was never the goal. The 2022 MVP went after one practical travel problem.",
      },
      {
        decision: "Let the user pick the experience and dates to monitor",
        why: "Travelers know which dates matter to them, so the product watches those instead of everything.",
      },
      {
        decision: "Treat newly available inventory as the main signal",
        why: "The whole product rests on one event: tickets that were gone show up again.",
      },
      {
        decision: "Alert for immediate action",
        why: "Openings can be short-lived, so the alert has to arrive while there is still time to book.",
      },
      {
        decision: "Keep booking outside the product",
        why: "The traveler completes the purchase with the original ticket provider. Unmissable only tells you to go.",
      },
    ],
    workflow: [
      "The traveler picks a sold-out attraction and target dates",
      "Unmissable monitors availability for those dates",
      "It detects when inventory appears",
      "The traveler is alerted",
      "The traveler tries to book through the original booking channel",
    ],
    usage: [
      "Neuschwanstein Castle: a friend and I used the MVP to monitor a selected subset of dates that looked sold out. Inventory later appeared, and we were able to get tickets.",
      "Anne Frank House: a friend used the MVP to monitor sold-out dates before a trip to Amsterdam. Monitoring identified an opening and created an opportunity to visit with roughly 48 hours' notice, even though standard availability had sold out about a month in advance.",
      "These are two real examples, not a measured success rate. I have no user counts or other feedback to report.",
    ],
    next: {
      intro:
        "The 2022 MVP showed the problem is real and that monitoring inventory can create practical value. It did not include prediction, ranking, discovery, or personalization. A future version could explore these, and all of them are ideas, not built:",
      items: [
        "Broader attraction coverage",
        "Better destination discovery",
        "Spotting high-value last-minute opportunities",
        "Ranking or prediction",
        "Alert personalization",
      ],
    },
    stack: [],
  },
  {
    slug: "credit-offer-aggregator",
    title: "Credit Offer Aggregator",
    tagline: "Pulls card offers from different issuers into one place and ranks them against my spending.",
    maturity: "In development",
    maturityNote: "Designed, not yet validated on real accounts",
    userProblem: [
      "Credit card offers are scattered across issuers and vary a lot in value. Comparing them by hand makes it hard to tell which one is worth using for my spending.",
    ],
    targetUser:
      "Initially, me: someone managing cards at multiple issuers (Amex and Chase are in scope) and trying to compare the offers available. It has no wider user base.",
    hypothesis:
      "If issuer offers are normalized, scored, and ranked in one place, it is easier to decide which ones are worth using. This is decision support, and I have not yet seen whether it changes behavior.",
    decisions: [
      {
        decision: "Score before auto-activation",
        why: "The product ranks and surfaces offers first instead of activating them automatically. That keeps it transparent decision support before any automation.",
      },
      {
        decision: "Fail-closed automation",
        why: "Any later automation defaults to doing nothing when the system is unsure. This is a safety and trust decision, since it touches financial accounts.",
      },
      {
        decision: "Cut Capital One from the initial scope",
        why: "Its offers are the hardest to classify and the least useful to me in practice, so the effort was not worth it up front. The transaction importer stays, and there are criteria for revisiting it.",
      },
      {
        decision: "Keep personal data outside the repository",
        why: "Account-specific data stays out of the code, which also keeps the project safe to open-source later.",
      },
    ],
    workflow: [
      "Collect current offers from the supported issuers (read-only)",
      "Normalize them into a common structure with their full terms",
      "Match offers against my transaction history and score them",
      "Report the highest-value offers to me on a daily schedule",
      "I decide which offer to use. Activation is not part of the current scope.",
    ],
    usage: [
      "The architecture and ranking workflow are defined, but the product has not yet been validated against my live accounts.",
      "Real-account testing and observed offer usage are still validation milestones.",
    ],
    next: {
      items: [
        "Run the product against my real accounts",
        "Validate how issuer ingestion behaves in practice",
        "Check whether the rankings match my own judgment",
        "Observe whether surfaced offers change what I actually use",
        "Refine the scoring based on what I see",
        "Later: reliability, privacy, and issuer coverage, including Capital One only if there is an offer I want surfaced",
      ],
    },
    stack: [
      "Python 3.12",
      "Playwright",
      "SQLite",
      "Pydantic",
      "Typer",
      "rapidfuzz",
      "Windows Task Scheduler",
      "Discord webhook",
    ],
  },
];

export const getProject = (slug: string) => productProjects.find((p) => p.slug === slug);
