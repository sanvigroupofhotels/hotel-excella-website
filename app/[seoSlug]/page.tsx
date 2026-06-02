import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight, CalendarDays, Clock, MapPin, MessageCircle } from "lucide-react"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { StickyCTA } from "@/components/sticky-cta"
import { JsonLd } from "@/components/seo/json-ld"
import { WhyChooseExcella } from "@/components/seo/why-choose-excella"
import { attractions, site } from "@/lib/seo/constants"
import { breadcrumbSchema, faqSchema, hotelSchema } from "@/lib/seo/schema"
import { landingPageBySlug, seoLandingPages } from "@/lib/seo/landing-pages"

type Props = { params: Promise<{ seoSlug: string }> }

export function generateStaticParams() {
  return seoLandingPages.map((page) => ({ seoSlug: page.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { seoSlug } = await params
  const page = landingPageBySlug.get(seoSlug)

  if (!page) return {}

  const url = `${site.url}/${page.slug}`

  return {
    title: page.metaTitle,
    description: page.description,
    alternates: { canonical: url },
    openGraph: {
      title: page.metaTitle,
      description: page.description,
      url,
      siteName: site.name,
      images: [{ url: site.image, width: 1200, height: 630, alt: `${site.name} exterior` }],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: page.metaTitle,
      description: page.description,
      images: [site.image],
    },
  }
}

export default async function SeoLandingPage({ params }: Props) {
  const { seoSlug } = await params
  const page = landingPageBySlug.get(seoSlug)

  if (!page) notFound()

  const url = `${site.url}/${page.slug}`
  const crumbs = [
    { name: "Home", url: site.url },
    { name: page.title.replace(" | Hotel Excella", ""), url },
  ]

  return (
    <>
      <JsonLd data={[hotelSchema(), faqSchema(page.faqs), breadcrumbSchema(crumbs)]} />
      <Header />
      <main className="bg-background pb-24 text-foreground lg:pb-0">
        <section className="border-b border-border bg-gradient-to-b from-card to-background px-4 py-16 lg:px-8 lg:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-primary">{page.heroEyebrow}</p>
              <h1 className="mt-5 font-serif text-4xl font-bold tracking-tight text-foreground md:text-6xl">
                {page.heroTitle}
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">{page.heroIntro}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={site.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:bg-primary/90"
                >
                  Book Now <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href={site.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-primary px-6 py-3 font-semibold text-primary transition hover:bg-primary/10"
                >
                  <MessageCircle className="h-4 w-4" /> WhatsApp Us
                </a>
              </div>
            </div>
            <div className="rounded-3xl border border-primary/20 bg-card p-6 shadow-2xl shadow-black/30">
              <h2 className="font-serif text-2xl font-bold text-foreground">Quick travel facts</h2>
              <div className="mt-6 grid gap-4">
                <Fact icon={MapPin} label="Hotel location" value="Vishalakshi Nagar, near Beach Road side of Vizag" />
                {page.attractionName && <Fact icon={CalendarDays} label="Approx. distance" value={`${page.distance} to ${page.attractionName}`} />}
                {page.driveTime && <Fact icon={Clock} label="Typical drive time" value={page.driveTime} />}
                <Fact icon={MapPin} label="Nearby attractions" value="Tenneti Park, Kailasagiri, Rushikonda Beach, TTD Temple Rushikonda, YSR View Point and Zoo Park" />
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-12 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.72fr_0.28fr]">
            <article className="space-y-8">
              {page.sections.map((section) => (
                <section key={section.heading} className="rounded-3xl border border-border bg-card/70 p-6 md:p-8">
                  <h2 className="font-serif text-3xl font-bold text-foreground">{section.heading}</h2>
                  <div className="mt-5 space-y-4 text-base leading-8 text-muted-foreground">
                    {section.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </section>
              ))}
            </article>

            <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-3xl border border-primary/20 bg-card p-6">
                <h2 className="font-serif text-2xl font-bold">Nearby attraction distances</h2>
                <div className="mt-5 space-y-3">
                  {attractions.map((attraction) => (
                    <Link
                      key={attraction.slug}
                      href={`/${attraction.slug}`}
                      className="block rounded-2xl border border-border bg-background/70 p-4 transition hover:border-primary/50"
                    >
                      <span className="font-semibold text-foreground">{attraction.name}</span>
                      <span className="mt-1 block text-sm text-muted-foreground">
                        {attraction.distance} • {attraction.driveTime}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="rounded-3xl border border-border bg-card p-6">
                <h2 className="font-serif text-2xl font-bold">Explore more</h2>
                <div className="mt-4 grid gap-3 text-sm">
                  <Link className="text-primary hover:underline" href="/places-to-visit-near-hotel-excella">
                    Attractions hub
                  </Link>
                  <Link className="text-primary hover:underline" href="/rooms/oak-room">
                    Oak Room SEO guide
                  </Link>
                  <Link className="text-primary hover:underline" href="/rooms/mapple-room">
                    Mapple Room SEO guide
                  </Link>
                  <Link className="text-primary hover:underline" href="/about-hotel-excella">
                    About Hotel Excella
                  </Link>
                  <Link className="text-primary hover:underline" href="/why-book-direct">
                    Why book direct
                  </Link>
                  <Link className="text-primary hover:underline" href="/dining-options-near-hotel-excella">
                    Dining options nearby
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className="px-4 py-8 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <WhyChooseExcella />
          </div>
        </section>
        <section className="px-4 py-10 lg:px-8">
          <div className="mx-auto max-w-7xl rounded-3xl border border-border bg-card p-6 md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Essential Hotel Excella links</p>
            <h2 className="mt-3 font-serif text-3xl font-bold">Plan your stay with confidence</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
              {[
                ["Home", "/"],
                ["Rooms", "/rooms"],
                ["Amenities", "/amenities"],
                ["Gallery", "/gallery"],
                ["Location", "/location"],
                ["Contact", "/contact"],
              ].map(([label, href]) => (
                <Link key={href} href={href} className="rounded-2xl border border-border bg-background/70 px-4 py-3 text-center font-semibold text-foreground transition hover:border-primary/50 hover:text-primary">
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </section>


        <section className="px-4 py-12 lg:px-8">
          <div className="mx-auto max-w-4xl rounded-3xl border border-border bg-card p-6 md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Local FAQ</p>
            <h2 className="mt-3 font-serif text-3xl font-bold">Questions guests ask before booking</h2>
            <div className="mt-6 divide-y divide-border">
              {page.faqs.map((faq) => (
                <details key={faq.question} className="group py-5">
                  <summary className="cursor-pointer list-none font-semibold text-foreground marker:hidden">
                    {faq.question}
                  </summary>
                  <p className="mt-3 text-muted-foreground">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-12 lg:px-8">
          <div className="mx-auto max-w-5xl rounded-3xl bg-primary p-8 text-center text-primary-foreground md:p-12">
            <h2 className="font-serif text-3xl font-bold md:text-4xl">Ready to plan your comfortable stay in Vizag?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/80">
              Book direct with Hotel Excella or message us on WhatsApp to check room availability and pricing.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href={site.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-background px-6 py-3 font-semibold text-foreground"
              >
                Book Now
              </a>
              <a
                href={site.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-primary-foreground/40 px-6 py-3 font-semibold"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <StickyCTA />
    </>
  )
}

function Fact({ icon: Icon, label, value }: { icon: typeof MapPin; label: string; value: string }) {
  return (
    <div className="flex gap-3 rounded-2xl border border-border bg-background/70 p-4">
      <Icon className="mt-1 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">{label}</p>
        <p className="mt-1 text-sm font-medium text-foreground">{value}</p>
      </div>
    </div>
  )
}
