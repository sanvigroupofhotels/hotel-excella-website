"use client"

import { type ComponentType, useEffect, useMemo, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { StickyCTA } from "@/components/sticky-cta"
import logoImage from "@/app/orderfood/images/logotransparent.png"
import {
  AlertCircle,
  BedDouble,
  CalendarClock,
  ChevronRight,
  Clock3,
  Instagram,
  Linkedin,
  MapPin,
  Menu,
  Phone,
  ShieldCheck,
  Star,
  UtensilsCrossed,
  Wifi,
  X,
} from "lucide-react"

type PopupType = "payment" | "wifi" | null

type QuickAction = {
  icon: ComponentType<{ className?: string }>
  title: string
  description: string
  href?: string
  external?: boolean
  onClick?: () => void
}

const PAYMENT_NOTICE_KEY = "guest-payment-notice-date"

export default function GuestPortalClient() {
  const [activePopup, setActivePopup] = useState<PopupType>(null)
  const [isGuestMenuOpen, setIsGuestMenuOpen] = useState(false)

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10)
    const lastSeenDate = window.localStorage.getItem(PAYMENT_NOTICE_KEY)

    if (lastSeenDate !== today) {
      setActivePopup("payment")
      window.localStorage.setItem(PAYMENT_NOTICE_KEY, today)
    }
  }, [])

  const quickActions: QuickAction[] = useMemo(
    () => [
      {
        icon: Star,
        title: "Review Us",
        description: "Share your experience and support our team",
        href: "/review",
      },
      {
        icon: Wifi,
        title: "WiFi Access",
        description: "Connect instantly (No password required)",
        onClick: () => setActivePopup("wifi"),
      },
      {
        icon: UtensilsCrossed,
        title: "Food Menu",
        description: "Order food directly to your room",
        href: "/orderfood",
      },
      {
        icon: BedDouble,
        title: "Book / Extend Stay",
        description: "Extend your stay or book again at best direct rates",
        href: "https://hotelexcella.bookmystay.io/",
        external: true,
      },
      {
        icon: Phone,
        title: "Reception Help",
        description: "Dial 9 or call reception anytime",
        href: "tel:+917702483811",
      },
      {
        icon: AlertCircle,
        title: "Report an Issue",
        description: "Facing any issue? We’ll resolve it quickly",
        href: "https://wa.me/919985908131?text=Hi%2C%20I%20am%20a%20guest%20at%20Hotel%20Excella%20and%20I%20would%20like%20to%20report%20an%20issue.",
        external: true,
      },
    ],
    [],
  )

  useEffect(() => {
    if (!isGuestMenuOpen) {
      document.body.style.overflow = ""
      return
    }

    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [isGuestMenuOpen])

  return (
    <div className="min-h-screen bg-[#060606] text-white">
      <div className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-4 py-3 sm:hidden">
        <Link href="/guest" className="-m-1.5 p-1.5">
          <span className="sr-only">Hotel Excella</span>
          <Image src={logoImage} alt="Hotel Excella Logo" width={92} height={42} className="h-9 w-auto" priority />
        </Link>
        <button
          type="button"
          aria-expanded={isGuestMenuOpen}
          aria-controls="guest-mobile-menu"
          aria-label={isGuestMenuOpen ? "Close guest menu" : "Open guest menu"}
          onClick={() => setIsGuestMenuOpen((open) => !open)}
          className="rounded-md border border-[#d4ad5a]/60 bg-black/50 p-2 text-[#d4ad5a] backdrop-blur-sm"
        >
          {isGuestMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div className={`sm:hidden ${isGuestMenuOpen ? "pointer-events-auto" : "pointer-events-none"}`} aria-hidden={!isGuestMenuOpen}>
        <button
          type="button"
          onClick={() => setIsGuestMenuOpen(false)}
          aria-label="Close guest menu overlay"
          className={`fixed inset-0 z-[55] bg-black/65 transition-opacity duration-300 ${isGuestMenuOpen ? "opacity-100" : "opacity-0"}`}
        />
        <aside
          id="guest-mobile-menu"
          className={`fixed inset-y-0 right-0 z-[60] w-[86vw] max-w-xs overflow-y-auto border-l border-[#d4ad5a]/30 bg-[#090909] p-5 transition-transform duration-300 ease-out ${isGuestMenuOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="mb-5 flex items-center justify-between">
            <p className="font-serif text-lg text-[#d7b35f]">Guest Menu</p>
            <button type="button" onClick={() => setIsGuestMenuOpen(false)} className="rounded-md p-2 text-[#d4ad5a]">
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="space-y-2">
            <Link href="/review" className="block rounded-lg border border-white/10 px-3 py-2 text-sm font-medium text-white/90">
              Review Us
            </Link>
            <Link href="/orderfood" className="block rounded-lg border border-white/10 px-3 py-2 text-sm font-medium text-white/90">
              Food Menu
            </Link>
            <Link href="/prebook" className="block rounded-lg border border-white/10 px-3 py-2 text-sm font-medium text-white/90">
              Enquiry
            </Link>
            <a
              href="https://hotelexcella.bookmystay.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-lg border border-[#d4ad5a]/40 px-3 py-2 text-sm font-semibold text-[#d4ad5a]"
            >
              Instant Booking
            </a>
            <button
              type="button"
              onClick={() => {
                setIsGuestMenuOpen(false)
                setActivePopup("payment")
              }}
              className="block w-full rounded-lg border border-white/10 px-3 py-2 text-left text-sm font-medium text-white/90"
            >
              Alert
            </button>
          </nav>
        </aside>
      </div>

      <main className="w-full pb-28">
       <section className="relative flex min-h-[48svh] items-start justify-center overflow-hidden pt-16 sm:min-h-[52svh] sm:pt-4">
  <img
    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/exterior-nVoa2Cga1MFRzoV6YEywjt23i2QKvv.png"
    alt="Hotel Excella exterior"
    className="absolute inset-0 h-full w-full object-cover object-center"
  />
  <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/60 to-black/85" />

  <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col px-5 pb-6 pt-4 text-left sm:px-8 sm:pb-8 sm:pt-5">
    <h1 className="mt-5 font-serif text-[1.9rem] font-semibold leading-[1.08] tracking-[0.01em] text-[#d7b35f] sm:mt-6 sm:text-[2.3rem]">
      Welcome to <span className="whitespace-nowrap">Hotel Excella</span>
    </h1>

    <p className="mt-1 text-[0.9rem] font-medium leading-[1.35] text-white/90 sm:text-[0.98rem]">
      Quick services at your fingertips
    </p>

  </div>
</section>

        <div className="mx-auto -mt-4 w-full max-w-6xl px-4 pb-8 pt-0 sm:-mt-5 sm:px-6 sm:pt-0 lg:px-8">
          <section className="grid grid-cols-3 gap-2.5 sm:gap-3">
            {quickActions.map((action, index) => {
              const Card = (
                <>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#c8a45c]/55 bg-[#101010] text-[#d4ad5a] sm:h-11 sm:w-11">
                    <action.icon className="h-[18px] w-[18px] sm:h-5 sm:w-5" />
                  </div>
                  <h2 className="mt-3 text-[0.82rem] font-semibold leading-tight text-white sm:text-[0.95rem]">{action.title}</h2>
                  <p className="mt-1 text-[0.7rem] leading-snug text-white/73 sm:text-[0.84rem]">{action.description}</p>
                </>
              )

              const classes =
                "group flex min-h-[136px] flex-col justify-center rounded-xl border border-[#c8a45c]/45 bg-gradient-to-b from-[#111111] to-[#0b0b0b] p-3 text-left shadow-[0_20px_34px_-33px_rgba(0,0,0,0.95)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#d7b877] active:scale-[0.97] sm:min-h-[144px] sm:rounded-2xl sm:p-4"

              if (action.onClick) {
                return (
                  <button
                    key={action.title}
                    type="button"
                    onClick={action.onClick}
                    className={classes}
                    style={{ animation: `fadeCard 360ms ease ${index * 70}ms both` }}
                  >
                    {Card}
                  </button>
                )
              }

              return (
                action.external || action.href?.startsWith("tel:") ? (
                  <a
                    key={action.title}
                    href={action.href}
                    target={action.external ? "_blank" : undefined}
                    rel={action.external ? "noopener noreferrer" : undefined}
                    className={classes}
                    style={{ animation: `fadeCard 360ms ease ${index * 70}ms both` }}
                  >
                    {Card}
                  </a>
                ) : (
                  <Link
                    key={action.title}
                    href={action.href ?? "/guest"}
                    className={classes}
                    style={{ animation: `fadeCard 360ms ease ${index * 70}ms both` }}
                  >
                    {Card}
                  </Link>
                )
              )
            })}
          </section>

          <button
            type="button"
            onClick={() => setActivePopup("payment")}
            className="mt-4 flex min-h-[88px] w-full items-center gap-3 rounded-2xl border border-[#c8a45c]/55 bg-gradient-to-r from-[#111111] to-[#0b0b0b] p-4 text-left shadow-[0_18px_35px_-32px_rgba(0,0,0,0.95)] transition-all duration-300 hover:border-[#d7b877] active:scale-[0.99]"
            style={{ animation: "fadeCard 360ms ease 460ms both" }}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#c8a45c]/45 bg-[#101010] text-[#d4ad5a]">
              <ShieldCheck className="h-[21px] w-[21px]" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-[1.1rem] font-semibold">Payment Info</h2>
              <p className="mt-1 text-sm text-white/75">Important payment information</p>
            </div>
            <ChevronRight className="h-6 w-6 text-[#d4ad5a]" />
          </button>
          <p className="mt-3 text-center text-xs text-[#d7bf8a]/85">
            For your safety, please pay only via official hotel channels
          </p>

          <section className="mt-4 grid grid-cols-3 gap-2.5 sm:gap-3">
            <div className="rounded-xl border border-white/10 bg-[#0f0f0f] p-3 text-center">
              <Clock3 className="mx-auto h-4 w-4 text-[#d4ad5a]" />
              <p className="mt-1 text-[11px] text-white/70">Check-in</p>
              <p className="text-sm font-semibold text-white">1:00 PM</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-[#0f0f0f] p-3 text-center">
              <CalendarClock className="mx-auto h-4 w-4 text-[#d4ad5a]" />
              <p className="mt-1 text-[11px] text-white/70">Check-out</p>
              <p className="text-sm font-semibold text-white">11:00 AM</p>
            </div>
            <a
              href="https://maps.app.goo.gl/hmJC1JcheCR2pvaTA?g_st=ac"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-white/10 bg-[#0f0f0f] p-3 text-center transition hover:border-[#c8a45c]/45"
            >
              <MapPin className="mx-auto h-4 w-4 text-[#d4ad5a]" />
              <p className="mt-1 text-[11px] text-white/70">Maps</p>
              <p className="text-xs font-semibold leading-tight text-white">Hotel Excella</p>
            </a>
          </section>

          <section className="mt-4 grid gap-3 md:grid-cols-2">
            <div className="rounded-2xl border border-[#c8a45c]/35 bg-[#0f0f0f] px-4 py-3.5 text-center">
              <p className="text-sm tracking-wide text-[#d7bf8a]">Follow us at</p>
              <div className="mt-3 flex items-center justify-center gap-3">
                <a
                  href="https://www.instagram.com/hotelexcella_vizag"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow Hotel Excella on Instagram"
                  className="rounded-xl border border-[#c8a45c]/60 p-2.5 text-[#d4ad5a] transition hover:border-[#d7b877] hover:bg-[#131313]"
                >
                  <Instagram className="h-[18px] w-[18px]" />
                </a>
                <a
                  href="https://www.linkedin.com/company/sanvigroupofhotels-vizag/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow Hotel Excella on LinkedIn"
                  className="rounded-xl border border-[#c8a45c]/60 p-2.5 text-[#d4ad5a] transition hover:border-[#d7b877] hover:bg-[#131313]"
                >
                  <Linkedin className="h-[18px] w-[18px]" />
                </a>
              </div>
            </div>

            <div className="text-left">
              <Link href="/guest" className="inline-flex items-center justify-start">
                <Image src={logoImage} alt="Hotel Excella Logo" width={88} height={40} className="h-8 w-auto" />
              </Link>
              <p className="mt-3 text-sm text-white/75">Thank you for choosing us for your stay.</p>

              <div className="mt-5">
                <p className="text-xs uppercase tracking-[0.16em] text-[#d7bf8a]">Quick Links</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-white/80 marker:text-[#d7bf8a]">
                  <li>
                    <Link href="/review" className="hover:text-[#d7b35f]">Review Us</Link>
                  </li>
                  <li>
                    <Link href="/orderfood" className="hover:text-[#d7b35f]">Food Menu</Link>
                  </li>
                  <li>
                    <a href="https://hotelexcella.bookmystay.io/" target="_blank" rel="noopener noreferrer" className="hover:text-[#d7b35f]">
                      Instant Booking
                    </a>
                  </li>
                </ul>
              </div>

              <p className="mt-5 text-center text-[11px] text-white/55">2022 Hotel Excella - All rights reserved.</p>
            </div>
          </section>
        </div>
      </main>

      <StickyCTA guestMode onAlertClick={() => setActivePopup("payment")} />

      {activePopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/72 p-4 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="w-full max-w-md rounded-3xl border border-[#d0ab63]/75 bg-[#f8f6f1] p-5 text-[#1d1a16] shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-serif text-[1.65rem] font-semibold text-[#1f1b16]">
                {activePopup === "payment" ? "🚨 Payment Notice" : "WiFi Access"}
              </h3>
              <button
                type="button"
                aria-label="Close popup"
                onClick={() => setActivePopup(null)}
                className="rounded-full border border-black/15 p-1.5 text-black/65 transition hover:text-black"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {activePopup === "payment" ? (
              <div className="space-y-4 text-sm text-[#34302a]">
                <div className="rounded-2xl border-2 border-[#c9a14f] bg-[#fff6df] p-4">
                  <p className="font-semibold text-[#3a2b10]">
                    Payments made to unauthorized personal staff accounts may not be considered valid.
                  </p>
                </div>
                <p>If you were asked or forced to make payment to any personal number, please contact management immediately.</p>
                <div className="rounded-2xl border border-[#d0ab63]/45 bg-white p-4">
                  <p className="mb-2 text-xs uppercase tracking-wide text-[#ad8130]">Authorized Payments</p>
                  <ul className="space-y-1.5">
                    <li>• Sanvi Group of Hotels QR</li>
                    <li>• Shobhan Kumar</li>
                    <li>• Nageswararao K</li>
                  </ul>
                </div>
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => setActivePopup(null)}
                    className="rounded-xl border border-black/15 px-4 py-3 text-sm font-semibold text-[#2b261f] transition hover:bg-black/[0.04]"
                  >
                    Understood
                  </button>
                  <a
                    href="tel:+919985908131"
                    className="rounded-xl bg-[#c8a45c] px-4 py-3 text-center text-sm font-semibold text-black transition hover:bg-[#d7b877]"
                  >
                    Contact Management
                  </a>
                </div>
              </div>
            ) : (
              <div className="space-y-4 text-sm text-[#34302a]">
                <div className="rounded-2xl border border-[#d0ab63]/45 bg-white p-4">
                  <p className="text-xs uppercase tracking-wide text-[#ad8130]">Network Name</p>
                  <p className="mt-1 font-semibold text-[#1f1b16]">Hotel Excella</p>
                </div>
                <div className="rounded-2xl border border-[#d0ab63]/45 bg-white p-4">
                  <p className="text-xs uppercase tracking-wide text-[#ad8130]">Password</p>
                  <p className="mt-1 font-semibold text-[#1f1b16]">Not Required</p>
                </div>
                <p>Please contact reception if you face any issue while connecting.</p>
                <button
                  type="button"
                  onClick={() => setActivePopup(null)}
                  className="w-full rounded-xl bg-[#c8a45c] px-4 py-3 text-sm font-semibold text-black transition hover:bg-[#d7b877]"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeCard {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
