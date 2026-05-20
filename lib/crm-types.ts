export const QUOTE_STATUSES = ["Pending","Sent","Negotiating","Confirmed","Converted","No Response","Cancelled","Failed","Expired"] as const
export type QuoteStatus = (typeof QUOTE_STATUSES)[number]

export type Quote = {
  id: string
  quote_reference: string
  guest_name: string
  phone: string
  email: string
  source: string
  checkin: string
  checkout: string
  nights: number
  guests: number
  room_type: "OAK" | "MAPPLE"
  breakfast_included: boolean
  room_tariff: number
  taxes: number
  extra_adults: number
  extra_adult_charge: number
  extra_bed: number
  early_checkin: number
  late_checkout: number
  pet_charges: number
  driver_charge: number
  extra_breakfast_count: number
  extra_breakfast_charge: number
  discount: number
  total_amount: number
  notes: string
  followup_date: string | null
  status: QuoteStatus
  created_at: string
  updated_at: string
  deleted_at?: string | null
}

export const ROOM_TARIFF = {
  OAK: { withBreakfast: 2500, withoutBreakfast: 2250 },
  MAPPLE: { withBreakfast: 3000, withoutBreakfast: 2750 },
} as const

export const CHARGES = { extraAdult: 650, driver: 650, extraBreakfast: 125 } as const
