import { Suspense } from "react"
import { SectionErrorBoundary } from "@/components/section-error/section-error-boundary"
import { HeroSection } from "@/components/sections/hero-section"
import { LatestStoriesSection } from "@/components/sections/latest-stories-section"
import { CategoryGridSection } from "@/components/sections/category-grid-section"
import { AfnansBeeSection } from "@/components/sections/afnans-bee-section"
import { MostWatchedSection } from "@/components/sections/most-watched-section"
import { ChannelStatsSection } from "@/components/sections/channel-stats-section"
import { WeeklySchedule } from "@/components/weekly-schedule/weekly-schedule"
import { SubmitCta } from "@/components/submit/submit-cta"
import {
  HeroSkeleton,
  CategoryRowSkeleton,
  CategoryGridSkeleton,
} from "@/components/skeletons/home-skeletons"
import {
  MostWatchedSkeleton,
  ChannelStatsSkeleton,
  AfnansBeeSkeleton,
} from "@/components/skeletons/section-skeletons"

import { safeJsonLd } from "@/lib/safe-json-ld"

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "").replace(/\/$/, "")

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Afnan The Horror World",
  url: SITE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
}

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Afnan The Horror World",
  url: SITE_URL,
  logo: `${SITE_URL}/icon.png`,
  sameAs: ["https://www.youtube.com/@AfnanTheHorrorWorldBD"],
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(organizationJsonLd) }}
      />
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

        {/* 4. Most Watched — top 6 with rank badges */}
        <SectionErrorBoundary name="most watched stories">
          <Suspense fallback={<MostWatchedSkeleton />}>
            <MostWatchedSection />
          </Suspense>
        </SectionErrorBoundary>

        {/* 5. Channel Stats — capstone summary of main channel before AfnansBee */}
        <SectionErrorBoundary name="channel stats">
          <Suspense fallback={<ChannelStatsSkeleton />}>
            <ChannelStatsSection />
          </Suspense>
        </SectionErrorBoundary>

        {/* 6. AfnansBee Channel — cross-promotion after all main channel content */}
        <SectionErrorBoundary name="AfnansBee channel">
          <Suspense fallback={<AfnansBeeSkeleton />}>
            <AfnansBeeSection />
          </Suspense>
        </SectionErrorBoundary>

        {/* 7. Weekly Schedule — static, no API needed */}
        <WeeklySchedule />

        {/* 8. Submit CTA — static, no data needed */}
        <SubmitCta />
      </div>
    </>
  )
}
