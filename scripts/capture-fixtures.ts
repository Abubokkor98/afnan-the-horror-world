/**
 * Captures real YouTube API responses and saves them as JSON fixture files.
 * Run: npx tsx scripts/capture-fixtures.ts
 *
 * These fixtures power the dev-mode mock client so you never hit
 * the YouTube API during local development.
 */

import { google } from "googleapis"
import fs from "fs/promises"
import path from "path"

const API_KEY = process.env.YOUTUBE_API_KEY
const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID

if (!API_KEY || !CHANNEL_ID) {
  console.error("Missing YOUTUBE_API_KEY or YOUTUBE_CHANNEL_ID in .env.local")
  console.error("Run: npx dotenv -e .env.local -- npx tsx scripts/capture-fixtures.ts")
  process.exit(1)
}

const youtube = google.youtube({ version: "v3", auth: API_KEY })
const FIXTURES_DIR = path.resolve("lib/youtube/fixtures")

async function ensureDir(dir: string) {
  await fs.mkdir(dir, { recursive: true })
}

async function resetDir(dir: string) {
  await fs.rm(dir, { recursive: true, force: true })
  await fs.mkdir(dir, { recursive: true })
}

async function writeFixture(filepath: string, data: unknown) {
  await fs.writeFile(filepath, JSON.stringify(data, null, 2), "utf-8")
  console.log(`  ✓ ${path.relative(process.cwd(), filepath)}`)
}

async function capturePlaylists() {
  console.log("\n📋 Capturing playlists...")
  const allItems: unknown[] = []
  let pageToken: string | undefined

  do {
    const res = await youtube.playlists.list({
      part: ["snippet", "contentDetails"],
      channelId: CHANNEL_ID,
      maxResults: 50,
      pageToken,
    })
    allItems.push(...(res.data.items ?? []))
    pageToken = res.data.nextPageToken ?? undefined
  } while (pageToken)

  await writeFixture(
    path.join(FIXTURES_DIR, "playlists.json"),
    { items: allItems, nextPageToken: null },
  )
  return allItems
}

async function captureChannel() {
  console.log("\n📺 Capturing channel info...")
  const res = await youtube.channels.list({
    part: ["snippet", "statistics", "contentDetails"],
    id: [CHANNEL_ID!],
  })

  await writeFixture(
    path.join(FIXTURES_DIR, "channel.json"),
    { items: res.data.items ?? [] },
  )

  return res.data.items?.[0]?.contentDetails?.relatedPlaylists?.uploads ?? null
}

async function capturePlaylistItems(playlistId: string, label: string) {
  console.log(`  📁 ${label} (${playlistId})...`)
  const allItems: unknown[] = []
  let pageToken: string | undefined

  do {
    const res = await youtube.playlistItems.list({
      part: ["snippet", "contentDetails"],
      playlistId,
      maxResults: 50,
      pageToken,
    })
    allItems.push(...(res.data.items ?? []))
    pageToken = res.data.nextPageToken ?? undefined
  } while (pageToken)

  await ensureDir(path.join(FIXTURES_DIR, "playlist-items"))
  await writeFixture(
    path.join(FIXTURES_DIR, "playlist-items", `${playlistId}.json`),
    { items: allItems, nextPageToken: null },
  )

  return allItems
}

async function captureVideoDetails(videoIds: string[]) {
  if (videoIds.length === 0) return

  const batches: string[][] = []
  for (let i = 0; i < videoIds.length; i += 50) {
    batches.push(videoIds.slice(i, i + 50))
  }

  await ensureDir(path.join(FIXTURES_DIR, "videos"))

  for (const batch of batches) {
    const key = batch.slice(0, 3).join("-")
    const res = await youtube.videos.list({
      part: ["snippet", "contentDetails", "statistics"],
      id: batch,
    })

    await writeFixture(
      path.join(FIXTURES_DIR, "videos", `${key}.json`),
      { items: res.data.items ?? [] },
    )
  }
}

async function main() {
  console.log("🎬 Capturing YouTube API fixtures...")
  console.log(`   Channel: ${CHANNEL_ID}`)

  await ensureDir(FIXTURES_DIR)
  await resetDir(path.join(FIXTURES_DIR, "playlist-items"))
  await resetDir(path.join(FIXTURES_DIR, "videos"))

  // 1. Capture channel info + uploads playlist ID
  const uploadsPlaylistId = await captureChannel()

  // 2. Capture all playlists
  const playlists = await capturePlaylists() as Array<{
    id: string
    snippet?: { title?: string }
  }>

  // 3. Capture playlist items + video details for each playlist
  console.log("\n🎥 Capturing playlist items...")
  const allVideoIds = new Set<string>()

  for (const playlist of playlists) {
    const items = await capturePlaylistItems(
      playlist.id!,
      playlist.snippet?.title ?? "Unknown",
    ) as Array<{ contentDetails?: { videoId?: string } }>

    for (const item of items) {
      if (item.contentDetails?.videoId) {
        allVideoIds.add(item.contentDetails.videoId)
      }
    }
  }

  // 4. Capture uploads playlist items (for uncategorized detection)
  if (uploadsPlaylistId) {
    console.log("\n📤 Capturing uploads playlist...")
    const uploadItems = await capturePlaylistItems(
      uploadsPlaylistId,
      "Uploads",
    ) as Array<{ contentDetails?: { videoId?: string } }>

    for (const item of uploadItems) {
      if (item.contentDetails?.videoId) {
        allVideoIds.add(item.contentDetails.videoId)
      }
    }
  }

  // 5. Capture video details for all unique video IDs
  console.log(`\n🎞️  Capturing video details (${allVideoIds.size} videos)...`)
  await captureVideoDetails([...allVideoIds])

  console.log("\n✅ Done! Fixtures saved to lib/youtube/fixtures/")
  console.log(`   ${playlists.length} playlists, ${allVideoIds.size} videos`)
}

main().catch((error) => {
  console.error("❌ Capture failed:", error)
  process.exit(1)
})
