import Link from "next/link"
import { RiGhostLine, RiHome4Line, RiPlayListLine } from "@remixicon/react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <main className="flex min-h-[calc(100svh-4rem)] flex-col items-center justify-center px-5 text-center">
      <RiGhostLine className="mb-5 h-8 w-8 text-(--color-crimson) animate-pulse md:mb-6 md:h-10 md:w-10" />

      <h1 className="text-xl font-semibold tracking-tight text-(--color-crimson) md:text-2xl">
        Page Not Found
      </h1>

      <p className="mt-2 max-w-xs text-sm leading-relaxed text-(--color-text-muted) md:mt-3 md:max-w-sm md:text-base">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row md:mt-8">
        <Button
          asChild
          size="sm"
          className="bg-(--color-crimson) text-white hover:bg-(--color-crimson-hover) md:h-10 md:px-5 md:text-sm"
        >
          <Link href="/">
            <RiHome4Line className="mr-1.5 h-4 w-4" />
            Go Home
          </Link>
        </Button>

        <Button
          asChild
          variant="outline"
          size="sm"
          className="border-(--color-bg-elevated) bg-transparent text-(--color-text-primary) hover:bg-(--color-bg-elevated) md:h-10 md:px-5 md:text-sm"
        >
          <Link href="/stories">
            <RiPlayListLine className="mr-1.5 h-4 w-4 text-(--color-text-muted)" />
            All Stories
          </Link>
        </Button>
      </div>
    </main>
  )
}
