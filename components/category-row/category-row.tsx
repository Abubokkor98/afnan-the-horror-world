"use client"

import { useRef } from "react"
import Link from "next/link"
import type { Video } from "@/types/youtube"
import { VideoCard } from "@/components/video-card/video-card"
import { ScrollArrows } from "@/components/category-row/scroll-arrows"

interface CategoryRowProps {
  title: string
  href?: string
  videos: Video[]
}

export function CategoryRow({ title, href, videos }: CategoryRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  if (videos.length === 0) return null

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">{title}</h2>
        {href && (
          <Link
            href={href}
            className="text-sm font-medium text-(--color-crimson) transition-colors hover:text-(--color-crimson-hover)"
          >
            View All →
          </Link>
        )}
      </div>

      <div className="relative">
        <ScrollArrows scrollContainerRef={scrollRef} />
        <div
          ref={scrollRef}
          className="scrollbar-hide flex gap-4 overflow-x-auto scroll-smooth pb-2"
        >
          {videos.map((video, index) => (
            <div key={video.id} className="w-64 shrink-0 sm:w-72">
              <VideoCard video={video} priority={index < 2} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
