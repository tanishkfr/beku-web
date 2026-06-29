"use client"

import { motion, useReducedMotion } from "framer-motion"
import { EASE, H_PAD, CREAM, CREAM_MUTED } from "@/lib/tokens"

export function AboutContent() {
  const prefersReduced = useReducedMotion()

  const reveal = (delay: number) => ({
    initial: { opacity: 0, y: prefersReduced ? 0 : 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay: prefersReduced ? 0 : delay, ease: EASE },
  })

  return (
    <main id="main-content">
      {/* Dark header — mirrors the Arrival section's register */}
      <section
        aria-label="About Beku"
        data-navbar-dark=""
        style={{
          paddingTop: "clamp(9rem, 22vh, 14rem)",
          paddingBottom: "clamp(5rem, 12vh, 8rem)",
          paddingLeft: H_PAD,
          paddingRight: H_PAD,
          backgroundColor: "var(--color-bg-arrival)",
        }}
      >
        <motion.p
          {...reveal(0)}
          style={{
            fontFamily: "var(--font-stamp)",
            fontSize: "clamp(0.625rem, 0.6vw, 0.6875rem)",
            fontWeight: 400,
            color: CREAM_MUTED,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            margin: "0 0 clamp(1.75rem, 4vh, 2.5rem) 0",
          }}
        >
          About
        </motion.p>

        <motion.p
          {...reveal(0.1)}
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(2rem, 4.5vw, 3.75rem)",
            fontWeight: 400,
            fontStyle: "italic",
            color: CREAM,
            lineHeight: 1.12,
            maxWidth: "22ch",
            margin: 0,
            letterSpacing: "-0.015em",
          }}
        >
          A café that didn&apos;t mean to become a favourite.
        </motion.p>

        <motion.div
          aria-hidden="true"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: prefersReduced ? 0 : 0.6, ease: EASE }}
          style={{
            width: "clamp(2.5rem, 4vw, 4rem)",
            height: "1px",
            backgroundColor: "rgba(246, 240, 228, 0.18)",
            marginTop: "clamp(3rem, 7vh, 4.5rem)",
            transformOrigin: "left center",
          }}
        />
      </section>

      <section
        aria-label="The story"
        style={{
          paddingTop: "clamp(6rem, 14vh, 10rem)",
          paddingBottom: "clamp(7rem, 16vh, 11rem)",
          paddingLeft: H_PAD,
          paddingRight: H_PAD,
          backgroundColor: "var(--color-paper)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "clamp(1.25rem, 3vh, 1.75rem)",
            maxWidth: "50ch",
          }}
        >
          {[
            "Beku started in JP Nagar in a building that used to be a bungalow. The rain tree in the garden was already there. Most of the furniture arrived slowly, from different places.",
            "We serve coffee we care about, food made in the kitchen, and books the staff have actually read. The shelves change. The hours don't.",
            "Nobody gets hurried out. That's the whole idea.",
          ].map((para, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: prefersReduced ? 0 : 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-6%" }}
              transition={{ duration: 0.8, delay: prefersReduced ? 0 : i * 0.1, ease: EASE }}
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "clamp(0.9375rem, 1.2vw, 1.0625rem)",
                fontWeight: 300,
                color: "var(--color-text-secondary)",
                lineHeight: 1.8,
                margin: 0,
              }}
            >
              {para}
            </motion.p>
          ))}

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-6%" }}
            transition={{ duration: 0.9, delay: prefersReduced ? 0 : 0.3, ease: EASE }}
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(1rem, 1.6vw, 1.375rem)",
              fontWeight: 400,
              fontStyle: "italic",
              color: "var(--color-text-muted)",
              lineHeight: 1.5,
              margin: "clamp(1rem, 2.5vh, 1.5rem) 0 0 0",
            }}
          >
            Open every day, 11am to 11pm.
            <br />
            JP Nagar, Bangalore.
          </motion.p>
        </div>
      </section>
    </main>
  )
}
