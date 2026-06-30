// Business data — the single source of truth for everything factual about Beku.
//
// Address, phone, hours, rating, and links must ONLY live here. Every section,
// the SEO schema, the OG image, robots and the sitemap read from this file.
// When the real details change (new hours, verified rating, real socials),
// this is the one place to edit.

/** Canonical production origin. Override per-environment with NEXT_PUBLIC_SITE_URL. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://beku.in"

// ── Hours ────────────────────────────────────────────────────────────────────
// Stored as minutes-from-midnight so the open/closed logic stays exact.
export const hours = {
  openMinutes: 11 * 60, // 11:00
  closeMinutes: 23 * 60, // 23:00
  opensLabel: "11am",
  closesLabel: "11pm",
  /** "11am – 11pm" */
  rangeLabel: "11am – 11pm",
  /** "Open every day" */
  daysLabel: "Open every day",
  /** "Open every day · 11am – 11pm" — the static fallback used before JS runs. */
  fullLabel: "Open every day · 11am – 11pm",
  /** ISO opening-hours strings for schema.org. */
  opensISO: "11:00",
  closesISO: "23:00",
} as const

// ── Address ──────────────────────────────────────────────────────────────────
export const address = {
  street: "543, 9th Cross Rd, 3rd Phase, JP Nagar",
  area: "JP Nagar",
  city: "Bangalore",
  region: "Karnataka",
  postalCode: "560078",
  country: "IN",
  /** Address split into display lines (used by the Visit section). */
  lines: ["543, 9th Cross Rd", "3rd Phase, JP Nagar", "Bangalore 560078"],
  geo: { latitude: 12.9104, longitude: 77.5969 },
} as const

// ── Contact ──────────────────────────────────────────────────────────────────
export const contact = {
  /** E.164 — used for tel: links and schema.org. */
  phoneE164: "+919008798842",
  /** Human-readable phone. */
  phoneDisplay: "+91 90087 98842",
} as const

// ── Rating (from Google) ─────────────────────────────────────────────────────
export const rating = {
  value: "4.7",
  count: 1979,
  /** "1,979" */
  countDisplay: "1,979",
} as const

// ── External links ───────────────────────────────────────────────────────────
export const links = {
  instagram: "https://instagram.com/beku.blr",
  instagramHandle: "@beku.blr",
  zomato:
    "https://www.zomato.com/bangalore/beku-cafe-bakery-bookstore-1-jp-nagar-bangalore",
  /** Google Maps share link for the storefront. */
  maps: "https://share.google/Axv26Yaqm85EMtgoK",
  /** Direct link to the Google Maps reviews tab. */
  googleReviews: "https://share.google/Axv26Yaqm85EMtgoK",
} as const

// ── Identity ─────────────────────────────────────────────────────────────────
export const business = {
  name: "Beku",
  category: "Café · Bakery · Bookstore",
  area: address.area,
  city: address.city,
  hours,
  address,
  contact,
  rating,
  links,
} as const

// ── Events ───────────────────────────────────────────────────────────────────
// Placeholder programming for the proposal. Replace with the real schedule
// before launch. Kept here (not inline) so nothing reads as a stale, dated
// one-off — the featured item is intentionally recurring, never a past date.
export const events = {
  categories: "Film screenings. Book swaps. Coffee sippings.",
  /** A recurring example — evergreen, never goes stale. */
  featured: {
    pinnedLabel: "On the board",
    title: "Film Night",
    cadence: "Fridays · 8pm",
  },
} as const
