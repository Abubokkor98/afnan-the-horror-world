"use client"

import { useState, type SubmitEvent } from "react"
import { RiSearchLine } from "@remixicon/react"

interface MobileSearchProps {
  onSubmit: (query: string) => void
}

export function MobileSearch({ onSubmit }: MobileSearchProps) {
  const [query, setQuery] = useState("")

  function handleSearch(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    const trimmed = query.trim()
    if (!trimmed) return
    onSubmit(trimmed)
  }

  return (
    <form onSubmit={handleSearch} className="relative px-4 pt-4" role="search">
      <label htmlFor="mobile-search" className="sr-only">Search stories</label>
      <input
        id="mobile-search"
        name="q"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search stories…"
        autoComplete="off"
        className="h-10 w-full rounded-lg border border-(--color-bg-elevated) bg-(--color-bg-card) pr-10 pl-4 text-sm text-(--color-text-primary) placeholder:text-(--color-text-subtle) focus:border-(--color-crimson) focus:ring-2 focus:ring-(--color-crimson)/20 focus:outline-none"
      />
      <button type="submit" disabled={!query.trim()} aria-label="Search" className="absolute top-1/2 right-7 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center disabled:cursor-not-allowed disabled:opacity-40">
        <RiSearchLine className="h-4 w-4 text-(--color-text-muted)" />
      </button>
    </form>
  )
}
