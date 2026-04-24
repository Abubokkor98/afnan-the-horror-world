import Link from "next/link"
import { RiArrowDownSLine } from "@remixicon/react"
import type { Playlist } from "@/types/youtube"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface BrowseAccordionProps {
  playlists: Playlist[]
  currentPath: string
  onNavigate: () => void
}

export function BrowseAccordion({ playlists, currentPath, onNavigate }: BrowseAccordionProps) {
  const isActive = currentPath.startsWith("/category")

  return (
    <Collapsible>
      <CollapsibleTrigger
        className={`flex w-full items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
          isActive
            ? "bg-(--color-bg-elevated) text-(--color-crimson)"
            : "text-(--color-text-muted) hover:bg-(--color-bg-elevated) hover:text-(--color-text-primary)"
        }`}
      >
        Browse Categories
        <RiArrowDownSLine className="h-4 w-4 transition-transform duration-200 [[data-state=open]>&]:rotate-180" />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="ml-3 flex flex-col gap-0.5 border-l border-(--color-bg-elevated) pl-3 pt-1">
          {playlists.map((playlist) => {
            const categoryPath = `/category/${playlist.slug}`
            const isCurrent = currentPath === categoryPath

            return (
              <Link
                key={playlist.id}
                href={categoryPath}
                onClick={onNavigate}
                {...(isCurrent && { "aria-current": "page" as const })}
                className={`rounded-md px-3 py-2 text-sm transition-colors ${
                  isCurrent
                    ? "bg-(--color-bg-elevated) text-(--color-crimson)"
                    : "text-(--color-text-subtle) hover:bg-(--color-bg-elevated) hover:text-(--color-text-primary)"
                }`}
              >
                {playlist.title}
              </Link>
            )
          })}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
