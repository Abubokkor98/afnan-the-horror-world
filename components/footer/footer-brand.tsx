import Link from "next/link"
import { FooterSocials } from "@/components/footer/footer-socials"

interface FooterBrandProps {
  centered?: boolean
}

export function FooterBrand({ centered = false }: FooterBrandProps) {
  return (
    <>
      <Link href="/" translate="no">
        <span className="hero-title text-lg tracking-wide text-(--color-crimson)">
          Afnan The Horror World
        </span>
      </Link>
      <p
        lang="bn"
        className={`text-sm leading-relaxed text-(--color-text-muted) ${centered ? "mx-auto mt-3 max-w-sm" : ""}`}
      >
        বাংলাদেশের সবচেয়ে জনপ্রিয় হরর চ্যানেল - আপনার পাড়া-মহল্লা থেকে
        বিশ্বের প্রতিটি কোণ থেকে সত্য ভয়ের ঘটনা।
      </p>
      {centered ? (
        <div className="mt-4 flex justify-center">
          <FooterSocials />
        </div>
      ) : (
        <FooterSocials />
      )}
    </>
  )
}
