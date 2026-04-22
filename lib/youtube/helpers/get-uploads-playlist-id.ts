import { youtube } from "@/lib/youtube/client"
import { CHANNEL_ID } from "@/lib/youtube/client"

/**
 * Returns the "Uploads" playlist ID for the channel.
 * Every YouTube channel has a hidden uploads playlist containing all videos.
 */
export async function getUploadsPlaylistId(): Promise<string | null> {
  const res = await youtube.channels.list({
    part: ["contentDetails"],
    id: [CHANNEL_ID],
  })

  return (
    res.data.items?.[0]?.contentDetails?.relatedPlaylists?.uploads ?? null
  )
}
