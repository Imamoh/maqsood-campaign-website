import type { Metadata, Viewport } from "next";
import "./globals.css";
import { newsreader, plexSans, plexMono } from "./fonts";
import { campaign } from "@/data/campaign";
import { CampaignHeader } from "@/components/CampaignHeader";
import { CampaignFooter } from "@/components/CampaignFooter";

/**
 * All social and search metadata is centralized here and reads from
 * src/data/campaign.ts. After a real campaign portrait exists, the Open Graph
 * image can be swapped by editing src/app/opengraph-image.tsx (or replacing it
 * with a static file at src/app/opengraph-image.jpg).
 */
const description =
  "Maqsood Ahmad is a candidate for Toronto City Council in Ward 14 — Toronto–Danforth. A long-time resident of about 25 years and a real estate professional with practical housing and construction knowledge. Election day is October 26, 2026.";

export const metadata: Metadata = {
  metadataBase: new URL(campaign.contact.siteUrl),
  title: {
    default: "Maqsood Ahmad for Ward 14 | Toronto–Danforth",
    template: "%s | Maqsood Ahmad for Ward 14",
  },
  description,
  applicationName: "Maqsood Ahmad for Ward 14",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: campaign.contact.siteUrl,
    siteName: "Maqsood Ahmad for Ward 14",
    title: "Maqsood Ahmad for Ward 14 | Toronto–Danforth",
    description,
  },
  twitter: {
    // No campaign social account exists, so no @handle is claimed here.
    card: "summary_large_image",
    title: "Maqsood Ahmad for Ward 14 | Toronto–Danforth",
    description,
  },
  robots: { index: true, follow: true },
  category: "politics",
};

export const viewport: Viewport = {
  themeColor: "#0B1F3A",
  width: "device-width",
  initialScale: 1,
};

/** Structured data limited strictly to facts the campaign can substantiate. */
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: campaign.candidate.name,
  url: campaign.contact.siteUrl,
  email: `mailto:${campaign.contact.email}`,
  jobTitle: `Candidate for ${campaign.candidate.office}, ${campaign.candidate.wardLong}`,
  homeLocation: {
    "@type": "Place",
    name: "Toronto, Ontario, Canada",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-CA"
      className={`${newsreader.variable} ${plexSans.variable} ${plexMono.variable}`}
    >
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[100] focus:bg-navy focus:px-4 focus:py-3 focus:font-semibold focus:text-white"
        >
          Skip to main content
        </a>
        <CampaignHeader />
        <main id="main">{children}</main>
        <CampaignFooter />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
