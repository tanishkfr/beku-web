"use client"

import React from "react"
import Image from "next/image"
import { motion, useReducedMotion, AnimatePresence } from "framer-motion"
import { useArrivalContext } from "@/contexts/ArrivalContext"
import { OpenStatus } from "@/components/OpenStatus"
import { EASE, H_PAD, CREAM, CREAM_DIM, CREAM_MUTED } from "@/lib/tokens"

const HERO_SRC = "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?auto=format&fit=crop&w=2070&q=85"
const INTERIOR_SRC = "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=2070&q=82"

function BekuWordmark({ prefersReduced }: { prefersReduced: boolean | null }) {
  return (
    <motion.h1
      layoutId="beku-wordmark"
      initial={{ opacity: prefersReduced ? 1 : 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={prefersReduced ? { duration: 0 } : {
        layout: { type: "spring", stiffness: 260, damping: 32 },
        // No delay on opacity — the FLIP carries visual continuity
        opacity: { duration: 0.35, ease: EASE },
      }}
      style={{
        fontFamily: "var(--font-cormorant)",
        fontSize: "clamp(5.5rem, 12vw, 10.5rem)",
        fontWeight: 400,
        color: CREAM,
        letterSpacing: "0.03em",
        lineHeight: 0.86,
        whiteSpace: "nowrap",
        margin: "0 0 clamp(1.25rem, 3vh, 2rem) 0",
      }}
    >
      Beku.
    </motion.h1>
  )
}

export function Arrival() {
  const prefersReduced = useReducedMotion()
  const { heroBekuVisible } = useArrivalContext()

  const fade = (delay: number) => ({
    initial: { opacity: prefersReduced ? 1 : 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.9, delay: prefersReduced ? 0 : delay, ease: EASE },
  })

  const reveal = {
    initial: { opacity: 0, y: prefersReduced ? 0 : 10 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-6%" as const },
    transition: { duration: 0.9, ease: EASE },
  }

  return (
    <section aria-label="Arrival" style={{ background: "var(--color-bg-arrival)" }}>

      {/* ── Beat 1: Full-bleed hero ── */}
      <div style={{ position: "relative", minHeight: "100dvh", overflow: "hidden" }}>

        <motion.div
          initial={{ opacity: prefersReduced ? 1 : 0, scale: prefersReduced ? 1 : 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2.8, ease: [0.16, 0.1, 0.3, 1] }}
          style={{ position: "absolute", inset: 0 }}
        >
          <Image
            src={HERO_SRC}
            alt="Outdoor seating at Beku, under the rain tree"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center 40%" }}
          />
        </motion.div>

        {/* Atmospheric scrim */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background: [
              "linear-gradient(to right, rgba(20,38,26,0.92) 0%, rgba(20,38,26,0.52) 44%, rgba(20,38,26,0.12) 100%)",
              "linear-gradient(to top, rgba(20,38,26,0.88) 0%, rgba(20,38,26,0.30) 40%, rgba(20,38,26,0.04) 100%)",
            ].join(", "),
            pointerEvents: "none",
          }}
        />

        {/* Dappled canopy shadow */}
        {!prefersReduced && (
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              background: [
                "radial-gradient(ellipse 28% 12% at 18% 5%, rgba(8,20,12,0.38) 0%, transparent 100%)",
                "radial-gradient(ellipse 22% 10% at 55% 8%, rgba(8,20,12,0.28) 0%, transparent 100%)",
                "radial-gradient(ellipse 18% 8% at 78% 6%, rgba(8,20,12,0.32) 0%, transparent 100%)",
                "radial-gradient(ellipse 14% 6% at 38% 18%, rgba(8,20,12,0.20) 0%, transparent 100%)",
              ].join(", "),
            }}
          />
        )}

        {/* Location label */}
        <motion.p
          {...fade(0.6)}
          style={{
            position: "absolute",
            top: "clamp(5.5rem, 11vh, 7.5rem)",
            left: H_PAD,
            fontFamily: "var(--font-stamp)",
            fontSize: "clamp(0.5rem, 0.62vw, 0.5625rem)",
            fontWeight: 400,
            color: CREAM_MUTED,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            margin: 0,
          }}
        >
          Café, Bakery, Bookstore · JP Nagar
        </motion.p>

        {/* Google rating */}
        <motion.div
          {...fade(0.8)}
          style={{
            position: "absolute",
            top: "clamp(5.25rem, 10.5vh, 7.25rem)",
            right: H_PAD,
            display: "flex",
            alignItems: "center",
            gap: "0.35em",
            background: "rgba(14, 24, 18, 0.52)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            borderRadius: "2px",
            border: "1px solid rgba(246, 240, 228, 0.10)",
            padding: "0.45em 0.8em",
          }}
        >
          <span
            aria-label="4.7 stars on Google"
            style={{
              fontFamily: "var(--font-stamp)",
              fontSize: "clamp(0.5rem, 0.62vw, 0.5625rem)",
              fontWeight: 400,
              color: "rgba(246, 240, 228, 0.78)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            4.7 ★ · 1,892 reviews
          </span>
        </motion.div>

        {/* Hero text — lower third. This is what the FLIP watches. */}
        <div
          data-beku-hero=""
          style={{
            position: "absolute",
            bottom: "clamp(7rem, 16vh, 10rem)",
            left: H_PAD,
            right: H_PAD,
            maxWidth: "clamp(280px, 58vw, 680px)",
          }}
        >
          <AnimatePresence>
            {heroBekuVisible && (
              <BekuWordmark prefersReduced={prefersReduced} />
            )}
          </AnimatePresence>

          <motion.p
            initial={{ opacity: prefersReduced ? 1 : 0, filter: prefersReduced ? "blur(0px)" : "blur(6px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.9, delay: prefersReduced ? 0 : 1.0, ease: EASE }}
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(1.125rem, 2.2vw, 1.875rem)",
              fontWeight: 300,
              fontStyle: "italic",
              color: CREAM_DIM,
              lineHeight: 1.35,
              margin: 0,
              letterSpacing: "-0.01em",
              textWrap: "balance",
            } as React.CSSProperties}
          >
            The Bangalore you wish there were more of.
          </motion.p>
        </div>

        {/* Bottom strip */}
        <motion.div
          {...fade(2.0)}
          style={{
            position: "absolute",
            bottom: 0,
            left: H_PAD,
            right: H_PAD,
          }}
        >
          <div aria-hidden="true" style={{ height: "1px", backgroundColor: "rgba(246,240,228,0.09)" }} />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingTop: "clamp(0.875rem, 1.75vh, 1.25rem)",
              paddingBottom: "clamp(1.25rem, 2.5vh, 1.875rem)",
            }}
          >
            <p style={{ margin: 0, color: CREAM_MUTED }}>
              <OpenStatus
                fallback="Open every day · 11am – 11pm"
                style={{
                  fontFamily: "var(--font-stamp)",
                  fontSize: "clamp(0.5rem, 0.58vw, 0.5625rem)",
                  fontWeight: 400,
                  color: CREAM_MUTED,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}
              />
            </p>
            <span
              lang="kn"
              aria-label="Beku in Kannada"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(0.8125rem, 1vw, 0.9375rem)",
                fontWeight: 300,
                color: CREAM_MUTED,
                letterSpacing: "0.02em",
                userSelect: "none",
              }}
            >
              ಬೇಕು
            </span>
          </div>
        </motion.div>
      </div>

      {/* ── Beat 2: Invitation ── */}
      <div
        style={{
          paddingTop: "clamp(4rem, 10vh, 7rem)",
          paddingBottom: "clamp(5rem, 12vh, 8rem)",
          paddingLeft: H_PAD,
          paddingRight: H_PAD,
          background: [
            "linear-gradient(to bottom, rgba(14,22,16,0.30) 0%, transparent 28%)",
            "radial-gradient(ellipse 70% 60% at 22% 55%, rgba(61,97,71,0.10) 0%, transparent 100%)",
          ].join(", "),
        }}
      >
        <motion.div
          {...reveal}
          style={{
            borderLeft: "1px solid rgba(61,97,71,0.65)",
            paddingLeft: "clamp(1rem, 2vw, 1.5rem)",
            display: "inline-block",
          }}
        >
          <p style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
            fontWeight: 400,
            fontStyle: "italic",
            color: "rgba(246,240,228,0.85)",
            letterSpacing: "-0.01em",
            lineHeight: 1.3,
            margin: 0,
          }}>
            Step inside.
            <br />
            The traffic can wait.
          </p>
        </motion.div>
      </div>

      {/* ── Beat 3: Interior image ── */}
      <motion.div
        initial={{ opacity: prefersReduced ? 1 : 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-6%" }}
        transition={{ duration: 1.2, ease: EASE }}
        style={{
          paddingLeft: "clamp(1rem, 3.5vw, 2.5rem)",
          paddingRight: "clamp(1rem, 3.5vw, 2.5rem)",
        }}
      >
        <div style={{
          position: "relative",
          width: "100%",
          height: "clamp(55vh, 74vh, 84vh)",
          borderRadius: "6px",
          overflow: "hidden",
        }}>
          <Image
            src={INTERIOR_SRC}
            alt="Inside Beku — warm wood surfaces, afternoon light"
            fill
            sizes="(max-width: 768px) 100vw, 100vw"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
          <svg aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.038, pointerEvents: "none" }}>
            <filter id="arrival-interior-grain">
              <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#arrival-interior-grain)" />
          </svg>
        </div>
      </motion.div>

      {/* Grounding caption */}
      <motion.p
        initial={{ opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 6 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-6%" }}
        transition={{ duration: 0.8, ease: EASE }}
        style={{
          fontFamily: "var(--font-stamp)",
          fontSize: "clamp(0.6875rem, 0.85vw, 0.8125rem)",
          fontWeight: 400,
          color: "rgba(246,240,228,0.35)",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          margin: 0,
          paddingTop: "clamp(1.75rem, 3.5vh, 2.5rem)",
          paddingBottom: "clamp(6rem, 14vh, 10rem)",
          paddingLeft: "clamp(1rem, 3.5vw, 2.5rem)",
          paddingRight: "clamp(1rem, 3.5vw, 2.5rem)",
        }}
      >
        JP Nagar, Bangalore
      </motion.p>

    </section>
  )
}
