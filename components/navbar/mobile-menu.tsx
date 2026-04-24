"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { RiMenuLine, RiSearchLine, RiArrowDownSLine } from "@remixicon/react"
import type { Playlist } from "@/types/youtube"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

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
    <div className="lg:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button aria-label="Open menu" className="flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-(--color-bg-elevated)">
            <RiMenuLine className="h-5 w-5 text-(--color-text-primary)" />
          </button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="w-72 border-l border-(--color-border) bg-(--color-bg-navbar)"
        >
          <SheetHeader>
            <SheetTitle className="text-(--color-text-primary)">Menu</SheetTitle>
            <SheetDescription className="sr-only">Site navigation menu</SheetDescription>
          </SheetHeader>

          {/* Mobile search */}
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
            <button type="submit" aria-label="Search" className="absolute top-1/2 right-7 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center">
              <RiSearchLine className="h-4 w-4 text-(--color-text-muted)" />
            </button>
          </form>

          <Separator className="my-4 bg-(--color-border)" />

          {/* Navigation links */}
          <nav className="flex flex-col gap-1 px-4" aria-label="Mobile navigation">
            <MobileLink href="/stories" label="Stories" onClick={handleLinkClick} />

            {/* Browse Categories accordion */}
            <BrowseAccordion playlists={playlists} onNavigate={handleLinkClick} />

            <MobileLink href="/submit" label="Submit Story" onClick={handleLinkClick} />
            <MobileLink href="/about" label="About" onClick={handleLinkClick} />
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  )
}

function MobileLink({ href, label, onClick }: { href: string; label: string; onClick: () => void }) {
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

function BrowseAccordion({ playlists, onNavigate }: { playlists: Playlist[]; onNavigate: () => void }) {
  return (
    <Collapsible>
      <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium text-(--color-text-muted) transition-colors hover:bg-(--color-bg-elevated) hover:text-(--color-text-primary)">
        Browse Categories
        <RiArrowDownSLine className="h-4 w-4 transition-transform duration-200 [[data-state=open]>&]:rotate-180" />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="ml-3 flex flex-col gap-0.5 border-l border-(--color-bg-elevated) pl-3 pt-1">
          {playlists.map((playlist) => (
            <Link
              key={playlist.id}
              href={`/category/${playlist.slug}`}
              onClick={onNavigate}
              className="rounded-md px-3 py-2 text-sm text-(--color-text-subtle) transition-colors hover:bg-(--color-bg-elevated) hover:text-(--color-text-primary)"
            >
              {playlist.title}
            </Link>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
