import Link from "next/link"
import type { Playlist } from "@/types/youtube"
import { NavLinks } from "@/components/navbar/nav-links"
import { SearchInput } from "@/components/navbar/search-input"
import { MobileMenu } from "@/components/navbar/mobile-menu"
import { Button } from "@/components/ui/button"

interface NavbarProps {
  playlists: Playlist[]
}

export function Navbar({ playlists }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-(--color-border) bg-(--color-bg-navbar)/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <span className="hero-title text-xl tracking-wide text-(--color-crimson)">
            Afnan&apos;s Horror World
          </span>
        </Link>

        {/* Desktop nav */}
        <NavLinks playlists={playlists} />

        {/* Desktop search + Submit button + Mobile menu */}
        <div className="flex items-center gap-3">
          <SearchInput />
          <Button asChild size="sm" className="hidden bg-(--color-crimson) text-white hover:bg-(--color-crimson-hover) md:inline-flex">
            <Link href="/submit">Submit Your Story</Link>
          </Button>
          <MobileMenu playlists={playlists} />
        </div>
      </div>
    </header>
  )
}
