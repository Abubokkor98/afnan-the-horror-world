import Link from "next/link"
import { RiYoutubeLine } from "@remixicon/react"
import { MAIN_CHANNEL_URL } from "@/config/channel-urls"

export function SubscribeButton() {
  return (
    <Link
      href={MAIN_CHANNEL_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="hidden items-center gap-1.5 rounded-lg bg-(--color-crimson) px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-(--color-crimson-hover) lg:inline-flex"
    >
      <RiYoutubeLine className="h-4 w-4" />
      Subscribe
    </Link>
  )
}
