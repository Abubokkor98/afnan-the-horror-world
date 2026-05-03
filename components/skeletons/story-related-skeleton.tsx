import { Skeleton } from "@/components/ui/skeleton"
import { VideoCardSkeleton } from "@/components/skeletons/video-card-skeleton"

export function StoryRelatedSkeleton() {
  return (
    <div className="mt-16 space-y-4 border-t border-(--color-border) pt-12">
      <Skeleton className="h-7 w-64" />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => (
          <VideoCardSkeleton key={index} />
        ))}
      </div>
    </div>
  )
}
