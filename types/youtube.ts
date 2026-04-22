export interface Video {
  id: string
  title: string
  description: string
  thumbnail: string
  publishedAt: string
  duration: string
  viewCount: number
  categorySlug: string
  categoryLabel: string
}

export interface Channel {
  id: string
  title: string
  description: string
  thumbnail: string
  subscriberCount: number
  videoCount: number
  viewCount: number
  publishedAt: string
}

export interface Playlist {
  id: string
  title: string
  slug: string
  description: string
  thumbnail: string
  videoCount: number
}

export interface ParsedTimestamp {
  time: string
  title: string
  seconds: number
}
