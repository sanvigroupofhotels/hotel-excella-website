import React from "react"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { StickyCTA } from "@/components/sticky-cta"

type Room = {
  name: string
  type: string
  rate: number
  guests: number
  extraBed?: number
  earlyCheckIn?: number
  lateCheckOut?: number
  petCharges?: number
}

const rooms: Room[] = [
  {
    name: "Queen Executive",
    type: "Oak",
    rate: 4500,
    guests: 2,
    earlyCheckIn: 500,
    lateCheckOut: 500,
  },
  {
    name: "King Executive",
    type: "Maple",
    rate: 5500,
    guests: 2,
    petCharges: 1000,
    extraBed: 800,
  },
]

export default function QuotePage() {
  const totalPrice = rooms.reduce((acc, room) => {
    return (
      acc +
      room.rate +
      (room.extraBed ?? 0) +
      (room.earlyCheckIn ?? 0) +
      (room.lateCheckOut ?? 0) +
      (room.petCharges ?? 0)
    )
  }, 0)

  return (
    <div className="min-h-screen bg-background text-white">
      <Header />

      <main className="pt-20 px-4 lg:px-24">
        <section className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-serif font-bold text-primary">
            Guest Quote
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Review your booking details and price breakdown
          </p>
        </section>

        <section className="space-y-8">
          {rooms.map((room, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl p-6 shadow-lg border border-border"
            >
              <h2 className="text-2xl font-semibold mb-2">
                {room.name} ({room.type})
              </h2>
              <p className="text-muted-foreground mb-2">
                # of Guests: {room.guests}
              </p>

              <div className="text-sm space-y-1">
                {room.earlyCheckIn && (
                  <p>Early Check-In: ₹{room.earlyCheckIn}</p>
                )}
                {room.lateCheckOut && <p>Late Check-Out: ₹{room.lateCheckOut}</p>}
                {room.petCharges && <p>Pet Charges: ₹{room.petCharges}</p>}
                {room.extraBed && <p>Extra Bed: ₹{room.extraBed}</p>}
              </div>

              <div className="mt-2 text-lg font-medium">
                Room Rate: ₹{room.rate}
              </div>
            </div>
          ))}
        </section>

        <section className="mt-12 text-right">
          <p className="text-xl font-semibold">
            Total Price: <span className="text-primary">₹{totalPrice}</span>
          </p>
        </section>

        <section className="mt-12 text-center">
          <button className="bg-primary text-primary-foreground px-8 py-4 rounded-lg shadow-lg hover:bg-primary/90 transition-all duration-300">
            Confirm Quote
          </button>
        </section>
      </main>

      <Footer />
      <StickyCTA />
    </div>
  )
}
