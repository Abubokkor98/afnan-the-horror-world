import Link from "next/link"
import { RiPlayCircleFill, RiGroupFill } from "@remixicon/react"
import { Button } from "@/components/ui/button"
import type { Video } from "@/types/youtube"
import { formatCompactNumber } from "@/lib/format"

interface HeroContentProps {
  latestVideo: Video | null
  subscriberCount: number
}

export function HeroContent({
  latestVideo,
  subscriberCount,
}: HeroContentProps) {
  const formattedSubs = formatCompactNumber(subscriberCount)

  return (
    <div className="relative z-10 mx-auto max-w-7xl px-4 py-20">
      <div className="max-w-2xl space-y-6">
        {/* Subscriber badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-(--color-crimson)/30 bg-(--color-crimson)/10 px-4 py-1.5">
          <RiGroupFill className="h-4 w-4 text-(--color-crimson)" />
          <span className="text-sm font-medium text-(--color-crimson)">
            {formattedSubs}+ Subscribers
          </span>
        </div>

        {/* Title */}
        <h1 className="hero-title text-5xl leading-tight tracking-wide sm:text-6xl md:text-7xl">
          Afnan The Horror World
        </h1>

        {/* Subtitle */}
        <p className="max-w-lg text-lg leading-relaxed text-(--color-text-body)">
          True horror stories narrated by Afnan — from your neighbourhood,
          from every corner of the world. New stories every week.
        </p>

        {/* CTA */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          {latestVideo && (
            <Button asChild size="lg" className="bg-(--color-crimson) text-white hover:bg-(--color-crimson-hover)">
              <Link href={`/story/${latestVideo.id}`}>
                <RiPlayCircleFill className="mr-2 h-5 w-5" />
                Watch Latest Story
              </Link>
            </Button>
          )}
          <Button asChild variant="outline" size="lg" className="border-(--color-text-subtle) text-(--color-text-primary) hover:border-(--color-crimson) hover:text-(--color-crimson)">
            <Link href="/stories">Browse All Stories</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
