import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { StickyCTA } from "@/components/sticky-cta"
import { FaqJsonLd } from "@/components/seo/json-ld"
import { CtaRow } from "@/components/seo/cta-row"
import { coreFaqs } from "@/lib/seo/content"
import { pageMetadata } from "@/lib/seo/site"

export const metadata: Metadata = pageMetadata({ title: "Hotel Excella FAQ", description: "Frequently asked questions about Hotel Excella near Beach Road, Rushikonda Beach, Kailasagiri, restaurants, WiFi, breakfast and family stays.", path: "/faq" })
export default function Page(){return <div className="min-h-screen bg-background"><FaqJsonLd faqs={coreFaqs}/><Header/><main className="pt-20"><section className="border-b border-border bg-card py-16 lg:py-24"><div className="mx-auto max-w-5xl px-4 text-center"><p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">FAQ</p><h1 className="mt-4 font-serif text-4xl font-bold text-foreground lg:text-6xl">Hotel Excella frequently asked questions</h1><p className="mx-auto mt-5 max-w-3xl text-lg text-muted-foreground">Quick answers about location, rooms, attractions, WiFi, breakfast and direct booking.</p></div></section><section className="py-16"><div className="mx-auto max-w-4xl px-4"><div className="grid gap-4">{coreFaqs.map((faq)=><details key={faq.question} className="rounded-xl border border-border bg-card p-5"><summary className="cursor-pointer font-semibold text-foreground">{faq.question}</summary><p className="mt-3 leading-7 text-muted-foreground">{faq.answer}</p></details>)}</div><div className="mt-10"><CtaRow center/></div></div></section></main><Footer/><StickyCTA/></div>}
