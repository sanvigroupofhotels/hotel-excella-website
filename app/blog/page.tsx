import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { StickyCTA } from "@/components/sticky-cta"
import { JsonLd } from "@/components/seo/json-ld"
import { site } from "@/lib/seo/constants"
import { breadcrumbSchema, hotelSchema } from "@/lib/seo/schema"
import { blogPosts } from "@/lib/seo/blog-posts"

export const metadata: Metadata = {
  title: "Vizag Travel Blog | Hotel Excella",
  description: "Travel guides from Hotel Excella covering places to visit in Vizag, family trips, Kailasagiri, Rushikonda Beach and nearby attractions.",
  alternates: { canonical: `${site.url}/blog` },
  openGraph: {
    title: "Vizag Travel Blog | Hotel Excella",
    description: "Plan your Vizag stay with local attraction guides from Hotel Excella.",
    url: `${site.url}/blog`,
    siteName: site.name,
    images: [{ url: site.image, width: 1200, height: 630, alt: "Hotel Excella Vizag" }],
    locale: "en_IN",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Vizag Travel Blog | Hotel Excella", description: "Plan your Vizag stay with local attraction guides.", images: [site.image] },
}

export default function BlogIndexPage() {
  return (
    <>
      <JsonLd data={[hotelSchema(), breadcrumbSchema([{ name: "Home", url: site.url }, { name: "Blog", url: `${site.url}/blog` }])]} />
      <Header />
      <main className="bg-background pb-24 text-foreground lg:pb-0">
        <section className="px-4 py-16 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-5xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-primary">Hotel Excella Blog</p>
            <h1 className="mt-5 font-serif text-4xl font-bold md:text-6xl">Vizag Travel Guides for Comfortable Stays</h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
              Explore attraction guides, family trip ideas and local travel planning tips for guests staying near Beach Road, Kailasagiri, Tenneti Park and Rushikonda.
            </p>
          </div>
        </section>
        <section className="px-4 pb-16 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <article key={post.slug} className="rounded-3xl border border-border bg-card p-6">
                <p className="text-sm text-muted-foreground">{post.date}</p>
                <h2 className="mt-3 font-serif text-2xl font-bold">{post.title}</h2>
                <p className="mt-4 text-sm leading-6 text-muted-foreground">{post.excerpt}</p>
                <Link href={`/blog/${post.slug}`} className="mt-6 inline-flex items-center gap-2 font-semibold text-primary hover:underline">
                  Read guide <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
      <StickyCTA />
    </>
  )
}
