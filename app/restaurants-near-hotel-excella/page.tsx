import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { StickyCTA } from "@/components/sticky-cta"
import { BookingCTA } from "@/components/booking-cta"
import { JsonLd } from "@/components/seo/json-ld"
import { nearbyRestaurants, site } from "@/lib/seo/constants"
import { breadcrumbSchema, hotelSchema } from "@/lib/seo/schema"

export const metadata: Metadata = {
  title: "Restaurants Near Hotel Excella, Visakhapatnam | Kamat, Pista House, Kailash Parbat",
  description: "Explore nearby restaurants from Hotel Excella, Visakhapatnam including Kamat, Pista House and Kailash Parbat with distance and cuisine details.",
  alternates: { canonical: `${site.url}/restaurants-near-hotel-excella` },
}

export default function RestaurantsNearHotelExcellaPage() {
  return (
    <>
      <JsonLd data={[hotelSchema(), breadcrumbSchema([{ name: "Home", url: site.url }, { name: "Restaurants Near Hotel Excella", url: `${site.url}/restaurants-near-hotel-excella` }])]} />
      <Header />
      <main className="bg-background pb-24 pt-24 text-foreground lg:pb-0">
        <section className="px-4 py-16 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-primary">Nearby dining</p>
            <h1 className="mt-5 font-serif text-4xl font-bold md:text-6xl">Restaurants near Hotel Excella, Visakhapatnam</h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">Hotel Excella offers convenient access to popular dining options around Vishalakshi Nagar and Beach Road side areas. Distances are approximate and can vary by route and traffic.</p>
            <div className="mt-8"><BookingCTA /></div>
          </div>
        </section>
        <section className="px-4 py-10 lg:px-8">
          <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
            {nearbyRestaurants.map((restaurant) => (
              <article key={restaurant.name} className="rounded-3xl border border-border bg-card p-6">
                <h2 className="font-serif text-3xl font-bold">{restaurant.name}</h2>
                <p className="mt-3 text-sm font-semibold text-primary">{restaurant.distance}</p>
                <p className="mt-2 text-sm text-muted-foreground">Cuisine: {restaurant.cuisine}</p>
                <p className="mt-5 leading-7 text-muted-foreground">{restaurant.description}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
      <StickyCTA />
    </>
  )
}
