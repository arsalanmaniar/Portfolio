import { ImageResponse } from "next/og";

// Edge runtime: @vercel/og loads its default font via a mechanism that throws
// "Invalid URL" under the Node runtime during static prerender, so run on edge.
export const runtime = "edge";

// Route segment config + metadata for the generated social share image.
export const alt = "Arsalan Maniar — AI Engineer & Full Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const tags = ["Next.js", "Python", "AI", "TypeScript"];

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
          fontFamily: "sans-serif",
          position: "relative",
          paddingLeft: 90,
          paddingRight: 70,
        }}
      >
        {/* Left accent bar */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 16,
            display: "flex",
            backgroundImage: "linear-gradient(180deg, #06b6d4, #0891b2)",
          }}
        />

        {/* Top URL */}
        <div
          style={{
            position: "absolute",
            top: 56,
            left: 90,
            display: "flex",
            color: "#06b6d4",
            fontSize: 28,
          }}
        >
          {"arsalanmaniar-portfolio.vercel.app"}
        </div>

        {/* Name */}
        <div
          style={{
            display: "flex",
            fontSize: 80,
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: "-0.02em",
          }}
        >
          {"Arsalan Maniar"}
        </div>

        {/* Subtitle */}
        <div
          style={{
            display: "flex",
            marginTop: 16,
            fontSize: 36,
            color: "#06b6d4",
          }}
        >
          {"AI Engineer & Full Stack Developer"}
        </div>

        {/* Tech tags */}
        <div
          style={{
            position: "absolute",
            bottom: 58,
            left: 90,
            display: "flex",
            gap: 16,
          }}
        >
          {tags.map((tag) => (
            <div
              key={tag}
              style={{
                display: "flex",
                border: "1px solid rgba(6, 182, 212, 0.5)",
                backgroundColor: "rgba(6, 182, 212, 0.08)",
                borderRadius: 8,
                padding: "8px 20px",
                color: "#e5e7eb",
                fontSize: 24,
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
