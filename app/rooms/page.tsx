import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { StickyCTA } from "@/components/sticky-cta"
import { 
  Wifi,
  Clock,
  Sparkles,
  Home,
  Bed,
  Users,
  Wind,
  Maximize,
  ArrowRight,
  CheckCircle
} from "lucide-react"

export const metadata: Metadata = {
  title: "Rooms | Hotel Excella Vizag",
  description: "Explore our comfortable and well-appointed rooms at Hotel Excella Vizag. Queen and King Executive rooms with modern amenities, free Wi-Fi, AC, and 24/7 service.",
}

const includedAmenities = [
  { icon: Wifi, label: "Free Wi-Fi" },
  { icon: Clock, label: "24 Hours Reception" },
  { icon: Sparkles, label: "Clean Rooms" },
  { icon: Home, label: "Free Daily Housekeeping" },
]

const rooms = [
  {
    name: "Queen Executive Room",
    description: "Comfortable queen bed room with a clean modern layout designed for couples, solo guests and families seeking a premium stay experience.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/room1-gwtPWoLoADzaldmYrRdj4539Sv4Zli.jpg",
    highlights: [
      { icon: Bed, label: "Queen Size Bed" },
      { icon: Users, label: "Suitable for Families" },
      { icon: Sparkles, label: "Elegant Interiors" },
      { icon: Wind, label: "Air Conditioned" },
      { icon: Maximize, label: "Smart Comfort Layout" },
    ],
  },
  {
    name: "King Executive Room",
    description: "Spacious king bed room offering elevated comfort, stylish interiors and a relaxing premium stay for couples, families and business travellers.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/room2-UfQMHpyryUBdNLST83IpWIvfh3PizR.jpg",
    highlights: [
      { icon: Bed, label: "King Size Bed" },
      { icon: Maximize, label: "Spacious Layout" },
      { icon: Sparkles, label: "Premium Comfort" },
      { icon: Wind, label: "Air Conditioned" },
      { icon: Home, label: "Modern Interiors" },
    ],
  },
]

export default function RoomsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-card border-b border-border py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 text-center">
            <h1 className="font-serif text-4xl font-bold text-foreground lg:text-5xl">
              Our <span className="text-primary">Rooms</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Experience comfort and elegance in our thoughtfully designed rooms. Each space is crafted for your perfect stay.
            </p>
          </div>
        </section>

        {/* Included Amenities Banner */}
        <section className="bg-primary/10 border-b border-primary/20 py-8">
          <div className="mx-auto max-w-7xl px-4">
            <p className="text-center text-sm font-medium text-primary mb-4 uppercase tracking-wider">
              Included with Every Room
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-12">
              {includedAmenities.map((amenity) => (
                <div
                  key={amenity.label}
                  className="flex items-center gap-2 text-foreground"
                >
                  <amenity.icon className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">{amenity.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Rooms */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4">
            <div className="space-y-16 lg:space-y-24">
              {rooms.map((room, index) => (
                <div
                  key={room.name}
                  className={`grid gap-8 lg:grid-cols-2 lg:gap-12 items-center ${
                    index % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  <div className={`${index % 2 === 1 ? "lg:order-2" : ""}`}>
                    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                      <Image
                        src={room.image}
                        alt={room.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  
                  <div className={`${index % 2 === 1 ? "lg:order-1" : ""}`}>
                    <h2 className="font-serif text-3xl font-bold text-foreground lg:text-4xl">
                      {room.name}
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                      {room.description}
                    </p>
                    
                    <div className="mt-8 space-y-4">
                      <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">
                        Room Highlights
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {room.highlights.map((highlight) => (
                          <div
                            key={highlight.label}
                            className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border"
                          >
                            <highlight.icon className="h-5 w-5 text-primary shrink-0" />
                            <span className="text-sm font-medium text-foreground">{highlight.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-8 p-4 rounded-xl bg-secondary/50 border border-border">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-foreground">All rooms include</p>
                          <p className="text-sm text-muted-foreground">
                            Free Wi-Fi, 24/7 Reception, Daily Housekeeping, Air Conditioning
                          </p>
                        </div>
                      </div>
                    </div>

                    <a
                      href="https://hotelexcella.bookmystay.io/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-lg hover:bg-primary/90 transition-all duration-300 hover:scale-105"
                    >
                      Book Now
                      <ArrowRight className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24 bg-card border-t border-border">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <h2 className="font-serif text-3xl font-bold text-foreground lg:text-4xl text-balance">
              Book Your <span className="text-primary">Perfect Room</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground text-pretty">
              Direct booking guarantees the best rates and instant confirmation.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://hotelexcella.bookmystay.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground shadow-lg hover:bg-primary/90 transition-all duration-300 hover:scale-105"
              >
                Book Now
                <ArrowRight className="h-5 w-5" />
              </a>
              <Link
                href="/prebook"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg border border-primary px-8 py-4 text-lg font-semibold text-primary hover:bg-primary/10 transition-all duration-300"
              >
                Check Availability
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <StickyCTA />
      
      <div className="h-16 lg:hidden" />
    </div>
  )
}
