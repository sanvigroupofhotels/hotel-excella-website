import type { Metadata } from "next"
import GuestPortalClient from "./portal-client"

export const metadata: Metadata = {
  title: "Guest Portal | Hotel Excella Vizag",
  description: "Quick services at your fingertips.",
}

export default function GuestPortalPage() {
  return <GuestPortalClient />
}
