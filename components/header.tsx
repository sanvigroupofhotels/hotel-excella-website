"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Menu, X, ChevronDown } from "lucide-react"
import logoImage from "@/app/orderfood/images/logotransparent.png"

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

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    if (!mobileMenuOpen) {
      document.body.style.overflow = ""
      return
    }

    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileMenuOpen])

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/95 backdrop-blur-md">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5" onClick={() => setMobileMenuOpen(false)}>
            <span className="sr-only">Hotel Excella</span>
            <Image src={logoImage} alt="Hotel Excella Logo" width={120} height={60} className="h-12 w-auto" priority />
          </Link>
        </div>

        <div className="flex lg:hidden">
          <button
            type="button"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-main-menu"
            aria-label={mobileMenuOpen ? "Close main menu" : "Open main menu"}
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-foreground"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
          </button>
        </div>

        <div className="hidden lg:flex lg:gap-x-5">
          {mainNavigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-primary"
            >
              {item.name}
            </Link>
          ))}

          {/* More Dropdown */}
          <div className="group relative">
            <button className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-primary">
              More
              <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
            </button>
            <div className="absolute right-0 top-full hidden pt-2 group-hover:block z-50">
              <div className="rounded-lg bg-background border border-border shadow-lg overflow-hidden min-w-max">
                {moreNavigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block px-4 py-2.5 text-sm text-muted-foreground hover:text-primary hover:bg-secondary transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
          <a
            href="https://hotelexcella.bookmystay.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition-all duration-200 hover:bg-primary/90"
          >
            Instant Booking
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
                <span className="sr-only">Hotel Excella</span>
                <Image src={logoImage} alt="Hotel Excella Logo" width={100} height={50} className="h-10 w-auto" />
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-foreground"
              >
                <span className="sr-only">Close menu</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-border">
                <div className="space-y-2 py-6">
                  {mainNavigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-medium text-foreground transition-colors hover:bg-secondary"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>

                {/* More Section on Mobile */}
                <div className="space-y-2 py-6">
                  <p className="text-sm font-semibold text-primary uppercase tracking-wider px-3">More</p>
                  {moreNavigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>

                <div className="space-y-4 py-6">
                  <Link
                    href="/prebook"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full rounded-lg border border-primary px-4 py-3 text-center text-base font-semibold text-primary"
                  >
                    Enquiry
                  </Link>
                  <a
                    href="https://hotelexcella.bookmystay.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full rounded-lg bg-primary px-4 py-3 text-center text-base font-semibold text-primary-foreground shadow-sm"
                  >
                    Instant Booking
                  </a>
                </div>
              </div>
            </div>
        </div>
      </div>
    </>
  )
}
