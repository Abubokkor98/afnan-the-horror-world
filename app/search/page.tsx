import type { Metadata } from "next"
import { getAllVideos } from "@/lib/youtube/video/get-all-videos"
import { getSortedPlaylists } from "@/lib/youtube/playlist/get-sorted-playlists"
import { SearchClient } from "@/components/search/search-client"

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>
}

export async function generateMetadata({
  searchParams,
}: SearchPageProps): Promise<Metadata> {
  const { q } = await searchParams
  const safeQuery = q
    ?.trim()
    .replace(/[\p{Cc}]/gu, "")
    .replace(/\s+/g, " ")
    .slice(0, 100)
  const title = safeQuery
    ? `"${safeQuery}" — Search`
    : "Search"

  return {
    title,
    description:
      "Search horror stories narrated by Afnan — find any story by keyword.",
    robots: { index: false, follow: false },
  }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams
  const videosPromise = getAllVideos()
  const playlistsPromise = getSortedPlaylists()

  return (
    <main className="mx-auto max-w-7xl space-y-6 px-4 py-8">
      <SearchClient
        initialQuery={q ?? ""}
        videosPromise={videosPromise}
        playlistsPromise={playlistsPromise}
      />
    </main>
  )
}
