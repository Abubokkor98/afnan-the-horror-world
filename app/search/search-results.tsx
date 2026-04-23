"use client"

import Link from "next/link"
import type { Video, Playlist } from "@/types/youtube"
import { Badge } from "@/components/ui/badge"
import { VideoGrid } from "@/components/video-grid"

interface SearchResultsProps {
  query: string
  videos: Video[]
  playlists: Playlist[]
  activeCategory: string
  onCategoryChange: (category: string) => void
}

export function SearchResults({
  query,
  videos,
  playlists,
  activeCategory,
  onCategoryChange,
}: SearchResultsProps) {
  const trimmedQuery = query.trim()
  const hasQuery = trimmedQuery.length > 0
  const resultCount = videos.length
  const resultLabel = resultCount === 1 ? "story" : "stories"

  if (!hasQuery) {
    return (
      <div className="py-20 text-center">
        <p className="text-lg text-(--color-text-muted)">Type a keyword to search stories</p>
        <p className="mt-2 text-sm text-(--color-text-subtle)">
          Search works in both English and Bangla
        </p>
      </div>
    )
  }

  return (
    <>
      {/* Category filter chips */}
      <div className="scrollbar-hide flex gap-2 overflow-x-auto">
        <FilterChip label="All" active={activeCategory === "all"} onClick={() => onCategoryChange("all")} />
        {playlists.map((p) => (
          <FilterChip key={p.id} label={p.title} active={activeCategory === p.slug} onClick={() => onCategoryChange(p.slug)} />
        ))}
        <FilterChip label="Uncategorized" active={activeCategory === "uncategorized"} onClick={() => onCategoryChange("uncategorized")} />
      </div>

      {/* Results header */}
      <p className="text-sm text-(--color-text-muted)">
        {resultCount} {resultLabel} found for &ldquo;
        <span className="font-medium text-(--color-text-primary)">{trimmedQuery}</span>
        &rdquo;
      </p>

      {/* Results grid or empty state */}
      {resultCount === 0 ? (
        <div className="py-16 text-center">
          <p className="text-lg text-(--color-text-muted)">No stories found</p>
          <p className="mt-2 text-sm text-(--color-text-subtle)">
            Try a different keyword or{" "}
            <Link href="/stories" className="text-(--color-crimson) hover:text-(--color-crimson-hover)">
              browse all stories
            </Link>
          </p>
        </div>
      ) : (
        <VideoGrid videos={videos} priorityCount={4} />
      )}
    </>
  )
}

function FilterChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <Badge
      asChild
      className={`shrink-0 cursor-pointer transition-colors ${active ? "bg-(--color-crimson) text-white hover:bg-(--color-crimson-hover)" : "bg-(--color-bg-elevated) text-(--color-text-muted) hover:bg-(--color-bg-card) hover:text-(--color-text-primary)"}`}
    >
      <button type="button" aria-pressed={active} onClick={onClick}>
        {label}
      </button>
    </Badge>
  )
}
