import Link from "next/link"
import { RiMailSendLine, RiSearchEyeLine, RiMicFill } from "@remixicon/react"
import { Button } from "@/components/ui/button"

const SUBMISSION_STEPS = [
  {
    icon: RiMailSendLine,
    title: "Send your story",
    description: "Email your true horror experience",
  },
  {
    icon: RiSearchEyeLine,
    title: "Afnan reviews it",
    description: "Every story is verified personally",
  },
  {
    icon: RiMicFill,
    title: "Gets narrated",
    description: "If selected, Afnan narrates it himself",
  },
] as const

const SUBMISSION_GUIDELINES = [
  "Story must be real and true",
  "Can be from anywhere in the world",
  "Any language accepted (Bangla, English, etc.)",
  "Include your name, location, and when it happened",
] as const

export function SubmitCta() {
  return (
    <section className="grain-overlay relative overflow-hidden rounded-2xl bg-(--color-bg-card)">
      <div className="absolute inset-0 bg-gradient-to-br from-(--color-crimson)/5 via-transparent to-(--color-amber)/5" />
      <div className="relative space-y-10 px-6 py-16 sm:px-12">
        {/* Headline */}
        <div className="space-y-3 text-center">
          <h2 className="text-3xl font-semibold sm:text-4xl">
            Could Your Story Be Here?
          </h2>
          <p className="mx-auto max-w-md text-(--color-text-muted)">
            Share your real horror experience with our community.
          </p>
        </div>

        {/* 3-step process */}
        <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-3">
          {SUBMISSION_STEPS.map((step) => (
            <div key={step.title} className="space-y-3 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-(--color-crimson)/10">
                <step.icon className="h-7 w-7 text-(--color-crimson)" />
              </div>
              <h3 className="text-sm font-semibold">{step.title}</h3>
              <p className="text-xs text-(--color-text-muted)">{step.description}</p>
            </div>
          ))}
        </div>

        {/* Guidelines */}
        <div className="mx-auto max-w-md rounded-xl border border-(--color-bg-elevated) bg-(--color-bg-page)/50 p-5">
          <h3 className="mb-3 text-center text-sm font-semibold">Submission Guidelines</h3>
          <ul className="space-y-2">
            {SUBMISSION_GUIDELINES.map((guideline) => (
              <li key={guideline} className="flex items-start gap-2 text-sm text-(--color-text-muted)">
                <span className="mt-0.5 text-(--color-crimson)">✓</span>
                {guideline}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA + Social proof */}
        <div className="space-y-3 text-center">
          <Button asChild size="lg" className="bg-(--color-crimson) text-white hover:bg-(--color-crimson-hover)">
            <Link href="/submit">Submit Your Story</Link>
          </Button>
          <p className="text-xs text-(--color-text-subtle)">
            50+ stories submitted per month on average
          </p>
        </div>
      </div>
    </section>
  )
}
