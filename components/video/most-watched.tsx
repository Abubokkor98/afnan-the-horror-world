import Link from "next/link"
import Image from "next/image"
import { RiFireFill } from "@remixicon/react"
import { CategoryBadge } from "@/components/video/category-badge"
import type { Video } from "@/types/youtube"
import { formatViewCount, formatDuration, formatTimeAgo } from "@/lib/format"

interface MostWatchedProps {
  videos: Video[]
}

const MAX_MOST_WATCHED = 6
const TOP_FIRE_THRESHOLD = 3

export function MostWatched({ videos }: MostWatchedProps) {
  if (videos.length === 0) return null

  const displayVideos = videos.slice(0, MAX_MOST_WATCHED)

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-semibold">Most Watched</h2>
        <Link
          href="/stories?sort=views"
          className="text-sm font-medium text-(--color-crimson) transition-colors hover:text-(--color-crimson-hover)"
        >
          More popular stories →
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {displayVideos.map((video, index) => (
          <MostWatchedCard key={video.id} video={video} rank={index + 1} />
        ))}
      </div>
    </section>
  )
}

interface MostWatchedCardProps {
  video: Video
  rank: number
}

function MostWatchedCard({ video, rank }: MostWatchedCardProps) {
  const views = formatViewCount(video.viewCount)
  const duration = formatDuration(video.duration)
  const timeAgo = formatTimeAgo(video.publishedAt)
  const isTopThree = rank <= TOP_FIRE_THRESHOLD

  return (
    <Link href={`/story/${video.id}`} className="group block">
      <article className="overflow-hidden rounded-xl border border-(--color-bg-elevated) bg-(--color-bg-card) transition-all duration-300 hover:border-(--color-crimson)/30">
        {/* Thumbnail with overlays */}
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={video.thumbnail}
            alt={video.title}
            width={480}
            height={270}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {/* View count badge — bottom left */}
          <span className="absolute bottom-2 left-2 rounded bg-black/80 px-2 py-0.5 text-xs font-medium text-white">
            {views}
          </span>
          {/* Duration — bottom right */}
          <span className="absolute right-2 bottom-2 rounded bg-black/80 px-1.5 py-0.5 text-xs font-medium text-white">
            {duration}
          </span>
          {/* Rank badge — top left */}
          <div className={`absolute top-2 left-2 flex items-center gap-1 rounded-lg px-2 py-1 text-sm font-bold ${isTopThree ? "bg-(--color-crimson) text-white" : "bg-black/70 text-(--color-text-primary)"}`}>
            {isTopThree && <RiFireFill className="h-3.5 w-3.5" />}
            #{rank}
          </div>
        </div>

        {/* Info */}
        <div className="space-y-2 p-3">
          <h3 className="line-clamp-2 text-sm font-medium leading-snug text-(--color-text-primary) group-hover:text-(--color-crimson)">
            {video.title}
          </h3>
          <div className="flex items-center gap-2">
            <CategoryBadge category={video.categoryLabel} />
            <span className="text-xs text-(--color-text-subtle)">{timeAgo}</span>
          </div>
        </div>
      </article>
    </Link>
  )
}
