import type { Metadata } from "next"

export const siteUrl = "https://hotelexcella.in"
export const bookingUrl = "https://hotelexcella.bookmystay.io/"
export const phonePrimary = "+919985908131"
export const phoneDisplay = "+91 99859 08131"
export const whatsappMessage = "Hello Hotel Excella, I would like to check room availability and pricing."
export const whatsappUrl = `https://wa.me/919985908131?text=${encodeURIComponent(whatsappMessage)}`
export const heroImage = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/exterior-nVoa2Cga1MFRzoV6YEywjt23i2QKvv.png"
export const hotelAddress = "386 Revenue Employees Co-operative Society Colony, Visalakshi Nagar, Visakhapatnam, Andhra Pradesh 530043"

export function pageMetadata({
  title,
  description,
  path = "",
  image = heroImage,
}: {
  title: string
  description: string
  path?: string
  image?: string
}): Metadata {
  const url = `${siteUrl}${path}`
  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "Hotel Excella",
      images: [{ url: image, width: 1200, height: 630, alt: `${title} - Hotel Excella` }],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    robots: { index: true, follow: true },
  }
}

export const publicLinks = [
  { href: "/", label: "Home" },
  { href: "/rooms", label: "Rooms" },
  { href: "/attractions", label: "Attractions" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/guest", label: "Guest Services" },
]
