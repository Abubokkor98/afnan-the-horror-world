import { Suspense } from "react"
import { SectionErrorBoundary } from "@/components/section-error-boundary"
import { HeroSection } from "@/app/sections/hero-section"
import { LatestStoriesSection } from "@/app/sections/latest-stories-section"
import { CategoryGridSection } from "@/app/sections/category-grid-section"
import { FeaturedSection } from "@/app/sections/featured-section"
import { MostWatchedSection } from "@/app/sections/most-watched-section"
import { ChannelStatsSection } from "@/app/sections/channel-stats-section"
import { FreshDropsSection } from "@/app/sections/fresh-drops-section"
import { SubmitCta } from "@/components/submit-cta"
import {
  HeroSkeleton,
  CategoryRowSkeleton,
  CategoryGridSkeleton,
  FeaturedStorySkeleton,
} from "@/components/skeletons/home-skeletons"
import {
  MostWatchedSkeleton,
  ChannelStatsSkeleton,
  FreshDropsSkeleton,
} from "@/components/skeletons/section-skeletons"

export default function HomePage() {
  return (
    <>
      {/* 1. Hero — full viewport cinematic intro */}
      <Suspense fallback={<HeroSkeleton />}>
        <SectionErrorBoundary name="hero">
          <HeroSection />
        </SectionErrorBoundary>
      </Suspense>

      {/* Remaining sections in a contained layout */}
      <div className="mx-auto max-w-7xl space-y-20 px-4 py-16">
        {/* 2. Latest Stories — horizontal scroll row */}
        <Suspense fallback={<CategoryRowSkeleton />}>
          <SectionErrorBoundary name="latest stories">
            <LatestStoriesSection />
          </SectionErrorBoundary>
        </Suspense>

        {/* 3. Browse by Category — grid of playlist cards */}
        <Suspense fallback={<CategoryGridSkeleton />}>
          <SectionErrorBoundary name="categories">
            <CategoryGridSection />
          </SectionErrorBoundary>
        </Suspense>

        {/* 4. Featured Story — Editor's Pick cinematic layout */}
        <Suspense fallback={<FeaturedStorySkeleton />}>
          <SectionErrorBoundary name="featured story">
            <FeaturedSection />
          </SectionErrorBoundary>
        </Suspense>

        {/* 5. Most Watched — top 6 with rank badges */}
        <Suspense fallback={<MostWatchedSkeleton />}>
          <SectionErrorBoundary name="most watched stories">
            <MostWatchedSection />
          </SectionErrorBoundary>
        </Suspense>

        {/* 6. Channel Stats — subscribers, videos, views */}
        <Suspense fallback={<ChannelStatsSkeleton />}>
          <SectionErrorBoundary name="channel stats">
            <ChannelStatsSection />
          </SectionErrorBoundary>
        </Suspense>

        {/* 7. Fresh Drops — uncategorized (only if any exist) */}
        <Suspense fallback={<FreshDropsSkeleton />}>
          <SectionErrorBoundary name="fresh drops">
            <FreshDropsSection />
          </SectionErrorBoundary>
        </Suspense>

        {/* 8. Submit CTA — static, no data needed */}
        <SubmitCta />
      </div>
    </>
  )
}
