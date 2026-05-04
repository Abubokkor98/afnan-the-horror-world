import { cacheLife, cacheTag } from "next/cache"
import { youtube, AFNANS_BEE_CHANNEL_ID } from "@/lib/youtube/client"
import type { AfnansBeeData } from "@/types/afnans-bee"
const AFNANS_BEE_VIDEO_LIMIT = 4

/**
 * Fetches the latest videos and subscriber count from the AfnansBee channel.
 * Uses a two-step approach: first get uploads playlist ID + stats,
 * then fetch the latest videos from that playlist.
 */
export async function getAfnansBeeVideos(): Promise<AfnansBeeData> {
  "use cache"
  cacheTag("afnans-bee")
  cacheLife("max")

  const channelRes = await youtube.channels.list({
    part: ["contentDetails", "statistics"],
    id: [AFNANS_BEE_CHANNEL_ID],
  })

  const channelItem = channelRes.data.items?.[0]
  const uploadsId = channelItem?.contentDetails?.relatedPlaylists?.uploads
  const rawSubscriberCount = channelItem?.statistics?.subscriberCount ?? null

  if (!uploadsId) {
    return { videos: [], subscriberCount: rawSubscriberCount }
  }

  const videosRes = await youtube.playlistItems.list({
    part: ["snippet"],
    playlistId: uploadsId,
    maxResults: AFNANS_BEE_VIDEO_LIMIT,
  })

  const videos = (videosRes.data.items ?? []).map((item) => ({
    id: item.snippet?.resourceId?.videoId ?? "",
    title: item.snippet?.title ?? "",
    thumbnail:
      item.snippet?.thumbnails?.high?.url ??
      item.snippet?.thumbnails?.default?.url ??
      "",
    publishedAt: item.snippet?.publishedAt ?? "",
    viewCount: 0, // playlistItems doesn't return viewCount — acceptable for this card
  }))

  return {
    videos: videos.filter((v) => v.id !== ""),
    subscriberCount: rawSubscriberCount,
  }
}
