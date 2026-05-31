import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { StickyCTA } from "@/components/sticky-cta"
import { CtaRow } from "@/components/seo/cta-row"
import { BreadcrumbJsonLd } from "@/components/seo/json-ld"
import { attractions } from "@/lib/seo/content"
import { pageMetadata } from "@/lib/seo/site"
import { GoogleMapSection } from "@/components/seo/map-section"

export const metadata: Metadata = pageMetadata({ title: "Nearby Attractions in Vizag", description: "Explore attractions near Hotel Excella including Tenneti Park, Kailasagiri, Rushikonda Beach, TTD Temple Rushikonda, YSR View Point and Vizag Zoo.", path: "/attractions" })
export default function Page(){return <div className="min-h-screen bg-background"><BreadcrumbJsonLd items={[{name:"Home",href:"/"},{name:"Attractions",href:"/attractions"}]}/><Header/><main className="pt-20"><section className="border-b border-border bg-card py-16 lg:py-24"><div className="mx-auto max-w-5xl px-4 text-center"><p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Nearby Attractions Hub</p><h1 className="mt-4 font-serif text-4xl font-bold text-foreground lg:text-6xl">Places to visit near Hotel Excella</h1><p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">Plan Tenneti Park, Kailasagiri, Rushikonda Beach, TTD Temple Rushikonda, YSR View Point and Indira Gandhi Zoological Park from one comfortable hotel base near Beach Road access.</p><div className="mt-8"><CtaRow center/></div></div></section><section className="py-16 lg:py-24"><div className="mx-auto grid max-w-7xl gap-6 px-4 md:grid-cols-2 lg:grid-cols-3">{attractions.map((a)=><Link key={a.name} href={a.slug} className="rounded-2xl border border-border bg-card p-6 transition hover:border-primary/60"><h2 className="text-2xl font-semibold text-foreground">{a.name}</h2><p className="mt-2 text-primary">{a.distance} · {a.time} · {a.driveTime}</p><p className="mt-4 leading-7 text-muted-foreground">{a.description}</p><span className="mt-5 inline-flex text-sm font-bold text-primary">View stay guide →</span></Link>)}</div></section><GoogleMapSection title="Map Hotel Excella before planning attractions" /></main><Footer/><StickyCTA/></div>}
