/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  cacheComponents: true,
  cacheLife: {
    max: {
      stale: 3600, // 1 hour (initial fetch)
      revalidate: 43200, // 12 hours (on demand updates)
      expire: 604800, // 7 days (eviction)
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
}

export default nextConfig

if (process.env.NODE_ENV === "development" && !process.env.VERCEL) {
  import("@opennextjs/cloudflare").then((m) => m.initOpenNextCloudflareForDev());
}
