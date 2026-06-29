"use client"

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react"
import { useReducedMotion } from "framer-motion"
import { EXPERIMENTS } from "@/lib/experiments"

interface Props {
  children: ReactNode
  /** How long the section must stay in view before the note surfaces (ms). */
  delay?: number
  style?: CSSProperties
}

const DEFAULT_DELAY = 5500

/**
 * A quiet aside that fades in only after the visitor has lingered on a section
 * — a reward for not hurrying, never announced. Opacity-only, reserves its line
 * so nothing shifts. No-op when the experiment is off. (Beku's slowness reward.)
 */
export function DwellNote({ children, delay = DEFAULT_DELAY, style }: Props) {
  const prefersReduced = useReducedMotion()
  const ref = useRef<HTMLParagraphElement>(null)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    if (!EXPERIMENTS.slownessReward || revealed) return
    const el = ref.current
    if (!el) return
    let timer: ReturnType<typeof setTimeout> | null = null
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !timer) {
          timer = setTimeout(() => setRevealed(true), delay)
        } else if (!e.isIntersecting && timer) {
          clearTimeout(timer); timer = null
        }
      },
      { threshold: 0.5 }
    )
    obs.observe(el)
    return () => { obs.disconnect(); if (timer) clearTimeout(timer) }
  }, [delay, revealed])

  if (!EXPERIMENTS.slownessReward) return null

  return (
    <p
      ref={ref}
      aria-hidden={!revealed}
      style={{
        fontFamily: "var(--font-cormorant)",
        fontStyle: "italic",
        fontSize: "clamp(0.875rem, 1.1vw, 1rem)",
        color: "var(--color-text-muted)",
        opacity: revealed ? 0.72 : 0,
        transform: revealed ? "translateY(0)" : "translateY(4px)",
        transition: prefersReduced ? "none" : "opacity 900ms ease, transform 900ms ease",
        margin: 0,
        ...style,
      }}
    >
      {children}
    </p>
  )
}
