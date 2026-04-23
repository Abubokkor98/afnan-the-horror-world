"use client"

import { Badge } from "@/components/ui/badge"
import type { Playlist } from "@/types/youtube"

type SortOption = "newest" | "oldest" | "most-viewed" | "least-viewed"
type DurationFilter = "all" | "short" | "medium" | "long"

interface StoriesFilterBarProps {
  playlists: Playlist[]
  activeCategory: string
  activeSort: SortOption
  activeDuration: DurationFilter
  onCategoryChange: (category: string) => void
  onSortChange: (sort: SortOption) => void
  onDurationChange: (duration: DurationFilter) => void
  onClear: () => void
  hasActiveFilters: boolean
}

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "most-viewed", label: "Most viewed" },
  { value: "least-viewed", label: "Least viewed" },
]

const DURATION_OPTIONS: { value: DurationFilter; label: string }[] = [
  { value: "all", label: "Any length" },
  { value: "short", label: "Short (< 10 min)" },
  { value: "medium", label: "Medium (10-30 min)" },
  { value: "long", label: "Long (> 30 min)" },
]

export function StoriesFilterBar({
  playlists,
  activeCategory,
  activeSort,
  activeDuration,
  onCategoryChange,
  onSortChange,
  onDurationChange,
  onClear,
  hasActiveFilters,
}: StoriesFilterBarProps) {
  return (
    <div className="sticky top-16 z-40 -mx-4 space-y-3 border-b border-(--color-border) bg-(--color-bg-page)/95 px-4 py-4 backdrop-blur-md">
      {/* Category chips */}
      <div className="scrollbar-hide flex gap-2 overflow-x-auto">
        <CategoryChip label="All" active={activeCategory === "all"} onClick={() => onCategoryChange("all")} />
        {playlists.map((p) => (
          <CategoryChip key={p.id} label={p.title} active={activeCategory === p.slug} onClick={() => onCategoryChange(p.slug)} />
        ))}
        <CategoryChip label="Uncategorized" active={activeCategory === "uncategorized"} onClick={() => onCategoryChange("uncategorized")} />
      </div>

      {/* Sort + Duration + Clear */}
      <div className="flex flex-wrap items-center gap-3">
        <select value={activeSort} onChange={(e) => onSortChange(e.target.value as SortOption)} className="rounded-lg border border-(--color-bg-elevated) bg-(--color-bg-card) px-3 py-1.5 text-sm text-(--color-text-primary) outline-none">
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <select value={activeDuration} onChange={(e) => onDurationChange(e.target.value as DurationFilter)} className="rounded-lg border border-(--color-bg-elevated) bg-(--color-bg-card) px-3 py-1.5 text-sm text-(--color-text-primary) outline-none">
          {DURATION_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        {hasActiveFilters && (
          <button onClick={onClear} className="text-sm text-(--color-crimson) transition-colors hover:text-(--color-crimson-hover)">
            Clear filters
          </button>
        )}
      </div>
    </div>
  )
}

function CategoryChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <Badge
      onClick={onClick}
      className={`shrink-0 cursor-pointer transition-colors ${active ? "bg-(--color-crimson) text-white hover:bg-(--color-crimson-hover)" : "bg-(--color-bg-elevated) text-(--color-text-muted) hover:bg-(--color-bg-card) hover:text-(--color-text-primary)"}`}
    >
      {label}
    </Badge>
  )
}
