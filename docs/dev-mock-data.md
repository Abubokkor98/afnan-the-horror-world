# Dev Mock Data Guide

## Why This Exists

In dev mode, every page load triggers ~98 YouTube API calls taking **2–12 minutes** because `"use cache"` invalidates on every HMR file save. This mock system reads pre-saved JSON files instead — making dev loads **instant**.

**Production is completely unaffected.** The mock only activates during `pnpm dev`.

---

## Quick Reference

### Daily Development (mock data, instant loads)

```bash
pnpm dev
```

No extra setup needed. Mock data is the default.

### Test With Real YouTube API

Add to `.env.local`:

```env
REAL_API=true
```

Then restart:

```bash
pnpm dev
```

> Remove or comment out `REAL_API=true` when done to go back to fast mock mode.

### Refresh Fixture Data

Run this when your YouTube channel content changes (new videos, new playlists):

```bash
npx dotenv -e .env.local -- npx tsx scripts/capture-fixtures.ts
```

This takes ~30 seconds. You only need to do it occasionally.

### Production Build

```bash
pnpm build
```

Always uses the real YouTube API. Mock data is never involved.

---

## How It Works

### Architecture

```
Your data functions (getAllPlaylists, getPlaylistVideos, etc.)
        │
        ▼
  import from "@/lib/youtube/client"
        │
        ▼
  ┌─────────────────────────────────┐
  │  Turbopack resolveAlias         │
  │  (next.config.mjs)              │
  │                                 │
  │  Dev mode (default):            │
  │    → lib/youtube/client.mock.ts │
  │    → reads local JSON files     │
  │    → 0 API calls, instant       │
  │                                 │
  │  Dev mode (REAL_API=true):      │
  │    → lib/youtube/client.ts      │
  │    → calls YouTube API          │
  │    → slow, but real data        │
  │                                 │
  │  Production (pnpm build):       │
  │    → lib/youtube/client.ts      │
  │    → always real API            │
  └─────────────────────────────────┘
```

### Key Files

| File | Purpose |
|---|---|
| `lib/youtube/client.ts` | Real YouTube API client (unchanged) |
| `lib/youtube/client.mock.ts` | Mock client that reads fixture JSON files |
| `lib/youtube/fixtures/` | Saved API response data (gitignored) |
| `scripts/capture-fixtures.ts` | Script to refresh fixture data |
| `next.config.mjs` | Contains the `turbopack.resolveAlias` config |

### Config in next.config.mjs

```js
const useMockData =
  process.env.NODE_ENV === "development" &&
  process.env.REAL_API !== "true"

// inside nextConfig:
turbopack: {
  resolveAlias: {
    ...(useMockData && {
      "./lib/youtube/client": "./lib/youtube/client.mock",
    }),
  },
},
```

---

## Common Scenarios

### "I added a new YouTube playlist/video and want to see it in dev"

```bash
npx dotenv -e .env.local -- npx tsx scripts/capture-fixtures.ts
pnpm dev
```

### "My dev page is showing old data"

The fixture files are snapshots. Refresh them:

```bash
npx dotenv -e .env.local -- npx tsx scripts/capture-fixtures.ts
```

### "I want to verify something works with the real API before deploying"

```env
# .env.local
REAL_API=true
```

```bash
pnpm dev    # will be slow (~2 min first load)
```

Remove `REAL_API=true` when done.

### "I cloned the repo fresh and fixtures are missing"

Fixtures are gitignored. Generate them:

```bash
npx dotenv -e .env.local -- npx tsx scripts/capture-fixtures.ts
```

### "I added a new YouTube API method in a data function"

Update `lib/youtube/client.mock.ts` to handle the new method. The mock client must export the same interface as the real client.

---

## What NOT To Do

- **Don't commit fixture files** — They're in `.gitignore` and contain raw API data
- **Don't edit `client.mock.ts` to add business logic** — It should only read JSON files
- **Don't set `REAL_API=true` in production env** — It has no effect there, but don't
- **Don't delete `client.ts`** — It's the real client used in production
- **Don't modify data functions** — They import from `@/lib/youtube/client` which auto-resolves

---

## Troubleshooting

### Dev server still slow after setup

1. Make sure `REAL_API=true` is NOT in your `.env.local`
2. Make sure fixture files exist: `ls lib/youtube/fixtures/`
3. Delete `.next` and restart: `Remove-Item -Recurse -Force .\.next; pnpm dev`

### "Module not found" errors

The `resolveAlias` may not be matching. Check `next.config.mjs` has the alias config and restart the dev server.

### Fixture capture script fails

Make sure `YOUTUBE_API_KEY` and `YOUTUBE_CHANNEL_ID` are set in `.env.local`.

### Hydration mismatch warnings

These are normal in dev mode and unrelated to mock data. They come from browser extensions modifying HTML.
