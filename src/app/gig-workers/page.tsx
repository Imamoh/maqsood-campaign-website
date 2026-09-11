import type { Metadata } from "next";
import Link from "next/link";
import { campaign } from "@/data/campaign";
import { gigWorkers } from "@/data/gigWorkers";

export const metadata: Metadata = {
  title: gigWorkers.meta.title,
  description: gigWorkers.meta.description,
  alternates: { canonical: "/gig-workers" },
  openGraph: {
    type: "article",
    url: `${campaign.contact.siteUrl}/gig-workers`,
    title: `${gigWorkers.meta.title} | Maqsood Ahmad for Ward 14`,
    description: gigWorkers.meta.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${gigWorkers.meta.title} | Maqsood Ahmad for Ward 14`,
    description: gigWorkers.meta.description,
  },
};

export default function GigWorkersPage() {
  return (
    <article>
      {/* ---------- Title ---------- */}
      <header className="border-b border-rule bg-blush">
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:py-20">
          <p className="label-mono text-signal">{gigWorkers.eyebrow}</p>
          <span aria-hidden="true" className="transit-rule mt-3 mb-6" />
          <h1 className="display-lg">{gigWorkers.title}</h1>
        </div>
      </header>

      {/* ---------- Introduction ---------- */}
      <div className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:py-16">
          <div className="prose-campaign">
            {gigWorkers.intro.map((p, i) => (
              <p key={p.slice(0, 32)} className={i === 0 ? "!text-[1.12rem] !text-ink" : undefined}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* ---------- Commitments ----------
          A numbered civic list with hairline rules, not a grid of cards.
          The ordered list keeps the reading sequence obvious on mobile. */}
      <section aria-labelledby="commitments-heading" className="border-y border-rule bg-panel">
        <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:py-20">
          <h2 id="commitments-heading" className="display-md">
            {gigWorkers.commitmentsHeading}
          </h2>
          <span aria-hidden="true" className="transit-rule mt-4" />

          <ol className="mt-8 border-t border-rule">
            {gigWorkers.commitments.map((item, i) => (
              <li
                key={item.slice(0, 28)}
                className="grid grid-cols-[auto_1fr] items-baseline gap-x-4 gap-y-1 border-b border-rule py-4 sm:gap-x-6"
              >
                <span className="label-mono text-signal" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[1rem] leading-relaxed text-ink">{item}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- Closing statement ---------- */}
      <section aria-label="Closing statement" className="band-navy bg-navy">
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:py-16">
          {gigWorkers.closingIntro.map((paragraph) => (
            <p key={paragraph.slice(0, 32)} className="mb-5 leading-relaxed text-white/80">
              {paragraph}
            </p>
          ))}
          <p
            className="text-[clamp(1.2rem,2.6vw,1.6rem)] leading-[1.4] font-medium text-white"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {gigWorkers.closing}
          </p>
        </div>
      </section>

      {/* ---------- Call to action ---------- */}
      <section aria-labelledby="share-heading" className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:py-20">
          <h2 id="share-heading" className="display-md">
            {gigWorkers.cta.heading}
          </h2>
          <span aria-hidden="true" className="transit-rule mt-4" />
          <p className="lede mt-5 max-w-[58ch]">{gigWorkers.cta.copy}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {/*
              Deep link to the resident-concern form on the home page. The
              query string preselects the "Gig-worker concerns" category; the
              form works normally if it is absent or JavaScript is unavailable.
            */}
            <Link href="/?category=gig-worker#your-voice" className="btn btn-primary">
              {gigWorkers.cta.primary}
            </Link>
            <Link href="/#get-involved" className="btn btn-outline">
              {gigWorkers.cta.secondary}
            </Link>
          </div>

          <p className="mt-10 border-t border-rule pt-6 font-semibold text-navy">
            {gigWorkers.cta.closingLine}
          </p>
        </div>
      </section>
    </article>
  );
}
