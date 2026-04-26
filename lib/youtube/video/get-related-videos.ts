import { getAllPlaylists } from "@/lib/youtube/playlist/get-all-playlists"
import { getPlaylistVideos } from "@/lib/youtube/video/get-playlist-videos"
import { getLatestVideos } from "@/lib/youtube/video/get-latest-videos"
import type { Video } from "@/types/youtube"

const RELATED_COUNT = 4

/**
 * Fetches related videos by category. Falls back to latest videos
 * if no category match is found.
 */
export async function getRelatedVideos(
  categorySlug: string,
  currentId: string,
): Promise<Video[]> {
  try {
    if (categorySlug) {
      const playlists = await getAllPlaylists()
      const playlist = playlists.find((p) => p.slug === categorySlug)
      if (playlist) {
        const videos = await getPlaylistVideos(playlist.id)
        return videos.filter((v) => v.id !== currentId).slice(0, RELATED_COUNT)
      }
    }
    const latest = await getLatestVideos(RELATED_COUNT + 1)
    return latest.filter((v) => v.id !== currentId).slice(0, RELATED_COUNT)
  } catch (error) {
    console.error(`getRelatedVideos failed for category="${categorySlug}"`, error)
    return []
  }
}
