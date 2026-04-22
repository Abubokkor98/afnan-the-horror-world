import type { youtube_v3 } from "googleapis"
import { youtube } from "@/lib/youtube/client"

/**
 * Fetches full video details (snippet, stats, duration) for a batch of IDs.
 * Handles YouTube's 50-per-request limit automatically.
 */
export async function getVideoDetails(
  videoIds: string[],
): Promise<youtube_v3.Schema$Video[]> {
  const batches: string[][] = []
  for (let i = 0; i < videoIds.length; i += 50) {
    batches.push(videoIds.slice(i, i + 50))
  }

  const responses = await Promise.all(
    batches.map((id) =>
      youtube.videos.list({
        part: ["snippet", "contentDetails", "statistics"],
        id,
      }),
    ),
  )

  return responses.flatMap((res) => res.data.items ?? [])
}
