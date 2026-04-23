import Link from "next/link"
import type { Video } from "@/types/youtube"
import { VideoThumbnail } from "@/components/video-card/video-thumbnail"
import { CategoryBadge } from "@/components/video-card/category-badge"
import { VideoMeta } from "@/components/video-card/video-meta"

interface VideoCardProps {
  video: Video
  priority?: boolean
}

export function VideoCard({ video, priority = false }: VideoCardProps) {
  return (
    <article className="group">
      <Link href={`/story/${video.id}`} className="block space-y-2">
        <VideoThumbnail
          src={video.thumbnail}
          alt={video.title}
          duration={video.duration}
          priority={priority}
        />
        <div className="flex items-start gap-2">
          <div className="min-w-0 flex-1">
            <VideoMeta
              title={video.title}
              viewCount={video.viewCount}
              publishedAt={video.publishedAt}
            />
          </div>
          <div className="shrink-0 pt-2">
            <CategoryBadge category={video.categoryLabel} />
          </div>
        </div>
      </Link>
    </article>
  )
}
