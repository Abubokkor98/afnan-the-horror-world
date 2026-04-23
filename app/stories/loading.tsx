import { VideoGridSkeleton } from "@/components/skeletons/video-grid-skeleton"
import { Skeleton } from "@/components/ui/skeleton"

export default function StoriesLoading() {
  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-8">
      <div className="space-y-2">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-5 w-32" />
      </div>
      {/* Filter bar skeleton */}
      <div className="flex gap-2">
        {Array.from({ length: 5 }, (_, i) => (
          <Skeleton key={i} className="h-7 w-20 rounded-full" />
        ))}
      </div>
      <VideoGridSkeleton count={12} />
    </div>
  )
}
