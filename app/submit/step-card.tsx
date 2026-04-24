interface StepCardProps {
  step: number
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
}

export function StepCard({ step, icon: Icon, title, description }: StepCardProps) {
  return (
    <div className="space-y-3 rounded-xl border border-(--color-bg-elevated) bg-(--color-bg-card) p-5">
      <div className="flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-(--color-crimson) text-sm font-bold text-white">
          {step}
        </span>
        <Icon className="h-5 w-5 text-(--color-crimson)" />
      </div>
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm text-(--color-text-muted)">{description}</p>
    </div>
  )
}
