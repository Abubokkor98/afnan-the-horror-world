import { cacheLife, cacheTag } from "next/cache"
import type { Channel } from "@/types/youtube"
import { youtube, CHANNEL_ID } from "@/lib/youtube/client"
import { mapToChannel } from "@/lib/youtube/mappers"

/**
 * Fetches channel info: subscriber count, total views, video count.
 */
export async function getChannelInfo(): Promise<Channel | null> {
  "use cache"
  cacheTag("channel")
  cacheLife("hours")

  const res = await youtube.channels.list({
    part: ["snippet", "statistics", "contentDetails"],
    id: [CHANNEL_ID],
  })

  const item = res.data.items?.[0]
  if (!item) return null

  return mapToChannel(item)
}
