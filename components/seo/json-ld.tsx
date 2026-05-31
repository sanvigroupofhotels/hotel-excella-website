import { heroImage, hotelAddress, phoneDisplay, siteUrl } from "@/lib/seo/site"
import type { Faq } from "@/lib/seo/content"

export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}

export function HotelJsonLd() {
  return (
    <JsonLd
      data={[
        {
          "@context": "https://schema.org",
          "@type": "Hotel",
          "@id": `${siteUrl}/#hotel`,
          name: "Hotel Excella",
          slogan: "Comfort Near the Coast",
          url: siteUrl,
          image: heroImage,
          telephone: phoneDisplay,
          email: "hotelexcellavizag@gmail.com",
          priceRange: "₹₹",
          address: {
            "@type": "PostalAddress",
            streetAddress: "386 Revenue Employees Co-operative Society Colony, Visalakshi Nagar",
            addressLocality: "Visakhapatnam",
            addressRegion: "Andhra Pradesh",
            postalCode: "530043",
            addressCountry: "IN",
          },
          amenityFeature: ["Free WiFi", "Breakfast Available", "Fast Check-In", "Family Friendly", "Couple Friendly", "Air Conditioning"].map((name) => ({
            "@type": "LocationFeatureSpecification",
            name,
            value: true,
          })),
        },
        {
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "@id": `${siteUrl}/#localbusiness`,
          name: "Hotel Excella",
          url: siteUrl,
          image: heroImage,
          telephone: phoneDisplay,
          address: hotelAddress,
        },
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
