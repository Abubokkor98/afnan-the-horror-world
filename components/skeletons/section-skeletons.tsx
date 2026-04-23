import { Skeleton } from "@/components/ui/skeleton"

export function MostWatchedSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-4 w-36" />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }, (_, index) => (
          <div key={index} className="overflow-hidden rounded-xl border border-(--color-bg-elevated)">
            <Skeleton className="aspect-video w-full" />
            <div className="space-y-2 p-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <div className="flex gap-2">
                <Skeleton className="h-5 w-16 rounded-full" />
                <Skeleton className="h-4 w-20" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function ChannelStatsSkeleton() {
  return (
    <div className="space-y-6 rounded-2xl bg-(--color-bg-card) p-8">
      <Skeleton className="h-8 w-64" />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => (
          <div key={index} className="rounded-xl border border-(--color-bg-elevated) p-6">
            <div className="space-y-2">
              <Skeleton className="h-6 w-6 rounded" />
              <Skeleton className="h-9 w-20" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function FreshDropsSkeleton() {
  return (
    <div className="space-y-6 rounded-2xl border border-dashed border-(--color-amber)/40 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Skeleton className="h-8 w-36" />
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>
        <Skeleton className="h-4 w-36" />
      </div>
      <Skeleton className="h-4 w-80" />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 6 }, (_, index) => (
          <Skeleton key={index} className="aspect-video w-full rounded-lg" />
        ))}
      </div>
    </div>
  )
}
