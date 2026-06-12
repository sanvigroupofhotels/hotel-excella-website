import Link from "next/link"
import Image from "next/image"
import { MapPin, Phone, Mail, Instagram, Linkedin, Facebook } from "lucide-react"
import { site } from "@/lib/seo/constants"


const locationHubLinks = [
  { name: "Hotel in Visalakshinagar Vizag", href: "/hotel-in-visalakshinagar-vizag" },
  { name: "Hotel near Beach Road Vizag", href: "/hotel-near-beach-road-vizag" },
  { name: "Hotel near Jodugullapalem Beach", href: "/hotel-near-jodugullapalem-beach" },
  { name: "Hotel near Health City Vizag", href: "/hotel-near-health-city-vizag" },
  { name: "Hotel near MVP Colony", href: "/hotel-near-mvp-colony" },
  { name: "Hotel near GITAM University", href: "/hotel-near-gitam-university" },
]

const attractionHubLinks = [
  { name: "Attractions Hub", href: "/attractions" },
  { name: "Places to Visit near Hotel Excella", href: "/places-to-visit-near-hotel-excella" },
  { name: "Tenneti Park", href: "/hotel-near-tenneti-park-vizag" },
  { name: "Kailasagiri", href: "/hotel-near-kailasagiri" },
  { name: "Rushikonda Beach", href: "/hotel-near-rushikonda-beach" },
  { name: "TTD Temple Rushikonda", href: "/hotel-near-ttd-temple-rushikonda" },
  { name: "YSR View Point", href: "/stay-near-ysr-view-point" },
  { name: "Zoo Park Vizag", href: "/hotel-near-zoo-park-vizag" },
]

const roomHubLinks = [
  { name: "Rooms", href: "/rooms" },
  { name: "Oak Room", href: "/rooms/oak-room" },
  { name: "Mapple Room", href: "/rooms/mapple-room" },
]

const hotelGuideLinks = [
  { name: "About Hotel Excella", href: "/about-hotel-excella" },
  { name: "Why Book Direct", href: "/why-book-direct" },
  { name: "Dining Options", href: "/dining-options-near-hotel-excella" },
  { name: "Amenities", href: "/amenities" },
  { name: "Gallery", href: "/gallery" },
  { name: "Location", href: "/location" },
]

const mainNavigation = [
  { name: "Home", href: "/" },
  { name: "Rooms", href: "/rooms" },
  { name: "Gallery", href: "/gallery" },
  { name: "Amenities", href: "/amenities" },
  { name: "Location", href: "/location" },
  { name: "Attractions", href: "/attractions" },
  { name: "Contact", href: "/contact" },
  { name: "Review Us", href: "/review" },
  { name: "Guest Portal", href: "/guest" },
]

const moreNavigation = [
  { name: "About Hotel Excella", href: "/about-hotel-excella" },
  { name: "Why Book Direct", href: "/why-book-direct" },
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Terms & Conditions", href: "/terms-conditions" },
]

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-qq8Cvn8rVABsuUvFcXt0Nc1n64vZlL.png"
                alt="Hotel Excella Logo"
                width={140}
                height={70}
                className="h-16 w-auto"
              />
            </Link>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Premium Smart Stay in the heart of Vizag. Experience comfort, cleanliness, and convenience.
            </p>
            <div className="mt-6 flex gap-4">
              <a
                href={site.sameAs[0]}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={site.sameAs[1]}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href={site.sameAs[2]}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">Quick Links</h3>
            <ul className="mt-4 space-y-3">
              {mainNavigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              {moreNavigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">Contact Us</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href="tel:+919985908131"
                  className="flex items-start gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Phone className="h-4 w-4 mt-0.5 shrink-0" />
                  <span>{site.phonePrimary}</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:hotelexcellavizag@gmail.com"
                  className="flex items-start gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Mail className="h-4 w-4 mt-0.5 shrink-0" />
                  <span>hotelexcellavizag@gmail.com</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Address */}
          <div>
            <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">Address</h3>
            <div className="mt-4">
              <a
                href={site.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>
                  386 Revenue Employs Co-operative Society Colony,
                  <br />
                  Vishalakshi Nagar,
                  <br />
                  Visakhapatnam, Andhra Pradesh 530043
                </span>
              </a>
            </div>
          </div>
        </div>


        <div className="mt-12 rounded-3xl border border-border bg-background/50 p-6 md:p-8">
          <h3 className="font-serif text-2xl font-bold text-foreground">Explore More About Hotel Excella</h3>
          <div className="mt-6 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <FooterHub title="Location Pages" links={locationHubLinks} />
            <FooterHub title="Attraction Pages" links={attractionHubLinks} />
            <FooterHub title="Room Pages" links={roomHubLinks} />
            <FooterHub title="Hotel Guides" links={hotelGuideLinks} />
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <p className="text-center text-xs text-muted-foreground">
            2022 Hotel Excella - All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}


function FooterHub({ title, links }: { title: string; links: { name: string; href: string }[] }) {
  return (
    <div>
      <h4 className="text-sm font-semibold uppercase tracking-wider text-primary">{title}</h4>
      <ul className="mt-4 space-y-2">
        {links.map((link) => (
          <li key={`${title}-${link.href}`}>
            <Link href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
