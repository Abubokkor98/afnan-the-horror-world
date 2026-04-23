"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { RiMenuLine, RiSearchLine, RiCloseLine } from "@remixicon/react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import type { Playlist } from "@/types/youtube"

interface MobileMenuProps {
  playlists: Playlist[]
}

export function MobileMenu({ playlists }: MobileMenuProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const router = useRouter()

  function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const trimmed = query.trim()
    if (!trimmed) return
    router.push(`/search?q=${encodeURIComponent(trimmed)}`)
    setOpen(false)
  }

  function handleLinkClick() {
    setOpen(false)
  }

  return (
    <div className="flex items-center gap-2 md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button aria-label="Open menu" className="p-2">
            <RiMenuLine className="h-6 w-6 text-(--color-text-primary)" />
          </button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="w-80 border-l border-(--color-border) bg-(--color-bg-navbar)"
        >
          <SheetHeader>
            <SheetTitle className="text-(--color-text-primary)">Menu</SheetTitle>
            <SheetDescription className="sr-only">Site navigation menu</SheetDescription>
          </SheetHeader>

          {/* Mobile search */}
          <form onSubmit={handleSearch} className="relative px-4 pt-4">
            <RiSearchLine className="absolute top-1/2 left-7 h-4 w-4 -translate-y-1/2 text-(--color-text-muted)" />
            <input
              name="q"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search stories..."
              className="h-10 w-full rounded-lg bg-(--color-bg-elevated) pr-4 pl-9 text-sm text-(--color-text-primary) placeholder:text-(--color-text-subtle) focus:ring-2 focus:ring-(--color-crimson) focus:outline-none"
            />
          </form>

          <Separator className="my-4 bg-(--color-border)" />

          {/* Navigation links */}
          <nav className="flex flex-col gap-1 px-4">
            <MobileLink href="/" label="Home" onClick={handleLinkClick} />
            <MobileLink href="/stories" label="All Stories" onClick={handleLinkClick} />
            {playlists.map((playlist) => (
              <MobileLink
                key={playlist.id}
                href={`/category/${playlist.slug}`}
                label={playlist.title}
                onClick={handleLinkClick}
              />
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  )
}

interface MobileLinkProps {
  href: string
  label: string
  onClick: () => void
}

function MobileLink({ href, label, onClick }: MobileLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="rounded-md px-3 py-2.5 text-sm font-medium text-(--color-text-muted) transition-colors hover:bg-(--color-bg-elevated) hover:text-(--color-text-primary)"
    >
      {label}
    </Link>
  )
}
