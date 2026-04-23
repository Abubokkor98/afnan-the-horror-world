"use client"

import { useRef } from "react"
import { RiArrowLeftSLine, RiArrowRightSLine } from "@remixicon/react"

const SCROLL_AMOUNT = 320

interface ScrollArrowsProps {
  scrollContainerRef: React.RefObject<HTMLDivElement | null>
}

export function ScrollArrows({ scrollContainerRef }: ScrollArrowsProps) {
  function scrollBy(direction: "left" | "right") {
    const container = scrollContainerRef.current
    if (!container) return

    const amount = direction === "left" ? -SCROLL_AMOUNT : SCROLL_AMOUNT
    container.scrollBy({ left: amount, behavior: "smooth" })
  }

  return (
    <>
      <button
        onClick={() => scrollBy("left")}
        aria-label="Scroll left"
        className="absolute top-1/2 left-0 z-10 hidden -translate-y-1/2 rounded-full bg-(--color-bg-elevated) p-2 shadow-lg transition-colors hover:bg-(--color-crimson) md:flex"
      >
        <RiArrowLeftSLine className="h-5 w-5 text-(--color-text-primary)" />
      </button>
      <button
        onClick={() => scrollBy("right")}
        aria-label="Scroll right"
        className="absolute top-1/2 right-0 z-10 hidden -translate-y-1/2 rounded-full bg-(--color-bg-elevated) p-2 shadow-lg transition-colors hover:bg-(--color-crimson) md:flex"
      >
        <RiArrowRightSLine className="h-5 w-5 text-(--color-text-primary)" />
      </button>
    </>
  )
}
