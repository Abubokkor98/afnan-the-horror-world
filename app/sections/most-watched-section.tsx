import { getMostWatchedVideos } from "@/lib/youtube/video/get-most-watched-videos"
import { MostWatched } from "@/components/most-watched"
import { SectionError } from "@/components/section-error"
import type { Video } from "@/types/youtube"

const MOST_WATCHED_COUNT = 6

export async function MostWatchedSection() {
  let mostWatched: Video[]

  try {
    mostWatched = await getMostWatchedVideos(MOST_WATCHED_COUNT)
  } catch {
    return <SectionError title="most watched stories" />
  }

  return <MostWatched videos={mostWatched} />
}
