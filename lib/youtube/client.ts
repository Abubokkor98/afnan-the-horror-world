import { google } from "googleapis"

export const youtube = google.youtube({
  version: "v3",
  auth: process.env.YOUTUBE_API_KEY,
})

export const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID!
