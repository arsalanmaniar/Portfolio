import { ImageResponse } from "next/og";

// Edge runtime: @vercel/og loads its default font via a mechanism that throws
// "Invalid URL" under the Node runtime during static prerender, so run on edge.
export const runtime = "edge";

// Route segment config + metadata for the generated social share image.
export const alt = "Arsalan Maniar — AI Engineer & Full Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
          position: "relative",
        }}
      >
        {/* Cyan glow accent border */}
        <div
          style={{
            position: "absolute",
            top: 28,
            left: 28,
            right: 28,
            bottom: 28,
            border: "2px solid rgba(6, 182, 212, 0.35)",
            borderRadius: 24,
            display: "flex",
          }}
        />

        {/* Terminal-style tag, top-left */}
        <div
          style={{
            position: "absolute",
            top: 60,
            left: 66,
            display: "flex",
            color: "#06b6d4",
            fontSize: 30,
          }}
        >
          {"> arsalan_maniar.exe"}
        </div>

        {/* Name — white / cyan gradient */}
        <div
          style={{
            display: "flex",
            fontSize: 120,
            fontWeight: 800,
            letterSpacing: "-0.03em",
            backgroundImage:
              "linear-gradient(90deg, #22d3ee, #ffffff, #22d3ee)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          {"Arsalan Maniar"}
        </div>

        {/* Subtitle */}
        <div
          style={{
            display: "flex",
            marginTop: 18,
            fontSize: 46,
            color: "#06b6d4",
          }}
        >
          {"AI Engineer & Full Stack Developer"}
        </div>

        {/* Production URL, bottom */}
        <div
          style={{
            position: "absolute",
            bottom: 56,
            display: "flex",
            fontSize: 28,
            color: "#8b8b93",
          }}
        >
          {"arsalanmaniar-portfolio.vercel.app"}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
