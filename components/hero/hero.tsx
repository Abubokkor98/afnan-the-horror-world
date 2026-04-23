import type { Video } from "@/types/youtube"
import { HeroContent } from "@/components/hero/hero-content"

interface HeroProps {
  latestVideo: Video | null
  subscriberCount: number
}

export function Hero({ latestVideo, subscriberCount }: HeroProps) {
  const backgroundUrl = latestVideo?.thumbnail ?? ""

  return (
    <section className="grain-overlay vignette relative flex min-h-svh items-center overflow-hidden max-md:min-h-[90vh]">
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

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="h-10 w-6 rounded-full border-2 border-(--color-text-muted)/40 p-1">
          <div className="mx-auto h-2 w-1 rounded-full bg-(--color-crimson)" />
        </div>
      </div>
    </section>
  )
}
