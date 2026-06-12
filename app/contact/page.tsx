import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { StickyCTA } from "@/components/sticky-cta"
import { 
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Instagram,
  Linkedin,
  Facebook,
  Clock,
  ArrowRight,
  ExternalLink
} from "lucide-react"
import { JsonLd } from "@/components/seo/json-ld"
import { site } from "@/lib/seo/constants"

export const metadata: Metadata = {
  title: "Contact Hotel Excella Vizag | Phone, WhatsApp & Email Support",
  description: "Contact Hotel Excella Vizag for bookings and inquiries. Call +91 9985908131, WhatsApp, or email. 24/7 guest support available for reservations and assistance.",
  keywords: "hotel contact Vizag, Hotel Excella phone, hotel reservation, book hotel, WhatsApp hotel, hotel customer service",
  alternates: { canonical: `${site.url}/contact` },
  openGraph: {
    title: "Contact Hotel Excella Vizag",
    description: "Get in touch with our team via phone, WhatsApp, email or visit us. 24/7 support for bookings and inquiries.",
    url: `${site.url}/contact`,
    siteName: site.name,
    images: [
      {
        url: site.image,
        width: 1200,
        height: 630,
        alt: "Hotel Excella Vizag Contact",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us - Hotel Excella Vizag",
    description: "Reach out to Hotel Excella via phone, WhatsApp or email for bookings and support.",
    images: [site.image],
  },
}

const contactMethods = [
  {
    icon: Phone,
    title: "Phone",
    description: "Call us directly for immediate assistance",
    details: [
      { label: "+91 9985908131", href: "tel:+919985908131" },
    ],
    primary: true,
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    description: "Chat with us for quick responses",
    details: [
      { label: "Send a Message", href: "https://wa.me/919985908131?text=Hello%20Hotel%20Excella%2C%20I%20would%20like%20to%20enquire%20about%20room%20availability." },
    ],
    primary: true,
    isExternal: true,
  },
  {
    icon: Mail,
    title: "Email",
    description: "Send us your queries anytime",
    details: [
      { label: "hotelexcellavizag@gmail.com", href: "mailto:hotelexcellavizag@gmail.com" },
    ],
    primary: false,
  },
  {
    icon: MapPin,
    title: "Visit Us",
    description: "Come see our hotel in person",
    details: [
      { label: "Open in Maps", href: "https://maps.app.goo.gl/hmJC1JcheCR2pvaTA?g_st=ac" },
    ],
    primary: false,
    isExternal: true,
  },
]

const socialLinks = [
  {
    icon: Instagram,
    name: "Instagram",
    href: "https://www.instagram.com/hotelexcella_vizag",
    handle: "@hotelexcella_vizag",
  },
  {
    icon: Linkedin,
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/sanvigroupofhotels-vizag/",
    handle: "Sanvi Group of Hotels",
  },
  {
    icon: Facebook,
    name: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61565499310023",
    handle: "Hotel Excella",
  },
]

export default function ContactPage() {
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Hotel Excella",
    url: site.url,
    telephone: site.phonePrimary,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: "IN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      telephone: site.phonePrimary,
      availableLanguage: ["en", "hi"],
    },
  }

  return (
    <div className="min-h-screen bg-background">
      <JsonLd data={[contactSchema]} />
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-card border-b border-border py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 text-center">
            <h1 className="font-serif text-4xl font-bold text-foreground lg:text-5xl">
              Contact <span className="text-primary">Us</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              We&apos;re here to help with your booking, queries, or any assistance you need. Reach out through any of the channels below.
            </p>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactMethods.map((method) => (
                <div
                  key={method.title}
                  className={`p-6 rounded-2xl border transition-all duration-300 ${
                    method.primary 
                      ? "bg-primary/5 border-primary/30 hover:border-primary" 
                      : "bg-card border-border hover:border-primary/50"
                  }`}
                >
                  <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${
                    method.primary ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
                  }`}>
                    <method.icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-foreground">
                    {method.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {method.description}
                  </p>
                  <div className="mt-4 space-y-2">
                    {method.details.map((detail) => (
                      <a
                        key={detail.label}
                        href={detail.href}
                        target={method.isExternal ? "_blank" : undefined}
                        rel={method.isExternal ? "noopener noreferrer" : undefined}
                        className="flex items-center gap-2 text-foreground hover:text-primary transition-colors font-medium"
                      >
                        {detail.label}
                        {method.isExternal && <ExternalLink className="h-3 w-3" />}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Address & Social */}
        <section className="py-16 lg:py-24 bg-card border-y border-border">
          <div className="mx-auto max-w-7xl px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Full Address */}
              <div className="p-8 rounded-2xl bg-background border border-border">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-semibold text-foreground">Our Address</h2>
                </div>
                <address className="mt-6 text-lg text-muted-foreground not-italic leading-relaxed">
                  <span className="font-semibold text-foreground">Hotel Excella</span>
                  <br />
                  386 Revenue Employs Co-operative Society Colony,
                  <br />
                  Vishalakshi Nagar,
                  <br />
                  Visakhapatnam, Andhra Pradesh 530043
                </address>
                <div className="mt-6 flex items-center gap-3 text-muted-foreground">
                  <Clock className="h-5 w-5 text-primary" />
                  <span>24/7 Reception Available</span>
                </div>
                <a
                  href="https://maps.app.goo.gl/hmJC1JcheCR2pvaTA?g_st=ac"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-base font-semibold text-primary-foreground hover:bg-primary/90 transition-all duration-300"
                >
                  Get Directions
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>

              {/* Social Media */}
              <div className="p-8 rounded-2xl bg-background border border-border">
                <h2 className="text-2xl font-semibold text-foreground">Follow Us</h2>
                <p className="mt-2 text-muted-foreground">
                  Stay connected and see what&apos;s happening at Hotel Excella.
                </p>
                <div className="mt-8 space-y-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 group"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                        <social.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">{social.name}</div>
                        <div className="text-sm text-muted-foreground">{social.handle}</div>
                      </div>
                      <ExternalLink className="h-4 w-4 ml-auto text-muted-foreground group-hover:text-primary transition-colors" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <h2 className="font-serif text-3xl font-bold text-foreground lg:text-4xl text-balance">
              Ready to <span className="text-primary">Book Your Stay</span>?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground text-pretty">
              Message or book directly with us for faster support and clear stay assistance.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://hotelexcella.bookmystay.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground shadow-lg hover:bg-primary/90 transition-all duration-300 hover:scale-105"
              >
                Book Now
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <StickyCTA />
      
      <div className="h-16 lg:hidden" />
    </div>
  )
}
