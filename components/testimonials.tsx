'use client'

import { Star, Users, Heart } from 'lucide-react'

interface TestimonialProps {
  quote: string
  author: string
  role: string
  rating?: number
}

export function TestimonialCard({ quote, author, role, rating = 5 }: TestimonialProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-md">
      {/* Star Rating */}
      <div className="flex gap-1">
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-primary text-primary" />
        ))}
      </div>

      {/* Quote */}
      <p className="mt-4 text-muted-foreground leading-relaxed">"{quote}"</p>

      {/* Author */}
      <div className="mt-4 flex items-center gap-3 border-t border-border pt-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
          <Users className="h-5 w-5 text-primary" />
        </div>
        <div>
          <p className="font-semibold text-foreground">{author}</p>
          <p className="text-xs text-muted-foreground">{role}</p>
        </div>
      </div>
    </div>
  )
}

export function TestimonialsCarousel() {
  const testimonials: TestimonialProps[] = [
    {
      quote: 'Outstanding experience! Clean rooms, friendly staff, and excellent location near all attractions.',
      author: 'Rajesh M.',
      role: 'Family Traveler',
      rating: 5,
    },
    {
      quote: 'Best value for money hotel in Vizag. The direct booking team was super responsive.',
      author: 'Priya K.',
      role: 'Business Traveler',
      rating: 5,
    },
    {
      quote: 'Perfect for couples! Romantic ambiance with modern amenities. Highly recommended!',
      author: 'Amit & Neha',
      role: 'Honeymooners',
      rating: 5,
    },
    {
      quote: 'Spotless interiors and exceptional hospitality. Felt at home away from home.',
      author: 'Sarah L.',
      role: 'Solo Traveler',
      rating: 5,
    },
  ]

  return (
    <section className="py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.1em] text-primary">Guest Reviews</p>
          <h2 className="text-balance mt-3 font-serif text-3xl font-bold text-foreground lg:text-4xl">
            Loved by <span className="text-primary">Our Guests</span>
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">Real experiences from travelers who chose Hotel Excella.</p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((testimonial, idx) => (
            <TestimonialCard key={idx} {...testimonial} />
          ))}
        </div>

        <div className="mt-8 flex items-center justify-center gap-2">
          <Heart className="h-5 w-5 fill-primary text-primary" />
          <p className="text-center text-muted-foreground">
            4.8 out of 5 stars based on 200+ reviews • Book with confidence
          </p>
        </div>
      </div>
    </section>
  )
}
