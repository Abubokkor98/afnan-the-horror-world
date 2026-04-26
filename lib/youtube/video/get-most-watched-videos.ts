import { cacheLife, cacheTag } from "next/cache"
import type { Video } from "@/types/youtube"
import { getAllPlaylists } from "@/lib/youtube/playlist/get-all-playlists"
import { fetchAllPlaylistVideos } from "@/lib/youtube/helpers/fetch-all-playlist-videos"

/**
 * Returns the N most viewed videos across all playlists.
 */
export async function getMostWatchedVideos(count: number): Promise<Video[]> {
  "use cache"
  cacheTag("most-watched")
  cacheLife("max")

  if (!Number.isInteger(count) || count <= 0) {
    throw new TypeError("Count must be a positive integer")
  }

  const playlists = await getAllPlaylists()
  const allVideos = await fetchAllPlaylistVideos(playlists)

  return [...allVideos]
    .sort((a, b) => b.viewCount - a.viewCount)
    .slice(0, count)
}
