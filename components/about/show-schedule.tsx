import { RiCalendarLine, RiYoutubeFill } from "@remixicon/react"
import { AFNANS_BEE_URL } from "@/config/channel-urls"

interface ShowInfo {
  title: string
  banglaTitle: string
  day: string
  time: string
  channel?: "afnansbee"
}


const SHOWS: ShowInfo[] = [
  { title: "অমীমাংসিত রহস্য", banglaTitle: "রহস্য ও রোমাঞ্চ", day: "Every Sunday", time: "10:59 PM", channel: "afnansbee" },
  { title: "Horror Night", banglaTitle: "প্রতি সোমবার রাত", day: "Every Monday", time: "10:59 PM" },
  { title: "Fear With Tuesday", banglaTitle: "প্রতি মঙ্গলবার রাত", day: "Every Tuesday", time: "10:59 PM", channel: "afnansbee" },
  { title: "Thursday Night", banglaTitle: "বৃহস্পতিবার রাত", day: "Every Thursday", time: "10:59 PM" },
  { title: "Friday Special Episode", banglaTitle: "শুক্রবার স্পেশাল", day: "Fridays (Irregular)", time: "10:59 PM" },
  { title: "শনির রাত", banglaTitle: "প্রতি শনিবার রাত", day: "Every Saturday", time: "10:59 PM" },
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
          <div key={show.title} className="relative flex gap-4 overflow-hidden rounded-xl border border-(--color-bg-elevated) bg-(--color-bg-card) p-5">
            {show.channel === "afnansbee" && (
              <a
                href={AFNANS_BEE_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit AfnansBee on YouTube"
                className="absolute -right-7 top-5 flex w-28 rotate-45 items-center justify-center gap-1 bg-(--color-amber) py-1 text-[10px] font-bold uppercase tracking-wider text-white transition-colors hover:bg-(--color-amber-hover) md:-right-8 md:w-32 md:text-xs"
              >
                <RiYoutubeFill className="h-2.5 w-2.5 shrink-0" aria-hidden="true" />
                @Bee
              </a>
            )}
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
