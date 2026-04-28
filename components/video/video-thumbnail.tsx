import Image from "next/image"
import { RiPlayFill } from "@remixicon/react"
import { formatDuration } from "@/lib/format"

interface VideoThumbnailProps {
  src: string
  alt: string
  duration: string
  priority?: boolean
}

export function VideoThumbnail({
  src,
  alt,
  duration,
  priority = false,
}: VideoThumbnailProps) {
  const formattedDuration = formatDuration(duration)

  return (
    <div className="relative aspect-video overflow-hidden rounded-lg">
      <Image
        src={src}
        alt={alt}
        width={480}
        height={270}
        sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        priority={priority}
        unoptimized
      />

      {/* Play overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/30">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <RiPlayFill className="h-6 w-6 text-black" />
        </div>
      </div>

      {/* Duration badge */}
      <span className="absolute right-2 bottom-2 rounded bg-black/80 px-1.5 py-0.5 text-xs font-medium text-white">
        {formattedDuration}
      </span>
    </div>
  )
}
