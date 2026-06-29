import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans, DM_Mono } from "next/font/google";
import "./globals.css";
import { SplashScreen } from "@/components/SplashScreen";
import { TimeOfDayController } from "@/components/TimeOfDayController";
import { SITE_URL, business, address, contact, hours, rating, links } from "@/lib/business";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmMono = DM_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["300", "400"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#182820",
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Beku — Café, Bakery & Bookstore in JP Nagar, Bangalore",
  description: "Home of the Mysore Pak Croissant. Coffee, books and slow afternoons in a bungalow in JP Nagar, Bangalore. Open daily, 11am–11pm.",
  keywords: ["café bangalore", "bookstore JP nagar", "bakery bangalore", "beku cafe", "coffee JP nagar", "books bangalore", "mysore pak croissant", "beku jp nagar menu", "café jp nagar bangalore"],
  openGraph: {
    title: "Beku — Café, Bakery & Bookstore in JP Nagar",
    description: "Home of the Mysore Pak Croissant. Coffee, books and slow afternoons in JP Nagar, Bangalore.",
    type: "website",
    url: SITE_URL,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Beku — Café, Bakery & Bookstore in JP Nagar",
    description: "Coffee, books and slow afternoons in JP Nagar, Bangalore.",
  },
};

// Schema.org structured data — FoodEstablishment for Google rich results
const schemaOrg = {
  "@context": "https://schema.org",
  "@type": "CafeOrCoffeeShop",
  "name": business.name,
  "description": "Café, bakery and independent bookstore in a bungalow in JP Nagar, Bangalore.",
  "url": SITE_URL,
  "telephone": contact.phoneE164,
  "address": {
    "@type": "PostalAddress",
    "streetAddress": address.street,
    "addressLocality": address.city,
    "addressRegion": address.region,
    "postalCode": address.postalCode,
    "addressCountry": address.country
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": address.geo.latitude,
    "longitude": address.geo.longitude
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
    "opens": hours.opensISO,
    "closes": hours.closesISO
  },
  "servesCuisine": ["Coffee", "Café", "Bakery", "South Indian"],
  "priceRange": "₹₹",
  "menu": `${SITE_URL}/#menu`,
  "currenciesAccepted": "INR",
  "paymentAccepted": "Cash, Card, UPI",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": rating.value,
    "reviewCount": String(rating.count),
    "bestRating": "5"
  },
  "sameAs": [
    links.instagram,
    links.zomato
  ]
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${plusJakarta.variable} ${dmMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
      </head>
      <body>
        <a href="#main-content" className="sr-skip-link">Skip to content</a>
        <TimeOfDayController />
        <SplashScreen />
        {children}
        {/* Global paper grain — gives the page material weight */}
        <svg
          aria-hidden="true"
          style={{
            position: "fixed",
            inset: 0,
            width: "100%",
            height: "100%",
            opacity: 0.07,
            pointerEvents: "none",
            zIndex: 200,
          }}
        >
          <filter id="beku-page-grain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="4"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#beku-page-grain)" />
        </svg>
      </body>
    </html>
  );
}
