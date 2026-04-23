"use client"

import { startTransition } from "react"
import { useRouter } from "next/navigation"
import { ErrorBoundary } from "react-error-boundary"
import { SectionError } from "@/components/section-error"

interface SectionErrorBoundaryProps {
  name: string
  children: React.ReactNode
}

export function SectionErrorBoundary({ name, children }: SectionErrorBoundaryProps) {
  const router = useRouter()

  return (
    <ErrorBoundary
      fallbackRender={({ resetErrorBoundary }) => (
        <SectionError
          title={name}
          onRetry={() => {
            startTransition(() => {
              router.refresh()
              resetErrorBoundary()
            })
          }}
        />
      )}
    >
      {children}
    </ErrorBoundary>
  )
}
