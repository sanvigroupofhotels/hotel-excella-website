import { heroImage, hotelAddress, phoneDisplay, siteUrl } from "@/lib/seo/site"
import type { Faq } from "@/lib/seo/content"

export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}

const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: "386 Revenue Employees Co-operative Society Colony, Visalakshi Nagar",
  addressLocality: "Visakhapatnam",
  addressRegion: "Andhra Pradesh",
  postalCode: "530043",
  addressCountry: "IN",
}

const geo = {
  "@type": "GeoCoordinates",
  latitude: 17.7666,
  longitude: 83.3515,
}

export function HotelJsonLd() {
  const shared = {
    name: "Hotel Excella",
    slogan: "Comfort Near the Coast",
    url: siteUrl,
    image: heroImage,
    telephone: phoneDisplay,
    email: "hotelexcellavizag@gmail.com",
    priceRange: "₹₹",
    address: postalAddress,
    geo,
    areaServed: "Visakhapatnam",
    amenityFeature: ["Free WiFi", "Fast Check-In", "Family Friendly", "Couple Friendly", "Business Traveller Friendly", "Guest Services Portal", "Air Conditioning"].map((name) => ({
      "@type": "LocationFeatureSpecification",
      name,
      value: true,
    })),
  }

  return (
    <JsonLd
      data={[
        { "@context": "https://schema.org", "@type": "Hotel", "@id": `${siteUrl}/#hotel`, ...shared },
        { "@context": "https://schema.org", "@type": "LocalBusiness", "@id": `${siteUrl}/#localbusiness`, ...shared },
      ]}
    />
  )
}

export function FaqJsonLd({ faqs }: { faqs: Faq[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      }}
    />
  )
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; href: string }[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: `${siteUrl}${item.href}`,
        })),
      }}
    />
  )
}
