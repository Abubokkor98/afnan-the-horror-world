import { RiExternalLinkLine } from "@remixicon/react"
import { Badge } from "@/components/ui/badge"
import type { ParsedTimestamp } from "@/types/youtube"

interface StoryTimestampsProps {
  timestamps: ParsedTimestamp[]
  videoId: string
}

export function StoryTimestamps({ timestamps, videoId }: StoryTimestampsProps) {
  if (timestamps.length === 0) return null

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3">
        <h2 className="text-xl font-semibold">Stories in This Episode</h2>
        <Badge className="bg-(--color-crimson) text-white">
          {timestamps.length} stories
        </Badge>
      </div>
      <ol className="space-y-2">
        {timestamps.map((ts, index) => (
          <li key={ts.time} className="flex items-center justify-between rounded-lg border border-(--color-bg-elevated) bg-(--color-bg-card) px-4 py-3">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-(--color-text-subtle)">
                {index + 1}.
              </span>
              <span className="text-sm font-medium text-(--color-text-primary)">
                {ts.title}
              </span>
            </div>
            <a
              href={`https://www.youtube.com/watch?v=${videoId}&t=${ts.seconds}s`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex shrink-0 items-center gap-1 text-xs font-medium text-(--color-crimson) transition-colors hover:text-(--color-crimson-hover)"
            >
              Jump to story
              <RiExternalLinkLine className="h-3.5 w-3.5" />
            </a>
          </li>
        ))}
      </ol>
    </section>
  )
}
