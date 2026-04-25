import { Suspense } from "react"
import { SectionErrorBoundary } from "@/components/section-error/section-error-boundary"
import { HeroSection } from "@/components/sections/hero-section"
import { LatestStoriesSection } from "@/components/sections/latest-stories-section"
import { CategoryGridSection } from "@/components/sections/category-grid-section"
import { FeaturedSection } from "@/components/sections/featured-section"
import { MostWatchedSection } from "@/components/sections/most-watched-section"
import { ChannelStatsSection } from "@/components/sections/channel-stats-section"
import { FreshDropsSection } from "@/components/sections/fresh-drops-section"
import { SubmitCta } from "@/components/submit/submit-cta"
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
      <SectionErrorBoundary name="hero">
        <Suspense fallback={<HeroSkeleton />}>
          <HeroSection />
        </Suspense>
      </SectionErrorBoundary>

      {/* Remaining sections in a contained layout */}
      <div className="mx-auto max-w-7xl space-y-20 px-4 py-16">
        {/* 2. Latest Stories — horizontal scroll row */}
        <SectionErrorBoundary name="latest stories">
          <Suspense fallback={<CategoryRowSkeleton />}>
            <LatestStoriesSection />
          </Suspense>
        </SectionErrorBoundary>

        {/* 3. Browse by Category — grid of playlist cards */}
        <SectionErrorBoundary name="categories">
          <Suspense fallback={<CategoryGridSkeleton />}>
            <CategoryGridSection />
          </Suspense>
        </SectionErrorBoundary>

        {/* 4. Featured Story — Editor's Pick cinematic layout */}
        <SectionErrorBoundary name="featured story">
          <Suspense fallback={<FeaturedStorySkeleton />}>
            <FeaturedSection />
          </Suspense>
        </SectionErrorBoundary>

        {/* 5. Most Watched — top 6 with rank badges */}
        <SectionErrorBoundary name="most watched stories">
          <Suspense fallback={<MostWatchedSkeleton />}>
            <MostWatchedSection />
          </Suspense>
        </SectionErrorBoundary>

        {/* 6. Channel Stats — subscribers, videos, views */}
        <SectionErrorBoundary name="channel stats">
          <Suspense fallback={<ChannelStatsSkeleton />}>
            <ChannelStatsSection />
          </Suspense>
        </SectionErrorBoundary>

        {/* 7. Fresh Drops — uncategorized (only if any exist) */}
        <SectionErrorBoundary name="fresh drops">
          <Suspense fallback={<FreshDropsSkeleton />}>
            <FreshDropsSection />
          </Suspense>
        </SectionErrorBoundary>

        {/* 8. Submit CTA — static, no data needed */}
        <SubmitCta />
      </div>
    </>
  )
}
