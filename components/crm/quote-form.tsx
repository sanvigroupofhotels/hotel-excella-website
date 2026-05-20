'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { Loader2, Plus, Minus, ArrowRight, RotateCcw } from 'lucide-react'
import type { RoomType, Charge, QuoteFormData } from '@/lib/types/crm'
import { differenceInDays, format, addDays } from 'date-fns'

interface QuoteFormProps {
  roomTypes: RoomType[]
  charges: Charge[]
  taxRate: number
  onQuoteCreated?: (quoteId: string) => void
}

const LEAD_SOURCES = [
  'Walk-in',
  'Phone Call',
  'WhatsApp',
  'Website',
  'Google',
  'Booking.com',
  'MakeMyTrip',
  'Goibibo',
  'Referral',
  'Other',
]

export function QuoteForm({ roomTypes, charges, taxRate, onQuoteCreated }: QuoteFormProps) {
  const router = useRouter()
  const supabase = createClient()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Form state
  const [formData, setFormData] = useState<QuoteFormData>({
    guest_name: '',
    guest_phone: '',
    guest_email: '',
    lead_source: '',
    group_size: 2,
    special_requests: '',
    check_in: format(new Date(), 'yyyy-MM-dd'),
    check_out: format(addDays(new Date(), 1), 'yyyy-MM-dd'),
    room_type_id: roomTypes[0]?.id || '',
    num_rooms: 1,
    include_breakfast: false,
    extra_bed_count: 0,
    early_checkin: false,
    late_checkout: false,
    pet_charges: 0,
    driver_charges: 0,
    extra_adult_count: 0,
    extra_breakfast_count: 0,
    discount_amount: 0,
    discount_reason: '',
    internal_notes: '',
    follow_up_date: '',
  })

  // Get charge amounts from charges array
  const getChargeAmount = useCallback((code: string) => {
    const charge = charges.find((c) => c.code === code)
    return charge?.amount || 0
  }, [charges])

  // Calculate totals
  const selectedRoom = roomTypes.find((r) => r.id === formData.room_type_id)
  const numNights = Math.max(1, differenceInDays(new Date(formData.check_out), new Date(formData.check_in)))
  
  const roomTariff = selectedRoom 
    ? (formData.include_breakfast ? selectedRoom.tariff_with_breakfast : selectedRoom.base_tariff) * numNights * formData.num_rooms
    : 0

  const extraBedCharge = formData.extra_bed_count * getChargeAmount('EXTRA_BED') * numNights
  const earlyCheckinCharge = formData.early_checkin ? getChargeAmount('EARLY_CHECKIN') : 0
  const lateCheckoutCharge = formData.late_checkout ? getChargeAmount('LATE_CHECKOUT') : 0
  const petCharge = formData.pet_charges > 0 ? getChargeAmount('PET') * numNights : 0
  const driverCharge = formData.driver_charges > 0 ? getChargeAmount('DRIVER') * numNights : 0
  const extraAdultCharge = formData.extra_adult_count * getChargeAmount('EXTRA_ADULT') * numNights
  const extraBreakfastCharge = formData.extra_breakfast_count * getChargeAmount('EXTRA_BREAKFAST') * numNights

  const subtotal = roomTariff + extraBedCharge + earlyCheckinCharge + lateCheckoutCharge + petCharge + driverCharge + extraAdultCharge + extraBreakfastCharge
  const taxAmount = (subtotal - formData.discount_amount) * (taxRate / 100)
  const totalAmount = subtotal - formData.discount_amount + taxAmount

  // Update form data
  const updateField = <K extends keyof QuoteFormData>(field: K, value: QuoteFormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  // Increment/Decrement helpers
  const increment = (field: keyof QuoteFormData, max?: number) => {
    const currentValue = formData[field] as number
    if (max === undefined || currentValue < max) {
      updateField(field, currentValue + 1)
    }
  }

  const decrement = (field: keyof QuoteFormData, min = 0) => {
    const currentValue = formData[field] as number
    if (currentValue > min) {
      updateField(field, currentValue - 1)
    }
  }

  // Reset form
  const resetForm = () => {
    setFormData({
      guest_name: '',
      guest_phone: '',
      guest_email: '',
      lead_source: '',
      group_size: 2,
      special_requests: '',
      check_in: format(new Date(), 'yyyy-MM-dd'),
      check_out: format(addDays(new Date(), 1), 'yyyy-MM-dd'),
      room_type_id: roomTypes[0]?.id || '',
      num_rooms: 1,
      include_breakfast: false,
      extra_bed_count: 0,
      early_checkin: false,
      late_checkout: false,
      pet_charges: 0,
      driver_charges: 0,
      extra_adult_count: 0,
      extra_breakfast_count: 0,
      discount_amount: 0,
      discount_reason: '',
      internal_notes: '',
      follow_up_date: '',
    })
    setError(null)
  }

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      // Validate
      if (!formData.guest_name.trim()) {
        throw new Error('Guest name is required')
      }
      if (!formData.guest_phone.trim()) {
        throw new Error('Phone number is required')
      }
      if (!formData.room_type_id) {
        throw new Error('Please select a room type')
      }

      // Create quote
      const { data: quote, error: quoteError } = await supabase
        .from('quotes')
        .insert({
          guest_name: formData.guest_name.trim(),
          guest_phone: formData.guest_phone.trim(),
          guest_email: formData.guest_email?.trim() || null,
          lead_source: formData.lead_source || null,
          group_size: formData.group_size,
          special_requests: formData.special_requests?.trim() || null,
          check_in: formData.check_in,
          check_out: formData.check_out,
          room_type_id: formData.room_type_id,
          room_type_name: selectedRoom?.name || '',
          num_rooms: formData.num_rooms,
          include_breakfast: formData.include_breakfast,
          room_tariff: roomTariff,
          extra_bed_count: formData.extra_bed_count,
          extra_bed_charge: extraBedCharge,
          early_checkin: formData.early_checkin,
          early_checkin_charge: earlyCheckinCharge,
          late_checkout: formData.late_checkout,
          late_checkout_charge: lateCheckoutCharge,
          pet_charges: petCharge,
          driver_charges: driverCharge,
          extra_adult_count: formData.extra_adult_count,
          extra_adult_charge: extraAdultCharge,
          extra_breakfast_count: formData.extra_breakfast_count,
          extra_breakfast_charge: extraBreakfastCharge,
          subtotal,
          tax_percentage: taxRate,
          tax_amount: taxAmount,
          discount_amount: formData.discount_amount,
          discount_reason: formData.discount_reason?.trim() || null,
          total_amount: totalAmount,
          internal_notes: formData.internal_notes?.trim() || null,
          follow_up_date: formData.follow_up_date || null,
          valid_until: format(addDays(new Date(), 14), 'yyyy-MM-dd'),
          status: 'pending',
        })
        .select()
        .single()

      if (quoteError) throw quoteError

      if (onQuoteCreated) {
        onQuoteCreated(quote.id)
      } else {
        router.push(`/crm/quote/${quote.id}/preview`)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create quote')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Guest Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Guest Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="guest_name">Guest Name *</Label>
              <Input
                id="guest_name"
                placeholder="Rohit Sharma"
                value={formData.guest_name}
                onChange={(e) => updateField('guest_name', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="guest_phone">Phone *</Label>
              <Input
                id="guest_phone"
                type="tel"
                placeholder="+91 98765 43210"
                value={formData.guest_phone}
                onChange={(e) => updateField('guest_phone', e.target.value)}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="guest_email">Email</Label>
              <Input
                id="guest_email"
                type="email"
                placeholder="rohit.sharma@email.com"
                value={formData.guest_email}
                onChange={(e) => updateField('guest_email', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lead_source">Lead Source</Label>
              <Select value={formData.lead_source} onValueChange={(v) => updateField('lead_source', v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select source" />
                </SelectTrigger>
                <SelectContent>
                  {LEAD_SOURCES.map((source) => (
                    <SelectItem key={source} value={source}>{source}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Group Size</Label>
              <Select 
                value={formData.group_size.toString()} 
                onValueChange={(v) => updateField('group_size', parseInt(v))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <SelectItem key={n} value={n.toString()}>
                      {n} {n === 1 ? 'Adult' : 'Adults'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="special_requests">Special Requests</Label>
              <Input
                id="special_requests"
                placeholder="High floor, quiet room"
                value={formData.special_requests}
                onChange={(e) => updateField('special_requests', e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stay Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Stay Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="check_in">Check-in *</Label>
              <Input
                id="check_in"
                type="date"
                value={formData.check_in}
                onChange={(e) => updateField('check_in', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="check_out">Check-out *</Label>
              <Input
                id="check_out"
                type="date"
                value={formData.check_out}
                min={formData.check_in}
                onChange={(e) => updateField('check_out', e.target.value)}
                required
              />
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            {numNights} {numNights === 1 ? 'Night' : 'Nights'}
          </p>
        </CardContent>
      </Card>

      {/* Room & Extras */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Room & Extras</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Room Type</Label>
              <Select 
                value={formData.room_type_id} 
                onValueChange={(v) => updateField('room_type_id', v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select room" />
                </SelectTrigger>
                <SelectContent>
                  {roomTypes.map((room) => (
                    <SelectItem key={room.id} value={room.id}>
                      {room.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Rooms</Label>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => decrement('num_rooms', 1)}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-12 text-center font-medium">{formData.num_rooms}</span>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => increment('num_rooms', 10)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Extra Bed</Label>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => decrement('extra_bed_count')}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="w-12 text-center font-medium">{formData.extra_bed_count}</span>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => increment('extra_bed_count', 5)}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <Separator />

          {/* Toggle Options */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <Label>Include Breakfast</Label>
                <p className="text-sm text-muted-foreground">Add breakfast to room tariff</p>
              </div>
              <Switch
                checked={formData.include_breakfast}
                onCheckedChange={(v) => updateField('include_breakfast', v)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Early Check-in (₹{getChargeAmount('EARLY_CHECKIN').toLocaleString('en-IN')})</Label>
                <p className="text-sm text-muted-foreground">Before standard check-in time</p>
              </div>
              <Switch
                checked={formData.early_checkin}
                onCheckedChange={(v) => updateField('early_checkin', v)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Late Check-out (₹{getChargeAmount('LATE_CHECKOUT').toLocaleString('en-IN')})</Label>
                <p className="text-sm text-muted-foreground">After standard check-out time</p>
              </div>
              <Switch
                checked={formData.late_checkout}
                onCheckedChange={(v) => updateField('late_checkout', v)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Pet Charges (₹{getChargeAmount('PET').toLocaleString('en-IN')}/night)</Label>
                <p className="text-sm text-muted-foreground">Accommodation for pets</p>
              </div>
              <Switch
                checked={formData.pet_charges > 0}
                onCheckedChange={(v) => updateField('pet_charges', v ? 1 : 0)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Additional</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="discount">Discount (₹)</Label>
              <Input
                id="discount"
                type="number"
                min="0"
                placeholder="500"
                value={formData.discount_amount || ''}
                onChange={(e) => updateField('discount_amount', parseFloat(e.target.value) || 0)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="internal_notes">Internal Notes</Label>
              <Input
                id="internal_notes"
                placeholder="Follow up after 2 days"
                value={formData.internal_notes}
                onChange={(e) => updateField('internal_notes', e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Error */}
      {error && (
        <div className="text-sm text-destructive bg-destructive/10 p-4 rounded-lg">
          {error}
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        <Button type="button" variant="outline" onClick={resetForm} disabled={isLoading}>
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
        <Button type="submit" className="flex-1" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Creating Quote...
            </>
          ) : (
            <>
              Preview Quote
              <ArrowRight className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
