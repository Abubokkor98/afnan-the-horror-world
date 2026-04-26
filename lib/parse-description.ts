import type { ParsedTimestamp } from "@/types/youtube"
import { timeToSeconds } from "@/lib/format"

const TIMESTAMP_PATTERN = /^(\d{1,2}:\d{2}(?::\d{2})?)\s+(.+)/

/**
 * Extracts timestamped stories from a video description.
 * Removes an initial "Intro" entry (seconds === 0, title starts with "intro",
 * case-insensitive) since it represents the host's opening talk, not a story.
 * Returns [] if fewer than 2 actual stories remain after filtering.
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

  if (timestamps.length < 2) return []

  // The first timestamp is typically the host's intro talk, not a story
  const hasIntro =
    timestamps[0].seconds === 0 &&
    /^intro\b/i.test(timestamps[0].title)

  const stories = hasIntro ? timestamps.slice(1) : timestamps

  return stories.length >= 2 ? stories : []
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
    .replace(COUNTRY_PATTERN, "")
    .replace(/#\S+/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
}
