import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { StickyCTA } from "@/components/sticky-cta"
import { CtaRow } from "@/components/seo/cta-row"
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/seo/json-ld"
import { GoogleMapSection } from "@/components/seo/map-section"
import { blogPosts, getBlogPost } from "@/lib/seo/blog"
import { attractions } from "@/lib/seo/content"
import { pageMetadata } from "@/lib/seo/site"

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) return {}
  return pageMetadata({ title: `${post.title} | Hotel Excella Blog`, description: post.description, path: `/blog/${post.slug}` })
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) notFound()
  return <div className="min-h-screen bg-background"><BreadcrumbJsonLd items={[{name:"Home",href:"/"},{name:"Blog",href:"/blog"},{name:post.title,href:`/blog/${post.slug}`}]}/><FaqJsonLd faqs={post.faqs}/><Header/><main className="pt-20"><article><section className="border-b border-border bg-card py-16 lg:py-24"><div className="mx-auto max-w-4xl px-4 text-center"><p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">{post.hero}</p><h1 className="mt-4 font-serif text-4xl font-bold text-foreground lg:text-6xl">{post.title}</h1><p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">{post.description}</p><p className="mt-4 text-sm text-primary">{post.readingTime}</p><div className="mt-8"><CtaRow center/></div></div></section><section className="py-16 lg:py-24"><div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-[1.2fr_0.8fr]"><div className="space-y-10">{post.sections.map((section)=><section key={section.heading} className="space-y-4"><h2 className="font-serif text-3xl font-bold text-foreground">{section.heading}</h2>{section.body.map((paragraph)=><p key={paragraph} className="leading-8 text-muted-foreground">{paragraph}</p>)}</section>)}<section className="space-y-4"><h2 className="font-serif text-3xl font-bold text-foreground">FAQs</h2>{post.faqs.map((faq)=><details key={faq.question} className="rounded-xl border border-border bg-card p-5"><summary className="cursor-pointer font-semibold text-foreground">{faq.question}</summary><p className="mt-3 text-muted-foreground">{faq.answer}</p></details>)}</section></div><aside className="space-y-6"><div className="rounded-2xl border border-primary/25 bg-card p-6"><h2 className="font-serif text-2xl font-bold text-foreground">Book Hotel Excella</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">Use Book Now for direct booking or WhatsApp Us for availability and pricing.</p><div className="mt-6"><CtaRow/></div></div><div className="rounded-2xl border border-border bg-card p-6"><h2 className="font-serif text-2xl font-bold text-foreground">Nearby attraction guides</h2><div className="mt-4 space-y-3">{attractions.map((attraction)=><Link key={attraction.name} href={attraction.slug} className="block rounded-xl border border-border p-3 text-sm text-muted-foreground transition hover:border-primary hover:text-primary">{attraction.name} · {attraction.distance}</Link>)}</div></div></aside></div></section></article><GoogleMapSection title="Map Hotel Excella for your Vizag trip" /></main><Footer/><StickyCTA/></div>
}
