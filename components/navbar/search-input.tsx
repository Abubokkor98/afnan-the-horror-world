"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { RiSearchLine } from "@remixicon/react"

export function SearchInput() {
  const router = useRouter()
  const [query, setQuery] = useState("")

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const trimmed = query.trim()
    if (!trimmed) return
    router.push(`/search?q=${encodeURIComponent(trimmed)}`)
  }

  const hasQuery = query.trim().length > 0

  return (
    <form onSubmit={handleSubmit} className="relative hidden lg:block" role="search">
      <label htmlFor="desktop-search" className="sr-only">Search stories</label>
      <input
        id="desktop-search"
        name="q"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search stories…"
        autoComplete="off"
        className="h-9 w-48 rounded-lg border border-(--color-bg-elevated) bg-(--color-bg-card) pr-10 pl-4 text-sm text-(--color-text-primary) placeholder:text-(--color-text-subtle) transition-colors focus:border-(--color-crimson) focus:ring-2 focus:ring-(--color-crimson)/20 focus:outline-none lg:w-56"
      />
      <button
        type="submit"
        aria-label="Search"
        disabled={!hasQuery}
        className="absolute top-1/2 right-1 flex h-7 w-7 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-(--color-bg-elevated) disabled:cursor-default disabled:opacity-40"
      >
        <RiSearchLine className="h-4 w-4 text-(--color-text-muted)" />
      </button>
    </form>
  )
}
