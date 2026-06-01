import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { StickyCTA } from "@/components/sticky-cta"
import { BookingCTA } from "@/components/booking-cta"
import { JsonLd } from "@/components/seo/json-ld"
import { site } from "@/lib/seo/constants"
import { breadcrumbSchema, faqSchema, hotelSchema } from "@/lib/seo/schema"

export const metadata: Metadata = {
  title: "Why Book Direct | Hotel Excella, Visakhapatnam",
  description: "Book direct with Hotel Excella, Visakhapatnam for direct communication, WhatsApp assistance, faster support and better flexibility.",
  alternates: { canonical: `${site.url}/why-book-direct` },
}

const benefits = ["Direct communication with the hotel", "Faster support before arrival", "WhatsApp assistance on +91 9985908131", "Personalized service for family and business stays", "Better flexibility for room enquiries"]
const faqs = [
  { question: "How can I contact Hotel Excella directly?", answer: `You can call ${site.phonePrimary}, email ${site.email}, or use the WhatsApp enquiry button on the website.` },
  { question: "Does direct booking help with flexible requests?", answer: "Yes. Direct communication makes it easier to discuss arrival time, room preferences and stay questions with the hotel team." },
]

export default function WhyBookDirectPage() {
  return (
    <>
      <JsonLd data={[hotelSchema(), faqSchema(faqs), breadcrumbSchema([{ name: "Home", url: site.url }, { name: "Why Book Direct", url: `${site.url}/why-book-direct` }])]} />
      <Header />
      <main className="bg-background pb-24 pt-24 text-foreground lg:pb-0">
        <section className="px-4 py-16 lg:px-8">
          <div className="mx-auto max-w-5xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-primary">Direct enquiries</p>
            <h1 className="mt-5 font-serif text-4xl font-bold md:text-6xl">Why book direct with Hotel Excella?</h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">Booking direct helps you speak with Hotel Excella, Visakhapatnam without delays. Use WhatsApp for room availability, special requests and quick support before confirming your stay.</p>
            <div className="mt-8"><BookingCTA align="center" /></div>
          </div>
        </section>
        <section className="px-4 py-10 lg:px-8">
          <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit) => <div key={benefit} className="rounded-3xl border border-border bg-card p-6 text-lg font-semibold">{benefit}</div>)}
          </div>
        </section>
      </main>
      <Footer />
      <StickyCTA />
    </>
  )
}
