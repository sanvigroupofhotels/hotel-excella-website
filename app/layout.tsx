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
  title: 'Hotel Excella Vizag | Premium Smart Stay in Visakhapatnam',
  description: 'Experience premium comfort at Hotel Excella, located in the heart of Vizag. Clean rooms, family-friendly, 24/7 reception. Book direct for best rates.',
  keywords: 'Hotel in Visalakshinagar, Best hotel in Vizag, Hotel near Kailasagiri, Hotel near Tenneti Park, Family stay Vizag, Couple friendly hotel Vizag, Premium hotel Visakhapatnam',
  openGraph: {
    title: 'Hotel Excella Vizag | Premium Smart Stay in Visakhapatnam',
    description: 'Experience premium comfort at Hotel Excella, located in the heart of Vizag. Clean rooms, family-friendly, 24/7 reception.',
    url: 'https://hotelexcella.com',
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
    title: 'Hotel Excella Vizag | Premium Smart Stay',
    description: 'Premium comfort in the heart of Vizag. Book direct for best rates.',
    images: ['https://hebbkx1anhila5yf.public.blob.vercel-storage.com/exterior-nVoa2Cga1MFRzoV6YEywjt23i2QKvv.png'],
  },
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
              "@type": "Hotel",
              "name": "Hotel Excella",
              "description": "Premium Smart Stay in Vizag - Clean rooms, family-friendly atmosphere, and excellent service.",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "386 Revenue Employees Co-operative Society Colony, VisalakshiNagar",
                "addressLocality": "Visakhapatnam",
                "addressRegion": "Andhra Pradesh",
                "postalCode": "530043",
                "addressCountry": "IN"
              },
              "telephone": "+91-9985908131",
              "email": "hotelexcellavizag@gmail.com",
              "url": "https://hotelexcella.com",
              "image": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/exterior-nVoa2Cga1MFRzoV6YEywjt23i2QKvv.png",
              "priceRange": "$$",
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
