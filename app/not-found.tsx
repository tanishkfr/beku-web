import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Not found — Beku",
}

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100dvh",
        backgroundColor: "#1A1A16",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingLeft: "clamp(2rem, 8vw, 7rem)",
        paddingRight: "clamp(2rem, 8vw, 7rem)",
        background: [
          "radial-gradient(ellipse 60% 50% at 10% 30%, rgba(74, 92, 56, 0.16) 0%, transparent 100%)",
          "radial-gradient(ellipse 35% 25% at 88% 75%, rgba(200, 120, 40, 0.12) 0%, transparent 100%)",
          "#1A1A16",
        ].join(", "),
      }}
    >
      <p
        lang="kn"
        aria-hidden="true"
        style={{
          fontFamily: "var(--font-cormorant)",
          fontSize: "clamp(0.75rem, 0.9vw, 0.875rem)",
          fontWeight: 300,
          color: "rgba(244, 239, 230, 0.28)",
          letterSpacing: "0.02em",
          margin: "0 0 clamp(1.25rem, 3vh, 1.75rem) 0",
        }}
      >
        ಬೇಕು
      </p>

      <h1
        style={{
          fontFamily: "var(--font-cormorant)",
          fontSize: "clamp(3rem, 7vw, 6rem)",
          fontWeight: 300,
          color: "#F4EFE6",
          letterSpacing: "-0.03em",
          lineHeight: 0.95,
          margin: "0 0 clamp(1.5rem, 4vh, 2.5rem) 0",
        }}
      >
        Not here.
      </h1>

      <p
        style={{
          fontFamily: "var(--font-dm-sans)",
          fontSize: "clamp(0.875rem, 1.1vw, 1rem)",
          fontWeight: 300,
          color: "rgba(244, 239, 230, 0.52)",
          lineHeight: 1.7,
          margin: "0 0 clamp(2.5rem, 6vh, 4rem) 0",
          maxWidth: "34ch",
        }}
      >
        Whatever you were looking for isn&apos;t on this page.
        The café is, though.
      </p>

      <Link
        href="/"
        className="not-found-back-link"
        style={{
          fontFamily: "var(--font-cormorant)",
          fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
          fontWeight: 400,
          fontStyle: "italic",
          textDecoration: "none",
          display: "inline-flex",
          alignItems: "center",
          gap: "0.4em",
        }}
      >
        ← Back to Beku
      </Link>
    </div>
  )
}
