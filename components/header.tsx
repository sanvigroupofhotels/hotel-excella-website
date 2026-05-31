"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Menu, MessageCircle, X } from "lucide-react"
import logoImage from "@/app/orderfood/images/logotransparent.png"
import { bookingUrl, whatsappUrl } from "@/lib/seo/site"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Rooms", href: "/rooms" },
  { name: "Attractions", href: "/attractions" },
  { name: "Restaurants", href: "/restaurants" },
  { name: "Gallery", href: "/gallery" },
  { name: "FAQ", href: "/faq" },
  { name: "Contact", href: "/contact" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileMenuOpen])

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5" onClick={() => setMobileMenuOpen(false)}>
              <span className="sr-only">Hotel Excella</span>
              <Image src={logoImage} alt="Hotel Excella Logo" width={120} height={60} className="h-12 w-auto" priority />
            </Link>
          </div>

          <div className="hidden lg:flex lg:gap-x-6">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href} className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-3">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-primary/60 px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary/10">
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
            <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90">
              Book Now
            </a>
          </div>

          <div className="flex lg:hidden">
            <button type="button" aria-expanded={mobileMenuOpen} aria-controls="mobile-main-menu" aria-label={mobileMenuOpen ? "Close main menu" : "Open main menu"} onClick={() => setMobileMenuOpen((open) => !open)} className="-m-2.5 rounded-md p-2.5 text-foreground">
              {mobileMenuOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
            </button>
          </div>
        </nav>
      </header>

      <div className={`lg:hidden ${mobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"}`} aria-hidden={!mobileMenuOpen}>
        <button type="button" aria-label="Close menu overlay" onClick={() => setMobileMenuOpen(false)} className={`fixed inset-0 z-[60] bg-black/35 transition-opacity duration-300 ${mobileMenuOpen ? "opacity-100" : "opacity-0"}`} />
        <div id="mobile-main-menu" className={`fixed inset-y-0 right-0 z-[70] w-full max-w-sm overflow-y-auto bg-background px-6 py-6 shadow-xl ring-1 ring-border transition-transform duration-300 ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5" onClick={() => setMobileMenuOpen(false)}>
              <Image src={logoImage} alt="Hotel Excella Logo" width={100} height={50} className="h-10 w-auto" />
            </Link>
            <button type="button" onClick={() => setMobileMenuOpen(false)} className="-m-2.5 rounded-md p-2.5 text-foreground"><span className="sr-only">Close menu</span><X className="h-6 w-6" /></button>
          </div>
          <div className="mt-6 divide-y divide-border">
            <div className="space-y-2 py-6">
              {[...navigation, { name: "Guest Portal", href: "/guest" }, { name: "Review Us", href: "/review" }].map((item) => (
                <Link key={item.name} href={item.href} onClick={() => setMobileMenuOpen(false)} className="-mx-3 block rounded-lg px-3 py-2 text-base font-medium text-foreground transition hover:bg-secondary">
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="space-y-4 py-6">
              <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="block w-full rounded-lg bg-primary px-4 py-3 text-center text-base font-semibold text-primary-foreground">Book Now</a>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="block w-full rounded-lg border border-primary px-4 py-3 text-center text-base font-semibold text-primary">WhatsApp Us</a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
