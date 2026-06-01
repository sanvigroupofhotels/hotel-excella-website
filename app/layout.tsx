import type { Metadata } from 'next'
import { Geist, Geist_Mono, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'

const geist = Geist({ 
  subsets: ["latin"],
  variable: '--font-geist'
});

const geistMono = Geist_Mono({ 
  subsets: ["latin"],
  variable: '--font-geist-mono'
});

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-playfair'
});

export const metadata: Metadata = {
  metadataBase: new URL('https://hotelexcella.in'),
  title: {
    default: 'Hotel Excella Vizag | Premium Value-Luxury Stay in Visakhapatnam',
    template: '%s',
  },
  description: 'Comfort near the coast at Hotel Excella, a premium value-luxury hotel in Vizag near Beach Road, Tenneti Park, Kailasagiri and Rushikonda attractions.',
  keywords: 'Hotel near Beach Road Vizag, Hotel near Kailasagiri, Hotel near Tenneti Park, Hotel near Rushikonda Beach, Family hotel in Visakhapatnam, Couple friendly hotel Vizag, Comfortable stay in Vizag',
  openGraph: {
    title: 'Hotel Excella Vizag | Premium Value-Luxury Stay in Visakhapatnam',
    description: 'Comfort near the coast at Hotel Excella with convenient access to Vizag attractions including Tenneti Park, Kailasagiri and Rushikonda.',
    url: 'https://hotelexcella.in',
    siteName: 'Hotel Excella',
    images: [
      {
        url: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/exterior-nVoa2Cga1MFRzoV6YEywjt23i2QKvv.png',
        width: 1200,
        height: 630,
        alt: 'Hotel Excella Vizag - Premium Hotel Exterior',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hotel Excella Vizag | Premium Value-Luxury Stay',
    description: 'Comfort near the coast with convenient access to Vizag attractions. Book direct for best rates.',
    images: ['https://hebbkx1anhila5yf.public.blob.vercel-storage.com/exterior-nVoa2Cga1MFRzoV6YEywjt23i2QKvv.png'],
  },
  alternates: { canonical: '/' },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable} ${playfair.variable} bg-background`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": ["Hotel", "LocalBusiness"],
              "name": "Hotel Excella",
              "description": "Premium value-luxury hotel in Vizag offering comfort near the coast and convenient access to Beach Road, Tenneti Park, Kailasagiri and Rushikonda attractions.",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "386 Revenue Employees Co-operative Society Colony, VisalakshiNagar",
                "addressLocality": "Visakhapatnam",
                "addressRegion": "Andhra Pradesh",
                "postalCode": "530043",
                "addressCountry": "IN"
              },
              "telephone": "+91-9985908131",
              "priceRange": "₹₹",
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 17.7609,
                "longitude": 83.3429
              },
              "email": "hotelexcellavizag@gmail.com",
              "url": "https://hotelexcella.in",
              "image": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/exterior-nVoa2Cga1MFRzoV6YEywjt23i2QKvv.png",
              "amenityFeature": [
                { "@type": "LocationFeatureSpecification", "name": "Free WiFi" },
                { "@type": "LocationFeatureSpecification", "name": "Air Conditioning" },
                { "@type": "LocationFeatureSpecification", "name": "24/7 Reception" },
                { "@type": "LocationFeatureSpecification", "name": "Daily Housekeeping" }
              ]
            })
          }}
        />
      </head>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
        {process.env.NODE_ENV === 'production' && <SpeedInsights />}
      </body>
    </html>
  )
}
