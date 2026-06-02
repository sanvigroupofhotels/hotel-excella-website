import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Guest Food Ordering | Hotel Excella",
  description: "In-house guest food ordering convenience for Hotel Excella.",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://hotelexcella.in/orderfood" },
}

export default function OrderFoodLayout({ children }: { children: React.ReactNode }) {
  return children
}
