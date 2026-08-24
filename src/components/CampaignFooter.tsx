import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { campaign } from "@/data/campaign";
import { CampaignWordmark } from "./CampaignWordmark";

export function CampaignFooter() {
  const { contact, candidate, election, authorization } = campaign;

  return (
    <footer className="band-navy border-t-[3px] border-signal bg-navy text-white/80">
      {/* Extra bottom padding on small screens clears the fixed mobile action bar. */}
      <div className="mx-auto max-w-6xl px-4 pt-12 pb-28 sm:px-6 lg:pt-16 lg:pb-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <CampaignWordmark tone="light" size="lg" full />
            <p className="mt-5 max-w-[34ch] text-[0.92rem] leading-relaxed">
              Candidate for {candidate.office}, {candidate.wardLong}.
            </p>
            <a
              href={`mailto:${contact.email}`}
              className="mt-4 inline-block font-semibold break-all text-white underline underline-offset-4"
            >
              {contact.email}
            </a>
          </div>

          <nav aria-label="Footer">
            <h2 className="label-mono text-white/70">This site</h2>
            <ul className="mt-4 flex flex-col gap-1">
              {campaign.navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href.startsWith("#") ? `/${item.href}` : item.href}
                    className="inline-block py-2 text-[0.95rem] hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="label-mono text-white/70">Election day</h2>
            <p className="mt-4 font-semibold text-white">
              <time dateTime={election.isoDate}>{election.dateLabel}</time>
            </p>
            <ul className="mt-4 flex flex-col gap-1">
              <li>
                <Link href="/privacy" className="inline-block py-2 text-[0.95rem] hover:text-white">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/accessibility" className="inline-block py-2 text-[0.95rem] hover:text-white">
                  Accessibility
                </Link>
              </li>
              <li>
                <a
                  href={election.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 py-2 text-[0.95rem] hover:text-white"
                >
                  {election.officialLabel}
                  <ExternalLink size={13} aria-hidden="true" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/15 pt-6 text-[0.85rem] sm:flex-row sm:items-center sm:justify-between">
          {/*
            AUTHORIZATION NOTICE
            The wording below is set in src/data/campaign.ts. The campaign
            should confirm the exact required wording with its official agent
            before the site goes live.
          */}
          <p className="text-white/70">{authorization}</p>
          <p className="text-white/70">&copy; 2026 {candidate.name} campaign</p>
        </div>
      </div>
    </footer>
  );
}
