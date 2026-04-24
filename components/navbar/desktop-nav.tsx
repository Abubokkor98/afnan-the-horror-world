"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import type { Playlist } from "@/types/youtube"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

interface DesktopNavProps {
  playlists: Playlist[]
}

const NAV_ITEMS = [
  { href: "/submit", label: "Submit" },
  { href: "/about", label: "About" },
]

export function DesktopNav({ playlists }: DesktopNavProps) {
  const currentPath = usePathname()

  return (
    <NavigationMenu className="hidden lg:flex" viewport={false}>
      <NavigationMenuList className="gap-1">
        {/* Stories link */}
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/stories" className={navLinkClass(currentPath === "/stories")}>
              Stories
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* Browse dropdown */}
        <NavigationMenuItem className="static!">
          <NavigationMenuTrigger className={browseButtonClass(currentPath.startsWith("/category"))}>
            Browse
          </NavigationMenuTrigger>
          <NavigationMenuContent className="left-1/2! -translate-x-1/2! rounded-xl border border-(--color-bg-elevated) bg-(--color-bg-navbar) p-4 shadow-xl shadow-black/30">
            <div className="grid w-[720px] grid-cols-3 gap-2">
              {playlists.map((playlist) => (
                <NavigationMenuLink key={playlist.id} asChild>
                  <Link
                    href={`/category/${playlist.slug}`}
                    className="group flex items-center gap-3 rounded-lg p-2.5 transition-colors hover:bg-(--color-bg-elevated)"
                  >
                    {playlist.thumbnail && (
                      <Image
                        src={playlist.thumbnail}
                        alt={playlist.title}
                        width={64}
                        height={36}
                        className="h-auto shrink-0 rounded object-cover"
                      />
                    )}
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-(--color-text-primary) group-hover:text-(--color-crimson)">
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

        {/* Submit & About links */}
        {NAV_ITEMS.map((item) => (
          <NavigationMenuItem key={item.href}>
            <NavigationMenuLink asChild>
              <Link href={item.href} className={navLinkClass(currentPath === item.href)}>
                {item.label}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

function navLinkClass(active: boolean): string {
  return `px-3 py-2 text-sm font-medium transition-colors border-b-2 !rounded-none !bg-transparent !p-0 !px-3 !py-2 ${
    active
      ? "text-(--color-crimson) border-(--color-crimson)"
      : "text-(--color-text-muted) border-transparent hover:text-(--color-text-primary)"
  }`
}

const BROWSE_BASE = "!rounded-none !bg-transparent !shadow-none !ring-0 hover:!bg-transparent focus:!bg-transparent data-[popup-open]:!bg-transparent data-[open]:!bg-transparent"

function browseButtonClass(active: boolean): string {
  return `px-3 py-2 text-sm font-medium transition-colors border-b-2 ${BROWSE_BASE} ${
    active
      ? "text-(--color-crimson) border-(--color-crimson)"
      : "text-(--color-text-muted) border-transparent hover:text-(--color-text-primary)"
  }`
}
