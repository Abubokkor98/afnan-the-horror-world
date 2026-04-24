import Link from "next/link"
import type { Playlist } from "@/types/youtube"

const MAX_FOOTER_CATEGORIES = 6

interface FooterCategoriesProps {
  playlists: Playlist[]
}

export function FooterCategories({ playlists }: FooterCategoriesProps) {
  const visiblePlaylists = playlists.slice(0, MAX_FOOTER_CATEGORIES)

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-(--color-text-subtle)">Categories</h3>
      <nav className="flex flex-col items-center gap-2.5 md:items-start" aria-label="Footer categories">
        {visiblePlaylists.map((playlist) => (
          <Link
            key={playlist.id}
            href={`/category/${playlist.slug}`}
            className="w-fit text-sm text-(--color-text-muted) transition-colors hover:text-(--color-crimson)"
          >
            {playlist.title}
          </Link>
        ))}
      </nav>
    </div>
  )
}
