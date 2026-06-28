"use client"

import { motion, useReducedMotion, useMotionValue, useSpring, AnimatePresence } from "framer-motion"
import { useRef, useState, useCallback } from "react"
import { EASE, H_PAD } from "@/lib/tokens"
import { EXPERIMENTS } from "@/lib/experiments"

const SPINES = [
  { color: "#3D6147", title: "Ways of Seeing", author: "John Berger", lean: -4, height: 148 },
  { color: "#7A5438", title: "Ghachar Ghochar", author: "Vivek Shanbhag", lean: -1.5, height: 174 },
  { color: "#C06B30", title: "Remains of the Day", author: "Kazuo Ishiguro", lean: 0.5, height: 196, featured: true },
  { color: "#5A7A5E", title: "Devotions", author: "Mary Oliver", lean: 2, height: 160 },
  { color: "#9B8870", title: "Ministry for the Future", author: "Kim Stanley Robinson", lean: 3.5, height: 170 },
]

const CARD_BOOKS = [
  {
    picker: "Ishita",
    title: "The Remains of the Day",
    author: "Kazuo Ishiguro",
    note: "The kind of book that makes the afternoon feel longer. We've had a copy near the counter for over a year. It's been borrowed twelve times.",
    borrowed: "XII",
  },
  {
    picker: "Arjun",
    title: "Ghachar Ghochar",
    author: "Vivek Shanbhag",
    note: "Short but stays with you. A family, a business, a slow unraveling. Reads in one sitting. Pairs well with filter coffee.",
    borrowed: "VIII",
  },
  {
    picker: "Meera",
    title: "Ways of Seeing",
    author: "John Berger",
    note: "Leave it open on any page. Something useful every time. We've tried keeping this one for the shelf. It keeps leaving.",
    borrowed: "XXI",
  },
]

const SHELF_BOOKS = [
  { title: "The Ministry for the Future", author: "Kim Stanley Robinson" },
  { title: "Ghachar Ghochar", author: "Vivek Shanbhag" },
  { title: "Devotions", author: "Mary Oliver" },
  { title: "Ways of Seeing", author: "John Berger" },
  { title: "The God of Small Things", author: "Arundhati Roy" },
]

function ShelfSpines({ prefersReduced }: { prefersReduced: boolean | null }) {
  const [activeSpine, setActiveSpine] = useState<number | null>(null)

  const handleTouchStart = useCallback((i: number) => {
    setActiveSpine(i)
  }, [])

  const handleTouchEnd = useCallback(() => {
    setTimeout(() => setActiveSpine(null), 700)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 1.0, delay: 0.1, ease: EASE }}
    >
      {/* Spine row */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          gap: "clamp(5px, 0.9vw, 10px)",
          paddingBottom: "12px",
          borderBottom: "3px solid rgba(130,100,65,0.22)",
          width: "fit-content",
        }}
      >
        {SPINES.map((spine, i) => (
          <motion.div
            key={spine.title}
            initial={{ y: prefersReduced ? 0 : 28, opacity: prefersReduced ? 1 : 0 }}
            whileInView={{ y: spine.featured ? -8 : 0, opacity: 1 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 0.55, delay: prefersReduced ? 0 : 0.15 + i * 0.09, ease: EASE }}
          >
            <motion.div
              animate={{
                y: activeSpine === i && !prefersReduced ? -5 : 0,
                rotate: spine.lean,
              }}
              transition={{ type: "spring", stiffness: 420, damping: 28 }}
              onMouseEnter={() => setActiveSpine(i)}
              onMouseLeave={() => setActiveSpine(null)}
              onTouchStart={(e) => { e.preventDefault(); handleTouchStart(i) }}
              onTouchEnd={handleTouchEnd}
              style={{
                width: "clamp(22px, 2.2vw, 34px)",
                height: `${spine.height}px`,
                backgroundColor: spine.color,
                borderRadius: "2px 2px 0 0",
                transformOrigin: "bottom center",
                cursor: "default",
                position: "relative",
                overflow: "hidden",
                WebkitTapHighlightColor: "transparent",
                boxShadow: activeSpine === i
                  ? "4px 8px 20px rgba(30,40,20,0.3), inset -1px 0 0 rgba(255,255,255,0.12)"
                  : spine.featured
                    ? "3px 6px 18px rgba(30,40,20,0.26), inset -1px 0 0 rgba(255,255,255,0.08)"
                    : "2px 3px 10px rgba(30,40,20,0.14), inset -1px 0 0 rgba(255,255,255,0.05)",
              }}
            >
              <span style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%) rotate(-90deg)",
                transformOrigin: "center center",
                fontFamily: "var(--font-stamp)",
                fontSize: "7px",
                color: "rgba(255,255,255,0.45)",
                whiteSpace: "nowrap",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                userSelect: "none",
                pointerEvents: "none",
                width: `${spine.height - 20}px`,
                textAlign: "center",
                overflow: "hidden",
              }}>
                {spine.title}
              </span>
              {spine.featured && (
                <div style={{
                  position: "absolute",
                  top: 0, left: 0, right: 0,
                  height: "4px",
                  backgroundColor: "rgba(255,255,255,0.18)",
                }} />
              )}
            </motion.div>
          </motion.div>
        ))}

        {/* Artifact: cut-paper shelf marker at the end of the row */}
        {EXPERIMENTS.artifactVocab && (
          <div
            aria-hidden="true"
            style={{
              alignSelf: "flex-end",
              marginLeft: "clamp(0.75rem, 2vw, 1.5rem)",
              marginBottom: "2px",
              transform: "rotate(-1.5deg)",
              backgroundColor: "#F8F2E4",
              border: "1px solid rgba(175,150,115,0.5)",
              borderRadius: 0,
              padding: "0.32rem 0.5rem",
              boxShadow: "0 1px 3px rgba(40,20,8,0.12)",
              whiteSpace: "nowrap",
            }}
          >
            <span style={{
              fontFamily: "var(--font-stamp)",
              fontSize: "0.4375rem",
              color: "var(--color-moss-signal)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              display: "block",
            }}>
              Fiction
            </span>
            <span style={{
              fontFamily: "var(--font-stamp)",
              fontSize: "0.4375rem",
              color: "var(--color-text-muted)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              display: "block",
              marginTop: "0.2em",
              opacity: 0.7,
            }}>
              Borrowed twelve times
            </span>
          </div>
        )}
      </div>

      {/* Info strip below shelf plank */}
      <div style={{ height: "2.5rem", marginTop: "0.6rem", display: "flex", alignItems: "center" }}>
        <AnimatePresence mode="wait">
          {activeSpine !== null && !prefersReduced ? (
            <motion.div
              key={activeSpine}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -3 }}
              transition={{ duration: 0.14, ease: EASE }}
              style={{ display: "flex", alignItems: "baseline", gap: "0.6rem" }}
            >
              <span style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(0.9375rem, 1.2vw, 1.0625rem)",
                fontWeight: 400,
                fontStyle: "italic",
                color: "var(--color-ink)",
                lineHeight: 1.2,
              }}>
                {SPINES[activeSpine].title}
              </span>
              <span style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "0.6875rem",
                fontWeight: 300,
                color: "var(--color-text-muted)",
                letterSpacing: "0.03em",
              }}>
                {SPINES[activeSpine].author}
              </span>
            </motion.div>
          ) : (
            <motion.p
              key="shelf-label"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.45 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: EASE }}
              style={{
                fontFamily: "var(--font-stamp)",
                fontSize: "0.4375rem",
                color: "var(--color-text-muted)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                margin: 0,
              }}
            >
              The current shelf
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export function Books() {
  const prefersReduced = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const tiltX = useMotionValue(0)
  const tiltY = useMotionValue(0)
  const springX = useSpring(tiltX, { stiffness: 320, damping: 32 })
  const springY = useSpring(tiltY, { stiffness: 320, damping: 32 })
  const [cardIndex, setCardIndex] = useState(0)

  const advanceCard = useCallback(() => {
    setCardIndex((i) => (i + 1) % CARD_BOOKS.length)
  }, [])

  const book = CARD_BOOKS[cardIndex]

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
      {/* Section eyebrow */}
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
        The bookshelf
      </motion.h2>

      {/* Book spines */}
      <div style={{ marginBottom: "clamp(4rem, 9vh, 7rem)" }}>
        <ShelfSpines prefersReduced={prefersReduced} />
      </div>

      {/* Staff pick card + reading list */}
      <div
        className="grid grid-cols-1 md:grid-cols-2"
        style={{ gap: "clamp(3rem, 6vw, 6rem)", alignItems: "start" }}
      >
        {/* Staff pick card — click/tap to cycle through picks */}
        <motion.div
          initial={{ opacity: 0, y: prefersReduced ? 0 : 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-6%" }}
          transition={{ duration: 1.0, ease: EASE }}
        >
          <div
            ref={containerRef}
            onMouseMove={(e) => {
              if (prefersReduced || !containerRef.current) return
              const { left, top, width, height } = containerRef.current.getBoundingClientRect()
              tiltX.set(((e.clientY - top) / height - 0.5) * -7)
              tiltY.set(((e.clientX - left) / width - 0.5) * 7)
            }}
            onMouseLeave={() => { tiltX.set(0); tiltY.set(0) }}
            onClick={advanceCard}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") advanceCard() }}
            role="button"
            tabIndex={0}
            aria-label={`Staff pick: ${book.title}. Tap to see more picks.`}
            style={{ position: "relative", perspective: "1000px", cursor: "pointer" }}
          >
            <motion.div
              style={{
                position: "relative",
                ...(prefersReduced ? {} : { rotateX: springX, rotateY: springY }),
              }}
            >
              {/* Ghost cards */}
              {!prefersReduced && (
                <>
                  <motion.div
                    key={`ghost1-${cardIndex}`}
                    aria-hidden="true"
                    initial={{ rotate: 4.5, x: 9, y: -7 }}
                    animate={{ rotate: 3, x: 7, y: -5 }}
                    transition={{ type: "spring", stiffness: 280, damping: 22 }}
                    style={{
                      position: "absolute", inset: 0,
                      backgroundColor: "rgba(200,190,170,0.5)", borderRadius: "3px",
                      boxShadow: "1px 2px 10px rgba(30,50,30,0.07)",
                    }}
                  />
                  <motion.div
                    key={`ghost2-${cardIndex}`}
                    aria-hidden="true"
                    initial={{ rotate: 2.5, x: 5, y: -4 }}
                    animate={{ rotate: 1.4, x: 3, y: -2 }}
                    transition={{ type: "spring", stiffness: 280, damping: 24 }}
                    style={{
                      position: "absolute", inset: 0,
                      backgroundColor: "rgba(215,205,185,0.6)", borderRadius: "3px",
                      boxShadow: "1px 2px 8px rgba(30,50,30,0.06)",
                    }}
                  />
                </>
              )}

              {/* Bookmark */}
              {!prefersReduced && (
                <div aria-hidden="true" style={{
                  position: "absolute", top: "-2.4rem",
                  left: "clamp(2.25rem, 4.5vw, 3.25rem)",
                  width: "0.9375rem", height: "2.75rem",
                  backgroundColor: "var(--color-terracotta)", opacity: 0.62, zIndex: 4,
                  clipPath: "polygon(0 0, 100% 0, 100% 76%, 50% 100%, 0 76%)",
                  boxShadow: "1px 3px 8px rgba(30,50,30,0.14)",
                }} />
              )}

              {/* Main card */}
              <motion.div
                whileTap={prefersReduced ? {} : { scale: 0.987 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                style={{
                  backgroundColor: "var(--color-offwhite)",
                  border: "1px solid rgba(200,190,170,0.9)", borderRadius: "3px",
                  padding: "clamp(1.75rem, 5vh, 3rem) clamp(1.5rem, 4vw, 2.75rem)",
                  paddingBottom: "clamp(3rem, 6vh, 4rem)",
                  transform: prefersReduced ? "none" : "rotate(-0.4deg)",
                  position: "relative",
                  boxShadow: "3px 6px 24px rgba(40,60,30,0.10), 0 1px 4px rgba(40,60,30,0.06), inset 0 1px 0 rgba(255,255,255,0.72)",
                  zIndex: 2,
                  WebkitTapHighlightColor: "transparent",
                  minHeight: "15rem",
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={cardIndex}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.26, ease: EASE }}
                  >
                    <p style={{
                      fontFamily: "var(--font-stamp)", fontSize: "clamp(0.4375rem, 0.55vw, 0.5rem)",
                      fontWeight: 400, color: "var(--color-moss-signal)", letterSpacing: "0.14em",
                      textTransform: "uppercase", margin: "0 0 clamp(1.125rem, 3vh, 1.625rem) 0", opacity: 0.7,
                    }}>
                      Book Pick · {book.picker}
                    </p>
                    <p style={{
                      fontFamily: "var(--font-cormorant)", fontSize: "clamp(1.375rem, 2.6vw, 2rem)",
                      fontWeight: 400, fontStyle: "italic", color: "var(--color-ink)", lineHeight: 1.18,
                      margin: "0 0 0.18em 0",
                    }}>
                      {book.title}
                    </p>
                    <p style={{
                      fontFamily: "var(--font-dm-sans)", fontSize: "clamp(0.8125rem, 1vw, 0.9375rem)",
                      fontWeight: 300, color: "var(--color-text-secondary)",
                      margin: "0 0 clamp(1rem, 2.5vh, 1.5rem) 0",
                    }}>
                      {book.author}
                    </p>
                    <p style={{
                      fontFamily: "var(--font-dm-sans)", fontSize: "clamp(0.875rem, 1.05vw, 1rem)",
                      fontWeight: 400, color: "var(--color-text-secondary)", lineHeight: 1.72,
                      margin: 0, maxWidth: "34ch",
                    }}>
                      {book.note}
                    </p>
                  </motion.div>
                </AnimatePresence>

                {/* Borrowed stamp */}
                {!prefersReduced && (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`stamp-${cardIndex}`}
                      initial={{ opacity: 0, rotate: -4 }}
                      animate={{ opacity: 0.45, rotate: -3 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      aria-hidden="true"
                      style={{
                        position: "absolute",
                        top: "clamp(1.125rem, 2.5vh, 1.5rem)",
                        right: "clamp(1.125rem, 2.5vw, 1.5rem)",
                        fontFamily: "var(--font-stamp)", fontSize: "0.4375rem",
                        color: "var(--color-moss-signal)", letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        border: "0.75px solid rgba(61,97,71,0.3)", padding: "0.22em 0.55em",
                      }}
                    >
                      Borrowed {book.borrowed} times
                    </motion.div>
                  </AnimatePresence>
                )}

                {/* Dots + tap hint */}
                <div style={{
                  position: "absolute",
                  bottom: "clamp(1rem, 2vh, 1.25rem)",
                  left: "clamp(1.5rem, 4vw, 2.75rem)",
                  right: "clamp(1.5rem, 4vw, 2.75rem)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                    {CARD_BOOKS.map((_, di) => (
                      <div
                        key={di}
                        aria-hidden="true"
                        style={{
                          width: di === cardIndex ? "14px" : "4px",
                          height: "2px",
                          borderRadius: "2px",
                          backgroundColor: di === cardIndex
                            ? "rgba(61,97,71,0.55)"
                            : "rgba(61,97,71,0.2)",
                          transition: "width 300ms ease, background-color 300ms ease",
                        }}
                      />
                    ))}
                  </div>
                  <span style={{
                    fontFamily: "var(--font-stamp)",
                    fontSize: "0.4375rem",
                    color: "var(--color-text-muted)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    opacity: 0.5,
                  }}>
                    Tap to browse
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Reading list */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-6%" }}
          transition={{ duration: 0.8, delay: prefersReduced ? 0 : 0.18, ease: EASE }}
        >
          <h3 style={{
            fontFamily: "var(--font-stamp)", fontSize: "clamp(0.4375rem, 0.55vw, 0.5rem)",
            fontWeight: 400, color: "var(--color-moss-signal)", letterSpacing: "0.15em",
            textTransform: "uppercase", margin: "0 0 clamp(0.75rem, 2vh, 1rem) 0", opacity: 0.58,
          }}>
            Also on the shelves
          </h3>

          <ul
            aria-label="Other books on the shelves"
            style={{ listStyle: "none", padding: 0, margin: "0 0 clamp(1.5rem,4vh,2.25rem) 0" }}
          >
            {SHELF_BOOKS.map((b, i) => (
              <motion.li
                key={b.title}
                initial={{ opacity: 0, x: prefersReduced ? 0 : -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                whileTap={prefersReduced ? {} : { x: 5, opacity: 0.65 }}
                viewport={{ once: true, margin: "-6%" }}
                transition={{ duration: 0.6, delay: prefersReduced ? 0 : 0.22 + i * 0.07, ease: EASE }}
                style={{
                  display: "flex", alignItems: "baseline", gap: "1rem",
                  padding: "0.65em 0",
                  borderTop: "1px solid rgba(175,150,115,0.18)",
                  WebkitTapHighlightColor: "transparent",
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

          <p style={{
            fontFamily: "var(--font-dm-sans)", fontSize: "clamp(0.8125rem, 1vw, 0.9375rem)",
            fontWeight: 300, color: "var(--color-text-secondary)", letterSpacing: "0.03em", margin: 0,
          }}>
            The shelves change often. That&apos;s part of the point.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
