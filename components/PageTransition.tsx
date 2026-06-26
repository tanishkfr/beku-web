"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1]

export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}
