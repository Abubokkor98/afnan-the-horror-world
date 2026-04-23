import Link from "next/link"
import type { Playlist } from "@/types/youtube"
import { CategoryCard } from "@/components/category-grid/category-card"

interface CategoryGridProps {
  playlists: Playlist[]
  showHeader?: boolean
}

export function CategoryGrid({ playlists, showHeader = true }: CategoryGridProps) {
  if (playlists.length === 0) return null

  return (
    <section className="space-y-6">
      {showHeader && (
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-semibold">Browse by Category</h2>
          <Link
            href="/stories"
            className="text-sm font-medium text-(--color-crimson) transition-colors hover:text-(--color-crimson-hover)"
          >
            See all categories →
          </Link>
        </div>
      )}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {playlists.map((playlist) => (
          <CategoryCard key={playlist.id} playlist={playlist} />
        ))}
      </div>
    </section>
  )
}
