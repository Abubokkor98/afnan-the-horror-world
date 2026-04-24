import Image from "next/image"
import { RiFacebookFill, RiTwitterXFill, RiYoutubeFill, RiInstagramFill } from "@remixicon/react"

interface TeamCardProps {
  name: string
  role: string
  avatarUrl: string
}

const SOCIAL_ICONS = [RiFacebookFill, RiTwitterXFill, RiYoutubeFill, RiInstagramFill]

export function TeamCard({ name, role, avatarUrl }: TeamCardProps) {
  return (
    <div className="flex flex-col items-center space-y-3 rounded-xl border border-(--color-bg-elevated) bg-(--color-bg-card) p-6 text-center">
      <Image src={avatarUrl} alt={name} width={80} height={80} unoptimized className="rounded-full" />
      <div className="space-y-1">
        <h3 className="text-sm font-semibold">{name}</h3>
        <p className="text-xs text-(--color-text-muted)">{role}</p>
      </div>
      <div className="flex gap-2">
        {SOCIAL_ICONS.map((Icon, i) => (
          <span key={i} className="rounded-full bg-(--color-bg-elevated) p-1.5 text-(--color-text-subtle) transition-colors hover:text-(--color-crimson)">
            <Icon className="h-3 w-3" />
          </span>
        ))}
      </div>
    </div>
  )
}
