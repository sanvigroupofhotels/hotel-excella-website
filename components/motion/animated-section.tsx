"use client"

import { motion } from "framer-motion"
import React from "react"

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  direction?: "up" | "down" | "left" | "right"
}

export function AnimatedSection({
  children,
  className = "",
  direction = "up",
}: AnimatedSectionProps) {
  const directions = {
    up: { y: 40 },
    down: { y: -40 },
    left: { x: 40 },
    right: { x: -40 },
  }

  const initialValue = directions[direction]

  return (
    <motion.div
      initial={{ opacity: 0, ...initialValue }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
