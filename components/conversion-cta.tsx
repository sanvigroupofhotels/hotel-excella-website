import Link from "next/link"
import { ArrowRight, MessageCircle, Phone } from "lucide-react"
import { site } from "@/lib/seo/constants"

type ConversionCTAProps = {
  title?: string
  description?: string
}

export function ConversionCTA({
  title = "Ready to plan your comfortable stay in Visakhapatnam?",
  description = "Book direct with Hotel Excella or message us on WhatsApp for room availability support.",
}: ConversionCTAProps) {
  return (
    <section className="px-4 py-12 lg:px-8">
      <div className="mx-auto max-w-5xl rounded-3xl bg-primary p-8 text-center text-primary-foreground md:p-12">
        <h2 className="font-serif text-3xl font-bold md:text-4xl">{title}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/85">{description}</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href={site.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-background px-6 py-3 font-semibold text-foreground"
          >
            <MessageCircle className="h-4 w-4" /> WhatsApp Availability
          </a>
          <a
            href={`tel:${site.phonePrimary.replace(/\s/g, "")}`}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-primary-foreground/45 px-6 py-3 font-semibold"
          >
            <Phone className="h-4 w-4" /> Call Hotel
          </a>
          <Link
            href="/rooms"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-primary-foreground/45 px-6 py-3 font-semibold"
          >
            View Rooms <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
