import { RiYoutubeFill } from "@remixicon/react"
import { Button } from "@/components/ui/button"
import { formatCompactNumber } from "@/lib/format"
import { AfnansBeeCard } from "@/components/afnans-bee/afnans-bee-card"
import type { AfnansBeeData } from "@/types/afnans-bee"

const AFNANS_BEE_SUBSCRIBE_URL =
  "https://youtube.com/@AfnansBee?sub_confirmation=1"

const CONTENT_TAGS = ["ভ্রমণ", "ভ্লগ", "আলোচনা", "ইতিহাস"]

interface AfnansBeeProps {
  data: AfnansBeeData
}

export function AfnansBeeSectionContent({ data }: AfnansBeeProps) {
  const { videos, subscriberCount } = data

  const parsedCount =
    subscriberCount !== null ? parseInt(subscriberCount, 10) : null
  const subscriberLabel =
    parsedCount !== null && !Number.isNaN(parsedCount)
      ? `${formatCompactNumber(parsedCount)} subscribers`
      : null

  return (
    <section className="relative space-y-8 overflow-hidden rounded-2xl border border-(--color-bg-elevated) bg-(--color-bg-card) p-6 md:p-8">
      {/* Amber glow — top-left atmosphere */}
      <div className="pointer-events-none absolute -top-16 -left-16 h-48 w-48 rounded-full bg-(--color-amber)/8 blur-3xl" />

      {/* Section header */}
      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="h-px w-6 bg-(--color-amber)" />
            <span className="text-xs font-semibold uppercase tracking-widest text-(--color-amber)">
              @AfnansBee
            </span>
          </div>
          <h2 className="text-3xl font-semibold leading-tight">
            আফনান ভাইয়ের নতুন চ্যাপ্টার
          </h2>
          <p className="text-sm text-(--color-text-muted)">
            Horror এর বাইরেও আফনান ভাই
          </p>
        </div>

        <div className="flex flex-col items-start gap-1 sm:items-end">
          <Button
            asChild
            size="lg"
            className="group bg-(--color-crimson) text-white transition-all duration-300 hover:bg-(--color-crimson-hover) hover:shadow-[0_0_30px_color-mix(in_srgb,var(--color-crimson)_30%,transparent)] hover:ring-2 hover:ring-(--color-crimson)/50 hover:ring-offset-2 hover:ring-offset-(--color-bg-card)"
          >
            <a
              href={AFNANS_BEE_SUBSCRIBE_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <RiYoutubeFill className="mr-1.5 h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
              Subscribe to @AfnansBee
            </a>
          </Button>
          {subscriberLabel && (
            <span className="text-xs text-(--color-text-subtle)">
              {subscriberLabel}
            </span>
          )}
        </div>
      </div>

      {/* Video grid — equal height cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {videos.map((video) => (
          <AfnansBeeCard key={video.id} video={video} />
        ))}
      </div>

      {/* Content tags */}
      <div className="flex flex-wrap gap-2">
        {CONTENT_TAGS.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-(--color-bg-elevated) px-3 py-1 text-xs text-(--color-text-subtle)"
          >
            {tag}
          </span>
        ))}
      </div>
    </section>
  )
}
