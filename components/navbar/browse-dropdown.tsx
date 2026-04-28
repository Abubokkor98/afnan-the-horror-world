"use client"

import Link from "next/link"
import Image from "next/image"
import type { Playlist } from "@/types/youtube"
import {
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

interface BrowseDropdownProps {
  playlists: Playlist[]
  isActive: boolean
}

const BROWSE_BASE = "!rounded-none !bg-transparent !shadow-none !ring-0 hover:!bg-transparent focus:!bg-transparent data-[popup-open]:!bg-transparent data-[open]:!bg-transparent"

function browseButtonClass(active: boolean): string {
  return `text-sm font-medium transition-colors border-b-2 ${BROWSE_BASE} ${
    active
      ? "text-(--color-crimson) border-(--color-crimson)"
      : "text-(--color-text-muted) border-transparent hover:text-(--color-text-primary)"
  }`
}

export function BrowseDropdown({ playlists, isActive }: BrowseDropdownProps) {
  return (
    <NavigationMenuItem className="static!">
      <NavigationMenuTrigger
        className={browseButtonClass(isActive)}
        aria-label="Browse categories"
      >
        Browse
      </NavigationMenuTrigger>
      <NavigationMenuContent className="left-1/2! -translate-x-1/2! rounded-xl border border-(--color-bg-elevated) bg-(--color-bg-navbar) p-4 shadow-xl shadow-black/30">
        <div className="grid w-[720px] grid-cols-3 gap-2" role="list" aria-label="Category list">
          {playlists.map((playlist) => (
            <NavigationMenuLink key={playlist.id} asChild className="bg-transparent! hover:bg-transparent! focus:bg-transparent! p-0">
              <Link
                href={`/category/${playlist.slug}`}
                className="group/link flex items-center gap-3 rounded-lg p-2.5 transition-colors hover:bg-(--color-bg-elevated)"
              >
                {playlist.thumbnail && (
                  <Image
                    src={playlist.thumbnail}
                    alt={playlist.title}
                    width={64}
                    height={36}
                    className="h-auto shrink-0 rounded object-cover"
                    unoptimized
                  />
                )}
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-(--color-text-primary) group-hover/link:text-(--color-crimson)">
                    {playlist.title}
                  </p>
                  <p className="text-xs text-(--color-text-subtle)">
                    {playlist.videoCount} {playlist.videoCount === 1 ? "story" : "stories"}
                  </p>
                </div>
              </Link>
            </NavigationMenuLink>
          ))}
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  )
}
