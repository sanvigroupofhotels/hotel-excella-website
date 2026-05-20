'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ExternalLink } from 'lucide-react'

interface LiveSummaryProps {
  roomTariff: number
  numNights: number
  extraBedCharge: number
  earlyCheckinCharge: number
  lateCheckoutCharge: number
  petCharges: number
  driverCharges: number
  extraAdultCharge: number
  extraBreakfastCharge: number
  subtotal: number
  discountAmount: number
  taxRate: number
  taxAmount: number
  totalAmount: number
}

export function LiveSummary({
  roomTariff,
  numNights,
  extraBedCharge,
  earlyCheckinCharge,
  lateCheckoutCharge,
  petCharges,
  driverCharges,
  extraAdultCharge,
  extraBreakfastCharge,
  subtotal,
  discountAmount,
  taxRate,
  taxAmount,
  totalAmount,
}: LiveSummaryProps) {
  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN')}`
  }

  const lineItems = [
    { label: `Room Tariff (${numNights} ${numNights === 1 ? 'Night' : 'Nights'})`, value: roomTariff },
    { label: 'Extra Bed', value: extraBedCharge },
    { label: 'Early Check-in', value: earlyCheckinCharge },
    { label: 'Late Check-out', value: lateCheckoutCharge },
    { label: 'Pet Charges', value: petCharges },
    { label: 'Driver Charges', value: driverCharges },
    { label: 'Extra Adult', value: extraAdultCharge },
    { label: 'Extra Breakfast', value: extraBreakfastCharge },
  ].filter((item) => item.value > 0)

  return (
    <Card className="bg-card border-border sticky top-24">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg">Live Summary</CardTitle>
        <ExternalLink className="w-4 h-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Line Items */}
        <div className="space-y-2">
          {lineItems.map((item) => (
            <div key={item.label} className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{item.label}</span>
              <span className="font-medium">{formatCurrency(item.value)}</span>
            </div>
          ))}
        </div>

        <Separator />

        {/* Subtotal */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="font-medium">{formatCurrency(subtotal)}</span>
        </div>

        {/* Discount */}
        {discountAmount > 0 && (
          <div className="flex items-center justify-between text-sm text-emerald-500">
            <span>Discount</span>
            <span>-{formatCurrency(discountAmount)}</span>
          </div>
        )}

        {/* Taxes */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Taxes & Fees ({taxRate}%)</span>
          <span className="font-medium">{formatCurrency(taxAmount)}</span>
        </div>

        <Separator />

        {/* Total */}
        <div className="flex items-center justify-between">
          <span className="font-semibold">Total Amount</span>
          <span className="text-2xl font-bold text-primary">{formatCurrency(totalAmount)}</span>
        </div>
        <p className="text-xs text-muted-foreground">Including all taxes</p>
      </CardContent>
    </Card>
  )
}
