import { cacheLife, cacheTag } from "next/cache"
import type { Video } from "@/types/youtube"
import { mapToVideo } from "@/lib/youtube/mappers"
import { getVideoIdsFromPlaylist } from "@/lib/youtube/helpers/get-video-ids-from-playlist"
import { getVideoDetails } from "@/lib/youtube/helpers/get-video-details"
import { getUploadsPlaylistId } from "@/lib/youtube/helpers/get-uploads-playlist-id"
import { getAllPlaylists } from "@/lib/youtube/playlist/get-all-playlists"

/**
 * Returns videos that are uploaded but not in any playlist.
 * Shown as "Fresh Drops" on homepage — only when non-empty.
 */
export async function getUncategorizedVideos(): Promise<Video[]> {
  "use cache"
  cacheTag("uncategorized")
  cacheLife("max")

  const uploadsPlaylistId = await getUploadsPlaylistId()
  if (!uploadsPlaylistId) return []

  const [uploadedIds, playlists] = await Promise.all([
    getVideoIdsFromPlaylist(uploadsPlaylistId),
    getAllPlaylists(),
  ])

  const categorizedIdLists = await Promise.all(
    playlists.map((p) => getVideoIdsFromPlaylist(p.id)),
  )
  const categorizedIds = new Set(categorizedIdLists.flat())

  const uncategorizedIds = uploadedIds.filter(
    (id) => !categorizedIds.has(id),
  )
  if (uncategorizedIds.length === 0) return []

  const details = await getVideoDetails(uncategorizedIds)
  return details.map((detail) => mapToVideo(detail, "", ""))
}
