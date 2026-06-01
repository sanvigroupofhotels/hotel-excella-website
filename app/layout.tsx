import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'
import { hotelSchema, organizationSchema } from '@/lib/seo/schema'

export const metadata: Metadata = {
  metadataBase: new URL('https://hotelexcella.in'),
  title: {
    default: 'Hotel Excella, Visakhapatnam | Comfortable Stay Near Beach Road',
    template: '%s',
  },
  description: 'Comfort near the coast at Hotel Excella, a premium value-luxury hotel in Vizag near Beach Road, Tenneti Park, Kailasagiri and Rushikonda attractions.',
  keywords: 'Hotel near Beach Road Vizag, Hotel near Kailasagiri, Hotel near Tenneti Park, Hotel near Rushikonda Beach, Family hotel in Visakhapatnam, Couple friendly hotel Vizag, Comfortable stay in Vizag',
  openGraph: {
    title: 'Hotel Excella, Visakhapatnam | Comfortable Stay Near Beach Road',
    description: 'Comfort near the coast at Hotel Excella with convenient access to Vizag attractions including Tenneti Park, Kailasagiri and Rushikonda.',
    url: 'https://hotelexcella.in',
    siteName: 'Hotel Excella',
    images: [
      {
        url: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/exterior-nVoa2Cga1MFRzoV6YEywjt23i2QKvv.png',
        width: 1200,
        height: 630,
        alt: 'Hotel Excella, Visakhapatnam - Premium Hotel Exterior',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hotel Excella, Visakhapatnam | Premium Value-Luxury Stay',
    description: 'Comfort near the coast with convenient access to Vizag attractions. WhatsApp Hotel Excella for direct enquiries.',
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
    <html lang="en" className="bg-background">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationSchema(), hotelSchema()]),
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
