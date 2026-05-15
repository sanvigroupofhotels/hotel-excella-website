"use client"

import React from "react"

interface RoomQuote {
  name: string
  guests: number
  roomRate: number
  earlyCheckIn?: number
  lateCheckOut?: number
  petCharges?: number
  extraBed?: number
}

const roomQuotes: RoomQuote[] = [
  {
    name: "Queen Executive (Oak)",
    guests: 2,
    roomRate: 4500,
    earlyCheckIn: 500,
    lateCheckOut: 500,
  },
  {
    name: "King Executive (Maple)",
    guests: 2,
    roomRate: 5500,
    petCharges: 1000,
    extraBed: 800,
  },
]

const calculateTotal = (room: RoomQuote) =>
  room.roomRate +
  (room.earlyCheckIn || 0) +
  (room.lateCheckOut || 0) +
  (room.petCharges || 0) +
  (room.extraBed || 0)

export default function QuotePage() {
  const grandTotal = roomQuotes.reduce(
    (acc, room) => acc + calculateTotal(room),
    0
  )

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold text-yellow-400 mb-2">
            Guest Quote
          </h1>
          <p className="text-gray-400 text-lg">
            Review your booking details and price breakdown
          </p>
        </div>

        {/* Room Cards */}
        <div className="space-y-8">
          {roomQuotes.map((room, idx) => (
            <div
              key={idx}
              className="bg-gray-800 p-6 rounded-2xl shadow-md border border-gray-700 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
            >
              <h2 className="text-2xl font-semibold text-yellow-400 mb-2">
                {room.name}
              </h2>
              <p className="text-gray-300 mb-2"># of Guests: {room.guests}</p>

              <div className="space-y-1 mb-2 text-gray-300">
                {room.earlyCheckIn && (
                  <p>Early Check-In: ₹{room.earlyCheckIn}</p>
                )}
                {room.lateCheckOut && (
                  <p>Late Check-Out: ₹{room.lateCheckOut}</p>
                )}
                {room.petCharges && <p>Pet Charges: ₹{room.petCharges}</p>}
                {room.extraBed && <p>Extra Bed: ₹{room.extraBed}</p>}
              </div>

              <p className="text-xl font-bold text-gray-100">
                Room Rate: ₹{room.roomRate}
              </p>

              {idx !== roomQuotes.length - 1 && (
                <hr className="border-gray-700 mt-4" />
              )}
            </div>
          ))}
        </div>

        {/* Total Price */}
        <div className="mt-12 bg-gray-800 p-6 rounded-2xl shadow-md border border-gray-700 text-center">
          <h3 className="text-2xl font-semibold text-yellow-400 mb-2">
            Grand Total
          </h3>
          <p className="text-xl text-gray-100 font-bold">₹{grandTotal}</p>
        </div>

        {/* Print Button */}
        <div className="mt-8 text-center">
          <button
            onClick={handlePrint}
            className="bg-yellow-400 text-gray-900 font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-yellow-500 transition-colors duration-300"
          >
            Print Quote
          </button>
        </div>
      </div>
    </div>
  )
}
