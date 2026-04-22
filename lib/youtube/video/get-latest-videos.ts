import { cacheLife, cacheTag } from "next/cache"
import type { Video } from "@/types/youtube"
import { getAllPlaylists } from "@/lib/youtube/playlist/get-all-playlists"
import { fetchAllPlaylistVideos } from "@/lib/youtube/helpers/fetch-all-playlist-videos"

/**
 * Returns the N most recently published videos across all playlists.
 */
export async function getLatestVideos(count: number): Promise<Video[]> {
  "use cache"
  cacheTag("latest-videos")
  cacheLife("hours")

  const playlists = await getAllPlaylists()
  const allVideos = await fetchAllPlaylistVideos(playlists)

  return [...allVideos]
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    )
    .slice(0, count)
}
