"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { EASE } from "@/lib/tokens"

export function SplashScreen() {
  const prefersReduced = useReducedMotion()
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (prefersReduced) { setVisible(false); return }
    const t = setTimeout(() => setVisible(false), 1100)
    return () => clearTimeout(t)
  }, [prefersReduced])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: EASE }}
          aria-hidden="true"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 150,
            backgroundColor: "#182820",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.6rem",
            pointerEvents: "none",
          }}
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.12, ease: EASE }}
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(4rem, 9vw, 7rem)",
              fontWeight: 300,
              color: "#F6F0E4",
              letterSpacing: "0.03em",
              lineHeight: 1,
              margin: 0,
            }}
          >
            Beku.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.28 }}
            transition={{ duration: 0.5, delay: 0.35, ease: EASE }}
            lang="kn"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(0.8125rem, 1.1vw, 1.0625rem)",
              fontWeight: 300,
              color: "#F6F0E4",
              letterSpacing: "0.04em",
              margin: 0,
            }}
          >
            ಬೇಕು
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
