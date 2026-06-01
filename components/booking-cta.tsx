import { ArrowRight, MessageCircle } from "lucide-react"
import { site } from "@/lib/seo/constants"

type BookingCTAProps = {
  align?: "left" | "center"
  size?: "sm" | "lg"
}

export function BookingCTA({ align = "left", size = "lg" }: BookingCTAProps) {
  const wrapper = align === "center" ? "justify-center" : "justify-start"
  const padding = size === "sm" ? "px-4 py-2 text-sm" : "px-6 py-3 text-base"

  return (
    <div className={`flex flex-col gap-3 sm:flex-row ${wrapper}`}>
      <a
        className={`inline-flex items-center justify-center gap-2 rounded-full bg-primary font-semibold text-primary-foreground ${padding}`}
        href={site.bookingUrl}
      >
        Send Enquiry <ArrowRight className="h-4 w-4" />
      </a>
      <a
        className={`inline-flex items-center justify-center gap-2 rounded-full border border-primary font-semibold text-primary ${padding}`}
        href={site.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        <MessageCircle className="h-4 w-4" /> WhatsApp Hotel Excella
      </a>
    </div>
  )
}
