"use client"

import { useEffect } from "react"
import { useTimeOfDay } from "@/lib/useTimeOfDay"
import { EXPERIMENTS } from "@/lib/experiments"

/**
 * Sets `data-phase` on <html> so globals.css can shift the palette to match
 * the visitor's local hour. Renders nothing. No-op when the experiment is off.
 */
export function TimeOfDayController() {
  const { phase, mounted } = useTimeOfDay()

  useEffect(() => {
    if (!EXPERIMENTS.timeAwareLight) return
    const el = document.documentElement
    if (mounted) el.dataset.phase = phase
    return () => { delete el.dataset.phase }
  }, [phase, mounted])

  return null
}
