"use client"

import { useState } from "react"
import { RiWhatsappFill, RiFacebookFill, RiFileCopyLine, RiCheckLine } from "@remixicon/react"

interface ShareButtonsProps {
  title: string
  storyUrl: string
}

export function ShareButtons({ title, storyUrl }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)
  const encodedUrl = encodeURIComponent(storyUrl)
  const encodedTitle = encodeURIComponent(title)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(storyUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard API not available
    }
  }

  return (
    <section className="space-y-3">
      <h3 className="text-sm font-semibold text-(--color-text-muted)">Share this story</h3>
      <div className="flex flex-wrap gap-2">
        <a
          href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 rounded-lg bg-(--color-brand-whatsapp)/10 px-2.5 py-1.5 text-xs font-medium text-(--color-brand-whatsapp) transition-colors hover:bg-(--color-brand-whatsapp)/20 sm:gap-2 sm:px-4 sm:py-2 sm:text-sm"
        >
          <RiWhatsappFill className="h-4 w-4" />
          WhatsApp
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 rounded-lg bg-(--color-brand-facebook)/10 px-2.5 py-1.5 text-xs font-medium text-(--color-brand-facebook) transition-colors hover:bg-(--color-brand-facebook)/20 sm:gap-2 sm:px-4 sm:py-2 sm:text-sm"
        >
          <RiFacebookFill className="h-4 w-4" />
          Facebook
        </a>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-lg bg-(--color-bg-elevated) px-2.5 py-1.5 text-xs font-medium text-(--color-text-muted) transition-colors hover:text-(--color-text-primary) sm:gap-2 sm:px-4 sm:py-2 sm:text-sm"
        >
          {copied ? <RiCheckLine className="h-4 w-4 text-green-500" /> : <RiFileCopyLine className="h-4 w-4" />}
          {copied ? "Copied!" : "Copy link"}
        </button>
      </div>
    </section>
  )
}
