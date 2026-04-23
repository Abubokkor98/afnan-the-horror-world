import { VideoCardSkeleton } from "@/components/skeletons/video-card-skeleton"

interface VideoGridSkeletonProps {
  count?: number
}

export function VideoGridSkeleton({ count = 8 }: VideoGridSkeletonProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }, (_, index) => (
        <VideoCardSkeleton key={index} />
      ))}
    </div>
  )
}
