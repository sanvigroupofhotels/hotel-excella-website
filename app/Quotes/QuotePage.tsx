import { useState } from "react"

interface QuoteData {
  roomType: string
  guests: number
  basePrice: number
  extraBed?: number
  earlyCheckIn?: number
  lateCheckOut?: number
  petCharges?: number
  total: number
}

export default function QuotePage() {
  const [roomType, setRoomType] = useState("Queen Executive (Oak)")
  const [guests, setGuests] = useState(1)
  const [extraBed, setExtraBed] = useState(0)
  const [earlyCheckIn, setEarlyCheckIn] = useState(0)
  const [lateCheckOut, setLateCheckOut] = useState(0)
  const [petCharges, setPetCharges] = useState(0)

  const basePrices = {
    "Queen Executive (Oak)": 3500,
    "King Executive (Mapple)": 4500,
  }

  const total =
    basePrices[roomType] +
    extraBed +
    earlyCheckIn +
    lateCheckOut +
    petCharges

  const quote: QuoteData = {
    roomType,
    guests,
    basePrice: basePrices[roomType],
    extraBed: extraBed > 0 ? extraBed : undefined,
    earlyCheckIn: earlyCheckIn > 0 ? earlyCheckIn : undefined,
    lateCheckOut: lateCheckOut > 0 ? lateCheckOut : undefined,
    petCharges: petCharges > 0 ? petCharges : undefined,
    total,
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans p-6">
      <h1 className="text-3xl font-bold mb-6">Guest Quote Generator</h1>

      {/* Room & Guest Selection */}
      <div className="bg-gray-800 p-6 rounded-lg mb-6 space-y-4">
        <div>
          <label className="block font-medium mb-1">Select Room</label>
          <select
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-gray-100"
          >
            <option>Queen Executive (Oak)</option>
            <option>King Executive (Mapple)</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1"># of Guests</label>
          <input
            type="number"
            value={guests}
            min={1}
            max={10}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="w-full p-2 rounded bg-gray-700 text-gray-100"
          />
        </div>
      </div>

      {/* Optional Charges */}
      <div className="bg-gray-800 p-6 rounded-lg mb-6 space-y-4">
        <h2 className="text-xl font-semibold mb-2">Optional Charges</h2>

        <div>
          <label className="block mb-1">Extra Bed (₹)</label>
          <input
            type="number"
            min={0}
            value={extraBed}
            onChange={(e) => setExtraBed(Number(e.target.value))}
            className="w-full p-2 rounded bg-gray-700 text-gray-100"
          />
        </div>

        <div>
          <label className="block mb-1">Early Check-In (₹)</label>
          <input
            type="number"
            min={0}
            value={earlyCheckIn}
            onChange={(e) => setEarlyCheckIn(Number(e.target.value))}
            className="w-full p-2 rounded bg-gray-700 text-gray-100"
          />
        </div>

        <div>
          <label className="block mb-1">Late Check-Out (₹)</label>
          <input
            type="number"
            min={0}
            value={lateCheckOut}
            onChange={(e) => setLateCheckOut(Number(e.target.value))}
            className="w-full p-2 rounded bg-gray-700 text-gray-100"
          />
        </div>

        <div>
          <label className="block mb-1">Pet Charges (₹)</label>
          <input
            type="number"
            min={0}
            value={petCharges}
            onChange={(e) => setPetCharges(Number(e.target.value))}
            className="w-full p-2 rounded bg-gray-700 text-gray-100"
          />
        </div>
      </div>

      {/* Price Breakdown */}
      <div className="bg-gray-800 p-6 rounded-lg mb-6 space-y-3">
        <h2 className="text-xl font-semibold">Price Breakdown</h2>
        <div className="flex justify-between">
          <span>{quote.roomType}</span>
          <span>₹{quote.basePrice}</span>
        </div>
        {quote.extraBed && (
          <div className="flex justify-between">
            <span>Extra Bed</span>
            <span>₹{quote.extraBed}</span>
          </div>
        )}
        {quote.earlyCheckIn && (
          <div className="flex justify-between">
            <span>Early Check-In</span>
            <span>₹{quote.earlyCheckIn}</span>
          </div>
        )}
        {quote.lateCheckOut && (
          <div className="flex justify-between">
            <span>Late Check-Out</span>
            <span>₹{quote.lateCheckOut}</span>
          </div>
        )}
        {quote.petCharges && (
          <div className="flex justify-between">
            <span>Pet Charges</span>
            <span>₹{quote.petCharges}</span>
          </div>
        )}

        <div className="flex justify-between font-bold text-lg border-t border-gray-600 pt-2 mt-2">
          <span>Total</span>
          <span>₹{quote.total}</span>
        </div>
      </div>

      <button className="w-full bg-gold text-gray-900 font-semibold py-3 rounded-lg hover:scale-105 transition-transform">
        Generate Quote
      </button>
    </div>
  )
}
