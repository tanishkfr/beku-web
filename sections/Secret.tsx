"use client"

import { motion, useReducedMotion } from "framer-motion"
import { EASE } from "@/lib/tokens"

const LINES = [
  "The kind of place",
  "you tell someone about",
  "like it’s still a secret.",
]

export function Secret() {
  const prefersReduced = useReducedMotion()

  return (
    <section
      aria-label="A thought"
      style={{
        paddingTop: "clamp(5rem, 12vh, 8rem)",
        paddingBottom: "clamp(5rem, 12vh, 8rem)",
        paddingLeft: "clamp(2rem, 8vw, 7rem)",
        paddingRight: "clamp(2rem, 8vw, 7rem)",
        backgroundColor: "var(--color-bg-secret)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <h2 className="sr-only">A thought</h2>
      <p
        aria-label="The kind of place you tell someone about like it's still a secret."
        style={{ margin: 0 }}
      >
        {LINES.map((line, i) => (
          <motion.span
            key={i}
            initial={{
              opacity: 0,
              y: prefersReduced ? 0 : 8,
              filter: prefersReduced ? "blur(0px)" : "blur(5px)",
            }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 1.0, delay: prefersReduced ? 0 : i * 0.24, ease: EASE }}
            style={{
              display: "block",
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(2rem, 4.2vw, 3.75rem)",
              fontWeight: 400,
              fontStyle: "italic",
              color: i === 2 ? "var(--color-text-secondary)" : "var(--color-ink)",
              lineHeight: 1.18,
            }}
          >
            {line}
          </motion.span>
        ))}
      </p>
    </section>
  )
}
