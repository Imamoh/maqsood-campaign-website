import { campaign } from "@/data/campaign";

type Tone = "navy" | "light";
type Size = "sm" | "md" | "lg";

/**
 * Code-native campaign wordmark, built on the official badge hierarchy:
 *
 *   MAQSOOD           navy
 *   AHMAD             red
 *   [ WARD 14 ]       white text in a compact navy label
 *   TORONTO–DANFORTH  navy supporting line
 *
 * On a navy band (tone="light") the same hierarchy inverts: the name is white,
 * AHMAD is separated by a red rule rather than a pale tint — the badge red is
 * only 2.3:1 on navy, so tinting it light enough to pass contrast would turn it
 * pink. The label chip inverts to white with navy text.
 *
 * `full` adds the "Vote for Change" slogan line and is used in the footer,
 * where there is vertical room. No maple leaf is used anywhere: the earlier
 * brief ruled it out, and one small mark would not survive at header sizes.
 *
 * No image asset, so it stays crisp at any size and can be swapped for an SVG
 * by editing this one file. It is deliberately not styled to resemble any City
 * of Toronto mark.
 */
export function CampaignWordmark({
  tone = "navy",
  size = "md",
  full = false,
  className = "",
}: {
  tone?: Tone;
  size?: Size;
  full?: boolean;
  className?: string;
}) {
  const light = tone === "light";

  const scale = {
    sm: {
      name: "text-[0.9rem]",
      chip: "text-[0.5rem] px-1.5 py-[2px]",
      sub: "text-[0.5rem]",
      slogan: "text-[0.5rem]",
    },
    md: {
      name: "text-[clamp(0.95rem,3.6vw,1.2rem)]",
      chip: "text-[0.55rem] px-1.5 py-[2px]",
      sub: "text-[0.55rem]",
      slogan: "text-[0.55rem]",
    },
    lg: {
      name: "text-[clamp(1.25rem,4.6vw,1.7rem)]",
      chip: "text-[0.62rem] px-2 py-[3px]",
      sub: "text-[0.62rem]",
      slogan: "text-[0.62rem]",
    },
  }[size];

  return (
    <span className={`inline-flex min-w-0 flex-col leading-none ${className}`}>
      {full && (
        <span className={`label-mono mb-1.5 ${scale.slogan} ${light ? "text-white/70" : "text-signal"}`}>
          {campaign.candidate.slogan}
        </span>
      )}

      {/* MAQSOOD / AHMAD — the badge's two-tone name lockup */}
      <span
        className={`font-bold uppercase tracking-[0.08em] ${scale.name}`}
        style={{ fontFamily: "var(--font-sans)" }}
      >
        <span className={light ? "text-white" : "text-navy"}>Maqsood</span>{" "}
        <span className={light ? "text-white" : "text-signal"}>Ahmad</span>
      </span>

      {/* Accent rule under the name. On navy the badge red drops to 2.3:1 and
          effectively disappears, so the light variant uses white instead. */}
      <span
        aria-hidden="true"
        className={`mt-1.5 h-[2px] w-10 ${light ? "bg-white/75" : "bg-signal"}`}
      />

      {/* WARD 14 label + ward supporting line */}
      <span className="mt-1.5 flex flex-wrap items-center gap-1.5">
        <span
          className={`label-mono ${scale.chip} ${
            light ? "bg-white text-navy" : "bg-navy text-white"
          }`}
        >
          {campaign.candidate.ward}
        </span>
        <span className={`label-mono ${scale.sub} ${light ? "text-white/80" : "text-navy"}`}>
          Toronto–Danforth
        </span>
      </span>
    </span>
  );
}
