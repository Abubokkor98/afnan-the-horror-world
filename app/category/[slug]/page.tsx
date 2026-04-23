import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getAllPlaylists } from "@/lib/youtube/playlist/get-all-playlists"
import { getPlaylistVideos } from "@/lib/youtube/video/get-playlist-videos"
import { VideoGrid } from "@/components/video-grid"
import { CategoryGrid } from "@/components/category-grid/category-grid"

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params
  const playlists = await getAllPlaylists()
  const playlist = playlists.find((p) => p.slug === slug)
  if (!playlist) return { title: "Category Not Found" }

  return {
    title: `${playlist.title} | Afnan's Horror World`,
    description: playlist.description || `Browse all ${playlist.title} stories narrated by Afnan.`,
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const playlists = await getAllPlaylists()
  const playlist = playlists.find((p) => p.slug === slug)

  if (!playlist) notFound()

  const videos = await getPlaylistVideos(playlist.id)
  const otherPlaylists = playlists.filter((p) => p.id !== playlist.id)
  const storyLabel = videos.length === 1 ? "story" : "stories"

  return (
    <main className="mx-auto max-w-7xl space-y-12 px-4 py-8">
      {/* Category header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-semibold">{playlist.title}</h1>
        {playlist.description && (
          <p className="max-w-2xl text-(--color-text-body)">{playlist.description}</p>
        )}
        <p className="text-sm text-(--color-text-subtle)">
          {videos.length} {storyLabel}
        </p>
      </div>

      {/* Video grid */}
      <VideoGrid videos={videos} priorityCount={4} />

      {/* Other categories */}
      {otherPlaylists.length > 0 && (
        <section className="space-y-6 border-t border-(--color-border) pt-12">
          <h2 className="text-2xl font-semibold">Other Categories</h2>
          <CategoryGrid playlists={otherPlaylists} showHeader={false} />
        </section>
      )}
    </main>
  )
}
