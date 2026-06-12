"use client"

import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"
import { ReviewCard } from "./review-card"
import type { FeaturedReview } from "@/lib/reviews"

interface ReviewCarouselProps {
  reviews: FeaturedReview[]
  title?: string
  subtitle?: string
  showCTA?: boolean
  itemsPerPage?: number
}

export function ReviewCarousel({
  reviews,
  title = "What Our Guests Say",
  subtitle,
  showCTA = true,
  itemsPerPage = 3,
}: ReviewCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleCount, setVisibleCount] = useState(itemsPerPage)

  // Handle responsive sizing
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1)
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2)
      } else {
        setVisibleCount(itemsPerPage)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [itemsPerPage])

  // Auto-rotate carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % Math.max(1, reviews.length - visibleCount + 1))
    }, 6000)
    return () => clearInterval(timer)
  }, [reviews.length, visibleCount])

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.max(1, reviews.length - visibleCount + 1)) % Math.max(1, reviews.length - visibleCount + 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, reviews.length - visibleCount + 1))
  }

  const visibleReviews = reviews.slice(currentIndex, currentIndex + visibleCount)

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
            {title}
          </h2>
          {subtitle && (
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[400px]">
            {visibleReviews.map((review, idx) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
              >
                <ReviewCard review={review} index={idx} />
              </motion.div>
            ))}
          </div>

          {/* Navigation Arrows */}
          {reviews.length > visibleCount && (
            <>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={goToPrevious}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 sm:-translate-x-16 p-2 rounded-full border border-border hover:bg-secondary transition-colors z-10"
                aria-label="Previous reviews"
              >
                <ChevronLeft className="h-5 w-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={goToNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 sm:translate-x-16 p-2 rounded-full border border-border hover:bg-secondary transition-colors z-10"
                aria-label="Next reviews"
              >
                <ChevronRight className="h-5 w-5" />
              </motion.button>
            </>
          )}
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({
            length: Math.max(1, reviews.length - visibleCount + 1),
          }).map((_, idx) => (
            <motion.button
              key={idx}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all ${
                idx === currentIndex
                  ? "bg-primary w-8"
                  : "bg-border w-2 hover:bg-muted-foreground"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* CTA */}
        {showCTA && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-12"
          >
            <a
              href="https://search.google.com/local/writereview?placeid=ChIJH-C8eTZbOToRDi7ckoJipcQ"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              View More Reviews on Google
              <ChevronRight className="h-4 w-4" />
            </a>
          </motion.div>
        )}
      </div>
    </section>
  )
}
