import Image from "next/image"
import { RiFacebookFill, RiTwitterXFill, RiYoutubeFill, RiInstagramFill } from "@remixicon/react"

interface FounderCardProps {
  name: string
  role: string
  bio: string
  avatarUrl: string
}

const SOCIAL_ICONS = [RiFacebookFill, RiTwitterXFill, RiYoutubeFill, RiInstagramFill]

export function FounderCard({ name, role, bio, avatarUrl }: FounderCardProps) {
  return (
    <div className="flex flex-col items-center gap-6 rounded-2xl border border-(--color-crimson)/20 bg-gradient-to-b from-(--color-crimson)/5 to-(--color-bg-card) p-8 sm:flex-row sm:items-start">
      <Image src={avatarUrl} alt={name} width={120} height={120} unoptimized className="shrink-0 rounded-full border-2 border-(--color-crimson)/30" />
      <div className="space-y-2 text-center sm:text-left">
        <h3 className="text-xl font-semibold">{name}</h3>
        <p className="text-sm font-medium text-(--color-crimson)">{role}</p>
        <p className="text-sm leading-relaxed text-(--color-text-body)">{bio}</p>
        <div className="flex justify-center gap-2 pt-1 sm:justify-start">
          {SOCIAL_ICONS.map((Icon, i) => (
            <span key={i} className="rounded-full bg-(--color-bg-elevated) p-2 text-(--color-text-subtle) transition-colors hover:text-(--color-crimson)">
              <Icon className="h-3.5 w-3.5" />
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
