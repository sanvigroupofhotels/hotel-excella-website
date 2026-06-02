import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { StickyCTA } from "@/components/sticky-cta"
import { ConversionCTA } from "@/components/conversion-cta"
import { JsonLd } from "@/components/seo/json-ld"
import { attractions, site } from "@/lib/seo/constants"
import { breadcrumbSchema, faqSchema, hotelSchema, organizationSchema } from "@/lib/seo/schema"

export const metadata: Metadata = {
  title: "About Hotel Excella, Visakhapatnam | Independent Hotel in Vizag",
  description:
    "Learn the story of Hotel Excella, an independent family-friendly and business-traveller friendly hotel in Visakhapatnam near Beach Road attractions.",
  alternates: { canonical: `${site.url}/about-hotel-excella` },
  openGraph: {
    title: "About Hotel Excella, Visakhapatnam",
    description: "Independent hotel in Visakhapatnam with comfortable stays near Beach Road.",
    url: `${site.url}/about-hotel-excella`,
    siteName: site.name,
    images: [{ url: site.image, width: 1200, height: 630, alt: "Hotel Excella exterior" }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Hotel Excella",
    description: "Independent hotel in Visakhapatnam near Beach Road attractions.",
    images: [site.image],
  },
}

const faqs = [
  { question: "Is Hotel Excella an independent hotel?", answer: "Yes. Hotel Excella is an independent hotel in Visakhapatnam focused on comfortable rooms, direct guest support and practical local access." },
  { question: "Is Hotel Excella family-friendly?", answer: "Yes. The hotel is suitable for families looking for clean rooms, nearby attractions and a calm base near Beach Road side routes." },
  { question: "Is Hotel Excella suitable for business travellers?", answer: "Yes. Business travellers benefit from Free WiFi, fast check-in, practical city movement and a restful room environment." },
  { question: "What attractions are near Hotel Excella?", answer: "Nearby attractions include Tenneti Park, Kailasagiri, Rushikonda Beach, TTD Temple Rushikonda, YSR View Point and Indira Gandhi Zoological Park." },
  { question: "How can guests contact Hotel Excella?", answer: `Guests can call or WhatsApp ${site.phonePrimary} or email ${site.email} for booking support and stay questions.` },
  { question: "Why do guests choose Hotel Excella?", answer: "Guests choose Hotel Excella for clean rooms, value-luxury comfort, direct booking clarity, family-friendly support and convenient access to Vizag attractions." },
]

export default function AboutHotelExcellaPage() {
  return (
    <div className="min-h-screen bg-background">
      <JsonLd
        data={[
          organizationSchema(),
          hotelSchema(),
          faqSchema(faqs),
          breadcrumbSchema([
            { name: "Home", url: site.url },
            { name: "About Hotel Excella", url: `${site.url}/about-hotel-excella` },
          ]),
        ]}
      />
      <Header />
      <main className="pt-20 text-foreground">
        <section className="border-b border-border bg-card px-4 py-16 text-center lg:py-24">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-primary">About Hotel Excella</p>
          <h1 className="mx-auto mt-5 max-w-4xl font-serif text-4xl font-bold lg:text-6xl">
            Independent comfort near Beach Road in Visakhapatnam
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
            Hotel Excella, Visakhapatnam is built around a simple promise: clean rooms, comfortable rest and helpful
            local support for families, business travellers, couples and tourists who want convenient access to the
            Beach Road side of Vizag.
          </p>
        </section>

        <section className="px-4 py-14 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-3">
            <article className="rounded-3xl border border-border bg-card p-6 lg:col-span-2">
              <h2 className="font-serif text-3xl font-bold">Our story and independent identity</h2>
              <div className="mt-5 space-y-4 leading-8 text-muted-foreground">
                <p>
                  Hotel Excella is an independent hotel with a guest-first service style. The property focuses on
                  practical hospitality: comfortable rooms, approachable support, clean spaces and local guidance that
                  helps guests make the most of their time in Visakhapatnam.
                </p>
                <p>
                  The hotel does not rely on unsupported beachfront or sea-view claims. Its identity is more useful to
                  real guests: a calm value-luxury stay near Beach Road side routes, Kailasagiri, Tenneti Park,
                  Rushikonda routes and important local neighborhoods such as Vishalakshi Nagar and MVP Colony.
                </p>
                <p>
                  Guests can contact the hotel directly before arrival, compare the Oak Room and Mapple Room, ask about
                  travel plans and book with clarity. This independent approach keeps the experience personal and avoids
                  generic hospitality language that does not help guests make decisions.
                </p>
              </div>
            </article>

            <aside className="rounded-3xl border border-primary/20 bg-card p-6">
              <h2 className="font-serif text-2xl font-bold">Public contact</h2>
              <p className="mt-4 text-muted-foreground">
                Email: <a className="text-primary" href={`mailto:${site.email}`}>{site.email}</a>
              </p>
              <p className="mt-2 text-muted-foreground">
                Phone / WhatsApp: <a className="text-primary" href={`tel:${site.phonePrimary.replace(/\s/g, "")}`}>{site.phonePrimary}</a>
              </p>
              <p className="mt-4 text-muted-foreground">
                Address: {site.address.street}, {site.address.locality}, {site.address.region} {site.address.postalCode}
              </p>
            </aside>

            <article className="rounded-3xl border border-border bg-card p-6">
              <h2 className="font-serif text-2xl font-bold">Family-friendly positioning</h2>
              <p className="mt-4 leading-7 text-muted-foreground">
                Families choose Hotel Excella because the location supports practical sightseeing and the rooms give
                everyone a restful base after parks, viewpoints, beaches and local visits.
              </p>
            </article>
            <article className="rounded-3xl border border-border bg-card p-6">
              <h2 className="font-serif text-2xl font-bold">Business traveller positioning</h2>
              <p className="mt-4 leading-7 text-muted-foreground">
                Business travellers get Free WiFi, fast check-in, direct communication and a quieter stay environment
                while remaining connected to city movement and nearby dining.
              </p>
            </article>
            <article className="rounded-3xl border border-border bg-card p-6">
              <h2 className="font-serif text-2xl font-bold">Why guests choose us</h2>
              <p className="mt-4 leading-7 text-muted-foreground">
                Guests value cleanliness, sensible pricing, staff support, nearby attractions, direct booking clarity and
                the ability to plan their Vizag stay without exaggerated claims.
              </p>
            </article>
          </div>
        </section>

        <section className="px-4 py-12 lg:px-8">
          <div className="mx-auto max-w-7xl rounded-3xl border border-border bg-card p-6 md:p-8">
            <h2 className="font-serif text-3xl font-bold">Guest reviews and feedback culture</h2>
            <p className="mt-4 leading-8 text-muted-foreground">
              Guest feedback helps Hotel Excella improve the details that matter: check-in experience, room comfort,
              cleanliness, local guidance and service response. In-house guests can use the simple review flow to share
              public Google reviews after a positive stay or private feedback when something needs attention.
            </p>
            <Link className="mt-6 inline-flex rounded-full border border-primary px-6 py-3 font-semibold text-primary" href="/review">
              Review Hotel Excella
            </Link>
          </div>
        </section>

        <section className="px-4 py-12 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="font-serif text-3xl font-bold">Nearby attractions</h2>
            <p className="mt-4 max-w-3xl leading-8 text-muted-foreground">
              Hotel Excella works well for guests who want a comfortable base near parks, viewpoints, beaches and temple
              routes without choosing a crowded attraction-only location.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {attractions.map((item) => (
                <Link key={item.slug} href={`/${item.slug}`} className="rounded-2xl border border-border bg-card p-5 hover:border-primary/50">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{item.distance} • {item.driveTime}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-12 lg:px-8">
          <div className="mx-auto max-w-7xl rounded-3xl border border-border bg-card p-6 md:p-8">
            <h2 className="font-serif text-3xl font-bold">Explore Hotel Excella before booking</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
              {[
                ["Rooms", "/rooms"],
                ["Amenities", "/amenities"],
                ["Gallery", "/gallery"],
                ["Location", "/location"],
                ["Contact", "/contact"],
                ["Why Book Direct", "/why-book-direct"],
              ].map(([label, href]) => (
                <Link key={href} href={href} className="rounded-2xl border border-border bg-background/70 px-4 py-3 text-center font-semibold hover:border-primary hover:text-primary">
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-12 lg:px-8">
          <div className="mx-auto max-w-4xl rounded-3xl border border-border bg-card p-6 md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">About FAQ</p>
            <h2 className="mt-3 font-serif text-3xl font-bold">Questions about Hotel Excella</h2>
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

        <ConversionCTA />
      </main>
      <Footer />
      <StickyCTA />
      <div className="h-16 lg:hidden" />
    </div>
  )
}
