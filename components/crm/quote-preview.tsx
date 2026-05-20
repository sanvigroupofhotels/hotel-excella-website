'use client'

import { forwardRef } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Check, Wifi, Home, Clock, HeadphonesIcon, Star } from 'lucide-react'
import type { Quote, HotelDetails } from '@/lib/types/crm'
import { format, parseISO } from 'date-fns'

interface QuotePreviewProps {
  quote: Quote
  hotelDetails?: HotelDetails
}

const defaultHotelDetails: HotelDetails = {
  name: 'Hotel Excella',
  address: '386 Revenue Employees Co-operative Society Colony, VisalakshiNagar, Visakhapatnam',
  phone: '+91-9985908131',
  email: 'hotelexcellavizag@gmail.com',
  website: 'https://hotelexcella.com',
}

export const QuotePreview = forwardRef<HTMLDivElement, QuotePreviewProps>(
  function QuotePreview({ quote, hotelDetails = defaultHotelDetails }, ref) {
    const formatCurrency = (amount: number) => {
      return `₹${amount.toLocaleString('en-IN')}`
    }

    const formatDate = (dateStr: string) => {
      try {
        return format(parseISO(dateStr), 'dd MMM yyyy')
      } catch {
        return dateStr
      }
    }

    // Line items for breakdown
    const lineItems = [
      { 
        label: `${quote.room_type_name} × ${quote.num_rooms} room (${quote.num_nights} ${quote.num_nights === 1 ? 'Night' : 'Nights'})`, 
        value: quote.room_tariff 
      },
      { label: 'Extra Bed', value: quote.extra_bed_charge },
      { label: 'Early Check-in', value: quote.early_checkin_charge },
      { label: 'Late Check-out', value: quote.late_checkout_charge },
      { label: 'Pet Charges', value: quote.pet_charges },
      { label: 'Driver Charges', value: quote.driver_charges },
      { label: 'Extra Adult', value: quote.extra_adult_charge },
      { label: 'Extra Breakfast', value: quote.extra_breakfast_charge },
    ].filter((item) => item.value > 0)

    return (
      <div ref={ref} className="bg-white text-gray-900 rounded-xl overflow-hidden shadow-lg max-w-xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-50 to-amber-100 p-6 text-center border-b border-amber-200">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-full bg-amber-600 flex items-center justify-center">
              <span className="text-white font-serif font-bold text-xl">HE</span>
            </div>
          </div>
          <h1 className="font-serif text-2xl font-bold text-gray-900">{hotelDetails.name}</h1>
          <p className="text-sm text-gray-600">Boutique Luxury Stay</p>
        </div>

        {/* Quote Info */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">QUOTE</h2>
              <p className="text-amber-600 font-semibold">{quote.quote_number}</p>
              {quote.valid_until && (
                <p className="text-sm text-gray-500">Valid till: {formatDate(quote.valid_until)}</p>
              )}
            </div>
          </div>

          {/* Guest & Stay Details */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Guest Details</h3>
              <p className="font-semibold text-gray-900">{quote.guest_name}</p>
              <p className="text-sm text-gray-600">{quote.guest_phone}</p>
              {quote.guest_email && (
                <p className="text-sm text-gray-600">{quote.guest_email}</p>
              )}
              <p className="text-sm text-gray-600">{quote.group_size} {quote.group_size === 1 ? 'Adult' : 'Adults'} • {quote.num_nights} {quote.num_nights === 1 ? 'Night' : 'Nights'}</p>
            </div>
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Stay Details</h3>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-600">Check-in:</span>
                <span className="font-semibold text-gray-900">{formatDate(quote.check_in)}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-600">Check-out:</span>
                <span className="font-semibold text-gray-900">{formatDate(quote.check_out)}</span>
              </div>
            </div>
          </div>

          <Separator className="my-4" />

          {/* Pricing Table */}
          <div className="space-y-3 mb-6">
            <div className="grid grid-cols-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
              <span>Description</span>
              <span className="text-right">Amount</span>
            </div>
            {lineItems.map((item, index) => (
              <div key={index} className="grid grid-cols-2 text-sm">
                <span className="text-gray-700">{item.label}</span>
                <span className="text-right font-medium">{formatCurrency(item.value)}</span>
              </div>
            ))}
            {quote.discount_amount > 0 && (
              <div className="grid grid-cols-2 text-sm text-emerald-600">
                <span>Discount</span>
                <span className="text-right font-medium">-{formatCurrency(quote.discount_amount)}</span>
              </div>
            )}
            <div className="grid grid-cols-2 text-sm">
              <span className="text-gray-700">Taxes & Fees ({quote.tax_percentage}%)</span>
              <span className="text-right font-medium">{formatCurrency(quote.tax_amount)}</span>
            </div>
          </div>

          {/* Total */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-gray-900">Total Amount</span>
              <span className="text-2xl font-bold text-amber-600">{formatCurrency(quote.total_amount)}</span>
            </div>
          </div>

          {/* Inclusions */}
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Includes</h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                <Wifi className="w-3 h-3 mr-1" /> Complimentary WiFi
              </Badge>
              <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                <Home className="w-3 h-3 mr-1" /> Daily Housekeeping
              </Badge>
              <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                <Clock className="w-3 h-3 mr-1" /> Welcome Amenities
              </Badge>
              <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                <HeadphonesIcon className="w-3 h-3 mr-1" /> 24/7 Support
              </Badge>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center pt-4 border-t border-gray-200">
            <p className="text-amber-600 font-serif italic text-lg mb-2">
              We look forward to hosting you at {hotelDetails.name}
            </p>
            <div className="flex items-center justify-center gap-1 text-amber-500">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-4 h-4 fill-current" />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
)
