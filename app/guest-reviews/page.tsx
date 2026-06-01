import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { StickyCTA } from "@/components/sticky-cta"
import { BookingCTA } from "@/components/booking-cta"
import { JsonLd } from "@/components/seo/json-ld"
import { site } from "@/lib/seo/constants"
import { aggregateRatingSchema, breadcrumbSchema, hotelSchema } from "@/lib/seo/schema"

export const metadata: Metadata = {
  title: "Guest Reviews | Hotel Excella, Visakhapatnam",
  description: "Read guest review highlights for Hotel Excella, Visakhapatnam and share your Google review after your stay.",
  alternates: { canonical: `${site.url}/guest-reviews` },
}

const reviews = [
  { name: "Family guest", text: "Comfortable rooms, helpful staff and a convenient location for visiting Kailasagiri and Beach Road." },
  { name: "Business traveler", text: "Clean stay, quick support and easy access to city-side meetings and restaurants." },
  { name: "Tourist guest", text: "A practical base for sightseeing near Tenneti Park, Rushikonda Beach and the zoo." },
]

export default function GuestReviewsPage() {
  return (
    <>
      <JsonLd data={[hotelSchema(), aggregateRatingSchema(), breadcrumbSchema([{ name: "Home", url: site.url }, { name: "Guest Reviews", url: `${site.url}/guest-reviews` }])]} />
      <Header />
      <main className="bg-background pb-24 pt-24 text-foreground lg:pb-0">
        <section className="px-4 py-16 lg:px-8">
          <div className="mx-auto max-w-5xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-primary">Guest feedback</p>
            <h1 className="mt-5 font-serif text-4xl font-bold md:text-6xl">Guest reviews for Hotel Excella, Visakhapatnam</h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">Guests choose Hotel Excella for clean rooms, responsive support and convenient access to attractions near Beach Road.</p>
            <div className="mt-8"><BookingCTA align="center" /></div>
          </div>
        </section>
        <section className="px-4 py-10 lg:px-8">
          <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
            {reviews.map((review) => (
              <article key={review.name} className="rounded-3xl border border-border bg-card p-6">
                <p className="text-2xl text-primary">★★★★★</p>
                <p className="mt-4 leading-7 text-muted-foreground">“{review.text}”</p>
                <p className="mt-5 font-semibold">{review.name}</p>
              </article>
            ))}
          </div>
          <div className="mx-auto mt-10 max-w-3xl rounded-3xl border border-primary/30 bg-primary/10 p-6 text-center">
            <h2 className="font-serif text-3xl font-bold">Stayed with us?</h2>
            <p className="mt-3 text-muted-foreground">Share your experience on Google and help future guests plan their stay.</p>
            <a href="https://www.google.com/search?q=Hotel+Excella+Visakhapatnam+reviews" target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground">Write a Google Review</a>
          </div>
        </section>
      </main>
      <Footer />
      <StickyCTA />
    </>
  )
}
