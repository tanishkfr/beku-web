"use client"

import Image from "next/image"
import { motion, useReducedMotion } from "framer-motion"
import { EASE, H_PAD, IMG_PAD } from "@/lib/tokens"

const CONVERSATION_SRC = "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=2070&q=82"

const FRAGMENTS = [
  {
    text: "Came in for one coffee. Stayed until they turned the lights down.",
    indent: H_PAD,
    dir: -1, // slides in from left
  },
  {
    text: "There's a corner near the shelves. I've been back four times for it.",
    indent: "clamp(3rem, 18vw, 14rem)",
    dir: 1, // slides in from right
  },
  {
    text: "The Mysore Pak Croissant doesn't make sense until you're halfway through one.",
    indent: "clamp(4rem, 22vw, 16rem)",
    dir: -1,
  },
]

export function Reviews() {
  const prefersReduced = useReducedMotion()

  return (
    <section
      aria-label="What people remember"
      style={{
        paddingTop: "clamp(7rem, 16vh, 12rem)",
        paddingBottom: "clamp(7rem, 16vh, 12rem)",
        background: [
          "radial-gradient(ellipse 90% 40% at 50% 110%, rgba(122,84,56,0.10) 0%, transparent 100%)",
          "var(--color-bg-reviews)",
        ].join(", "),
      }}
    >
      <h2 className="sr-only">What people remember</h2>
      {/* Opening line — slides from left */}
      <motion.p
        initial={{ opacity: 0, x: prefersReduced ? 0 : -16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-6%" }}
        transition={{ duration: 0.9, ease: EASE }}
        style={{
          fontFamily: "var(--font-cormorant)",
          fontSize: "clamp(1.5rem, 2.2vw, 2rem)",
          fontWeight: 400,
          fontStyle: "italic",
          color: "var(--color-text-secondary)",
          lineHeight: 1.3,
          margin: "0 0 clamp(2rem,5vh,3.25rem) 0",
          paddingLeft: H_PAD,
          paddingRight: H_PAD,
        }}
      >
        People rarely leave when they planned to.
      </motion.p>

      {/* Image */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-6%" }}
        transition={{ duration: 1.1, delay: prefersReduced ? 0 : 0.1, ease: EASE }}
        style={{ paddingLeft: IMG_PAD, paddingRight: IMG_PAD }}
      >
        <div style={{
          position: "relative",
          width: "100%",
          height: "clamp(42vh, 55vh, 64vh)",
          borderRadius: "6px",
          overflow: "hidden",
        }}>
          <Image
            src={CONVERSATION_SRC}
            alt="People sitting together at Beku, warm afternoon light"
            fill
            sizes="(max-width: 768px) 100vw, 100vw"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
          <svg aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.038, pointerEvents: "none" }}>
            <filter id="reviews-grain">
              <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#reviews-grain)" />
          </svg>
        </div>
      </motion.div>

      {/* Memory fragments — alternating slide directions */}
      <div
        style={{
          marginTop: "clamp(3rem, 7vh, 5rem)",
          display: "flex",
          flexDirection: "column",
          gap: "clamp(1.75rem, 4vh, 2.75rem)",
        }}
        aria-label="What visitors remember"
      >
        {FRAGMENTS.map((fragment, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: prefersReduced ? 0 : fragment.dir * 18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-6%" }}
            transition={{ duration: 0.85, delay: prefersReduced ? 0 : 0.15 + i * 0.12, ease: EASE }}
            style={{
              marginLeft: fragment.indent,
              maxWidth: "28ch",
              display: "flex",
              gap: "clamp(0.75rem, 1.5vw, 1.125rem)",
              alignItems: "flex-start",
            }}
          >
            <div
              aria-hidden="true"
              style={{
                width: "1.5px",
                height: "clamp(1.1rem, 1.8vh, 1.4rem)",
                marginTop: "0.28em",
                background: "linear-gradient(to bottom, var(--color-warmwood), transparent)",
                opacity: 0.25 + i * 0.07,
                flexShrink: 0,
              }}
            />
            <p style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: "clamp(0.875rem, 1.05vw, 1rem)",
              fontWeight: 400,
              color: "var(--color-text-secondary)",
              lineHeight: 1.7,
              margin: 0,
            }}>
              {fragment.text}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
