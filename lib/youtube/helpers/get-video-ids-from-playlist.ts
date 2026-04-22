import { cacheLife, cacheTag } from "next/cache"

import { youtube } from "@/lib/youtube/client"

/**
 * Fetches all video IDs from a playlist, handling pagination.
 * Used by uncategorized detection and playlist-for-video lookup.
 */
export async function getVideoIdsFromPlaylist(
  playlistId: string,
): Promise<string[]> {
  "use cache"
  cacheTag("playlists", `playlist-videos-${playlistId}`)
  cacheLife("hours")

  const ids: string[] = []
  let pageToken: string | undefined

  do {
    const res = await youtube.playlistItems.list({
      part: ["contentDetails"],
      playlistId,
      maxResults: 50,
      pageToken,
    })

    for (const item of res.data.items ?? []) {
      const videoId = item.contentDetails?.videoId
      if (videoId) ids.push(videoId)
    }

    pageToken = res.data.nextPageToken ?? undefined
  } while (pageToken)

  return ids
}
