import type { Metadata } from "next"
import Link from "next/link"
import { ExternalLink, MapPin } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { StickyCTA } from "@/components/sticky-cta"
import { ConversionCTA } from "@/components/conversion-cta"
import { JsonLd } from "@/components/seo/json-ld"
import { site } from "@/lib/seo/constants"
import { breadcrumbSchema, faqSchema, hotelSchema } from "@/lib/seo/schema"

export const metadata: Metadata = {
  title: "Dining Options near Hotel Excella | Guest Convenience",
  description:
    "Nearby dining options for Hotel Excella guests including Kamat, Pista House, Kailash Parbat and Sivakoto's Food Magic Restaurant with cuisine, distance notes and map links.",
  alternates: { canonical: `${site.url}/dining-options-near-hotel-excella` },
  openGraph: {
    title: "Dining Options near Hotel Excella",
    description: "Guest convenience guide to nearby dining options around Hotel Excella.",
    url: `${site.url}/dining-options-near-hotel-excella`,
    siteName: site.name,
    images: [{ url: site.image, width: 1200, height: 630, alt: "Hotel Excella" }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dining Options near Hotel Excella",
    description: "Nearby dining options for guest convenience.",
    images: [site.image],
  },
}

const diningOptions = [
  {
    name: "Kamat",
    cuisine: "South Indian and vegetarian meals",
    distance: "Approx. 2–3 km from Hotel Excella",
    description:
      "A practical vegetarian option for guests who prefer familiar South Indian meals, breakfast-style items and simple family-friendly dining during a Vizag stay.",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Kamat+Visakhapatnam+near+Vishalakshi+Nagar",
  },
  {
    name: "Pista House",
    cuisine: "Biryani, Indian dishes, bakery and snacks",
    distance: "Approx. 3–4 km from Hotel Excella",
    description:
      "Useful for guests looking for biryani, Indian meal options or quick snacks after sightseeing, work meetings or a coastal drive around Beach Road side routes.",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Pista+House+Visakhapatnam+near+Vishalakshi+Nagar",
  },
  {
    name: "Kailash Parbat",
    cuisine: "North Indian, chaat and vegetarian comfort food",
    distance: "Approx. 4–5 km from Hotel Excella",
    description:
      "A convenient option for families and groups who want vegetarian North Indian food, chaat-style dishes and a recognizable dining experience in the city.",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Kailash+Parbat+Visakhapatnam",
  },
  {
    name: "Sivakoto's Food Magic Restaurant",
    cuisine: "Indian multi-cuisine",
    distance: "Approx. 2–4 km from Hotel Excella",
    description:
      "A nearby restaurant option for guests who want a broader Indian menu and flexible meal choices while staying at Hotel Excella.",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Sivakoto%27s+Food+Magic+Restaurant+Visakhapatnam",
  },
]

const faqs = [
  {
    question: "Does this page mean Hotel Excella is a restaurant?",
    answer:
      "No. Hotel Excella is positioned as a hotel. This page lists nearby dining options only as guest convenience information.",
  },
  {
    question: "Are the dining distances exact?",
    answer:
      "No. Distances are approximate and can vary by route, traffic and the specific branch selected in maps. Guests should check the map link before leaving.",
  },
  {
    question: "Can in-house guests use food ordering convenience?",
    answer:
      "Yes. In-house guests may use available guest convenience flows, but Hotel Excella does not present itself as a standalone restaurant business.",
  },
  {
    question: "Which nearby dining options are listed for Hotel Excella guests?",
    answer:
      "This guide highlights Kamat, Pista House, Kailash Parbat and Sivakoto's Food Magic Restaurant for guest convenience.",
  },
  {
    question: "Is there vegetarian dining near Hotel Excella?",
    answer:
      "Yes. Kamat and Kailash Parbat are useful vegetarian-friendly options nearby, depending on route, timing and guest preference.",
  },
  {
    question: "Should I call the restaurant before visiting?",
    answer:
      "Yes. Guests should verify opening hours, seating, delivery availability and the exact map location directly with the restaurant before visiting.",
  },
]

export default function DiningOptionsPage() {
  return (
    <div className="min-h-screen bg-background">
      <JsonLd
        data={[
          hotelSchema(),
          faqSchema(faqs),
          breadcrumbSchema([
            { name: "Home", url: site.url },
            { name: "Dining Options", url: `${site.url}/dining-options-near-hotel-excella` },
          ]),
        ]}
      />
      <Header />
      <main className="pt-20 text-foreground">
        <section className="border-b border-border bg-card px-4 py-16 text-center lg:py-24">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-primary">Guest Convenience</p>
          <h1 className="mx-auto mt-5 max-w-4xl font-serif text-4xl font-bold lg:text-6xl">
            Dining options near Hotel Excella
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
            A local dining guide for guests who want nearby meal choices during their stay. Hotel Excella is a hotel, not
            a restaurant; the options below are external restaurants listed for convenience.
          </p>
        </section>

        <section className="px-4 py-16 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-6 md:grid-cols-2">
              {diningOptions.map((item) => (
                <article key={item.name} className="rounded-3xl border border-border bg-card p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="font-serif text-2xl font-bold">{item.name}</h2>
                      <p className="mt-3 text-sm font-semibold text-primary">{item.cuisine}</p>
                    </div>
                    <MapPin className="h-6 w-6 shrink-0 text-primary" aria-hidden="true" />
                  </div>
                  <p className="mt-3 text-sm font-medium text-foreground">{item.distance}</p>
                  <p className="mt-4 leading-7 text-muted-foreground">{item.description}</p>
                  <a
                    href={item.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 rounded-full border border-primary px-5 py-2.5 font-semibold text-primary transition hover:bg-primary/10"
                  >
                    Open Map <ExternalLink className="h-4 w-4" />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 pb-12 lg:px-8">
          <div className="mx-auto max-w-7xl rounded-3xl border border-border bg-card p-6 md:p-8">
            <h2 className="font-serif text-3xl font-bold">Plan meals around your stay</h2>
            <p className="mt-4 leading-8 text-muted-foreground">
              Guests can combine nearby dining with room booking, attractions and local movement. Before confirming your
              stay, review the rooms, amenities, gallery, location, contact page, attractions hub and why book direct
              guide for a complete view of Hotel Excella.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {[
                ["Rooms", "/rooms"],
                ["Amenities", "/amenities"],
                ["Gallery", "/gallery"],
                ["Location", "/location"],
                ["Contact", "/contact"],
                ["Attractions", "/attractions"],
                ["Why Book Direct", "/why-book-direct"],
              ].map(([label, href]) => (
                <Link key={href} href={href} className="rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground hover:border-primary hover:text-primary">
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-12 lg:px-8">
          <div className="mx-auto max-w-4xl rounded-3xl border border-border bg-card p-6 md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Dining FAQ</p>
            <h2 className="mt-3 font-serif text-3xl font-bold">Questions about nearby dining</h2>
            <div className="mt-6 divide-y divide-border">
              {faqs.map((faq) => (
                <details key={faq.question} className="py-5">
                  <summary className="cursor-pointer list-none font-semibold">{faq.question}</summary>
                  <p className="mt-3 text-muted-foreground">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <ConversionCTA title="Need stay assistance?" description="Contact Hotel Excella directly for room availability and guest support." />
      </main>
      <Footer />
      <StickyCTA />
      <div className="h-16 lg:hidden" />
    </div>
  )
}
