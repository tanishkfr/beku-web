"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { EXPERIMENTS } from "@/lib/experiments"

const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, label, .beku-spine, [data-cursor="grow"]'

/**
 * An on-brand cursor: a small filled dot that tracks exactly, plus a ring that
 * follows with a gentle lag and opens up over interactive elements. Uses
 * mix-blend-mode so it stays legible (ink on paper, cream over the dark rooms)
 * without per-section colour logic. Fine-pointer + motion-OK devices only;
 * otherwise the native cursor is left untouched.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 350, damping: 28, mass: 0.4 })
  const ringY = useSpring(y, { stiffness: 350, damping: 28, mass: 0.4 })

  useEffect(() => {
    if (!EXPERIMENTS.customCursor) return
    const fine = window.matchMedia("(pointer: fine)").matches
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (!fine || reduced) return

    setEnabled(true)
    document.documentElement.classList.add("beku-cursor-active")

    const move = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      const t = e.target as Element | null
      setHovering(!!t && !!t.closest(INTERACTIVE))
    }
    const hide = () => { x.set(-100); y.set(-100) }

    window.addEventListener("mousemove", move)
    document.addEventListener("mouseleave", hide)
    return () => {
      window.removeEventListener("mousemove", move)
      document.removeEventListener("mouseleave", hide)
      document.documentElement.classList.remove("beku-cursor-active")
    }
  }, [x, y])

  if (!enabled) return null

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 300,
        pointerEvents: "none",
        mixBlendMode: "difference",
      }}
    >
      {/* Trailing ring */}
      <motion.div
        animate={{ scale: hovering ? 1.7 : 1, opacity: hovering ? 0.9 : 0.5 }}
        transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          x: ringX,
          y: ringY,
          width: 26,
          height: 26,
          marginLeft: -13,
          marginTop: -13,
          border: "1px solid #F6F0E4",
          borderRadius: "50%",
        }}
      />
      {/* Exact-tracking dot */}
      <motion.div
        animate={{ scale: hovering ? 0.6 : 1 }}
        transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          x,
          y,
          width: 7,
          height: 7,
          marginLeft: -3.5,
          marginTop: -3.5,
          backgroundColor: "#F6F0E4",
          borderRadius: "50%",
        }}
      />
    </div>
  )
}
