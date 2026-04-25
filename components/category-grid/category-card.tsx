import Link from "next/link"
import Image from "next/image"
import type { Playlist } from "@/types/youtube"

interface CategoryCardProps {
  playlist: Playlist
}

export function CategoryCard({ playlist }: CategoryCardProps) {
  const storyLabel = playlist.videoCount === 1 ? "story" : "stories"

  return (
    <Link href={`/category/${playlist.slug}`} className="group block">
      <article className="relative overflow-hidden rounded-xl border border-(--color-bg-elevated) bg-(--color-bg-card) transition-all duration-300 hover:border-(--color-crimson)/40 hover:shadow-lg hover:shadow-(--color-crimson)/5">
        {/* Thumbnail with overlay */}
        <div className="relative aspect-video overflow-hidden">
          {playlist.thumbnail && (
            <Image
              src={playlist.thumbnail}
              alt={playlist.title}
              width={480}
              height={270}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-(--color-bg-card) via-(--color-bg-card)/40 to-transparent" />

          {/* Story count badge */}
          <span className="absolute right-3 bottom-3 rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-white">
            {playlist.videoCount} {storyLabel}
          </span>
        </div>

        {/* Info */}
        <div className="space-y-1.5 p-4">
          <h3 className="text-lg font-semibold text-(--color-text-primary) transition-colors group-hover:text-(--color-crimson)">
            {playlist.title}
          </h3>
          {/* {playlist.description && (
            <p className="line-clamp-1 text-sm text-(--color-text-muted)">
              {playlist.description}
            </p>
          )} */}
        </div>
      </article>
    </Link>
  )
}
