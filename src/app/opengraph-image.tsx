import { ImageResponse } from "next/og";
import { SITE } from "@/lib/constants";

// Default Open Graph image for the whole site. Generated dynamically with
// next/og so we don't depend on a static asset (the previous /og-home.png
// reference pointed at a file that did not exist, so every social / AI share
// rendered without a thumbnail). Next.js picks this up automatically for any
// route that does not define its own opengraph-image.
export const runtime = "edge";
export const alt = "mingliatlas — Chinese metaphysics guides and free tools";
export const contentType = "image/png";
export const size = {
  width: 1200,
  height: 630,
};

const accent = "#0f766e";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #fffaf0 0%, #f8f1e4 48%, #0f172a 100%)",
          color: "#0f172a",
          padding: 72,
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              color: accent,
              fontFamily: "Arial, sans-serif",
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: 5,
              textTransform: "uppercase",
            }}
          >
            <div style={{ width: 20, height: 20, borderRadius: 999, background: accent }} />
            {SITE.name}
          </div>
          <div style={{ color: "#334155", fontFamily: "Arial, sans-serif", fontSize: 24 }}>
            mingliatlas.com
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28, maxWidth: 980 }}>
          <div style={{ color: "#111827", fontSize: 76, fontWeight: 700, lineHeight: 1.04 }}>
            Chinese Metaphysics, Made Clear
          </div>
          <div style={{ color: accent, fontFamily: "Arial, sans-serif", fontSize: 40, fontWeight: 800 }}>
            {SITE.tagline}
          </div>
          <div style={{ color: "#334155", fontFamily: "Arial, sans-serif", fontSize: 30, lineHeight: 1.35 }}>
            Free Bazi calculator, Chinese Zodiac guides, I Ching oracle, and beginner-friendly
            Four Pillars, Ziwei, and Feng Shui references.
          </div>
        </div>

        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          {["Bazi", "Chinese Zodiac", "I Ching", "Ziwei Doushu", "Feng Shui"].map((tag) => (
            <div
              key={tag}
              style={{
                border: "2px solid rgba(15, 23, 42, 0.16)",
                borderRadius: 999,
                background: "rgba(255, 255, 255, 0.74)",
                color: "#1f2937",
                fontFamily: "Arial, sans-serif",
                fontSize: 24,
                fontWeight: 700,
                padding: "12px 22px",
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
