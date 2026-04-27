import { cacheLife } from "next/cache"
import { RiEyeFill, RiVideoFill, RiGroupFill, RiCalendarFill } from "@remixicon/react"
import type { Channel } from "@/types/youtube"

async function getCachedCurrentYear(): Promise<number> {
  "use cache"
  cacheLife("max")
  return new Date().getFullYear()
}

interface StatCardProps {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
}

function StatCard({ icon: Icon, label, value }: StatCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-(--color-bg-elevated) bg-(--color-bg-card) p-6 transition-all duration-300 hover:border-(--color-crimson)/30">
      <div className="absolute top-0 right-0 h-24 w-24 -translate-y-8 translate-x-8 rounded-full bg-(--color-crimson)/5 transition-transform duration-500 group-hover:scale-150" />
      <div className="relative space-y-2">
        <Icon className="h-6 w-6 text-(--color-crimson)" />
        <p className="animate-count-up text-3xl font-bold text-(--color-text-primary)">
          {value}
        </p>
        <p className="text-sm text-(--color-text-muted)">{label}</p>
      </div>
    </div>
  )
}

interface ChannelStatsProps {
  channel: Channel
}

export async function ChannelStats({ channel }: ChannelStatsProps) {
  const parsedYear = new Date(channel.publishedAt).getFullYear()
  const currentYear = await getCachedCurrentYear()
  const yearsActive = Number.isFinite(parsedYear) ? currentYear - parsedYear : null
  const yearsDisplay =
    yearsActive === null ? null : yearsActive === 0 ? "Less than a year" : `${yearsActive}+`

  return (
    <section className="space-y-6 rounded-2xl bg-(--color-bg-card) p-8">
      <h2 className="text-3xl font-semibold">The Platform in Numbers</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard
          icon={RiGroupFill}
          label="Subscribers"
          value={formatCompact(channel.subscriberCount)}
        />
        <StatCard
          icon={RiVideoFill}
          label="Total Stories"
          value={formatCompact(channel.videoCount)}
        />
        <StatCard
          icon={RiEyeFill}
          label="Total Views"
          value={formatCompact(channel.viewCount)}
        />
        {yearsDisplay && (
          <StatCard
            icon={RiCalendarFill}
            label="Years Active"
            value={yearsDisplay}
          />
        )}
      </div>
      <p className="text-center text-sm text-(--color-text-muted)">
        All stories are real. Afnan bhai personally reviews every submission before narrating.
      </p>
    </section>
  )
}

function formatCompact(count: number): string {
  return new Intl.NumberFormat("en", { notation: "compact" }).format(count)
}
