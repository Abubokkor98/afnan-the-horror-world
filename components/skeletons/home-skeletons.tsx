import { Skeleton } from "@/components/ui/skeleton"
import { VideoCardSkeleton } from "@/components/skeletons/video-card-skeleton"

export function HeroSkeleton() {
  return (
    <div className="relative flex min-h-[calc(100svh-5rem)] items-center bg-(--color-bg-page)">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center px-4 py-8 sm:py-12 lg:px-8">
        <div className="flex w-full max-w-4xl flex-col items-center space-y-5 sm:space-y-6">
          {/* Badge row */}
          <div className="flex items-center gap-4">
            <Skeleton className="h-7 w-36 rounded-full" />
            <Skeleton className="hidden h-px w-8 sm:block" />
            <Skeleton className="h-4 w-44" />
          </div>

          {/* Title — 3 lines like the actual hero */}
          <div className="flex flex-col items-center gap-2 sm:gap-3">
            <Skeleton className="h-12 w-64 sm:h-16 sm:w-80 md:h-20 md:w-96" />
            <Skeleton className="h-12 w-72 sm:h-16 sm:w-96 md:h-20 md:w-md" />
            <Skeleton className="h-12 w-52 sm:h-16 sm:w-64 md:h-20 md:w-80" />
          </div>

          {/* Description paragraph */}
          <div className="flex flex-col items-center gap-1.5">
            <Skeleton className="h-5 w-80 sm:w-md" />
            <Skeleton className="h-5 w-64 sm:w-96" />
          </div>

          {/* CTA buttons */}
          <div className="flex gap-3 pt-2 sm:gap-4 sm:pt-4">
            <Skeleton className="h-10 w-44 rounded-lg" />
            <Skeleton className="h-10 w-40 rounded-lg" />
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

