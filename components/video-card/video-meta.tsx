import { formatViewCount } from "@/lib/format"
import { TimeAgo } from "@/components/video-card/time-ago"

interface VideoMetaProps {
  title: string
  viewCount: number
  publishedAt: string
}

export function VideoMeta({ title, viewCount, publishedAt }: VideoMetaProps) {
  const views = formatViewCount(viewCount)

  return (
    <div className="space-y-1 px-1 pt-2">
      <h3 className="line-clamp-2 text-sm font-medium leading-snug text-(--color-text-primary)">
        {title}
      </h3>
      <p className="text-xs text-(--color-text-subtle)">
        {views} · <TimeAgo date={publishedAt} />
      </p>
    </div>
  )
}
