import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { HotelJsonLd } from "@/components/seo/json-ld"
import { heroImage, siteUrl } from "@/lib/seo/site"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Hotel Excella Vizag | Comfort Near the Coast",
    template: "%s | Hotel Excella",
  },
  description: "Hotel Excella is a premium value-luxury hotel near Beach Road, Tenneti Park, Kailasagiri and Rushikonda Beach in Visakhapatnam. Book direct for comfort near the coast.",
  keywords: ["Hotel Excella", "hotel near Beach Road Vizag", "hotel near Tenneti Park", "hotel near Kailasagiri", "hotel near Rushikonda Beach", "family hotel Vizag"],
  alternates: { canonical: siteUrl },
  openGraph: {
    title: "Hotel Excella Vizag | Comfort Near the Coast",
    description: "Premium value-luxury stay near Beach Road, Tenneti Park, Kailasagiri and Rushikonda Beach in Visakhapatnam.",
    url: siteUrl,
    siteName: "Hotel Excella",
    images: [{ url: heroImage, width: 1200, height: 630, alt: "Hotel Excella Vizag exterior" }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hotel Excella Vizag | Comfort Near the Coast",
    description: "Comfortable premium stay near Vizag attractions. Book direct for best support.",
    images: [heroImage],
  },
  robots: { index: true, follow: true },
  icons: { icon: "/icon.svg", apple: "/apple-icon.png" },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="bg-background">
      <body className="font-sans antialiased">
        <HotelJsonLd />
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
        {process.env.NODE_ENV === "production" && <SpeedInsights />}
      </body>
    </html>
  )
}
