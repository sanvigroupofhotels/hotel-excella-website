import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { StickyCTA } from "@/components/sticky-cta"
import { CtaRow } from "@/components/seo/cta-row"
import { pageMetadata } from "@/lib/seo/site"
import { Bed, CheckCircle, Sparkles } from "lucide-react"

export const metadata: Metadata = pageMetadata({ title: "Rooms in Vizag Near Beach Road", description: "Explore Oak Queen Room and Mapple King Room at Hotel Excella, a premium value-luxury hotel near Beach Road, Kailasagiri and Rushikonda Beach.", path: "/rooms" })

const rooms = [
  { name: "Oak Room", href: "/rooms/oak-room", keywords: "Queen Room Vizag · Deluxe Room Visakhapatnam · Family Room Near Beach Road", icon: Bed, text: "A comfortable queen room for families, couples and business travellers who want clean interiors and quick access to Vizag attractions." },
  { name: "Mapple Room", href: "/rooms/mapple-room", keywords: "King Size Room Vizag · Deluxe King Room Visakhapatnam · Premium Stay Near Kailasagiri", icon: Sparkles, text: "A premium king room with extra comfort for guests seeking a refined stay near Kailasagiri, Beach Road and Rushikonda." },
]

export default function RoomsPage() {
  return <div className="min-h-screen bg-background"><Header /><main className="pt-20"><section className="border-b border-border bg-card py-16 lg:py-24"><div className="mx-auto max-w-5xl px-4 text-center"><p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Rooms</p><h1 className="mt-4 font-serif text-4xl font-bold text-foreground lg:text-6xl">Premium rooms near Beach Road Vizag</h1><p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">Choose Oak or Mapple at Hotel Excella for a comfortable stay near Tenneti Park, Kailasagiri, Rushikonda Beach and key Vizag attractions.</p><div className="mt-8"><CtaRow center /></div></div></section><section className="py-16 lg:py-24"><div className="mx-auto grid max-w-7xl gap-6 px-4 md:grid-cols-2">{rooms.map((room)=><Link key={room.name} href={room.href} className="rounded-3xl border border-border bg-card p-8 transition hover:border-primary/60"><room.icon className="h-9 w-9 text-primary"/><h2 className="mt-6 font-serif text-4xl font-bold text-foreground">{room.name}</h2><p className="mt-3 text-sm font-semibold text-primary">{room.keywords}</p><p className="mt-5 leading-7 text-muted-foreground">{room.text}</p><ul className="mt-6 space-y-3 text-sm text-foreground">{["Free WiFi","Air conditioning","Daily housekeeping","Breakfast available","Direct booking support"].map((item)=><li key={item} className="flex gap-2"><CheckCircle className="h-5 w-5 text-primary"/>{item}</li>)}</ul><span className="mt-7 inline-flex text-sm font-bold text-primary">View room details →</span></Link>)}</div></section></main><Footer/><StickyCTA/></div>
}
