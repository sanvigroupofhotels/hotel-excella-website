'use client'

import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface KPICardProps {
  label: string
  value: string | number
  variant?: 'default' | 'primary' | 'warning' | 'success'
  prefix?: string
}

export function KPICard({ label, value, variant = 'default', prefix }: KPICardProps) {
  const variantStyles = {
    default: 'text-foreground',
    primary: 'text-primary',
    warning: 'text-amber-500',
    success: 'text-emerald-500',
  }

  return (
    <Card className="bg-card border-border">
      <CardContent className="p-4">
        <p className="text-sm text-muted-foreground mb-1">{label}</p>
        <p className={cn('text-3xl font-bold', variantStyles[variant])}>
          {prefix}{typeof value === 'number' ? value.toLocaleString('en-IN') : value}
        </p>
      </CardContent>
    </Card>
  )
}

interface KPIGridProps {
  totalQuotes: number
  pending: number
  converted: number
  estimatedRevenue: number
}

export function KPIGrid({ totalQuotes, pending, converted, estimatedRevenue }: KPIGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <KPICard label="Total Quotes" value={totalQuotes} />
      <KPICard label="Pending" value={pending} variant="warning" />
      <KPICard label="Converted" value={converted} variant="success" />
      <KPICard label="Est. Revenue" value={estimatedRevenue} variant="primary" prefix="₹" />
    </div>
  )
}
