import type { Metadata } from "next"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { StickyCTA } from "@/components/sticky-cta"
import { ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Gallery | Hotel Excella Vizag",
  description: "Browse through our gallery to see the beautiful interiors, rooms, and facilities at Hotel Excella Vizag.",
}

const galleryImages = [
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/exterior-nVoa2Cga1MFRzoV6YEywjt23i2QKvv.png",
    alt: "Hotel Excella Exterior - Modern Architecture",
    category: "Exterior",
    featured: true,
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/room1-gwtPWoLoADzaldmYrRdj4539Sv4Zli.jpg",
    alt: "Queen Executive Room - Comfortable Bed",
    category: "Rooms",
    featured: false,
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/room2-UfQMHpyryUBdNLST83IpWIvfh3PizR.jpg",
    alt: "King Executive Room - Spacious Layout",
    category: "Rooms",
    featured: false,
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dining-cjkV0vqP1I6CQ10QQEYvazUmhUKlTX.jpg",
    alt: "Dining Area - Modern Setup",
    category: "Dining",
    featured: false,
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/lobby-nEEo9EQvawS3OCTf8VMen4Ct2sycAS.jpg",
    alt: "Lobby Corridor - Clean Interiors",
    category: "Lobby",
    featured: false,
  },
]

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-card border-b border-border py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 text-center">
            <h1 className="font-serif text-4xl font-bold text-foreground lg:text-5xl">
              Photo <span className="text-primary">Gallery</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Take a visual tour of Hotel Excella. Explore our elegant spaces, comfortable rooms, and premium facilities.
            </p>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryImages.map((image, index) => (
                <div
                  key={image.src}
                  className={`group relative overflow-hidden rounded-2xl ${
                    image.featured ? "sm:col-span-2 lg:col-span-2 lg:row-span-2" : ""
                  }`}
                >
                  <div className={`relative ${image.featured ? "aspect-[16/10]" : "aspect-square"}`}>
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <span className="inline-block px-3 py-1 rounded-full bg-primary/90 text-xs font-medium text-primary-foreground">
                        {image.category}
                      </span>
                      <p className="mt-2 text-sm text-white font-medium">{image.alt}</p>
                    </div>
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
              Experience It <span className="text-primary">In Person</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground text-pretty">
              Pictures only tell half the story. Book your stay and experience the comfort of Hotel Excella.
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
