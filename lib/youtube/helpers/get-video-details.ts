import type { youtube_v3 } from "googleapis"
import { youtube } from "@/lib/youtube/client"

/**
 * Fetches full video details (snippet, stats, duration) for a batch of IDs.
 * Handles YouTube's 50-per-request limit automatically.
 */
export async function getVideoDetails(
  videoIds: string[],
): Promise<youtube_v3.Schema$Video[]> {
  const results: youtube_v3.Schema$Video[] = []

  for (let i = 0; i < videoIds.length; i += 50) {
    const batch = videoIds.slice(i, i + 50)
    const res = await youtube.videos.list({
      part: ["snippet", "contentDetails", "statistics"],
      id: batch,
    })
    results.push(...(res.data.items ?? []))
  }

  return results
}
