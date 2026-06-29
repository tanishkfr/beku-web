import { CSSProperties } from "react"
import { GrainOverlay } from "@/components/GrainOverlay"

// "gate"     — the first glimpse after stepping through. Deep forest shade, one off-axis
//              warm light source. Immersive. Used in Arrival.
// "interior" — already inside. Warm wood surface in afternoon light. A detail, not a
//              panorama. Used in Story and wherever intimate scale is needed.
// "garden"   — the outdoor space. Deep canopy greens, dappled light from above.
//              Wider and more environmental than interior, less compressed than gate.
//              Used in Space.
// "conversation" — two people at a table, warm late-afternoon interior. Wider than
//                  "interior". Darker base — more atmospheric. Implied figures, implied
//                  warmth. Used in Reviews.
// "dusk"         — exterior at dusk. The entrance, trees, warm amber glow from within
//                  against a cooling blue-green sky. Used in Hero and Footer.
type ImageVariant = "gate" | "interior" | "garden" | "conversation" | "dusk"

const GRADIENTS: Record<ImageVariant, string> = {
  gate: [
    // Primary warm source — hanging bulb, off-centre
    "radial-gradient(ellipse 48% 40% at 64% 22%, rgba(202, 155, 74, 0.62) 0%, rgba(202, 155, 74, 0) 100%)",
    // Secondary warmth — lower right, ambient spill through leaves
    "radial-gradient(ellipse 28% 35% at 90% 75%, rgba(168, 122, 58, 0.30) 0%, rgba(168, 122, 58, 0) 100%)",
    // Cool shadow from the left — forest depth
    "radial-gradient(ellipse 40% 60% at 0% 50%, rgba(15, 30, 20, 0.45) 0%, transparent 100%)",
    // Leaf shadow patches — upper foliage
    "radial-gradient(ellipse 22% 10% at 28% 8%, rgba(5, 18, 10, 0.28) 0%, transparent 100%)",
    "radial-gradient(ellipse 18% 8% at 72% 12%, rgba(5, 18, 10, 0.22) 0%, transparent 100%)",
    // Base: deep forest shade
    "linear-gradient(162deg, #1E2820 0%, #2C3C30 35%, #364838 62%, #2A3830 100%)",
  ].join(", "),

  interior: [
    // Diffuse window light — upper left, soft and generous
    "radial-gradient(ellipse 65% 50% at 22% 18%, rgba(222, 185, 118, 0.58) 0%, rgba(222, 185, 118, 0) 100%)",
    // Secondary warm fill — lower right, old wood holding heat
    "radial-gradient(ellipse 45% 45% at 82% 88%, rgba(185, 140, 72, 0.32) 0%, rgba(185, 140, 72, 0) 100%)",
    // Edge darkening — natural vignette at the corners
    "radial-gradient(ellipse 30% 40% at 100% 0%, rgba(30, 15, 5, 0.35) 0%, transparent 100%)",
    "radial-gradient(ellipse 25% 35% at 0% 100%, rgba(30, 15, 5, 0.28) 0%, transparent 100%)",
    // Subtle mid-shadow — depth on the surface
    "radial-gradient(ellipse 40% 30% at 55% 55%, rgba(40, 20, 8, 0.15) 0%, transparent 100%)",
    // Base: warm amber-wood
    "linear-gradient(158deg, #6E4A28 0%, #9A7048 28%, #B08850 55%, #8C6A38 80%, #7A5A30 100%)",
  ].join(", "),

  garden: [
    // Primary dappled light — breaking through canopy, off-centre
    "radial-gradient(ellipse 45% 32% at 38% 10%, rgba(195, 172, 100, 0.55) 0%, rgba(195, 172, 100, 0) 100%)",
    // Second light patch — different angle, lower
    "radial-gradient(ellipse 30% 22% at 72% 28%, rgba(185, 165, 85, 0.38) 0%, rgba(185, 165, 85, 0) 100%)",
    // Third small patch — ground level, gap in the trees
    "radial-gradient(ellipse 20% 18% at 12% 82%, rgba(170, 148, 78, 0.25) 0%, rgba(170, 148, 78, 0) 100%)",
    // Canopy shadow — the deep green overhead
    "radial-gradient(ellipse 80% 45% at 50% 0%, rgba(10, 25, 12, 0.50) 0%, transparent 100%)",
    // Atmospheric green tint
    "radial-gradient(ellipse 60% 40% at 80% 70%, rgba(35, 55, 25, 0.25) 0%, transparent 100%)",
    // Base: deep canopy green
    "linear-gradient(168deg, #142018 0%, #1E3020 28%, #284030 52%, #304A38 72%, #223228 100%)",
  ].join(", "),

  conversation: [
    // Late afternoon window — upper left, the source
    "radial-gradient(ellipse 62% 48% at 18% 20%, rgba(220, 172, 90, 0.55) 0%, rgba(220, 172, 90, 0) 100%)",
    // Table surface glow — warm diffuse below
    "radial-gradient(ellipse 50% 35% at 50% 88%, rgba(190, 138, 68, 0.28) 0%, rgba(190, 138, 68, 0) 100%)",
    // Right-side shadow — depth, secondary wall
    "radial-gradient(ellipse 40% 70% at 100% 50%, rgba(20, 8, 3, 0.45) 0%, transparent 100%)",
    // Upper darkening — low ceiling
    "radial-gradient(ellipse 70% 30% at 50% 0%, rgba(15, 6, 2, 0.40) 0%, transparent 100%)",
    // Warm mid-glow — implied candle or lamp between figures
    "radial-gradient(ellipse 20% 25% at 55% 60%, rgba(200, 130, 50, 0.15) 0%, transparent 100%)",
    // Base: dark warm wood — candlelight atmosphere
    "linear-gradient(165deg, #2E1A0A 0%, #502C14 30%, #6E3E20 55%, #4A2C12 80%, #2E1A0A 100%)",
  ].join(", "),

  dusk: [
    // Primary amber glow — warm interior light spilling through the entrance
    "radial-gradient(ellipse 52% 42% at 50% 82%, rgba(210, 145, 48, 0.62) 0%, rgba(210, 145, 48, 0) 100%)",
    // Wider spill — light through windows on either side
    "radial-gradient(ellipse 90% 38% at 50% 95%, rgba(180, 115, 38, 0.32) 0%, rgba(180, 115, 38, 0) 100%)",
    // Secondary warm pool — right window
    "radial-gradient(ellipse 25% 30% at 80% 65%, rgba(195, 120, 42, 0.28) 0%, rgba(195, 120, 42, 0) 100%)",
    // Blue-hour sky — gradient from top, deepening
    "radial-gradient(ellipse 90% 50% at 50% 0%, rgba(28, 58, 95, 0.38) 0%, rgba(28, 58, 95, 0) 100%)",
    // Leaf-shadow patches — rain tree canopy blocking the sky
    "radial-gradient(ellipse 28% 12% at 18% 6%, rgba(5, 14, 8, 0.45) 0%, transparent 100%)",
    "radial-gradient(ellipse 22% 10% at 52% 4%, rgba(5, 14, 8, 0.38) 0%, transparent 100%)",
    "radial-gradient(ellipse 18% 8% at 78% 10%, rgba(5, 14, 8, 0.32) 0%, transparent 100%)",
    "radial-gradient(ellipse 15% 7% at 35% 16%, rgba(5, 14, 8, 0.28) 0%, transparent 100%)",
    "radial-gradient(ellipse 12% 6% at 65% 20%, rgba(5, 14, 8, 0.22) 0%, transparent 100%)",
    // Base: deep exterior, blue-teal at nightfall
    "linear-gradient(185deg, #08141C 0%, #102030 28%, #162C3C 52%, #142836 76%, #0C1E28 100%)",
  ].join(", "),
}

interface ImagePlaceholderProps {
  variant?: ImageVariant
  className?: string
  style?: CSSProperties
  // When real photography arrives, replace this component with next/image.
  // All sizing lives in the parent — this component owns only the visual treatment.
}

export function ImagePlaceholder({
  variant = "gate",
  className = "",
  style,
}: ImagePlaceholderProps) {
  return (
    <div
      className={className}
      style={{
        background: GRADIENTS[variant],
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
    >
      <GrainOverlay opacity={0.072} />
    </div>
  )
}
