import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { StickyCTA } from "@/components/sticky-cta"
import { site } from "@/lib/seo/constants"

export const metadata: Metadata = {
  title: "Terms & Conditions | Hotel Excella Vizag",
  description: "Read Hotel Excella's terms and conditions for booking, cancellation, check-in/check-out, and guest responsibilities.",
  alternates: { canonical: `${site.url}/terms-conditions` },
  robots: { index: true, follow: true },
}

export default function TermsConditionsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="bg-card border-b border-border py-12 lg:py-16">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <h1 className="font-serif text-4xl font-bold text-foreground">Terms & Conditions</h1>
            <p className="mt-4 text-muted-foreground">Last updated: December 2024</p>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 lg:py-16">
          <div className="mx-auto max-w-4xl px-4 space-y-8">
            {/* Booking & Reservation */}
            <div>
              <h2 className="text-2xl font-bold text-foreground">Booking & Reservation Policy</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                Booking your stay at Hotel Excella constitutes acceptance of these terms and conditions. A valid booking requires:
              </p>
              <ul className="mt-4 space-y-2 text-muted-foreground">
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Valid guest name and contact information</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Confirmation email with booking details</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Payment in accordance with quoted rate</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Valid identification at check-in</span>
                </li>
              </ul>
            </div>

            {/* Check-In Policy */}
            <div>
              <h2 className="text-2xl font-bold text-foreground">Check-In Policy</h2>
              <div className="mt-4 space-y-3 text-muted-foreground">
                <p>
                  <strong>Check-In Time:</strong> 1:00 PM onwards
                </p>
                <p className="leading-relaxed">
                  Early check-in is available upon request and subject to room availability. Early check-in requests should be communicated at least 24 hours in advance. Hotel Excella will make every effort to accommodate early check-in requests without additional charges if rooms are available.
                </p>
              </div>
            </div>

            {/* Check-Out Policy */}
            <div>
              <h2 className="text-2xl font-bold text-foreground">Check-Out Policy</h2>
              <div className="mt-4 space-y-3 text-muted-foreground">
                <p>
                  <strong>Check-Out Time:</strong> 11:00 AM
                </p>
                <p className="leading-relaxed">
                  Late checkout is available upon request and subject to room availability. Late checkout charges may apply. Extended stay rates are available for guests requiring accommodation beyond standard checkout times.
                </p>
              </div>
            </div>

            {/* Cancellation Policy */}
            <div>
              <h2 className="text-2xl font-bold text-foreground">Cancellation Policy</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                Cancellations must be made in accordance with your booking confirmation details. Standard cancellation policies are:
              </p>
              <ul className="mt-4 space-y-2 text-muted-foreground">
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Free cancellation up to 7 days before check-in</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>50% charge for cancellation 3-7 days before check-in</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>100% charge for cancellation within 3 days of check-in</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>No-show bookings will be charged in full</span>
                </li>
              </ul>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                <strong>Note:</strong> Cancellation terms may vary based on promotional offers or special rates. Please refer to your booking confirmation for applicable terms.
              </p>
            </div>

            {/* Guest Responsibilities */}
            <div>
              <h2 className="text-2xl font-bold text-foreground">Guest Responsibilities</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                Guests agree to:
              </p>
              <ul className="mt-4 space-y-2 text-muted-foreground">
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Treat the hotel property and furnishings with care</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Be responsible for any damage to rooms or facilities</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Respect other guests and staff members</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Comply with hotel house rules and policies</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Not engage in illegal activities on the premises</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Keep valuables in room safes (hotel not responsible for loss)</span>
                </li>
              </ul>
            </div>

            {/* Property Rules */}
            <div>
              <h2 className="text-2xl font-bold text-foreground">Property Rules</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                Guests must comply with the following rules:
              </p>
              <ul className="mt-4 space-y-2 text-muted-foreground">
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>No smoking in non-designated areas</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Quiet hours from 10:00 PM to 7:00 AM</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>No large gatherings or parties in rooms</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Pets are not permitted without prior approval</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Room keys must be returned at checkout</span>
                </li>
              </ul>
            </div>

            {/* Liability Limitations */}
            <div>
              <h2 className="text-2xl font-bold text-foreground">Liability Limitations</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                Hotel Excella is not responsible for:
              </p>
              <ul className="mt-4 space-y-2 text-muted-foreground">
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Loss or theft of personal belongings</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Damage to vehicles parked on the property</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Service interruptions or utility failures beyond our control</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Natural disasters or acts of God</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Personal injury or illness</span>
                </li>
              </ul>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Guests are encouraged to use in-room safes for valuables and purchase travel insurance for added protection.
              </p>
            </div>

            {/* Reservation Terms */}
            <div>
              <h2 className="text-2xl font-bold text-foreground">Reservation Terms</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                Hotel Excella reserves the right to:
              </p>
              <ul className="mt-4 space-y-2 text-muted-foreground">
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Decline or cancel reservations at its discretion</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Modify rates and terms with reasonable notice</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Request guests to vacate rooms for violations of house rules</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Charge for damages beyond normal wear and tear</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Update terms and conditions as needed</span>
                </li>
              </ul>
            </div>

            {/* Contact Information */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-2xl font-bold text-foreground">Contact & Inquiries</h2>
              <p className="mt-3 text-muted-foreground">
                For questions about these terms or specific situations:
              </p>
              <div className="mt-4 space-y-2 text-muted-foreground">
                <p>
                  <strong>Email:</strong> {" "}
                  <a href={`mailto:${site.email}`} className="text-primary hover:underline">
                    {site.email}
                  </a>
                </p>
                <p>
                  <strong>Phone:</strong> {" "}
                  <a href={`tel:${site.phonePrimary.replace(/\s/g, "")}`} className="text-primary hover:underline">
                    {site.phonePrimary}
                  </a>
                </p>
              </div>
            </div>

            {/* Navigation */}
            <div className="pt-8 border-t border-border">
              <div className="flex flex-wrap gap-4">
                <Link href="/privacy-policy" className="text-primary hover:underline font-medium">
                  View Privacy Policy
                </Link>
                <Link href="/" className="text-primary hover:underline font-medium">
                  Back to Home
                </Link>
              </div>
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
