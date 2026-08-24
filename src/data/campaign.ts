/**
 * CENTRAL CAMPAIGN CONTENT
 * ------------------------------------------------------------------
 * Every campaign fact, name, date and piece of copy on the site lives here.
 * A non-technical editor should be able to change wording in this one file
 * without touching any component.
 *
 * RULE: only add claims the campaign can substantiate. Do not add
 * endorsements, testimonials, statistics, awards or promises of outcomes.
 */

export const campaign = {
  candidate: {
    name: "Maqsood Ahmad",
    firstName: "Maqsood",
    office: "Toronto City Councillor",
    ward: "Ward 14",
    wardLong: "Ward 14 — Toronto–Danforth",
    wardShort: "Toronto–Danforth · Ward 14",
    slogan: "Vote for Change",
  },

  election: {
    // Municipal election day. Update here if the City changes the date.
    dateLabel: "Monday, October 26, 2026",
    shortDateLabel: "October 26, 2026",
    isoDate: "2026-10-26",
    body: "Toronto City Council",
    // Official City of Toronto elections page (external, opens in a new tab).
    officialUrl: "https://www.toronto.ca/city-government/elections/",
    officialLabel: "City of Toronto election information",
  },

  contact: {
    email: "campaign@electmaqsood.com",
    domain: "electmaqsood.com",
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://electmaqsood.com",
  },

  /**
   * OFFICIAL AGENT AUTHORIZATION
   * ------------------------------------------------------------------
   * Before launch, the campaign should confirm the exact legally required
   * authorization wording with its official agent, and with the City Clerk's
   * office if there is any doubt. Edit the single string below — it renders
   * in the footer and nowhere else.
   */
  authorization: "Authorized by the official agent for Maqsood Ahmad.",

  hero: {
    eyebrow: "Toronto–Danforth · Ward 14",
    headline: "A stronger voice for our neighbourhood.",
    identity: "Maqsood Ahmad for Toronto City Council",
    supporting:
      "Maqsood Ahmad is a long-time Ward 14 resident bringing practical housing and construction knowledge — and a commitment to listening, accountability and respect for working people — to City Hall.",
    primaryCta: { label: "Share your priorities", href: "#your-voice" },
    secondaryCta: { label: "Join the campaign", href: "#get-involved" },
    trust: [
      "25 years in Ward 14",
      "Real estate professional",
      "Housing and construction knowledge",
      "Community-focused",
    ],
  },

  quote: {
    text:
      "Ward 14 has been my home for 25 years. I want to help make it safer, more affordable, and more responsive to the people who live here.",
    attribution: "Maqsood Ahmad",
    attributionRole: "Candidate for Toronto City Council, Ward 14",
  },

  about: {
    kicker: "Meet Maqsood",
    heading: "Ward 14 has been home for 25 years.",
    salutation: "Dear neighbours,",
    paragraphs: [
      "Maqsood Ahmad has lived in Ward 14 for about 25 years. It is where he raised his family, and where he has spent his working life alongside the people who live here.",
      "As a real estate professional, he has worked with residents through some of the biggest decisions they make — buying, selling, renting, renovating, or simply staying put. That work has given him practical knowledge of housing and construction, and a close view of what those decisions cost families in real terms.",
      "It has also shown him the pressures carried by homeowners, tenants, families, seniors, small businesses and working people across the ward — including gig workers, whose concerns are rarely at the table when decisions get made.",
      "He is running to give residents an accessible voice at City Hall: someone who answers, who shows up, and who carries neighbourhood concerns into the room where they are decided.",
    ],
  },

  /**
   * PRIORITIES
   * Keep these descriptions restrained. They describe what Maqsood will
   * raise and advocate for — not results he guarantees.
   */
  priorities: [
    {
      id: "safer-streets",
      title: "Safer Streets & Neighbourhoods",
      summary:
        "More attention to street safety, lighting, parks, traffic concerns and everyday neighbourhood conditions, so residents feel secure where they live.",
      icon: "shield",
      feature: false,
      detail: [] as readonly string[],
    },
    {
      id: "affordable-living",
      title: "Affordable Living & Housing",
      summary:
        "Practical housing discussions, protection for affordability, and residents who are genuinely heard when growth and development affect their neighbourhood.",
      icon: "home",
      feature: false,
      detail: [] as readonly string[],
    },
    {
      id: "respect-for-taxpayers",
      title: "Respect for Taxpayers",
      summary:
        "Serious questions about how money is spent, and priority for the City services residents need and actually use.",
      icon: "receipt",
      feature: false,
      detail: [] as readonly string[],
    },
    {
      id: "fairness-for-gig-workers",
      title: "Fairness for Gig Workers",
      summary:
        "Rideshare and delivery workers move this city every day, often with little say in the decisions that shape their work.",
      icon: "car",
      feature: true,
      detail: [
        "Maqsood wants their concerns raised at City Hall: fair treatment, dignity, and a voice in decisions that affect their livelihoods.",
        "This is a distinctive part of the campaign because these are neighbours too — people who live in Ward 14 and are too often talked about rather than talked with.",
      ] as readonly string[],
    },
    {
      id: "support-local-business",
      title: "Support Local Business",
      summary:
        "Working with small businesses and local business communities to reduce unnecessary barriers and keep neighbourhood commercial areas strong.",
      icon: "store",
      feature: false,
      detail: [] as readonly string[],
    },
    {
      id: "city-hall-that-listens",
      title: "A City Hall That Listens",
      summary:
        "Staying accessible, holding regular community conversations, and carrying neighbourhood concerns directly to City Hall.",
      icon: "ear",
      feature: false,
      detail: [] as readonly string[],
    },
  ],

  navigation: [
    { label: "About", href: "#about" },
    { label: "Priorities", href: "#priorities" },
    { label: "Your Voice", href: "#your-voice" },
    { label: "Get Involved", href: "#get-involved" },
    { label: "Contact", href: "#contact" },
  ],

  /**
   * PORTRAIT
   * ------------------------------------------------------------------
   * No campaign photograph is available yet.
   *  1. Save the real portrait to /public/images/maqsood-portrait.jpg
   *     (portrait orientation, at least 1200x1500px, ideally under ~400KB).
   *  2. Set hasPortrait to true below.
   *  3. Adjust objectPosition if the crop sits too high or low
   *     (e.g. "50% 25%" pulls the visible crop toward the top of the image).
   * Until then the hero renders a designed campaign panel — never a fake face,
   * and never a visible "placeholder" label on the public site.
   */
  portrait: {
    hasPortrait: true,
    src: "/images/maqsood-portrait.jpg",
    alt: "Maqsood Ahmad, candidate for Toronto City Council in Ward 14 — Toronto–Danforth.",
    // The image is already cropped to 4:5 with headroom, so it needs no
    // repositioning. Change this if you replace it with a different photo.
    objectPosition: "50% 50%",
    width: 1200,
    height: 1500,
  },

  // Optional second photograph for the About section. Same rules as above.
  aboutImage: {
    hasImage: false,
    src: "/images/maqsood-community.jpg",
    alt: "Maqsood Ahmad speaking with residents in Ward 14.",
    objectPosition: "50% 50%",
    width: 1200,
    height: 900,
  },

  /**
   * FORM DELIVERY
   * Submissions are emailed by /api/campaign-form using the environment
   * variables documented in .env.example. The address below is only a
   * reference for UI fallback links; the server reads CAMPAIGN_FORM_RECIPIENT.
   */
  forms: {
    recipientReference: "campaign@electmaqsood.com",
    privacyNote:
      "We use what you send to reply to you and to follow up on what you asked for. We do not sell your information, and sending this does not sign you up for campaign updates.",
  },

  legal: {
    privacyUpdated: "August 23, 2026",
    accessibilityUpdated: "August 23, 2026",
  },
} as const;

export type Priority = (typeof campaign.priorities)[number];
