"use client"

import Link from "next/link"
import { AlertCircle, MessageCircle, Calendar, ClipboardCheck, Phone, Star, UtensilsCrossed } from "lucide-react"

type StickyCTAProps = {
  guestMode?: boolean
  onAlertClick?: () => void
}

export function StickyCTA({ guestMode = false, onAlertClick }: StickyCTAProps) {
  return (
    <>
      {/* Mobile Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden border-t border-[#d1a24d]/45 bg-black/95 backdrop-blur-md">
        <div className={`grid ${guestMode ? "grid-cols-3" : "grid-cols-4"} divide-x divide-[#d1a24d]/35`}>
          <a
            href={guestMode ? "/review" : "https://hotelexcella.bookmystay.io/"}
            target={guestMode ? undefined : "_blank"}
            rel={guestMode ? undefined : "noopener noreferrer"}
            className="flex flex-col items-center justify-center py-3 text-[#d8af5a] transition-colors hover:bg-[#141414]"
          >
            {guestMode ? <Star className="h-5 w-5" /> : <Calendar className="h-5 w-5" />}
            <span className="mt-1 text-xs font-medium">{guestMode ? "Review" : "Availability"}</span>
          </a>
          {guestMode ? (
            <Link
              href="/orderfood"
              className="flex flex-col items-center justify-center py-3 text-white transition-colors hover:bg-[#141414]"
            >
              <UtensilsCrossed className="h-5 w-5" />
              <span className="mt-1 text-xs font-medium">Order Food</span>
            </Link>
          ) : (
            <Link
              href="/prebook"
              className="flex flex-col items-center justify-center py-3 text-white transition-colors hover:bg-[#141414]"
            >
              <ClipboardCheck className="h-5 w-5" />
              <span className="mt-1 text-xs font-medium">Enquiry</span>
            </Link>
          )}
          {guestMode ? (
            <button
              type="button"
              onClick={onAlertClick}
              className="flex flex-col items-center justify-center py-3 text-white transition-colors hover:bg-[#141414]"
            >
              <AlertCircle className="h-5 w-5" />
              <span className="mt-1 text-xs font-medium">Alert</span>
            </button>
          ) : (
            <a
              href="tel:+919985908131"
              className="flex flex-col items-center justify-center py-3 text-white transition-colors hover:bg-[#141414]"
            >
              <Phone className="h-5 w-5" />
              <span className="mt-1 text-xs font-medium">Call</span>
            </a>
          )}
          {!guestMode && (
            <a
              href="https://wa.me/919985908131?text=Hello%20Hotel%20Excella%2C%20I%20would%20like%20to%20check%20room%20availability%20and%20pricing."
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center py-3 text-white transition-colors hover:bg-[#141414]"
            >
              <MessageCircle className="h-5 w-5" />
              <span className="mt-1 text-xs font-medium">WhatsApp</span>
            </a>
          )}
        </div>
      </div>

      {/* Desktop Floating WhatsApp Button */}
      {!guestMode && (
        <a
          href="https://wa.me/919985908131?text=Hello%20Hotel%20Excella%2C%20I%20would%20like%20to%20check%20room%20availability%20and%20pricing."
          target="_blank"
          rel="noopener noreferrer"
          className="hidden lg:flex fixed bottom-6 right-6 z-40 items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="h-5 w-5" />
          <span className="font-medium">Chat with us</span>
        </a>
      )}
    </>
  )
}
