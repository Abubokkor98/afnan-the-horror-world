import { google } from "googleapis"

if (!process.env.YOUTUBE_API_KEY) {
  throw new Error("Missing YOUTUBE_API_KEY environment variable")
}

if (!process.env.YOUTUBE_CHANNEL_ID) {
  throw new Error("Missing YOUTUBE_CHANNEL_ID environment variable")
}

if (!process.env.AFNANS_BEE_CHANNEL_ID) {
  throw new Error("Missing AFNANS_BEE_CHANNEL_ID environment variable")
}

export const youtube = google.youtube({
  version: "v3",
  auth: process.env.YOUTUBE_API_KEY,
})

export const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID
export const AFNANS_BEE_CHANNEL_ID = process.env.AFNANS_BEE_CHANNEL_ID

