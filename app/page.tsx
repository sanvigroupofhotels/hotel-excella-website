import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { StickyCTA } from "@/components/sticky-cta"
import { CtaRow } from "@/components/seo/cta-row"
import { FaqJsonLd } from "@/components/seo/json-ld"
import { attractions, coreFaqs, restaurants } from "@/lib/seo/content"
import { heroImage, pageMetadata } from "@/lib/seo/site"
import { Bed, Briefcase, CheckCircle, Clock, MapPin, ShieldCheck, Sparkles, Users, Wifi, Utensils } from "lucide-react"

export const metadata: Metadata = pageMetadata({
  title: "Hotel Excella Vizag | Comfort Near the Coast",
  description: "Premium value-luxury hotel near Beach Road, Tenneti Park, Kailasagiri, Rushikonda Beach, TTD Temple Rushikonda, YSR View Point and Vizag Zoo. Book direct.",
})

const trust = [
  { icon: Users, label: "Family Friendly" },
  { icon: ShieldCheck, label: "Couple Friendly" },
  { icon: Clock, label: "Fast Check-In" },
  { icon: MapPin, label: "Near Major Attractions" },
  { icon: Wifi, label: "Free WiFi" },
  { icon: Utensils, label: "Breakfast Available" },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <FaqJsonLd faqs={coreFaqs} />
      <Header />
      <main className="pt-20">
        <section className="relative overflow-hidden border-b border-border bg-[radial-gradient(circle_at_20%_0%,rgba(211,170,83,0.2),transparent_38%)]">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:py-24">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Comfort Near the Coast</p>
              <h1 className="mt-5 font-serif text-4xl font-bold leading-tight text-foreground lg:text-6xl">Comfortable stay in Vizag near Beach Road, Tenneti Park and Kailasagiri.</h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">Hotel Excella is a premium value-luxury hotel in Visakhapatnam with convenient access to Beach Road, Tenneti Park, Kailasagiri, Rushikonda Beach, TTD Temple Rushikonda, YSR View Point and Indira Gandhi Zoological Park.</p>
              <div className="mt-8"><CtaRow /></div>
              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {trust.map((item) => <div key={item.label} className="rounded-xl border border-border bg-card/80 p-4 text-sm font-semibold text-foreground"><item.icon className="mb-3 h-5 w-5 text-primary" />{item.label}</div>)}
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-primary/20 shadow-2xl">
              <Image src={heroImage} alt="Hotel Excella exterior near Beach Road Visakhapatnam" fill priority sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">Direct booking advantage</p>
              <h2 className="mt-3 font-serif text-3xl font-bold text-foreground lg:text-4xl">A premium independent hotel built for better stays and faster enquiries.</h2>
              <p className="mt-4 text-muted-foreground">Book directly for live availability, WhatsApp support, clear pricing conversations and smoother arrival coordination.</p>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {["Clean rooms with boutique comfort", "Easy access to Vizag attractions", "Guest Portal for food, WiFi and requests"].map((item) => <div key={item} className="rounded-2xl border border-border bg-card p-6"><CheckCircle className="h-6 w-6 text-primary" /><h3 className="mt-4 text-xl font-semibold text-foreground">{item}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">Hotel Excella keeps the experience simple, modern and guest-first, from enquiry to check-out.</p></div>)}
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-card/40 py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div><p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">Rooms</p><h2 className="mt-3 font-serif text-3xl font-bold text-foreground lg:text-4xl">Oak and Mapple rooms for relaxed Vizag stays.</h2></div>
              <Link href="/rooms" className="text-sm font-semibold text-primary">View all rooms →</Link>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {[{ name: "Oak Room", href: "/rooms/oak-room", icon: Bed, text: "Queen room in Vizag for couples, solo guests and families seeking a deluxe room near Beach Road." }, { name: "Mapple Room", href: "/rooms/mapple-room", icon: Sparkles, text: "King size room in Vizag with premium comfort and easy access to Kailasagiri and coastal attractions." }].map((room) => <Link key={room.name} href={room.href} className="rounded-2xl border border-border bg-background p-7 transition hover:border-primary/60"><room.icon className="h-7 w-7 text-primary" /><h3 className="mt-5 font-serif text-3xl font-bold text-foreground">{room.name}</h3><p className="mt-3 text-muted-foreground">{room.text}</p><span className="mt-5 inline-flex text-sm font-semibold text-primary">Explore room →</span></Link>)}
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4">
            <div className="text-center"><p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">Nearby attractions</p><h2 className="mt-3 font-serif text-3xl font-bold text-foreground lg:text-4xl">Explore Vizag from a convenient base.</h2></div>
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {attractions.map((attraction) => <Link key={attraction.name} href={attraction.slug} className="rounded-2xl border border-border bg-card p-6 transition hover:border-primary/60"><h3 className="text-xl font-semibold text-foreground">{attraction.name}</h3><p className="mt-2 text-sm text-primary">{attraction.distance} · {attraction.time}</p><p className="mt-3 text-sm leading-6 text-muted-foreground">{attraction.description}</p></Link>)}
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-card/40 py-16">
          <div className="mx-auto max-w-7xl px-4">
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
              <div><p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">Dining nearby</p><h2 className="mt-3 font-serif text-3xl font-bold text-foreground">Restaurants guests ask about.</h2><Link href="/restaurants" className="mt-5 inline-flex text-sm font-semibold text-primary">Open dining guide →</Link></div>
              <div className="grid gap-4 md:grid-cols-3">{restaurants.map((restaurant) => <div key={restaurant.name} className="rounded-xl border border-border bg-background p-5"><h3 className="font-semibold text-foreground">{restaurant.name}</h3><p className="mt-1 text-sm text-primary">{restaurant.cuisine}</p><p className="mt-3 text-sm text-muted-foreground">{restaurant.reason}</p></div>)}</div>
            </div>
          </div>
        </section>

        <section className="py-16 text-center">
          <div className="mx-auto max-w-4xl px-4"><Briefcase className="mx-auto h-8 w-8 text-primary" /><h2 className="mt-4 font-serif text-3xl font-bold text-foreground">Ready to book Hotel Excella?</h2><p className="mt-3 text-muted-foreground">Use direct booking, WhatsApp or call the team for availability and pricing.</p><div className="mt-7"><CtaRow center /></div></div>
        </section>
      </main>
      <Footer />
      <StickyCTA />
    </div>
  )
}
