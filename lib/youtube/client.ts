import { google } from "googleapis"

export const youtube = google.youtube({
  version: "v3",
  auth: process.env.YOUTUBE_API_KEY,
})

const channelId = process.env.YOUTUBE_CHANNEL_ID
if (!channelId) {
  throw new Error("Missing YOUTUBE_CHANNEL_ID environment variable")
}
export const CHANNEL_ID: string = channelId

const afnansBeeChannelId = process.env.AFNANS_BEE_CHANNEL_ID
if (!afnansBeeChannelId) {
  throw new Error("Missing AFNANS_BEE_CHANNEL_ID environment variable")
}
export const AFNANS_BEE_CHANNEL_ID: string = afnansBeeChannelId

