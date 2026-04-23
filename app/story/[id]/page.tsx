import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { RiTimeLine, RiEyeLine, RiCalendarLine } from "@remixicon/react"
import { getVideo } from "@/lib/youtube/video/get-video"
import { getPlaylistVideos } from "@/lib/youtube/video/get-playlist-videos"
import { getLatestVideos } from "@/lib/youtube/video/get-latest-videos"
import { getAllPlaylists } from "@/lib/youtube/playlist/get-all-playlists"
import { parseTimestamps, parseCountry } from "@/lib/parse-description"
import { formatViewCount, formatTimeAgo, formatDuration } from "@/lib/format"
import { safeJsonLd } from "@/lib/safe-json-ld"
import { VideoPlayer } from "@/components/video-player"
import { CategoryBadge } from "@/components/video-card/category-badge"
import { Badge } from "@/components/ui/badge"
import { VideoGrid } from "@/components/video-grid"
import { StoryTimestamps } from "@/app/story/[id]/story-timestamps"
import { StoryDescription } from "@/app/story/[id]/story-description"
import { ShareButtons } from "@/app/story/[id]/share-buttons"
import { StorySidebar } from "@/app/story/[id]/story-sidebar"
import { Video } from "@/types/youtube"

interface StoryPageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: StoryPageProps): Promise<Metadata> {
  const { id } = await params
  const video = await getVideo(id)
  if (!video) return { title: "Story Not Found" }

  return {
    title: `${video.title} | Afnan's Horror World`,
    description: video.description.slice(0, 160),
    openGraph: { title: video.title, images: [{ url: video.thumbnail }], type: "video.other" },
  }
}

export default async function StoryPage({ params }: StoryPageProps) {
  const { id } = await params
  const video = await getVideo(id)
  if (!video) notFound()

  const timestamps = parseTimestamps(video.description)
  const country = parseCountry(video.description)
  const related = await getRelatedVideos(video.categorySlug, id)
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "")
  const storyUrl = siteUrl ? `${siteUrl}/story/${id}` : `/story/${id}`

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: video.title,
    description: video.description,
    thumbnailUrl: video.thumbnail,
    uploadDate: video.publishedAt,
    embedUrl: `https://www.youtube.com/embed/${id}`,
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }} />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <VideoPlayer videoId={id} title={video.title} />
          <StoryHeader video={video} country={country} />
          <StoryDescription description={video.description} />
          <StoryTimestamps timestamps={timestamps} videoId={id} />
          <ShareButtons videoId={id} title={video.title} storyUrl={storyUrl} />
        </div>
        <StorySidebar video={video} />
      </div>

      {related.length > 0 && (
        <section className="mt-16 space-y-6 border-t border-(--color-border) pt-12">
          <h2 className="text-2xl font-semibold">
            {video.categorySlug ? "More Stories in This Category" : "More Stories"}
          </h2>
          <VideoGrid videos={related} />
        </section>
      )}
    </main>
  )
}

const RELATED_COUNT = 4

async function getRelatedVideos(categorySlug: string, currentId: string) {
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
  } catch {
    return []
  }
}

function StoryHeader({ video, country }: { video: Video; country: string | null }) {
  return (
    <div className="space-y-3">
      <h1 className="text-2xl font-semibold leading-tight lg:text-3xl">{video.title}</h1>
      <div className="flex flex-wrap items-center gap-3 text-sm text-(--color-text-subtle)">
        <CategoryBadge category={video.categoryLabel} />
        {country && <Badge variant="outline">{country}</Badge>}
        <span className="flex items-center gap-1"><RiEyeLine className="h-3.5 w-3.5" />{formatViewCount(video.viewCount)}</span>
        <span className="flex items-center gap-1"><RiTimeLine className="h-3.5 w-3.5" />{formatDuration(video.duration)}</span>
        <span className="flex items-center gap-1"><RiCalendarLine className="h-3.5 w-3.5" />{formatTimeAgo(video.publishedAt)}</span>
      </div>
    </div>
  )
}
