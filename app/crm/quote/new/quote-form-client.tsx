'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { Loader2, Plus, Minus, ArrowRight, RotateCcw, ExternalLink } from 'lucide-react'
import type { RoomType, Charge } from '@/lib/types/crm'
import { differenceInDays, format, addDays } from 'date-fns'

interface QuoteFormClientProps {
  roomTypes: RoomType[]
  charges: Charge[]
  taxRate: number
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

export function QuoteFormClient({ roomTypes, charges, taxRate }: QuoteFormClientProps) {
  const router = useRouter()
  const supabase = createClient()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Form state
  const [guestName, setGuestName] = useState('')
  const [guestPhone, setGuestPhone] = useState('')
  const [guestEmail, setGuestEmail] = useState('')
  const [leadSource, setLeadSource] = useState('')
  const [groupSize, setGroupSize] = useState(2)
  const [specialRequests, setSpecialRequests] = useState('')
  const [checkIn, setCheckIn] = useState(format(new Date(), 'yyyy-MM-dd'))
  const [checkOut, setCheckOut] = useState(format(addDays(new Date(), 1), 'yyyy-MM-dd'))
  const [roomTypeId, setRoomTypeId] = useState(roomTypes[0]?.id || '')
  const [numRooms, setNumRooms] = useState(1)
  const [includeBreakfast, setIncludeBreakfast] = useState(false)
  const [extraBedCount, setExtraBedCount] = useState(0)
  const [earlyCheckin, setEarlyCheckin] = useState(false)
  const [lateCheckout, setLateCheckout] = useState(false)
  const [hasPet, setHasPet] = useState(false)
  const [discountAmount, setDiscountAmount] = useState(0)
  const [internalNotes, setInternalNotes] = useState('')

  // Get charge amounts
  const getChargeAmount = useCallback((code: string) => {
    const charge = charges.find((c) => c.code === code)
    return charge?.amount || 0
  }, [charges])

  // Calculate totals
  const selectedRoom = roomTypes.find((r) => r.id === roomTypeId)
  const numNights = Math.max(1, differenceInDays(new Date(checkOut), new Date(checkIn)))
  
  const roomTariff = selectedRoom 
    ? (includeBreakfast ? selectedRoom.tariff_with_breakfast : selectedRoom.base_tariff) * numNights * numRooms
    : 0

  const extraBedCharge = extraBedCount * getChargeAmount('EXTRA_BED') * numNights
  const earlyCheckinCharge = earlyCheckin ? getChargeAmount('EARLY_CHECKIN') : 0
  const lateCheckoutCharge = lateCheckout ? getChargeAmount('LATE_CHECKOUT') : 0
  const petCharge = hasPet ? getChargeAmount('PET') * numNights : 0

  const subtotal = roomTariff + extraBedCharge + earlyCheckinCharge + lateCheckoutCharge + petCharge
  const taxAmount = Math.round((subtotal - discountAmount) * (taxRate / 100))
  const totalAmount = subtotal - discountAmount + taxAmount

  const formatCurrency = (amount: number) => `₹${amount.toLocaleString('en-IN')}`

  // Reset form
  const resetForm = () => {
    setGuestName('')
    setGuestPhone('')
    setGuestEmail('')
    setLeadSource('')
    setGroupSize(2)
    setSpecialRequests('')
    setCheckIn(format(new Date(), 'yyyy-MM-dd'))
    setCheckOut(format(addDays(new Date(), 1), 'yyyy-MM-dd'))
    setRoomTypeId(roomTypes[0]?.id || '')
    setNumRooms(1)
    setIncludeBreakfast(false)
    setExtraBedCount(0)
    setEarlyCheckin(false)
    setLateCheckout(false)
    setHasPet(false)
    setDiscountAmount(0)
    setInternalNotes('')
    setError(null)
  }

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      if (!guestName.trim()) throw new Error('Guest name is required')
      if (!guestPhone.trim()) throw new Error('Phone number is required')
      if (!roomTypeId) throw new Error('Please select a room type')

      const { data: quote, error: quoteError } = await supabase
        .from('quotes')
        .insert({
          guest_name: guestName.trim(),
          guest_phone: guestPhone.trim(),
          guest_email: guestEmail.trim() || null,
          lead_source: leadSource || null,
          group_size: groupSize,
          special_requests: specialRequests.trim() || null,
          check_in: checkIn,
          check_out: checkOut,
          room_type_id: roomTypeId,
          room_type_name: selectedRoom?.name || '',
          num_rooms: numRooms,
          include_breakfast: includeBreakfast,
          room_tariff: roomTariff,
          extra_bed_count: extraBedCount,
          extra_bed_charge: extraBedCharge,
          early_checkin: earlyCheckin,
          early_checkin_charge: earlyCheckinCharge,
          late_checkout: lateCheckout,
          late_checkout_charge: lateCheckoutCharge,
          pet_charges: petCharge,
          subtotal,
          tax_percentage: taxRate,
          tax_amount: taxAmount,
          discount_amount: discountAmount,
          total_amount: totalAmount,
          internal_notes: internalNotes.trim() || null,
          valid_until: format(addDays(new Date(), 14), 'yyyy-MM-dd'),
          status: 'pending',
        })
        .select()
        .single()

      if (quoteError) throw quoteError

      router.push(`/crm/quote/${quote.id}/preview`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create quote')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Form Columns */}
      <div className="lg:col-span-2 space-y-6">
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
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="guest_phone">Phone *</Label>
                <Input
                  id="guest_phone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={guestPhone}
                  onChange={(e) => setGuestPhone(e.target.value)}
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
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lead_source">Lead Source</Label>
                <Select value={leadSource} onValueChange={setLeadSource}>
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
                <Select value={groupSize.toString()} onValueChange={(v) => setGroupSize(parseInt(v))}>
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
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
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
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="check_out">Check-out *</Label>
                <Input
                  id="check_out"
                  type="date"
                  value={checkOut}
                  min={checkIn}
                  onChange={(e) => setCheckOut(e.target.value)}
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
                <Select value={roomTypeId} onValueChange={setRoomTypeId}>
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
                    onClick={() => setNumRooms((v) => Math.max(1, v - 1))}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-12 text-center font-medium">{numRooms}</span>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => setNumRooms((v) => Math.min(10, v + 1))}
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
                  onClick={() => setExtraBedCount((v) => Math.max(0, v - 1))}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-12 text-center font-medium">{extraBedCount}</span>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => setExtraBedCount((v) => Math.min(5, v + 1))}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Include Breakfast</Label>
                  <p className="text-sm text-muted-foreground">Add breakfast to room tariff</p>
                </div>
                <Switch checked={includeBreakfast} onCheckedChange={setIncludeBreakfast} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Early Check-in ({formatCurrency(getChargeAmount('EARLY_CHECKIN'))})</Label>
                  <p className="text-sm text-muted-foreground">Before standard check-in time</p>
                </div>
                <Switch checked={earlyCheckin} onCheckedChange={setEarlyCheckin} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Late Check-out ({formatCurrency(getChargeAmount('LATE_CHECKOUT'))})</Label>
                  <p className="text-sm text-muted-foreground">After standard check-out time</p>
                </div>
                <Switch checked={lateCheckout} onCheckedChange={setLateCheckout} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Pet Charges ({formatCurrency(getChargeAmount('PET'))}/night)</Label>
                  <p className="text-sm text-muted-foreground">Accommodation for pets</p>
                </div>
                <Switch checked={hasPet} onCheckedChange={setHasPet} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional */}
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
                  value={discountAmount || ''}
                  onChange={(e) => setDiscountAmount(parseFloat(e.target.value) || 0)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="internal_notes">Internal Notes</Label>
                <Input
                  id="internal_notes"
                  placeholder="Follow up after 2 days"
                  value={internalNotes}
                  onChange={(e) => setInternalNotes(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

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
      </div>

      {/* Live Summary Sidebar */}
      <div className="lg:col-span-1">
        <Card className="sticky top-24">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg">Live Summary</CardTitle>
            <ExternalLink className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="space-y-3">
            {/* Line Items */}
            <div className="space-y-2">
              {roomTariff > 0 && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Room Tariff ({numNights} {numNights === 1 ? 'Night' : 'Nights'})</span>
                  <span className="font-medium">{formatCurrency(roomTariff)}</span>
                </div>
              )}
              {extraBedCharge > 0 && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Extra Bed</span>
                  <span className="font-medium">{formatCurrency(extraBedCharge)}</span>
                </div>
              )}
              {earlyCheckinCharge > 0 && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Early Check-in</span>
                  <span className="font-medium">{formatCurrency(earlyCheckinCharge)}</span>
                </div>
              )}
              {lateCheckoutCharge > 0 && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Late Check-out</span>
                  <span className="font-medium">{formatCurrency(lateCheckoutCharge)}</span>
                </div>
              )}
              {petCharge > 0 && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Pet Charges</span>
                  <span className="font-medium">{formatCurrency(petCharge)}</span>
                </div>
              )}
            </div>

            <Separator />

            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium">{formatCurrency(subtotal)}</span>
            </div>

            {discountAmount > 0 && (
              <div className="flex items-center justify-between text-sm text-emerald-500">
                <span>Discount</span>
                <span>-{formatCurrency(discountAmount)}</span>
              </div>
            )}

            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Taxes & Fees ({taxRate}%)</span>
              <span className="font-medium">{formatCurrency(taxAmount)}</span>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <span className="font-semibold">Total Amount</span>
              <span className="text-2xl font-bold text-primary">{formatCurrency(totalAmount)}</span>
            </div>
            <p className="text-xs text-muted-foreground">Including all taxes</p>
          </CardContent>
        </Card>
      </div>
    </form>
  )
}
