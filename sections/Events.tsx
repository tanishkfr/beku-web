"use client"

import Image from "next/image"
import { useState } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { EASE, H_PAD, IMG_PAD } from "@/lib/tokens"

const EVENTS_SRC = "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=2070&q=82"

const EVENTS = [
  {
    cadence: "Every Thursday",
    name: "Film Screening",
    quirk: "We've shown Tarkovsky twice. Both times the filter coffee ran out before the film ended.",
  },
  {
    cadence: "First Saturday",
    name: "Book Swap",
    quirk: "Someone once left a Tolstoy and took a cookbook. We respect that.",
  },
  {
    cadence: "Last Sunday",
    name: "Coffee Cupping",
    quirk: "Last month someone identified the Ethiopian process by smell alone. We gave them the bag.",
  },
]

export function Events() {
  const prefersReduced = useReducedMotion()
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

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
        {EVENTS.map((event, i) => {
          const isOpen = openIndex === i
          const isHovered = hoveredIndex === i

          return (
            <motion.div
              key={event.name}
              role="listitem"
              {...itemReveal(0.1 + i * 0.1)}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                aria-expanded={isOpen}
                style={{
                  width: "100%",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  paddingTop: "clamp(1.25rem, 3vh, 1.75rem)",
                  paddingBottom: "clamp(1.25rem, 3vh, 1.75rem)",
                  borderTop: `1px solid rgba(175, 150, 115, ${i === 0 ? "0.35" : "0.22"})`,
                  display: "grid",
                  gridTemplateColumns: "clamp(9rem, 22vw, 16rem) 1fr auto",
                  gap: "clamp(1.5rem, 4vw, 3rem)",
                  alignItems: "center",
                  textAlign: "left",
                  WebkitTapHighlightColor: "transparent",
                  transition: "opacity 180ms ease",
                  opacity: hoveredIndex !== null && !isHovered ? 0.55 : 1,
                }}
              >
                <p style={{
                  fontFamily: "var(--font-stamp)",
                  fontSize: "clamp(0.6875rem, 1vw, 0.8125rem)",
                  fontWeight: 400,
                  color: "var(--color-warmwood)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  margin: 0,
                  opacity: 0.8,
                }}>
                  {event.cadence}
                </p>

                <p style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "clamp(1.375rem, 2.4vw, 2rem)",
                  fontWeight: 400,
                  fontStyle: "italic",
                  color: "var(--color-ink)",
                  lineHeight: 1.2,
                  margin: 0,
                  transition: "letter-spacing 220ms ease",
                  letterSpacing: isHovered && !prefersReduced ? "0.01em" : "0",
                }}>
                  {event.name}
                </p>

                {/* Arrow indicator */}
                <motion.span
                  aria-hidden="true"
                  animate={{ rotate: isOpen ? 90 : 0, opacity: isHovered || isOpen ? 0.7 : 0.25 }}
                  transition={{ duration: 0.22, ease: EASE }}
                  style={{
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: "clamp(0.875rem, 1.1vw, 1rem)",
                    color: "var(--color-warmwood)",
                    display: "inline-block",
                    flexShrink: 0,
                  }}
                >
                  →
                </motion.span>
              </button>

              {/* Quirky reveal */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0, transition: { duration: 0.18, ease: EASE } }}
                    transition={{ duration: 0.32, ease: EASE }}
                    style={{ overflow: "hidden" }}
                  >
                    <p style={{
                      fontFamily: "var(--font-dm-sans)",
                      fontSize: "clamp(0.875rem, 1.05vw, 1rem)",
                      fontWeight: 300,
                      fontStyle: "italic",
                      color: "var(--color-text-secondary)",
                      lineHeight: 1.65,
                      margin: 0,
                      paddingBottom: "clamp(1.25rem, 3vh, 1.75rem)",
                      paddingLeft: "clamp(1rem, 22vw, 16rem)",
                      maxWidth: "52ch",
                    }}>
                      {event.quirk}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
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
