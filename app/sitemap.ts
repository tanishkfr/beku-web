import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/business"

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_URL
  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  ]
}
