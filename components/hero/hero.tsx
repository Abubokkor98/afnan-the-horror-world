import type { Video } from "@/types/youtube"
import { HeroContent } from "@/components/hero/hero-content"

interface HeroProps {
  latestVideo: Video | null
  subscriberCount: number
}

export function Hero({ latestVideo, subscriberCount }: HeroProps) {
  const backgroundUrl = latestVideo?.thumbnail ?? ""

  return (
    <section className="grain-overlay vignette relative flex min-h-[calc(100svh-5rem)] w-full items-center overflow-hidden">
      {/* Blurred background thumbnail */}
      {backgroundUrl && (
        <div
          className="absolute inset-0 scale-110 bg-cover bg-center blur-md brightness-[0.15]"
          style={{ backgroundImage: `url(${backgroundUrl})` }}
        />
      )}

      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-(--color-bg-page) via-transparent to-(--color-bg-page)/60" />
      <div className="absolute inset-0 bg-gradient-to-r from-(--color-bg-page)/80 to-transparent" />

      {/* Content */}
      <HeroContent
        latestVideo={latestVideo}
        subscriberCount={subscriberCount}
      />
    </section>
  )
}
