import React from "react"

// Pre-baked 200×200 grain tile as a CSS background-image.
// feTurbulence in a data-URI SVG is rasterised once and GPU-tiled by CSS,
// vs an inline SVG filter which re-runs on every compositing pass. Having 6+
// live filters janks mid-range Android (common in India). One shared tile fixes
// it across the whole site.
const GRAIN_URI =
  `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E")`

export function GrainOverlay({
  opacity = 0.038,
  style,
}: {
  opacity?: number
  style?: React.CSSProperties
}) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        backgroundImage: GRAIN_URI,
        backgroundRepeat: "repeat",
        backgroundSize: "200px 200px",
        opacity,
        ...style,
      }}
    />
  )
}
