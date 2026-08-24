import { campaign } from "@/data/campaign";

type Tone = "navy" | "light";
type Size = "sm" | "md" | "lg";

/**
 * Code-native typographic wordmark, built on the flyer's lockup:
 *
 *   VOTE FOR CHANGE                                    (eyebrow, `full` only)
 *   MAQSOOD AHMAD                                      (name)
 *   TORONTO CITY COUNCILLOR | WARD 14—TORONTO–DANFORTH (office line)
 *
 * The header uses the compact form — a short ward line, no eyebrow — so the
 * lockup and the menu button still fit at 320px. The footer uses `full`, where
 * there is room for all three lines.
 *
 * No image asset, so it stays crisp at any size, works in one colour, and can
 * be swapped for an SVG later by editing this one file. It is deliberately not
 * styled to resemble any City of Toronto mark.
 */
export function CampaignWordmark({
  tone = "navy",
  size = "md",
  full = false,
  className = "",
}: {
  tone?: Tone;
  size?: Size;
  /** Show the "Vote for Change" eyebrow and the full office line. */
  full?: boolean;
  className?: string;
}) {
  const light = tone === "light";
  const nameColour = light ? "text-white" : "text-navy";
  const officeColour = light ? "text-white/80" : "text-civic-deep";
  const eyebrowColour = light ? "text-white/70" : "text-signal";
  // The brand coral is used here as a solid bar, never as small text.
  const barColour = light ? "bg-red" : "bg-red";

  const scale = {
    sm: { name: "text-[0.95rem]", sub: "text-[0.55rem]", bar: "h-7" },
    md: { name: "text-[clamp(0.92rem,3.4vw,1.15rem)]", sub: "text-[0.6rem]", bar: "h-9" },
    lg: { name: "text-[clamp(1.2rem,4.5vw,1.6rem)]", sub: "text-[0.7rem]", bar: "h-14" },
  }[size];

  return (
    <span className={`inline-flex min-w-0 items-center gap-2.5 ${className}`}>
      {/* Decorative rule — echoes the flyer's red bar under the campaign band */}
      <span aria-hidden="true" className={`${scale.bar} w-[3px] shrink-0 ${barColour}`} />

      <span className="flex flex-col leading-none">
        {full && (
          <span className={`label-mono mb-1.5 ${scale.sub} ${eyebrowColour}`}>
            {campaign.candidate.slogan}
          </span>
        )}

        <span
          className={`font-bold uppercase tracking-[0.13em] ${scale.name} ${nameColour}`}
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {campaign.candidate.name}
        </span>

        <span className={`label-mono mt-1.5 ${scale.sub} ${officeColour}`}>
          {full
            ? `${campaign.candidate.office} · ${campaign.candidate.wardLong}`
            : campaign.candidate.wardLong}
        </span>
      </span>
    </span>
  );
}
