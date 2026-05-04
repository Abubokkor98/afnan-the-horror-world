"use client"

import { RiYoutubeFill } from "@remixicon/react"

interface AfnansBeeBadgeProps {
  href: string
}

export function AfnansBeeBadge({ href }: AfnansBeeBadgeProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Visit AfnansBee on YouTube"
      className="absolute -right-7 top-5 flex w-28 rotate-45 items-center justify-center gap-1 bg-(--color-amber) py-1 text-[10px] font-bold uppercase tracking-wider text-white transition-colors hover:bg-(--color-amber-hover) md:-right-8 md:w-32 md:text-xs"
    >
      <RiYoutubeFill className="h-2.5 w-2.5 shrink-0" aria-hidden="true" />
      @Bee
    </a>
  )
}
