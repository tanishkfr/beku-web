import Image from "next/image"
import { CSSProperties } from "react"

// Curated Unsplash photos — swap with actual Beku photography when available.
// All images: https://unsplash.com/license (free to use)
export const PHOTOS = {
  // Hero: lush outdoor garden café, warm afternoon light
  hero:         "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56",
  // Interior: warm wood surfaces, intimate café seating
  interior:     "https://images.unsplash.com/photo-1554118811-1e0d58224f24",
  // Garden: outdoor seating under a canopy of trees
  garden:       "https://images.unsplash.com/photo-1558618666-fcd25c85cd64",
  // Food: filter coffee, morning light
  food:         "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
  // Conversation: people at a café table, warm late afternoon
  conversation: "https://images.unsplash.com/photo-1521017432531-fbd92d768814",
  // Books: indie bookstore shelves, warm light
  books:        "https://images.unsplash.com/photo-1507842217343-583bb2135f47",
  // Gate/evening: café entrance at dusk, warm amber from within
  gate:         "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17",
} as const

export type PhotoKey = keyof typeof PHOTOS

interface CafeImageProps {
  photo: PhotoKey
  alt: string
  style?: CSSProperties
  className?: string
  priority?: boolean
  sizes?: string
}

// Wrapper around next/image with fill mode.
// Parent must have position: relative and a defined height.
export function CafeImage({
  photo,
  alt,
  style,
  className = "",
  priority = false,
  sizes = "(max-width: 768px) 100vw, 100vw",
}: CafeImageProps) {
  const src = `${PHOTOS[photo]}?auto=format&fit=crop&w=2070&q=82`

  return (
    <div
      className={className}
      style={{
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        style={{ objectFit: "cover", objectPosition: "center" }}
      />
      {/* Subtle grain — matches the page-level grain for visual consistency */}
      <svg
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          opacity: 0.055,
          pointerEvents: "none",
          zIndex: 1,
        }}
      >
        <filter id="cafe-img-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#cafe-img-grain)" />
      </svg>
    </div>
  )
}
