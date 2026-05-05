import type { ComponentType } from "react"
import {
  RiMailSendLine,
  RiFacebookFill,
  RiWhatsappFill,
  RiGroupLine,
} from "@remixicon/react"
import {
  CONTACT_EMAIL,
  WHATSAPP_NUMBER,
  FACEBOOK_PAGE,
  FACEBOOK_GROUP,
} from "@/lib/constants"

interface ContactLink {
  href: string
  icon: ComponentType<{ className?: string }>
  label: string
  className: string
}

const CONTACT_LINKS: ContactLink[] = [
  {
    href: `mailto:${CONTACT_EMAIL}`,
    icon: RiMailSendLine,
    label: "Email",
    className:
      "bg-(--color-crimson)/10 text-(--color-crimson) hover:bg-(--color-crimson)/20",
  },
  {
    href: FACEBOOK_PAGE,
    icon: RiFacebookFill,
    label: "FB Page",
    className:
      "bg-(--color-brand-facebook)/10 text-(--color-brand-facebook) hover:bg-(--color-brand-facebook)/20",
  },
  {
    href: FACEBOOK_GROUP,
    icon: RiGroupLine,
    label: "FB Group",
    className:
      "bg-(--color-brand-facebook)/10 text-(--color-brand-facebook) hover:bg-(--color-brand-facebook)/20",
  },
  {
    href: `https://wa.me/${WHATSAPP_NUMBER}`,
    icon: RiWhatsappFill,
    label: "WhatsApp",
    className:
      "bg-(--color-brand-whatsapp)/10 text-(--color-brand-whatsapp) hover:bg-(--color-brand-whatsapp)/20",
  },
]

export function StorySubmitCta() {
  return (
    <section className="space-y-4 rounded-xl border border-(--color-bg-elevated) bg-(--color-bg-card) p-5">
      <h3 className="text-sm font-semibold">Share Your Story</h3>
        <p lang="bn" className="text-sm leading-relaxed text-(--color-text-body)">
          আপনার ঘটনার স্থান, সময়, সংশ্লিষ্ট ব্যক্তির নাম এবং পুরো ঘটনা রেকর্ড
          করে বা লিখে পাঠাতে পারেন। মোবাইল নম্বর দিতে ভুলবেন না। সত্যতা
          যাচাইয়ের পর প্রচারযোগ্য মনে হলে প্রচার করা হবে।
        </p>
      <div className="flex flex-wrap gap-2">
          {CONTACT_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors sm:gap-2 sm:px-4 sm:py-2 sm:text-sm ${link.className}`}
            >
              <link.icon className="h-4 w-4 shrink-0" />
              {link.label}
            </a>
          ))}
      </div>
    </section>
  )
}
