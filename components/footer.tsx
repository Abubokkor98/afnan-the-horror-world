import Link from "next/link"
import { RiYoutubeFill, RiFacebookFill, RiMailLine } from "@remixicon/react"
import { Separator } from "@/components/ui/separator"
import type { Playlist } from "@/types/youtube"

interface FooterProps {
  playlists: Playlist[]
}

export function Footer({ playlists }: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-(--color-border) bg-(--color-bg-navbar)">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-3">
            <span className="hero-title text-lg text-(--color-crimson)">
              Afnan&apos;s Horror World
            </span>
            <p className="text-sm leading-relaxed text-(--color-text-muted)">
              Real horror stories narrated by Afnan — from your neighbourhood,
              from every corner of the world.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Navigation</h3>
            <nav className="flex flex-col gap-2">
              <FooterLink href="/" label="Home" />
              <FooterLink href="/stories" label="All Stories" />
              <FooterLink href="/submit" label="Submit Story" />
              <FooterLink href="/about" label="About" />
            </nav>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Categories</h3>
            <nav className="flex flex-col gap-2">
              {playlists.slice(0, 6).map((playlist) => (
                <FooterLink
                  key={playlist.id}
                  href={`/category/${playlist.slug}`}
                  label={playlist.title}
                />
              ))}
            </nav>
          </div>

          {/* Social */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Connect</h3>
            <div className="flex gap-3">
              <SocialIcon href="https://youtube.com/@AfnanTheHorrorWorldBD" icon={RiYoutubeFill} label="YouTube" />
              <SocialIcon href="https://facebook.com" icon={RiFacebookFill} label="Facebook" />
              <SocialIcon href="mailto:contact@example.com" icon={RiMailLine} label="Email" />
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-(--color-border)" />

        <p className="text-center text-xs text-(--color-text-subtle)">
          © {currentYear} Afnan&apos;s Horror World. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="text-sm text-(--color-text-muted) transition-colors hover:text-(--color-text-primary)"
    >
      {label}
    </Link>
  )
}

function SocialIcon({
  href,
  icon: Icon,
  label,
}: {
  href: string
  icon: React.ComponentType<{ className?: string }>
  label: string
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="rounded-full bg-(--color-bg-elevated) p-2.5 transition-colors hover:bg-(--color-crimson)"
    >
      <Icon className="h-4 w-4 text-(--color-text-primary)" />
    </a>
  )
}
