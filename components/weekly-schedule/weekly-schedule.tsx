import { WEEKLY_SCHEDULE } from "@/config/schedule"
import { ScheduleCard } from "@/components/weekly-schedule/schedule-card"

export function WeeklySchedule() {
  return (
    <section className="space-y-6">
      {/* Section header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="h-px w-6 bg-(--color-amber)" aria-hidden="true" />
          <span className="text-xs font-semibold uppercase tracking-widest text-(--color-amber)">
            Every Week
          </span>
        </div>
        <h2 className="text-3xl font-semibold">Upload Schedule</h2>
        <p className="text-sm text-(--color-text-muted)">
          New horror stories drop every week — never miss an episode
        </p>
      </div>

      {/* Schedule grid — 5 days on desktop, 2 on tablet, 1 on mobile */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {WEEKLY_SCHEDULE.map((item) => (
          <ScheduleCard key={item.day} item={item} />
        ))}
      </div>
    </section>
  )
}
