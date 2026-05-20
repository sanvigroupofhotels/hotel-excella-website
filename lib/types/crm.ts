export interface AdminUser {
  id: string
  user_id: string
  email: string
  name: string
  role: 'admin' | 'manager' | 'staff'
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface RoomType {
  id: string
  name: string
  code: string
  base_tariff: number
  tariff_with_breakfast: number
  max_occupancy: number
  description: string | null
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Charge {
  id: string
  name: string
  code: string
  amount: number
  charge_type: 'mandatory' | 'optional' | 'conditional'
  description: string | null
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Quote {
  id: string
  quote_number: string
  guest_name: string
  guest_phone: string
  guest_email: string | null
  lead_source: string | null
  group_size: number
  special_requests: string | null
  check_in: string
  check_out: string
  num_nights: number
  room_type_id: string | null
  room_type_name: string
  num_rooms: number
  include_breakfast: boolean
  room_tariff: number
  extra_bed_count: number
  extra_bed_charge: number
  early_checkin: boolean
  early_checkin_charge: number
  late_checkout: boolean
  late_checkout_charge: number
  pet_charges: number
  driver_charges: number
  extra_adult_count: number
  extra_adult_charge: number
  extra_breakfast_count: number
  extra_breakfast_charge: number
  subtotal: number
  tax_percentage: number
  tax_amount: number
  discount_amount: number
  discount_reason: string | null
  total_amount: number
  internal_notes: string | null
  status: QuoteStatus
  valid_until: string | null
  follow_up_date: string | null
  follow_up_notes: string | null
  created_by: string | null
  created_at: string
  updated_at: string
  converted_at: string | null
  whatsapp_sent_at: string | null
  pdf_generated_at: string | null
}

export type QuoteStatus = 'pending' | 'sent' | 'negotiating' | 'converted' | 'no_response' | 'failed'

export interface QuoteActivityLog {
  id: string
  quote_id: string
  action: string
  description: string | null
  performed_by: string | null
  metadata: Record<string, unknown> | null
  created_at: string
}

export interface FollowUp {
  id: string
  quote_id: string
  scheduled_date: string
  scheduled_time: string | null
  status: 'pending' | 'completed' | 'skipped' | 'rescheduled'
  notes: string | null
  outcome: string | null
  completed_at: string | null
  completed_by: string | null
  created_by: string | null
  created_at: string
  updated_at: string
  quote?: Quote
}

export interface AppSetting {
  id: string
  key: string
  value: unknown
  description: string | null
  updated_at: string
}

export interface QuoteFormData {
  guest_name: string
  guest_phone: string
  guest_email?: string
  lead_source?: string
  group_size: number
  special_requests?: string
  check_in: string
  check_out: string
  room_type_id: string
  num_rooms: number
  include_breakfast: boolean
  extra_bed_count: number
  early_checkin: boolean
  late_checkout: boolean
  pet_charges: number
  driver_charges: number
  extra_adult_count: number
  extra_breakfast_count: number
  discount_amount: number
  discount_reason?: string
  internal_notes?: string
  follow_up_date?: string
}

export interface KPIData {
  totalQuotes: number
  pending: number
  converted: number
  estimatedRevenue: number
}

export interface HotelDetails {
  name: string
  address: string
  phone: string
  email: string
  website: string
}
