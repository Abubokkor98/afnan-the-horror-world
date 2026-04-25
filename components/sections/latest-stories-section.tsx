import { getLatestVideos } from "@/lib/youtube/video/get-latest-videos"
import { CategoryRow } from "@/components/category-row/category-row"
import { SectionError } from "@/components/section-error/section-error"
import type { Video } from "@/types/youtube"

const LATEST_STORIES_COUNT = 10
const PRELOAD_COUNT = 2

export async function LatestStoriesSection() {
  let latestVideos: Video[]

  try {
    latestVideos = await getLatestVideos(LATEST_STORIES_COUNT)
  } catch {
    return <SectionError title="latest stories" />
  }

  return (
    <CategoryRow
      title="Latest Stories"
      href="/stories"
      videos={latestVideos}
      preloadCount={PRELOAD_COUNT}
    />
  )
}
