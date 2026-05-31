import type { Metadata } from "next"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { StickyCTA } from "@/components/sticky-cta"
import { 
  MapPin,
  Navigation,
  Waves,
  TreePine,
  Mountain,
  ArrowRight,
  ExternalLink
} from "lucide-react"

export const metadata: Metadata = {
  title: "Location | Hotel Excella Vizag",
  description: "Find Hotel Excella in Visalakshinagar, Visakhapatnam. Conveniently located near Beach Road, Tenneti Park, and Kailasagiri.",
}

const nearbyAttractions = [
  {
    icon: Waves,
    name: "Beach Road",
    description: "Famous beach promenade with stunning sea views and coastal vibes.",
  },
  {
    icon: TreePine,
    name: "Tenneti Park",
    description: "Beautiful hilltop park offering panoramic views of the city and sea.",
  },
  {
    icon: Mountain,
    name: "Kailasagiri",
    description: "Popular hilltop park with the iconic Shiva-Parvati statues and cable car.",
  },
]

export default function LocationPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-card border-b border-border py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 text-center">
            <h1 className="font-serif text-4xl font-bold text-foreground lg:text-5xl">
              Our <span className="text-primary">Location</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Strategically located in the heart of Vizag with easy access to major attractions and business centers.
            </p>
          </div>
        </section>

        {/* Address Section */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Map Embed / Image */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/exterior-nVoa2Cga1MFRzoV6YEywjt23i2QKvv.png"
                  alt="Hotel Excella Exterior"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <a
                    href="https://maps.app.goo.gl/C4MScoYMJLYnc3Gz6?g_st=ac"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-base font-semibold text-primary-foreground hover:bg-primary/90 transition-all duration-300"
                  >
                    <Navigation className="h-5 w-5" />
                    Open in Google Maps
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>

              {/* Address Details */}
              <div>
                <div className="flex items-start gap-4 p-6 rounded-2xl bg-card border border-border">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-foreground">Hotel Excella</h2>
                    <address className="mt-2 text-muted-foreground not-italic leading-relaxed">
                      386 Revenue Employees Co-operative Society Colony,
                      <br />
                      VisalakshiNagar,
                      <br />
                      Visakhapatnam, Andhra Pradesh 530043
                    </address>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-foreground">Why Our Location?</h3>
                  <ul className="mt-4 space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 shrink-0">
                        <span className="text-xs font-bold text-primary">✓</span>
                      </div>
                      <span className="text-muted-foreground">Prime residential area with peaceful surroundings</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 shrink-0">
                        <span className="text-xs font-bold text-primary">✓</span>
                      </div>
                      <span className="text-muted-foreground">Easy access to major Vizag attractions</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 shrink-0">
                        <span className="text-xs font-bold text-primary">✓</span>
                      </div>
                      <span className="text-muted-foreground">Well-connected to business districts</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 shrink-0">
                        <span className="text-xs font-bold text-primary">✓</span>
                      </div>
                      <span className="text-muted-foreground">Nearby restaurants and shopping options</span>
                    </li>
                  </ul>
                </div>

                <a
                  href="https://maps.app.goo.gl/C4MScoYMJLYnc3Gz6?g_st=ac"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center gap-2 rounded-lg bg-secondary px-6 py-3 text-base font-semibold text-secondary-foreground border border-border hover:bg-secondary/80 transition-all duration-300"
                >
                  <Navigation className="h-5 w-5" />
                  Get Directions
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Nearby Attractions */}
        <section className="py-16 lg:py-24 bg-card border-y border-border">
          <div className="mx-auto max-w-7xl px-4">
            <div className="text-center">
              <h2 className="font-serif text-3xl font-bold text-foreground lg:text-4xl">
                Nearby <span className="text-primary">Attractions</span>
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Explore the best of Vizag with our conveniently located hotel.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {nearbyAttractions.map((attraction) => (
                <div
                  key={attraction.name}
                  className="group p-6 rounded-2xl bg-background border border-border hover:border-primary/50 transition-all duration-300"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <attraction.icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-foreground">
                    {attraction.name}
                  </h3>
                  <p className="mt-2 text-muted-foreground">
                    {attraction.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <h2 className="font-serif text-3xl font-bold text-foreground lg:text-4xl text-balance">
              Stay at the <span className="text-primary">Heart of Vizag</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground text-pretty">
              Book your stay at Hotel Excella and explore the best of Visakhapatnam.
            </p>
            <a
              href="https://hotelexcella.bookmystay.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground shadow-lg hover:bg-primary/90 transition-all duration-300 hover:scale-105"
            >
              Book Your Stay
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </section>
      </main>

      <Footer />
      <StickyCTA />
      
      <div className="h-16 lg:hidden" />
    </div>
  )
}
