import { Suspense } from "react"
import type { Metadata } from "next"
import { getVideo } from "@/lib/youtube/video/get-video"
import { parseTimestamps, parseCountry } from "@/lib/parse-description"
import { safeJsonLd } from "@/lib/safe-json-ld"
import { VideoPlayer } from "@/components/video/video-player"
import { StoryHeader } from "@/components/story/story-header"
import { StoryDescription } from "@/components/story/story-description"
import { StoryTimestamps } from "@/components/story/story-timestamps"
import { ShareButtons } from "@/components/story/share-buttons"
import { StorySidebar } from "@/components/story/story-sidebar"
import { StoryRelatedSection } from "@/components/story/story-related-section"
import { StoryRelatedSkeleton } from "@/components/skeletons/story-related-skeleton"

interface StoryPageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({
  params,
}: StoryPageProps): Promise<Metadata> {
  const { id } = await params
  const video = await getVideo(id)

  return {
    title: `${video.title} | Afnan The Horror World`,
    description: video.description.slice(0, 160),
    openGraph: {
      title: video.title,
      images: [{ url: video.thumbnail }],
      type: "video.other",
    },
  }
}

export default async function StoryPage({ params }: StoryPageProps) {
  const { id } = await params
  const video = await getVideo(id)

  const timestamps = parseTimestamps(video.description)
  const country = parseCountry(video.description)
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
      />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <VideoPlayer videoId={id} title={video.title} />
          <StoryHeader video={video} country={country} />
          <StoryDescription description={video.description} />
          <StoryTimestamps timestamps={timestamps} videoId={id} />
          <ShareButtons title={video.title} storyUrl={storyUrl} />
        </div>
        <StorySidebar video={video} />
      </div>

      <Suspense fallback={<StoryRelatedSkeleton />}>
        <StoryRelatedSection
          categorySlug={video.categorySlug}
          currentId={id}
        />
      </Suspense>
    </main>
  )
}
