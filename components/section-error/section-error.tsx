"use client"

import { useRouter } from "next/navigation"
import { RiErrorWarningLine } from "@remixicon/react"
import { Button } from "@/components/ui/button"

interface SectionErrorProps {
  title: string
  onRetry?: () => void
}

export function SectionError({ title, onRetry }: SectionErrorProps) {
  const router = useRouter()

  function handleRetry() {
    if (onRetry) {
      onRetry()
      return
    }
    router.refresh()
  }

  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-(--color-text-subtle)/30 px-6 py-8">
      <RiErrorWarningLine className="h-6 w-6 text-(--color-text-muted)" />
      <p className="text-sm text-(--color-text-muted)">
        Couldn&apos;t load {title} at this time
      </p>
      <Button
        variant="outline"
        size="sm"
        onClick={handleRetry}
        className="border-(--color-text-subtle) text-(--color-text-muted) hover:border-(--color-crimson) hover:text-(--color-crimson)"
      >
        Try again
      </Button>
    </div>
  )
}
