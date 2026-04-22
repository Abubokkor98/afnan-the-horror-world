import { revalidateTag } from "next/cache"

const CACHE_TAGS = [
  "playlists",
  "channel",
  "uncategorized",
  "latest-videos",
  "most-watched",
  "all-videos",
] as const

export async function GET(request: Request) {
  const secret = request.headers.get("x-revalidate-secret")

  if (secret !== process.env.REVALIDATE_SECRET) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  for (const tag of CACHE_TAGS) {
    revalidateTag(tag, "max")
  }

  return Response.json({
    revalidated: true,
    tags: CACHE_TAGS,
    timestamp: Date.now(),
  })
}
