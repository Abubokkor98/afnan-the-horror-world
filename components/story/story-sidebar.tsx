import Link from "next/link"
import type { Video } from "@/types/youtube"
import { formatViewCount, formatDate } from "@/lib/format"
import { parseCountry } from "@/lib/parse-description"
import { MAIN_CHANNEL_URL } from "@/config/channel-urls"

interface StorySidebarProps {
  video: Video
}

export function StorySidebar({ video }: StorySidebarProps) {
  const views = formatViewCount(video.viewCount)
  const publishDate = formatDate(video.publishedAt)
  const country = parseCountry(video.description)

  return (
    <aside className="space-y-6">
      <div className="space-y-4 rounded-xl border border-(--color-bg-elevated) bg-(--color-bg-card) p-5">
        <h3 className="text-sm font-semibold">Story Details</h3>
        <dl className="space-y-3 text-sm">
          <SidebarRow label="Narrator" value="Afnan" />
          <div className="flex justify-between">
            <dt className="text-(--color-text-muted)">Category</dt>
            <dd>
              {video.categorySlug ? (
                <Link href={`/category/${video.categorySlug}`} className="font-medium text-(--color-crimson) hover:text-(--color-crimson-hover)">
                  {video.categoryLabel}
                </Link>
              ) : (
                <span className="font-medium text-(--color-text-subtle)">Uncategorized</span>
              )}
            </dd>
          </div>
          <SidebarRow label="Published" value={publishDate} />
          <SidebarRow label="Views" value={views} />
          {country && <SidebarRow label="Origin" value={country} />}
        </dl>
      </div>
      <a
        href={MAIN_CHANNEL_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="block rounded-lg bg-(--color-crimson) px-4 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-(--color-crimson-hover)"
      >
        Subscribe on YouTube
      </a>
    </aside>
  )
}

function SidebarRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <dt className="text-(--color-text-muted)">{label}</dt>
      <dd className="font-medium">{value}</dd>
    </div>
  )
}
