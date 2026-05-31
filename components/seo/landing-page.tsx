import Link from "next/link"
import { MapPin, ShieldCheck, Utensils, Wifi, Clock, Star } from "lucide-react"
import { attractions, coreFaqs, restaurants } from "@/lib/seo/content"
import { CtaRow } from "@/components/seo/cta-row"
import { InternalLinks } from "@/components/seo/internal-links"
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/seo/json-ld"

export function SeoLandingPage({ page }: { page: { slug: string; h1: string; focus: string; intro: string } }) {
  const relatedFaqs = [
    { question: `Why choose Hotel Excella for ${page.focus}?`, answer: `Hotel Excella gives guests a premium value-luxury stay with clean rooms, direct booking support, WhatsApp assistance and convenient access to ${page.focus} and the wider Beach Road–Kailasagiri–Rushikonda corridor.` },
    { question: `Is Hotel Excella suitable for families visiting ${page.focus}?`, answer: "Yes. The hotel is family friendly, close to major attractions, and works well for guests who want a calm base after sightseeing." },
    { question: "Can I book directly with Hotel Excella?", answer: "Yes. Guests can book online, call the hotel or use WhatsApp for room availability and pricing support." },
    ...coreFaqs.slice(0, 3),
  ]

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: page.h1, href: `/${page.slug}` }]} />
      <FaqJsonLd faqs={relatedFaqs} />
      <section className="border-b border-border bg-[radial-gradient(circle_at_top,rgba(211,170,83,0.16),transparent_42%)] py-16 lg:py-24">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Hotel Excella · Comfort Near the Coast</p>
          <h1 className="mt-5 font-serif text-4xl font-bold text-foreground lg:text-6xl">{page.h1}</h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">{page.intro}</p>
          <div className="mt-8"><CtaRow center /></div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-[1.2fr_0.8fr]">
          <article className="space-y-7 text-base leading-8 text-muted-foreground">
            <h2 className="font-serif text-3xl font-bold text-foreground">A premium base near {page.focus}</h2>
            <p>Hotel Excella is designed for travellers who want a polished independent hotel experience in Visakhapatnam with the ease of direct booking. The property is positioned for convenient access to Beach Road, Tenneti Park, Kailasagiri, Rushikonda Beach, TTD Temple Rushikonda, YSR View Point and Indira Gandhi Zoological Park. Instead of overpromising with beachfront claims, the hotel focuses on what matters to guests: comfortable rooms, responsive service, clean interiors, fast check-in and a location that makes Vizag simple to explore.</p>
            <p>Guests choosing Hotel Excella for {page.focus} can plan relaxed days without being far from restaurants, local transport routes and popular sightseeing stops. Families appreciate the practical room comfort and nearby outing options. Couples value the boutique feel and easy coastal access. Business travellers benefit from WiFi, direct communication and a calm place to return to after meetings in the city.</p>
            <p>The best stay plans often combine {page.focus} with Tenneti Park for a coastal pause, Kailasagiri for views, Rushikonda Beach for beach time and nearby restaurants for convenient meals. Hotel Excella works especially well for guests who prefer a neat, modern stay rather than a crowded template hotel experience.</p>
            <h2 className="font-serif text-3xl font-bold text-foreground">Why guests book direct</h2>
            <p>Direct booking helps guests confirm room availability, breakfast details, arrival timing and special requests with the hotel team. It also reduces dependency on third-party listings and gives travellers a clearer line of communication before check-in. Use Book Now for live booking, WhatsApp for quick availability and pricing, or Call Now if you prefer immediate assistance.</p>
            <div className="grid gap-4 sm:grid-cols-2">
              {["Family Friendly", "Couple Friendly", "Fast Check-In", "Near Major Attractions", "Free WiFi", "Breakfast Available"].map((item) => (
                <div key={item} className="rounded-xl border border-border bg-card p-4 text-foreground"><ShieldCheck className="mb-3 h-5 w-5 text-primary" />{item}</div>
              ))}
            </div>
            <h2 className="font-serif text-3xl font-bold text-foreground">Nearby attractions from Hotel Excella</h2>
            <div className="grid gap-4">
              {attractions.map((attraction) => (
                <Link key={attraction.name} href={attraction.slug} className="rounded-xl border border-border bg-card p-5 transition hover:border-primary/60">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"><h3 className="text-xl font-semibold text-foreground">{attraction.name}</h3><span className="text-sm text-primary">{attraction.distance} · {attraction.time}</span></div>
                  <p className="mt-2 text-muted-foreground">{attraction.description}</p>
                </Link>
              ))}
            </div>
          </article>

          <aside className="space-y-6">
            <div className="rounded-2xl border border-primary/25 bg-card p-6">
              <h2 className="font-serif text-2xl font-bold text-foreground">Stay highlights</h2>
              <ul className="mt-5 space-y-4 text-sm text-muted-foreground">
                <li className="flex gap-3"><MapPin className="h-5 w-5 text-primary" /> Near Beach Road and Vizag attractions</li>
                <li className="flex gap-3"><Wifi className="h-5 w-5 text-primary" /> Free WiFi for guests</li>
                <li className="flex gap-3"><Clock className="h-5 w-5 text-primary" /> Fast check-in support</li>
                <li className="flex gap-3"><Utensils className="h-5 w-5 text-primary" /> Breakfast and nearby dining options</li>
                <li className="flex gap-3"><Star className="h-5 w-5 text-primary" /> Premium value-luxury positioning</li>
              </ul>
              <div className="mt-6"><CtaRow /></div>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="font-serif text-2xl font-bold text-foreground">Nearby restaurants</h2>
              <div className="mt-4 space-y-4">
                {restaurants.map((restaurant) => (
                  <div key={restaurant.name} className="border-b border-border pb-4 last:border-0 last:pb-0">
                    <h3 className="font-semibold text-foreground">{restaurant.name}</h3>
                    <p className="text-sm text-primary">{restaurant.cuisine} · {restaurant.distance}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{restaurant.reason}</p>
                  </div>
                ))}
              </div>
              <Link href="/restaurants" className="mt-5 inline-flex text-sm font-semibold text-primary">View dining guide →</Link>
            </div>
            <InternalLinks />
          </aside>
        </div>
      </section>

      <section className="border-t border-border bg-card/40 py-16">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-center font-serif text-3xl font-bold text-foreground">Frequently asked questions</h2>
          <div className="mt-8 grid gap-4">
            {relatedFaqs.map((faq) => (
              <details key={faq.question} className="rounded-xl border border-border bg-background p-5">
                <summary className="cursor-pointer font-semibold text-foreground">{faq.question}</summary>
                <p className="mt-3 text-muted-foreground">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
