import Link from "next/link"
import Image from "next/image"
import { MapPin, Phone, Mail, Instagram, Linkedin } from "lucide-react"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Rooms", href: "/rooms" },
  { name: "Guest Portal", href: "/guest" },
  { name: "Check Availability", href: "/prebook" },
  { name: "Gallery", href: "/gallery" },
  { name: "Amenities", href: "/amenities" },
  { name: "Location", href: "/location" },
  { name: "Contact", href: "/contact" },
  { name: "Review Us", href: "/review" },
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
                href="https://www.instagram.com/hotelexcella_vizag"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/sanvigroupofhotels-vizag/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">Quick Links</h3>
            <ul className="mt-4 space-y-3">
              {navigation.map((item) => (
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
                  href="tel:+918859444555"
                  className="flex items-start gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Phone className="h-4 w-4 mt-0.5 shrink-0" />
                  <span>+91 88594 44555</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+919985908131"
                  className="flex items-start gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Phone className="h-4 w-4 mt-0.5 shrink-0" />
                  <span>+91 99859 08131</span>
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
                href="https://maps.app.goo.gl/C4MScoYMJLYnc3Gz6?g_st=ac"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>
                  386 Revenue Employees Co-operative Society Colony,
                  <br />
                  VisalakshiNagar,
                  <br />
                  Visakhapatnam, Andhra Pradesh 530043
                </span>
              </a>
            </div>
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
