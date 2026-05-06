import { notFound } from "next/navigation"
import type { Playlist, Video } from "@/types/youtube"
import { mapToVideo } from "@/lib/youtube/mappers"
import { getVideoDetails } from "@/lib/youtube/helpers/get-video-details"
import { getVideoIdsFromPlaylist } from "@/lib/youtube/helpers/get-video-ids-from-playlist"
import { getAllPlaylists } from "@/lib/youtube/playlist/get-all-playlists"

/**
 * Fetches a single video by ID with its category info.
 *
 * No "use cache" here — the inner functions (getVideoDetails,
 * getAllPlaylists, getVideoIdsFromPlaylist) already cache their own
 * YouTube API results. This function just composes cached data,
 * so notFound() is safe to call without risk of cache poisoning.
 */
export async function getVideo(videoId: string): Promise<Video> {
  const [details, playlists] = await Promise.all([
    getVideoDetails([videoId]),
    getAllPlaylists(),
  ])

  if (details.length === 0) notFound()

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
  const playlistsWithIds = await Promise.all(
    playlists.map(async (playlist) => {
      const ids = await getVideoIdsFromPlaylist(playlist.id)
      return { playlist, ids }
    })
  )

  for (const { playlist, ids } of playlistsWithIds) {
    if (ids.includes(videoId)) return playlist
  }
  return null
}
