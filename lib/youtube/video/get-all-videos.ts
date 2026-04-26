import { cacheLife, cacheTag } from "next/cache"
import type { Video } from "@/types/youtube"
import { getAllPlaylists } from "@/lib/youtube/playlist/get-all-playlists"
import { fetchAllPlaylistVideos } from "@/lib/youtube/helpers/fetch-all-playlist-videos"

/**
 * Returns every video from every playlist (deduplicated).
 * Used by the search page for client-side filtering.
 */
export async function getAllVideos(): Promise<Video[]> {
  "use cache"
  cacheTag("all-videos")
  cacheLife("max")

  const playlists = await getAllPlaylists()
  return fetchAllPlaylistVideos(playlists)
}
