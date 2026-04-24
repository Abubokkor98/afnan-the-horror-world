"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import type { Playlist } from "@/types/youtube"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { BrowseDropdown } from "@/components/navbar/browse-dropdown"

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
            <Link
              href="/stories"
              className={navLinkClass(currentPath === "/stories")}
              {...(currentPath === "/stories" && { "aria-current": "page" as const })}
            >
              Stories
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* Browse dropdown */}
        <BrowseDropdown playlists={playlists} isActive={currentPath.startsWith("/category")} />

        {/* Submit & About links */}
        {NAV_ITEMS.map((item) => (
          <NavigationMenuItem key={item.href}>
            <NavigationMenuLink asChild>
              <Link
                href={item.href}
                className={navLinkClass(currentPath === item.href)}
                {...(currentPath === item.href && { "aria-current": "page" as const })}
              >
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
  return `text-sm font-medium transition-colors border-b-2 !rounded-none !bg-transparent !px-3 !py-2 ${
    active
      ? "text-(--color-crimson) border-(--color-crimson)"
      : "text-(--color-text-muted) border-transparent hover:text-(--color-text-primary)"
  }`
}
