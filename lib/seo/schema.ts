import { site } from "@/lib/seo/constants"

type Question = { question: string; answer: string }
type Crumb = { name: string; url: string }

const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: site.address.street,
  addressLocality: site.address.locality,
  addressRegion: site.address.region,
  postalCode: site.address.postalCode,
  addressCountry: site.address.country,
}

const geo = {
  "@type": "GeoCoordinates",
  latitude: site.geo.latitude,
  longitude: site.geo.longitude,
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${site.url}/#organization`,
    name: "Hotel Excella, Visakhapatnam",
    url: site.url,
    logo: site.image,
    image: site.image,
    email: site.email,
    telephone: site.phonePrimary,
    sameAs: site.sameAs,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: site.phonePrimary,
      contactType: "customer service",
      email: site.email,
      areaServed: "IN",
      availableLanguage: ["English", "Hindi", "Telugu"],
    },
  }
}

export function hotelSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Hotel", "LocalBusiness"],
    "@id": `${site.url}/#hotel`,
    name: "Hotel Excella, Visakhapatnam",
    url: site.url,
    image: site.image,
    description:
      "Independent family-friendly and business-traveller friendly hotel in Visakhapatnam offering comfortable stays near Beach Road, Tenneti Park, Kailasagiri and Rushikonda.",
    telephone: site.phonePrimary,
    email: site.email,
    priceRange: "₹₹",
    address: postalAddress,
    geo,
    sameAs: site.sameAs,
    amenityFeature: [
      "Free WiFi",
      "Air Conditioning",
      "24/7 Reception",
      "Daily Housekeeping",
      "Fast Check-In",
    ].map((name) => ({
      "@type": "LocationFeatureSpecification",
      name,
      value: true,
    })),
    makesOffer: {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Comfortable hotel accommodation in Vizag",
      },
    },
  }
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${site.url}/#localbusiness`,
    name: "Hotel Excella, Visakhapatnam",
    url: site.url,
    image: site.image,
    telephone: site.phonePrimary,
    email: site.email,
    address: postalAddress,
    geo,
    sameAs: site.sameAs,
    priceRange: "₹₹",
  }
}

export function faqSchema(faqs: Question[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }
}

export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  }
}

export function jsonLd(schemas: unknown[]) {
  return JSON.stringify(schemas.length === 1 ? schemas[0] : schemas).replace(/</g, "\\u003c")
}
