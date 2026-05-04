import { getAfnansBeeVideos } from "@/lib/youtube/channel/get-afnans-bee-videos"
import { AfnansBeeSectionContent } from "@/components/afnans-bee/afnans-bee-section-content"
import { SectionError } from "@/components/section-error/section-error"
import type { AfnansBeeData } from "@/types/afnans-bee"

export async function AfnansBeeSection() {
  let data: AfnansBeeData

  try {
    data = await getAfnansBeeVideos()
  } catch {
    return <SectionError title="AfnansBee channel" />
  }

  if (data.videos.length === 0) {
    return <SectionError title="AfnansBee channel" />
  }

  return <AfnansBeeSectionContent data={data} />
}
