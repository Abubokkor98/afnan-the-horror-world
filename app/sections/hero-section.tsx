import { getLatestVideos } from "@/lib/youtube/video/get-latest-videos"
import { getChannelInfo } from "@/lib/youtube/channel/get-channel-info"
import { Hero } from "@/components/hero/hero"
import { SectionError } from "@/components/section-error"
import type { Video, Channel } from "@/types/youtube"

export async function HeroSection() {
  let latestVideos: Video[]
  let channel: Channel | null

  try {
    ;[latestVideos, channel] = await Promise.all([
      getLatestVideos(10),
      getChannelInfo(),
    ])
  } catch {
    return <SectionError title="hero" />
  }

  const heroVideo = latestVideos[0] ?? null

  return (
    <Hero
      latestVideo={heroVideo}
      subscriberCount={channel?.subscriberCount ?? 0}
    />
  )
}
