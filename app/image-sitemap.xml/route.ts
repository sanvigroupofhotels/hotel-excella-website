import { attractions, site } from "@/lib/seo/constants"
import { roomSeoPages } from "@/lib/seo/room-pages"

export function GET() {
  const imageEntries = [
    { loc: site.url, image: site.image, title: "Hotel Excella, Visakhapatnam exterior" },
    ...roomSeoPages.map((room) => ({ loc: `${site.url}/rooms/${room.slug}`, image: room.image, title: `${room.roomName} at Hotel Excella, Visakhapatnam` })),
    ...attractions.map((attraction) => ({ loc: `${site.url}/${attraction.slug}`, image: attraction.image, title: `${attraction.name} near Hotel Excella, Visakhapatnam` })),
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${imageEntries.map((entry) => `  <url><loc>${entry.loc}</loc><image:image><image:loc>${entry.image}</image:loc><image:title>${entry.title}</image:title></image:image></url>`).join("\n")}
</urlset>`

  return new Response(xml, {
    headers: { "Content-Type": "application/xml" },
  })
}
