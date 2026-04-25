import { Badge } from "@/components/ui/badge"

interface CategoryBadgeProps {
  category: string
}

export function CategoryBadge({ category }: CategoryBadgeProps) {
  if (!category) return null

  return (
    <Badge
      variant="secondary"
      className="bg-(--color-amber)/15 text-(--color-amber) hover:bg-(--color-amber)/25 border-none text-xs font-medium"
    >
      {category}
    </Badge>
  )
}
