import { RiGroupLine, RiVideoLine, RiEyeLine, RiGlobalLine } from "@remixicon/react"
import type { Channel } from "@/types/youtube"
import { formatCompactNumber } from "@/lib/format"

interface AboutStatsProps {
  channel: Channel
}

export function AboutStats({ channel }: AboutStatsProps) {
  const stats = [
    { icon: RiGroupLine, value: formatCompactNumber(channel.subscriberCount), label: "Subscribers" },
    { icon: RiVideoLine, value: formatCompactNumber(channel.videoCount), label: "Stories Published" },
    { icon: RiEyeLine, value: formatCompactNumber(channel.viewCount), label: "Total Views" },
    { icon: RiGlobalLine, value: "100+", label: "Countries Reached" },
  ]

  return (
    <section className="space-y-6">
      <h2 className="text-center text-2xl font-semibold">আমাদের কমিউনিটি</h2>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center gap-2 rounded-xl border border-(--color-bg-elevated) bg-(--color-bg-card) p-6 text-center">
            <stat.icon className="h-6 w-6 text-(--color-crimson)" />
            <span className="text-2xl font-bold text-(--color-text-primary)">{stat.value}</span>
            <span className="text-xs text-(--color-text-muted)">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
