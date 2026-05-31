import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { StickyCTA } from "@/components/sticky-cta"
import { 
  Wifi,
  Wind,
  Bath,
  Users,
  Heart,
  Briefcase,
  Clock,
  Sparkles,
  MapPin,
  CheckCircle,
  ArrowRight
} from "lucide-react"

export const metadata: Metadata = {
  title: "Amenities | Hotel Excella Vizag",
  description: "Discover the premium amenities at Hotel Excella Vizag. Free Wi-Fi, AC rooms, 24/7 reception, daily housekeeping, and more.",
}

const amenities = [
  {
    icon: Wifi,
    name: "Free Wi-Fi",
    description: "High-speed wireless internet access throughout the hotel for all your connectivity needs.",
  },
  {
    icon: Wind,
    name: "Air Conditioned Rooms",
    description: "All rooms feature modern air conditioning to ensure your comfort in every season.",
  },
  {
    icon: Bath,
    name: "Hygienic Bathrooms",
    description: "Clean and well-maintained bathrooms with modern fixtures and daily sanitation.",
  },
  {
    icon: Users,
    name: "Family Friendly Stay",
    description: "Comfortable accommodations designed for families with extra space and amenities.",
  },
  {
    icon: Heart,
    name: "Couple Friendly",
    description: "Welcoming atmosphere for couples with privacy and comfortable arrangements.",
  },
  {
    icon: Briefcase,
    name: "Business Friendly",
    description: "Ideal for business travelers with workspace, connectivity, and professional service.",
  },
  {
    icon: Clock,
    name: "24/7 Reception Support",
    description: "Round-the-clock front desk assistance for check-in, queries, and support.",
  },
  {
    icon: Sparkles,
    name: "Daily Housekeeping",
    description: "Complimentary room cleaning and maintenance to ensure a fresh and tidy stay.",
  },
  {
    icon: MapPin,
    name: "Prime Location",
    description: "Strategically located in Visalakshinagar with easy access to Vizag attractions.",
  },
  {
    icon: CheckCircle,
    name: "Smooth Check-in Experience",
    description: "Quick and hassle-free check-in process to start your stay without delays.",
  },
]

export default function AmenitiesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-card border-b border-border py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 text-center">
            <h1 className="font-serif text-4xl font-bold text-foreground lg:text-5xl">
              Our <span className="text-primary">Amenities</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Experience premium comfort with our comprehensive range of facilities and services designed for your perfect stay.
            </p>
          </div>
        </section>

        {/* Amenities Grid */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {amenities.map((amenity) => (
                <div
                  key={amenity.name}
                  className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <amenity.icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-foreground">
                    {amenity.name}
                  </h3>
                  <p className="mt-2 text-muted-foreground leading-relaxed">
                    {amenity.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Highlight Section */}
        <section className="py-16 lg:py-24 bg-card border-y border-border">
          <div className="mx-auto max-w-7xl px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-serif text-3xl font-bold text-foreground lg:text-4xl">
                  Everything You Need for a <span className="text-primary">Comfortable Stay</span>
                </h2>
                <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                  At Hotel Excella, we believe in providing comprehensive amenities that cater to every guest&apos;s needs. Whether you&apos;re traveling for business, a family vacation, or a romantic getaway, our facilities ensure you have everything you need.
                </p>
                <ul className="mt-8 space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-foreground">All amenities included at no extra charge</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-foreground">Premium quality and cleanliness standards</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-foreground">Friendly and professional staff support</span>
                  </li>
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 rounded-2xl bg-background border border-border text-center">
                  <div className="text-4xl font-bold text-primary">24/7</div>
                  <div className="mt-2 text-sm text-muted-foreground">Reception Support</div>
                </div>
                <div className="p-6 rounded-2xl bg-background border border-border text-center">
                  <div className="text-4xl font-bold text-primary">100%</div>
                  <div className="mt-2 text-sm text-muted-foreground">Clean Rooms</div>
                </div>
                <div className="p-6 rounded-2xl bg-background border border-border text-center">
                  <div className="text-4xl font-bold text-primary">Free</div>
                  <div className="mt-2 text-sm text-muted-foreground">High-Speed Wi-Fi</div>
                </div>
                <div className="p-6 rounded-2xl bg-background border border-border text-center">
                  <div className="text-4xl font-bold text-primary">Daily</div>
                  <div className="mt-2 text-sm text-muted-foreground">Housekeeping</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <h2 className="font-serif text-3xl font-bold text-foreground lg:text-4xl text-balance">
              Ready to Experience <span className="text-primary">Premium Comfort</span>?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground text-pretty">
              Book your stay today and enjoy all our amenities at the best direct rates.
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
