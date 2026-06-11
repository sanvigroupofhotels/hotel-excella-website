'use client'

import { Plus, Minus } from 'lucide-react'
import { useState } from 'react'

interface FAQItem {
  question: string
  answer: string
}

function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="space-y-3">
      {items.map((item, idx) => (
        <div key={idx} className="overflow-hidden rounded-xl border border-border bg-card transition-all duration-300">
          <button
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            className="w-full px-6 py-4 text-left font-semibold text-foreground hover:bg-secondary/50 transition-colors flex items-center justify-between"
            aria-expanded={openIndex === idx}
          >
            <span>{item.question}</span>
            {openIndex === idx ? (
              <Minus className="h-5 w-5 shrink-0 text-primary" />
            ) : (
              <Plus className="h-5 w-5 shrink-0 text-primary" />
            )}
          </button>

          {openIndex === idx && (
            <div className="border-t border-border px-6 py-4 text-muted-foreground leading-relaxed">
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export function FAQSection() {
  const bookingFaqs: FAQItem[] = [
    {
      question: 'How do I book a room at Hotel Excella?',
      answer:
        'You can book directly through our website using the "Instant Booking" button, fill an enquiry form, call us at +91-9985908131, or message us on WhatsApp. Direct booking ensures faster confirmation and better support.',
    },
    {
      question: 'What is your cancellation policy?',
      answer:
        'We offer flexible cancellation up to 24 hours before check-in for a full refund. Late cancellations may incur charges. Please contact us directly for special arrangements or longer stays.',
    },
    {
      question: 'Do you offer direct booking discounts?',
      answer:
        'Yes! Booking directly with us often provides better rates than OTA platforms, and you get personalized support from our team. Contact us to discuss special packages for families, corporate groups, or extended stays.',
    },
    {
      question: 'What check-in and check-out times do you have?',
      answer:
        'Standard check-in is 2:00 PM and check-out is 11:00 AM. Early check-in and late check-out are available based on room availability. Please request in advance for best results.',
    },
  ]

  const facilityFaqs: FAQItem[] = [
    {
      question: 'What amenities are included in my room?',
      answer:
        'All rooms feature AC, high-speed Wi-Fi, premium bedding, modern bathroom with quality toiletries, flat-screen TV, safe, and daily housekeeping. Premium rooms have additional amenities like working desks and mini-bars.',
    },
    {
      question: 'Is Wi-Fi available throughout the hotel?',
      answer: 'Yes, complimentary high-speed Wi-Fi is available in all rooms and common areas. Our dedicated team ensures uninterrupted connectivity for work and entertainment.',
    },
    {
      question: 'Do you offer laundry and ironing services?',
      answer:
        'Absolutely! Express laundry and ironing services are available at nominal charges. Same-day service is available for most items. Contact reception for details.',
    },
    {
      question: 'Is there 24/7 reception and customer support?',
      answer:
        'Yes, our reception desk is open 24/7 for any assistance. We also offer WhatsApp support, email, and phone support to ensure you get help whenever needed.',
    },
  ]

  const locationFaqs: FAQItem[] = [
    {
      question: 'How far is Hotel Excella from Vizag Airport?',
      answer:
        'Hotel Excella is approximately 20 km from Vizag Airport. Travel time is around 30-40 minutes depending on traffic. We can arrange airport pickup on request.',
    },
    {
      question: 'What attractions are near the hotel?',
      answer:
        'We are ideally located near Tenneti Park (3 km), Kailasagiri (8 km), Rushikonda Beach (7 km), Zoo Park, and multiple shopping malls. Everything is within 10 km.',
    },
    {
      question: 'Is parking available at the hotel?',
      answer:
        'Yes, we provide secure parking for guests. Vehicles are parked in a monitored area with 24/7 surveillance for your peace of mind.',
    },
    {
      question: 'How do I reach the hotel using public transport?',
      answer:
        'The hotel is well-connected by local buses and auto-rickshaws. We can provide detailed directions and transport recommendations when you book with us.',
    },
  ]

  return (
    <section className="py-12 lg:py-16">
      <div className="mx-auto max-w-4xl px-4">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.1em] text-primary">Common Questions</p>
          <h2 className="text-balance mt-3 font-serif text-3xl font-bold text-foreground lg:text-4xl">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">Everything you need to know about Hotel Excella and your stay.</p>
        </div>

        <div className="mt-10 space-y-10">
          {/* Booking FAQs */}
          <div>
            <h3 className="mb-6 font-semibold text-lg text-foreground">Booking & Policies</h3>
            <FAQAccordion items={bookingFaqs} />
          </div>

          {/* Facility FAQs */}
          <div>
            <h3 className="mb-6 font-semibold text-lg text-foreground">Room & Facilities</h3>
            <FAQAccordion items={facilityFaqs} />
          </div>

          {/* Location FAQs */}
          <div>
            <h3 className="mb-6 font-semibold text-lg text-foreground">Location & Travel</h3>
            <FAQAccordion items={locationFaqs} />
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-primary/30 bg-primary/5 p-6 text-center sm:p-8">
          <p className="font-semibold text-foreground">Didn&apos;t find your answer?</p>
          <p className="mt-2 text-muted-foreground">
            Contact us directly via WhatsApp, email, or phone. Our team is here to help 24/7.
          </p>
        </div>
      </div>
    </section>
  )
}
