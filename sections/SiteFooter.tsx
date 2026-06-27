"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { motion, useReducedMotion, AnimatePresence } from "framer-motion"
import { EASE, IMG_PAD, H_PAD } from "@/lib/tokens"

const FOOTER_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=900&q=82",
    alt: "Beku at evening — warm light through the gate",
    position: "center",
  },
  {
    src: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=900&q=82",
    alt: "Books on the shelves at Beku",
    position: "center 40%",
  },
  {
    src: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=900&q=82",
    alt: "An afternoon at Beku café",
    position: "center 60%",
  },
]

// Question: A quiet goodbye.
// The last image — the entrance, warm amber glow from within.
// Below it: just the name and the year.

export function SiteFooter() {
  const prefersReduced = useReducedMotion()
  const [playing, setPlaying] = useState(false)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const sourcesRef = useRef<AudioBufferSourceNode[]>([])
  const masterGainRef = useRef<GainNode | null>(null)

  useEffect(() => {
    return () => { audioCtxRef.current?.close() }
  }, [])

  const toggleSound = () => {
    if (playing) {
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

        // Layer 1: room tone (60–250 Hz)
        const roomBuf = ctx.createBuffer(1, ctx.sampleRate * 6, ctx.sampleRate)
        const roomData = roomBuf.getChannelData(0)
        for (let i = 0; i < roomBuf.length; i++) roomData[i] = Math.random() * 2 - 1
        const room = ctx.createBufferSource()
        room.buffer = roomBuf
        room.loop = true
        const roomHp = ctx.createBiquadFilter(); roomHp.type = "highpass"; roomHp.frequency.value = 60
        const roomLp = ctx.createBiquadFilter(); roomLp.type = "lowpass"; roomLp.frequency.value = 250
        const roomGain = ctx.createGain(); roomGain.gain.value = 0.03
        room.connect(roomHp); roomHp.connect(roomLp); roomLp.connect(roomGain); roomGain.connect(master)
        room.start(); sourcesRef.current.push(room)

        // Layer 2: conversation murmur (300–2200 Hz) with AM
        const murBuf = ctx.createBuffer(1, ctx.sampleRate * 8, ctx.sampleRate)
        const murData = murBuf.getChannelData(0)
        for (let i = 0; i < murBuf.length; i++) murData[i] = Math.random() * 2 - 1
        const mur = ctx.createBufferSource()
        mur.buffer = murBuf; mur.loop = true
        const murHp = ctx.createBiquadFilter(); murHp.type = "highpass"; murHp.frequency.value = 300
        const murLp = ctx.createBiquadFilter(); murLp.type = "lowpass"; murLp.frequency.value = 2200
        const murGain = ctx.createGain(); murGain.gain.value = 0.038
        const lfo = ctx.createOscillator(); lfo.frequency.value = 0.18
        const lfoGain = ctx.createGain(); lfoGain.gain.value = 0.012
        lfo.connect(lfoGain); lfoGain.connect(murGain.gain); lfo.start()
        mur.connect(murHp); murHp.connect(murLp); murLp.connect(murGain); murGain.connect(master)
        mur.start(); sourcesRef.current.push(mur)

        // Layer 3: presence (3000–7000 Hz)
        const airBuf = ctx.createBuffer(1, ctx.sampleRate * 4, ctx.sampleRate)
        const airData = airBuf.getChannelData(0)
        for (let i = 0; i < airBuf.length; i++) airData[i] = Math.random() * 2 - 1
        const air = ctx.createBufferSource()
        air.buffer = airBuf; air.loop = true
        const airHp = ctx.createBiquadFilter(); airHp.type = "highpass"; airHp.frequency.value = 3000
        const airLp = ctx.createBiquadFilter(); airLp.type = "lowpass"; airLp.frequency.value = 7000
        const airGain = ctx.createGain(); airGain.gain.value = 0.008
        air.connect(airHp); airHp.connect(airLp); airLp.connect(airGain); airGain.connect(master)
        air.start(); sourcesRef.current.push(air)

        setPlaying(true)
      } catch {
        // AudioContext unavailable
      }
    }
  }

  const CREAM = "#F6F0E4"

  return (
    <footer aria-label="Footer" style={{ backgroundColor: "var(--color-bg-arrival)" }}>
      <motion.div
        initial={{ opacity: prefersReduced ? 1 : 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-4%" }}
        transition={{ duration: 1.4, ease: EASE }}
        style={{
          paddingLeft: IMG_PAD,
          paddingRight: IMG_PAD,
          paddingTop: "clamp(2.5rem, 6vh, 4rem)",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "clamp(4px, 0.6vw, 8px)",
        }}
      >
        <svg aria-hidden="true" style={{ display: "none" }}>
          <defs>
            <filter id="footer-grain">
              <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" />
              <feColorMatrix type="saturate" values="0" />
            </filter>
          </defs>
        </svg>
        {FOOTER_IMAGES.map((img, i) => (
          <div
            key={i}
            style={{
              position: "relative",
              height: "clamp(26vh, 36vh, 46vh)",
              borderRadius: "6px",
              overflow: "hidden",
            }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 768px) 33vw, 33vw"
              style={{ objectFit: "cover", objectPosition: img.position }}
            />
            <svg aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.038, pointerEvents: "none" }}>
              <rect width="100%" height="100%" filter="url(#footer-grain)" />
            </svg>
          </div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: prefersReduced ? 1 : 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-4%" }}
        transition={{ duration: 0.9, delay: prefersReduced ? 0 : 0.2, ease: EASE }}
        style={{
          paddingLeft: H_PAD,
          paddingRight: H_PAD,
          paddingTop: "clamp(2.5rem, 6vh, 4rem)",
          paddingBottom: "clamp(2.5rem, 6vh, 4rem)",
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <div>
          <p style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(2rem, 3.5vw, 3.25rem)",
            fontWeight: 300,
            color: CREAM,
            margin: 0,
            lineHeight: 1,
          }}>
            Beku.
          </p>
          <p
            lang="kn"
            aria-label="Beku in Kannada"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(0.75rem, 0.9vw, 0.875rem)",
              fontWeight: 300,
              color: "rgba(246, 240, 228, 0.32)",
              margin: "0.45em 0 0 0",
              lineHeight: 1,
              letterSpacing: "0.02em",
            }}
          >
            ಬೇಕು
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.6rem" }}>
          {!prefersReduced && (
            <button
              onClick={toggleSound}
              aria-label={playing ? "Stop ambient café sound" : "Play ambient café sound"}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                display: "flex",
                alignItems: "center",
                gap: "0.45em",
                fontFamily: "var(--font-stamp)",
                fontSize: "clamp(0.5rem, 0.6vw, 0.5625rem)",
                fontWeight: 400,
                color: playing ? "rgba(246, 240, 228, 0.52)" : "rgba(246, 240, 228, 0.24)",
                letterSpacing: "0.13em",
                textTransform: "uppercase",
                transition: "color 400ms ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(246, 240, 228, 0.65)" }}
              onMouseLeave={(e) => { e.currentTarget.style.color = playing ? "rgba(246, 240, 228, 0.52)" : "rgba(246, 240, 228, 0.24)" }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={playing ? "listening" : "ambience"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15, ease: EASE }}
                  style={{ pointerEvents: "none" }}
                >
                  {playing ? "Listening" : "Ambience"}
                </motion.span>
              </AnimatePresence>
            </button>
          )}
          <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
            <p style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: "clamp(0.6875rem, 0.8vw, 0.8125rem)",
              fontWeight: 300,
              color: "rgba(246, 240, 228, 0.38)",
              letterSpacing: "0.04em",
              margin: 0,
            }}>
              © {new Date().getFullYear()} Beku. JP Nagar, Bangalore.
            </p>
            <div aria-hidden="true" style={{ width: "1px", height: "0.75em", backgroundColor: "rgba(246, 240, 228, 0.12)" }} />
            {[
              { label: "Instagram", href: "https://instagram.com/beku.blr" },
              { label: "Zomato", href: "https://www.zomato.com/bangalore/beku-cafe-bakery-bookstore-1-jp-nagar-bangalore" },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "clamp(0.6875rem, 0.8vw, 0.8125rem)",
                  fontWeight: 300,
                  color: "rgba(246, 240, 228, 0.50)",
                  letterSpacing: "0.04em",
                  textDecoration: "none",
                  transition: "color 200ms ease",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(246, 240, 228, 0.85)" }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(246, 240, 228, 0.50)" }}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </footer>
  )
}
