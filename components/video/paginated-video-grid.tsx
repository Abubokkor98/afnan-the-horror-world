/**
 * Renders a sliced view of `videos` with a "Load More" button.
 * Internal pagination state (`visibleCount`) is initialized once from `pageSize`
 * and is NOT reset when `videos` changes. Callers that mutate the input list
 * (e.g. via filters/search) should remount this component by passing a React
 * `key` derived from the relevant inputs to reset pagination back to the first page.
 */

"use client"

import { useState } from "react"
import type { Video } from "@/types/youtube"
import { VideoGrid } from "@/components/video/video-grid"
import { LoadMoreButton } from "@/components/load-more-button"

interface PaginatedVideoGridProps {
  videos: Video[]
  pageSize?: number
  priorityCount?: number
}

const DEFAULT_PAGE_SIZE = 20

export function PaginatedVideoGrid({
  videos,
  pageSize = DEFAULT_PAGE_SIZE,
  priorityCount = 4,
}: PaginatedVideoGridProps) {
  const [visibleCount, setVisibleCount] = useState(pageSize)

  const visible = videos.slice(0, visibleCount)
  const hasMore = visibleCount < videos.length
  const remaining = videos.length - visibleCount

  if (videos.length === 0) return null

  return (
    <>
      <VideoGrid videos={visible} priorityCount={priorityCount} />
      {hasMore && (
        <LoadMoreButton
          remaining={remaining}
          onClick={() => setVisibleCount((c) => c + pageSize)}
        />
      )}
    </>
  )
}
