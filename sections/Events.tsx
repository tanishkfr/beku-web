"use client"

import Image from "next/image"
import { motion, useReducedMotion } from "framer-motion"
import { EASE, H_PAD, IMG_PAD } from "@/lib/tokens"

const EVENTS_SRC = "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=2070&q=82"

export function Events() {
  const prefersReduced = useReducedMotion()

  const itemReveal = (delay: number) => ({
    initial: { opacity: 0, y: prefersReduced ? 0 : 8 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-6%" as const },
    transition: { duration: 0.9, delay: prefersReduced ? 0 : delay, ease: EASE },
  })

  return (
    <section
      id="events"
      aria-label="Events at Beku"
      style={{
        paddingTop: "clamp(7rem, 16vh, 12rem)",
        paddingBottom: "clamp(7rem, 16vh, 12rem)",
        background: [
          "linear-gradient(to bottom, rgba(61, 97, 71, 0.12) 0%, transparent 40%)",
          "var(--color-bg-events)",
        ].join(", "),
      }}
    >
      <motion.h2
        {...itemReveal(0)}
        style={{
          fontFamily: "var(--font-stamp)",
          fontSize: "clamp(0.5rem, 0.58vw, 0.5625rem)",
          fontWeight: 400,
          color: "var(--color-warmwood)",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          margin: "0 0 clamp(1.5rem, 3.5vh, 2.25rem) 0",
          paddingLeft: IMG_PAD,
          opacity: 0.65,
        }}
      >
        Happening here
      </motion.h2>

      <motion.div
        initial={{ opacity: prefersReduced ? 1 : 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-6%" }}
        transition={{ duration: 1.0, delay: prefersReduced ? 0 : 0.05, ease: EASE }}
        style={{ paddingLeft: IMG_PAD, paddingRight: IMG_PAD, marginBottom: "clamp(3rem, 7vh, 5rem)" }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "clamp(38vh, 50vh, 58vh)",
            borderRadius: "6px",
            overflow: "hidden",
          }}
        >
          <Image
            src={EVENTS_SRC}
            alt="People gathered at Beku for an evening event, warm light"
            fill
            sizes="(max-width: 768px) 100vw, 100vw"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
          <svg aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.038, pointerEvents: "none" }}>
            <filter id="events-grain">
              <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#events-grain)" />
          </svg>
        </div>
      </motion.div>

      <div style={{ paddingLeft: H_PAD, paddingRight: H_PAD }}>
        <motion.p
          {...itemReveal(0.12)}
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(1.5rem, 2.8vw, 2.25rem)",
            fontWeight: 400,
            fontStyle: "italic",
            color: "var(--color-ink)",
            lineHeight: 1.3,
            margin: "0 0 clamp(0.5rem, 1.5vh, 0.875rem) 0",
            maxWidth: "38ch",
          }}
        >
          Film screenings. Book swaps. Coffee cuppings.
        </motion.p>

        <motion.p
          {...itemReveal(0.2)}
          style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: "clamp(0.875rem, 1.05vw, 1rem)",
            fontWeight: 300,
            color: "var(--color-text-secondary)",
            lineHeight: 1.65,
            margin: "0 0 clamp(1.75rem, 4vh, 2.5rem) 0",
          }}
        >
          What&apos;s on changes. Follow us and you&apos;ll know before anyone else.
        </motion.p>

        <motion.a
          {...itemReveal(0.28)}
          href="https://instagram.com/beku.blr"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5em",
            fontFamily: "var(--font-dm-sans)",
            fontSize: "clamp(0.8125rem, 0.95vw, 0.9375rem)",
            fontWeight: 400,
            color: "var(--color-ink)",
            letterSpacing: "0.04em",
            textDecoration: "none",
            paddingBottom: "2px",
            borderBottom: "1px solid rgba(62,80,64,0.35)",
            transition: "border-color 200ms ease, color 200ms ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "rgba(62,80,64,0.8)"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(62,80,64,0.35)"
          }}
        >
          @beku.blr on Instagram
          <span aria-hidden="true" style={{ fontSize: "0.85em", opacity: 0.6 }}>↗</span>
        </motion.a>
      </div>
    </section>
  )
}
