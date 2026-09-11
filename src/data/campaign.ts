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
    email: "info@electmaqsood.com",
    domain: "electmaqsood.com",
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://electmaqsood.com",
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
      "I am a long-time Ward 14 resident, and I want to bring practical housing and construction knowledge — along with a commitment to listening, accountability and respect for working people — to City Hall.",
    primaryCta: { label: "Share what matters to you", href: "#your-voice" },
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
      "After 25 years in Ward 14, I understand the challenges facing our community. I am running to stand up for gig workers, first-time homebuyers, seniors and local businesses — and to help build safer neighbourhoods and a more affordable city we can all proudly call home.",
    attribution: "Maqsood Ahmad",
    attributionRole: "Candidate for Toronto City Council, Ward 14",
  },

  about: {
    kicker: "About me",
    heading: "Ward 14 has been home for 25 years.",
    salutation: "Dear Neighbours,",
    paragraphs: [
      "For the past 25 years, Ward 14 has been my home. This is where I am raising my family, have built my career and developed connections with residents and the wider community.",
      "Throughout my career in real estate and construction, I have helped residents in some of life's most important decisions — buying, selling, renting, renovating or remaining in the homes and neighbourhoods they know. This experience has given me practical knowledge of housing and development, along with a clear understanding of the real financial pressures these decisions place on families.",
      "My work and conversations across the community have also shown me the challenges facing homeowners, tenants, seniors, first-time homebuyers, small-business owners, working families and gig workers — people whose concerns are too often overlooked when important decisions are made.",
      "I am running for Toronto City Council to provide Ward 14 residents with an accessible and effective voice at City Hall: someone who listens, responds, shows up and remains accountable.",
      "My priorities include advocating for more affordable housing, reducing barriers for first-time homebuyers, supporting seniors and gig workers, strengthening local businesses, addressing traffic and neighbourhood safety concerns, and promoting the responsible management of taxpayers' money.",
      "Above all, I want to ensure that every neighbourhood in Ward 14 is heard and properly represented when decisions are made at City Hall. Together, we can build a safer, more affordable and better city — a place we can all proudly call home.",
    ],
  },

  /**
   * PRIORITIES
   * Written in the candidate's first-person voice. Keep them restrained:
   * they describe what I will raise and advocate for — not results guaranteed.
   */
  priorities: [
    {
      id: "safer-streets",
      title: "Safer Streets & Neighbourhoods",
      summary:
        "I will press for more attention to street safety, lighting, parks, traffic concerns and everyday neighbourhood conditions, so residents feel secure where they live.",
      icon: "shield",
      feature: false,
      detail: [] as readonly string[],
    },
    {
      id: "affordable-living",
      title: "Affordable Living & Housing",
      summary:
        "I will push for practical housing discussions, work to protect affordability, and make sure residents are genuinely heard when growth and development affect their neighbourhood.",
      icon: "home",
      feature: false,
      detail: [] as readonly string[],
    },
    {
      id: "respect-for-taxpayers",
      title: "Respect for Taxpayers",
      summary:
        "I will ask serious questions about how money is spent, and prioritize the City services residents need and actually use.",
      icon: "receipt",
      feature: false,
      detail: [] as readonly string[],
    },
    {
      id: "fairness-for-gig-workers",
      // Homepage preview only. The full statement lives at /gig-workers.
      title: "A Voice for Gig Workers",
      summary:
        "Rideshare drivers, delivery workers and other gig workers help keep Toronto moving every day. Yet many are struggling to earn a decent living despite working long hours.",
      icon: "car",
      feature: true,
      detail: [
        "I believe workers deserve fair compensation, transparent deductions, protection from unfair deactivations and a meaningful voice in decisions affecting their livelihoods.",
      ] as readonly string[],
    },
    {
      id: "support-local-business",
      title: "Support Local Business",
      summary:
        "I will work with small businesses and local business communities to reduce unnecessary barriers and keep neighbourhood commercial areas strong.",
      icon: "store",
      feature: false,
      detail: [] as readonly string[],
    },
    {
      id: "city-hall-that-listens",
      title: "A City Hall That Listens",
      summary:
        "I will stay accessible, hold regular community conversations, and carry neighbourhood concerns directly to City Hall.",
      icon: "ear",
      feature: false,
      detail: [] as readonly string[],
    },
  ],

  navigation: [
    { label: "About", href: "#about" },
    { label: "Priorities", href: "#priorities" },
    { label: "Gig Workers", href: "/gig-workers" },
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
