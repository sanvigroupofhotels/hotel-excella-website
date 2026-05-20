import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hotel Excella CRM | Quote Management',
  description: 'Internal CRM for managing quotes and guest inquiries',
}

export default function CRMLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
