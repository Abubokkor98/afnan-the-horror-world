import { RiMailLine } from "@remixicon/react"
import { CONTACT_EMAIL } from "@/lib/constants"

export function AboutContact() {
  return (
    <section className="space-y-4 text-center">
      <h2 className="text-2xl font-semibold">যোগাযোগ</h2>
      <p className="text-sm text-(--color-text-muted)">
        For collaborations, press, or partnerships
      </p>
      <a
        href={`mailto:${CONTACT_EMAIL}`}
        className="inline-flex items-center gap-2 rounded-lg bg-(--color-crimson) px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-(--color-crimson-hover)"
      >
        <RiMailLine className="h-4 w-4" />
        {CONTACT_EMAIL}
      </a>
    </section>
  )
}
