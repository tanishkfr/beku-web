"use client"

import Image from "next/image"
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { EASE, H_PAD, IMG_PAD } from "@/lib/tokens"
import { DwellNote } from "@/components/DwellNote"

const GARDEN_SRC = "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=2070&q=82"

export function Space() {
  const prefersReduced = useReducedMotion()
  const sectionRef = useRef<HTMLDivElement>(null)

  // Subtle parallax: image moves 60px up as the section scrolls through the viewport
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })
  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReduced ? ["0%", "0%"] : ["4%", "-4%"]
  )

  return (
    <section
      ref={sectionRef}
      aria-label="The space"
      style={{
        paddingTop: "clamp(2rem, 6vh, 4rem)",
        paddingBottom: "clamp(6rem, 14vh, 10rem)",
        background: [
          "radial-gradient(ellipse 85% 55% at 48% 20%, rgba(61,97,71,0.16) 0%, transparent 100%)",
          "var(--color-bg-space)",
        ].join(", "),
        overflow: "hidden",
      }}
    >
      {/* Image with parallax */}
      <motion.div
        initial={{ opacity: prefersReduced ? 1 : 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-6%" }}
        transition={{ duration: 1.2, ease: EASE }}
        style={{ paddingLeft: IMG_PAD, paddingRight: IMG_PAD }}
      >
        <div style={{
          position: "relative",
          width: "100%",
          height: "clamp(55vh, 72vh, 82vh)",
          borderRadius: "6px",
          overflow: "hidden",
        }}>
          <motion.div
            style={{
              position: "absolute",
              inset: "-8% 0",
              y: imageY,
            }}
          >
            <Image
              src={GARDEN_SRC}
              alt="Outdoor seating at Beku, under the shade of the rain tree"
              fill
              sizes="(max-width: 768px) 100vw, 100vw"
              style={{ objectFit: "cover", objectPosition: "center 55%" }}
            />
          </motion.div>
          <svg aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.038, pointerEvents: "none" }}>
            <filter id="space-grain">
              <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#space-grain)" />
          </svg>
        </div>
      </motion.div>

      {/* Caption */}
      <motion.div
        initial={{ opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-6%" }}
        transition={{ duration: 0.9, ease: EASE }}
        style={{
          paddingTop: "clamp(2rem, 4.5vh, 3.25rem)",
          paddingLeft: H_PAD,
          paddingRight: H_PAD,
          display: "flex",
          flexDirection: "column",
          gap: "0.3rem",
        }}
      >
        <p style={{
          fontFamily: "var(--font-cormorant)",
          fontSize: "clamp(1.5rem, 2.8vw, 2.25rem)",
          fontWeight: 400,
          fontStyle: "italic",
          color: "var(--color-text-secondary)",
          lineHeight: 1.25,
          margin: 0,
        }}>
          The building was a bungalow before it was a café.
        </p>
        <p style={{
          fontFamily: "var(--font-cormorant)",
          fontSize: "clamp(1.5rem, 2.8vw, 2.25rem)",
          fontWeight: 400,
          fontStyle: "italic",
          color: "var(--color-text-muted)",
          lineHeight: 1.25,
          margin: 0,
        }}>
          The trees didn&apos;t change.
        </p>
        <DwellNote style={{ marginTop: "clamp(1rem, 2.5vh, 1.5rem)" }}>
          By afternoon the tables go green under the tree.
        </DwellNote>
      </motion.div>
    </section>
  )
}
