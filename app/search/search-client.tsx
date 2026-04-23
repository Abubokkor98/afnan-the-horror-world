"use client"

import { use, useState } from "react"
import { useRouter } from "next/navigation"
import { RiSearchLine } from "@remixicon/react"
import type { Video, Playlist } from "@/types/youtube"
import { SearchResults } from "@/app/search/search-results"

interface SearchClientProps {
  initialQuery: string
  videosPromise: Promise<Video[]>
  playlistsPromise: Promise<Playlist[]>
}

const DEBOUNCE_MS = 300

export function SearchClient({ initialQuery, videosPromise, playlistsPromise }: SearchClientProps) {
  const videos = use(videosPromise)
  const playlists = use(playlistsPromise)
  const router = useRouter()

  const [query, setQuery] = useState(initialQuery)
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery)
  const [category, setCategory] = useState("all")
  const [debounceTimer, setDebounceTimer] = useState<ReturnType<typeof setTimeout> | null>(null)

  function handleQueryChange(value: string) {
    setQuery(value)

    if (debounceTimer) clearTimeout(debounceTimer)
    const timer = setTimeout(() => {
      setDebouncedQuery(value)
      if (value.trim()) {
        router.replace(`/search?q=${encodeURIComponent(value.trim())}`, { scroll: false })
      }
    }, DEBOUNCE_MS)
    setDebounceTimer(timer)
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (debounceTimer) clearTimeout(debounceTimer)
    setDebouncedQuery(query)
    if (query.trim()) {
      router.replace(`/search?q=${encodeURIComponent(query.trim())}`, { scroll: false })
    }
  }

  const lowerQuery = debouncedQuery.trim().toLowerCase()

  const filtered = lowerQuery
    ? videos.filter((video) => {
        const matchesTitle = video.title.toLowerCase().includes(lowerQuery)
        if (!matchesTitle) return false
        if (category === "all") return true
        if (category === "uncategorized") return video.categorySlug === ""
        return video.categorySlug === category
      })
    : []

  return (
    <>
      {/* Search bar */}
      <form onSubmit={handleSubmit} className="relative">
        <RiSearchLine className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-(--color-text-muted)" />
        <input
          name="q"
          type="search"
          value={query}
          onChange={(e) => handleQueryChange(e.target.value)}
          placeholder="Search stories by title..."
          autoFocus
          className="h-12 w-full rounded-xl border border-(--color-bg-elevated) bg-(--color-bg-card) pr-4 pl-12 text-base text-(--color-text-primary) placeholder:text-(--color-text-subtle) focus:border-(--color-crimson) focus:ring-2 focus:ring-(--color-crimson)/20 focus:outline-none"
        />
      </form>

      <SearchResults
        query={debouncedQuery}
        videos={filtered}
        playlists={playlists}
        activeCategory={category}
        onCategoryChange={setCategory}
      />
    </>
  )
}
