"use client"

import { useState, useEffect } from "react"
import { hours } from "@/lib/business"

export type Phase = "morning" | "midday" | "golden" | "night"

export interface TimeOfDay {
  /** Visual light phase, from the visitor's local hour. */
  phase: Phase
  /** False until the client has mounted — render neutral/static until then. */
  mounted: boolean
  /** Whether Beku is currently open (11:00–23:00 local). */
  isOpen: boolean
  /** Human-readable status, e.g. "Open now · until 11pm". */
  status: string
  /** True in the last 40 minutes before close. */
  closesSoon: boolean
}

const OPEN_MIN = hours.openMinutes   // 11:00
const CLOSE_MIN = hours.closeMinutes // 23:00

function phaseFor(hour: number): Phase {
  if (hour >= 5 && hour < 11) return "morning"
  if (hour >= 11 && hour < 16) return "midday"
  if (hour >= 16 && hour < 19) return "golden"
  return "night"
}

function compute(now: Date): Omit<TimeOfDay, "mounted"> {
  const mins = now.getHours() * 60 + now.getMinutes()
  const phase = phaseFor(now.getHours())
  const isOpen = mins >= OPEN_MIN && mins < CLOSE_MIN

  let status: string
  let closesSoon = false

  if (!isOpen) {
    status = mins < OPEN_MIN
      ? `Closed · opens at ${hours.opensLabel}`
      : `Closed · opens tomorrow at ${hours.opensLabel}`
  } else if (CLOSE_MIN - mins <= 40) {
    closesSoon = true
    const left = CLOSE_MIN - mins
    status = `Closing soon · ${left} min left`
  } else {
    status = `Open now · until ${hours.closesLabel}`
  }

  return { phase, isOpen, status, closesSoon }
}

/**
 * Reads the visitor's local time into a light phase + live open/closed status.
 * SSR-safe: returns a neutral "midday" / mounted:false snapshot on the server
 * and first client render, then updates after mount (and every minute).
 */
export function useTimeOfDay(): TimeOfDay {
  const [state, setState] = useState<TimeOfDay>({
    phase: "midday",
    mounted: false,
    isOpen: true,
    status: hours.fullLabel,
    closesSoon: false,
  })

  useEffect(() => {
    const tick = () => setState({ ...compute(new Date()), mounted: true })
    tick()
    const id = setInterval(tick, 60_000)
    return () => clearInterval(id)
  }, [])

  return state
}
