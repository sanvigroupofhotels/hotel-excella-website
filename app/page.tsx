import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { StickyCTA } from "@/components/sticky-cta"
import { CtaRow } from "@/components/seo/cta-row"
import { FaqJsonLd } from "@/components/seo/json-ld"
import { attractions, coreFaqs, trustIndicators } from "@/lib/seo/content"
import { heroImage, pageMetadata } from "@/lib/seo/site"
import { Bed, Briefcase, CheckCircle, Clock, MapPin, ShieldCheck, Sparkles, Users, Wifi, ConciergeBell } from "lucide-react"
import { WhyChooseHotelExcella } from "@/components/seo/why-choose"
import { RoomComparisonSection } from "@/components/seo/room-comparison"
import { ReviewSnippets } from "@/components/seo/review-snippets"

export const metadata: Metadata = pageMetadata({
  title: "Hotel Excella Vizag | Comfort Near the Coast",
  description: "Premium value-luxury hotel near Beach Road, Tenneti Park, Kailasagiri, Rushikonda Beach, TTD Temple Rushikonda, YSR View Point and Vizag Zoo. Book direct.",
})

const trustIcons = [Users, ShieldCheck, Briefcase, MapPin, Wifi, ConciergeBell, Clock]

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
              <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">Hotel Excella is a premium value-luxury hotel in Visakhapatnam with convenient access to Beach Road, Tenneti Park, Kailasagiri, Rushikonda Beach, TTD Temple Rushikonda, YSR View Point and Indira Gandhi Zoological Park. We do not position the hotel as beachfront, sea-view or beach-view.</p>
              <div className="mt-8"><CtaRow /></div>
              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {trustIndicators.map((label, index) => { const Icon = trustIcons[index] ?? CheckCircle; return <div key={label} className="rounded-xl border border-border bg-card/80 p-4 text-sm font-semibold text-foreground"><Icon className="mb-3 h-5 w-5 text-primary" />{label}</div> })}
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
              {["Clean rooms with boutique comfort", "Convenient access to Vizag attractions", "Guest Services Portal for WiFi, assistance, checkout and in-room food ordering"].map((item) => <div key={item} className="rounded-2xl border border-border bg-card p-6"><CheckCircle className="h-6 w-6 text-primary" /><h3 className="mt-4 text-xl font-semibold text-foreground">{item}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">Hotel Excella keeps the experience simple, modern and guest-first, from enquiry to check-out.</p></div>)}
            </div>
          </div>
        </section>

        <WhyChooseHotelExcella />

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

        <RoomComparisonSection />

        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div><p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">Local attraction access</p><h2 className="mt-3 font-serif text-3xl font-bold text-foreground lg:text-4xl">Approximate distances from Hotel Excella.</h2></div>
              <Link href="/attractions" className="text-sm font-semibold text-primary">Explore attractions →</Link>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {attractions.map((attraction) => <Link key={attraction.name} href={attraction.slug} className="rounded-2xl border border-border bg-card p-6 transition hover:border-primary/60"><MapPin className="h-6 w-6 text-primary" /><h3 className="mt-4 text-xl font-semibold text-foreground">{attraction.name}</h3><p className="mt-2 text-sm font-semibold text-primary">{attraction.distance} · {attraction.time} · {attraction.driveTime}</p><p className="mt-3 text-sm leading-6 text-muted-foreground">{attraction.description}</p></Link>)}
            </div>
          </div>
        </section>

        <ReviewSnippets title="What guests value about Hotel Excella" />

        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-5xl px-4 text-center">
            <h2 className="font-serif text-3xl font-bold text-foreground lg:text-4xl">Ready for a comfortable stay in Vizag?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">Use Book Now for live booking or WhatsApp Us for quick availability and pricing support.</p>
            <div className="mt-8"><CtaRow center /></div>
          </div>
        </section>
      </main>
      <Footer />
      <StickyCTA />
    </div>
  )
}
