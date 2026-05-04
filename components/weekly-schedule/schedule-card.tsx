import { RiCalendarLine, RiYoutubeFill } from "@remixicon/react"
import type { ScheduleItem } from "@/config/schedule"

interface ScheduleCardProps {
  item: ScheduleItem
}

const ICON_BG: Record<ScheduleItem["channel"], string> = {
  main: "bg-(--color-crimson)/10",
  afnansbee: "bg-(--color-amber)/10",
}

const ICON_COLOR: Record<ScheduleItem["channel"], string> = {
  main: "text-(--color-crimson)",
  afnansbee: "text-(--color-amber)",
}

export function ScheduleCard({ item }: ScheduleCardProps) {
  const metaLine = [item.day, item.time, item.irregular ? "Irregular" : null]
    .filter(Boolean)
    .join(" · ")

  return (
    <div className="relative flex gap-4 overflow-hidden rounded-xl border border-(--color-bg-elevated) bg-(--color-bg-card) p-5">
      {item.channel === "afnansbee" && (
        <a
          href={item.channelUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit AfnansBee on YouTube"
          className="absolute -right-7 top-5 flex w-28 rotate-45 items-center justify-center gap-1 bg-(--color-amber) py-1 text-[10px] font-bold uppercase tracking-wider text-white transition-colors hover:bg-(--color-amber-hover) md:-right-8 md:w-32 md:text-xs"
        >
          <RiYoutubeFill className="h-2.5 w-2.5 shrink-0" aria-hidden="true" />
          @Bee
        </a>
      )}
      {/* Channel-coloured icon box */}
      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${ICON_BG[item.channel]}`}
      >
        <RiCalendarLine
          className={`h-5 w-5 ${ICON_COLOR[item.channel]}`}
          aria-hidden="true"
        />
      </div>

      {/* Content — mirrors about page hierarchy */}
      <div className="space-y-1">
        <h3 className="font-semibold text-(--color-text-primary)">
          {item.show}
          {item.season && (
            <span className="ml-1.5 text-sm font-normal text-(--color-text-muted)">
              {item.season}
            </span>
          )}
        </h3>
        <p className="text-xs text-(--color-text-muted)">{item.dayBangla}</p>
        <p className="text-xs text-(--color-text-subtle)">{metaLine}</p>
      </div>
    </div>
  )
}
