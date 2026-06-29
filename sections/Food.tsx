"use client"

import { useState, useId } from "react"
import Image from "next/image"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { EASE, H_PAD, IMG_PAD } from "@/lib/tokens"
import { EXPERIMENTS } from "@/lib/experiments"
import { DwellNote } from "@/components/DwellNote"

const ZOMATO_URL = "https://www.zomato.com/bangalore/beku-cafe-bakery-bookstore-1-jp-nagar-bangalore"
const FOOD_SRC = "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=2070&q=82"

type MenuItem = {
  name: string
  /** Kannada name — revealed on hover/open. Owner to verify before launch. */
  kn?: string
  description: string
  price: string
  note: string
  isBekuOriginal?: boolean
}

const DRINKS: MenuItem[] = [
  {
    name: "Filter Coffee",
    kn: "ಫಿಲ್ಟರ್ ಕಾಫಿ",
    description: "House filter, dark and clean.",
    price: "₹140",
    note: "Made fresh every hour. Ask for the ratio if you're curious.",
  },
  {
    name: "Vietnamese Iced Coffee",
    kn: "ವಿಯೆಟ್ನಾಮೀಸ್ ಐಸ್ಡ್ ಕಾಫಿ",
    description: "Cold brewed, condensed milk, over ice.",
    price: "₹180",
    note: "Cold brewed overnight. Ask for extra-strong if you need it.",
  },
  {
    name: "Strawberry Matcha",
    kn: "ಸ್ಟ್ರಾಬೆರಿ ಮಾಚಾ",
    description: "Ceremonial matcha, strawberry purée, oat milk.",
    price: "₹220",
    note: "Made to order. Pairs well with the lemon tea cake.",
  },
  {
    name: "White Chocolate & Rose Latte",
    kn: "ವೈಟ್ ಚಾಕೊಲೇಟ್ ಮತ್ತು ರೋಸ್ ಲಾಟೆ",
    description: "House espresso, white chocolate, rose, whole milk.",
    price: "₹240",
    note: "Floral without being sweet. More coffee than you'd expect.",
    isBekuOriginal: true,
  },
  {
    name: "Hazelnut Cold Coffee",
    kn: "ಹೇಜಲ್‌ನಟ್ ಕೋಲ್ಡ್ ಕಾಫಿ",
    description: "House espresso, hazelnut, whole milk.",
    price: "₹200",
    note: "The hazelnut is restrained. More coffee than sweet.",
  },
  {
    name: "Affogato",
    kn: "ಅಫೊಗಾಟೊ",
    description: "Double espresso over one scoop of vanilla.",
    price: "₹160",
    note: "Two minutes. Drink it before it turns into something else.",
  },
]

const KITCHEN: MenuItem[] = [
  {
    name: "Mysore Pak Croissant",
    kn: "ಮೈಸೂರು ಪಾಕ್ ಕ್ರೋಸಾಂ",
    description: "Laminated with Mysore Pak filling.",
    price: "₹180",
    note: "The filling comes from a recipe we won't be sharing.",
    isBekuOriginal: true,
  },
  {
    name: "Chilli Croissant",
    kn: "ಚಿಲ್ಲಿ ಕ್ರೋಸಾಂ",
    description: "Spiced chilli filling, buttery layers.",
    price: "₹160",
    note: "Best warm. Ask if they've just come out.",
  },
  {
    name: "Arrabiata Pasta",
    kn: "ಅರಬಿಯಾಟಾ ಪಾಸ್ಟಾ",
    description: "Spicy tomato, made in the kitchen.",
    price: "₹280",
    note: "On the thicker side. Ask for the bread to go with it.",
  },
  {
    name: "Parmesan Fries",
    kn: "ಪಾರ್ಮೆಸನ್ ಫ್ರೈಸ್",
    description: "Shoestring fries, parmesan, fresh herbs.",
    price: "₹220",
    note: "The kind you keep reaching for.",
  },
  {
    name: "Lemon Tea Cake",
    kn: "ಲೆಮನ್ ಟೀ ಕೇಕ್",
    description: "Glazed, tart, with black tea notes.",
    price: "₹140",
    note: "Goes particularly well with filter coffee.",
  },
  {
    name: "Curd Rice",
    kn: "ಮೊಸರನ್ನ",
    description: "With potato pepper fry on the side.",
    price: "₹180",
    note: "The kind of thing you didn't expect to order and then did.",
  },
]

// Small leaf mark for Beku Originals
function OriginalMark() {
  return (
    <span
      title="Beku Original"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.25em",
        marginLeft: "0.5em",
        verticalAlign: "middle",
      }}
    >
      <svg width="6" height="8" viewBox="0 0 6 8" fill="none" aria-hidden="true">
        <line x1="3" y1="7" x2="3" y2="1.5" stroke="#C06B30" strokeWidth="0.7" strokeLinecap="round" />
        <ellipse cx="2" cy="3.5" rx="1.2" ry="0.55" transform="rotate(-30 2 3.5)" stroke="#C06B30" strokeWidth="0.6" fill="none" />
        <ellipse cx="4" cy="3.5" rx="1.2" ry="0.55" transform="rotate(30 4 3.5)" stroke="#C06B30" strokeWidth="0.6" fill="none" />
      </svg>
    </span>
  )
}

function MenuRow({
  item,
  index,
  isFirst,
  isOpen,
  onToggle,
  prefersReduced,
}: {
  item: MenuItem
  index: number
  isFirst: boolean
  isOpen: boolean
  onToggle: () => void
  prefersReduced: boolean | null
}) {
  const id = useId()
  const panelId = `menu-panel-${id}`
  const btnId = `menu-btn-${id}`
  const num = String(index + 1).padStart(2, "0")
  const [hovered, setHovered] = useState(false)
  const showKannada = EXPERIMENTS.kannadaLayer && !!item.kn && (hovered || isOpen)

  return (
    <motion.div
      layout="position"
      style={{ position: "relative", overflow: "hidden" }}
    >
      {/* Hover accent — left edge stripe */}
      <motion.div
        aria-hidden="true"
        animate={{ scaleY: isOpen ? 1 : 0 }}
        initial={{ scaleY: 0 }}
        transition={{ duration: 0.28, ease: EASE }}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "2px",
          backgroundColor: "var(--color-mysore-pak)",
          transformOrigin: "top center",
          opacity: 0.7,
        }}
      />

      <motion.button
        id={btnId}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
        whileTap={{ scale: 0.995 }}
        style={{
          width: "100%",
          background: "none",
          border: "none",
          borderTop: isFirst ? "none" : "1px solid rgba(175,150,115,0.20)",
          cursor: "pointer",
          textAlign: "left",
          padding: "clamp(0.875rem,1.8vh,1.1rem) 0 clamp(0.875rem,1.8vh,1.1rem) 0.875rem",
          display: "grid",
          gridTemplateColumns: "2rem 1fr auto",
          gap: "0.5rem",
          alignItems: "baseline",
          transition: "background-color 200ms ease",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(192,107,48,0.04)"; setHovered(true) }}
        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; setHovered(false) }}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
      >
        {/* Index */}
        <span style={{
          fontFamily: "var(--font-stamp)",
          fontSize: "0.5rem",
          color: isOpen ? "var(--color-mysore-pak)" : "var(--color-text-muted)",
          letterSpacing: "0.06em",
          transition: "color 200ms ease",
          alignSelf: "center",
          paddingTop: "0.1em",
          opacity: 0.7,
        }}>
          {num}
        </span>

        {/* Name + description */}
        <span style={{ minWidth: 0 }}>
          <span style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "0.1em",
            transform: EXPERIMENTS.hoverMotion && hovered && !isOpen ? "translateX(4px)" : "translateX(0)",
            transition: "transform 260ms var(--ease-natural)",
          }}>
            <span style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(1.125rem, 2vw, 1.5rem)",
              fontWeight: 400,
              fontStyle: "italic",
              color: isOpen ? "var(--color-mysore-pak)" : "var(--color-ink)",
              lineHeight: 1.2,
              transition: "color 220ms ease",
            }}>
              {item.name}
            </span>
            {item.isBekuOriginal && !prefersReduced && <OriginalMark />}
            {EXPERIMENTS.kannadaLayer && item.kn && (
              <span
                lang="kn"
                aria-hidden="true"
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "clamp(0.8125rem, 1.2vw, 1rem)",
                  fontWeight: 300,
                  color: "var(--color-text-muted)",
                  opacity: showKannada ? 0.6 : 0,
                  transform: showKannada ? "translateX(0)" : "translateX(-3px)",
                  transition: "opacity 280ms ease, transform 280ms ease",
                  marginLeft: "0.15em",
                  whiteSpace: "nowrap",
                }}
              >
                {item.kn}
              </span>
            )}
          </span>
          <span style={{
            display: "block",
            fontFamily: "var(--font-dm-sans)",
            fontSize: "clamp(0.75rem,0.85vw,0.8125rem)",
            fontWeight: 300,
            color: "var(--color-text-muted)",
            lineHeight: 1.4,
            marginTop: "0.2em",
          }}>
            {item.description}
          </span>
        </span>

        {/* Price */}
        <span style={{
          fontFamily: "var(--font-dm-sans)",
          fontSize: "clamp(0.8125rem,0.95vw,0.9375rem)",
          fontWeight: 400,
          color: "var(--color-text-secondary)",
          letterSpacing: "0.01em",
          whiteSpace: "nowrap",
          flexShrink: 0,
          alignSelf: "center",
        }}>
          {item.price}
        </span>
      </motion.button>

      {/* Accordion note panel */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={btnId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0, transition: { height: { duration: 0.18, ease: EASE }, opacity: { duration: 0.12, ease: EASE } } }}
            transition={{
              height: { duration: 0.32, ease: EASE },
              opacity: { duration: 0.22, ease: EASE },
            }}
            style={{ overflow: "hidden" }}
          >
            <p style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(0.9375rem, 1.3vw, 1.125rem)",
              fontWeight: 400,
              fontStyle: "italic",
              color: "var(--color-text-secondary)",
              lineHeight: 1.65,
              margin: 0,
              paddingLeft: "2.5rem",
              paddingRight: "0.5rem",
              paddingBottom: "clamp(0.875rem,1.8vh,1.1rem)",
            }}>
              {item.note}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function MenuColumn({
  label,
  items,
  openKey,
  setOpenKey,
  keyPrefix,
  prefersReduced,
  entryDelay,
}: {
  label: string
  items: MenuItem[]
  openKey: string | null
  setOpenKey: (k: string | null) => void
  keyPrefix: string
  prefersReduced: boolean | null
  entryDelay: number
}) {
  return (
    <div style={{ flex: "1 1 280px", minWidth: 0 }}>
      {/* Column header */}
      <motion.div
        initial={{ opacity: 0, y: prefersReduced ? 0 : 6 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-6%" }}
        transition={{ duration: 0.7, delay: entryDelay, ease: EASE }}
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: "1rem",
          borderBottom: "1px solid rgba(175,150,115,0.3)",
          paddingBottom: "clamp(0.5rem,1.2vh,0.7rem)",
          margin: "0 0 clamp(0.6rem,1.4vh,0.85rem) 0",
        }}
      >
        <h3 style={{
          fontFamily: "var(--font-stamp)",
          fontSize: "clamp(0.5rem, 0.6vw, 0.5625rem)",
          fontWeight: 500,
          color: "var(--color-label)",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          margin: 0,
          opacity: 0.9,
        }}>
          {label}
        </h3>
        <span style={{
          fontFamily: "var(--font-stamp)",
          fontSize: "0.4375rem",
          fontWeight: 400,
          color: "var(--color-text-muted)",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}>
          {items.length} to choose
        </span>
      </motion.div>

      {/* Item list */}
      <ul aria-label={label} style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {items.map((item, i) => {
          const k = `${keyPrefix}-${i}`
          return (
            <motion.li
              key={item.name}
              initial={{ opacity: 0, y: prefersReduced ? 0 : 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-6%" }}
              transition={{ duration: 0.65, delay: prefersReduced ? 0 : entryDelay + 0.07 + i * 0.055, ease: EASE }}
            >
              <MenuRow
                item={item}
                index={i}
                isFirst={i === 0}
                isOpen={openKey === k}
                onToggle={() => setOpenKey(openKey === k ? null : k)}
                prefersReduced={prefersReduced}
              />
            </motion.li>
          )
        })}
        <li aria-hidden="true" style={{ borderTop: "1px solid rgba(175,150,115,0.20)", height: 0 }} />
      </ul>
    </div>
  )
}

export function Food() {
  const prefersReduced = useReducedMotion()
  const [openKey, setOpenKey] = useState<string | null>(null)
  const [zomatoHovered, setZomatoHovered] = useState(false)

  return (
    <section
      id="menu"
      aria-label="Food and drink"
      style={{
        paddingTop: "clamp(7rem, 16vh, 12rem)",
        paddingBottom: "clamp(7rem, 16vh, 12rem)",
        paddingLeft: H_PAD,
        paddingRight: H_PAD,
        background: [
          "radial-gradient(ellipse 65% 50% at 50% 0%, rgba(192,107,48,0.08) 0%, transparent 100%)",
          "var(--color-bg-food)",
        ].join(", "),
      }}
    >
      {/* Section intro */}
      <motion.div
        initial={{ opacity: 0, y: prefersReduced ? 0 : 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-6%" }}
        transition={{ duration: 0.85, ease: EASE }}
        style={{ marginBottom: "clamp(2rem, 5vh, 3.5rem)" }}
      >
        <h2 style={{
          fontFamily: "var(--font-cormorant)",
          fontSize: "clamp(1.125rem, 2vw, 1.625rem)",
          fontWeight: 400,
          fontStyle: "italic",
          color: "var(--color-text-secondary)",
          lineHeight: 1.3,
          margin: "0 0 0.55em 0",
        }}>
          Made here. Worth staying for.
        </h2>
        <p style={{
          fontFamily: "var(--font-dm-sans)",
          fontSize: "clamp(0.8125rem, 1vw, 0.9375rem)",
          fontWeight: 300,
          color: "var(--color-text-muted)",
          lineHeight: 1.7,
          margin: 0,
          maxWidth: "46ch",
        }}>
          The filter coffee is made fresh every hour. The Mysore Pak Croissant is the thing people keep coming back for.
        </p>
      </motion.div>

      {/* Food photo — kitchen counter light */}
      <motion.div
        initial={{ opacity: prefersReduced ? 1 : 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-6%" }}
        transition={{ duration: 1.1, delay: prefersReduced ? 0 : 0.08, ease: EASE }}
        style={{
          marginLeft: `calc(-1 * ${H_PAD})`,
          marginRight: `calc(-1 * ${H_PAD})`,
          position: "relative",
          paddingLeft: IMG_PAD,
          paddingRight: IMG_PAD,
          marginBottom: "clamp(3rem, 7vh, 5rem)",
        }}
      >
        <div style={{
          position: "relative",
          width: "100%",
          height: "clamp(36vh, 48vh, 56vh)",
          borderRadius: "6px",
          overflow: "hidden",
        }}>
          <Image
            src={FOOD_SRC}
            alt="Coffee and pastries at Beku — warm morning counter light"
            fill
            sizes="(max-width: 768px) 100vw, 100vw"
            style={{ objectFit: "cover", objectPosition: "center 60%" }}
          />
          <svg aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.038, pointerEvents: "none" }}>
            <filter id="food-grain">
              <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#food-grain)" />
          </svg>
        </div>

        {/* Artifact: bakery label, pinned to the photo's corner */}
        {EXPERIMENTS.artifactVocab && (
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              bottom: "clamp(-0.85rem, -1.6vh, -1.1rem)",
              left: "clamp(1.75rem, 5.5vw, 4rem)",
              transform: "rotate(-2.2deg)",
              backgroundColor: "var(--color-offwhite)",
              border: "1px solid rgba(175,150,115,0.5)",
              borderRadius: "2px",
              padding: "0.65rem 0.9rem 0.7rem",
              boxShadow: "2px 4px 18px rgba(40,20,8,0.12), 0 1px 3px rgba(40,20,8,0.06)",
              maxWidth: "13.5rem",
              zIndex: 3,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.4em", marginBottom: "0.3em" }}>
              <svg width="9" height="11" viewBox="0 0 9 11" fill="none">
                <line x1="4.5" y1="10" x2="4.5" y2="2" stroke="#3D6147" strokeWidth="0.7" strokeLinecap="round" />
                <ellipse cx="2.6" cy="4.6" rx="1.7" ry="0.7" transform="rotate(-32 2.6 4.6)" stroke="#3D6147" strokeWidth="0.6" fill="none" />
                <ellipse cx="6.4" cy="4.6" rx="1.7" ry="0.7" transform="rotate(32 6.4 4.6)" stroke="#3D6147" strokeWidth="0.6" fill="none" />
                <ellipse cx="2.9" cy="6.8" rx="1.4" ry="0.6" transform="rotate(-32 2.9 6.8)" stroke="#3D6147" strokeWidth="0.6" fill="none" />
                <ellipse cx="6.1" cy="6.8" rx="1.4" ry="0.6" transform="rotate(32 6.1 6.8)" stroke="#3D6147" strokeWidth="0.6" fill="none" />
              </svg>
              <span style={{
                fontFamily: "var(--font-stamp)",
                fontSize: "0.5rem",
                fontWeight: 400,
                color: "var(--color-warmwood)",
                letterSpacing: "0.13em",
                textTransform: "uppercase",
                opacity: 0.75,
              }}>
                From the oven
              </span>
            </div>
            <p style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
              fontWeight: 400,
              fontStyle: "italic",
              color: "var(--color-ink)",
              lineHeight: 1.15,
              margin: "0 0 0.15em 0",
            }}>
              Mysore Pak Croissant
            </p>
            <p style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: "0.6875rem",
              fontWeight: 300,
              color: "var(--color-text-muted)",
              lineHeight: 1.4,
              margin: 0,
            }}>
              with Mysore Pak filling
            </p>
          </div>
        )}
      </motion.div>

      {/* Two-column menu */}
      <div style={{ display: "flex", gap: "clamp(2.5rem, 6vw, 5rem)", flexWrap: "wrap" }}>
        <MenuColumn
          label="Drinks"
          items={DRINKS}
          openKey={openKey}
          setOpenKey={setOpenKey}
          keyPrefix="drinks"
          prefersReduced={prefersReduced}
          entryDelay={0}
        />
        <MenuColumn
          label="Kitchen"
          items={KITCHEN}
          openKey={openKey}
          setOpenKey={setOpenKey}
          keyPrefix="kitchen"
          prefersReduced={prefersReduced}
          entryDelay={0.1}
        />
      </div>

      {/* "From the oven" note + Zomato CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-6%" }}
        transition={{ duration: 0.9, delay: prefersReduced ? 0 : 0.5, ease: EASE }}
        style={{
          marginTop: "clamp(2.5rem, 6vh, 4rem)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1.5rem",
        }}
      >
        <p style={{
          fontFamily: "var(--font-dm-sans)",
          fontSize: "clamp(0.8125rem, 1vw, 0.9375rem)",
          fontWeight: 300,
          color: "var(--color-text-muted)",
          letterSpacing: "0.02em",
          margin: 0,
          maxWidth: "32ch",
        }}>
          Something warm from the oven, every day.
          <br />
          Ask at the counter.
        </p>

        {/* Zomato CTA — proper bordered button */}
        <motion.a
          href={ZOMATO_URL}
          target="_blank"
          rel="noopener noreferrer"
          whileTap={{ scale: 0.97 }}
          onMouseEnter={() => setZomatoHovered(true)}
          onMouseLeave={() => setZomatoHovered(false)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.6em",
            fontFamily: "var(--font-dm-sans)",
            fontSize: "clamp(0.75rem, 0.9vw, 0.875rem)",
            fontWeight: 400,
            color: zomatoHovered ? "var(--color-ink)" : "var(--color-text-secondary)",
            textDecoration: "none",
            letterSpacing: "0.04em",
            padding: "0.65em 1.2em",
            border: `1px solid ${zomatoHovered ? "rgba(192,107,48,0.65)" : "rgba(175,150,115,0.35)"}`,
            borderRadius: "2px",
            backgroundColor: zomatoHovered ? "rgba(192,107,48,0.06)" : "transparent",
            transition: "color 220ms ease, border-color 220ms ease, background-color 220ms ease",
            flexShrink: 0,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Sliding fill on hover */}
          <motion.span
            aria-hidden="true"
            animate={{ x: zomatoHovered ? "0%" : "-100%" }}
            transition={{ duration: 0.32, ease: EASE }}
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(192,107,48,0.05)",
              zIndex: 0,
            }}
          />
          <span style={{ position: "relative", zIndex: 1 }}>Full menu on Zomato</span>
          <motion.span
            aria-hidden="true"
            animate={{ x: zomatoHovered ? 3 : 0 }}
            transition={{ duration: 0.22, ease: EASE }}
            style={{ position: "relative", zIndex: 1, fontSize: "1.1em", lineHeight: 1 }}
          >
            ↗
          </motion.span>
        </motion.a>
      </motion.div>

      <DwellNote style={{ marginTop: "clamp(1.5rem, 3.5vh, 2.25rem)" }}>
        The second tray comes out just after four.
      </DwellNote>
    </section>
  )
}
