export const ROOM_TARIFFS = {
  oak: { withBreakfast: 2500, withoutBreakfast: 2250, label: "Queen Executive (Oak)" },
  maple: { withBreakfast: 3000, withoutBreakfast: 2750, label: "King Executive (Maple)" },
} as const

export const EXTRA_ADULT_CHARGE = 650
export const DRIVER_CHARGE = 650
export const EXTRA_BREAKFAST_CHARGE = 125

export const STATUSES = [
  "Pending",
  "Sent",
  "Negotiating",
  "Confirmed",
  "Converted",
  "No Response",
  "Cancelled",
  "Failed",
  "Expired",
] as const

export const EARLY_CHECKIN_OPTIONS = [
  { label: "10:00 AM to 1:00 PM", value: 500 },
  { label: "8:00 AM to 10:00 AM", value: 750 },
  { label: "6:00 AM to 8:00 AM", value: 1000 },
  { label: "Before 6:00 AM (Full day)", value: -1 },
]

export const LATE_CHECKOUT_OPTIONS = [
  { label: "Up to 2:00 PM", value: 500 },
  { label: "2:00 PM to 4:00 PM", value: 1000 },
  { label: "After 4:00 PM (Full day)", value: -1 },
]
