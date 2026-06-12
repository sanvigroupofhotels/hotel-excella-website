"use client"

import { motion } from "framer-motion"
import React from "react"

interface AnimatedCardProps {
  children: React.ReactNode
  delay?: number
  className?: string
  index?: number
}

export function AnimatedCard({ children, delay = 0, className = "", index = 0 }: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: delay || index * 0.1,
        ease: "easeOut",
      }}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
