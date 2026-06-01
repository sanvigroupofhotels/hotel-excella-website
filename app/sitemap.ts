import type { MetadataRoute } from "next"
import { site } from "@/lib/seo/constants"
import { seoLandingPages } from "@/lib/seo/landing-pages"
import { roomSeoPages } from "@/lib/seo/room-pages"
import { blogPosts } from "@/lib/seo/blog-posts"

export default function sitemap(): MetadataRoute.Sitemap {
  const today = new Date()

  const coreRoutes: MetadataRoute.Sitemap = [
    { url: site.url, lastModified: today, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/rooms`, lastModified: today, changeFrequency: "weekly", priority: 0.9 },
    { url: `${site.url}/prebook`, lastModified: today, changeFrequency: "weekly", priority: 0.9 },
    { url: `${site.url}/gallery`, lastModified: today, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/amenities`, lastModified: today, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/location`, lastModified: today, changeFrequency: "monthly", priority: 0.7 },
    { url: `${site.url}/contact`, lastModified: today, changeFrequency: "monthly", priority: 0.7 },
    { url: `${site.url}/orderfood`, lastModified: today, changeFrequency: "weekly", priority: 0.5 },
    { url: `${site.url}/review`, lastModified: today, changeFrequency: "monthly", priority: 0.4 },
    { url: `${site.url}/guest`, lastModified: today, changeFrequency: "monthly", priority: 0.4 },
    { url: `${site.url}/blog`, lastModified: today, changeFrequency: "weekly", priority: 0.75 },
  ]

  const landingRoutes = seoLandingPages.map((page) => ({
    url: `${site.url}/${page.slug}`,
    lastModified: today,
    changeFrequency: "weekly" as const,
    priority: page.slug === "places-to-visit-near-hotel-excella" ? 0.9 : 0.85,
  }))

  const roomRoutes = roomSeoPages.map((page) => ({
    url: `${site.url}/rooms/${page.slug}`,
    lastModified: today,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }))

  const blogRoutes = blogPosts.map((post) => ({
    url: `${site.url}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  return [...coreRoutes, ...landingRoutes, ...roomRoutes, ...blogRoutes]
}
