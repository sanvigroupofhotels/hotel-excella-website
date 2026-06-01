import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Review Hotel Excella, Visakhapatnam | Guest Feedback",
  description: "Share your experience at Hotel Excella, Visakhapatnam. Your feedback helps us serve you better. Rate your stay and leave a review.",
  alternates: { canonical: "https://hotelexcella.in/review" },
  openGraph: {
    title: "Review Hotel Excella, Visakhapatnam | Guest Feedback",
    description: "Share your experience at Hotel Excella, Visakhapatnam. Your feedback helps us serve you better.",
    url: "https://hotelexcella.in/review",
    siteName: "Hotel Excella",
    images: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-qq8Cvn8rVABsuUvFcXt0Nc1n64vZlL.png",
        width: 1200,
        height: 630,
        alt: "Hotel Excella, Visakhapatnam - Guest Review",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
}

export default function ReviewLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
