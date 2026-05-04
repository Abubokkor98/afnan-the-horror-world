export interface AfnansBeeVideo {
  id: string
  title: string
  thumbnail: string
  publishedAt: string
  viewCount: number
}

export interface AfnansBeeData {
  videos: AfnansBeeVideo[]
  subscriberCount: string | null
}
