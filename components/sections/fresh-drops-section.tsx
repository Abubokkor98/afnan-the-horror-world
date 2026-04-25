import { getUncategorizedVideos } from "@/lib/youtube/video/get-uncategorized-videos"
import { FreshDrops } from "@/components/video/fresh-drops"
import { SectionError } from "@/components/section-error/section-error"
import type { Video } from "@/types/youtube"

export async function FreshDropsSection() {
  let uncategorized: Video[]

  try {
    uncategorized = await getUncategorizedVideos()
  } catch {
    return <SectionError title="fresh drops" />
  }

  return <FreshDrops videos={uncategorized} />
}
