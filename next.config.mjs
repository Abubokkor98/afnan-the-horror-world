/**
 * Dev-mode mock data toggle.
 * In development, the YouTube client is swapped with a mock that reads
 * local JSON fixtures (lib/youtube/fixtures/) instead of calling the API.
 * This makes dev loads instant (~1s) instead of ~12 minutes.
 *
 * To use real API in dev:  add REAL_API=true to .env.local and restart.
 * To refresh fixtures:    npx dotenv -e .env.local -- npx tsx scripts/capture-fixtures.ts
 * See docs/dev-mock-data.md for full guide.
 */
const useMockData =
  process.env.NODE_ENV === "development" &&
  process.env.REAL_API !== "true"

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  cacheComponents: true,
  cacheLife: {
    //  max: {
    //   stale: 3600, // 1 hour (initial fetch)
    //   revalidate: 43200, // 12 hours (on demand updates)
    //   expire: 604800, // 7 days (eviction)
    // },
    max: {
      stale: 300, // 5 minutes (serve cached without revalidation)
      revalidate: 3600, // 1 hour (background revalidation window)
      expire: 86400, // 1 day (eviction)
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
      {
        protocol: "https",
        hostname: "yt3.ggpht.com",
      },
    ],
  },
  // Swap the YouTube client with a mock in dev mode.
  // All data functions import from "@/lib/youtube/client" — this alias
  // redirects that import to client.mock.ts which reads local JSON fixtures.
  // Only active during `pnpm dev` (Turbopack). Production builds ignore this.
  turbopack: {
    resolveAlias: {
      ...(useMockData && {
        "./lib/youtube/client": "./lib/youtube/client.mock",
      }),
    },
  },
}

export default nextConfig

if (process.env.NODE_ENV === "development" && !process.env.VERCEL) {
  import("@opennextjs/cloudflare").then((m) => m.initOpenNextCloudflareForDev());
}
