/**
 * Controls the display order of categories on the homepage.
 * Playlists are fetched dynamically from the YouTube API — no IDs needed.
 *
 * - Playlists whose titles match entries here appear in this order.
 * - Any new playlist Afnan creates that isn't listed here appears at the end automatically.
 * - If this array is empty, playlists display in YouTube creation order.
 */
export const CATEGORY_ORDER: string[] = [
  // Add playlist titles in the order you want them displayed:
  // "Horror Night",
  // "Short Stories",
  // "Reactions",
]
