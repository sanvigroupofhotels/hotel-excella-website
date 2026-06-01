import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { StickyCTA } from "@/components/sticky-cta"
import { BookingCTA } from "@/components/booking-cta"
import { JsonLd } from "@/components/seo/json-ld"
import { WhyChooseExcella } from "@/components/seo/why-choose-excella"
import { attractions, site } from "@/lib/seo/constants"
import { breadcrumbSchema, faqSchema, hotelSchema } from "@/lib/seo/schema"
import { roomPageBySlug, roomSeoPages } from "@/lib/seo/room-pages"

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return roomSeoPages.map((page) => ({ slug: page.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const page = roomPageBySlug.get(slug)
  if (!page) return {}
  const url = `${site.url}/rooms/${page.slug}`
  return {
    title: page.metaTitle,
    description: page.description,
    alternates: { canonical: url },
    openGraph: {
      title: page.metaTitle,
      description: page.description,
      url,
      siteName: site.name,
      images: [{ url: page.image, width: 1200, height: 630, alt: `${page.roomName} at Hotel Excella` }],
      locale: "en_IN",
      type: "website",
    },
    twitter: { card: "summary_large_image", title: page.metaTitle, description: page.description, images: [page.image] },
  }
}

export default async function RoomSeoPage({ params }: Props) {
  const { slug } = await params
  const page = roomPageBySlug.get(slug)
  if (!page) notFound()

  const url = `${site.url}/rooms/${page.slug}`
  return (
    <>
      <JsonLd
        data={[
          hotelSchema(),
          faqSchema(page.faqs),
          breadcrumbSchema([
            { name: "Home", url: site.url },
            { name: "Rooms", url: `${site.url}/rooms` },
            { name: page.roomName, url },
          ]),
        ]}
      />
      <Header />
      <main className="bg-background pb-24 text-foreground lg:pb-0">
        <section className="px-4 py-16 lg:px-8 lg:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-primary">Room SEO Guide</p>
              <h1 className="mt-5 font-serif text-4xl font-bold md:text-6xl">{page.title}</h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">{page.intro}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {page.targetKeywords.map((keyword) => (
                  <span key={keyword} className="rounded-full border border-primary/30 px-4 py-2 text-sm text-primary">
                    {keyword}
                  </span>
                ))}
              </div>
<div className="mt-8"><BookingCTA /></div>
            </div>
            <div className="overflow-hidden rounded-3xl border border-primary/20 bg-card">
              <Image src={page.image} alt={`${page.roomName} at Hotel Excella`} width={900} height={650} className="h-full w-full object-cover" priority />
            </div>
          </div>
        </section>

        <section className="px-4 py-10 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.7fr_0.3fr]">
            <article className="space-y-8">
              {page.content.map((section) => (
                <section key={section.heading} className="rounded-3xl border border-border bg-card/70 p-6 md:p-8">
                  <h2 className="font-serif text-3xl font-bold">{section.heading}</h2>
                  <div className="mt-5 space-y-4 text-base leading-8 text-muted-foreground">
                    {section.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </section>
              ))}
            </article>
            <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-3xl border border-border bg-card p-6">
                <h2 className="font-serif text-2xl font-bold">Nearby attractions</h2>
                <div className="mt-5 space-y-3">
                  {attractions.map((attraction) => (
                    <Link key={attraction.slug} href={`/${attraction.slug}`} className="block rounded-2xl border border-border bg-background/70 p-4 hover:border-primary/50">
                      <span className="font-semibold">{attraction.name}</span>
                      <span className="mt-1 block text-sm text-muted-foreground">{attraction.distance} • {attraction.driveTime}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className="px-4 py-8 lg:px-8"><div className="mx-auto max-w-7xl"><WhyChooseExcella /></div></section>

        <section className="px-4 py-12 lg:px-8">
          <div className="mx-auto max-w-4xl rounded-3xl border border-border bg-card p-6 md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Room FAQ</p>
            <h2 className="mt-3 font-serif text-3xl font-bold">Before you book {page.roomName}</h2>
            <div className="mt-6 divide-y divide-border">
              {page.faqs.map((faq) => (
                <details key={faq.question} className="py-5">
                  <summary className="cursor-pointer list-none font-semibold">{faq.question}</summary>
                  <p className="mt-3 text-muted-foreground">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <StickyCTA />
    </>
  )
}
