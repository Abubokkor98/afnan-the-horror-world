import { VideoGridSkeleton } from "@/components/skeletons/video-grid-skeleton"
import { Skeleton } from "@/components/ui/skeleton"

export default function CategoryLoading() {
  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-8">
      <Skeleton className="h-9 w-48" />
      <Skeleton className="h-5 w-72" />
      <VideoGridSkeleton count={8} />
    </div>
  )
}
