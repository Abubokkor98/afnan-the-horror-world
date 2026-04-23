import { Skeleton } from "@/components/ui/skeleton"
import { VideoGridSkeleton } from "@/components/skeletons/video-grid-skeleton"

export default function SearchLoading() {
  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-8">
      {/* Search bar skeleton */}
      <Skeleton className="h-12 w-full rounded-xl" />
      {/* Category chips skeleton */}
      <div className="flex gap-2">
        {Array.from({ length: 5 }, (_, i) => (
          <Skeleton key={i} className="h-7 w-20 rounded-full" />
        ))}
      </div>
      {/* Results count skeleton */}
      <Skeleton className="h-5 w-48" />
      <VideoGridSkeleton count={8} />
    </div>
  )
}
