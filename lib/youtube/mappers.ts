import type { youtube_v3 } from "googleapis"
import type { Channel, Playlist, Video } from "@/types/youtube"
import { titleToSlug } from "@/lib/format"

export function mapToPlaylist(item: youtube_v3.Schema$Playlist): Playlist {
  return {
    id: item.id!,
    title: item.snippet!.title!,
    slug: titleToSlug(item.snippet!.title!),
    description: item.snippet!.description ?? "",
    thumbnail: item.snippet!.thumbnails?.high?.url ?? "",
    videoCount: item.contentDetails?.itemCount ?? 0,
  }
}

export function mapToVideo(
  item: youtube_v3.Schema$Video,
  categorySlug: string,
  categoryLabel: string,
): Video {
  return {
    id: item.id!,
    title: item.snippet!.title!,
    description: item.snippet!.description ?? "",
    thumbnail:
      item.snippet!.thumbnails?.maxres?.url ??
      item.snippet!.thumbnails?.high?.url ??
      "",
    publishedAt: item.snippet!.publishedAt!,
    duration: item.contentDetails?.duration ?? "PT0S",
    viewCount: parseInt(item.statistics?.viewCount ?? "0", 10),
    categorySlug,
    categoryLabel,
  }
}

export function mapToChannel(item: youtube_v3.Schema$Channel): Channel {
  return {
    id: item.id!,
    title: item.snippet!.title!,
    description: item.snippet!.description ?? "",
    thumbnail: item.snippet!.thumbnails?.high?.url ?? "",
    subscriberCount: parseInt(item.statistics?.subscriberCount ?? "0", 10),
    videoCount: parseInt(item.statistics?.videoCount ?? "0", 10),
    viewCount: parseInt(item.statistics?.viewCount ?? "0", 10),
    publishedAt: item.snippet!.publishedAt!,
  }
}
