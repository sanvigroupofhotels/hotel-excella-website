"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { StickyCTA } from "@/components/sticky-cta"
import { Star, Send, Loader2, X } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { JsonLd } from "@/components/seo/json-ld"

export default function ReviewPage() {
  const [rating, setRating] = useState<number | null>(null)
  const [hoveredRating, setHoveredRating] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    roomNumber: "",
    issue: "",
    improvement: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isFeedbackSuccessModalOpen, setIsFeedbackSuccessModalOpen] = useState(false)
  const [showReminderCard, setShowReminderCard] = useState(false)

  const handleCloseFeedbackSuccessModal = () => {
    setIsFeedbackSuccessModalOpen(false)
    window.location.href = "/guest"
  }

  useEffect(() => {
    const firstVisitKey = "review-page-first-visit"
    const now = Date.now()
    const savedFirstVisit = window.localStorage.getItem(firstVisitKey)

    if (!savedFirstVisit) {
      window.localStorage.setItem(firstVisitKey, String(now))
    }

    const visitTime = savedFirstVisit ? Number(savedFirstVisit) : now
    const hoursSinceFirstVisit = (now - visitTime) / (1000 * 60 * 60)
    const hour = new Date().getHours()
    const isEvening = hour >= 18

    if (hoursSinceFirstVisit >= 3 || isEvening) {
      setShowReminderCard(true)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isSubmitting) return
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, rating }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit feedback")
      }

      setIsFeedbackSuccessModalOpen(true)
      setFormData({
        name: "",
        phone: "",
        roomNumber: "",
        issue: "",
        improvement: "",
      })
    } catch (error) {
      console.error("Error submitting feedback:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const googleReviewUrl = "https://search.google.com/local/writereview?placeid=ChIJH-C8eTZbOToRDi7ckoJipcQ"

  // Schema for review page
  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Hotel Review - Hotel Excella Vizag",
    description: "Leave a guest review for Hotel Excella Vizag",
    url: "https://hotelexcella.in/review",
    isPartOf: {
      "@type": "WebSite",
      name: "Hotel Excella Vizag",
      url: "https://hotelexcella.in",
    },
    mainEntity: {
      "@type": "LocalBusiness",
      "@id": "https://hotelexcella.in",
      name: "Hotel Excella",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.5",
        reviewCount: "150",
      },
    },
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#3a2a12_0%,#111_45%,#070707_100%)] text-white">
      <JsonLd data={reviewSchema} />
      <Header />

      <main className="pt-20">
        <section className="px-4 py-10 lg:py-14">
          <div className="mx-auto max-w-3xl overflow-hidden rounded-[2rem] border border-primary/30 bg-black/70 p-6 text-center shadow-2xl shadow-black/50 backdrop-blur md:p-10">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-primary/30 bg-white/5">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-qq8Cvn8rVABsuUvFcXt0Nc1n64vZlL.png"
                alt="Hotel Excella Logo"
                width={140}
                height={70}
                className="h-14 w-auto"
                priority
              />
            </div>
            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.35em] text-primary">Guest Review</p>
            <h1 className="mt-4 font-serif text-4xl font-bold leading-tight text-white md:text-6xl">
              How was your stay?
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-zinc-300 md:text-lg">
              Tap a star below. 4–5 stars opens Google Review, while 1–3 stars lets our team fix things privately.
            </p>
          </div>
        </section>

        <section className="px-4 pb-16">
          <div className="mx-auto max-w-3xl">
            {showReminderCard && !rating && (
              <div className="mb-5 rounded-2xl border border-primary/35 bg-primary/10 p-4 text-center text-sm text-zinc-200">
                Enjoyed your stay? A quick rating helps guests find Hotel Excella.
              </div>
            )}
            {!rating ? (
              <div className="rounded-[2rem] border border-primary/25 bg-black/75 p-6 text-center shadow-xl shadow-black/40 md:p-10">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Rate in 5 seconds</p>
                <h2 className="mt-4 font-serif text-3xl font-bold text-white">How would you rate us?</h2>
                <p className="mt-3 text-zinc-400">Select 1–5 stars</p>
                <div className="mt-10 flex justify-center gap-3 sm:gap-5" role="radiogroup" aria-label="Rate your stay from 1 to 5 stars">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const isActive = hoveredRating !== null ? star <= hoveredRating : rating !== null && star <= rating
                    const isHovered = hoveredRating !== null && star <= hoveredRating
                    return (
                      <button
                        key={star}
                        type="button"
                        aria-label={`Rate ${star} out of 5 stars`}
                        onClick={() => {
                          if (star >= 4) {
                            window.location.href = googleReviewUrl
                            return
                          }
                          setRating(star)
                        }}
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(null)}
                        onTouchStart={() => setHoveredRating(star)}
                        onTouchEnd={() => setHoveredRating(null)}
                        className="group relative transition-all duration-200"
                      >
                        <Star
                          className={`h-16 w-16 transition-all duration-200 sm:h-20 sm:w-20 ${
                            isActive
                              ? isHovered
                                ? "fill-yellow-400 text-yellow-400 drop-shadow-[0_0_12px_rgba(250,204,21,0.6)]"
                                : "fill-primary text-primary drop-shadow-[0_0_10px_rgba(215,179,95,0.5)]"
                              : "text-zinc-600 hover:text-zinc-400"
                          }`}
                        />
                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-8 whitespace-nowrap rounded bg-black/80 px-2 py-1 text-xs font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100">{star}</span>
                      </button>
                    )
                  })}
                </div>
                <p className="mt-12 text-sm text-zinc-500">
                  💡 <span className="text-zinc-400">Tap 4 or 5 stars to post to Google Reviews</span>
                </p>
                <p className="mt-2 text-xs text-zinc-600">
                  Tap 1–3 stars to share private feedback with our team
                </p>
              </div>
            ) : (
              <div className="rounded-[2rem] border border-primary/25 bg-black/75 p-6 shadow-xl shadow-black/40 md:p-10">
                <div className="text-center">
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Private Feedback</p>
                  <h2 className="mt-4 font-serif text-3xl font-bold text-white">Tell us what to improve</h2>
                  <p className="mx-auto mt-3 max-w-xl text-zinc-300">
                    Thank you for being honest. This goes directly to the Hotel Excella team so we can respond faster.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="mt-8 grid gap-5">
                  <div className="grid gap-5 md:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="mb-2 block text-sm font-medium text-zinc-200">Name <span className="text-zinc-500">(optional)</span></label>
                      <input id="name" type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-4 text-white placeholder:text-zinc-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder="Your name" />
                    </div>
                    <div>
                      <label htmlFor="phone" className="mb-2 block text-sm font-medium text-zinc-200">Phone <span className="text-zinc-500">(optional)</span></label>
                      <input id="phone" type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-4 text-white placeholder:text-zinc-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder="+91 XXXXX XXXXX" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="roomNumber" className="mb-2 block text-sm font-medium text-zinc-200">Room Number <span className="text-zinc-500">(optional)</span></label>
                    <input id="roomNumber" type="text" value={formData.roomNumber} onChange={(e) => setFormData({ ...formData, roomNumber: e.target.value })} className="w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-4 text-white placeholder:text-zinc-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder="e.g., 101" />
                  </div>
                  <div>
                    <label htmlFor="issue" className="mb-2 block text-sm font-medium text-zinc-200">What went wrong? <span className="text-primary">*</span></label>
                    <textarea id="issue" required rows={3} value={formData.issue} onChange={(e) => setFormData({ ...formData, issue: e.target.value })} className="w-full resize-none rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-4 text-white placeholder:text-zinc-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder="Please describe the issue..." />
                  </div>
                  <div>
                    <label htmlFor="improvement" className="mb-2 block text-sm font-medium text-zinc-200">How can we improve? <span className="text-primary">*</span></label>
                    <textarea id="improvement" required rows={3} value={formData.improvement} onChange={(e) => setFormData({ ...formData, improvement: e.target.value })} className="w-full resize-none rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-4 text-white placeholder:text-zinc-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder="Your suggestions..." />
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <button type="submit" disabled={isSubmitting} className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50">
                      {isSubmitting ? <><Loader2 className="h-5 w-5 animate-spin" /> Sending...</> : <><Send className="h-5 w-5" /> Submit Feedback</>}
                    </button>
                    <button type="button" onClick={() => setRating(null)} className="rounded-full border border-white/15 px-6 py-4 font-semibold text-zinc-300 transition hover:border-primary/50 hover:text-primary">Change rating</button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
      <StickyCTA />

      <Dialog open={isFeedbackSuccessModalOpen} onOpenChange={(open) => { if (!open) handleCloseFeedbackSuccessModal() }}>
        <DialogContent className="border-primary/40 bg-black text-white sm:max-w-lg">
          <button type="button" onClick={handleCloseFeedbackSuccessModal} className="absolute right-4 top-4 rounded-full border border-primary/40 p-1 text-primary transition-colors hover:bg-primary/10" aria-label="Close">
            <X className="h-4 w-4" />
          </button>
          <DialogHeader className="space-y-4">
            <DialogTitle className="text-center font-serif text-2xl text-primary">Thank You</DialogTitle>
            <DialogDescription className="text-center text-base text-zinc-300">We appreciate your feedback and will use it to improve your next stay.</DialogDescription>
          </DialogHeader>
          <button type="button" onClick={handleCloseFeedbackSuccessModal} className="mt-2 inline-flex w-full items-center justify-center rounded-lg border border-primary/40 px-4 py-3 font-medium text-primary transition-colors hover:bg-primary/10">Close</button>
        </DialogContent>
      </Dialog>

      <div className="h-16 lg:hidden" />
    </div>
  )
}
