import { VideoGrid } from "@/components/video/video-grid"
import type { Video } from "@/types/youtube"

interface StoryRelatedProps {
  videos: Video[]
  hasCategory: boolean
}

export function StoryRelated({ videos, hasCategory }: StoryRelatedProps) {
  if (videos.length === 0) return null

  const heading = hasCategory
    ? "More Stories in This Category"
    : "More Stories"

  return (
    <section className="mt-16 space-y-6 border-t border-(--color-border) pt-12">
      <h2 className="text-2xl font-semibold">{heading}</h2>
      <VideoGrid videos={videos} />
    </section>
  )
}
