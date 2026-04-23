import { Skeleton } from "@/components/ui/skeleton"

export function VideoCardSkeleton() {
  return (
    <div className="space-y-2">
      <Skeleton className="aspect-video w-full rounded-lg" />
      <div className="flex items-start gap-2">
        <div className="min-w-0 flex-1 space-y-1.5 px-1 pt-1">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
        <Skeleton className="mt-2 h-5 w-16 rounded-full" />
      </div>
    </div>
  )
}
