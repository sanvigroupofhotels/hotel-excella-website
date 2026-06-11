'use client'

import { Check, X } from 'lucide-react'
import Link from 'next/link'

interface ComparisonRow {
  feature: string
  direct: boolean
  ota: boolean
}

export function WhyBookDirectSection() {
  const comparisonData: ComparisonRow[] = [
    { feature: 'Direct Communication', direct: true, ota: false },
    { feature: 'Better Rates', direct: true, ota: false },
    { feature: 'Instant Confirmation', direct: true, ota: false },
    { feature: 'Flexible Cancellation', direct: true, ota: false },
    { feature: 'Special Packages Available', direct: true, ota: false },
    { feature: 'Personal Support', direct: true, ota: false },
    { feature: 'No Hidden Charges', direct: true, ota: true },
    { feature: 'Same Availability', direct: true, ota: true },
  ]

  return (
    <section className="bg-card py-12 lg:py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.1em] text-primary">Smart Booking</p>
          <h2 className="text-balance mt-3 font-serif text-3xl font-bold text-foreground lg:text-4xl">
            Why Book <span className="text-primary">Direct with Us</span>
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            Get better rates, instant support, and special perks by booking directly.
          </p>
        </div>

        <div className="mt-10 overflow-x-auto rounded-2xl border border-border">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-secondary">
                <th className="px-6 py-4 text-left font-semibold text-foreground">Feature</th>
                <th className="px-6 py-4 text-center font-semibold text-foreground">Direct Booking</th>
                <th className="px-6 py-4 text-center font-semibold text-foreground">OTA Platforms</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-background' : 'bg-card'}>
                  <td className="px-6 py-4 text-foreground font-medium">{row.feature}</td>
                  <td className="px-6 py-4 text-center">
                    {row.direct ? (
                      <div className="flex justify-center">
                        <Check className="h-6 w-6 text-primary" />
                      </div>
                    ) : (
                      <div className="flex justify-center">
                        <X className="h-6 w-6 text-muted-foreground/50" />
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {row.ota ? (
                      <div className="flex justify-center">
                        <Check className="h-6 w-6 text-muted-foreground/50" />
                      </div>
                    ) : (
                      <div className="flex justify-center">
                        <X className="h-6 w-6 text-muted-foreground/50" />
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {[
            {
              title: 'Better Rates',
              description: 'Direct bookings often include exclusive discounts and package deals not available on OTAs.',
            },
            {
              title: '24/7 Support',
              description: 'Reach our team directly via phone, email, or WhatsApp for immediate assistance.',
            },
            {
              title: 'Special Perks',
              description: 'Group discounts, corporate rates, and seasonal packages exclusively for direct bookings.',
            },
          ].map((item, idx) => (
            <div key={idx} className="rounded-xl border border-border bg-background p-6">
              <h3 className="font-semibold text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3 font-semibold text-primary-foreground transition-all hover:bg-primary/90"
          >
            Get a Custom Quote
          </Link>
        </div>
      </div>
    </section>
  )
}
