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

  return (
    <form onSubmit={handleSubmit} className="relative hidden md:block">
      <RiSearchLine className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-(--color-text-muted)" />
      <input
        name="q"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search stories..."
        className="h-9 w-56 rounded-full bg-(--color-bg-elevated) pr-4 pl-9 text-sm text-(--color-text-primary) placeholder:text-(--color-text-subtle) focus:ring-2 focus:ring-(--color-crimson) focus:outline-none lg:w-64"
      />
    </form>
  )
}
