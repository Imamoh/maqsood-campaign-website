import { campaign } from "@/data/campaign";

type Tone = "navy" | "light";
type Size = "sm" | "md" | "lg";

/**
 * Code-native typographic wordmark. No image asset, so it stays crisp at any
 * size, works in a single colour, and can be replaced by an SVG later by
 * swapping the markup in this one file.
 *
 * This is a campaign wordmark only. It is deliberately not styled to resemble
 * any City of Toronto mark.
 */
export function CampaignWordmark({
  tone = "navy",
  size = "md",
  className = "",
}: {
  tone?: Tone;
  size?: Size;
  className?: string;
}) {
  const nameColour = tone === "light" ? "text-white" : "text-navy";
  const subColour = tone === "light" ? "text-white/70" : "text-civic-deep";
  const ruleColour = tone === "light" ? "bg-white/35" : "bg-signal";

  const scale = {
    sm: { name: "text-[0.95rem]", tracking: "tracking-[0.12em]", sub: "text-[0.55rem]" },
    // Fluid so the header wordmark and the menu button always fit at 320px.
    md: {
      name: "text-[clamp(0.92rem,3.4vw,1.15rem)]",
      tracking: "tracking-[0.13em]",
      sub: "text-[0.6rem]",
    },
    lg: { name: "text-[clamp(1.2rem,4.5vw,1.6rem)]", tracking: "tracking-[0.14em]", sub: "text-[0.7rem]" },
  }[size];

  return (
    <span className={`inline-flex min-w-0 items-center gap-2.5 ${className}`}>
      {/* Decorative vertical bar — echoes the transit-line motif used sitewide */}
      <span aria-hidden="true" className={`h-8 w-[3px] shrink-0 ${ruleColour}`} />
      <span className="flex flex-col leading-none">
        <span
          className={`font-semibold ${scale.name} ${scale.tracking} ${nameColour} uppercase`}
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Maqsood Ahmad
        </span>
        <span className={`label-mono mt-1 ${scale.sub} ${subColour}`}>
          For {campaign.candidate.ward}
        </span>
      </span>
    </span>
  );
}
