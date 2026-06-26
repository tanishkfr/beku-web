"use client"

import Image from "next/image"
import { motion, useReducedMotion } from "framer-motion"
import { EASE, H_PAD, IMG_PAD } from "@/lib/tokens"

const EVENTS_SRC = "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=2070&q=82"

const EVENTS = [
  {
    cadence: "Every Thursday",
    name: "Film Screening",
    detail: "Bring something to drink. Doors open 7:30pm.",
  },
  {
    cadence: "First Saturday",
    name: "Book Swap",
    detail: "Bring one, take one. Upstairs, from 11am.",
  },
  {
    cadence: "Last Sunday",
    name: "Coffee Cupping",
    detail: "Six origins. Guided by the team. 10am.",
  },
]

export function Events() {
  const prefersReduced = useReducedMotion()

  const itemReveal = (delay: number) => ({
    initial: { opacity: 0, y: prefersReduced ? 0 : 8 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-6%" as const },
    transition: { duration: 0.9, delay: prefersReduced ? 0 : delay, ease: EASE },
  })

  const revealFade = (delay: number) => ({
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true, margin: "-6%" as const },
    transition: { duration: 1.0, delay: prefersReduced ? 0 : delay, ease: EASE },
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
        {...revealFade(0.05)}
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

      <div role="list" style={{ display: "flex", flexDirection: "column", paddingLeft: H_PAD, paddingRight: H_PAD }}>
        {EVENTS.map((event, i) => (
          <motion.div
            key={event.name}
            role="listitem"
            {...itemReveal(0.1 + i * 0.1)}
            style={{
              paddingTop: "clamp(1.25rem, 3vh, 1.75rem)",
              paddingBottom: "clamp(1.25rem, 3vh, 1.75rem)",
              borderTop: `1px solid rgba(175, 150, 115, ${i === 0 ? "0.35" : "0.22"})`,
              display: "grid",
              gridTemplateColumns: "clamp(8rem, 20vw, 15rem) 1fr",
              gap: "clamp(1.5rem, 4vw, 3rem)",
              alignItems: "baseline",
            }}
          >
            <p style={{
              fontFamily: "var(--font-stamp)",
              fontSize: "clamp(0.5rem, 0.58vw, 0.5625rem)",
              fontWeight: 400,
              color: "var(--color-warmwood)",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              margin: 0,
              opacity: 0.65,
            }}>
              {event.cadence}
            </p>
            <div>
              <p style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(1.375rem, 2.4vw, 2rem)",
                fontWeight: 400,
                fontStyle: "italic",
                color: "var(--color-ink)",
                lineHeight: 1.2,
                margin: "0 0 0.3em 0",
              }}>
                {event.name}
              </p>
              <p style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "clamp(0.8125rem, 0.95vw, 0.9375rem)",
                fontWeight: 300,
                color: "var(--color-text-muted)",
                lineHeight: 1.55,
                margin: 0,
              }}>
                {event.detail}
              </p>
            </div>
          </motion.div>
        ))}
        <div aria-hidden="true" style={{ height: "1px", backgroundColor: "rgba(175, 150, 115, 0.22)" }} />
      </div>

      <motion.p
        {...itemReveal(0.45)}
        style={{
          fontFamily: "var(--font-dm-sans)",
          fontSize: "clamp(0.8125rem, 0.95vw, 0.9375rem)",
          fontWeight: 300,
          color: "var(--color-text-muted)",
          letterSpacing: "0.02em",
          marginTop: "clamp(2rem, 5vh, 3rem)",
          marginBottom: 0,
          paddingLeft: H_PAD,
          paddingRight: H_PAD,
        }}
      >
        Things change. Follow{" "}
        <a
          href="https://instagram.com/beku.blr"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "inherit",
            textDecoration: "none",
            borderBottom: "1px solid rgba(138, 154, 130, 0.32)",
            transition: "border-color 200ms ease",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(138, 154, 130, 0.7)" }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(138, 154, 130, 0.32)" }}
        >
          @beku.blr <span aria-hidden="true" style={{ fontSize: "0.8em" }}>↗</span>
        </a>
        {" "}on Instagram for what&apos;s next.
      </motion.p>
    </section>
  )
}
