import { ImageResponse } from "next/og";

// Favicon generated from the campaign initials. No City of Toronto mark is used.
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0B1F3A",
          color: "#FFFFFF",
          fontSize: 30,
          fontWeight: 700,
          letterSpacing: 1,
        }}
      >
        MA
      </div>
    ),
    { ...size },
  );
}
