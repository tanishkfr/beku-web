"use client"

import { motion, useReducedMotion } from "framer-motion"
import { OpenStatus } from "@/components/OpenStatus"
import { DwellNote } from "@/components/DwellNote"
import { EASE, H_PAD } from "@/lib/tokens"
import { address, contact, hours, rating, links } from "@/lib/business"

// Question: How do I find Beku, and when is it open?
// Composition: Exhibition label typography. Name, location, hours.
// Plus the Google rating — the strongest social proof Beku has.
// All figures come from lib/business.ts (the single source of truth).

export function Visit() {
  const prefersReduced = useReducedMotion()

  const itemReveal = (delay: number) => ({
    initial: { opacity: 0, y: prefersReduced ? 0 : 6 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-6%" as const },
    transition: { duration: 0.85, delay: prefersReduced ? 0 : delay, ease: EASE },
  })

  return (
    <section
      id="visit"
      aria-label="Visit Beku"
      style={{
        paddingTop: "clamp(7rem, 16vh, 12rem)",
        paddingBottom: "clamp(9rem, 20vh, 14rem)",
        paddingLeft: H_PAD,
        paddingRight: H_PAD,
        background: [
          "radial-gradient(ellipse 70% 35% at 50% 100%, rgba(61, 97, 71, 0.12) 0%, transparent 100%)",
          "var(--color-bg-visit)",
        ].join(", "),
      }}
    >
      {/* Google rating — animated stars, links to Google reviews */}
      <motion.a
        {...itemReveal(0)}
        href={links.googleReviews}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${rating.value} stars on Google · ${rating.countDisplay} reviews — open in Google Maps`}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.55em",
          marginBottom: "clamp(2rem, 5vh, 3.5rem)",
          padding: "0.55em 1em",
          backgroundColor: "rgba(61,97,71,0.08)",
          border: "1px solid rgba(61,97,71,0.20)",
          borderRadius: "2px",
          textDecoration: "none",
          transition: "border-color 200ms ease, background-color 200ms ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "rgba(61,97,71,0.45)"
          e.currentTarget.style.backgroundColor = "rgba(61,97,71,0.14)"
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "rgba(61,97,71,0.20)"
          e.currentTarget.style.backgroundColor = "rgba(61,97,71,0.08)"
        }}
      >
        {/* Stars animate in one by one */}
        <span aria-hidden="true" style={{ display: "flex", gap: "1px" }}>
          {[0,1,2,3,4].map((i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: prefersReduced ? 1 : 0.75 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-6%" }}
              transition={{ duration: 0.3, delay: prefersReduced ? 0 : 0.1 + i * 0.07, ease: [0.34, 1.56, 0.64, 1] }}
              aria-hidden="true"
              style={{
                fontFamily: "var(--font-stamp)",
                fontSize: "clamp(0.6875rem, 0.85vw, 0.8125rem)",
                color: "var(--color-moss-signal)",
                display: "inline-block",
              }}
            >
              ★
            </motion.span>
          ))}
        </span>
        <span style={{
          fontFamily: "var(--font-dm-sans)",
          fontSize: "clamp(0.75rem, 0.9vw, 0.875rem)",
          fontWeight: 400,
          color: "var(--color-text-secondary)",
          letterSpacing: "0.02em",
        }}>
          {rating.value} on Google
        </span>
        <span aria-hidden="true" style={{
          fontFamily: "var(--font-dm-sans)",
          fontSize: "clamp(0.6875rem, 0.8vw, 0.8125rem)",
          fontWeight: 300,
          color: "var(--color-text-muted)",
        }}>
          · {rating.countDisplay} reviews
        </span>
      </motion.a>

      {/* Place name */}
      <motion.h2
        {...itemReveal(0.06)}
        style={{
          fontFamily: "var(--font-cormorant)",
          fontSize: "clamp(2rem, 4vw, 3.5rem)",
          fontWeight: 300,
          color: "var(--color-ink)",
          lineHeight: 1.05,
          margin: "0 0 clamp(1.25rem, 3vh, 1.75rem) 0",
          letterSpacing: "-0.01em",
        }}
      >
        Beku.
      </motion.h2>

      <motion.p
        {...itemReveal(0.1)}
        style={{
          fontFamily: "var(--font-dm-sans)",
          fontSize: "clamp(0.8125rem, 1vw, 0.9375rem)",
          fontWeight: 400,
          color: "var(--color-text-muted)",
          letterSpacing: "0.05em",
          margin: "0 0 clamp(2rem, 5vh, 3rem) 0",
        }}
      >
        Café · Bakery · Bookstore
      </motion.p>

      {/* Two-column: info left, map right — stacks to single column below ~680px */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(min(320px, 100%), 1fr))",
        gap: "clamp(2rem, 6vw, 5rem)",
        alignItems: "start",
      }}>
        {/* Left — WHERE / WHEN + quote */}
        <div>
          <motion.div
            {...itemReveal(0.16)}
            style={{ marginBottom: "clamp(2.5rem, 6vh, 4rem)" }}
          >
            <div aria-hidden="true" style={{
              width: "clamp(2.5rem, 5vw, 4rem)",
              height: "1px",
              backgroundColor: "var(--color-divider)",
              marginBottom: "clamp(1.5rem, 4vh, 2.25rem)",
              opacity: 0.7,
            }} />

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(140px, 100%), 1fr))",
              gap: "clamp(2rem, 6vw, 4rem)",
              alignItems: "start",
            }}>
              {/* Where */}
              <div>
                <p style={{
                  fontFamily: "var(--font-stamp)",
                  fontSize: "clamp(0.625rem, 0.6vw, 0.6875rem)",
                  fontWeight: 500,
                  color: "var(--color-label)",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  margin: "0 0 0.6em 0",
                  opacity: 0.9,
                }}>
                  Where
                </p>
                <address style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "clamp(0.875rem, 1.05vw, 1rem)",
                  fontWeight: 400,
                  color: "var(--color-text-secondary)",
                  lineHeight: 1.65,
                  fontStyle: "normal",
                }}>
                  {address.lines.map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < address.lines.length - 1 && <br />}
                    </span>
                  ))}
                </address>
                <p style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "clamp(0.75rem, 0.9vw, 0.875rem)",
                  fontWeight: 300,
                  color: "var(--color-text-muted)",
                  lineHeight: 1.6,
                  margin: "0.75em 0 0 0",
                }}>
                  Look for the rain tree at the gate.
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginTop: "0.75em", flexWrap: "wrap" }}>
                  <a
                    href={links.maps}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.3em",
                      fontFamily: "var(--font-dm-sans)",
                      fontSize: "clamp(0.75rem, 0.9vw, 0.875rem)",
                      fontWeight: 500,
                      color: "var(--color-label)",
                      textDecoration: "none",
                      opacity: 1,
                      transition: "opacity 200ms ease",
                      letterSpacing: "0.02em",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.7" }}
                    onMouseLeave={(e) => { e.currentTarget.style.opacity = "1" }}
                  >
                    Open in Maps <span aria-hidden="true">↗</span>
                  </a>
                  <a
                    href={`tel:${contact.phoneE164}`}
                    style={{
                      fontFamily: "var(--font-dm-sans)",
                      fontSize: "clamp(0.75rem, 0.9vw, 0.875rem)",
                      fontWeight: 400,
                      color: "var(--color-text-muted)",
                      textDecoration: "none",
                      opacity: 0.75,
                      transition: "opacity 200ms ease",
                      letterSpacing: "0.02em",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.opacity = "1" }}
                    onMouseLeave={(e) => { e.currentTarget.style.opacity = "0.75" }}
                  >
                    {contact.phoneDisplay}
                  </a>
                </div>
              </div>

              {/* When */}
              <div>
                <p style={{
                  fontFamily: "var(--font-stamp)",
                  fontSize: "clamp(0.625rem, 0.6vw, 0.6875rem)",
                  fontWeight: 500,
                  color: "var(--color-label)",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  margin: "0 0 0.6em 0",
                  opacity: 0.9,
                }}>
                  When
                </p>
                <p style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "clamp(0.875rem, 1.05vw, 1rem)",
                  fontWeight: 400,
                  color: "var(--color-text-secondary)",
                  lineHeight: 1.65,
                  margin: 0,
                }}>
                  {hours.daysLabel}<br />
                  {hours.rangeLabel}
                </p>
                <p style={{ margin: "0.75em 0 0 0", color: "var(--color-text-muted)" }}>
                  <OpenStatus
                    fallback=""
                    style={{
                      fontFamily: "var(--font-stamp)",
                      fontSize: "clamp(0.625rem, 0.6vw, 0.6875rem)",
                      fontWeight: 400,
                      color: "var(--color-text-muted)",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  />
                </p>
              </div>
            </div>
          </motion.div>

          <motion.p
            {...itemReveal(0.38)}
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(1rem, 1.6vw, 1.375rem)",
              fontWeight: 400,
              color: "var(--color-text-muted)",
              margin: "0 0 0 0",
            }}
          >
            Just beyond the traffic.
          </motion.p>

          <DwellNote style={{ marginTop: "clamp(1.25rem, 3vh, 2rem)" }}>
            If you reach the temple, you&apos;ve gone a little too far.
          </DwellNote>
        </div>

        {/* Right — OpenStreetMap embed */}
        <motion.div
          {...itemReveal(0.22)}
          style={{
            position: "sticky",
            top: "clamp(6rem, 12vh, 8rem)",
            borderRadius: "6px",
            overflow: "hidden",
            border: "1px solid var(--color-divider)",
          }}
        >
          <iframe
            src={`https://www.openstreetmap.org/export/embed.html?bbox=77.5838%2C12.9079%2C77.5878%2C12.9119&layer=mapnik&marker=${address.geo.latitude}%2C${address.geo.longitude}`}
            width="100%"
            height="420"
            style={{ border: 0, display: "block" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Beku on OpenStreetMap"
          />
        </motion.div>
      </div>
    </section>
  )
}
