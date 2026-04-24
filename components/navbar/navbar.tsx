import Link from "next/link"
import type { Playlist } from "@/types/youtube"
import { DesktopNav } from "@/components/navbar/desktop-nav"
import { SearchInput } from "@/components/navbar/search-input"
import { MobileMenu } from "@/components/navbar/mobile-nav/mobile-menu"
import { SubscribeButton } from "@/components/navbar/subscribe-button"

interface NavbarProps {
  playlists: Playlist[]
}

export function Navbar({ playlists }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-(--color-border) bg-(--color-bg-navbar)/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="shrink-0" translate="no">
          <span className="hero-title text-xl tracking-wide text-(--color-crimson)">
            Afnan&apos;s Horror World
          </span>
        </Link>

        {/* Desktop nav */}
        <DesktopNav playlists={playlists} />

        {/* Right side: search + subscribe + mobile */}
        <div className="flex items-center gap-3">
          <SearchInput />
          <SubscribeButton />
          <MobileMenu playlists={playlists} />
        </div>
      </div>
    </header>
  )
}
