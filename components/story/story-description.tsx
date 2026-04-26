import { stripHashtags } from "@/lib/parse-description"

interface StoryDescriptionProps {
  description: string
}

export function StoryDescription({ description }: StoryDescriptionProps) {
  const cleanDescription = stripHashtags(description)

  if (!cleanDescription) return null

  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold">About This Story</h2>
      <div className="rounded-xl border border-(--color-bg-elevated) bg-(--color-bg-card) p-5">
        <p className="whitespace-pre-line wrap-break-word text-sm leading-relaxed text-(--color-text-body)">
          {cleanDescription}
        </p>
      </div>
    </section>
  )
}
