import type { MetadataRoute } from "next"
import { getAllVideos } from "@/lib/youtube/video/get-all-videos"
import { getAllPlaylists } from "@/lib/youtube/playlist/get-all-playlists"

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "").replace(/\/$/, "")

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [videos, playlists] = await Promise.all([getAllVideos(), getAllPlaylists()])

  const storyUrls: MetadataRoute.Sitemap = videos.map((video) => ({
    url: `${SITE_URL}/story/${video.id}`,
    lastModified: new Date(video.publishedAt),
    changeFrequency: "monthly",
    priority: 0.8,
  }))

  const categoryUrls: MetadataRoute.Sitemap = playlists.map((playlist) => ({
    url: `${SITE_URL}/category/${playlist.slug}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }))

  return [
    { url: SITE_URL, changeFrequency: "daily", priority: 1.0 },
    { url: `${SITE_URL}/stories`, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/submit`, changeFrequency: "monthly", priority: 0.5 },
    ...categoryUrls,
    ...storyUrls,
  ]
}
