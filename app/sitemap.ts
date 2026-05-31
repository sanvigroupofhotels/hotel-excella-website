import type { MetadataRoute } from "next"
import { landingPages } from "@/lib/seo/content"
import { siteUrl } from "@/lib/seo/site"

const staticRoutes = [
  { path: "", priority: 1, changeFrequency: "weekly" as const },
  { path: "/rooms", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/rooms/oak-room", priority: 0.85, changeFrequency: "weekly" as const },
  { path: "/rooms/mapple-room", priority: 0.85, changeFrequency: "weekly" as const },
  { path: "/gallery", priority: 0.75, changeFrequency: "monthly" as const },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/contact", priority: 0.75, changeFrequency: "monthly" as const },
  { path: "/faq", priority: 0.75, changeFrequency: "monthly" as const },
  { path: "/attractions", priority: 0.85, changeFrequency: "monthly" as const },
  { path: "/restaurants", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/guest", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/review", priority: 0.65, changeFrequency: "monthly" as const },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return [
    ...staticRoutes.map((route) => ({ url: `${siteUrl}${route.path}`, lastModified, changeFrequency: route.changeFrequency, priority: route.priority })),
    ...landingPages.map((page) => ({ url: `${siteUrl}/${page.slug}`, lastModified, changeFrequency: "monthly" as const, priority: 0.82 })),
  ]
}
