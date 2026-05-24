import { ImageResponse } from "next/og";
import { shapeShareCardData } from "@/lib/share-card";

export const runtime = "edge";
export const alt = "mingliatlas tool result share card";
export const contentType = "image/png";
export const size = {
  width: 1200,
  height: 630,
};

export function GET(request: Request) {
  const data = shapeShareCardData(new URL(request.url).searchParams);
  const accent = data.tool === "i-ching" ? "#b45309" : data.tool === "zodiac" ? "#be123c" : "#0f766e";

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
          padding: 64,
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", gap: 32 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              color: accent,
              fontFamily: "Arial, sans-serif",
              fontSize: 24,
              fontWeight: 700,
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            <div style={{ width: 18, height: 18, borderRadius: 999, background: accent }} />
            {data.eyebrow}
          </div>
          <div style={{ color: "#fef3c7", fontFamily: "Arial, sans-serif", fontSize: 26, fontWeight: 700 }}>
            mingliatlas
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 26, maxWidth: 860 }}>
          <div style={{ color: "#111827", fontSize: 78, fontWeight: 700, lineHeight: 1.02 }}>{data.title}</div>
          <div style={{ color: accent, fontFamily: "Arial, sans-serif", fontSize: 38, fontWeight: 800 }}>{data.subtitle}</div>
          <div style={{ color: "#334155", fontFamily: "Arial, sans-serif", fontSize: 30, lineHeight: 1.35 }}>
            {data.summary}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 32 }}>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", maxWidth: 820 }}>
            {data.highlights.slice(0, 3).map((highlight) => (
              <div
                key={highlight}
                style={{
                  border: "2px solid rgba(15, 23, 42, 0.14)",
                  borderRadius: 999,
                  background: "rgba(255, 255, 255, 0.72)",
                  color: "#1f2937",
                  fontFamily: "Arial, sans-serif",
                  fontSize: 24,
                  fontWeight: 700,
                  padding: "13px 20px",
                }}
              >
                {highlight}
              </div>
            ))}
          </div>
          <div
            style={{
              maxWidth: 310,
              color: "#fde68a",
              fontFamily: "Arial, sans-serif",
              fontSize: 21,
              lineHeight: 1.35,
              textAlign: "right",
            }}
          >
            {data.disclaimer}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
