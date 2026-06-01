"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"
import logoImage from "@/app/orderfood/images/logotransparent.png"
import { site } from "@/lib/seo/constants"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Rooms", href: "/rooms" },
  { name: "About", href: "/about-hotel-excella" },
  { name: "Why Book Direct", href: "/why-book-direct" },
  { name: "Attractions", href: "/places-to-visit-near-hotel-excella" },
  { name: "Blog", href: "/blog" },
  { name: "Reviews", href: "/guest-reviews" },
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
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5" onClick={() => setMobileMenuOpen(false)}>
              <span className="sr-only">Hotel Excella, Visakhapatnam</span>
              <Image src={logoImage} alt="Hotel Excella, Visakhapatnam logo" width={120} height={60} className="h-12 w-auto" priority />
            </Link>
          </div>

          <button
            type="button"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-main-menu"
            aria-label={mobileMenuOpen ? "Close main menu" : "Open main menu"}
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-foreground lg:hidden"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
          </button>

          <div className="hidden lg:flex lg:gap-x-6">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href} className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-3">
            <a href={site.phonePrimaryHref} className="rounded-lg border border-primary px-4 py-2 text-sm font-semibold text-primary">
              Call
            </a>
            <a href={site.whatsappUrl} target="_blank" rel="noopener noreferrer" className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm">
              WhatsApp
            </a>
          </div>
        </nav>
      </header>

      <div className={`lg:hidden ${mobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"}`} aria-hidden={!mobileMenuOpen}>
        <button
          type="button"
          aria-label="Close menu overlay"
          onClick={() => setMobileMenuOpen(false)}
          className={`fixed inset-0 z-[60] bg-black/35 transition-opacity duration-300 ${mobileMenuOpen ? "opacity-100" : "opacity-0"}`}
        />
        <div
          id="mobile-main-menu"
          className={`fixed inset-y-0 right-0 z-[70] w-full max-w-sm overflow-y-auto bg-background px-6 py-6 shadow-xl ring-1 ring-border transition-transform duration-300 ease-out ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5" onClick={() => setMobileMenuOpen(false)}>
              <Image src={logoImage} alt="Hotel Excella, Visakhapatnam logo" width={120} height={60} className="h-12 w-auto" />
            </Link>
            <button type="button" onClick={() => setMobileMenuOpen(false)} className="-m-2.5 rounded-md p-2.5 text-foreground" aria-label="Close menu">
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-8 space-y-2">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href} onClick={() => setMobileMenuOpen(false)} className="block rounded-lg px-3 py-3 text-base font-semibold text-foreground hover:bg-card">
                {item.name}
              </Link>
            ))}
          </div>
          <div className="mt-8 grid gap-3">
            <a href={site.phonePrimaryHref} className="rounded-lg border border-primary px-4 py-3 text-center font-semibold text-primary">Call {site.phonePrimary}</a>
            <a href={site.whatsappUrl} target="_blank" rel="noopener noreferrer" className="rounded-lg bg-primary px-4 py-3 text-center font-semibold text-primary-foreground">WhatsApp Enquiry</a>
          </div>
        </div>
      </div>
    </>
  )
}
