import Link from "next/link"
import { RiPlayCircleFill, RiTimeLine } from "@remixicon/react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CategoryBadge } from "@/components/video/category-badge"
import type { Video } from "@/types/youtube"
import { formatViewCount, formatTimeAgo, formatDuration } from "@/lib/format"
import { parseCountry } from "@/lib/parse-description"

interface FeaturedContentProps {
  video: Video
}

export function FeaturedContent({ video }: FeaturedContentProps) {
  const views = formatViewCount(video.viewCount)
  const timeAgo = formatTimeAgo(video.publishedAt)
  const duration = formatDuration(video.duration)
  const country = parseCountry(video.description)
  const publishDate = new Date(video.publishedAt).toLocaleDateString("en", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
  const firstLine = video.description.split("\n")[0] ?? ""
  const excerpt =
    firstLine.length <= 200
      ? firstLine
      : firstLine.slice(0, firstLine.lastIndexOf(" ", 200)) + "…"

  return (
    <div className="flex flex-col justify-center space-y-4 p-6 lg:p-8">
      {/* Badges */}
      <div className="flex flex-wrap items-center gap-2">
        <Badge className="bg-(--color-crimson) text-white hover:bg-(--color-crimson-hover)">
          Editor&apos;s Pick
        </Badge>
        <CategoryBadge category={video.categoryLabel} />
        <span className="inline-flex items-center gap-1 text-xs text-(--color-text-subtle)">
          <RiTimeLine className="h-3.5 w-3.5" />
          {duration}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-2xl font-semibold leading-tight text-(--color-text-primary) lg:text-3xl">
        {video.title}
      </h3>

      {/* Excerpt — pull-quote style */}
      {excerpt && (
        <p className="line-clamp-4 border-l-2 border-(--color-crimson)/40 pl-4 text-sm italic leading-relaxed text-(--color-text-body)">
          {excerpt}
        </p>
      )}

      {/* Country origin */}
      {country && (
        <p className="text-sm text-(--color-text-muted)">
          Story origin: {country}
        </p>
      )}

      {/* Stats */}
      <p className="text-xs text-(--color-text-subtle)">
        {views} · {publishDate} · {timeAgo}
      </p>

      {/* CTA */}
      <Button asChild size="lg" className="w-fit bg-(--color-crimson) text-white hover:bg-(--color-crimson-hover)">
        <Link href={`/story/${video.id}`}>
          <RiPlayCircleFill className="mr-2 h-5 w-5" />
          Listen to the Story
        </Link>
      </Button>
    </div>
  )
}
