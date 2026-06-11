import type { Metadata } from "next"
import { site } from "@/lib/seo/constants"

export const metadata: Metadata = {
  title: "Leave a Hotel Review | Hotel Excella Vizag Guest Feedback",
  description: "Rate your stay at Hotel Excella Vizag. Share guest feedback that helps us improve. 4–5 stars posts to Google, 1–3 stars goes to our team privately.",
  keywords: "hotel review, guest feedback, Vizag hotel reviews, Hotel Excella ratings",
  alternates: { canonical: `${site.url}/review` },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Leave a Hotel Review | Hotel Excella Vizag",
    description: "Share your stay experience at Hotel Excella Vizag. Positive reviews posted to Google, improvement feedback handled privately by our team.",
    url: `${site.url}/review`,
    siteName: site.name,
    images: [
      {
        url: site.image,
        width: 1200,
        height: 630,
        alt: "Hotel Excella Vizag - Leave a Guest Review",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Leave a Review - Hotel Excella Vizag",
    description: "Share your feedback from your stay at Hotel Excella. Help us improve and help future guests.",
    images: [site.image],
  },
}

export default function ReviewLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
