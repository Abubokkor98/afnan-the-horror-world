import { RiMailSendLine } from "@remixicon/react"
import { Button } from "@/components/ui/button"
import { CONTACT_EMAIL } from "@/lib/constants"

const MAILTO_SUBJECT = encodeURIComponent("ভয়ের ঘটনা — Afnan The Horror World")

export function SubmitEmailCta() {
  return (
    <section className="space-y-4 rounded-2xl border border-(--color-bg-elevated) bg-(--color-bg-card) p-8 text-center">
      <h2 className="text-2xl font-semibold">প্রস্তুত তো?</h2>
      <p className="text-sm text-(--color-text-body)">
        আপনার ঘটনা ইমেইলে পাঠান - আমরা প্রতিটি ঘটনা মনোযোগ দিয়ে পড়ি।
      </p>
      <Button
        asChild
        size="lg"
        className="bg-(--color-crimson) text-white hover:bg-(--color-crimson-hover)"
      >
        <a href={`mailto:${CONTACT_EMAIL}?subject=${MAILTO_SUBJECT}`}>
          <RiMailSendLine className="h-5 w-5" />
          ইমেইলে ঘটনা পাঠান
        </a>
      </Button>
      <p className="text-sm text-(--color-text-subtle)">{CONTACT_EMAIL}</p>
    </section>
  )
}
