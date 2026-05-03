import { Skeleton } from "@/components/ui/skeleton"
import { StoryRelatedSkeleton } from "@/components/skeletons/story-related-skeleton"

export function StoryPageSkeleton() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Main content */}
        <div className="space-y-8 lg:col-span-2">
          <Skeleton className="aspect-video w-full rounded-xl" />
          <div className="space-y-3">
            <Skeleton className="h-8 w-3/4" />
            <div className="flex gap-2">
              <Skeleton className="h-5 w-20 rounded-full" />
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-5 w-20" />
            </div>
          </div>
          {/* Share buttons */}
          <div className="flex gap-2">
            <Skeleton className="h-8 w-24 rounded-lg" />
            <Skeleton className="h-8 w-24 rounded-lg" />
            <Skeleton className="h-8 w-24 rounded-lg" />
          </div>
        </div>

        {/* Sidebar + CTA */}
        <div className="space-y-8">
          <Skeleton className="h-52 w-full rounded-xl" />
          <Skeleton className="h-10 w-full rounded-lg" />
          <Skeleton className="h-44 w-full rounded-xl" />
        </div>
      </div>

      <StoryRelatedSkeleton />
    </main>
  )
}
