import Image from "next/image"
import type { Video } from "@/types/youtube"
import { FeaturedContent } from "@/components/featured-story/featured-content"

interface FeaturedStoryProps {
  video: Video
}

export function FeaturedStory({ video }: FeaturedStoryProps) {
  return (
    <section className="space-y-6">
      <h2 className="text-3xl font-semibold">Editor&apos;s Pick</h2>
      <article className="grain-overlay relative overflow-hidden rounded-2xl border border-(--color-bg-elevated) bg-(--color-bg-card)">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Thumbnail side */}
          <div className="relative aspect-video overflow-hidden lg:aspect-auto lg:min-h-[360px]">
            <Image
              src={video.thumbnail}
              alt={video.title}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-(--color-bg-card)/60 max-lg:hidden" />
            <div className="absolute inset-0 bg-gradient-to-t from-(--color-bg-card) to-transparent lg:hidden" />
          </div>

          {/* Content side */}
          <FeaturedContent video={video} />
        </div>
      </article>
    </section>
  )
}
