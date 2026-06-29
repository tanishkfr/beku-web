"use client"

import React, { useState, useRef, useEffect } from "react"
import { motion, useReducedMotion, AnimatePresence, useMotionValue, useAnimationFrame } from "framer-motion"
import { EASE, H_PAD } from "@/lib/tokens"
import { EXPERIMENTS } from "@/lib/experiments"
import { DwellNote } from "@/components/DwellNote"

type Book = {
  title: string
  author: string
  color: string
  height: number       // spine height for the drifting shelf
  blurb: string        // the small description shown in the popup
  borrowed?: string    // roman-numeral count, for the few that keep leaving
}

// One library — the single source for the drifting shelf, the card grid, and
// the popup descriptions. Described in Beku's own voice; no named individuals.
const LIBRARY: Book[] = [
  {
    title: "The Remains of the Day",
    author: "Kazuo Ishiguro",
    color: "#C06B30",
    height: 196,
    borrowed: "XII",
    blurb: "Restraint as heartbreak — a butler counts the cost of a life spent serving, and the afternoon goes quiet around you. The kind of book that makes the day feel longer.",
  },
  {
    title: "Ghachar Ghochar",
    author: "Vivek Shanbhag",
    color: "#7A5438",
    height: 168,
    borrowed: "VIII",
    blurb: "A family, a business, a slow unravelling. Short enough to read in one sitting. Pairs well with a filter coffee and a free afternoon.",
  },
  {
    title: "Ways of Seeing",
    author: "John Berger",
    color: "#3D6147",
    height: 150,
    borrowed: "XXI",
    blurb: "Leave it open on any page and something useful looks back at you. We keep trying to keep this one on the shelf. It keeps leaving.",
  },
  {
    title: "The Ministry for the Future",
    author: "Kim Stanley Robinson",
    color: "#5A7A5E",
    height: 182,
    blurb: "The near future, argued out in full. Heavy in the bag and hard to put down once the first chapter lands.",
  },
  {
    title: "Devotions",
    author: "Mary Oliver",
    color: "#9B8870",
    height: 156,
    blurb: "Poems for paying attention. Good for the table by the window — one at a time, between sips.",
  },
  {
    title: "The God of Small Things",
    author: "Arundhati Roy",
    color: "#B05A3C",
    height: 190,
    blurb: "Kerala, heat, and a sentence that doubles back on you. The kind of prose people end up reading aloud across the table.",
  },
  {
    title: "A Fine Balance",
    author: "Rohinton Mistry",
    color: "#6B5438",
    height: 172,
    blurb: "Four lives folded into one cramped room in a hard decade. Long, and worth every page.",
  },
  {
    title: "Em and the Big Hoom",
    author: "Jerry Pinto",
    color: "#4A6B50",
    height: 146,
    blurb: "A Bombay family — love and illness sharing the same small flat. Funny in the moments you least expect it.",
  },
  {
    title: "The Argumentative Indian",
    author: "Amartya Sen",
    color: "#8A6647",
    height: 184,
    blurb: "A case for the long Indian habit of argument. Dip in anywhere; it rewards the browser.",
  },
  {
    title: "Beloved",
    author: "Toni Morrison",
    color: "#3D5147",
    height: 162,
    blurb: "Memory that won't stay buried. Demanding, unforgettable — give it a slow afternoon.",
  },
]

// The three we keep talking about — longer, editorial pull-quotes.
const FEATURED = LIBRARY.filter((b) => b.borrowed)

const FEATURED_TITLES = new Set(FEATURED.map((b) => b.title))

// ── The drifting shelf ──────────────────────────────────────────────────────
function ShelfTicker({ onOpen }: { onOpen: (b: Book) => void }) {
  const prefersReduced = useReducedMotion()
  const [copies, setCopies] = useState(2)
  const spines = Array.from({ length: copies }, () => LIBRARY).flat()
  const x = useMotionValue(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const loopRef = useRef(0)
  const pausedRef = useRef(false)

  useEffect(() => {
    // The loop period is one set's width — the distance from the first spine to
    // its duplicate (one full set + the gap that follows it). NOT scrollWidth/2,
    // which is short by half a gap and makes the wrap visibly jump. We also
    // render as many copies of the set as it takes to overflow the container a
    // couple of times over, so the shelf fills wide screens instead of running
    // out halfway across.
    const measure = () => {
      const track = trackRef.current
      const container = containerRef.current
      if (!track || !container || track.children.length < LIBRARY.length + 1) return
      const first = track.children[0] as HTMLElement
      const dup = track.children[LIBRARY.length] as HTMLElement
      const setWidth = dup.offsetLeft - first.offsetLeft
      if (setWidth <= 0) return
      loopRef.current = setWidth
      const needed = Math.ceil(container.offsetWidth / setWidth) + 2
      setCopies((prev) => (needed > prev ? needed : prev))
    }
    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [copies])

  useAnimationFrame((_, delta) => {
    if (prefersReduced || pausedRef.current) return
    const loop = loopRef.current
    if (!loop) return
    let next = x.get() - (delta / 1000) * 40 // 40px/s — calm but clearly moving
    if (next <= -loop) next += loop
    x.set(next)
  })

  return (
    <div
      ref={containerRef}
      className="beku-ticker"
      onMouseEnter={() => { pausedRef.current = true }}
      onMouseLeave={() => { pausedRef.current = false }}
      style={{
        marginLeft: `calc(-1 * ${H_PAD})`,
        marginRight: `calc(-1 * ${H_PAD})`,
        position: "relative",
        overflowX: prefersReduced ? "auto" : "hidden",
        overflowY: "hidden",
        height: "232px",
        WebkitMaskImage: "linear-gradient(to right, transparent, #000 7%, #000 93%, transparent)",
        maskImage: "linear-gradient(to right, transparent, #000 7%, #000 93%, transparent)",
      }}
    >
      <motion.div
        ref={trackRef}
        style={{
          x,
          display: "flex",
          alignItems: "flex-end",
          gap: "clamp(8px, 1vw, 14px)",
          width: "max-content",
          height: "100%",
          paddingBottom: "18px",
        }}
      >
        {spines.map((s, i) => (
          <button
            key={i}
            className="beku-spine"
            aria-label={`${s.title} by ${s.author} — read description`}
            onClick={() => onOpen(s)}
            style={{
              flex: "0 0 auto",
              width: "clamp(26px, 2.4vw, 40px)",
              height: `${s.height}px`,
              backgroundColor: s.color,
              borderRadius: "2px 2px 0 0",
              border: "none",
              padding: 0,
              position: "relative",
              overflow: "hidden",
              transformOrigin: "bottom center",
              boxShadow: "2px 3px 12px rgba(30,40,20,0.16), inset -1px 0 0 rgba(255,255,255,0.06)",
              WebkitTapHighlightColor: "transparent",
              cursor: "pointer",
            }}
          >
            <span style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%) rotate(-90deg)",
              transformOrigin: "center center",
              fontFamily: "var(--font-stamp)",
              fontSize: "8px",
              color: "rgba(246,240,228,0.62)",
              whiteSpace: "nowrap",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              width: `${s.height - 24}px`,
              textAlign: "center",
              overflow: "hidden",
              pointerEvents: "none",
            }}>
              {s.title}
            </span>
            {FEATURED_TITLES.has(s.title) && (
              <span aria-hidden="true" style={{
                position: "absolute", top: 0, left: 0, right: 0, height: "4px",
                backgroundColor: "rgba(255,255,255,0.22)",
              }} />
            )}
          </button>
        ))}
      </motion.div>

      {/* Shelf plank */}
      <div aria-hidden="true" style={{
        position: "absolute", left: 0, right: 0, bottom: "18px",
        height: "3px", backgroundColor: "rgba(130,100,65,0.3)",
      }} />
    </div>
  )
}

// ── Card grid ────────────────────────────────────────────────────────────────
function CardGrid({ onOpen }: { onOpen: (b: Book) => void }) {
  const prefersReduced = useReducedMotion()
  return (
    <div
      role="list"
      aria-label="The shelf, as cards"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(min(160px, 100%), 1fr))",
        gap: "clamp(0.85rem, 1.6vw, 1.25rem)",
      }}
    >
      {LIBRARY.map((b, i) => (
        <motion.button
          key={b.title}
          role="listitem"
          aria-label={`${b.title} by ${b.author} — read description`}
          onClick={() => onOpen(b)}
          initial={{ opacity: 0, y: prefersReduced ? 0 : 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-6%" }}
          transition={{ duration: 0.5, delay: prefersReduced ? 0 : i * 0.04, ease: EASE }}
          whileHover={prefersReduced ? undefined : { y: -4 }}
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "left",
            background: "var(--color-bg-secret)",
            border: "1px solid rgba(175,150,115,0.28)",
            borderRadius: "4px",
            padding: "clamp(1rem, 2.2vw, 1.35rem)",
            minHeight: "clamp(9rem, 18vh, 11rem)",
            cursor: "pointer",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 1px 2px rgba(30,40,20,0.04)",
            WebkitTapHighlightColor: "transparent",
          }}
        >
          {/* Spine accent down the left edge */}
          <span aria-hidden="true" style={{
            position: "absolute", left: 0, top: 0, bottom: 0, width: "4px",
            backgroundColor: b.color,
          }} />

          <span style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(1.0625rem, 1.6vw, 1.3rem)",
            fontWeight: 400,
            fontStyle: "italic",
            color: "var(--color-ink)",
            lineHeight: 1.22,
          }}>
            {b.title}
          </span>
          <span style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: "clamp(0.6875rem, 0.8vw, 0.8125rem)",
            fontWeight: 400,
            color: "var(--color-text-muted)",
            marginTop: "0.35em",
          }}>
            {b.author}
          </span>

          <span style={{
            marginTop: "auto",
            paddingTop: "clamp(0.85rem, 2vh, 1.15rem)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "0.5rem",
          }}>
            <span style={{
              fontFamily: "var(--font-stamp)",
              fontSize: "0.5rem",
              color: "var(--color-label)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              opacity: 0.85,
            }}>
              Read <span aria-hidden="true">→</span>
            </span>
            {b.borrowed && (
              <span aria-hidden="true" style={{
                fontFamily: "var(--font-stamp)",
                fontSize: "0.4375rem",
                color: "var(--color-text-muted)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                border: "1px solid rgba(90,58,34,0.28)",
                padding: "0.28em 0.5em",
                transform: "rotate(-1.5deg)",
                whiteSpace: "nowrap",
              }}>
                Keeps leaving
              </span>
            )}
          </span>
        </motion.button>
      ))}
    </div>
  )
}

// ── Popup ────────────────────────────────────────────────────────────────────
function BookModal({ book, onClose }: { book: Book | null; onClose: () => void }) {
  const prefersReduced = useReducedMotion()
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!book) return
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    document.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    closeRef.current?.focus()
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [book, onClose])

  return (
    <AnimatePresence>
      {book && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: EASE }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="book-modal-title"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            backgroundColor: "rgba(24, 40, 32, 0.55)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "clamp(1.5rem, 5vw, 3rem)",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: prefersReduced ? 0 : 14, scale: prefersReduced ? 1 : 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: prefersReduced ? 0 : 10, scale: prefersReduced ? 1 : 0.98 }}
            transition={{ duration: 0.32, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              width: "min(460px, 100%)",
              backgroundColor: "var(--color-bg-secret)",
              border: "1px solid rgba(175,150,115,0.4)",
              borderRadius: "5px",
              padding: "clamp(1.75rem, 4vw, 2.75rem)",
              boxShadow: "0 24px 60px rgba(20,28,18,0.32)",
              overflow: "hidden",
            }}
          >
            {/* Colour accent */}
            <span aria-hidden="true" style={{
              position: "absolute", left: 0, top: 0, bottom: 0, width: "5px",
              backgroundColor: book.color,
            }} />

            <button
              ref={closeRef}
              onClick={onClose}
              aria-label="Close"
              style={{
                position: "absolute",
                top: "clamp(0.85rem, 2vw, 1.25rem)",
                right: "clamp(0.85rem, 2vw, 1.25rem)",
                width: "2rem",
                height: "2rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "none",
                border: "1px solid rgba(90,58,34,0.25)",
                borderRadius: "50%",
                color: "var(--color-text-secondary)",
                fontSize: "1rem",
                lineHeight: 1,
                cursor: "pointer",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              <span aria-hidden="true">×</span>
            </button>

            <p style={{
              fontFamily: "var(--font-stamp)",
              fontSize: "0.5rem",
              fontWeight: 500,
              color: "var(--color-label)",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              margin: "0 0 clamp(0.75rem, 2vh, 1rem) 0",
            }}>
              {book.borrowed ? `Keeps leaving · borrowed ${book.borrowed} times` : "On the shelves"}
            </p>

            <h3 id="book-modal-title" style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(1.5rem, 3vw, 2.125rem)",
              fontWeight: 400,
              fontStyle: "italic",
              color: "var(--color-ink)",
              lineHeight: 1.18,
              letterSpacing: "-0.01em",
              margin: 0,
              maxWidth: "22ch",
            }}>
              {book.title}
            </h3>

            <p style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: "clamp(0.75rem, 0.9vw, 0.875rem)",
              fontWeight: 400,
              color: "var(--color-text-muted)",
              letterSpacing: "0.02em",
              margin: "0.5em 0 clamp(1.25rem, 3vh, 1.75rem) 0",
            }}>
              {book.author}
            </p>

            <p style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(1.0625rem, 1.7vw, 1.3125rem)",
              fontWeight: 400,
              color: "var(--color-text-secondary)",
              lineHeight: 1.5,
              margin: 0,
            }}>
              {book.blurb}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ── Section ──────────────────────────────────────────────────────────────────
type View = "shelf" | "cards"

export function Books() {
  const prefersReduced = useReducedMotion()
  const [active, setActive] = useState(0)
  const [hovered, setHovered] = useState<number | null>(null)
  const [view, setView] = useState<View>("shelf")
  const [modalBook, setModalBook] = useState<Book | null>(null)
  const book = FEATURED[active]

  return (
    <section
      id="books"
      aria-label="Books"
      style={{
        paddingTop: "clamp(7rem, 16vh, 12rem)",
        paddingBottom: "clamp(7rem, 16vh, 12rem)",
        paddingLeft: H_PAD,
        paddingRight: H_PAD,
        backgroundColor: "var(--color-bg-books)",
      }}
    >
      {/* Eyebrow + layout toggle */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-6%" }}
        transition={{ duration: 0.9, ease: EASE }}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
          flexWrap: "wrap",
          margin: "0 0 clamp(1.5rem, 3.5vh, 2.25rem) 0",
        }}
      >
        <h2 style={{
          fontFamily: "var(--font-stamp)",
          fontSize: "clamp(0.5rem, 0.58vw, 0.5625rem)",
          fontWeight: 500,
          color: "var(--color-label)",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          margin: 0,
          opacity: 0.85,
        }}>
          Upstairs, the library
        </h2>

        {/* Shelf ⇄ Cards */}
        <div
          role="group"
          aria-label="Choose a layout"
          style={{
            display: "inline-flex",
            border: "1px solid rgba(90,58,34,0.28)",
            borderRadius: "3px",
            overflow: "hidden",
          }}
        >
          {(["shelf", "cards"] as View[]).map((v) => {
            const isOn = view === v
            return (
              <button
                key={v}
                onClick={() => setView(v)}
                aria-pressed={isOn}
                style={{
                  fontFamily: "var(--font-stamp)",
                  fontSize: "0.5rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  padding: "0.5em 0.9em",
                  border: "none",
                  cursor: "pointer",
                  color: isOn ? "var(--color-bg-books)" : "var(--color-label)",
                  backgroundColor: isOn ? "var(--color-label)" : "transparent",
                  transition: "background-color 220ms ease, color 220ms ease",
                  WebkitTapHighlightColor: "transparent",
                }}
              >
                {v === "shelf" ? "Shelf" : "Cards"}
              </button>
            )
          })}
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {view === "shelf" ? (
          <motion.div
            key="shelf"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            {/* The drifting shelf */}
            {EXPERIMENTS.booksTicker && (
              <div style={{ marginBottom: "clamp(3rem, 7vh, 5rem)" }}>
                <ShelfTicker onOpen={setModalBook} />
                <p style={{
                  fontFamily: "var(--font-stamp)", fontSize: "0.5rem",
                  color: "var(--color-label)", letterSpacing: "0.12em",
                  textTransform: "uppercase", opacity: 0.7, margin: "clamp(0.75rem,2vh,1.1rem) 0 0 0",
                }}>
                  The current shelf · hover to stop · click any spine to read about it
                </p>
              </div>
            )}

            {/* Featured — selector + editorial pull-quote */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "clamp(2rem, 5vw, 4.5rem)",
                alignItems: "flex-start",
              }}
            >
              {/* Selector */}
              <div
                role="tablist"
                aria-label="Books that keep leaving the shelf"
                style={{ flex: "1 1 220px", minWidth: "min(220px, 100%)", display: "flex", flexDirection: "column" }}
              >
                <p style={{
                  fontFamily: "var(--font-stamp)",
                  fontSize: "clamp(0.4375rem, 0.55vw, 0.5rem)",
                  fontWeight: 500,
                  color: "var(--color-label)",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  margin: "0 0 clamp(0.75rem, 2vh, 1rem) 0",
                  opacity: 0.8,
                }}>
                  Three that keep leaving
                </p>

                {FEATURED.map((b, i) => {
                  const isActive = i === active
                  const isHover = EXPERIMENTS.hoverMotion && hovered === i
                  const lit = isActive || isHover
                  return (
                    <button
                      key={b.title}
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActive(i)}
                      onMouseEnter={() => setHovered(i)}
                      onMouseLeave={() => setHovered(null)}
                      style={{
                        display: "flex",
                        alignItems: "stretch",
                        gap: "0.85rem",
                        background: "none",
                        border: "none",
                        borderTop: "1px solid rgba(175,150,115,0.22)",
                        padding: "clamp(0.85rem, 2vh, 1.15rem) 0",
                        paddingLeft: isHover && !isActive ? "0.4rem" : 0,
                        textAlign: "left",
                        cursor: "pointer",
                        width: "100%",
                        transition: "padding-left 260ms var(--ease-natural)",
                        WebkitTapHighlightColor: "transparent",
                      }}
                    >
                      {/* Spine edge */}
                      <motion.span
                        aria-hidden="true"
                        animate={{ opacity: lit ? 1 : 0.3, scaleY: isActive ? 1 : lit ? 0.85 : 0.7 }}
                        transition={{ duration: 0.3, ease: EASE }}
                        style={{
                          width: "3px",
                          flexShrink: 0,
                          backgroundColor: b.color,
                          borderRadius: "2px",
                          transformOrigin: "center",
                        }}
                      />
                      <span style={{ minWidth: 0 }}>
                        <span style={{
                          display: "block",
                          fontFamily: "var(--font-cormorant)",
                          fontSize: "clamp(1.125rem, 1.7vw, 1.4rem)",
                          fontWeight: 400,
                          fontStyle: "italic",
                          color: lit ? "var(--color-ink)" : "var(--color-text-secondary)",
                          lineHeight: 1.2,
                          transition: "color 260ms ease",
                        }}>
                          {b.title}
                        </span>
                        <span style={{
                          display: "block",
                          fontFamily: "var(--font-dm-sans)",
                          fontSize: "clamp(0.75rem, 0.85vw, 0.8125rem)",
                          fontWeight: 400,
                          color: "var(--color-text-muted)",
                          lineHeight: 1.4,
                          marginTop: "0.2em",
                        }}>
                          {b.author}
                        </span>
                      </span>
                    </button>
                  )
                })}
                <div aria-hidden="true" style={{ borderTop: "1px solid rgba(175,150,115,0.22)" }} />
              </div>

              {/* Feature */}
              <div
                aria-live="polite"
                style={{ flex: "1.5 1 340px", minWidth: "min(340px, 100%)", minHeight: "clamp(15rem, 30vh, 19rem)" }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: prefersReduced ? 0 : 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: prefersReduced ? 0 : -8 }}
                    transition={{ duration: 0.4, ease: EASE }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.6em", margin: "0 0 clamp(1rem, 2.5vh, 1.5rem) 0" }}>
                      <span aria-hidden="true" style={{ width: "1.5rem", height: "2px", backgroundColor: book.color, borderRadius: "2px" }} />
                      <span style={{
                        fontFamily: "var(--font-stamp)",
                        fontSize: "clamp(0.4375rem, 0.55vw, 0.5rem)",
                        fontWeight: 500,
                        color: "var(--color-label)",
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                      }}>
                        Keeps leaving the shelf
                      </span>
                    </div>

                    <blockquote style={{
                      fontFamily: "var(--font-cormorant)",
                      fontSize: "clamp(1.5rem, 2.7vw, 2.375rem)",
                      fontWeight: 400,
                      fontStyle: "italic",
                      color: "var(--color-ink)",
                      lineHeight: 1.32,
                      letterSpacing: "-0.01em",
                      margin: 0,
                      maxWidth: "30ch",
                      textWrap: "balance",
                    } as React.CSSProperties}>
                      {book.blurb}
                    </blockquote>

                    <div style={{
                      display: "flex",
                      alignItems: "baseline",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      gap: "1rem",
                      marginTop: "clamp(1.75rem, 4vh, 2.75rem)",
                      paddingTop: "clamp(1rem, 2.5vh, 1.5rem)",
                      borderTop: "1px solid rgba(175,150,115,0.3)",
                      maxWidth: "34ch",
                    }}>
                      <p style={{
                        fontFamily: "var(--font-cormorant)",
                        fontSize: "clamp(1rem, 1.4vw, 1.1875rem)",
                        fontWeight: 400,
                        fontStyle: "italic",
                        color: "var(--color-text-secondary)",
                        lineHeight: 1.3,
                        margin: 0,
                      }}>
                        {book.title}
                        <span style={{
                          fontFamily: "var(--font-dm-sans)",
                          fontStyle: "normal",
                          fontWeight: 400,
                          fontSize: "0.8125rem",
                          color: "var(--color-text-muted)",
                          marginLeft: "0.6em",
                        }}>
                          {book.author}
                        </span>
                      </p>

                      <span style={{
                        fontFamily: "var(--font-stamp)",
                        fontSize: "0.5rem",
                        color: "var(--color-label)",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        border: "1px solid rgba(90,58,34,0.35)",
                        borderRadius: 0,
                        padding: "0.32em 0.6em",
                        transform: "rotate(-1.5deg)",
                        whiteSpace: "nowrap",
                        flexShrink: 0,
                      }}>
                        Borrowed {book.borrowed} times
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="cards"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <CardGrid onOpen={setModalBook} />
            <p style={{
              fontFamily: "var(--font-stamp)", fontSize: "0.5rem",
              color: "var(--color-label)", letterSpacing: "0.12em",
              textTransform: "uppercase", opacity: 0.7, margin: "clamp(1rem,2.5vh,1.5rem) 0 0 0",
            }}>
              Click any cover to read about it
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Closing line */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-6%" }}
        transition={{ duration: 0.8, delay: prefersReduced ? 0 : 0.1, ease: EASE }}
        style={{ marginTop: "clamp(3rem, 7vh, 5rem)" }}
      >
        <p style={{
          fontFamily: "var(--font-dm-sans)", fontSize: "clamp(0.8125rem, 1vw, 0.9375rem)",
          fontWeight: 400, color: "var(--color-text-secondary)", letterSpacing: "0.03em", margin: 0,
        }}>
          The shelves change often. That&apos;s part of the point.
        </p>

        <DwellNote style={{ marginTop: "clamp(1.25rem, 3vh, 2rem)" }}>
          Half of these were left behind, not bought.
        </DwellNote>
      </motion.div>

      <BookModal book={modalBook} onClose={() => setModalBook(null)} />
    </section>
  )
}
