// Design tokens — single source of truth for all design values.
// Import these wherever you'd otherwise hardcode a constant.

export const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1]

// Horizontal padding — consistent across all sections
export const H_PAD = "clamp(2rem, 8vw, 7rem)"
// Image padding — slightly tighter than H_PAD for edge-to-edge feel
export const IMG_PAD = "clamp(1rem, 3.5vw, 2.5rem)"

// Cream — used in dark (forest green) sections
export const CREAM = "#F6F0E4"
export const CREAM_DIM = "rgba(246, 240, 228, 0.60)"
export const CREAM_MUTED = "rgba(246, 240, 228, 0.36)"

export const colors = {
  forest:       "#182820",
  canopy:       "#243C2E",
  moss:         "#3D6147",
  sage:         "#6B8C72",
  cream:        "#F6F0E4",
  parchment:    "#EDE5CC",
  paper:        "#F6F0E4",
  offwhite:     "#FAF7F0",
  terracotta:   "#B85C38",
  warmwood:     "#7A5438",
  ink:          "#1C2820",
  textPrimary:  "#2C3428",
  textSecondary:"#5A6A52",
  textMuted:    "#8A9A82",
  divider:      "#D8D0BC",
  mysorePak:    "#C06B30",
  mossSignal:   "#3D6147",
} as const

export const fonts = {
  display: "var(--font-cormorant)",
  body:    "var(--font-dm-sans)",
  stamp:   "var(--font-mono, 'Courier New', monospace)",
} as const

// Shared reveal animation factory — use instead of redefining per section
export function reveal(delay = 0, prefersReduced: boolean | null = false) {
  return {
    initial: { opacity: 0, y: prefersReduced ? 0 : 8 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-6%" as const },
    transition: { duration: 0.85, delay: prefersReduced ? 0 : delay, ease: EASE },
  }
}

export function revealFade(delay = 0, prefersReduced: boolean | null = false) {
  return {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true, margin: "-6%" as const },
    transition: { duration: 1.0, delay: prefersReduced ? 0 : delay, ease: EASE },
  }
}
