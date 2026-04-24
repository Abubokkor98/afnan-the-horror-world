import { RiYoutubeFill, RiFacebookFill, RiMailLine } from "@remixicon/react"

const YOUTUBE_URL = "https://youtube.com/@AfnanTheHorrorWorldBD"
const FACEBOOK_URL = "https://www.facebook.com/AfnanTheHorrorWorldBD"
const EMAIL = "afnanthehorrorworldbd@gmail.com"

interface SocialLink {
  href: string
  icon: React.ComponentType<{ className?: string }>
  label: string
  isExternal: boolean
}

const SOCIAL_LINKS: SocialLink[] = [
  { href: YOUTUBE_URL, icon: RiYoutubeFill, label: "YouTube", isExternal: true },
  { href: FACEBOOK_URL, icon: RiFacebookFill, label: "Facebook", isExternal: true },
  { href: `mailto:${EMAIL}`, icon: RiMailLine, label: "Email", isExternal: false },
]

export function FooterSocials() {
  return (
    <div className="flex gap-2.5">
      {SOCIAL_LINKS.map((social) => (
        <a
          key={social.label}
          href={social.href}
          {...(social.isExternal && { target: "_blank", rel: "noopener noreferrer" })}
          aria-label={social.label}
          className="flex h-9 w-9 items-center justify-center rounded-lg bg-(--color-bg-elevated) text-(--color-text-muted) transition-colors hover:bg-(--color-crimson) hover:text-white"
        >
          <social.icon className="h-4 w-4" />
        </a>
      ))}
    </div>
  )
}
