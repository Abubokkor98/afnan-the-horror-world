import { Hero } from "@/components/hero/hero"
import { CategoryRow } from "@/components/category-row/category-row"
import { CategoryGrid } from "@/components/category-grid/category-grid"
import { FeaturedStory } from "@/components/featured-story/featured-story"
import { ChannelStats } from "@/components/channel-stats/channel-stats"
import { FreshDrops } from "@/components/fresh-drops"
import { MostWatched } from "@/components/most-watched"
import { SubmitCta } from "@/components/submit-cta"
import { getSortedPlaylists } from "@/lib/youtube/playlist/get-sorted-playlists"
import { getLatestVideos } from "@/lib/youtube/video/get-latest-videos"
import { getMostWatchedVideos } from "@/lib/youtube/video/get-most-watched-videos"
import { getUncategorizedVideos } from "@/lib/youtube/video/get-uncategorized-videos"
import { getChannelInfo } from "@/lib/youtube/channel/get-channel-info"
import { getVideo } from "@/lib/youtube/video/get-video"
import { FEATURED_VIDEO_ID } from "@/config/featured"

export default async function HomePage() {
  const [playlists, latestVideos, mostWatched, uncategorized, channel, featuredVideo] =
    await Promise.all([
      getSortedPlaylists(),
      getLatestVideos(10),
      getMostWatchedVideos(6),
      getUncategorizedVideos(),
      getChannelInfo(),
      getVideo(FEATURED_VIDEO_ID),
    ])

  const heroVideo = latestVideos[0] ?? null

  return (
    <>
      {/* 1. Hero — full viewport cinematic intro */}
      <Hero
        latestVideo={heroVideo}
        subscriberCount={channel?.subscriberCount ?? 0}
      />

      {/* Remaining sections in a contained layout */}
      <div className="mx-auto max-w-7xl space-y-20 px-4 py-16">
        {/* 2. Latest Stories — horizontal scroll row */}
        <CategoryRow
          title="Latest Stories"
          href="/stories"
          videos={latestVideos}
        />

        {/* 3. Browse by Category — grid of playlist cards */}
        <CategoryGrid playlists={playlists} />

        {/* 4. Featured Story — Editor's Pick cinematic layout */}
        {featuredVideo && <FeaturedStory video={featuredVideo} />}

        {/* 5. Most Watched — top 6 with rank badges */}
        <MostWatched videos={mostWatched} />

        {/* 6. Channel Stats — subscribers, videos, views */}
        {channel && <ChannelStats channel={channel} />}

        {/* 7. Fresh Drops — uncategorized (only if any exist) */}
        <FreshDrops videos={uncategorized} />

        {/* 8. Submit CTA */}
        <SubmitCta />
      </div>
    </>
  )
}
