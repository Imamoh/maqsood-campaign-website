import Image from "next/image";
import { CalendarDays } from "lucide-react";
import { campaign } from "@/data/campaign";

/**
 * HERO
 * The right-hand panel is portrait-ready. While no photograph exists, it
 * renders a designed navy campaign plate — an intentional graphic, not a
 * visible placeholder. Set campaign.portrait.hasPortrait to true after saving
 * the real photo to /public/images/maqsood-portrait.jpg and the photograph
 * takes over the same frame with no other change required.
 */
export function Hero() {
  const { hero, candidate, election, portrait } = campaign;

  return (
    <section className="relative overflow-hidden border-b border-rule bg-white" aria-labelledby="hero-heading">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 pt-10 pb-14 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-14 lg:pt-16 lg:pb-20">
        {/* ---------- Copy (second column on desktop, first on mobile) ---------- */}
        <div className="reveal order-1 lg:order-2">
          <p className="label-mono text-civic-deep">{hero.eyebrow}</p>
          <span aria-hidden="true" className="transit-rule mt-3 mb-6 max-w-[168px] text-civic" />

          <h1 id="hero-heading" className="display-xl text-navy">
            {hero.headline}
          </h1>

          <p className="mt-5 text-lg font-semibold text-ink sm:text-xl">{hero.identity}</p>

          <p className="lede mt-4 max-w-[52ch]">{hero.supporting}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href={hero.primaryCta.href} className="btn btn-primary">
              {hero.primaryCta.label}
            </a>
            <a href={hero.secondaryCta.href} className="btn btn-outline">
              {hero.secondaryCta.label}
            </a>
          </div>

          <p className="mt-6 inline-flex items-center gap-2 border border-navy/15 bg-white px-3 py-2 text-[0.88rem] font-semibold text-navy">
            <CalendarDays size={16} aria-hidden="true" className="text-signal" />
            Election day · {election.shortDateLabel}
          </p>

          {/* Trust strip — factual descriptors only */}
          <ul className="mt-8 grid gap-x-6 gap-y-2 border-t border-rule pt-5 sm:grid-cols-2">
            {hero.trust.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-[0.92rem] text-slate">
                <span aria-hidden="true" className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-civic" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* ---------- Portrait frame (left on desktop, so he faces the copy) ---------- */}
        <div className="relative order-2 lg:order-1">
          {/* Campaign lockup. Replaces the small slogan tab that previously sat
              on the portrait, so the slogan appears only once in the hero. */}
          <div className="mb-5">
            <p className="label-mono text-signal">{candidate.slogan}</p>
            <p
              className="mt-1.5 text-[clamp(1.35rem,3.6vw,1.9rem)] font-bold uppercase leading-[1.05] tracking-[0.06em] text-navy"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Elect {candidate.name}
            </p>
          </div>

          <div className="relative aspect-[4/5] w-full overflow-hidden border border-navy/20 bg-navy sm:aspect-[5/6] lg:aspect-[4/5]">
            {portrait.hasPortrait ? (
              <Image
                src={portrait.src}
                alt={portrait.alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                style={{ objectFit: "cover", objectPosition: portrait.objectPosition }}
              />
            ) : (
              /* Designed campaign plate shown until a real photograph exists. */
              <div className="street-grid absolute inset-0 flex flex-col justify-between p-6 sm:p-8">
                <div>
                  <p className="label-mono text-white/60">{candidate.wardShort}</p>
                  <span aria-hidden="true" className="transit-rule mt-3 max-w-[120px] text-white" />
                </div>

                <div>
                  <p
                    className="text-[clamp(1.9rem,5vw,2.9rem)] font-semibold uppercase leading-[0.95] tracking-[0.06em] text-white"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    Maqsood
                    <br />
                    Ahmad
                  </p>
                  <p className="mt-4 max-w-[26ch] text-[0.95rem] leading-snug text-white/75">
                    Candidate for {campaign.candidate.office}, {candidate.wardLong}
                  </p>
                </div>

                <div className="flex items-end justify-between gap-4 border-t border-white/20 pt-4">
                  <p className="label-mono text-white/70">Election day</p>
                  <p className="label-mono text-white">{election.shortDateLabel}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
