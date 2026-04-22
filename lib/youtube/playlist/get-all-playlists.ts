import { cacheLife, cacheTag } from "next/cache"
import type { Playlist } from "@/types/youtube"
import { youtube, CHANNEL_ID } from "@/lib/youtube/client"
import { mapToPlaylist } from "@/lib/youtube/mappers"
import type { youtube_v3 } from "googleapis"

/**
 * Fetches ALL playlists from the channel automatically.
 * No hardcoded IDs — new playlists appear on next cache refresh.
 */
export async function getAllPlaylists(): Promise<Playlist[]> {
  "use cache"
  cacheTag("playlists")
  cacheLife("hours")

  const items: youtube_v3.Schema$Playlist[] = []
  let pageToken: string | undefined

  do {
    const res = await youtube.playlists.list({
      part: ["snippet", "contentDetails"],
      channelId: CHANNEL_ID,
      maxResults: 50,
      pageToken,
    })
    items.push(...(res.data.items ?? []))
    pageToken = res.data.nextPageToken ?? undefined
  } while (pageToken)

  return items.map(mapToPlaylist)
}
