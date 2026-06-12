import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { StickyCTA } from "@/components/sticky-cta"
import { site } from "@/lib/seo/constants"

export const metadata: Metadata = {
  title: "Privacy Policy | Hotel Excella Vizag",
  description: "Read Hotel Excella's privacy policy regarding information collection, data security, and guest rights.",
  alternates: { canonical: `${site.url}/privacy-policy` },
  robots: { index: true, follow: true },
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="bg-card border-b border-border py-12 lg:py-16">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <h1 className="font-serif text-4xl font-bold text-foreground">Privacy Policy</h1>
            <p className="mt-4 text-muted-foreground">Last updated: December 2024</p>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 lg:py-16">
          <div className="mx-auto max-w-4xl px-4 space-y-8">
            {/* Information We Collect */}
            <div>
              <h2 className="text-2xl font-bold text-foreground">Information We Collect</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                Hotel Excella collects personal information to provide better service and support to our guests. Information collected includes:
              </p>
              <ul className="mt-4 space-y-2 text-muted-foreground">
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Name, email address, and phone number</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Booking details and reservation information</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Payment information (processed securely)</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Guest preferences and stay history</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Review and feedback information</span>
                </li>
              </ul>
            </div>

            {/* How We Use Information */}
            <div>
              <h2 className="text-2xl font-bold text-foreground">How We Use Information</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                We use collected information to:
              </p>
              <ul className="mt-4 space-y-2 text-muted-foreground">
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Process and manage your booking</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Provide customer support and respond to inquiries</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Send confirmation emails and stay information</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Improve our services based on feedback</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Comply with legal and regulatory requirements</span>
                </li>
              </ul>
            </div>

            {/* Cookies */}
            <div>
              <h2 className="text-2xl font-bold text-foreground">Cookies and Tracking</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                Our website uses cookies to improve user experience. Cookies help us understand how guests interact with our site and enable features like staying logged in. You can control cookie settings through your browser preferences.
              </p>
            </div>

            {/* Analytics */}
            <div>
              <h2 className="text-2xl font-bold text-foreground">Analytics</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                We use analytics tools (including Google Analytics) to understand website traffic patterns and improve our online presence. Analytics data is anonymized and does not identify individual users.
              </p>
            </div>

            {/* Data Security */}
            <div>
              <h2 className="text-2xl font-bold text-foreground">Data Security</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                Hotel Excella takes data security seriously. We employ industry-standard security measures including encryption, secure servers, and access controls to protect guest information from unauthorized access or misuse.
              </p>
            </div>

            {/* Third Party Services */}
            <div>
              <h2 className="text-2xl font-bold text-foreground">Third Party Services</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                We use trusted third-party services for payment processing, analytics, and communications. These services are subject to strict confidentiality agreements and are not permitted to use information for purposes other than providing services to Hotel Excella.
              </p>
            </div>

            {/* Guest Rights */}
            <div>
              <h2 className="text-2xl font-bold text-foreground">Your Rights</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                You have the right to:
              </p>
              <ul className="mt-4 space-y-2 text-muted-foreground">
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Access your personal information</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Request correction of inaccurate data</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Request deletion of your information (where applicable)</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Opt out of marketing communications</span>
                </li>
              </ul>
            </div>

            {/* Contact Information */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-2xl font-bold text-foreground">Contact Us</h2>
              <p className="mt-3 text-muted-foreground">
                For privacy-related inquiries or to exercise your rights:
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

            {/* Policy Updates */}
            <div>
              <h2 className="text-2xl font-bold text-foreground">Policy Updates</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                Hotel Excella reserves the right to update this privacy policy at any time. Significant changes will be communicated to users via email or through prominent site notifications. Continued use of our website constitutes acceptance of updated privacy practices.
              </p>
            </div>

            {/* Navigation */}
            <div className="pt-8 border-t border-border">
              <div className="flex flex-wrap gap-4">
                <Link href="/terms-conditions" className="text-primary hover:underline font-medium">
                  View Terms & Conditions
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
