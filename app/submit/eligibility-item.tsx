import { RiCheckLine, RiCloseLine } from "@remixicon/react"

interface EligibilityItemProps {
  accepted: boolean
  text: string
}

export function EligibilityItem({ accepted, text }: EligibilityItemProps) {
  const Icon = accepted ? RiCheckLine : RiCloseLine
  const colorClass = accepted ? "text-green-500" : "text-(--color-crimson)"
  const bgClass = accepted ? "bg-green-500/10" : "bg-(--color-crimson)/10"

  return (
    <div className={`flex items-center gap-3 rounded-lg px-4 py-3 ${bgClass}`}>
      <Icon className={`h-5 w-5 shrink-0 ${colorClass}`} />
      <span className="text-sm font-medium text-(--color-text-primary)">{text}</span>
    </div>
  )
}
