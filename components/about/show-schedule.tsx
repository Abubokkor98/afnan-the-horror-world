import { RiCalendarLine } from "@remixicon/react"

interface ShowInfo {
  title: string
  banglaTitle: string
  day: string
  time: string
}

const SHOWS: ShowInfo[] = [
  { title: "Thursday Night", banglaTitle: "বৃহস্পতিবার রাত", day: "Every Thursday", time: "10:59 PM" },
  { title: "Friday Special Episode", banglaTitle: "শুক্রবার স্পেশাল", day: "Fridays (Irregular)", time: "10:59 PM" },
  { title: "Horror Night", banglaTitle: "শনিবার হরর নাইট", day: "Every Saturday", time: "10:59 PM" },
  { title: "অমীমাংসিত রহস্য", banglaTitle: "রহস্য ও রোমাঞ্চ", day: "Every Monday", time: "10:59 PM" },
]

export function ShowSchedule() {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">সাপ্তাহিক শো সিডিউল</h2>
        <p className="text-sm text-(--color-text-muted)">Weekly Episode Schedule</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {SHOWS.map((show) => (
          <div key={show.title} className="flex gap-4 rounded-xl border border-(--color-bg-elevated) bg-(--color-bg-card) p-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-(--color-crimson)/10">
              <RiCalendarLine className="h-5 w-5 text-(--color-crimson)" />
            </div>
            <div className="space-y-1">
              <h3 className="font-semibold">{show.title}</h3>
              <p className="text-xs text-(--color-text-muted)">{show.banglaTitle}</p>
              <p className="text-xs text-(--color-text-subtle)">{show.day} · {show.time}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
