"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useReducedMotion } from "framer-motion"
import { useArrivalContext } from "@/contexts/ArrivalContext"
import { EXPERIMENTS } from "@/lib/experiments"
import { EASE, CREAM, H_PAD } from "@/lib/tokens"

const NAV_LINKS = [
  { label: "Food",   href: "/#menu" },
  { label: "Books",  href: "/#books" },
  { label: "Events", href: "/#events" },
  { label: "Visit",  href: "/#visit" },
  { label: "About",  href: "/about" },
]

// When the room rail handles in-page wayfinding, the desktop navbar steps back
// to just the wordmark + About. Flip roomsNav off and the full nav returns.
const DESKTOP_LINKS = EXPERIMENTS.roomsNav
  ? NAV_LINKS.filter((l) => l.href === "/about")
  : NAV_LINKS

export function Navbar() {
  const { heroBekuVisible } = useArrivalContext()
  const prefersReduced = useReducedMotion()

  const [inArrival, setInArrival]     = useState(true)
  const [inDarkAbout, setInDarkAbout] = useState(false)
  const [mobileOpen, setMobileOpen]   = useState(false)
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)

  const { scrollY } = useScroll()
  // Unused — kept in case future scroll-shadow is added
  const [_scrolled, setScrolled] = useState(false)
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 60))

  useEffect(() => {
    const arrival = document.querySelector('[aria-label="Arrival"]')
    if (!arrival) { setInArrival(false); return }
    const obs = new IntersectionObserver(
      ([entry]) => setInArrival(entry.isIntersecting),
      { threshold: 0 }
    )
    obs.observe(arrival)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const darkEls = document.querySelectorAll("[data-navbar-dark]")
    if (!darkEls.length) return
    const states = new Map<Element, boolean>()
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => states.set(e.target, e.isIntersecting))
        setInDarkAbout([...states.values()].some(Boolean))
      },
      { threshold: 0 }
    )
    darkEls.forEach((el) => { states.set(el, false); obs.observe(el) })
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMobileOpen(false) }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [mobileOpen])

  const isDark = inArrival || inDarkAbout

  // ── Navbar shell ──────────────────────────────────────────────────────────
  // Dark sections: subtle dark glass so cream text always reads against the image.
  // Light sections: familiar frosted cream.
  const navBg     = isDark ? "rgba(18, 30, 22, 0.38)" : "rgba(246, 240, 228, 0.94)"
  const navBlur   = "blur(16px)"
  const navBorder = isDark
    ? "1px solid rgba(246, 240, 228, 0.08)"
    : "1px solid rgba(216, 208, 188, 0.45)"

  // ── Link colours ──────────────────────────────────────────────────────────
  // One base colour per mode; hover = full opacity of same colour.
  const linkBase  = isDark ? "rgba(246, 240, 228, 0.82)" : "rgba(24, 40, 32, 0.68)"
  const linkHover = isDark ? "rgba(246, 240, 228, 1.0)"  : "rgba(24, 40, 32, 1.0)"
  const lineColor = (mobileOpen || isDark) ? CREAM : "var(--color-ink)"

  return (
    <>
      <header
        aria-label="Site header"
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          padding: `1.25rem ${H_PAD}`,
          backgroundColor: navBg,
          backdropFilter: navBlur,
          WebkitBackdropFilter: navBlur,
          borderBottom: navBorder,
          transition: "background-color 350ms ease, border-color 350ms ease",
        }}
      >
        {/* Wordmark — FLIP target */}
        <div style={{ flex: "0 0 auto" }}>
          <AnimatePresence>
            {!heroBekuVisible && (
              <motion.div
                layoutId="beku-wordmark"
                initial={{ opacity: prefersReduced ? 1 : 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 1 }}
                transition={prefersReduced ? { duration: 0 } : {
                  // Tween matched to the hero side so the hand-off is continuous.
                  layout: { duration: 0.5, ease: EASE },
                  opacity: { duration: 0.3, ease: EASE },
                }}
                style={{ zIndex: 51, transformOrigin: "left top", willChange: "transform" }}
              >
                <Link
                  href="/"
                  onClick={() => setMobileOpen(false)}
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontSize: "1.3125rem",
                    fontWeight: 400,
                    color: (mobileOpen || isDark) ? CREAM : "var(--color-forest)",
                    letterSpacing: "0.03em",
                    textDecoration: "none",
                    transition: "color 350ms ease",
                    display: "block",
                    whiteSpace: "nowrap",
                  }}
                >
                  Beku.
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div style={{ flex: 1 }} />

        {/* Desktop nav */}
        <nav
          aria-label="Main navigation"
          className="hidden md:flex items-center"
          style={{ gap: "2rem" }}
        >
          {DESKTOP_LINKS.map(({ label, href }) => {
            const isHovered = hoveredLink === href
            return (
              <Link
                key={href}
                href={href}
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "0.8125rem",
                  fontWeight: 300,
                  color: isHovered ? linkHover : linkBase,
                  letterSpacing: "0.07em",
                  textDecoration: "none",
                  position: "relative",
                  paddingBottom: "2px",
                  transition: "color 220ms ease",
                }}
                onMouseEnter={() => setHoveredLink(href)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                {label}
                {/* Underline draws in from left on hover */}
                <motion.span
                  aria-hidden="true"
                  animate={{ scaleX: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.2, ease: EASE }}
                  style={{
                    position: "absolute",
                    bottom: 0, left: 0, right: 0,
                    height: "0.75px",
                    backgroundColor: isDark
                      ? "rgba(246, 240, 228, 0.45)"
                      : "rgba(24, 40, 32, 0.35)",
                    transformOrigin: "left center",
                    display: "block",
                  }}
                />
              </Link>
            )
          })}
        </nav>

        {/* Hamburger */}
        <button
          className="flex flex-col md:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((o) => !o)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "6px",
            gap: "5px",
            width: "32px",
            flexDirection: "column",
            justifyContent: "center",
            position: "relative",
            zIndex: 51,
            flexShrink: 0,
          }}
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              animate={
                mobileOpen
                  ? i === 0 ? { rotate: 45,  y: 6,  opacity: 1 }
                  : i === 1 ? { opacity: 0, scaleX: 0 }
                  :           { rotate: -45, y: -6, opacity: 1 }
                  : { rotate: 0, y: 0, opacity: 1, scaleX: 1 }
              }
              transition={{ duration: 0.28, ease: EASE }}
              style={{
                display: "block",
                height: "1.5px",
                width: i === 1 ? "65%" : "100%",
                backgroundColor: lineColor,
                borderRadius: "2px",
                transformOrigin: "center",
                transition: "background-color 350ms ease, width 280ms ease",
              }}
            />
          ))}
        </button>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: EASE }}
            aria-modal="true"
            role="dialog"
            aria-label="Navigation menu"
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(24, 40, 32, 0.98)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              zIndex: 49,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: `0 ${H_PAD}`,
            }}
          >
            <nav aria-label="Mobile navigation">
              {NAV_LINKS.map(({ label, href }, i) => (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.36, delay: 0.05 + i * 0.06, ease: EASE }}
                >
                  <Link
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    style={{
                      display: "block",
                      fontFamily: "var(--font-cormorant)",
                      fontSize: "clamp(2.5rem, 11vw, 4rem)",
                      fontWeight: 300,
                      fontStyle: "italic",
                      color: CREAM,
                      textDecoration: "none",
                      lineHeight: 1.2,
                      opacity: 0.72,
                      paddingBottom: "0.08em",
                      transition: "opacity 200ms ease, letter-spacing 200ms ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = "1"
                      e.currentTarget.style.letterSpacing = "0.02em"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = "0.72"
                      e.currentTarget.style.letterSpacing = "0"
                    }}
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.44, ease: EASE }}
              style={{
                position: "absolute",
                bottom: "clamp(2.5rem, 6vh, 4rem)",
                left: H_PAD,
                display: "flex",
                flexDirection: "column",
                gap: "0.35rem",
              }}
            >
              <p style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "0.6875rem",
                fontWeight: 300,
                color: "rgba(246, 240, 228, 0.32)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                margin: 0,
              }}>
                Open every day · 11am – 11pm
              </p>
              <p style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "0.6875rem",
                fontWeight: 300,
                color: "rgba(246, 240, 228, 0.20)",
                letterSpacing: "0.06em",
                margin: 0,
              }}>
                JP Nagar, Bangalore
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
