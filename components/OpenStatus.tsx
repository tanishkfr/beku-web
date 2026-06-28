"use client"

import { useTimeOfDay } from "@/lib/useTimeOfDay"
import { EXPERIMENTS } from "@/lib/experiments"
import type { CSSProperties } from "react"

interface Props {
  /** Text shown on the server / before mount / when the experiment is off. */
  fallback: string
  /** Style for the text span — caller controls colour, size, spacing. */
  style?: CSSProperties
  /** Whether to show the small live status dot. */
  showDot?: boolean
}

/**
 * Live "Open now · until 11pm" / "Closing soon" / "Closed" status from the
 * visitor's local time. Falls back to static hours text when the experiment
 * is off or before the client mounts (keeps SSR markup stable).
 */
export function OpenStatus({ fallback, style, showDot = true }: Props) {
  const { mounted, isOpen, status, closesSoon } = useTimeOfDay()

  const live = EXPERIMENTS.timeAwareLight && mounted
  const text = live ? status : fallback

  const dot = closesSoon
    ? "#C06B30"              // mysore pak — closing soon
    : isOpen
      ? "#6B8C72"            // sage — open
      : "rgba(154,138,120,0.7)" // ghost — closed

  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5em" }}>
      {showDot && live && (
        <span
          aria-hidden="true"
          style={{
            width: "5px",
            height: "5px",
            borderRadius: "50%",
            backgroundColor: dot,
            opacity: isOpen ? 0.9 : 0.5,
            flexShrink: 0,
          }}
        />
      )}
      <span style={style}>{text}</span>
    </span>
  )
}
