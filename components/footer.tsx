import Link from "next/link"
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react"
import { bookingUrl, phoneDisplay, phonePrimary, whatsappUrl } from "@/lib/seo/site"

const quickLinks = [
  { name: "Rooms", href: "/rooms" },
  { name: "Oak Room", href: "/rooms/oak-room" },
  { name: "Mapple Room", href: "/rooms/mapple-room" },
  { name: "Attractions", href: "/attractions" },
  { name: "Restaurants", href: "/restaurants" },
  { name: "Guest Portal", href: "/guest" },
  { name: "FAQ", href: "/faq" },
  { name: "Contact", href: "/contact" },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-card pb-24 lg:pb-0">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_1fr]">
          <div>
            <p className="font-serif text-3xl font-bold text-foreground">Hotel Excella</p>
            <p className="mt-2 text-primary">Comfort Near the Coast</p>
            <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">A premium value-luxury hotel near Beach Road, Tenneti Park, Kailasagiri and Rushikonda Beach in Visakhapatnam. Book direct for quicker support and fewer OTA delays.</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="rounded-lg bg-primary px-5 py-3 text-center text-sm font-bold text-primary-foreground">Book Now</a>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-lg border border-primary/60 px-5 py-3 text-sm font-bold text-primary"><MessageCircle className="h-4 w-4" /> WhatsApp Us</a>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-primary">Explore</h2>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {quickLinks.map((link) => (
                <Link key={link.href} href={link.href} className="text-sm text-muted-foreground transition hover:text-primary">{link.name}</Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-primary">Contact</h2>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li><a href={`tel:${phonePrimary}`} className="flex gap-3 transition hover:text-foreground"><Phone className="h-4 w-4 text-primary" /> {phoneDisplay}</a></li>
              <li><a href="mailto:hotelexcellavizag@gmail.com" className="flex gap-3 transition hover:text-foreground"><Mail className="h-4 w-4 text-primary" /> hotelexcellavizag@gmail.com</a></li>
              <li><a href="https://maps.app.goo.gl/C4MScoYMJLYnc3Gz6?g_st=ac" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 transition hover:text-foreground"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />386 Revenue Employees Co-operative Society Colony, Visalakshi Nagar, Visakhapatnam, Andhra Pradesh 530043</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-border pt-6 text-center text-xs text-muted-foreground">© 2026 Hotel Excella. All rights reserved.</div>
      </div>
    </footer>
  )
}
