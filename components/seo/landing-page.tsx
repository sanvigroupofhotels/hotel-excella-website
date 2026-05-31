import Link from "next/link"
import { MapPin, ShieldCheck, Wifi, Clock, Star, ConciergeBell } from "lucide-react"
import { attractions, coreFaqs } from "@/lib/seo/content"
import { CtaRow } from "@/components/seo/cta-row"
import { InternalLinks } from "@/components/seo/internal-links"
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/seo/json-ld"
import { WhyChooseHotelExcella } from "@/components/seo/why-choose"
import { ReviewSnippets } from "@/components/seo/review-snippets"
import { GoogleMapSection } from "@/components/seo/map-section"

function attractionForFocus(focus: string) {
  return attractions.find((attraction) => focus.includes(attraction.name) || attraction.name.includes(focus))
}

export function SeoLandingPage({ page }: { page: { slug: string; h1: string; focus: string; intro: string } }) {
  const focusAttraction = attractionForFocus(page.focus)
  const relatedFaqs = [
    { question: `How far is ${page.focus} from Hotel Excella?`, answer: focusAttraction ? `${focusAttraction.name} is ${focusAttraction.distance} from Hotel Excella, with ${focusAttraction.driveTime.toLowerCase()} depending on traffic.` : `Hotel Excella is positioned for convenient access to ${page.focus} and the wider Beach Road–Kailasagiri–Rushikonda corridor.` },
    { question: `How can guests reach ${page.focus}?`, answer: `Guests can use their own vehicle, local taxis or app-based cabs. The hotel team can help with route guidance, and Google Maps directions are available on this page.` },
    { question: `Is Hotel Excella suitable for families visiting ${page.focus}?`, answer: "Yes. The hotel is family friendly, close to major attractions, and works well for guests who want a calm base after sightseeing." },
    { question: "Can I book directly with Hotel Excella?", answer: "Yes. Guests can use Book Now for live booking or WhatsApp Us for room availability and pricing support." },
    ...coreFaqs.slice(0, 2),
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
            <p>Hotel Excella is designed for travellers who want a polished independent hotel experience in Visakhapatnam with clear, honest positioning. The property offers convenient access to Beach Road, Tenneti Park, Kailasagiri, Rushikonda Beach, TTD Temple Rushikonda, YSR View Point and Indira Gandhi Zoological Park without claiming to be a beachfront, sea-view or beach-view hotel.</p>
            <p>Guests choosing Hotel Excella for {page.focus} can plan relaxed days with comfortable rooms, free WiFi, fast check-in, responsive assistance and direct booking support. Families appreciate the practical room comfort and nearby outing options. Couples value the boutique feel and easy coastal access. Business travellers benefit from a calm base after work in the city.</p>
            <p>Food ordering is presented as a guest convenience service only. In-house guests can use the Guest Services Portal for in-room food ordering, WiFi details, reception assistance, checkout support and reviews. Meals are delivered to rooms through trusted restaurant partners.</p>
            <h2 className="font-serif text-3xl font-bold text-foreground">Approximate distances from Hotel Excella</h2>
            <div className="grid gap-4">
              {attractions.map((attraction) => (
                <Link key={attraction.name} href={attraction.slug} className="rounded-xl border border-border bg-card p-5 transition hover:border-primary/60">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"><h3 className="text-xl font-semibold text-foreground">{attraction.name}</h3><span className="text-sm text-primary">{attraction.distance} · {attraction.time} · {attraction.driveTime}</span></div>
                  <p className="mt-2 text-muted-foreground">{attraction.description}</p>
                </Link>
              ))}
            </div>
          </article>

          <aside className="space-y-6">
            <div className="rounded-2xl border border-primary/25 bg-card p-6">
              <h2 className="font-serif text-2xl font-bold text-foreground">Stay highlights</h2>
              <ul className="mt-5 space-y-4 text-sm text-muted-foreground">
                <li className="flex gap-3"><MapPin className="h-5 w-5 text-primary" /> Near Beach Road and major Vizag attractions</li>
                <li className="flex gap-3"><Wifi className="h-5 w-5 text-primary" /> Free WiFi for guests</li>
                <li className="flex gap-3"><Clock className="h-5 w-5 text-primary" /> Fast check-in support</li>
                <li className="flex gap-3"><ConciergeBell className="h-5 w-5 text-primary" /> Guest Services Portal</li>
                <li className="flex gap-3"><Star className="h-5 w-5 text-primary" /> Premium value-luxury experience</li>
                <li className="flex gap-3"><ShieldCheck className="h-5 w-5 text-primary" /> Family, couple and business traveller friendly</li>
              </ul>
              <div className="mt-6"><CtaRow /></div>
            </div>
            <InternalLinks />
          </aside>
        </div>
      </section>
      <WhyChooseHotelExcella />
      <ReviewSnippets title="Guest confidence for direct bookings" />
      <GoogleMapSection title={`Directions to Hotel Excella for ${page.focus}`} />
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
