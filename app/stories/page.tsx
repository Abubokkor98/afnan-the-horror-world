import type { Metadata } from "next"
import { getAllVideos } from "@/lib/youtube/video/get-all-videos"
import { getSortedPlaylists } from "@/lib/youtube/playlist/get-sorted-playlists"
import { StoriesClient } from "@/app/stories/stories-client"

export const metadata: Metadata = {
  title: "All Stories | Afnan The Horror World",
  description:
    "Browse every horror story narrated by Afnan — filter by category, duration, and sort by views or date.",
}

export default async function StoriesPage() {
  const [videos, playlists] = await Promise.all([
    getAllVideos(),
    getSortedPlaylists(),
  ])

  return (
    <main className="mx-auto max-w-7xl space-y-6 px-4 py-8">
      <div className="space-y-1">
        <h1 className="text-4xl font-semibold">All Stories</h1>
        <p className="text-(--color-text-muted)">
          {videos.length} stories total
        </p>
      </div>
      <StoriesClient videos={videos} playlists={playlists} />
    </main>
  )
}
