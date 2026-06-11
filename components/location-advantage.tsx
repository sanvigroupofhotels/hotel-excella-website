'use client'

import { MapPin, Navigation2, Utensils, ShoppingBag } from 'lucide-react'

interface LocationAdvantageProps {
  icon: React.ReactNode
  title: string
  distance: string
  description: string
}

function LocationCard({ icon, title, distance, description }: LocationAdvantageProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-md">
      {/* Background accent */}
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/5 transition-all duration-300 group-hover:bg-primary/10" />

      <div className="relative flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground">{title}</h3>
          <p className="mt-1 text-sm text-primary font-medium">{distance}</p>
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{description}</p>
        </div>
      </div>
    </div>
  )
}

export function LocationAdvantageSection() {
  const locations = [
    {
      icon: <Navigation2 className="h-6 w-6" />,
      title: 'Tenneti Park',
      distance: '~3 km away',
      description: 'Beautiful sea-facing park with scenic views, perfect for evening walks and photography.',
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: 'Kailasagiri',
      distance: '~8 km away',
      description: 'Popular hilltop attraction with cable car rides and panoramic city views.',
    },
    {
      icon: <Navigation2 className="h-6 w-6" />,
      title: 'Rushikonda Beach',
      distance: '~7 km away',
      description: 'Pristine beach spot for swimming, water sports, and sunset watching.',
    },
    {
      icon: <ShoppingBag className="h-6 w-6" />,
      title: 'Shopping & Dining',
      distance: '~2-5 km away',
      description: 'Close to major malls, restaurants, and local markets for dining and retail.',
    },
    {
      icon: <Utensils className="h-6 w-6" />,
      title: 'Local Cuisine',
      distance: 'Walking distance',
      description: 'Surrounded by authentic Andhra cuisine restaurants and beach-side cafes.',
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: 'Zoo Park',
      distance: '~10 km away',
      description: 'Family-friendly zoo with diverse wildlife and interactive animal exhibits.',
    },
  ]

  return (
    <section className="bg-background py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.1em] text-primary">Prime Location</p>
          <h2 className="text-balance mt-3 font-serif text-3xl font-bold text-foreground lg:text-4xl">
            Explore Vizag from <span className="text-primary">Hotel Excella</span>
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            Strategically located near all major attractions, beaches, and shopping destinations.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {locations.map((location, idx) => (
            <LocationCard key={idx} {...location} />
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-primary/30 bg-primary/5 p-6 text-center sm:p-8">
          <p className="text-base text-foreground">
            <span className="font-semibold">Convenience at Your Doorstep:</span> Beach access within 3-10 km, city center just 5 km away, shopping malls nearby, and public transport accessible.
          </p>
        </div>
      </div>
    </section>
  )
}
