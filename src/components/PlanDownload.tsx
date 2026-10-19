import { FileText } from "lucide-react";
import { campaign } from "@/data/campaign";

/**
 * Download card for the full written plan, shown at the top of the Priorities
 * section — a visitor who wants the detail gets it before the summaries,
 * and everyone else reads straight past it.
 *
 * The file opens in a new tab rather than downloading, so it can be read on a
 * phone without saving anything. The size and page count are stated up front
 * (campaign.plan.fileLabel) so nobody on mobile data opens it blind.
 */
export function PlanDownload() {
  const { kicker, title, summary, href, label, fileLabel } = campaign.plan;

  return (
    <aside className="mt-12 border border-rule bg-panel">
      <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-10">
        <div className="flex gap-4 sm:gap-5">
          <FileText
            size={28}
            aria-hidden="true"
            className="mt-1 shrink-0 text-civic-deep"
          />
          <div>
            <p className="label-mono text-civic-deep">{kicker}</p>
            <h3 className="display-md mt-2">{title}</h3>
            <p className="mt-2 max-w-[60ch] text-slate">{summary}</p>
            <p className="label-mono mt-3 text-slate">{fileLabel}</p>
          </div>
        </div>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-navy w-full sm:w-auto lg:justify-self-end"
        >
          {label}
          <span className="sr-only">
            {" "}
            ({fileLabel}, opens in a new tab)
          </span>
        </a>
      </div>
    </aside>
  );
}
