import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Linkedin, Mail, MapPin, MessageCircle, Phone } from "lucide-react"
import { site } from "@/lib/seo/constants"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Rooms", href: "/rooms" },
  { name: "Oak Room", href: "/rooms/oak-room" },
  { name: "Mapple Room", href: "/rooms/mapple-room" },
  { name: "About Hotel Excella", href: "/about-hotel-excella" },
  { name: "Why Book Direct", href: "/why-book-direct" },
  { name: "Guest Reviews", href: "/guest-reviews" },
  { name: "Attractions", href: "/places-to-visit-near-hotel-excella" },
  { name: "Restaurants Nearby", href: "/restaurants-near-hotel-excella" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          <div>
            <Link href="/">
              <Image src={site.logo} alt="Hotel Excella, Visakhapatnam logo" width={140} height={70} className="h-16 w-auto" />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Hotel Excella, Visakhapatnam is an independent hotel in Vishalakshi Nagar, about 200 meters walking distance to Beach Road, offering comfortable stays for families, tourists and business travelers.
            </p>
            <div className="mt-6 flex gap-4">
              <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-muted-foreground hover:text-primary"><Instagram className="h-5 w-5" /></a>
              <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary"><Linkedin className="h-5 w-5" /></a>
              <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-muted-foreground hover:text-primary"><Facebook className="h-5 w-5" /></a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-primary">Quick Links</h3>
            <ul className="mt-4 grid grid-cols-1 gap-3">
              {navigation.map((item) => (
                <li key={item.name}><Link href={item.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">{item.name}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-primary">Contact Us</h3>
            <ul className="mt-4 space-y-3">
              <li><a href={site.phonePrimaryHref} className="flex items-start gap-3 text-sm text-muted-foreground hover:text-foreground"><Phone className="mt-0.5 h-4 w-4 shrink-0" /><span>{site.phonePrimary}</span></a></li>
              <li><a href={site.whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 text-sm text-muted-foreground hover:text-foreground"><MessageCircle className="mt-0.5 h-4 w-4 shrink-0" /><span>WhatsApp {site.whatsappNumber}</span></a></li>
              <li><a href={`mailto:${site.email}`} className="flex items-start gap-3 text-sm text-muted-foreground hover:text-foreground"><Mail className="mt-0.5 h-4 w-4 shrink-0" /><span>{site.email}</span></a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-primary">Address</h3>
            <a href="https://maps.app.goo.gl/C4MScoYMJLYnc3Gz6?g_st=ac" target="_blank" rel="noopener noreferrer" className="mt-4 flex items-start gap-3 text-sm text-muted-foreground hover:text-foreground">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{site.address.formatted}</span>
            </a>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <p className="text-center text-xs text-muted-foreground">© 2026 Hotel Excella, Visakhapatnam. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
