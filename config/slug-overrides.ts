/**
 * Manual Bengali → Banglish slug overrides for playlist categories.
 *
 * - English playlist titles don't need entries here (titleToSlug handles them).
 * - If a Bengali playlist has no entry here, its slug falls back to the
 *   YouTube playlist ID (ugly but functional, never crashes).
 * - Add a new line whenever Afnan creates a Bengali-titled playlist.
 */
export const SLUG_OVERRIDES: Record<string, string> = {
  "শনির রাত": "shonir-raat",
  "ভয়ের শিহরন": "bhoyer-shihoron",
  "পাতাল বাঁশি": "patal-bashi",
  "অমীমাংসিত রহস্য": "omimangsito-rohoshyo",
}
