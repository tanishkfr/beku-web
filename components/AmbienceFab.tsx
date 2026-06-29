"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { EASE } from "@/lib/tokens"
import { EXPERIMENTS } from "@/lib/experiments"
import { buildMusic, buildRoomTone } from "@/lib/audio"

/**
 * The café's ambience, brought out of the footer and onto a persistent FAB so
 * it's the first quiet invitation rather than something buried at the bottom.
 * Owns the Web Audio graph; the DSP itself lives in lib/audio. A fixed pill in
 * the bottom-right corner, clear of the centred room-rail.
 */
export function AmbienceFab() {
  const prefersReduced = useReducedMotion()
  const [playing, setPlaying] = useState(false)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const sourcesRef = useRef<AudioScheduledSourceNode[]>([])
  const masterGainRef = useRef<GainNode | null>(null)
  const scheduleRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (scheduleRef.current) clearTimeout(scheduleRef.current)
      audioCtxRef.current?.close()
    }
  }, [])

  const toggleSound = () => {
    if (playing) {
      if (scheduleRef.current) { clearTimeout(scheduleRef.current); scheduleRef.current = null }
      if (masterGainRef.current && audioCtxRef.current) {
        masterGainRef.current.gain.linearRampToValueAtTime(0, audioCtxRef.current.currentTime + 0.8)
        setTimeout(() => {
          sourcesRef.current.forEach(s => { try { s.stop() } catch { /* already stopped */ } })
          sourcesRef.current = []
          audioCtxRef.current?.close()
          audioCtxRef.current = null
        }, 900)
      }
      setPlaying(false)
    } else {
      try {
        const ctx = new AudioContext()
        audioCtxRef.current = ctx
        sourcesRef.current = []

        const master = ctx.createGain()
        master.gain.setValueAtTime(0, ctx.currentTime)
        master.gain.linearRampToValueAtTime(1, ctx.currentTime + 2.5)
        master.connect(ctx.destination)
        masterGainRef.current = master

        if (EXPERIMENTS.generativeMusic) {
          buildMusic(ctx, master, sourcesRef.current, scheduleRef)
        } else {
          buildRoomTone(ctx, master, sourcesRef.current)
        }

        setPlaying(true)
      } catch {
        // AudioContext unavailable
      }
    }
  }

  const soundNoun = EXPERIMENTS.generativeMusic ? "music" : "ambient café sound"
  const idleLabel = "Ambience"
  const liveLabel = EXPERIMENTS.generativeMusic ? "Playing" : "Listening"

  // Three bars — they breathe when playing, sit still otherwise.
  const bars = [0, 1, 2]

  return (
    <motion.button
      onClick={toggleSound}
      aria-label={playing ? `Stop ${soundNoun}` : `Play ${soundNoun}`}
      aria-pressed={playing}
      initial={{ opacity: 0, y: prefersReduced ? 0 : 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
      whileHover={prefersReduced ? undefined : { y: -2 }}
      style={{
        position: "fixed",
        bottom: "clamp(1.25rem, 3vh, 2rem)",
        right: "clamp(1.25rem, 3vw, 2rem)",
        zIndex: 60,
        display: "flex",
        alignItems: "center",
        gap: "0.7em",
        padding: "0.7em 1.1em",
        backgroundColor: playing ? "rgba(24, 40, 32, 0.92)" : "rgba(18, 30, 22, 0.72)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        border: "1px solid rgba(246, 240, 228, 0.16)",
        borderRadius: "100px",
        cursor: "pointer",
        boxShadow: "0 8px 28px rgba(16, 26, 18, 0.32)",
        WebkitTapHighlightColor: "transparent",
      }}
    >
      {/* Equalizer */}
      <span aria-hidden="true" style={{ display: "flex", alignItems: "center", gap: "2px", height: "14px" }}>
        {bars.map((i) => (
          <motion.span
            key={i}
            animate={
              playing && !prefersReduced
                ? { scaleY: [0.35, 1, 0.55, 0.9, 0.4] }
                : { scaleY: playing ? 0.7 : 0.35 }
            }
            transition={
              playing && !prefersReduced
                ? { duration: 0.9 + i * 0.25, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }
                : { duration: 0.3, ease: EASE }
            }
            style={{
              display: "block",
              width: "2.5px",
              height: "100%",
              borderRadius: "2px",
              transformOrigin: "bottom center",
              backgroundColor: playing ? "var(--color-moss-signal)" : "rgba(246, 240, 228, 0.55)",
            }}
          />
        ))}
      </span>

      <span style={{
        fontFamily: "var(--font-stamp)",
        fontSize: "0.5625rem",
        fontWeight: 400,
        letterSpacing: "0.13em",
        textTransform: "uppercase",
        color: playing ? "rgba(246, 240, 228, 0.92)" : "rgba(246, 240, 228, 0.7)",
        transition: "color 300ms ease",
        whiteSpace: "nowrap",
      }}>
        {playing ? liveLabel : idleLabel}
      </span>
    </motion.button>
  )
}
