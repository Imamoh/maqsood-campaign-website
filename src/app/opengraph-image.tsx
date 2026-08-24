import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { campaign } from "@/data/campaign";

/**
 * Social sharing image (1200x630), generated at build time.
 *
 * It embeds the real campaign portrait from /public/images. If you replace that
 * photo, this card updates automatically on the next build. If the file is ever
 * missing, the card falls back to a text-only layout rather than failing the
 * build — it never shows an invented likeness.
 *
 * To use a fully designed image instead, delete this file and save a 1200x630
 * file as src/app/opengraph-image.jpg.
 */
export const alt = "Maqsood Ahmad for Toronto City Council, Ward 14 — Toronto–Danforth";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadPortrait(): Promise<string | null> {
  if (!campaign.portrait.hasPortrait) return null;
  try {
    const file = await readFile(join(process.cwd(), "public", "images", "maqsood-portrait.jpg"));
    return `data:image/jpeg;base64,${file.toString("base64")}`;
  } catch {
    return null;
  }
}

export default async function OpengraphImage() {
  const portrait = await loadPortrait();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#0B1F3A",
          color: "#FFFFFF",
          fontFamily: "sans-serif",
        }}
      >
        {/* Text column */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: 64,
            flex: 1,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 22, letterSpacing: 5, color: "rgba(255,255,255,0.65)" }}>
              TORONTO–DANFORTH · WARD 14
            </div>
            <div style={{ display: "flex", marginTop: 20 }}>
              <div style={{ width: 110, height: 5, background: "#C62828" }} />
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 74, fontWeight: 700, lineHeight: 1.02, letterSpacing: -1 }}>
              Maqsood Ahmad
            </div>
            <div style={{ fontSize: 32, marginTop: 16, color: "rgba(255,255,255,0.8)" }}>
              For Toronto City Council
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              borderTop: "1px solid rgba(255,255,255,0.25)",
              paddingTop: 22,
              fontSize: 22,
              color: "rgba(255,255,255,0.75)",
            }}
          >
            <div>{`Election day · ${campaign.election.shortDateLabel}`}</div>
            <div style={{ marginTop: 6 }}>{campaign.contact.domain}</div>
          </div>
        </div>

        {/* Portrait column — omitted entirely when no photo is available */}
        {portrait && (
          <div style={{ display: "flex", width: 430, height: 630 }}>
            <img
              src={portrait}
              alt=""
              width={430}
              height={630}
              style={{ width: 430, height: 630, objectFit: "cover", objectPosition: "50% 45%" }}
            />
          </div>
        )}
      </div>
    ),
    { ...size },
  );
}
