import { ExternalLink } from "lucide-react";
import { campaign } from "@/data/campaign";

/**
 * Factual election reminder. Deliberately does not attempt to provide polling
 * locations or voter eligibility rules — those come from the City of Toronto.
 */
export function ElectionReminder() {
  const { election, candidate } = campaign;

  return (
    <section id="election" aria-labelledby="election-heading" className="scroll-mt-24 bg-cream">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="border border-navy/20 bg-white">
          <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-10">
            <div>
              <p className="label-mono text-civic-deep">Election information</p>
              <h2 id="election-heading" className="display-md mt-3">
                Toronto municipal election
              </h2>
              <dl className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-3">
                <div>
                  <dt className="label-mono text-slate">Election day</dt>
                  <dd className="mt-1 font-semibold text-navy">
                    <time dateTime={election.isoDate}>{election.dateLabel}</time>
                  </dd>
                </div>
                <div>
                  <dt className="label-mono text-slate">Office</dt>
                  <dd className="mt-1 font-semibold text-navy">{election.body}</dd>
                </div>
                <div>
                  <dt className="label-mono text-slate">Ward</dt>
                  <dd className="mt-1 font-semibold text-navy">{candidate.wardLong}</dd>
                </div>
              </dl>
            </div>

            <div className="lg:border-l lg:border-rule lg:pl-10">
              <p className="max-w-[32ch] text-[0.9rem] leading-relaxed text-slate">
                Voting locations, eligibility and registration are managed by the City of Toronto.
              </p>
              <a
                href={election.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline mt-4"
              >
                {election.officialLabel}
                <ExternalLink size={15} aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
