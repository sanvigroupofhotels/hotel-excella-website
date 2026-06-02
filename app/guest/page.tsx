import type { Metadata } from "next"
import GuestPortalClient from "./portal-client"

export const metadata: Metadata = {
  title: "Guest Portal | Hotel Excella Vizag",
  description: "Quick services at your fingertips.",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://hotelexcella.in/guest" },
}

export default function GuestPortalPage() {
  return <GuestPortalClient />
}
