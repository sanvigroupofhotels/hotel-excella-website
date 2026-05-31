import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { StickyCTA } from "@/components/sticky-cta"
import { CtaRow } from "@/components/seo/cta-row"
import { pageMetadata } from "@/lib/seo/site"
import { MessageSquare, Star, UtensilsCrossed, Wifi, Bell, Phone } from "lucide-react"

export const metadata: Metadata = pageMetadata({ title: "Hotel Excella Guest Portal", description: "Guest Portal at Hotel Excella helps in-house guests order food, access WiFi details, contact reception, submit requests and leave reviews.", path: "/guest" })

const services = [
  { icon: UtensilsCrossed, title: "Order Food", text: "Browse food options and place convenient in-house dining requests during your stay." },
  { icon: Wifi, title: "Access WiFi Details", text: "Find guest WiFi information quickly without waiting at reception." },
  { icon: Phone, title: "Contact Reception", text: "Reach the hotel team for assistance, room queries and stay support." },
  { icon: Bell, title: "Submit Requests", text: "Ask for help with housekeeping, amenities or stay-related requirements." },
  { icon: Star, title: "Leave Reviews", text: "Share feedback after your stay and help the hotel improve the guest experience." },
]

export default function GuestPortalPage() {
  return <div className="min-h-screen bg-background"><Header/><main className="pt-20"><section className="border-b border-border bg-card py-16 lg:py-24"><div className="mx-auto max-w-5xl px-4 text-center"><p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Guest Convenience</p><h1 className="mt-4 font-serif text-4xl font-bold text-foreground lg:text-6xl">Hotel Excella Guest Portal</h1><p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">The Guest Portal is designed for in-house guests who want quick access to food ordering, WiFi details, reception support, service requests and review options. Public information is kept simple and no internal hotel systems are exposed.</p><div className="mt-8"><CtaRow center/></div></div></section><section className="py-16 lg:py-24"><div className="mx-auto grid max-w-7xl gap-6 px-4 md:grid-cols-2 lg:grid-cols-3">{services.map((service)=><article key={service.title} className="rounded-2xl border border-border bg-card p-6"><service.icon className="h-8 w-8 text-primary"/><h2 className="mt-5 text-2xl font-semibold text-foreground">{service.title}</h2><p className="mt-3 leading-7 text-muted-foreground">{service.text}</p></article>)}</div><div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-primary/25 bg-primary/10 p-6 text-center"><MessageSquare className="mx-auto h-7 w-7 text-primary"/><h2 className="mt-4 font-serif text-2xl font-bold text-foreground">In-house guest?</h2><p className="mt-2 text-muted-foreground">Please scan the QR code provided at the hotel or contact reception for secure access to stay-specific services.</p><Link href="/review" className="mt-5 inline-flex rounded-lg border border-primary px-5 py-3 text-sm font-bold text-primary">Leave a review</Link></div></section></main><Footer/><StickyCTA/></div>
}
