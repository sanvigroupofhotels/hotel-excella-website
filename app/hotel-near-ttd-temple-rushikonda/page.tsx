import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { StickyCTA } from "@/components/sticky-cta"
import { SeoLandingPage } from "@/components/seo/landing-page"
import { landingPages } from "@/lib/seo/content"
import { pageMetadata } from "@/lib/seo/site"

const page = landingPages.find((item) => item.slug === "hotel-near-ttd-temple-rushikonda")!

export const metadata: Metadata = pageMetadata({
  title: page.title,
  description: page.description,
  path: "/hotel-near-ttd-temple-rushikonda",
})

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <SeoLandingPage page={page} />
      </main>
      <Footer />
      <StickyCTA />
    </div>
  )
}
