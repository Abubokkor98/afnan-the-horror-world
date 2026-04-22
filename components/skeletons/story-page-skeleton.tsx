import { Skeleton } from "@/components/ui/skeleton"
import { VideoCardSkeleton } from "@/components/skeletons/video-card-skeleton"

export function StoryPageSkeleton() {
  return (
    <main className="mx-auto max-w-6xl space-y-8 px-4 py-8">
      {/* Video player */}
      <Skeleton className="aspect-video w-full rounded-xl" />

      {/* Title and badges */}
      <div className="space-y-3">
        <Skeleton className="h-8 w-3/4" />
        <div className="flex gap-2">
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-5 w-24 rounded-full" />
        </div>
        <Skeleton className="h-4 w-48" />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>

      {/* Related stories */}
      <div className="space-y-4 pt-8">
        <Skeleton className="h-7 w-40" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }, (_, index) => (
            <VideoCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </main>
  )
}
