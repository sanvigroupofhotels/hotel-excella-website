import { sameAs, site } from "@/lib/seo/constants"

type Question = { question: string; answer: string }
type Crumb = { name: string; url: string }

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${site.url}/#organization`,
    name: site.name,
    legalName: site.brandName,
    url: site.url,
    logo: {
      "@type": "ImageObject",
      url: site.logo,
    },
    image: site.image,
    email: site.email,
    telephone: site.phonePrimary,
    sameAs,
  }
}

export function hotelSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Hotel", "LocalBusiness"],
    "@id": `${site.url}/#hotel`,
    name: site.brandName,
    url: site.url,
    image: [site.image],
    logo: site.logo,
    description:
      "Hotel Excella, Visakhapatnam is an independent hotel in Vishalakshi Nagar offering a comfortable stay near Beach Road with convenient access to Tenneti Park, Kailasagiri, Rushikonda Beach and other popular attractions.",
    telephone: site.phonePrimary,
    email: site.email,
    priceRange: "₹₹",
    sameAs,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    },
    amenityFeature: [
      "Free WiFi",
      "Air Conditioning",
      "24/7 Reception",
      "Daily Housekeeping",
      "Fast Check-In",
      "Family-friendly stay",
    ].map((name) => ({
      "@type": "LocationFeatureSpecification",
      name,
      value: true,
    })),
    makesOffer: {
      "@type": "Offer",
      url: site.bookingUrl,
      itemOffered: {
        "@type": "Service",
        name: "Comfortable hotel accommodation in Visakhapatnam",
      },
    },
  }
}

export function aggregateRatingSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Hotel",
    "@id": `${site.url}/#hotel-reviews`,
    name: site.brandName,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.7",
      reviewCount: "120",
      bestRating: "5",
      worstRating: "1",
    },
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

export function articleSchema(post: { title: string; description: string; slug: string; date: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    url: `${site.url}/blog/${post.slug}`,
    image: site.image,
    publisher: organizationSchema(),
  }
}

export function jsonLd(schemas: unknown[]) {
  return JSON.stringify(schemas.length === 1 ? schemas[0] : schemas).replace(/</g, "\\u003c")
}
