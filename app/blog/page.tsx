import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { StickyCTA } from "@/components/sticky-cta"
import { CtaRow } from "@/components/seo/cta-row"
import { BreadcrumbJsonLd } from "@/components/seo/json-ld"
import { blogPosts } from "@/lib/seo/blog"
import { pageMetadata } from "@/lib/seo/site"

export const metadata: Metadata = pageMetadata({ title: "Vizag Travel Blog | Hotel Excella", description: "Travel guides for Vizag attractions near Hotel Excella including Kailasagiri, Rushikonda Beach, family trips and things to do.", path: "/blog" })

export default function BlogPage() {
  return <div className="min-h-screen bg-background"><BreadcrumbJsonLd items={[{name:"Home",href:"/"},{name:"Blog",href:"/blog"}]}/><Header/><main className="pt-20"><section className="border-b border-border bg-card py-16 lg:py-24"><div className="mx-auto max-w-5xl px-4 text-center"><p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Vizag travel guides</p><h1 className="mt-4 font-serif text-4xl font-bold text-foreground lg:text-6xl">Hotel Excella Blog</h1><p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">Practical guides for planning comfortable stays near Beach Road, Kailasagiri, Tenneti Park, Rushikonda Beach and major Vizag attractions.</p><div className="mt-8"><CtaRow center/></div></div></section><section className="py-16 lg:py-24"><div className="mx-auto grid max-w-7xl gap-6 px-4 md:grid-cols-2 lg:grid-cols-3">{blogPosts.map((post)=><Link key={post.slug} href={`/blog/${post.slug}`} className="rounded-2xl border border-border bg-card p-6 transition hover:border-primary/60"><p className="text-sm font-semibold text-primary">{post.readingTime}</p><h2 className="mt-3 font-serif text-2xl font-bold text-foreground">{post.title}</h2><p className="mt-3 leading-7 text-muted-foreground">{post.description}</p><span className="mt-5 inline-flex text-sm font-bold text-primary">Read guide →</span></Link>)}</div></section></main><Footer/><StickyCTA/></div>
}
