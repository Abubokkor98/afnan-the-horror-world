import Image from "next/image"
import type { Video } from "@/types/youtube"
import { HeroContent } from "@/components/hero/hero-content"

interface HeroProps {
  latestVideo: Video | null
  subscriberCount: number
}

export function Hero({ latestVideo, subscriberCount }: HeroProps) {
  const backgroundUrl = latestVideo?.thumbnail ?? "/hero-fallback.jpg"

  return (
    <section className="grain-overlay vignette relative flex min-h-[calc(100svh-4rem)] w-full items-center overflow-hidden">
      {/* Blurred background thumbnail — priority preloads it for LCP */}
      <Image
        src={backgroundUrl}
        alt=""
        fill
        className="scale-110 object-cover blur-md brightness-[0.15]"
        priority
        unoptimized
        aria-hidden="true"
      />

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
