import { site } from "@/lib/seo/constants"
import { roomSeoPages } from "@/lib/seo/room-pages"

export const dynamic = "force-static"

const images = [
  { page: site.url, url: site.image, title: "Hotel Excella exterior" },
  ...roomSeoPages.map((room) => ({
    page: `${site.url}/rooms/${room.slug}`,
    url: room.image,
    title: `${room.roomName} at Hotel Excella`,
  })),
]

export function GET() {
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${images
  .map(
    (image) => `  <url>
    <loc>${image.page}</loc>
    <image:image>
      <image:loc>${image.url}</image:loc>
      <image:title>${image.title}</image:title>
    </image:image>
  </url>`
  )
  .join("\n")}
</urlset>`

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  })
}
