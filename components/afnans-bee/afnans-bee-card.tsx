import Image from "next/image"
import { RiExternalLinkLine } from "@remixicon/react"
import { TimeAgo } from "@/components/video/time-ago"
import type { AfnansBeeVideo } from "@/types/afnans-bee"

interface AfnansBeeCardProps {
  video: AfnansBeeVideo
}

export function AfnansBeeCard({ video }: AfnansBeeCardProps) {
  const videoUrl = `https://www.youtube.com/watch?v=${video.id}`

  return (
    <a
      href={videoUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group block h-full"
    >
      <article className="flex h-full flex-col overflow-hidden rounded-xl border border-(--color-bg-elevated) bg-(--color-bg-elevated) transition-all duration-300 hover:border-(--color-crimson)/30">
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={video.thumbnail}
            alt={video.title}
            width={480}
            height={270}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            unoptimized
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="rounded-full bg-black/60 p-2">
              <RiExternalLinkLine className="h-5 w-5 text-white" />
            </span>
          </div>
        </div>

        {/* flex-1 pushes metadata to the bottom when titles differ in line count */}
        <div className="flex flex-1 flex-col justify-between space-y-2 p-3">
          <h3 className="line-clamp-2 text-sm font-medium leading-snug text-(--color-text-primary) group-hover:text-(--color-crimson)">
            {video.title}
          </h3>
          <span className="text-xs text-(--color-text-subtle)">
            <TimeAgo date={video.publishedAt} />
          </span>
        </div>
      </article>
    </a>
  )
}
