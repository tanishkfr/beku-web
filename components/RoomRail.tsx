"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useReducedMotion } from "framer-motion"
import { EXPERIMENTS } from "@/lib/experiments"
import { CREAM } from "@/lib/tokens"

// The homepage as a sequence of rooms — named the way someone who works here
// might point you through the house, not generic section labels. Index matches
// the order of <section> elements inside #main-content.
const ROOMS = [
  "The gate",
  "Staying",
  "The counter",
  "Under the tree",
  "The shelves",
  "Overheard",
  "A secret",
  "What's on",
  "Find us",
]

/**
 * A slim right-margin rail showing which room you're in — book-style, not a
 * dashboard bar. Desktop only. No-op when the experiment is off.
 */
export function RoomRail() {
  const prefersReduced = useReducedMotion()
  const [active, setActive] = useState(0)
  const [hovered, setHovered] = useState(false)
  const { scrollYProgress } = useScroll()

  useEffect(() => {
    if (!EXPERIMENTS.roomsNav) return
    const main = document.getElementById("main-content")
    if (!main) return
    const sections = Array.from(main.querySelectorAll(":scope > section"))
    if (!sections.length) return

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const i = sections.indexOf(e.target)
            if (i !== -1) setActive(i)
          }
        })
      },
      // Only the section crossing the middle band counts as active.
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    )
    sections.forEach((s) => obs.observe(s))
    return () => obs.disconnect()
  }, [])

  if (!EXPERIMENTS.roomsNav) return null

  const isDark = active === 0 // only Arrival is a dark room
  const ink = isDark ? "rgba(246,240,228,0.62)" : "rgba(28,40,32,0.55)"
  const inkActive = isDark ? CREAM : "var(--color-ink)"

  const scrollTo = (i: number) => {
    const main = document.getElementById("main-content")
    const sections = main?.querySelectorAll(":scope > section")
    sections?.[i]?.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", block: "start" })
  }

  return (
    <div
      className="hidden lg:flex"
      aria-hidden="true"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "fixed",
        right: "clamp(1rem, 2.5vw, 2rem)",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 40,
        flexDirection: "column",
        gap: "0.85rem",
        alignItems: "flex-end",
        padding: "0.5rem",
      }}
    >
      {ROOMS.map((room, i) => {
        const isActive = i === active
        const show = isActive || hovered
        return (
          <button
            key={room}
            onClick={() => scrollTo(i)}
            tabIndex={-1}
            style={{
              display: "flex",
              flexDirection: "row-reverse", // tick on the right, label grows left
              alignItems: "center",
              gap: "0.7rem",
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
            }}
          >
            {/* Tick — active one is longer */}
            <motion.span
              animate={{
                width: isActive ? "1.4rem" : "0.6rem",
                opacity: isActive ? 1 : 0.4,
              }}
              transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
              style={{
                height: "1px",
                backgroundColor: isActive ? inkActive : ink,
                display: "block",
                flexShrink: 0,
              }}
            />
            {/* Label — only the active (or, on hover, all) */}
            <motion.span
              animate={{ opacity: show ? 1 : 0, x: show ? 0 : 4 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              style={{
                fontFamily: isActive ? "var(--font-cormorant)" : "var(--font-stamp)",
                fontStyle: isActive ? "italic" : "normal",
                fontSize: isActive ? "0.8125rem" : "0.5rem",
                fontWeight: 400,
                letterSpacing: isActive ? "0.01em" : "0.12em",
                textTransform: isActive ? "none" : "uppercase",
                color: isActive ? inkActive : ink,
                whiteSpace: "nowrap",
                textAlign: "right",
                pointerEvents: "none",
              }}
            >
              {room}
            </motion.span>
          </button>
        )
      })}

      {/* Progress hairline behind the ticks */}
      {!prefersReduced && (
        <motion.span
          aria-hidden="true"
          style={{
            position: "absolute",
            right: "0.5rem",
            top: 0,
            bottom: 0,
            width: "1px",
            transformOrigin: "top center",
            scaleY: scrollYProgress,
            backgroundColor: isDark ? "rgba(246,240,228,0.14)" : "rgba(28,40,32,0.10)",
            zIndex: -1,
          }}
        />
      )}
    </div>
  )
}
