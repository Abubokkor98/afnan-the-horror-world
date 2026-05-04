import Link from "next/link"
import { RiPlayFill, RiGroupFill } from "@remixicon/react"
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
    <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center justify-center px-4 py-8 sm:py-12 lg:px-8">
      <div className="flex w-full max-w-4xl flex-col items-center space-y-5 text-center sm:space-y-6">
        {/* Editorial Overline & Badge Row */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/40 px-3 py-1 backdrop-blur-md">
            <RiGroupFill
              className="h-3.5 w-3.5 text-(--color-crimson)"
              aria-hidden="true"
            />
            <span className="text-xs font-medium tracking-wide text-white/90">
              {formattedSubs}+ Listeners
            </span>
          </div>
          <div
            className="hidden h-px w-8 bg-white/20 sm:block"
            aria-hidden="true"
          />
          <p className="text-[11px] font-semibold tracking-[0.2em] text-(--color-crimson) uppercase sm:text-xs">
            Feel The Real Fear With Us
          </p>
        </div>

        {/* Cinematic Title */}
        <div className="space-y-3 sm:space-y-5">
          <h1 className="hero-title text-5xl leading-[0.95] tracking-wide text-balance text-white sm:text-6xl md:text-7xl lg:text-8xl">
            AFNAN
            <br />
            <span className="text-(--color-crimson) drop-shadow-[0_0_40px_rgba(185,28,28,0.4)]">
              THE HORROR
            </span>
            <br />
            WORLD
          </h1>

          <p className="max-w-2xl text-base leading-relaxed font-light text-pretty text-(--color-text-body) sm:text-lg">
            বাংলাদেশের সবচেয়ে জনপ্রিয় হরর চ্যানেল। সত্য ভৌতিক ঘটনা ও হাড়হিম
            করা গল্পের এক অনন্য জগৎ।
          </p>
        </div>

        {/* High-Impact CTA */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2 sm:gap-4 sm:pt-4">
          {latestVideo && (
            <Button
              asChild
              size="lg"
              className="group bg-(--color-crimson) text-white transition-all duration-300 hover:bg-(--color-crimson-hover) hover:shadow-[0_0_30px_color-mix(in_srgb,var(--color-crimson)_30%,transparent)] hover:ring-2 hover:ring-(--color-crimson)/50 hover:ring-offset-2 hover:ring-offset-(--color-bg-page)"
            >
              <Link href={`/story/${latestVideo.id}`}>
                <RiPlayFill
                  className="mr-1.5 h-4 w-4 transition-transform duration-300 group-hover:scale-110"
                  aria-hidden="true"
                />
                Listen Latest Story
              </Link>
            </Button>
          )}

          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-white/10 bg-black/20 text-white backdrop-blur-md transition-all duration-300 hover:border-white/30 hover:bg-white/5"
          >
            <Link href="/stories">Browse All Stories</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
