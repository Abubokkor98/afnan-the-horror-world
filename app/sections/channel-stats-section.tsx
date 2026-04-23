import { getChannelInfo } from "@/lib/youtube/channel/get-channel-info"
import { ChannelStats } from "@/components/channel-stats/channel-stats"
import { SectionError } from "@/components/section-error"
import type { Channel } from "@/types/youtube"

export async function ChannelStatsSection() {
  let channel: Channel | null

  try {
    channel = await getChannelInfo()
  } catch {
    return <SectionError title="channel stats" />
  }

  if (!channel) return null

  return <ChannelStats channel={channel} />
}
