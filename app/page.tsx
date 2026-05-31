import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { StickyCTA } from "@/components/sticky-cta"
import {
  MapPin,
  Shield,
  Users,
  Calendar,
  Wifi,
  Clock,
  Sparkles,
  Home,
  MessageCircle,
  ArrowRight,
  ClipboardCheck,
} from "lucide-react"

const bookingUrl = "https://hotelexcella.bookmystay.io/"

const valueCards = [
  {
    icon: MapPin,
    title: "Prime Vizag Location",
    description: "Near beach and city hotspots",
  },
  {
    icon: Shield,
    title: "Hygienic Stays",
    description: "Sanitized rooms, cleaned daily",
  },
  {
    icon: Users,
    title: "Family Friendly",
    description: "Comfortable for couples and families",
  },
  {
    icon: Calendar,
    title: "Direct Booking",
    description: "Fast confirmations",
  },
  {
    icon: Wifi,
    title: "High-Speed Wi-Fi",
    description: "Reliable internet",
  },
  {
    icon: Clock,
    title: "24x7 Reception",
    description: "Front desk anytime",
  },
  { icon: Sparkles, title: "Spotless Interiors", description: "Clean, bright, and modern" },
  { icon: Home, title: "Daily Housekeeping", description: "Fresh linens and tidy rooms" },
  { icon: ClipboardCheck, title: "Easy Enquiry", description: "Quick support before your stay" },
]

const rooms = [
  {
    name: "Queen Executive Room",
    description:
      "Comfortable queen bed room with a clean modern layout designed for couples, solo guests and families seeking a premium stay experience.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/room1-gwtPWoLoADzaldmYrRdj4539Sv4Zli.jpg",
    highlights: ["Queen Size Bed", "Family Friendly", "Air Conditioned"],
  },
  {
    name: "King Executive Room",
    description:
      "Spacious king bed room offering elevated comfort, stylish interiors and a relaxing premium stay for couples, families and business travellers.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/room2-UfQMHpyryUBdNLST83IpWIvfh3PizR.jpg",
    highlights: ["King Size Bed", "Spacious Layout", "Premium Comfort"],
  },
]

const galleryImages = [
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/exterior-nVoa2Cga1MFRzoV6YEywjt23i2QKvv.png",
    alt: "Hotel Excella Exterior",
    className: "lg:col-span-2 lg:row-span-2",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/room1-gwtPWoLoADzaldmYrRdj4539Sv4Zli.jpg",
    alt: "Queen Executive Room",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/room2-UfQMHpyryUBdNLST83IpWIvfh3PizR.jpg",
    alt: "King Executive Room",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dining-cjkV0vqP1I6CQ10QQEYvazUmhUKlTX.jpg",
    alt: "Dining Area",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/lobby-nEEo9EQvawS3OCTf8VMen4Ct2sycAS.jpg",
    alt: "Lobby Area",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <section className="relative flex min-h-[84vh] items-center pt-20 sm:pt-24">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/exterior-nVoa2Cga1MFRzoV6YEywjt23i2QKvv.png"
              alt="Hotel Excella Exterior - Premium Hotel in Vizag"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
          </div>

          <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-16 sm:py-20 lg:py-24">
            <div className="max-w-3xl text-left">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#f2d28f]">Premium Boutique Stay</p>
              <h1 className="mt-3 font-serif text-[2.15rem] leading-[1.08] font-semibold tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.65)] sm:text-[2.7rem] lg:text-[3.35rem]">
                Welcome to <span className="text-[#f2d28f]">Hotel Excella</span>
              </h1>
              <p className="mt-4 max-w-2xl text-[1.02rem] leading-relaxed text-white/90 sm:text-[1.13rem]">
                Premium comfort in the heart of Vizag with elegant rooms, warm service, and a seamless booking experience.
              </p>

              <div className="mt-8 flex items-center">
                <Link
                  href="/prebook"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-primary bg-secondary px-6 py-3 text-base font-semibold text-secondary-foreground shadow-lg shadow-black/20 transition-all duration-300 hover:bg-primary/10"
                >
                  <ClipboardCheck className="h-4 w-4" />
                  Enquiry
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="pt-10 pb-8 lg:pt-12 lg:pb-10">
          <div className="mx-auto max-w-7xl px-4">
            <div className="text-center">
              <h2 className="font-serif text-3xl font-bold text-foreground lg:text-4xl">
                Why Choose <span className="text-primary">Hotel Excella</span>
              </h2>
              <p className="mt-3 text-base text-muted-foreground lg:text-lg">
                Thoughtfully designed features and hospitality that make every stay exceptional.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-2.5 sm:gap-3.5 lg:gap-4">
              {valueCards.map((card) => (
                <div
                  key={card.title}
                  className="group rounded-lg border border-border bg-card p-2 text-left shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-md sm:rounded-xl sm:p-3 lg:rounded-2xl lg:p-4"
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground sm:h-9 sm:w-9 sm:rounded-lg">
                    <card.icon className="h-3.5 w-3.5 sm:h-4.5 sm:w-4.5 lg:h-5 lg:w-5" />
                  </div>
                  <h3 className="mt-2 text-[11px] leading-snug font-semibold text-foreground sm:mt-2.5 sm:text-sm lg:text-base">
                    {card.title}
                  </h3>
                  <p className="mt-1 text-[10px] leading-snug text-muted-foreground sm:text-xs sm:leading-relaxed lg:text-sm">
                    {card.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-card pt-8 pb-12 lg:pt-10 lg:pb-14">
          <div className="mx-auto max-w-7xl px-4">
            <div className="text-center">
              <h2 className="font-serif text-3xl font-bold text-foreground lg:text-4xl">
                Our <span className="text-primary">Rooms</span>
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">Comfortable spaces designed for your perfect stay.</p>
            </div>

            <div className="mt-8 grid gap-8 lg:mt-10 lg:grid-cols-2">
              {rooms.map((room) => (
                <div
                  key={room.name}
                  className="group overflow-hidden rounded-2xl border border-border bg-background shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-lg"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image src={room.image} alt={room.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-2xl font-bold text-foreground">{room.name}</h3>
                    <p className="mt-2 text-muted-foreground">{room.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {room.highlights.map((highlight) => (
                        <span
                          key={highlight}
                          className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                    <Link
                      href="/prebook"
                      className="mt-6 inline-flex items-center gap-2 rounded-lg border border-primary bg-secondary px-6 py-3 text-sm font-semibold text-secondary-foreground transition-all duration-300 hover:bg-primary/10"
                    >
                      <ClipboardCheck className="h-4 w-4" />
                      Enquiry
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="pt-8 pb-10 lg:pt-10 lg:pb-12">
          <div className="mx-auto max-w-7xl px-4 text-center">
            <h2 className="font-serif text-3xl font-bold text-foreground lg:text-4xl">
              Experience <span className="text-primary">Hotel Excella</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">Take a glimpse of our premium facilities and warm hospitality.</p>
            <div className="mt-8 grid grid-cols-2 gap-4 lg:mt-10 lg:grid-cols-4">
              {galleryImages.map((image) => (
                <div
                  key={image.alt}
                  className={`group relative aspect-square overflow-hidden rounded-2xl ${image.className ?? ""}`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </div>
              ))}
            </div>

            <div className="mt-10 text-center lg:mt-12">
              <Link
                href="/gallery"
                className="inline-flex items-center gap-2 text-lg font-medium text-primary transition-colors hover:text-primary/80"
              >
                View Full Gallery
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-card pt-8 pb-12 lg:pt-10 lg:pb-16">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <h2 className="text-balance font-serif text-3xl font-bold text-foreground lg:text-4xl">
              Ready for a <span className="text-primary">Premium Stay</span> in Vizag?
            </h2>
            <p className="mt-4 text-pretty text-lg text-muted-foreground">
              Book directly with us for the best rates, faster confirmation, and trusted support.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/prebook"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-primary px-8 py-4 text-lg font-semibold text-primary transition-all duration-300 hover:bg-primary/10 sm:w-auto"
              >
                <ClipboardCheck className="h-5 w-5" />
                Enquiry
              </Link>
              <a
                href={bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground shadow-lg transition-all duration-300 hover:bg-primary/90 sm:w-auto"
              >
                <Calendar className="h-5 w-5" />
                Instant Booking
              </a>
              <a
                href="https://wa.me/919985908131"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:bg-green-700 sm:w-auto"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp
              </a>
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
