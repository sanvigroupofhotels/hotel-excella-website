import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { StickyCTA } from "@/components/sticky-cta"
import { BookingCTA } from "@/components/booking-cta"
import { JsonLd } from "@/components/seo/json-ld"
import { site } from "@/lib/seo/constants"
import { articleSchema, breadcrumbSchema, faqSchema, hotelSchema } from "@/lib/seo/schema"
import { blogPostBySlug, blogPosts } from "@/lib/seo/blog-posts"

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = blogPostBySlug.get(slug)
  if (!post) return {}
  const url = `${site.url}/blog/${post.slug}`
  return {
    title: post.metaTitle,
    description: post.description,
    alternates: { canonical: url },
    openGraph: { title: post.metaTitle, description: post.description, url, siteName: site.name, images: [{ url: site.image, width: 1200, height: 630, alt: post.title }], locale: "en_IN", type: "article" },
    twitter: { card: "summary_large_image", title: post.metaTitle, description: post.description, images: [site.image] },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = blogPostBySlug.get(slug)
  if (!post) notFound()
  const url = `${site.url}/blog/${post.slug}`
  return (
    <>
      <JsonLd data={[hotelSchema(), articleSchema(post), faqSchema(post.faqs), breadcrumbSchema([{ name: "Home", url: site.url }, { name: "Blog", url: `${site.url}/blog` }, { name: post.title, url }])]} />
      <Header />
      <main className="bg-background pb-24 text-foreground lg:pb-0">
        <article className="px-4 py-16 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-4xl">
            <Link href="/blog" className="text-sm font-semibold text-primary hover:underline">← Back to blog</Link>
            <p className="mt-8 text-sm font-semibold uppercase tracking-[0.35em] text-primary">Vizag Travel Guide</p>
            <h1 className="mt-5 font-serif text-4xl font-bold md:text-6xl">{post.title}</h1>
            <p className="mt-5 text-sm text-muted-foreground">Updated {post.date}</p>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">{post.description}</p>
<div className="mt-8"><BookingCTA /></div>
            <div className="mt-12 space-y-8">
              {post.sections.map((section) => (
                <section key={section.heading} className="rounded-3xl border border-border bg-card/70 p-6 md:p-8">
                  <h2 className="font-serif text-3xl font-bold">{section.heading}</h2>
                  <div className="mt-5 space-y-4 text-base leading-8 text-muted-foreground">{section.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
                </section>
              ))}
            </div>
            <section className="mt-10 rounded-3xl border border-border bg-card p-6 md:p-8">
              <h2 className="font-serif text-3xl font-bold">FAQ</h2>
              <div className="mt-6 divide-y divide-border">
                {post.faqs.map((faq) => (
                  <details key={faq.question} className="py-5"><summary className="cursor-pointer list-none font-semibold">{faq.question}</summary><p className="mt-3 text-muted-foreground">{faq.answer}</p></details>
                ))}
              </div>
            </section>
          </div>
        </article>
      </main>
      <Footer />
      <StickyCTA />
    </>
  )
}
