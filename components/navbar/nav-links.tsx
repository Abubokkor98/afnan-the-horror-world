"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import type { Playlist } from "@/types/youtube"

interface NavLinksProps {
  playlists: Playlist[]
}

const MAX_VISIBLE_LINKS = 5

export function NavLinks({ playlists }: NavLinksProps) {
  const currentPath = usePathname()
  const visiblePlaylists = playlists.slice(0, MAX_VISIBLE_LINKS)

  return (
    <nav className="hidden items-center gap-1 md:flex">
      <NavLink href="/stories" label="All Stories" active={currentPath === "/stories"} />
      {visiblePlaylists.map((playlist) => {
        const href = `/category/${playlist.slug}`
        return (
          <NavLink
            key={playlist.id}
            href={href}
            label={playlist.title}
            active={currentPath === href}
          />
        )
      })}
    </nav>
  )
}

interface NavLinkProps {
  href: string
  label: string
  active: boolean
}

function NavLink({ href, label, active }: NavLinkProps) {
  const activeClass = active
    ? "text-(--color-crimson)"
    : "text-(--color-text-muted) hover:text-(--color-text-primary)"

  return (
    <Link
      href={href}
      className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${activeClass}`}
    >
      {label}
    </Link>
  )
}
