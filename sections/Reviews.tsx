"use client"

import { motion, useReducedMotion, useInView } from "framer-motion"
import { useRef } from "react"
import { EASE, H_PAD } from "@/lib/tokens"

const OVERHEARD = [
  {
    quote: "I came here to work.\nI have not worked.",
    credit: "table near the window",
  },
  {
    quote: "Do you think they'd notice if I stayed for dinner?",
    credit: "said at 3 in the afternoon",
  },
  {
    quote: "This croissant is illegal.",
    credit: "table 4, on a Tuesday",
  },
  {
    quote: "Is it always this quiet?\nHow is it always this quiet?",
    credit: "a first visit",
  },
  {
    quote: "We said two hours.\nThat was three coffees ago.",
    credit: "the corner table",
  },
]

export function Reviews() {
  const prefersReduced = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
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

      <motion.p
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
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

      <div style={{ display: "flex", flexDirection: "column", maxWidth: "46ch" }}>
        {OVERHEARD.map((item, i) => (
          <div
            key={i}
            style={{
              marginBottom: i < OVERHEARD.length - 1
                ? "clamp(2.75rem, 6vh, 4.5rem)"
                : 0,
            }}
          >
            <motion.blockquote
              animate={
                isInView
                  ? { opacity: 1, y: 0, filter: "blur(0px)" }
                  : { opacity: 0, y: prefersReduced ? 0 : 10, filter: prefersReduced ? "blur(0px)" : "blur(4px)" }
              }
              transition={{ duration: 0.75, delay: prefersReduced ? 0 : i * 0.13, ease: EASE }}
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(1.5rem, 2.6vw, 2.125rem)",
                fontWeight: 400,
                fontStyle: "italic",
                color: "var(--color-ink)",
                lineHeight: 1.25,
                margin: "0 0 0.5em 0",
              }}
            >
              {item.quote.split("\n").map((line, li, arr) => (
                <span key={li}>
                  {line}
                  {li < arr.length - 1 && <br />}
                </span>
              ))}
            </motion.blockquote>

            <motion.p
              animate={isInView ? { opacity: 0.55 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: prefersReduced ? 0 : i * 0.13 + 0.18, ease: EASE }}
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
        ))}
      </div>
    </section>
  )
}
