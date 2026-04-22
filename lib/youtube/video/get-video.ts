import { cacheLife, cacheTag } from "next/cache"
import type { Playlist, Video } from "@/types/youtube"
import { mapToVideo } from "@/lib/youtube/mappers"
import { getVideoDetails } from "@/lib/youtube/helpers/get-video-details"
import { getVideoIdsFromPlaylist } from "@/lib/youtube/helpers/get-video-ids-from-playlist"
import { getAllPlaylists } from "@/lib/youtube/playlist/get-all-playlists"

/**
 * Fetches a single video by ID with its category info.
 */
export async function getVideo(videoId: string): Promise<Video | null> {
  "use cache"
  cacheTag(`video-${videoId}`)
  cacheLife("hours")

  const details = await getVideoDetails([videoId])
  if (details.length === 0) return null

  const playlists = await getAllPlaylists()
  const playlist = await findPlaylistForVideo(videoId, playlists)

  return mapToVideo(
    details[0],
    playlist?.slug ?? "",
    playlist?.title ?? "",
  )
}

async function findPlaylistForVideo(
  videoId: string,
  playlists: Playlist[],
): Promise<Playlist | null> {
  for (const playlist of playlists) {
    const ids = await getVideoIdsFromPlaylist(playlist.id)
    if (ids.includes(videoId)) return playlist
  }
  return null
}
