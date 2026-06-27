"use client"

import { motion, useReducedMotion, useInView } from "framer-motion"
import { useRef } from "react"
import { EASE, H_PAD } from "@/lib/tokens"

const OVERHEARD = [
  {
    quote: "I came here to work.\nI have not worked.",
    credit: "table near the window",
    size: "lg",
    offset: "0rem",
    align: "left" as const,
  },
  {
    quote: "Do you think they'd notice if I stayed for dinner?",
    credit: "said at 3 in the afternoon",
    size: "sm",
    offset: "clamp(1rem, 3vw, 3rem)",
    align: "right" as const,
  },
  {
    quote: "This croissant is illegal.",
    credit: "table 4, on a Tuesday",
    size: "xl",
    offset: "clamp(1.5rem, 5vw, 4rem)",
    align: "left" as const,
  },
  {
    quote: "Is it always this quiet?\nHow is it always this quiet?",
    credit: "a first visit",
    size: "sm",
    offset: "clamp(2rem, 6vw, 5rem)",
    align: "right" as const,
  },
  {
    quote: "We said two hours.\nThat was three coffees ago.",
    credit: "the corner table",
    size: "lg",
    offset: "clamp(2rem, 7vw, 6rem)",
    align: "left" as const,
  },
]

const FONT_SIZE = {
  xl: "clamp(2.125rem, 4vw, 3.25rem)",
  lg: "clamp(1.625rem, 2.8vw, 2.5rem)",
  sm: "clamp(1.25rem, 2vw, 1.875rem)",
} as const

export function Reviews() {
  const prefersReduced = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  // Single trigger for the whole section — all quotes cascade together
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" })

  return (
    <section
      ref={sectionRef}
      aria-label="What people remember"
      style={{
        paddingTop: "clamp(7rem, 16vh, 12rem)",
        paddingBottom: "clamp(7rem, 16vh, 12rem)",
        paddingLeft: H_PAD,
        paddingRight: H_PAD,
        background: [
          "radial-gradient(ellipse 90% 40% at 50% 110%, rgba(122,84,56,0.10) 0%, transparent 100%)",
          "var(--color-bg-reviews)",
        ].join(", "),
      }}
    >
      <h2 className="sr-only">What people remember</h2>

      {/* Eyebrow */}
      <motion.p
        animate={isInView ? { opacity: 0.6 } : { opacity: 0 }}
        transition={{ duration: 0.8, ease: EASE }}
        style={{
          fontFamily: "var(--font-stamp)",
          fontSize: "clamp(0.5rem, 0.58vw, 0.5625rem)",
          fontWeight: 400,
          color: "var(--color-warmwood)",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          margin: "0 0 clamp(3rem, 8vh, 6rem) 0",
        }}
      >
        Overheard at Beku
      </motion.p>

      {/* Quote cascade */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        {OVERHEARD.map((item, i) => {
          const delay = prefersReduced ? 0 : i * 0.11
          const isRight = item.align === "right"

          return (
            <div
              key={i}
              style={{
                alignSelf: isRight ? "flex-end" : "flex-start",
                marginLeft: isRight ? 0 : item.offset,
                marginRight: isRight ? item.offset : 0,
                textAlign: isRight ? "right" : "left",
                marginBottom: i < OVERHEARD.length - 1
                  ? "clamp(2.5rem, 6vh, 4.5rem)"
                  : 0,
              }}
            >
              {/* Short rule draws before the quote */}
              <motion.div
                aria-hidden="true"
                animate={
                  isInView
                    ? { scaleX: 1, opacity: 0.28 }
                    : { scaleX: 0, opacity: 0 }
                }
                transition={{ duration: 0.48, delay, ease: EASE }}
                style={{
                  height: "1px",
                  width: "clamp(2rem, 4vw, 3.5rem)",
                  backgroundColor: "var(--color-warmwood)",
                  transformOrigin: isRight ? "right center" : "left center",
                  marginBottom: "clamp(0.6rem, 1.2vh, 0.9rem)",
                  marginLeft: isRight ? "auto" : 0,
                }}
              />

              {/* Quote */}
              <motion.blockquote
                animate={
                  isInView
                    ? { opacity: 1, y: 0, filter: "blur(0px)" }
                    : { opacity: 0, y: prefersReduced ? 0 : 20, filter: prefersReduced ? "blur(0px)" : "blur(6px)" }
                }
                transition={{ duration: 0.7, delay: delay + 0.12, ease: EASE }}
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: FONT_SIZE[item.size as keyof typeof FONT_SIZE],
                  fontWeight: 400,
                  fontStyle: "italic",
                  color: "var(--color-ink)",
                  lineHeight: 1.2,
                  margin: "0 0 0.45em 0",
                  maxWidth: "44ch",
                }}
              >
                {item.quote.split("\n").map((line, li, arr) => (
                  <span key={li}>
                    {line}
                    {li < arr.length - 1 && <br />}
                  </span>
                ))}
              </motion.blockquote>

              {/* Attribution */}
              <motion.p
                animate={isInView ? { opacity: 0.48 } : { opacity: 0 }}
                transition={{ duration: 0.45, delay: delay + 0.24, ease: EASE }}
                style={{
                  fontFamily: "var(--font-stamp)",
                  fontSize: "clamp(0.5rem, 0.6vw, 0.5625rem)",
                  fontWeight: 400,
                  color: "var(--color-warmwood)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  margin: 0,
                }}
              >
                {item.credit}
              </motion.p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
