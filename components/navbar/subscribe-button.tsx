import Link from "next/link"
import { RiYoutubeLine } from "@remixicon/react"

const YOUTUBE_SUBSCRIBE_URL = "https://youtube.com/@AfnanTheHorrorWorldBD?sub_confirmation=1"

export function SubscribeButton() {
  return (
    <Link
      href={YOUTUBE_SUBSCRIBE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="hidden items-center gap-1.5 rounded-lg bg-(--color-crimson) px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-(--color-crimson-hover) lg:inline-flex"
    >
      <RiYoutubeLine className="h-4 w-4" />
      Subscribe
    </Link>
  )
}
