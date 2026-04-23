import { getVideo } from "@/lib/youtube/video/get-video"
import { FeaturedStory } from "@/components/featured-story/featured-story"
import { SectionError } from "@/components/section-error"
import { FEATURED_VIDEO_ID } from "@/config/featured"
import type { Video } from "@/types/youtube"

export async function FeaturedSection() {
  let featuredVideo: Video | null

  try {
    featuredVideo = await getVideo(FEATURED_VIDEO_ID)
  } catch {
    return <SectionError title="featured story" />
  }

  if (!featuredVideo) return null

  return <FeaturedStory video={featuredVideo} />
}
