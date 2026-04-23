import { Skeleton } from "@/components/ui/skeleton"
import { VideoCardSkeleton } from "@/components/skeletons/video-card-skeleton"

export function HeroSkeleton() {
  return (
    <div className="relative flex min-h-svh items-center bg-(--color-bg-page) max-md:min-h-[90vh]">
      <div className="mx-auto max-w-7xl px-4 py-20">
        <div className="max-w-2xl space-y-6">
          <Skeleton className="h-8 w-48 rounded-full" />
          <Skeleton className="h-16 w-96" />
          <Skeleton className="h-5 w-80" />
          <div className="flex gap-4 pt-2">
            <Skeleton className="h-11 w-44 rounded-md" />
            <Skeleton className="h-11 w-40 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function CategoryRowSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-4 w-20" />
      </div>
      <div className="flex gap-4 overflow-hidden">
        {Array.from({ length: 4 }, (_, index) => (
          <div key={index} className="w-64 shrink-0 sm:w-72">
            <VideoCardSkeleton />
          </div>
        ))}
      </div>
    </div>
  )
}

export function CategoryGridSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-52" />
        <Skeleton className="h-4 w-32" />
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => (
          <div key={index} className="overflow-hidden rounded-xl border border-(--color-bg-elevated)">
            <Skeleton className="aspect-video w-full" />
            <div className="space-y-2 p-4">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function FeaturedStorySkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-8 w-40" />
      <div className="overflow-hidden rounded-2xl border border-(--color-bg-elevated) bg-(--color-bg-card)">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <Skeleton className="aspect-video lg:min-h-[360px]" />
          <div className="space-y-4 p-6 lg:p-8">
            <div className="flex gap-2">
              <Skeleton className="h-5 w-24 rounded-full" />
              <Skeleton className="h-5 w-20 rounded-full" />
            </div>
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-11 w-44 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  )
}
