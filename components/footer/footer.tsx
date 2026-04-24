import Link from "next/link"
import type { Playlist } from "@/types/youtube"
import { FooterCategories } from "@/components/footer/footer-categories"
import { FooterSocials } from "@/components/footer/footer-socials"
import { Separator } from "@/components/ui/separator"

const CURRENT_YEAR = new Date().getFullYear()

const SITE_LINKS = [
  { href: "/stories", label: "All Stories" },
  { href: "/submit", label: "Submit Story" },
  { href: "/about", label: "About" },
] as const

interface FooterProps {
  playlists: Playlist[]
}

export function Footer({ playlists }: FooterProps) {
  return (
    <footer className="border-t border-(--color-border) bg-(--color-bg-navbar)">
      <div className="mx-auto max-w-7xl px-4 py-12">
        {/* Brand — full width on mobile/tablet, first column on desktop */}
        <div className="text-center lg:hidden">
          <Link href="/" translate="no">
            <span className="hero-title text-lg tracking-wide text-(--color-crimson)">
              Afnan&apos;s Horror World
            </span>
          </Link>
          <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-(--color-text-muted)">
            বাংলাদেশের সবচেয়ে জনপ্রিয় হরর চ্যানেল — আপনার পাড়া-মহল্লা
            থেকে বিশ্বের প্রতিটি কোণ থেকে সত্য ভয়ের ঘটনা।
          </p>
          <div className="mt-4 flex justify-center">
            <FooterSocials />
          </div>
        </div>

        <Separator className="my-8 bg-(--color-border) lg:hidden" />

        {/* Grid: 1-col mobile center | 3-col tablet | 4-col desktop */}
        <div className="grid grid-cols-1 gap-10 text-center md:grid-cols-3 md:text-left lg:grid-cols-4">
          {/* Brand — desktop only (hidden on mobile/tablet, shown above instead) */}
          <div className="hidden space-y-4 lg:block">
            <Link href="/" translate="no">
              <span className="hero-title text-lg tracking-wide text-(--color-crimson)">
                Afnan&apos;s Horror World
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-(--color-text-muted)">
              বাংলাদেশের সবচেয়ে জনপ্রিয় হরর চ্যানেল — আপনার পাড়া-মহল্লা
              থেকে বিশ্বের প্রতিটি কোণ থেকে সত্য ভয়ের ঘটনা।
            </p>
            <FooterSocials />
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-(--color-text-subtle)">Pages</h3>
            <nav className="flex flex-col items-center gap-2.5 md:items-start" aria-label="Footer navigation">
              {SITE_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="w-fit text-sm text-(--color-text-muted) transition-colors hover:text-(--color-crimson)"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Categories */}
          <FooterCategories playlists={playlists} />

          {/* CTA */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-(--color-text-subtle)">
              Have a story?
            </h3>
            <p className="mx-auto max-w-xs text-sm leading-relaxed text-(--color-text-muted) md:mx-0">
              আপনার সত্য ভয়ের ঘটনা আমাদের পাঠান — আফনানের কণ্ঠে লক্ষ
              শ্রোতার কাছে পৌঁছে যাক আপনার গল্প।
            </p>
            <Link
              href="/submit"
              className="inline-block rounded-lg bg-(--color-crimson) px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-(--color-crimson-hover)"
            >
              Submit Story →
            </Link>
          </div>
        </div>

        <Separator className="my-8 bg-(--color-border)" />

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
          <p className="text-xs text-(--color-text-subtle)">
            © {CURRENT_YEAR} Afnan&apos;s Horror World. All rights reserved.
          </p>
          <p className="text-xs text-(--color-text-subtle)">
            Made with 🖤 for horror fans
          </p>
        </div>
      </div>
    </footer>
  )
}
