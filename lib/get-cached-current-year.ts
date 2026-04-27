import { cacheLife } from "next/cache"

export async function getCachedCurrentYear(): Promise<number> {
  "use cache"
  cacheLife("max")
  return new Date().getFullYear()
}
