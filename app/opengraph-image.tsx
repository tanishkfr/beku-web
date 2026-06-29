import { ImageResponse } from "next/og"
import { rating } from "@/lib/business"

export const runtime = "edge"
export const alt = "Beku — Café, Bakery & Bookstore in JP Nagar, Bangalore"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#182820",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 96px",
          position: "relative",
        }}
      >
        {/* Top accent stripe — rain tree green */}
        <div style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: 3,
          background: "#3D6147",
        }} />

        {/* Name — large, italic, cream */}
        <div
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: 110,
            fontWeight: 300,
            fontStyle: "italic",
            color: "#F4EFE6",
            lineHeight: 0.88,
            letterSpacing: "-3px",
          }}
        >
          Beku.
        </div>

        {/* Bottom — meta + rating */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div
            style={{
              fontFamily: "system-ui, sans-serif",
              fontSize: 16,
              fontWeight: 400,
              color: "rgba(244, 239, 230, 0.55)",
              letterSpacing: "4px",
              textTransform: "uppercase",
            }}
          >
            Café · Bakery · Bookstore
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
            <div
              style={{
                fontFamily: "system-ui, sans-serif",
                fontSize: 15,
                fontWeight: 400,
                color: "rgba(244, 239, 230, 0.30)",
                letterSpacing: "4px",
                textTransform: "uppercase",
              }}
            >
              JP Nagar · Bangalore
            </div>
            <div
              style={{
                fontFamily: "system-ui, sans-serif",
                fontSize: 15,
                fontWeight: 400,
                color: "rgba(61, 97, 71, 0.85)",
                letterSpacing: "2px",
              }}
            >
              ★ {rating.value} on Google
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
