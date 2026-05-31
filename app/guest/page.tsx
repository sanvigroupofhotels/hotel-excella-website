import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { StickyCTA } from "@/components/sticky-cta"
import { CtaRow } from "@/components/seo/cta-row"
import { pageMetadata } from "@/lib/seo/site"
import { ClipboardCheck, MessageSquare, Star, UtensilsCrossed, Wifi, BellRing } from "lucide-react"

export const metadata: Metadata = pageMetadata({ title: "Hotel Excella Guest Services Portal", description: "Guest Services Portal at Hotel Excella helps in-house guests with in-room food ordering, WiFi details, reception assistance, checkout support and reviews.", path: "/guest" })

const services = [
  { icon: UtensilsCrossed, title: "In-Room Food Ordering", text: "Convenient food ordering through our Guest Portal. Meals are delivered to your room through trusted restaurant partners." },
  { icon: Wifi, title: "WiFi Details", text: "Quick access to WiFi information for a smoother stay." },
  { icon: BellRing, title: "Reception Assistance", text: "Contact the hotel team for stay-related support and quick guest assistance." },
  { icon: ClipboardCheck, title: "Checkout Support", text: "Access checkout guidance and final assistance before departure." },
  { icon: Star, title: "Guest Reviews", text: "Share feedback and help future guests choose Hotel Excella with confidence." },
]

export default function GuestPage() {
  return <div className="min-h-screen bg-background"><Header/><main className="pt-20"><section className="border-b border-border bg-card py-16 lg:py-24"><div className="mx-auto max-w-5xl px-4 text-center"><p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Guest Convenience Service</p><h1 className="mt-4 font-serif text-4xl font-bold text-foreground lg:text-6xl">Hotel Excella Guest Services Portal</h1><p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">The Guest Services Portal is designed for in-house guests who want quick access to in-room food ordering, WiFi details, reception assistance, checkout support and guest reviews. Food ordering is a convenience service, not a restaurant-focused offering.</p><div className="mt-8"><CtaRow center/></div></div></section><section className="py-16 lg:py-24"><div className="mx-auto grid max-w-7xl gap-6 px-4 md:grid-cols-2 lg:grid-cols-3">{services.map((service)=><article key={service.title} className="rounded-2xl border border-border bg-card p-6"><service.icon className="h-8 w-8 text-primary"/><h2 className="mt-5 text-2xl font-semibold text-foreground">{service.title}</h2><p className="mt-3 leading-7 text-muted-foreground">{service.text}</p></article>)}</div><div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-primary/25 bg-primary/10 p-6 text-center"><MessageSquare className="mx-auto h-7 w-7 text-primary"/><h2 className="mt-4 font-serif text-2xl font-bold text-foreground">In-house guest?</h2><p className="mt-2 text-muted-foreground">Please scan the QR code provided at the hotel or contact reception for secure access to stay-specific services.</p><div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row"><Link href="/orderfood" className="inline-flex rounded-lg bg-primary px-5 py-3 text-sm font-bold text-primary-foreground">Open in-room food ordering</Link><Link href="/review" className="inline-flex rounded-lg border border-primary px-5 py-3 text-sm font-bold text-primary">Leave a review</Link></div></div></section></main><Footer/><StickyCTA/></div>
}
