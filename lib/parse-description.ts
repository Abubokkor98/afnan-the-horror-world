import type { ParsedTimestamp } from "@/types/youtube"
import { timeToSeconds } from "@/lib/format"

const TIMESTAMP_PATTERN = /^(\d{1,2}:\d{2}(?::\d{2})?)\s+(.+)/

/**
 * Extracts timestamped stories from a video description.
 * Returns [] if fewer than 2 timestamps found (not a multi-story video).
 */
export function parseTimestamps(description: string): ParsedTimestamp[] {
  const lines = description.split("\n")
  const timestamps: ParsedTimestamp[] = []

  for (const line of lines) {
    const match = line.trim().match(TIMESTAMP_PATTERN)
    if (!match) continue

    const [, time, title] = match
    timestamps.push({
      time,
      title: title.trim(),
      seconds: timeToSeconds(time),
    })
  }

  return timestamps.length >= 2 ? timestamps : []
}

const COUNTRY_PATTERN = /#country:([a-zA-Z ]+)/i

/**
 * Extracts country tag from description (e.g. "#country:Bangladesh").
 * Returns null if no country tag found.
 */
export function parseCountry(description: string): string | null {
  const match = description.match(COUNTRY_PATTERN)
  return match ? match[1].trim() : null
}

/**
 * Removes hashtags from description text for clean display.
 */
export function stripHashtags(description: string): string {
  return description
    .replace(/#\S+/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
}
