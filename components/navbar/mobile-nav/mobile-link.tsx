import Link from "next/link"

interface MobileLinkProps {
  href: string
  label: string
  active: boolean
  onClick: () => void
}

export function MobileLink({ href, label, active, onClick }: MobileLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      {...(active && { "aria-current": "page" as const })}
      className={`rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
        active
          ? "bg-(--color-bg-elevated) text-(--color-crimson)"
          : "text-(--color-text-muted) hover:bg-(--color-bg-elevated) hover:text-(--color-text-primary)"
      }`}
    >
      {label}
    </Link>
  )
}
