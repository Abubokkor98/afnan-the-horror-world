import { getRelatedVideos } from "@/lib/youtube/video/get-related-videos"
import { StoryRelated } from "@/components/story/story-related"

interface StoryRelatedSectionProps {
  categorySlug: string
  currentId: string
}

export async function StoryRelatedSection({
  categorySlug,
  currentId,
}: StoryRelatedSectionProps) {
  const related = await getRelatedVideos(categorySlug, currentId)

  return (
    <StoryRelated
      videos={related}
      hasCategory={Boolean(categorySlug)}
    />
  )
}
