import type { Playlist, Video } from "@/types/youtube"
import { getPlaylistVideos } from "@/lib/youtube/video/get-playlist-videos"

/**
 * Fetches videos from all playlists, deduplicating by video ID.
 * A video appearing in multiple playlists is only returned once.
 */
export async function fetchAllPlaylistVideos(
  playlists: Playlist[],
): Promise<Video[]> {
  const videoArrays = await Promise.all(
    playlists.map((p) => getPlaylistVideos(p.id)),
  )

  const seen = new Set<string>()
  const unique: Video[] = []

  for (const videos of videoArrays) {
    for (const video of videos) {
      if (seen.has(video.id)) continue
      seen.add(video.id)
      unique.push(video)
    }
  }

  return unique
}
