import { getSortedPlaylists } from "@/lib/youtube/playlist/get-sorted-playlists"
import { CategoryGrid } from "@/components/category-grid/category-grid"
import { SectionError } from "@/components/section-error/section-error"
import type { Playlist } from "@/types/youtube"

export async function CategoryGridSection() {
  let playlists: Playlist[]

  try {
    playlists = await getSortedPlaylists()
  } catch {
    return <SectionError title="categories" />
  }

  return <CategoryGrid playlists={playlists} />
}
