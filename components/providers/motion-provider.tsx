"use client"

import { LazyMotion } from "motion/react"
import { loadFeatures } from "@/lib/motion-features"

interface MotionProviderProps {
  children: React.ReactNode
}

export function MotionProvider({ children }: MotionProviderProps) {
  return (
    <LazyMotion features={loadFeatures} strict>
      {children}
    </LazyMotion>
  )
}
