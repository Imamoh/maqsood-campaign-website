import Link from "next/link";
import { Shield, Home, Receipt, Car, Store, Ear } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { campaign } from "@/data/campaign";

const icons: Record<string, LucideIcon> = {
  shield: Shield,
  home: Home,
  receipt: Receipt,
  car: Car,
  store: Store,
  ear: Ear,
};

/**
 * Priorities are rendered as editorial rows rather than six identical cards.
 * "Fairness for Gig Workers" breaks the rhythm as a full-width navy block
 * because it is the most distinctive part of the campaign.
 */
export function Priorities() {
  const rows = campaign.priorities.filter((p) => !p.feature);
  const feature = campaign.priorities.find((p) => p.feature);
  const FeatureIcon = feature ? icons[feature.icon] : null;

  return (
    <section id="priorities" aria-labelledby="priorities-heading" className="scroll-mt-24 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="max-w-2xl">
          <p className="label-mono text-civic-deep">What I will focus on</p>
          <span aria-hidden="true" className="transit-rule mt-3 mb-6 max-w-[140px] text-civic" />
          <h2 id="priorities-heading" className="display-lg">
            Six practical priorities for Ward 14.
          </h2>
          <p className="lede mt-4">
            These are the things I intend to raise, question and keep on the agenda at City Hall —
            described plainly, without promising outcomes no single councillor can guarantee.
          </p>
        </div>

        {/* Editorial rows */}
        <ol className="mt-12 border-t border-rule">
          {rows.slice(0, 2).map((p) => (
            <PriorityRow key={p.id} priority={p} />
          ))}
        </ol>
      </div>

      {/* ---------- Feature block: gig workers ---------- */}
      {feature && (
        <div className="border-y-[3px] border-red bg-blush">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
              <div>
                <p className="label-mono text-signal">Priority 03</p>
                <span aria-hidden="true" className="transit-rule mt-3 mb-6 max-w-[120px] text-civic" />
                <h3
                  id={feature.id}
                  className="scroll-mt-24 text-[clamp(1.7rem,3.4vw,2.5rem)] leading-[1.1] font-semibold text-navy"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {feature.title}
                </h3>
                {FeatureIcon && (
                  <FeatureIcon size={28} aria-hidden="true" className="mt-6 text-civic" />
                )}
              </div>
              <div className="lg:border-l lg:border-rule lg:pl-16">
                <p className="text-[1.15rem] leading-relaxed text-ink">{feature.summary}</p>
                {feature.detail.map((d) => (
                  <p key={d.slice(0, 24)} className="mt-4 leading-relaxed text-slate">
                    {d}
                  </p>
                ))}
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Link href="/gig-workers" className="btn btn-primary">
                    Read the Gig Worker Plan
                  </Link>
                  <a href="#your-voice" className="btn btn-outline">
                    Share Your Experience
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
        <ol start={4} className="border-t border-rule">
          {rows.slice(2).map((p) => (
            <PriorityRow key={p.id} priority={p} />
          ))}
        </ol>
      </div>
    </section>
  );
}

function PriorityRow({ priority }: { priority: (typeof campaign.priorities)[number] }) {
  const Icon = icons[priority.icon];
  // Numbering follows the canonical order in campaign.ts, so the feature block
  // and the rows around it stay consistent (01-03, 04 feature, 05-06).
  const index = campaign.priorities.findIndex((p) => p.id === priority.id) + 1;

  return (
    <li
      id={priority.id}
      className="grid scroll-mt-24 gap-3 border-b border-rule py-8 sm:grid-cols-[auto_1fr] sm:gap-8 lg:grid-cols-[auto_0.8fr_1.2fr] lg:items-start"
    >
      <p className="label-mono text-signal sm:pt-1.5">
        {String(index).padStart(2, "0")}
      </p>
      <h3 className="display-md flex items-start gap-3">
        {Icon && <Icon size={22} aria-hidden="true" className="mt-1 shrink-0 text-civic" />}
        <span>{priority.title}</span>
      </h3>
      <p className="max-w-[60ch] text-slate sm:col-start-2 lg:col-start-3 lg:pl-8">
        {priority.summary}
      </p>
    </li>
  );
}
