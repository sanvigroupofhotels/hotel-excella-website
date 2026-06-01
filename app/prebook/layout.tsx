import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Check Availability | Hotel Excella, Visakhapatnam Direct Booking",
  description: "Check room availability and book directly at Hotel Excella, Visakhapatnam. Best rates guaranteed with instant confirmation. Queen and King Executive rooms available.",
  alternates: { canonical: "https://hotelexcella.in/prebook" },
  openGraph: {
    title: "Check Availability | Hotel Excella, Visakhapatnam Direct Booking",
    description: "Check room availability and book directly at Hotel Excella, Visakhapatnam. Best rates guaranteed with instant confirmation.",
    url: "https://hotelexcella.in/prebook",
    siteName: "Hotel Excella",
    images: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/exterior-nVoa2Cga1MFRzoV6YEywjt23i2QKvv.png",
        width: 1200,
        height: 630,
        alt: "Hotel Excella, Visakhapatnam - Book Direct",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
}

export default function PrebookLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
