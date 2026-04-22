import { cacheLife, cacheTag } from "next/cache"
import type { Playlist } from "@/types/youtube"
import { getAllPlaylists } from "@/lib/youtube/playlist/get-all-playlists"
import { CATEGORY_ORDER } from "@/config/category-order"

/**
 * Returns playlists sorted by config/category-order.ts.
 * Playlists not in the order array appear at the end.
 */
export async function getSortedPlaylists(): Promise<Playlist[]> {
  "use cache"
  cacheTag("playlists")
  cacheLife("hours")

  const playlists = await getAllPlaylists()

  if (CATEGORY_ORDER.length === 0) return playlists

  const orderMap = new Map(
    CATEGORY_ORDER.map((title, index) => [title.toLowerCase(), index]),
  )

  return [...playlists].sort((a, b) => {
    const aOrder =
      orderMap.get(a.title.toLowerCase()) ?? Number.MAX_SAFE_INTEGER
    const bOrder =
      orderMap.get(b.title.toLowerCase()) ?? Number.MAX_SAFE_INTEGER
    return aOrder - bOrder
  })
}
