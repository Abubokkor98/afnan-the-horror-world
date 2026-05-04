import type { ComponentType } from "react"
import {
  RiYoutubeFill,
  RiFacebookFill,
  RiGroupLine,
  RiWhatsappFill,
  RiMailLine,
} from "@remixicon/react"
import {
  CONTACT_EMAIL,
  YOUTUBE_URL,
  FACEBOOK_PAGE,
  FACEBOOK_GROUP,
  WHATSAPP_NUMBER,
} from "@/lib/constants"

interface SocialLink {
  href: string
  icon: ComponentType<{ className?: string }>
  label: string
  isExternal: boolean
  className: string
}

const SOCIAL_LINKS: SocialLink[] = [
  {
    href: YOUTUBE_URL,
    icon: RiYoutubeFill,
    label: "YouTube",
    isExternal: true,
    className: "bg-(--color-crimson)/10 text-(--color-crimson) hover:bg-(--color-crimson)/20",
  },
  {
    href: FACEBOOK_PAGE,
    icon: RiFacebookFill,
    label: "Facebook",
    isExternal: true,
    className: "bg-(--color-brand-facebook)/10 text-(--color-brand-facebook) hover:bg-(--color-brand-facebook)/20",
  },
  {
    href: FACEBOOK_GROUP,
    icon: RiGroupLine,
    label: "Facebook Group",
    isExternal: true,
    className: "bg-(--color-brand-facebook)/10 text-(--color-brand-facebook) hover:bg-(--color-brand-facebook)/20",
  },
  {
    href: `https://wa.me/${WHATSAPP_NUMBER}`,
    icon: RiWhatsappFill,
    label: "WhatsApp",
    isExternal: true,
    className: "bg-(--color-brand-whatsapp)/10 text-(--color-brand-whatsapp) hover:bg-(--color-brand-whatsapp)/20",
  },
  {
    href: `mailto:${CONTACT_EMAIL}`,
    icon: RiMailLine,
    label: "Email",
    isExternal: false,
    className: "bg-(--color-crimson)/10 text-(--color-crimson) hover:bg-(--color-crimson)/20",
  },
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
          className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${social.className}`}
        >
          <social.icon className="h-4 w-4" />
        </a>
      ))}
    </div>
  )
}


