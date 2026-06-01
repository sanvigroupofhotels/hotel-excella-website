import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { StickyCTA } from "@/components/sticky-cta"
import { BookingCTA } from "@/components/booking-cta"
import { JsonLd } from "@/components/seo/json-ld"
import { attractions, site } from "@/lib/seo/constants"
import { breadcrumbSchema, hotelSchema, organizationSchema } from "@/lib/seo/schema"

export const metadata: Metadata = {
  title: "About Hotel Excella, Visakhapatnam | Independent Hotel Near Beach Road",
  description: "Learn the story of Hotel Excella, Visakhapatnam, an independent hotel in Vishalakshi Nagar within walking distance to Beach Road.",
  alternates: { canonical: `${site.url}/about-hotel-excella` },
}

export default function AboutHotelExcellaPage() {
  return (
    <>
      <JsonLd data={[organizationSchema(), hotelSchema(), breadcrumbSchema([{ name: "Home", url: site.url }, { name: "About Hotel Excella", url: `${site.url}/about-hotel-excella` }])]} />
      <Header />
      <main className="bg-background pb-24 pt-24 text-foreground lg:pb-0">
        <section className="px-4 py-16 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-primary">Independent hotel brand</p>
            <h1 className="mt-5 font-serif text-4xl font-bold md:text-6xl">About Hotel Excella, Visakhapatnam</h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">Hotel Excella is an independent hotel in Vishalakshi Nagar, Visakhapatnam, built around practical comfort, responsive hospitality and convenient access to Beach Road and popular tourist destinations. The hotel is not directly on the beach or sea-facing; it is a comfortable city-side base approximately 200 meters walking distance to Beach Road.</p>
            <div className="mt-8"><BookingCTA /></div>
          </div>
        </section>
        <section className="px-4 py-10 lg:px-8">
          <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
            {["Guest-focused hospitality", "Family-friendly positioning", "Location advantages"].map((title, index) => (
              <article key={title} className="rounded-3xl border border-border bg-card p-6">
                <h2 className="font-serif text-2xl font-bold">{title}</h2>
                <p className="mt-4 leading-7 text-muted-foreground">{index === 0 ? "Our team focuses on direct communication, fast support and simple stay planning for families, tourists and business travelers." : index === 1 ? "Rooms and services are designed for clean, comfortable stays with easy enquiry support before and during the visit." : "Guests can quickly reach Beach Road, restaurants and major attractions without depending on exaggerated location claims."}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="px-4 py-12 lg:px-8">
          <div className="mx-auto max-w-6xl rounded-3xl border border-border bg-card p-6 md:p-8">
            <h2 className="font-serif text-3xl font-bold">Nearby attractions from Hotel Excella</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {attractions.map((attraction) => (
                <Link key={attraction.slug} href={`/${attraction.slug}`} className="rounded-2xl border border-border bg-background p-5 hover:border-primary/50">
                  <h3 className="font-semibold">{attraction.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{attraction.distance} • {attraction.travelTime}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <StickyCTA />
    </>
  )
}
