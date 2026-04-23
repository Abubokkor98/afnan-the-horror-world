"use client"

import { useState } from "react"
import { RiWhatsappFill, RiFacebookFill, RiFileCopyLine, RiCheckLine } from "@remixicon/react"

interface ShareButtonsProps {
  videoId: string
  title: string
  storyUrl: string
}

export function ShareButtons({ videoId, title, storyUrl }: ShareButtonsProps) {
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
      <div className="flex gap-2">
        <a
          href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-lg bg-(--color-brand-whatsapp)/10 px-4 py-2 text-sm font-medium text-(--color-brand-whatsapp) transition-colors hover:bg-(--color-brand-whatsapp)/20"
        >
          <RiWhatsappFill className="h-4 w-4" />
          WhatsApp
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-lg bg-(--color-brand-facebook)/10 px-4 py-2 text-sm font-medium text-(--color-brand-facebook) transition-colors hover:bg-(--color-brand-facebook)/20"
        >
          <RiFacebookFill className="h-4 w-4" />
          Facebook
        </a>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 rounded-lg bg-(--color-bg-elevated) px-4 py-2 text-sm font-medium text-(--color-text-muted) transition-colors hover:text-(--color-text-primary)"
        >
          {copied ? <RiCheckLine className="h-4 w-4 text-green-500" /> : <RiFileCopyLine className="h-4 w-4" />}
          {copied ? "Copied!" : "Copy link"}
        </button>
      </div>
    </section>
  )
}
