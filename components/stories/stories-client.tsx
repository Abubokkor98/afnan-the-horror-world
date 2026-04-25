"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import type { Video, Playlist } from "@/types/youtube"
import { durationToMinutes } from "@/lib/format"
import { VideoGrid } from "@/components/video/video-grid"
import { StoriesFilterBar } from "@/components/stories/stories-filter-bar"

interface StoriesClientProps {
  videos: Video[]
  playlists: Playlist[]
}

const VALID_SORT_OPTIONS = ["newest", "oldest", "most-viewed", "least-viewed"] as const
const VALID_DURATION_OPTIONS = ["all", "short", "medium", "long"] as const

type SortOption = typeof VALID_SORT_OPTIONS[number]
type DurationOption = typeof VALID_DURATION_OPTIONS[number]

function parseSort(value: string | null): SortOption {
  return VALID_SORT_OPTIONS.includes(value as SortOption) ? (value as SortOption) : "newest"
}

function parseDuration(value: string | null): DurationOption {
  return VALID_DURATION_OPTIONS.includes(value as DurationOption) ? (value as DurationOption) : "all"
}

const STORIES_PER_PAGE = 24
const SHORT_MAX_MINUTES = 10
const MEDIUM_MAX_MINUTES = 30

export function StoriesClient({ videos, playlists }: StoriesClientProps) {
  const searchParams = useSearchParams()
  const [category, setCategory] = useState(searchParams.get("filter") ?? searchParams.get("category") ?? "all")
  const [sort, setSort] = useState<SortOption>(parseSort(searchParams.get("sort")))
  const [duration, setDuration] = useState<DurationOption>(parseDuration(searchParams.get("duration")))
  const [visibleCount, setVisibleCount] = useState(STORIES_PER_PAGE)

  const hasActiveFilters = category !== "all" || sort !== "newest" || duration !== "all"

  const filtered = videos.filter((video) => {
    if (category !== "all") {
      if (category === "uncategorized") {
        if (video.categorySlug !== "") return false
      } else if (video.categorySlug !== category) return false
    }
    if (duration !== "all") {
      const mins = durationToMinutes(video.duration)
      if (duration === "short" && mins >= SHORT_MAX_MINUTES) return false
      if (duration === "medium" && (mins < SHORT_MAX_MINUTES || mins > MEDIUM_MAX_MINUTES)) return false
      if (duration === "long" && mins <= MEDIUM_MAX_MINUTES) return false
    }
    return true
  })

  const sorted = [...filtered].sort((a, b) => {
    if (sort === "newest") return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    if (sort === "oldest") return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()
    if (sort === "most-viewed") return b.viewCount - a.viewCount
    return a.viewCount - b.viewCount
  })

  const visible = sorted.slice(0, visibleCount)
  const hasMore = visibleCount < sorted.length

  function handleClear() {
    setCategory("all")
    setSort("newest")
    setDuration("all")
    setVisibleCount(STORIES_PER_PAGE)
  }

  return (
    <>
      <StoriesFilterBar
        playlists={playlists}
        activeCategory={category}
        activeSort={sort}
        activeDuration={duration}
        onCategoryChange={(c) => { setCategory(c); setVisibleCount(STORIES_PER_PAGE) }}
        onSortChange={(s) => { setSort(s); setVisibleCount(STORIES_PER_PAGE) }}
        onDurationChange={(d) => { setDuration(d); setVisibleCount(STORIES_PER_PAGE) }}
        onClear={handleClear}
        hasActiveFilters={hasActiveFilters}
      />

      {sorted.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-lg text-(--color-text-muted)">No stories found</p>
          <p className="mt-2 text-sm text-(--color-text-subtle)">Try adjusting your filters or browse categories</p>
        </div>
      ) : (
        <>
          <VideoGrid videos={visible} priorityCount={4} />
          {hasMore && (
            <div className="pt-4 text-center">
              <button
                onClick={() => setVisibleCount((c) => c + STORIES_PER_PAGE)}
                className="rounded-lg border border-(--color-bg-elevated) bg-(--color-bg-card) px-6 py-2.5 text-sm font-medium text-(--color-text-primary) transition-colors hover:border-(--color-crimson) hover:text-(--color-crimson)"
              >
                Load More ({sorted.length - visibleCount} remaining)
              </button>
            </div>
          )}
        </>
      )}
    </>
  )
}
