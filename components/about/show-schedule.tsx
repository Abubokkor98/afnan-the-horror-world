import { RiCalendarLine } from "@remixicon/react"
import { WEEKLY_SCHEDULE } from "@/config/schedule"
import { AfnansBeeBadge } from "@/components/weekly-schedule/afnans-bee-badge"

export function ShowSchedule() {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">সাপ্তাহিক শো সিডিউল</h2>
        <p className="text-sm text-(--color-text-muted)">
          Weekly Episode Schedule
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {WEEKLY_SCHEDULE.map((item) => {
          const dayLine = [item.day, item.time, item.irregular ? "Irregular" : null]
            .filter(Boolean)
            .join(" · ")

          return (
            <div
              key={item.day}
              className="relative flex gap-4 overflow-hidden rounded-xl border border-(--color-bg-elevated) bg-(--color-bg-card) p-5"
            >
              {item.channel === "afnansbee" && (
                <AfnansBeeBadge href={item.channelUrl} />
              )}
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-(--color-crimson)/10">
                <RiCalendarLine className="h-5 w-5 text-(--color-crimson)" />
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold">{item.show}</h3>
                <p className="text-xs text-(--color-text-muted)">{item.subtitle}</p>
                <p className="text-xs text-(--color-text-subtle)">{dayLine}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
