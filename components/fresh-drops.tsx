import Link from "next/link"
import type { Video } from "@/types/youtube"
import { VideoGrid } from "@/components/video-grid"

interface FreshDropsProps {
  videos: Video[]
}

const MAX_FRESH_DROPS = 6

export function FreshDrops({ videos }: FreshDropsProps) {
  if (videos.length === 0) return null

  const displayVideos = videos.slice(0, MAX_FRESH_DROPS)

  return (
    <section className="space-y-6 rounded-2xl border border-dashed border-(--color-amber)/40 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-3xl font-semibold">Fresh Drops</h2>
          <span className="rounded-full border border-dashed border-(--color-amber) px-3 py-0.5 text-xs font-medium text-(--color-amber)">
            Uncategorized
          </span>
        </div>
        <Link
          href="/stories?filter=uncategorized"
          className="text-sm font-medium text-(--color-crimson) transition-colors hover:text-(--color-crimson-hover)"
        >
          View all uncategorized →
        </Link>
      </div>
      <p className="text-sm text-(--color-text-muted)" title="These stories will be categorized soon">
        Recently uploaded stories that haven&apos;t been categorized yet.
        These stories will be categorized soon.
      </p>
      <VideoGrid videos={displayVideos} />
    </section>
  )
}
