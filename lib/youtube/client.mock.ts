/**
 * Mock YouTube client for development mode.
 *
 * Replaces the real googleapis client via Turbopack resolveAlias.
 * Reads pre-captured JSON fixture files instead of calling the YouTube API.
 * This file is NEVER used in production builds.
 */

import fs from "fs/promises"
import path from "path"

const FIXTURES_DIR = path.resolve(process.cwd(), "lib/youtube/fixtures")

async function readFixture<T>(filepath: string): Promise<T> {
  const raw = await fs.readFile(path.join(FIXTURES_DIR, filepath), "utf-8")
  return JSON.parse(raw) as T
}

interface ListResponse<T> {
  data: {
    items: T[]
    nextPageToken?: string | null
  }
}

interface PlaylistsListParams {
  part: string[]
  channelId: string
  maxResults: number
  pageToken?: string
}

interface PlaylistItemsListParams {
  part: string[]
  playlistId: string
  maxResults: number
  pageToken?: string
}

interface VideosListParams {
  part: string[]
  id: string[]
}

interface ChannelsListParams {
  part: string[]
  id: string[]
}

/**
 * Mock YouTube client matching the googleapis SDK interface.
 * Each method reads from local JSON fixture files.
 */
export const youtube = {
  playlists: {
    async list(_params: PlaylistsListParams): Promise<ListResponse<unknown>> {
      return { data: await readFixture("playlists.json") }
    },
  },

  playlistItems: {
    async list(
      params: PlaylistItemsListParams,
    ): Promise<ListResponse<unknown>> {
      const filename = `playlist-items/${params.playlistId}.json`
      try {
        return { data: await readFixture(filename) }
      } catch {
        return { data: { items: [], nextPageToken: null } }
      }
    },
  },

  videos: {
    async list(params: VideosListParams): Promise<ListResponse<unknown>> {
      // Find the fixture file that contains these video IDs
      const videosDir = path.join(FIXTURES_DIR, "videos")
      try {
        const files = await fs.readdir(videosDir)
        const itemsById = new Map<string, unknown>()

        for (const file of files) {
          const fixture = JSON.parse(
            await fs.readFile(path.join(videosDir, file), "utf-8"),
          ) as { items: Array<{ id?: string }> }

          for (const item of fixture.items) {
            if (item.id && params.id.includes(item.id) && !itemsById.has(item.id)) {
              itemsById.set(item.id, item)
            }
          }
        }

        return {
          data: {
            items: params.id.flatMap((id) => {
              const item = itemsById.get(id)
              return item === undefined ? [] : [item]
            }),
          },
        }
      } catch {
        return { data: { items: [] } }
      }
    },
  },

  channels: {
    async list(_params: ChannelsListParams): Promise<ListResponse<unknown>> {
      return { data: await readFixture("channel.json") }
    },
  },
}

export const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID ?? "MOCK_CHANNEL_ID"
