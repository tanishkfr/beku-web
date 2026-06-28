"use client"

import React, { useState } from "react"
import { motion, useReducedMotion, AnimatePresence } from "framer-motion"
import { EASE, H_PAD } from "@/lib/tokens"
import { EXPERIMENTS } from "@/lib/experiments"
import { DwellNote } from "@/components/DwellNote"

type Pick = {
  picker: string
  title: string
  author: string
  note: string
  borrowed: string
  color: string
}

const PICKS: Pick[] = [
  {
    picker: "Ishita",
    title: "The Remains of the Day",
    author: "Kazuo Ishiguro",
    note: "The kind of book that makes the afternoon feel longer. We've kept a copy near the counter for over a year. It keeps leaving, and it keeps finding its way back.",
    borrowed: "XII",
    color: "#C06B30",
  },
  {
    picker: "Arjun",
    title: "Ghachar Ghochar",
    author: "Vivek Shanbhag",
    note: "Short, but it stays with you. A family, a business, a slow unravelling. Reads in one sitting. Pairs well with a filter coffee and a free afternoon.",
    borrowed: "VIII",
    color: "#7A5438",
  },
  {
    picker: "Meera",
    title: "Ways of Seeing",
    author: "John Berger",
    note: "Leave it open on any page and something useful looks back at you. We've tried keeping this one for the shelf. It keeps leaving.",
    borrowed: "XXI",
    color: "#3D6147",
  },
]

const SHELF_BOOKS = [
  { title: "The Ministry for the Future", author: "Kim Stanley Robinson" },
  { title: "Ghachar Ghochar", author: "Vivek Shanbhag" },
  { title: "Devotions", author: "Mary Oliver" },
  { title: "Ways of Seeing", author: "John Berger" },
  { title: "The God of Small Things", author: "Arundhati Roy" },
]

// A few more titles so the horizontal shelf has something to scan.
// (Vertical fallback uses SHELF_BOOKS only, so reverting stays clean.)
const HORIZONTAL_SHELF = [
  ...SHELF_BOOKS,
  { title: "A Fine Balance", author: "Rohinton Mistry" },
  { title: "Em and the Big Hoom", author: "Jerry Pinto" },
  { title: "The Argumentative Indian", author: "Amartya Sen" },
  { title: "Beloved", author: "Toni Morrison" },
]

// The drifting shelf — spines with colour + height variation.
const TICKER_SPINES = [
  { title: "The Remains of the Day", author: "Kazuo Ishiguro", color: "#C06B30", height: 196 },
  { title: "Ghachar Ghochar", author: "Vivek Shanbhag", color: "#7A5438", height: 168 },
  { title: "Ways of Seeing", author: "John Berger", color: "#3D6147", height: 150 },
  { title: "The Ministry for the Future", author: "Kim Stanley Robinson", color: "#5A7A5E", height: 182 },
  { title: "Devotions", author: "Mary Oliver", color: "#9B8870", height: 156 },
  { title: "The God of Small Things", author: "Arundhati Roy", color: "#B05A3C", height: 190 },
  { title: "A Fine Balance", author: "Rohinton Mistry", color: "#6B5438", height: 172 },
  { title: "Em and the Big Hoom", author: "Jerry Pinto", color: "#4A6B50", height: 146 },
  { title: "The Argumentative Indian", author: "Amartya Sen", color: "#8A6647", height: 184 },
  { title: "Beloved", author: "Toni Morrison", color: "#3D5147", height: 162 },
]

const PICK_INDEX = new Map(PICKS.map((p, i) => [p.title, i]))

function ShelfTicker({ onSelectPick }: { onSelectPick: (i: number) => void }) {
  const doubled = [...TICKER_SPINES, ...TICKER_SPINES]
  return (
    <div
      className="beku-ticker"
      style={{
        marginLeft: `calc(-1 * ${H_PAD})`,
        marginRight: `calc(-1 * ${H_PAD})`,
        position: "relative",
        overflow: "hidden",
        height: "232px",
        WebkitMaskImage: "linear-gradient(to right, transparent, #000 7%, #000 93%, transparent)",
        maskImage: "linear-gradient(to right, transparent, #000 7%, #000 93%, transparent)",
      }}
    >
      <div
        className="beku-ticker-track"
        style={{
          display: "flex",
          alignItems: "flex-end",
          gap: "clamp(8px, 1vw, 14px)",
          width: "max-content",
          height: "100%",
          paddingBottom: "18px",
        }}
      >
        {doubled.map((s, i) => {
          const pickIdx = PICK_INDEX.get(s.title)
          return (
            <button
              key={i}
              className="beku-spine"
              aria-label={`${s.title} by ${s.author}`}
              onClick={() => { if (pickIdx !== undefined) onSelectPick(pickIdx) }}
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
                color: "rgba(246,240,228,0.55)",
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
              {pickIdx !== undefined && (
                <span aria-hidden="true" style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: "4px",
                  backgroundColor: "rgba(255,255,255,0.2)",
                }} />
              )}
            </button>
          )
        })}
      </div>

      {/* Shelf plank */}
      <div aria-hidden="true" style={{
        position: "absolute", left: 0, right: 0, bottom: "18px",
        height: "3px", backgroundColor: "rgba(130,100,65,0.28)",
      }} />
    </div>
  )
}

export function Books() {
  const prefersReduced = useReducedMotion()
  const [active, setActive] = useState(0)
  const [hoveredPick, setHoveredPick] = useState<number | null>(null)
  const pick = PICKS[active]

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
      {/* Eyebrow */}
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.6 }}
        viewport={{ once: true, margin: "-6%" }}
        transition={{ duration: 0.9, ease: EASE }}
        style={{
          fontFamily: "var(--font-stamp)",
          fontSize: "clamp(0.5rem, 0.58vw, 0.5625rem)",
          fontWeight: 400,
          color: "var(--color-warmwood)",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          margin: "0 0 clamp(1.5rem, 3.5vh, 2.25rem) 0",
        }}
      >
        Upstairs, the library
      </motion.h2>

      {/* Base element: the drifting shelf */}
      {EXPERIMENTS.booksTicker && (
        <motion.div
          initial={{ opacity: prefersReduced ? 1 : 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-6%" }}
          transition={{ duration: 1.1, ease: EASE }}
          style={{ marginBottom: "clamp(3rem, 7vh, 5rem)" }}
        >
          <ShelfTicker onSelectPick={setActive} />
          <p style={{
            fontFamily: "var(--font-stamp)", fontSize: "0.4375rem",
            color: "var(--color-text-muted)", letterSpacing: "0.12em",
            textTransform: "uppercase", opacity: 0.5, margin: "clamp(0.75rem,2vh,1.1rem) 0 0 0",
          }}>
            The current shelf · hover to stop · the marked ones are staff picks
          </p>
        </motion.div>
      )}

      {/* Featured pick — selector + editorial pull-quote */}
      <motion.div
        initial={{ opacity: 0, y: prefersReduced ? 0 : 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-6%" }}
        transition={{ duration: 0.9, ease: EASE }}
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "clamp(2rem, 5vw, 4.5rem)",
          alignItems: "flex-start",
          marginBottom: EXPERIMENTS.booksTicker ? 0 : "clamp(4rem, 9vh, 7rem)",
        }}
      >
        {/* Selector */}
        <div
          role="tablist"
          aria-label="Staff picks"
          style={{ flex: "1 1 220px", minWidth: "min(220px, 100%)", display: "flex", flexDirection: "column" }}
        >
          <p style={{
            fontFamily: "var(--font-stamp)",
            fontSize: "clamp(0.4375rem, 0.55vw, 0.5rem)",
            fontWeight: 400,
            color: "var(--color-moss-signal)",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            margin: "0 0 clamp(0.75rem, 2vh, 1rem) 0",
            opacity: 0.6,
          }}>
            Staff picks
          </p>

          {PICKS.map((p, i) => {
            const isActive = i === active
            const isHover = EXPERIMENTS.hoverMotion && hoveredPick === i
            const lit = isActive || isHover
            return (
              <button
                key={p.title}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(i)}
                onMouseEnter={() => setHoveredPick(i)}
                onMouseLeave={() => setHoveredPick(null)}
                style={{
                  display: "flex",
                  alignItems: "stretch",
                  gap: "0.85rem",
                  background: "none",
                  border: "none",
                  borderTop: "1px solid rgba(175,150,115,0.22)",
                  padding: "clamp(0.85rem, 2vh, 1.15rem) 0",
                  paddingLeft: EXPERIMENTS.hoverMotion && isHover && !isActive ? "0.4rem" : 0,
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
                  animate={{ opacity: lit ? 1 : 0.25, scaleY: isActive ? 1 : lit ? 0.85 : 0.7 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  style={{
                    width: "3px",
                    flexShrink: 0,
                    backgroundColor: p.color,
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
                    color: lit ? "var(--color-ink)" : "var(--color-text-muted)",
                    lineHeight: 1.2,
                    transition: "color 260ms ease",
                  }}>
                    {p.picker}
                  </span>
                  <span style={{
                    display: "block",
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: "clamp(0.75rem, 0.85vw, 0.8125rem)",
                    fontWeight: 300,
                    color: "var(--color-text-muted)",
                    lineHeight: 1.4,
                    marginTop: "0.15em",
                    opacity: lit ? 0.9 : 0.6,
                    transition: "opacity 260ms ease",
                  }}>
                    {p.title}
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
              <p style={{
                fontFamily: "var(--font-stamp)",
                fontSize: "clamp(0.4375rem, 0.55vw, 0.5rem)",
                fontWeight: 400,
                color: pick.color,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                margin: "0 0 clamp(1rem, 2.5vh, 1.5rem) 0",
                opacity: 0.85,
              }}>
                {pick.picker} keeps re-shelving this one
              </p>

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
                {pick.note}
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
                  {pick.title}
                  <span style={{
                    fontFamily: "var(--font-dm-sans)",
                    fontStyle: "normal",
                    fontWeight: 300,
                    fontSize: "0.8125rem",
                    color: "var(--color-text-muted)",
                    marginLeft: "0.6em",
                  }}>
                    {pick.author}
                  </span>
                </p>

                <span style={{
                  fontFamily: "var(--font-stamp)",
                  fontSize: "0.4375rem",
                  color: "var(--color-moss-signal)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  border: "0.75px solid rgba(61,97,71,0.3)",
                  borderRadius: 0,
                  padding: "0.32em 0.6em",
                  transform: "rotate(-1.5deg)",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                }}>
                  Borrowed {pick.borrowed} times
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Also on the shelves — only when the ticker isn't carrying the shelf */}
      {!EXPERIMENTS.booksTicker && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-6%" }}
          transition={{ duration: 0.8, delay: prefersReduced ? 0 : 0.1, ease: EASE }}
        >
          <div style={{
            display: "flex", alignItems: "baseline", justifyContent: "space-between",
            gap: "1rem", margin: "0 0 clamp(0.75rem, 2vh, 1rem) 0", flexWrap: "wrap",
          }}>
            <h3 style={{
              fontFamily: "var(--font-stamp)", fontSize: "clamp(0.4375rem, 0.55vw, 0.5rem)",
              fontWeight: 400, color: "var(--color-moss-signal)", letterSpacing: "0.15em",
              textTransform: "uppercase", margin: 0, opacity: 0.58,
            }}>
              Also on the shelves
            </h3>
            {EXPERIMENTS.horizontalShelf && (
              <span aria-hidden="true" style={{
                fontFamily: "var(--font-stamp)", fontSize: "0.4375rem",
                color: "var(--color-text-muted)", letterSpacing: "0.12em",
                textTransform: "uppercase", opacity: 0.5, whiteSpace: "nowrap",
              }}>
                Scan →
              </span>
            )}
          </div>

          {EXPERIMENTS.horizontalShelf ? (
            <div
              aria-label="Other books on the shelves"
              tabIndex={0}
              className="beku-shelf-scroll"
              style={{
                display: "flex",
                gap: "clamp(0.85rem, 1.8vw, 1.4rem)",
                overflowX: "auto",
                scrollSnapType: "x mandatory",
                padding: "0 0 1rem 0",
                margin: "0 0 clamp(1.5rem,4vh,2.25rem) 0",
                scrollbarWidth: "thin",
                WebkitOverflowScrolling: "touch",
              }}
            >
              {HORIZONTAL_SHELF.map((b) => (
                <div
                  key={b.title}
                  tabIndex={0}
                  aria-label={`${b.title} by ${b.author}`}
                  style={{
                    scrollSnapAlign: "start",
                    flex: "0 0 auto",
                    width: "clamp(150px, 42vw, 185px)",
                    borderLeft: "1px solid rgba(175,150,115,0.35)",
                    paddingLeft: "clamp(0.7rem, 1.5vw, 1rem)",
                    minHeight: "5.5rem",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <span style={{
                    fontFamily: "var(--font-cormorant)", fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
                    fontWeight: 400, fontStyle: "italic", color: "var(--color-text-secondary)",
                    lineHeight: 1.25, marginBottom: "0.4em",
                  }}>
                    {b.title}
                  </span>
                  <span style={{
                    fontFamily: "var(--font-dm-sans)", fontSize: "clamp(0.6875rem, 0.8vw, 0.8125rem)",
                    fontWeight: 300, color: "var(--color-text-muted)",
                  }}>
                    {b.author}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <ul
              aria-label="Other books on the shelves"
              style={{ listStyle: "none", padding: 0, margin: "0 0 clamp(1.5rem,4vh,2.25rem) 0" }}
            >
              {SHELF_BOOKS.map((b, i) => (
                <motion.li
                  key={b.title}
                  initial={{ opacity: 0, x: prefersReduced ? 0 : -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-6%" }}
                  transition={{ duration: 0.6, delay: prefersReduced ? 0 : 0.18 + i * 0.07, ease: EASE }}
                  style={{
                    display: "flex", alignItems: "baseline", gap: "1rem",
                    padding: "0.65em 0",
                    borderTop: "1px solid rgba(175,150,115,0.18)",
                  }}
                >
                  <span style={{
                    fontFamily: "var(--font-cormorant)", fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
                    fontWeight: 400, fontStyle: "italic", color: "var(--color-text-secondary)",
                    lineHeight: 1.3, flex: "1 1 auto", minWidth: 0,
                  }}>
                    {b.title}
                  </span>
                  <span style={{
                    fontFamily: "var(--font-dm-sans)", fontSize: "clamp(0.6875rem, 0.8vw, 0.8125rem)",
                    fontWeight: 300, color: "var(--color-text-muted)",
                    whiteSpace: "nowrap", flexShrink: 0,
                  }}>
                    {b.author}
                  </span>
                </motion.li>
              ))}
              <li aria-hidden="true" style={{ borderTop: "1px solid rgba(175,150,115,0.18)", height: 0 }} />
            </ul>
          )}
        </motion.div>
      )}

      {/* Closing line */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-6%" }}
        transition={{ duration: 0.8, delay: prefersReduced ? 0 : 0.1, ease: EASE }}
        style={{ marginTop: EXPERIMENTS.booksTicker ? "clamp(3rem, 7vh, 5rem)" : 0 }}
      >
        <p style={{
          fontFamily: "var(--font-dm-sans)", fontSize: "clamp(0.8125rem, 1vw, 0.9375rem)",
          fontWeight: 300, color: "var(--color-text-secondary)", letterSpacing: "0.03em", margin: 0,
        }}>
          The shelves change often. That&apos;s part of the point.
        </p>

        <DwellNote style={{ marginTop: "clamp(1.25rem, 3vh, 2rem)" }}>
          Half of these were left behind, not bought.
        </DwellNote>
      </motion.div>
    </section>
  )
}
