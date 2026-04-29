import { getVideo } from "@/lib/youtube/video/get-video"
import { FeaturedStory } from "@/components/featured-story/featured-story"
import { SectionError } from "@/components/section-error/section-error"
import { FEATURED_VIDEO_ID } from "@/config/featured"
import type { Video } from "@/types/youtube"

export async function FeaturedSection() {
  let featuredVideo: Video

  try {
    featuredVideo = await getVideo(FEATURED_VIDEO_ID)
  } catch {
    return <SectionError title="featured story" />
  }

  return <FeaturedStory video={featuredVideo} />
}
