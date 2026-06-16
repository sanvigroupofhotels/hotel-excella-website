import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Script from 'next/script'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://hotelexcella.in'),
  title: {
    default: 'Hotel Excella Vizag | Premium Value-Luxury Stay in Visakhapatnam',
    template: '%s',
  },
  description:
    'Comfort near the coast at Hotel Excella, a premium value-luxury hotel in Vizag near Beach Road, Tenneti Park, Kailasagiri and Rushikonda attractions.',
  keywords:
    'Hotel near Beach Road Vizag, Hotel near Kailasagiri, Hotel near Tenneti Park, Hotel near Rushikonda Beach, Family hotel in Visakhapatnam, Couple friendly hotel Vizag, Comfortable stay in Vizag',
  openGraph: {
    title: 'Hotel Excella Vizag | Premium Value-Luxury Stay in Visakhapatnam',
    description:
      'Comfort near the coast at Hotel Excella with convenient access to Vizag attractions including Tenneti Park, Kailasagiri and Rushikonda.',
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
    description:
      'Comfort near the coast with convenient access to Vizag attractions. Book direct for faster support.',
    images: [
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/exterior-nVoa2Cga1MFRzoV6YEywjt23i2QKvv.png',
    ],
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
        <Script id="google-tag-manager" strategy="beforeInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-N7KHV57V');
          `}
        </Script>
      </head>
      <body className="font-sans antialiased">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-D4JVDMJVBH"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-D4JVDMJVBH');
          `}
        </Script>

        {children}

        {process.env.NODE_ENV === 'production' && <Analytics />}
        {process.env.NODE_ENV === 'production' && <SpeedInsights />}
      </body>
    </html>
  )
}
