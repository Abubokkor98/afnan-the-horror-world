import { cacheLife, cacheTag } from "next/cache"
import type { Video } from "@/types/youtube"
import { youtube } from "@/lib/youtube/client"
import { mapToVideo } from "@/lib/youtube/mappers"
import { getVideoDetails } from "@/lib/youtube/helpers/get-video-details"
import { getAllPlaylists } from "@/lib/youtube/playlist/get-all-playlists"
import type { youtube_v3 } from "googleapis"

/**
 * Fetches all videos from a specific playlist with full details.
 */
export async function getPlaylistVideos(
  playlistId: string,
): Promise<Video[]> {
  "use cache"
  cacheTag(`playlist-${playlistId}`)
  cacheLife("max")

  const items: youtube_v3.Schema$PlaylistItem[] = []
  let pageToken: string | undefined

  do {
    const res = await youtube.playlistItems.list({
      part: ["snippet", "contentDetails"],
      playlistId,
      maxResults: 50,
      pageToken,
    })
    items.push(...(res.data.items ?? []))
    pageToken = res.data.nextPageToken ?? undefined
  } while (pageToken)

  const videoIds = items
    .map((item) => item.contentDetails?.videoId)
    .filter((id): id is string => Boolean(id))

  if (videoIds.length === 0) return []

  const playlists = await getAllPlaylists()
  const playlist = playlists.find((p) => p.id === playlistId)

  const details = await getVideoDetails(videoIds)
  return details.map((detail) =>
    mapToVideo(detail, playlist?.slug ?? "", playlist?.title ?? ""),
  )
}
