import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans, DM_Mono } from "next/font/google";
import "./globals.css";
import { SplashScreen } from "@/components/SplashScreen";
import { TimeOfDayController } from "@/components/TimeOfDayController";

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
  metadataBase: new URL("https://beku.in"),
  title: "Beku — Café, Bakery & Bookstore in JP Nagar, Bangalore",
  description: "Home of the Mysore Pak Croissant. Coffee, books and slow afternoons in a bungalow in JP Nagar, Bangalore. Open daily, 11am–11pm.",
  keywords: ["café bangalore", "bookstore JP nagar", "bakery bangalore", "beku cafe", "coffee JP nagar", "books bangalore", "mysore pak croissant", "beku jp nagar menu", "café jp nagar bangalore"],
  openGraph: {
    title: "Beku — Café, Bakery & Bookstore in JP Nagar",
    description: "Home of the Mysore Pak Croissant. Coffee, books and slow afternoons in JP Nagar, Bangalore.",
    type: "website",
    url: "https://beku.in",
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
  "name": "Beku",
  "description": "Café, bakery and independent bookstore in a bungalow in JP Nagar, Bangalore.",
  "url": "https://beku.in",
  "telephone": "+919008798842",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "543, 9th Cross Rd, 3rd Phase, JP Nagar",
    "addressLocality": "Bangalore",
    "addressRegion": "Karnataka",
    "postalCode": "560078",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 12.9099,
    "longitude": 77.5858
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
    "opens": "11:00",
    "closes": "23:00"
  },
  "servesCuisine": ["Coffee", "Café", "Bakery", "South Indian"],
  "priceRange": "₹₹",
  "menu": "https://beku.in/#menu",
  "currenciesAccepted": "INR",
  "paymentAccepted": "Cash, Card, UPI",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.7",
    "reviewCount": "1892",
    "bestRating": "5"
  },
  "sameAs": [
    "https://www.instagram.com/beku.blr/",
    "https://www.zomato.com/bangalore/beku-cafe-bakery-bookstore-1-jp-nagar-bangalore"
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
