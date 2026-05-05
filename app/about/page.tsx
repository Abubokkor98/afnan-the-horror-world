import type { Metadata } from "next"
import { getChannelInfo } from "@/lib/youtube/channel/get-channel-info"
import { Separator } from "@/components/ui/separator"
import { AboutHero } from "@/components/about/about-hero"
import { AboutOrigin } from "@/components/about/about-origin"
import { ShowSchedule } from "@/components/about/show-schedule"
import { AboutMission } from "@/components/about/about-mission"
import { AboutStats } from "@/components/about/about-stats"
import { AboutTeam } from "@/components/about/about-team"
import { AboutDisclaimer } from "@/components/about/about-disclaimer"
import { AboutContact } from "@/components/about/about-contact"

export const metadata: Metadata = {
  title: "About",
  description:
    "The story behind Afnan The Horror World — preserving real horror stories from Bangladesh and beyond.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About",
    description:
      "The story behind Afnan The Horror World — preserving real horror stories from Bangladesh and beyond.",
    url: "/about",
    type: "website",
  },
}

export default async function AboutPage() {
  const channel = await getChannelInfo()

  return (
    <main className="mx-auto max-w-4xl space-y-20 px-4 py-16">
      <AboutHero />
      <AboutOrigin />
      <Separator className="bg-(--color-border)" />
      <ShowSchedule />
      <Separator className="bg-(--color-border)" />
      <AboutMission />

      {channel && (
        <>
          <Separator className="bg-(--color-border)" />
          <AboutStats channel={channel} />
        </>
      )}

      <Separator className="bg-(--color-border)" />
      <AboutTeam />
      <Separator className="bg-(--color-border)" />
      <AboutDisclaimer />
      <AboutContact />
    </main>
  )
}
