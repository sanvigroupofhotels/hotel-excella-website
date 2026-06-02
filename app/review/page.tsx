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

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-card border-b border-border py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 text-center">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-qq8Cvn8rVABsuUvFcXt0Nc1n64vZlL.png"
              alt="Hotel Excella Logo"
              width={150}
              height={75}
              className="mx-auto h-16 w-auto lg:h-20"
            />
            <h1 className="mt-8 font-serif text-3xl font-bold text-foreground lg:text-5xl text-balance">
              How was your stay at{" "}
              <span className="text-primary">Hotel Excella</span>?
            </h1>
            <p className="mt-4 text-xl font-medium text-foreground">
              Enjoying your stay with us?
            </p>
            <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto text-pretty">
              Your feedback means a lot to our team 💛
            </p>
          </div>
        </section>

        {/* Rating Section */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-2xl px-4">
            {showReminderCard && !rating && (
              <div className="mb-8 rounded-xl border border-primary/35 bg-primary/10 p-4 text-center">
                <p className="text-sm font-medium text-foreground">Review Reminder</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  If you enjoyed your stay, a quick rating helps our team grow.
                </p>
              </div>
            )}
            {!rating ? (
              <div className="text-center">
                <p className="text-lg font-medium text-foreground mb-8">
                  Please rate your experience
                </p>
                <div className="flex items-center justify-center gap-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => {
                        if (star >= 4) {
                          window.location.href = googleReviewUrl
                          return
                        }
                        setRating(star)
                      }}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(null)}
                      className="group flex flex-col items-center gap-2 transition-transform hover:scale-110"
                    >
                      <Star
                        className={`h-12 w-12 lg:h-16 lg:w-16 transition-colors ${
                          (hoveredRating !== null ? star <= hoveredRating : false)
                            ? "fill-primary text-primary"
                            : "text-muted-foreground"
                        }`}
                      />
                      <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground">
                        {star}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              /* Private Feedback Form */
              <div>
                <div className="text-center mb-8">
                  <h2 className="font-serif text-2xl font-bold text-foreground lg:text-3xl">
                    We&apos;re sorry to hear that
                  </h2>
                  <p className="mt-4 text-muted-foreground">
                    Please share your feedback privately with us. We take all
                    concerns seriously and will work to make it right.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Name <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full rounded-lg border border-border bg-secondary px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Phone Number <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      required
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full rounded-lg border border-border bg-secondary px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="roomNumber"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Room Number{" "}
                      <span className="text-muted-foreground">(optional)</span>
                    </label>
                    <input
                      type="text"
                      id="roomNumber"
                      value={formData.roomNumber}
                      onChange={(e) =>
                        setFormData({ ...formData, roomNumber: e.target.value })
                      }
                      className="w-full rounded-lg border border-border bg-secondary px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      placeholder="e.g., 101"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="issue"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      What went wrong? <span className="text-destructive">*</span>
                    </label>
                    <textarea
                      id="issue"
                      required
                      rows={4}
                      value={formData.issue}
                      onChange={(e) =>
                        setFormData({ ...formData, issue: e.target.value })
                      }
                      className="w-full rounded-lg border border-border bg-secondary px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                      placeholder="Please describe the issue you experienced..."
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="improvement"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      How can we improve?{" "}
                      <span className="text-destructive">*</span>
                    </label>
                    <textarea
                      id="improvement"
                      required
                      rows={4}
                      value={formData.improvement}
                      onChange={(e) =>
                        setFormData({ ...formData, improvement: e.target.value })
                      }
                      className="w-full rounded-lg border border-border bg-secondary px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                      placeholder="Your suggestions for improvement..."
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-lg hover:bg-primary/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" />
                          Sending Inquiry...
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5" />
                          Submit Feedback
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setRating(null)}
                      className="px-6 py-4 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Change rating
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
      <StickyCTA />

      <Dialog
        open={isFeedbackSuccessModalOpen}
        onOpenChange={(open) => {
          if (!open) {
            handleCloseFeedbackSuccessModal()
          }
        }}
      >
        <DialogContent className="border-primary/40 bg-black text-white sm:max-w-lg">
          <button
            type="button"
            onClick={handleCloseFeedbackSuccessModal}
            className="absolute right-4 top-4 rounded-full border border-primary/40 p-1 text-primary transition-colors hover:bg-primary/10"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
          <DialogHeader className="space-y-4">
            <DialogTitle className="text-center font-serif text-2xl text-primary">
              Thank You
            </DialogTitle>
            <DialogDescription className="text-center text-base text-zinc-300">
              We appreciate your feedback and will use it to improve your next stay.
            </DialogDescription>
          </DialogHeader>
          <button
            type="button"
            onClick={handleCloseFeedbackSuccessModal}
            className="mt-2 inline-flex w-full items-center justify-center rounded-lg border border-primary/40 px-4 py-3 font-medium text-primary transition-colors hover:bg-primary/10"
          >
            Close
          </button>
        </DialogContent>
      </Dialog>


      <div className="h-16 lg:hidden" />
    </div>
  )
}
