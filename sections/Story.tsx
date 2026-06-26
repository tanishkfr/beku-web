"use client"

import { useRef } from "react"
import { motion, useReducedMotion, useScroll, useMotionValueEvent } from "framer-motion"
import { EASE, H_PAD } from "@/lib/tokens"

const SENTENCE = "People order one coffee and end up staying for lunch."
const WORDS = SENTENCE.split(" ")

// Question: How does it feel to be here?
// Each word begins as ghost text. As you scroll, words sharpen into focus —
// the correlation between scroll position and reveal is the experience itself.

export function Story() {
  const prefersReduced = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 105%", "center 28%"],
  })

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (prefersReduced) return
    const revealUpTo = (v / 0.9) * WORDS.length
    wordRefs.current.forEach((span, i) => {
      if (!span) return
      const revealed = i < revealUpTo
      span.style.opacity = revealed ? "1" : "0.12"
      span.style.transform = revealed ? "translateY(0px)" : "translateY(6px)"
      span.style.fontStyle = revealed ? "normal" : "italic"
    })
  })

  return (
    <section
      ref={sectionRef}
      aria-label="The feeling of staying"
      style={{
        paddingTop: "clamp(7rem, 16vh, 12rem)",
        paddingBottom: "clamp(7rem, 16vh, 12rem)",
        background: [
          "linear-gradient(to bottom, rgba(20,38,26,0.18) 0%, transparent 6%)",
          "var(--color-bg-story)",
        ].join(", "),
      }}
    >
      {!prefersReduced && (
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.6 }}
          viewport={{ once: true, margin: "0%" }}
          transition={{ duration: 0.9, ease: EASE }}
          style={{
            fontFamily: "var(--font-stamp)",
            fontSize: "clamp(0.5rem, 0.6vw, 0.5625rem)",
            fontWeight: 400,
            color: "var(--color-warmwood)",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            margin: "0 0 clamp(1.5rem, 3.5vh, 2.25rem) 0",
            paddingLeft: H_PAD,
          }}
        >
          Overheard at Beku
        </motion.h2>
      )}

      <p
        style={{
          fontFamily: "var(--font-cormorant)",
          fontSize: "clamp(2rem, 3.8vw, 3.5rem)",
          fontWeight: 400,
          color: "var(--color-ink)",
          lineHeight: 1.18,
          letterSpacing: "-0.02em",
          margin: 0,
          paddingLeft: H_PAD,
          paddingRight: H_PAD,
          maxWidth: "min(900px, calc(100vw - 2 * clamp(2rem, 8vw, 7rem)))",
        }}
      >
        {WORDS.map((word, i) => (
          <span
            key={i}
            ref={(el) => { wordRefs.current[i] = el }}
            style={{
              display: "inline-block",
              marginRight: i < WORDS.length - 1 ? "0.28em" : 0,
              opacity: prefersReduced ? 1 : 0.12,
              transform: prefersReduced ? "none" : "translateY(6px)",
              fontStyle: prefersReduced ? "normal" : "italic",
              transition: "opacity 350ms ease, transform 350ms ease",
            }}
          >
            {word}
          </span>
        ))}
      </p>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "0%" }}
        transition={{ duration: 0.9, delay: prefersReduced ? 0 : 0.4, ease: EASE }}
        style={{
          fontFamily: "var(--font-dm-sans)",
          fontSize: "clamp(0.9375rem, 1.25vw, 1.125rem)",
          fontWeight: 400,
          color: "var(--color-text-secondary)",
          lineHeight: 1.75,
          margin: 0,
          marginTop: "clamp(1.5rem, 4vh, 2.5rem)",
          paddingLeft: H_PAD,
          paddingRight: H_PAD,
        }}
      >
        Nobody gets hurried out.
      </motion.p>
    </section>
  )
}
