"use client"

import React from "react"
import { motion, useReducedMotion } from "framer-motion"
import { EASE } from "@/lib/tokens"

// A single sentence. No heading. No section label. No context.
// Placed between Reviews and Visit — after the memories, before the address.
// If someone reads this far, they've already made up their mind.

export function Secret() {
  const prefersReduced = useReducedMotion()

  return (
    <section
      aria-label="A thought"
      style={{
        paddingTop: "clamp(8rem, 20vh, 14rem)",
        paddingBottom: "clamp(8rem, 20vh, 14rem)",
        paddingLeft: "clamp(2rem, 8vw, 7rem)",
        paddingRight: "clamp(2rem, 8vw, 7rem)",
        backgroundColor: "var(--color-bg-secret)",
      }}
    >
      <h2 className="sr-only">A thought</h2>
      <motion.div
        aria-hidden="true"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-8%" }}
        transition={{ duration: 0.7, ease: EASE }}
        style={{
          width: "clamp(2.5rem, 4vw, 4rem)",
          height: "1px",
          backgroundColor: "var(--color-moss-signal)",
          opacity: 0.28,
          marginBottom: "clamp(2rem, 4vh, 3rem)",
          transformOrigin: "left center",
        }}
      />
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-8%" }}
        transition={{ duration: 1.1, ease: EASE }}
        style={{
          fontFamily: "var(--font-cormorant)",
          fontSize: "clamp(1.75rem, 3.8vw, 3.25rem)",
          fontWeight: 400,
          color: "var(--color-ink)",
          lineHeight: 1.2,
          margin: 0,
          maxWidth: "26ch",
          textWrap: "balance",
        } as React.CSSProperties}
      >
        The kind of place you tell someone about like it&apos;s still a secret.
      </motion.p>
    </section>
  )
}
