import Link from "next/link"
import { Calendar, MessageCircle, Phone } from "lucide-react"
import { bookingUrl, phonePrimary, whatsappUrl } from "@/lib/seo/site"

export function CtaRow({ center = false }: { center?: boolean }) {
  return (
    <div className={`flex flex-col gap-3 sm:flex-row ${center ? "justify-center" : ""}`}>
      <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition hover:bg-primary/90">
        <Calendar className="h-4 w-4" /> Book Now
      </a>
      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-lg border border-primary/70 px-6 py-3 text-sm font-bold text-primary transition hover:bg-primary/10">
        <MessageCircle className="h-4 w-4" /> WhatsApp Us
      </a>
      <a href={`tel:${phonePrimary}`} className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-bold text-foreground transition hover:border-primary/60">
        <Phone className="h-4 w-4" /> Call Now
      </a>
    </div>
  )
}
