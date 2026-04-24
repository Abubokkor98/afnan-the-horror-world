"use client"

import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { RiMenuLine } from "@remixicon/react"
import type { Playlist } from "@/types/youtube"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { MobileSearch } from "@/components/navbar/mobile-nav/mobile-search"
import { MobileLink } from "@/components/navbar/mobile-nav/mobile-link"
import { BrowseAccordion } from "@/components/navbar/mobile-nav/browse-accordion"

interface MobileMenuProps {
  playlists: Playlist[]
}

export function MobileMenu({ playlists }: MobileMenuProps) {
  const [open, setOpen] = useState(false)
  const currentPath = usePathname()
  const router = useRouter()

  function handleClose() {
    setOpen(false)
  }

  function handleSearch(query: string) {
    router.push(`/search?q=${encodeURIComponent(query)}`)
    setOpen(false)
  }

  return (
    <div className="lg:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button aria-label="Open menu" className="flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-(--color-bg-elevated)">
            <RiMenuLine className="h-5 w-5 text-(--color-text-primary)" />
          </button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="w-72 border-l border-(--color-border) bg-(--color-bg-navbar)"
        >
          <SheetHeader>
            <SheetTitle className="text-(--color-text-primary)">Menu</SheetTitle>
            <SheetDescription className="sr-only">Site navigation menu</SheetDescription>
          </SheetHeader>

          <MobileSearch onSubmit={handleSearch} />

          <Separator className="my-4 bg-(--color-border)" />

          <nav className="flex flex-col gap-1 px-4" aria-label="Mobile navigation">
            <MobileLink href="/stories" label="Stories" active={currentPath === "/stories"} onClick={handleClose} />
            <BrowseAccordion playlists={playlists} currentPath={currentPath} onNavigate={handleClose} />
            <MobileLink href="/submit" label="Submit Story" active={currentPath === "/submit"} onClick={handleClose} />
            <MobileLink href="/about" label="About" active={currentPath === "/about"} onClick={handleClose} />
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  )
}
