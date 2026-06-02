import type { MetadataRoute } from "next"
import { site } from "@/lib/seo/constants"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/guest", "/review", "/orderfood", "/dashboard", "/quotes", "/followups", "/admin"],
      },
    ],
    sitemap: [`${site.url}/sitemap.xml`, `${site.url}/image-sitemap.xml`],
    host: site.url,
  }
}
