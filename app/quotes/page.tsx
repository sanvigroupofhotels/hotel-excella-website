"use client"

import React, { useMemo, useState } from "react"

interface SuiteOption {
  id: string
  name: string
  baseRate: number
  maxGuests: number
  amenities: string[]
}

const suiteCatalog: SuiteOption[] = [
  {
    id: "oak-queen",
    name: "Queen Executive Suite (Oak)",
    baseRate: 4500,
    maxGuests: 2,
    amenities: ["Wi‑Fi", "Breakfast", "Smart TV"],
  },
  {
    id: "maple-king",
    name: "King Executive Suite (Maple)",
    baseRate: 5500,
    maxGuests: 2,
    amenities: ["Wi‑Fi", "Breakfast", "Work Desk", "Mini Bar"],
  },
  {
    id: "cedar-family",
    name: "Family Reserve Suite (Cedar)",
    baseRate: 7200,
    maxGuests: 4,
    amenities: ["Wi‑Fi", "Breakfast", "Living Area", "Bathtub"],
  },
]

const fmt = (n: number) => `₹${n.toLocaleString("en-IN")}`

export default function QuotePage() {
  const [suiteId, setSuiteId] = useState(suiteCatalog[0].id)
  const [nights, setNights] = useState(1)
  const [guests, setGuests] = useState(2)
  const [addons, setAddons] = useState({
    earlyCheckIn: false,
    lateCheckOut: false,
    petStay: false,
    extraBed: false,
  })

  const selectedSuite = useMemo(
    () => suiteCatalog.find((suite) => suite.id === suiteId) ?? suiteCatalog[0],
    [suiteId]
  )

  const pricing = useMemo(() => {
    const base = selectedSuite.baseRate * nights
    const early = addons.earlyCheckIn ? 500 : 0
    const late = addons.lateCheckOut ? 500 : 0
    const pet = addons.petStay ? 1000 : 0
    const extraBed = addons.extraBed ? 800 * nights : 0
    const extraGuestCount = Math.max(0, guests - selectedSuite.maxGuests)
    const extraGuest = extraGuestCount * 1200 * nights

    const subtotal = base + early + late + pet + extraBed + extraGuest
    const gst = Math.round(subtotal * 0.12)
    const total = subtotal + gst

    return { base, early, late, pet, extraBed, extraGuest, gst, total }
  }, [selectedSuite, nights, guests, addons])

  const onPrint = () => window.print()

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-serif font-bold text-yellow-400 mb-2">
            Excella Reserve Suite
          </h1>
          <p className="text-gray-400 text-lg">
            Build a stay quote instantly from suite, guest, and add-on options.
          </p>
        </header>

        <section className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 space-y-5 shadow-md">
            <h2 className="text-xl font-semibold text-yellow-400">Reservation Setup</h2>

            <label className="block">
              <span className="text-sm text-gray-300">Suite</span>
              <select
                value={suiteId}
                onChange={(e) => setSuiteId(e.target.value)}
                className="mt-1 w-full rounded-md border border-gray-600 bg-gray-900 px-3 py-2"
              >
                {suiteCatalog.map((suite) => (
                  <option key={suite.id} value={suite.id}>
                    {suite.name} — {fmt(suite.baseRate)}/night
                  </option>
                ))}
              </select>
            </label>

            <div className="grid grid-cols-2 gap-3">
              <label className="block">
                <span className="text-sm text-gray-300">Nights</span>
                <input
                  type="number"
                  min={1}
                  value={nights}
                  onChange={(e) => setNights(Math.max(1, Number(e.target.value) || 1))}
                  className="mt-1 w-full rounded-md border border-gray-600 bg-gray-900 px-3 py-2"
                />
              </label>

              <label className="block">
                <span className="text-sm text-gray-300">Guests</span>
                <input
                  type="number"
                  min={1}
                  value={guests}
                  onChange={(e) => setGuests(Math.max(1, Number(e.target.value) || 1))}
                  className="mt-1 w-full rounded-md border border-gray-600 bg-gray-900 px-3 py-2"
                />
              </label>
            </div>

            <div className="space-y-2">
              {[
                ["earlyCheckIn", "Early Check-In", "+₹500"],
                ["lateCheckOut", "Late Check-Out", "+₹500"],
                ["petStay", "Pet Stay", "+₹1,000"],
                ["extraBed", "Extra Bed", "+₹800/night"],
              ].map(([key, label, charge]) => (
                <label key={key} className="flex items-center justify-between text-sm">
                  <span>{label}</span>
                  <span className="text-gray-400 mr-3">{charge}</span>
                  <input
                    type="checkbox"
                    checked={addons[key as keyof typeof addons]}
                    onChange={(e) =>
                      setAddons((prev) => ({ ...prev, [key]: e.target.checked }))
                    }
                  />
                </label>
              ))}
            </div>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 shadow-md">
            <h2 className="text-xl font-semibold text-yellow-400 mb-3">Quote Summary</h2>
            <p className="text-lg font-medium">{selectedSuite.name}</p>
            <p className="text-sm text-gray-400 mb-4">
              Amenities: {selectedSuite.amenities.join(" • ")}
            </p>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span>Base ({nights} night)</span><span>{fmt(pricing.base)}</span></div>
              <div className="flex justify-between"><span>Early Check-In</span><span>{fmt(pricing.early)}</span></div>
              <div className="flex justify-between"><span>Late Check-Out</span><span>{fmt(pricing.late)}</span></div>
              <div className="flex justify-between"><span>Pet Stay</span><span>{fmt(pricing.pet)}</span></div>
              <div className="flex justify-between"><span>Extra Bed</span><span>{fmt(pricing.extraBed)}</span></div>
              <div className="flex justify-between"><span>Extra Guest Fee</span><span>{fmt(pricing.extraGuest)}</span></div>
              <hr className="border-gray-700 my-3" />
              <div className="flex justify-between"><span>GST (12%)</span><span>{fmt(pricing.gst)}</span></div>
              <div className="flex justify-between text-xl font-bold text-yellow-400 mt-2">
                <span>Total</span><span>{fmt(pricing.total)}</span>
              </div>
            </div>

            <button
              onClick={onPrint}
              className="mt-6 w-full bg-yellow-400 text-gray-900 font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-yellow-500 transition-colors duration-300"
            >
              Print Quote
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}
