import { RiTimeLine, RiEyeLine, RiCalendarLine } from "@remixicon/react"
import { CategoryBadge } from "@/components/video/category-badge"
import { TimeAgo } from "@/components/video/time-ago"
import { Badge } from "@/components/ui/badge"
import { formatViewCount, formatDuration } from "@/lib/format"
import type { Video } from "@/types/youtube"

interface StoryHeaderProps {
  video: Video
  country: string | null
}

export function StoryHeader({ video, country }: StoryHeaderProps) {
  const views = formatViewCount(video.viewCount)
  const duration = formatDuration(video.duration)

  return (
    <div className="space-y-3">
      <h1 className="text-2xl leading-tight font-semibold lg:text-3xl">
        {video.title}
      </h1>
      <div className="flex flex-wrap items-center gap-3 text-sm text-(--color-text-subtle)">
        <CategoryBadge category={video.categoryLabel} />
        {country && <Badge variant="outline">{country}</Badge>}
        <span className="flex items-center gap-1">
          <RiEyeLine className="h-3.5 w-3.5" />
          {views}
        </span>
        <span className="flex items-center gap-1">
          <RiTimeLine className="h-3.5 w-3.5" />
          {duration}
        </span>
        <span className="flex items-center gap-1">
          <RiCalendarLine className="h-3.5 w-3.5" />
          <TimeAgo date={video.publishedAt} />
        </span>
      </div>
    </div>
  )
}
