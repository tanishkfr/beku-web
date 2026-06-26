import type { Metadata } from "next"
import { Navbar } from "@/components/Navbar"
import { SiteFooter } from "@/sections/SiteFooter"
import { AboutContent } from "@/sections/AboutContent"
import { PageTransition } from "@/components/PageTransition"

export const metadata: Metadata = {
  title: "About — Beku",
  description: "The story behind Beku, a café, bakery and bookstore in JP Nagar, Bangalore.",
}

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <PageTransition>
        <AboutContent />
        <SiteFooter />
      </PageTransition>
    </>
  )
}
