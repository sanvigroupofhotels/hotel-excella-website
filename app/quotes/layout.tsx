import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Quotes | Hotel Excella",
  robots: { index: false, follow: false },
}

export default function QuotesLayout({ children }: { children: React.ReactNode }) {
  return children
}
