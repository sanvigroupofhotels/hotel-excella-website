import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { StickyCTA } from "@/components/sticky-cta"
import { CtaRow } from "@/components/seo/cta-row"
import { BreadcrumbJsonLd } from "@/components/seo/json-ld"
import { restaurants } from "@/lib/seo/content"
import { pageMetadata } from "@/lib/seo/site"

export const metadata: Metadata = pageMetadata({ title: "Restaurants Near Hotel Excella Vizag", description: "Nearby restaurant guide for Hotel Excella guests featuring Kamat, Pista House and Kailash Parbat with cuisine, distance and guest reasons to visit.", path: "/restaurants" })
export default function Page(){return <div className="min-h-screen bg-background"><BreadcrumbJsonLd items={[{name:"Home",href:"/"},{name:"Restaurants",href:"/restaurants"}]}/><Header/><main className="pt-20"><section className="border-b border-border bg-card py-16 lg:py-24"><div className="mx-auto max-w-5xl px-4 text-center"><p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Dining Guide</p><h1 className="mt-4 font-serif text-4xl font-bold text-foreground lg:text-6xl">Restaurants near Hotel Excella</h1><p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">Guests staying near Beach Road, Kailasagiri and Rushikonda often ask for reliable dining nearby. Here are convenient options close to the hotel corridor.</p><div className="mt-8"><CtaRow center/></div></div></section><section className="py-16 lg:py-24"><div className="mx-auto grid max-w-6xl gap-6 px-4 md:grid-cols-3">{restaurants.map((r)=><article key={r.name} className="rounded-2xl border border-border bg-card p-6"><h2 className="text-2xl font-semibold text-foreground">{r.name}</h2><p className="mt-2 text-primary">{r.cuisine}</p><p className="mt-2 text-sm text-muted-foreground">Approx distance: {r.distance}</p><p className="mt-5 leading-7 text-muted-foreground">{r.reason}</p></article>)}</div></section></main><Footer/><StickyCTA/></div>}
