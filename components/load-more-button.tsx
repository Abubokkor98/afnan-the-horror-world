import { Button } from "@/components/ui/button"

interface LoadMoreButtonProps {
  remaining: number
  onClick: () => void
}

export function LoadMoreButton({ remaining, onClick }: LoadMoreButtonProps) {
  return (
    <div className="pt-4 text-center">
      <Button
        variant="outline"
        onClick={onClick}
        className="border-(--color-bg-elevated) bg-(--color-bg-card) px-6 text-(--color-text-primary) hover:border-(--color-crimson) hover:bg-(--color-bg-card) hover:text-(--color-crimson)"
      >
        Load More ({remaining} remaining)
      </Button>
    </div>
  )
}
