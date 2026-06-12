"use client"

import { Star, Quote } from "lucide-react"
import { motion } from "framer-motion"
import type { FeaturedReview } from "@/lib/reviews"

interface ReviewCardProps {
  review: FeaturedReview
  index?: number
}

export function ReviewCard({ review, index = 0 }: ReviewCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md"
    >
      {/* Star Rating */}
      <div className="flex items-center gap-1 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < review.rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-muted-foreground"
            }`}
          />
        ))}
      </div>

      {/* Review Text */}
      <div className="mb-4">
        <Quote className="h-4 w-4 text-primary/50 mb-2" />
        <p className="text-sm text-foreground leading-relaxed">{review.reviewText}</p>
      </div>

      {/* Guest Info */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div>
          <p className="text-sm font-semibold text-foreground">{review.guestName}</p>
          <p className="text-xs text-muted-foreground">
            {new Date(review.reviewDate).toLocaleDateString("en-IN", {
              year: "numeric",
              month: "short",
            })}
          </p>
        </div>
        <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary capitalize">
          {review.category}
        </span>
      </div>
    </motion.div>
  )
}
