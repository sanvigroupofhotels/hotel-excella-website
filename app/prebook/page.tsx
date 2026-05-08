"use client"

import { useMemo, useState } from "react"
import { DateRange } from "react-day-picker"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { StickyCTA } from "@/components/sticky-cta"
import { Calendar as DatePickerCalendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Calendar,
  User,
  Phone,
  Mail,
  Users,
  Bed,
  MessageSquare,
  CheckCircle,
  ArrowRight,
  Loader2,
  X,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function PrebookPage() {
  const today = new Date()
  const [formData, setFormData] = useState({
    guestName: "",
    mobile: "",
    email: "",
    checkIn: "",
    checkOut: "",
    adults: "2",
    children: "0",
    rooms: "1",
    roomPreference: "Queen Executive Room",
    specialRequests: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const [stayRange, setStayRange] = useState<DateRange | undefined>()
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  const stayNights = useMemo(() => {
    if (!stayRange?.from || !stayRange?.to) return 0
    const ms = stayRange.to.getTime() - stayRange.from.getTime()
    return Math.max(0, Math.ceil(ms / (1000 * 60 * 60 * 24)))
  }, [stayRange])

  const stayNights = useMemo(() => {
    if (!stayRange?.from || !stayRange?.to) return 0
    const ms = stayRange.to.getTime() - stayRange.from.getTime()
    return Math.max(0, Math.ceil(ms / (1000 * 60 * 60 * 24)))
  }, [stayRange])

  const formatDate = (date?: Date) => {
    if (!date) return ""
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    return `${year}-${month}-${day}`
  }

  const handleCloseSuccessModal = () => {
    setIsSuccessModalOpen(false)
    window.location.href = "/"
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isSubmitting) return
    if (!formData.checkIn || !formData.checkOut) return
    setIsSubmitting(true)

    try {
      const message = `New inquiry from Hotel Excella website:
Guest Name: ${formData.guestName}
Mobile: ${formData.mobile}
Email: ${formData.email}
Check-in: ${formData.checkIn}
Check-out: ${formData.checkOut}
Adults/Guests: ${formData.adults}
Children: ${formData.children}
Rooms: ${formData.rooms}
Room Preference: ${formData.roomPreference}
Special Requests: ${formData.specialRequests || "N/A"}`

      const whatsappUrl = `https://wa.me/919985908131?text=${encodeURIComponent(message)}`
      window.location.href = whatsappUrl
      setIsSuccessModalOpen(true)
    } catch (error) {
      console.error("Error opening WhatsApp for booking request:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-card border-b border-border py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-4 text-center">
            <h1 className="font-serif text-3xl font-bold text-foreground lg:text-5xl text-balance">
              Check <span className="text-primary">Availability</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto text-pretty">
              Submit your booking request and we&apos;ll confirm availability instantly
            </p>
          </div>
        </section>

        {/* Booking Form Section */}
        <section className="py-12 lg:py-20">
          <div className="mx-auto max-w-3xl px-4">
            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Guest Details */}
                <div className="bg-card rounded-2xl border border-border p-6 lg:p-8">
                  <h2 className="font-serif text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                    <User className="h-5 w-5 text-primary" />
                    Guest Details
                  </h2>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="guestName"
                        className="block text-sm font-medium text-foreground mb-2"
                      >
                        Guest Name <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="text"
                        id="guestName"
                        required
                        value={formData.guestName}
                        onChange={(e) =>
                          setFormData({ ...formData, guestName: e.target.value })
                        }
                        className="w-full rounded-lg border border-border bg-secondary px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        placeholder="Full name as per ID"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="mobile"
                        className="block text-sm font-medium text-foreground mb-2"
                      >
                        <Phone className="h-4 w-4 inline mr-1" />
                        Mobile Number <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="tel"
                        id="mobile"
                        required
                        value={formData.mobile}
                        onChange={(e) =>
                          setFormData({ ...formData, mobile: e.target.value })
                        }
                        className="w-full rounded-lg border border-border bg-secondary px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-foreground mb-2"
                      >
                        <Mail className="h-4 w-4 inline mr-1" />
                        Email <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full rounded-lg border border-border bg-secondary px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                </div>

                {/* Booking Details */}
                <div className="bg-card rounded-2xl border border-border p-6 lg:p-8">
                  <h2 className="font-serif text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    Booking Details
                  </h2>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Check-in & Check-out <span className="text-destructive">*</span>
                      </label>
                      <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                        <PopoverTrigger asChild>
                          <button
                            type="button"
                            className="w-full rounded-lg border border-border bg-secondary p-0 text-left"
                            aria-label="Select check-in and check-out dates"
                          >
                            <div className="grid sm:grid-cols-3">
                              <div className="p-4 sm:border-r sm:border-border">
                                <p className="text-xs uppercase tracking-wide text-muted-foreground">Check-in</p>
                                <p className="mt-1 text-sm font-semibold text-foreground">
                                  {formData.checkIn || "Select date"}
                                </p>
                              </div>
                              <div className="p-4 sm:border-r sm:border-border">
                                <p className="text-xs uppercase tracking-wide text-muted-foreground">Check-out</p>
                                <p className="mt-1 text-sm font-semibold text-foreground">
                                  {formData.checkOut || "Select date"}
                                </p>
                              </div>
                              <div className="p-4">
                                <p className="text-xs uppercase tracking-wide text-muted-foreground">Nights</p>
                                <p className="mt-1 text-sm font-semibold text-foreground">
                                  {stayNights > 0 ? `${stayNights} night${stayNights > 1 ? "s" : ""}` : "-"}
                                </p>
                              </div>
                            </div>
                          </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-2" align="start">
                          <DatePickerCalendar
                            mode="range"
                            numberOfMonths={2}
                            selected={stayRange}
                            onSelect={(range, selectedDay) => {
                              const nextRange =
                                range?.from && range?.to && selectedDay
                                  ? { from: selectedDay, to: undefined }
                                  : range

                              setStayRange(nextRange)
                              setFormData((prev) => ({
                                ...prev,
                                checkIn: formatDate(nextRange?.from),
                                checkOut: formatDate(nextRange?.to),
                              }))

                              if (nextRange?.from && nextRange?.to) {
                                setIsCalendarOpen(false)
                              }
                            }}
                            disabled={{ before: today }}
                          />
                        </PopoverContent>
                      </Popover>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {formData.checkIn && formData.checkOut
                          ? `${formData.checkIn} to ${formData.checkOut}`
                          : "Select your check-in and check-out dates from the same calendar view."}
                      </p>
                    </div>

                    <div>
                      <label
                        htmlFor="adults"
                        className="block text-sm font-medium text-foreground mb-2"
                      >
                        <Users className="h-4 w-4 inline mr-1" />
                        Adults / Guests <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="number"
                        id="adults"
                        required
                        min={0}
                        value={formData.adults}
                        onChange={(e) =>
                          setFormData({ ...formData, adults: e.target.value })
                        }
                        className="w-full rounded-lg border border-border bg-secondary px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        placeholder="2"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="children"
                        className="block text-sm font-medium text-foreground mb-2"
                      >
                        Children
                      </label>
                      <input
                        type="number"
                        id="children"
                        min={0}
                        value={formData.children}
                        onChange={(e) =>
                          setFormData({ ...formData, children: e.target.value })
                        }
                        className="w-full rounded-lg border border-border bg-secondary px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        placeholder="0"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="rooms"
                        className="block text-sm font-medium text-foreground mb-2"
                      >
                        Number of Rooms <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="number"
                        id="rooms"
                        required
                        min={1}
                        value={formData.rooms}
                        onChange={(e) =>
                          setFormData({ ...formData, rooms: e.target.value })
                        }
                        className="w-full rounded-lg border border-border bg-secondary px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        placeholder="1"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="roomPreference"
                        className="block text-sm font-medium text-foreground mb-2"
                      >
                        <Bed className="h-4 w-4 inline mr-1" />
                        Room Preference <span className="text-destructive">*</span>
                      </label>
                      <select
                        id="roomPreference"
                        required
                        value={formData.roomPreference}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            roomPreference: e.target.value,
                          })
                        }
                        className="w-full rounded-lg border border-border bg-secondary px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      >
                        <option value="Queen Executive Room">
                          Queen Executive Room
                        </option>
                        <option value="King Executive Room">
                          King Executive Room
                        </option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Special Requests */}
                <div className="bg-card rounded-2xl border border-border p-6 lg:p-8">
                  <h2 className="font-serif text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    Special Requests
                  </h2>

                  <div>
                    <label
                      htmlFor="specialRequests"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Any special requests or preferences?
                    </label>
                    <textarea
                      id="specialRequests"
                      rows={4}
                      value={formData.specialRequests}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          specialRequests: e.target.value,
                        })
                      }
                      className="w-full rounded-lg border border-border bg-secondary px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                      placeholder="e.g., Early check-in, airport pickup, extra bed, anniversary decoration..."
                    />
                  </div>
                </div>

                {/* What&apos;s Included */}
                <div className="bg-primary/10 rounded-2xl border border-primary/20 p-6">
                  <p className="text-sm font-medium text-primary mb-3">
                    All bookings include:
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-sm text-foreground">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      Free Wi-Fi
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      24 Hours Reception
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      Clean Rooms
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      Daily Housekeeping
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground shadow-lg hover:bg-primary/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" />
                          Sending Inquiry...
                        </>
                      ) : (
                        <>
                      Check Availability
                      <ArrowRight className="h-5 w-5" />
                    </>
                  )}
                </button>

                <p className="text-center text-sm text-muted-foreground">
                  We&apos;ll confirm your inquiry first, then you can choose whether to proceed to booking.
                </p>
            </form>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-12 lg:py-16 bg-card border-t border-border">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <h2 className="font-serif text-2xl font-bold text-foreground">
              Need Help Booking?
            </h2>
            <p className="mt-2 text-muted-foreground">
              Our team is available 24/7 to assist you
            </p>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="tel:+919985908131"
                className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors"
              >
                <Phone className="h-5 w-5" />
                +91 99859 08131
              </a>
              <span className="hidden sm:inline text-border">|</span>
              <a
                href="https://wa.me/919985908131"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-green-500 hover:text-green-400 transition-colors"
              >
                <MessageSquare className="h-5 w-5" />
                WhatsApp Us
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <StickyCTA />

      <Dialog
        open={isSuccessModalOpen}
        onOpenChange={(open) => {
          if (!open) {
            handleCloseSuccessModal()
          }
        }}
      >
        <DialogContent className="border-primary/40 bg-black text-white sm:max-w-xl">
          <button
            type="button"
            onClick={handleCloseSuccessModal}
            className="absolute right-4 top-4 rounded-full border border-primary/40 p-1 text-primary transition-colors hover:bg-primary/10"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
          <DialogHeader className="space-y-4">
            <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full border border-primary/40 bg-primary/10">
              <CheckCircle className="h-8 w-8 text-primary" />
            </div>
            <DialogTitle className="text-center font-serif text-2xl text-primary">
              Thank You for Your Inquiry
            </DialogTitle>
            <DialogDescription className="text-center text-base text-zinc-300">
              We have received your inquiry successfully.
              <br />
              <br />
              Our team will get back to you with the best available quote as soon as possible.
              <br />
              <br />
              If you prefer to make an instant booking now, you may proceed to our official booking page.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-2 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => {
                window.location.href = "https://hotelexcella.bookmystay.io/"
              }}
              className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-3 font-semibold text-primary-foreground transition-all hover:bg-primary/90"
            >
              Proceed to Booking
            </button>
            <button
              type="button"
              onClick={handleCloseSuccessModal}
              className="inline-flex items-center justify-center rounded-lg border border-primary/40 px-4 py-3 font-medium text-primary transition-colors hover:bg-primary/10"
            >
              Close
            </button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="h-16 lg:hidden" />
    </div>
  )
}
