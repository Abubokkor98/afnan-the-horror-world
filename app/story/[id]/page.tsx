import { Suspense } from "react"
import type { Metadata } from "next"
import { connection } from "next/server"
import { getVideo } from "@/lib/youtube/video/get-video"
import { parseTimestamps, parseCountry } from "@/lib/parse-description"
import { safeJsonLd } from "@/lib/safe-json-ld"
import { VideoPlayer } from "@/components/video/video-player"
import { StoryHeader } from "@/components/story/story-header"
import { StorySubmitCta } from "@/components/story/story-submit-cta"
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
  await connection()
  const { id } = await params
  const video = await getVideo(id)

  return {
    title: video.title,
    description: video.description.slice(0, 160),
    alternates: {
      canonical: `/story/${id}`,
    },
    openGraph: {
      title: video.title,
      description: video.description.slice(0, 300),
      url: `/story/${id}`,
      type: "video.other",
      images: [
        {
          url: video.thumbnail,
          width: 1280,
          height: 720,
          alt: video.title,
        },
      ],
      videos: [
        {
          url: `https://www.youtube.com/watch?v=${id}`,
          type: "text/html",
        },
      ],
    },
  }
}

export default async function StoryPage({ params }: StoryPageProps) {
  await connection()
  const { id } = await params
  const video = await getVideo(id)

  const timestamps = parseTimestamps(video.description)
  const country = parseCountry(video.description)
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "")
  const storyUrl = siteUrl ? `${siteUrl}/story/${id}` : `/story/${id}`

  const clipParts = timestamps.map((ts, i) => ({
    "@type": "Clip",
    name: ts.title,
    startOffset: ts.seconds,
    endOffset:
      i + 1 < timestamps.length ? timestamps[i + 1].seconds : ts.seconds + 60,
    url: `${storyUrl}?t=${ts.seconds}`,
  }))

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: video.title,
    description: video.description.slice(0, 5000),
    thumbnailUrl: video.thumbnail,
    uploadDate: video.publishedAt,
    duration: video.duration,
    embedUrl: `https://www.youtube.com/embed/${id}`,
    contentUrl: `https://www.youtube.com/watch?v=${id}`,
    interactionStatistic: {
      "@type": "InteractionCounter",
      interactionType: "https://schema.org/WatchAction",
      userInteractionCount: video.viewCount,
    },
    ...(clipParts.length > 0 && { hasPart: clipParts }),
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
          <StoryTimestamps timestamps={timestamps} videoId={id} />
          <ShareButtons title={video.title} storyUrl={storyUrl} />
        </div>
        <div className="space-y-8">
          <StorySidebar video={video} />
          <StorySubmitCta />
        </div>
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
