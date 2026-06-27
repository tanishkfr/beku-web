"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion"
import { useArrivalContext } from "@/contexts/ArrivalContext"
import { EASE, CREAM, H_PAD } from "@/lib/tokens"

const NAV_LINKS = [
  { label: "Food", href: "/#menu" },
  { label: "Books", href: "/#books" },
  { label: "Events", href: "/#events" },
  { label: "Visit", href: "/#visit" },
  { label: "About", href: "/about" },
]

export function Navbar() {
  const { heroBekuVisible } = useArrivalContext()

  const [scrolled, setScrolled] = useState(false)
  const [inArrival, setInArrival] = useState(true)
  const [inDarkAbout, setInDarkAbout] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  // Track which nav link is hovered for the indicator line
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)

  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 60))

  // Arrival section detection — rootMargin shrinks the observer zone so the
  // transition fires cleanly rather than at the first pixel of exit
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

  // Dark-section detection (About page header, Footer) — initialize false, not true
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
    // Initialize all as false — not yet determined
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

  const inDarkSection = inArrival || inDarkAbout
  // Use blur(0px) as the "off" state so CSS can tween to blur(16px)
  const isLight = !inDarkSection

  const textColor = inDarkSection ? "rgba(246,240,228,0.62)" : "var(--color-text-secondary)"
  const textColorHover = inDarkSection ? CREAM : "var(--color-ink)"
  const lineColor = (mobileOpen || inDarkSection) ? CREAM : "var(--color-ink)"

  return (
    <>
      <header
        aria-label="Site header"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          padding: `1.25rem ${H_PAD}`,
          // blur(0px) → blur(16px) interpolates; "none" → blur does not
          backgroundColor: isLight ? "rgba(246,240,228,0.92)" : "transparent",
          backdropFilter: isLight ? "blur(18px)" : "blur(0px)",
          WebkitBackdropFilter: isLight ? "blur(18px)" : "blur(0px)",
          borderBottom: isLight ? "1px solid rgba(216,208,188,0.45)" : "1px solid transparent",
          transition: "background-color 380ms ease, border-color 380ms ease, backdrop-filter 380ms ease",
        }}
      >
        {/* Wordmark slot — always in layout so nav links don't jump.
            The FLIP animation picks it up here when heroBekuVisible → false. */}
        <div style={{ flex: "0 0 auto" }}>
          <AnimatePresence>
            {!heroBekuVisible && (
              <motion.div
                layoutId="beku-wordmark"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  layout: { type: "spring", stiffness: 260, damping: 28 },
                  opacity: { duration: 0.25, ease: EASE },
                }}
                style={{ zIndex: 51 }}
              >
                <Link
                  href="/"
                  onClick={() => setMobileOpen(false)}
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontSize: "1.3125rem",
                    fontWeight: 400,
                    color: (mobileOpen || inDarkSection) ? CREAM : "var(--color-forest)",
                    letterSpacing: "0.04em",
                    textDecoration: "none",
                    transition: "color 600ms ease",
                    display: "block",
                    whiteSpace: "nowrap",
                  }}
                >
                  Beku
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Desktop nav */}
        <nav
          aria-label="Main navigation"
          className="hidden md:flex items-center"
          style={{ gap: "2rem" }}
        >
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "0.8125rem",
                fontWeight: 300,
                color: hoveredLink === href ? textColorHover : textColor,
                letterSpacing: "0.07em",
                textDecoration: "none",
                position: "relative",
                paddingBottom: "2px",
                transition: "color 240ms ease",
              }}
              onMouseEnter={() => setHoveredLink(href)}
              onMouseLeave={() => setHoveredLink(null)}
            >
              {label}
              {/* Underline that draws in from left on hover */}
              <motion.span
                aria-hidden="true"
                animate={{ scaleX: hoveredLink === href ? 1 : 0 }}
                transition={{ duration: 0.22, ease: EASE }}
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "0.75px",
                  backgroundColor: inDarkSection ? "rgba(246,240,228,0.35)" : "rgba(61,97,71,0.4)",
                  transformOrigin: "left center",
                  display: "block",
                }}
              />
            </Link>
          ))}
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
                  ? i === 0 ? { rotate: 45, y: 6, opacity: 1 }
                  : i === 1 ? { opacity: 0, scaleX: 0 }
                  : { rotate: -45, y: -6, opacity: 1 }
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
                transition: "background-color 600ms ease, width 280ms ease",
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
              backgroundColor: "rgba(24,40,32,0.98)",
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
                bottom: "clamp(2.5rem,6vh,4rem)",
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
                color: "rgba(246,240,228,0.32)",
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
                color: "rgba(246,240,228,0.20)",
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
