# AfnanTheHorrorWorldBD — Technical Specification Document

**Version:** 1.0  
**Date:** April 2026  
**Project:** YouTube Channel Website  
**Channel:** @AfnanTheHorrorWorldBD

---

## Table of Contents

1. [Do We Need a Backend?](#1-do-we-need-a-backend)
2. [Complete Tech Stack](#2-complete-tech-stack)
3. [Architecture Overview](#3-architecture-overview)
4. [Project Folder Structure](#4-project-folder-structure)
5. [Data Flow — How Videos Appear Automatically](#5-data-flow)
6. [Environment Variables](#6-environment-variables)
7. [SEO Strategy](#7-seo-strategy)
8. [Performance Strategy](#8-performance-strategy)
9. [Deployment Pipeline](#9-deployment-pipeline)
10. [Development Phases](#10-development-phases)

---

## 1. Do We Need a Backend?

**Short answer: No. Next.js 16.2 IS the backend.**

This is one of the most important decisions in this project. A traditional web project has two separate codebases — a frontend (React/HTML) and a backend (Node.js/Express, Django, Laravel, etc.) running on a separate server. You do NOT need that here.

Next.js 16.2 is a **full-stack framework**. It handles both the frontend UI and all server-side logic in a single codebase. Here is what replaces a traditional backend in this project:

| Traditional Backend Need | Next.js 16.2 Replacement |
|---|---|
| API server to call YouTube API | Server Components fetch YouTube directly (server-side) |
| REST endpoint for cache invalidation | Route Handler at `/api/revalidate/route.ts` |
| Server to serve HTML pages | Next.js built-in server / Cloudflare Pages |
| Database to store videos | Not needed — YouTube IS the database |
| Authentication server | Not needed for a public read-only site |

**Why no database?**
The YouTube Data API v3 already stores everything — video titles, thumbnails, descriptions, view counts, publish dates, and playlist membership. Storing this in a separate database would mean maintaining a sync system, paying for database hosting, and adding complexity for zero benefit. YouTube's API is the single source of truth.

**The only "backend" code you write:**
- `lib/youtube.ts` — functions that call YouTube API (runs on the server inside Server Components)
- `app/api/revalidate/route.ts` — a single API endpoint (~20 lines) that triggers cache refresh

---

## 2. Complete Tech Stack

### 2.1 Core Framework

#### Next.js 16.2
- **What it is:** The React framework that powers the entire application — routing, server rendering, caching, and API routes all in one.
- **Why Next.js:** It has the best built-in support for the exact feature this project needs most: ISR (Incremental Static Regeneration). This means pages are pre-built as fast static HTML but automatically refresh when new YouTube videos are added. No other framework does this as cleanly.
- **Why 16.2 specifically:** Version 16 introduced the `use cache` directive, which is a cleaner and more powerful caching model than older versions. It also ships with Turbopack as the default bundler (2-5x faster builds) and has stable React Compiler support which automatically optimises re-renders without manual `useMemo`/`useCallback`.

---

#### TypeScript
- **What it is:** JavaScript with types. Every variable, function parameter, and return value has a declared type.
- **Why TypeScript:** The YouTube API returns complex nested JSON objects. Without TypeScript, a typo like `video.snipet.title` instead of `video.snippet.title` would silently return `undefined` and cause bugs that are hard to trace. With TypeScript, your editor catches this instantly as a red underline before you even run the code.

---

### 2.2 Styling

#### Tailwind CSS v4
- **What it is:** A utility-first CSS framework. Instead of writing `.card { padding: 16px; border-radius: 8px; }` in a separate file, you write `className="p-4 rounded-lg"` directly in your JSX.
- **Why Tailwind:** It eliminates the problem of CSS files growing out of control. All styles live next to the component they style. It is also extremely fast because it generates only the CSS classes you actually use — no unused CSS shipped to the browser.
- **Why v4 specifically:** Tailwind v4 uses a new Rust-based engine (Lightning CSS) which is 10x faster than v3. It also removes the need for a `tailwind.config.js` file — configuration is done directly in CSS.

---

#### shadcn/ui
- **What it is:** A collection of accessible, beautifully designed UI components (buttons, cards, dialogs, dropdowns, navigation menus, etc.) built on Radix UI primitives and styled with Tailwind CSS.
- **Why shadcn/ui:** Unlike a traditional component library (Material UI, Ant Design), shadcn/ui copies component source code directly into your project. You own the code completely — you can customise every pixel without fighting against a library's opinionated styles.
- **Key components used in this project:** `Card`, `Badge`, `Button`, `Sheet` (mobile sidebar), `NavigationMenu`, `Skeleton` (loading states), `Dialog` (video lightbox), `ScrollArea`.

---

### 2.3 Icons

#### Remix Icons (@remixicon/react)
- **What it is:** A clean, consistent open-source icon library with 2800+ SVG icons as React components. Covers system, media, business, and design categories.
- **Why Remix Icons:** Broader icon set than Lucide with consistent 24px grid design. Icons are individual SVG components so only the icons you import are included in the bundle (tree-shakeable). Lucide React can be added later if needed.

---

### 2.4 Animations

#### Framer Motion
- **What it is:** The most popular React animation library. Lets you animate components with simple props like `initial`, `animate`, and `exit`.
- **Why Framer Motion:** A horror-themed channel website needs atmosphere — cards that fade in as you scroll, a subtle zoom on video thumbnails on hover, a page transition when navigating between categories. These effects are achievable in CSS but Framer Motion makes them clean and readable in code.
- **Performance note:** Import only what you use. Use `LazyMotion` with the `domAnimation` feature bundle to keep the bundle small.

---

### 2.5 Data Fetching

#### googleapis (YouTube Data API v3 SDK)
- **What it is:** Google's official Node.js SDK for all Google APIs including YouTube Data API v3.
- **Why googleapis:** The official SDK handles authentication, request construction, TypeScript types for all API responses, and automatic retries. The alternative is writing raw `fetch()` calls to YouTube's REST API manually — more code, more chance of bugs, no built-in types.
- **API Key vs OAuth:** This project only needs to READ public data (videos, playlists). That requires only an API Key — the simpler option. OAuth is only needed if you were writing data back to YouTube (uploading videos, etc.).

---

### 2.6 State Management

#### React Built-in (useState / useReducer / Context)
- **What it is:** React's own state management hooks, built into the framework.
- **Why no external state library:** This website has very minimal client-side state. The search/filter page needs to track a search query and selected category — that is 2-3 `useState` calls. No global state library is needed.
- **When to reconsider:** If you later add user features (favourites, watch history stored locally), add Zustand at that point.

---

### 2.7 Form Handling

#### React Hook Form + Zod
- **What it is:** React Hook Form handles form state and validation. Zod defines the shape and rules of the data (a schema).
- **Why included:** The website has one form — the search/filter bar. React Hook Form makes the search input controlled and debounced cleanly.
- **Why Zod:** Zod schemas double as TypeScript types. Define the shape of your YouTube API response once in Zod and get both runtime validation and TypeScript types automatically.

---

### 2.8 SEO

#### Next.js Built-in Metadata API
- **What it is:** Next.js 16.2's built-in `generateMetadata()` function that produces `<title>`, `<meta>`, and Open Graph tags per page.
- **Why built-in:** No extra library needed. Next.js handles all meta tag injection automatically. Each video page gets its own unique title, description, and thumbnail pulled from the YouTube API.

#### next-sitemap
- **What it is:** A package that generates `sitemap.xml` and `robots.txt` automatically after every build.
- **Why needed:** Google discovers your pages through the sitemap. Without it, individual video pages may never be indexed. With it, every video URL is submitted to Google automatically.

#### schema-dts (JSON-LD TypeScript types)
- **What it is:** TypeScript types for Schema.org structured data, used to write `VideoObject` JSON-LD markup.
- **Why JSON-LD:** Google uses `VideoObject` structured data to show your videos in rich results — the video carousels that appear at the top of Google search. For a horror content channel, ranking in "horror YouTube video" searches with a rich snippet is high-value SEO.
- **Why schema-dts:** Without it, JSON-LD is just an untyped object literal. schema-dts gives you TypeScript autocomplete and type-checking for all Schema.org properties.

---

### 2.9 Analytics

#### Cloudflare Web Analytics
- **What it is:** Cloudflare's free, privacy-first analytics built directly into Cloudflare Pages.
- **Why Cloudflare Analytics:** Since the site is already on Cloudflare Pages, this is free and requires no extra setup — one toggle in the Cloudflare dashboard. It shows page views, unique visitors, top pages, countries, and devices.

---

### 2.10 Code Quality

#### ESLint
- **What it is:** A linter that checks your code for errors and style violations before you run it.
- **Why:** Catches common bugs (using a variable before declaring it, missing dependencies in `useEffect`) and enforces consistent code style. Next.js ships with a built-in ESLint config (`next/core-web-vitals`) that is pre-configured — zero setup.

#### Prettier
- **What it is:** An opinionated code formatter that automatically reformats your code on save.

#### Husky + lint-staged
- **What it is:** Husky runs scripts on git events. lint-staged runs linters only on files that are staged for commit.
- **Why:** Prevents committing broken or unformatted code. Before every commit, ESLint and Prettier automatically run on changed files. If there is an error, the commit is blocked until you fix it.

---

### 2.11 Deployment & Infrastructure

#### Cloudflare Pages
- **What it is:** Cloudflare's static and serverless hosting platform with a global CDN across 330+ cities.
- **Why Cloudflare over Vercel:** Free tier allows commercial use (Vercel's free tier is personal-only). Unlimited bandwidth. Faster load times for South Asian audiences due to a Dhaka (DAC) edge node. Enterprise-grade DDoS protection included free.

#### @opennextjs/cloudflare
- **What it is:** An adapter that makes Next.js apps compatible with Cloudflare's runtime (Workers/Pages). Next.js is built by Vercel and uses some Vercel-specific features by default — this adapter translates them for Cloudflare.
- **Why needed:** Without this adapter, Next.js 16.2 features like Server Components and Route Handlers would not run on Cloudflare Pages. The adapter handles the translation automatically.

#### GitHub
- **What it is:** Version control and code hosting.
- **Why GitHub:** Cloudflare Pages integrates directly with GitHub — every push to `main` triggers an automatic deployment. Every push to a feature branch creates a preview URL for testing. Free for public and private repositories.

---

### 2.12 Development Tools

#### VS Code (recommended editor)
- Install extensions: ESLint, Prettier, Tailwind CSS IntelliSense, TypeScript, GitLens.

#### Node.js 22 LTS
- Required to run Next.js locally. Use `nvm` (Node Version Manager) to switch between Node versions cleanly.

---

### Complete Stack Summary

| Category | Technology | Version |
|---|---|---|
| Framework | Next.js | 16.2 |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | v4 |
| Components | shadcn/ui | latest |
| Icons | Remix Icons (@remixicon/react) | 4.x |
| Animation | Framer Motion | 11.x |
| YouTube API | googleapis | 144.x |
| Forms | React Hook Form + Zod | 7.x / 3.x |
| SEO sitemap | next-sitemap | 4.x |
| SEO schema | schema-dts | 1.x |
| Analytics | Cloudflare Web Analytics | built-in |
| Linting | ESLint | built-in (Next.js) |
| Formatting | Prettier | 3.x |
| Git hooks | Husky + lint-staged | latest |
| Deployment | Cloudflare Pages | — |
| CF adapter | @opennextjs/cloudflare | latest |
| Version control | GitHub | — |

---

## 3. Architecture Overview

```
Browser (User)
     │
     ▼
Cloudflare Edge CDN (330+ global nodes, ~35ms from Bangladesh)
     │
     ├── Cache HIT  → Serve pre-built HTML instantly (no server involved)
     │
     └── Cache MISS → Next.js Server Component runs
                           │
                           ▼
                    lib/youtube.ts
                    (calls YouTube Data API v3)
                           │
                           ▼
                    Page built, cached at edge
                    Served to user + all future users
```

**The key insight:** Once a page is built and cached, 9,999 of your 10,000 daily visitors never touch the YouTube API or the server. They get the pre-built HTML file from the nearest Cloudflare node in milliseconds.

---

## 4. Project Folder Structure

```
afnan-horror-world/
├── app/                          # All pages and routes (Next.js App Router)
│   ├── layout.tsx                # Root layout — navbar, footer, fonts
│   ├── page.tsx                  # Homepage — hero + all category rows
│   ├── category/
│   │   └── [slug]/
│   │       ├── page.tsx          # Category page — all videos in one playlist
│   │       └── loading.tsx       # Skeleton loading state
│   ├── story/
│   │   └── [id]/
│   │       ├── page.tsx          # Individual story player page
│   │       └── loading.tsx
│   ├── search/
│   │   └── page.tsx              # Search and filter page (client-side)
│   └── api/
│       └── revalidate/
│           └── route.ts          # Cache invalidation webhook endpoint
│
├── components/                   # Reusable UI components
│   ├── ui/                       # shadcn/ui components (auto-generated)
│   ├── video-card.tsx            # Individual video thumbnail card
│   ├── category-row.tsx          # Horizontal scrollable row of videos
│   ├── video-player.tsx          # YouTube embed player
│   ├── navbar.tsx                # Top navigation with category links
│   ├── footer.tsx
│   └── video-grid.tsx            # Responsive grid of video cards
│
├── lib/                          # Core business logic
│   ├── youtube.ts                # All YouTube API fetch functions
│   └── utils.ts                  # Helper functions (cn, formatViews, etc.)
│
├── config/
│   └── playlists.ts              # Playlist ID → Category name/slug mapping
│
├── types/
│   └── youtube.ts                # TypeScript types for YouTube API responses
│
├── public/                       # Static files (favicon, og-image, etc.)
│
├── .env.local                    # Local environment variables (never commit)
├── .env.example                  # Template showing required env vars
├── next.config.ts                # Next.js configuration
├── next-sitemap.config.js        # Sitemap generation config
├── tailwind.config.ts            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
├── .eslintrc.json                # ESLint rules
├── .prettierrc                   # Prettier formatting rules
└── package.json
```

---

## 5. Data Flow — How Videos Appear Automatically

### Step 1 — Playlist config (you define once)

```typescript
// config/playlists.ts
export const PLAYLISTS = [
  {
    id: 'PLxxxxxxxxxxxxxxxxxxxxxxxx',   // from YouTube Studio
    slug: 'horror-night',
    label: 'Horror Night',
    description: 'Weekly horror content every Friday night',
    color: '#8B0000',
  },
  {
    id: 'PLyyyyyyyyyyyyyyyyyyyyyyyy',
    slug: 'shorts',
    label: 'Shorts',
    description: 'Quick horror clips under 60 seconds',
    color: '#FF4500',
  },
]
```

### Step 2 — YouTube API fetch (runs on server, cached)

```typescript
// lib/youtube.ts
'use cache'
import { cacheTag, cacheLife } from 'next/cache'
import { google } from 'googleapis'

const youtube = google.youtube({
  version: 'v3',
  auth: process.env.YOUTUBE_API_KEY,
})

export async function getPlaylistVideos(playlistId: string) {
  cacheTag(`playlist-${playlistId}`)   // tag for targeted revalidation
  cacheLife('hours')                    // cache for 1 hour

  const response = await youtube.playlistItems.list({
    part: ['snippet', 'contentDetails'],
    playlistId,
    maxResults: 50,
  })
  return response.data.items ?? []
}
```

### Step 3 — Cache revalidation (triggered hourly by Cloudflare Cron)

```typescript
// app/api/revalidate/route.ts
import { revalidateTag } from 'next/cache'
import { PLAYLISTS } from '@/config/playlists'

export async function GET(request: Request) {
  const secret = request.headers.get('x-revalidate-secret')

  if (secret !== process.env.REVALIDATE_SECRET) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Revalidate all playlist caches
  for (const playlist of PLAYLISTS) {
    revalidateTag(`playlist-${playlist.id}`)
  }

  return Response.json({ revalidated: true, timestamp: Date.now() })
}
```

### Step 4 — Cloudflare Cron hits the endpoint every hour

```json
// wrangler.toml (Cloudflare config)
[triggers]
crons = ["0 * * * *"]   // every hour
```

**Result:** Your friend posts a new video to a playlist on YouTube. Within 1 hour, the website automatically shows it under the correct category. No manual work, no redeployment.

---

## 6. Environment Variables

```bash
# .env.local (never commit this file to GitHub)

# YouTube Data API v3 key from Google Cloud Console
YOUTUBE_API_KEY=AIzaSyxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Secret token to protect the /api/revalidate endpoint
# Generate with: openssl rand -hex 32
REVALIDATE_SECRET=a8f3d2c1e9b7a4f6d8e2c5b9a3f7d1e4c8b2a6

# Your channel ID (found in YouTube Studio → Settings → Channel)
YOUTUBE_CHANNEL_ID=UCxxxxxxxxxxxxxxxxxxxxxxxxxx
```

```bash
# .env.example (commit this file — shows what vars are needed, no real values)
YOUTUBE_API_KEY=
REVALIDATE_SECRET=
YOUTUBE_CHANNEL_ID=
```

These variables are set in the Cloudflare Pages dashboard under Settings → Environment Variables for production.

---

## 7. SEO Strategy

### 7.1 Dynamic metadata per page

Every page generates its own `<title>` and `<meta>` tags from YouTube data:

```typescript
// app/story/[id]/page.tsx
export async function generateMetadata({ params }) {
  const video = await getVideo(params.id)
  return {
    title: `${video.title} | AfnanTheHorrorWorldBD`,
    description: video.description.slice(0, 160),
    openGraph: {
      title: video.title,
      images: [{ url: video.thumbnail.high.url }],
      type: 'video.other',
    },
  }
}
```

### 7.2 VideoObject JSON-LD (Google rich results)

```typescript
// Placed inside each /story/[id]/page.tsx
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'VideoObject',
  name: video.title,
  description: video.description,
  thumbnailUrl: video.thumbnail.high.url,
  uploadDate: video.publishedAt,
  embedUrl: `https://www.youtube.com/embed/${video.id}`,
  publisher: {
    '@type': 'Organization',
    name: 'AfnanTheHorrorWorldBD',
  },
}
```

This enables Google Video rich results — video thumbnails appearing directly in Google search results, which significantly increases click-through rates.

### 7.3 Sitemap

```javascript
// next-sitemap.config.js
module.exports = {
  siteUrl: 'https://afnanhorrorworld.com',
  generateRobotsTxt: true,
  changefreq: 'hourly',
  priority: 0.8,
}
```

---

## 8. Performance Strategy

### Core Web Vitals targets

| Metric | Target | How achieved |
|---|---|---|
| LCP (Largest Contentful Paint) | < 2.5s | ISR pre-built HTML + next/image thumbnails |
| FID / INP (Interaction) | < 100ms | Minimal client JS, React Server Components |
| CLS (Layout Shift) | < 0.1 | Fixed image dimensions on all thumbnails |
| TTFB (Time to First Byte) | < 50ms | Cloudflare edge cache serving pre-built HTML |

### Image optimisation

```typescript
// next/image handles all thumbnail optimisation automatically
<Image
  src={video.thumbnail.high.url}
  alt={video.title}
  width={480}
  height={270}              // maintains 16:9 aspect ratio — prevents CLS
  placeholder="blur"        // shows blurred placeholder while loading
  blurDataURL={blurUrl}
  priority={isAboveFold}    // only preload above-the-fold images
/>
```

Add `images.remotePatterns` in `next.config.ts` to allow YouTube thumbnail domains (`i.ytimg.com`).

### Font loading

```typescript
// app/layout.tsx — loads fonts from Google Fonts with zero layout shift
import { Creepster, Outfit } from 'next/font/google'

const creepster = Creepster({ subsets: ['latin'], weight: '400', variable: '--font-display' })
const outfit = Outfit({ subsets: ['latin'], variable: '--font-sans' })
```

---

## 9. Deployment Pipeline

```
Developer pushes code to GitHub
         │
         ▼
GitHub detects push
         │
         ├── Push to feature branch → Cloudflare Pages creates preview URL
         │                            (e.g. my-feature.afnan-horror.pages.dev)
         │
         └── Push to main branch → Cloudflare Pages runs:
                   1. npm install
                   2. npm run build
                   3. Deploys to production globally
                   4. Old version stays live until new one is ready
                   Total time: ~60–90 seconds
```

### Cloudflare Pages build settings

| Setting | Value |
|---|---|
| Framework preset | Next.js |
| Build command | `npx @opennextjs/cloudflare build` |
| Build output directory | `.open-next` |
| Node.js version | 22 |

### Cloudflare Cron (cache revalidation)

Set up in `wrangler.toml` — runs every hour and hits the `/api/revalidate` endpoint with the secret token. This ensures the site always has fresh YouTube data within 1 hour of your friend posting a new video.

---

## 10. Development Phases

### Phase 1 — Setup (Day 1)
- Create Next.js 16.2 project with TypeScript
- Install and configure Tailwind CSS v4
- Set up shadcn/ui
- Connect GitHub repository
- Set up Cloudflare Pages project (deploy a "Hello World" to verify pipeline works)
- Get YouTube API key from Google Cloud Console
- Add all environment variables

### Phase 2 — Core Data Layer (Day 2–3)
- Write `config/playlists.ts` with real playlist IDs
- Write `lib/youtube.ts` with all fetch functions
- Write TypeScript types in `types/youtube.ts`
- Write `/api/revalidate` endpoint
- Test YouTube API calls work correctly

### Phase 3 — Pages & Components (Day 4–8)
- Build `VideoCard` component
- Build `CategoryRow` component
- Build homepage (`/`)
- Build category page (`/category/[slug]`)
- Build individual video page (`/video/[id]`)
- Build search page (`/search`)
- Add skeleton loading states

### Phase 4 — SEO & Performance (Day 9–10)
- Add `generateMetadata()` to all pages
- Add JSON-LD VideoObject schema to video pages
- Set up next-sitemap
- Add `robots.txt`
- Test Core Web Vitals with Lighthouse
- Optimise all images

### Phase 5 — Polish & Launch (Day 11–14)
- Add Framer Motion animations
- Test on mobile devices
- Test with real YouTube channel data
- Set up Cloudflare Web Analytics
- Configure Cloudflare Cron for hourly revalidation
- Final deployment to production domain

---

*End of Technical Specification Document*

---

## 11. Color System

All colors are defined as CSS custom properties in `app/globals.css` so they work across the entire project with Tailwind CSS v4.

```css
/* app/globals.css */
:root {
  /* Backgrounds */
  --color-bg-page:       #0E0C0C;  /* Deep void — main page background */
  --color-bg-navbar:     #181414;  /* Crypt — navbar and footer */
  --color-bg-card:       #221C1C;  /* Hollow — card surfaces */
  --color-bg-elevated:   #2E2424;  /* Shadow — elevated cards, hover bg */

  /* Borders */
  --color-border:        #2E2424;  /* Default border */
  --color-border-strong: #3D3030;  /* Emphasized border */

  /* Accent — Crimson (action, danger, new) */
  --color-crimson:       #B91C1C;
  --color-crimson-hover: #7F1D1D;
  --color-crimson-light: #FEE2E2;  /* text on crimson bg */

  /* Accent — Amber (warmth, story, featured) */
  --color-amber:         #B45309;
  --color-amber-hover:   #78350F;
  --color-amber-light:   #FEF3C7;  /* text on amber bg */

  /* Typography */
  --color-text-primary:  #F0EBE3;  /* Bone white — headings, titles */
  --color-text-body:     #C8B89A;  /* Parchment — body text, descriptions */
  --color-text-muted:    #9A8E86;  /* Ash — secondary info */
  --color-text-subtle:   #5C5450;  /* Grave dust — timestamps, metadata */
}
```

**Tailwind v4 config** — extend the theme in `tailwind.config.ts`:

```typescript
theme: {
  extend: {
    colors: {
      'bg-page':    'var(--color-bg-page)',
      'bg-navbar':  'var(--color-bg-navbar)',
      'bg-card':    'var(--color-bg-card)',
      'crimson':    'var(--color-crimson)',
      'amber-dark': 'var(--color-amber)',
    }
  }
}
```

---

## 12. Typography System

### 12.1 Font Families

This website uses **two font families** — a horror display font for headings and a clean geometric sans-serif for everything else. Next.js `next/font` loads both from Google Fonts with zero layout shift.

#### Display Font — Creepster

**Creepster** — chosen because:
- The most iconic horror font on Google Fonts — dripping, melting letterforms inspired by 1950s horror movie posters
- Instantly communicates "this is horror content" before visitors read a single word
- Only 1 weight (400) — tiny bundle size, used sparingly at large sizes only (24px+)
- Used ONLY for: hero title, section headings, page titles (~5% of all text)

#### Body Font — Outfit

**Outfit** — chosen because:
- Modern geometric sans-serif with slightly rounded terminals — distinctive without being generic
- Excellent screen readability on dark backgrounds at all sizes, from 12px metadata to card titles
- Variable font with weights 100-900 — extremely flexible for all UI needs
- Clean enough to let the horror display font be the star, strong enough to carry all body content
- Used for: navbar, cards, body text, badges, buttons, descriptions, footer (~95% of all text)

**Future Bangla support:** When adding Bangla, add **Hind Siliguri** (body) and **Tiro Bangla** (display headings) alongside Outfit. Both are on Google Fonts and support `next/font`. The CSS variable system makes this a one-line change.

### 12.2 Font Loading

```typescript
// app/layout.tsx
import { Creepster, Outfit } from 'next/font/google'

const creepster = Creepster({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-display',
  display: 'swap',
})

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
})

// In the layout JSX:
// <html lang="en" className={`${creepster.variable} ${outfit.variable}`}>
```

```css
/* globals.css */
body { font-family: var(--font-sans); }              /* Outfit for everything */
h1, h2, .section-heading { font-family: var(--font-display); }  /* Creepster for headings */
```

### 12.3 ~~Language Switching~~ *(removed — English only for now)*

Bilingual support (Bangla/English toggle) has been **removed from scope** for now. The website will launch in **English only**. Bangla support can be added later using `next-intl` if needed.

**Current font setup:**

```typescript
// app/layout.tsx
<html lang="en" className={`${creepster.variable} ${outfit.variable}`}>
```

```css
body { font-family: var(--font-sans); }              /* Outfit */
h1, h2, .section-heading { font-family: var(--font-display); }  /* Creepster */
```

### 12.4 Font Size Scale

All sizes use a consistent type scale. In Tailwind v4 these map to utility classes.

| Token | Size | Line Height | Usage |
|---|---|---|---|
| `text-xs` | 12px | 1.4 | Timestamps, view counts, metadata |
| `text-sm` | 14px | 1.5 | Category badges, filter chips, secondary labels |
| `text-base` | 16px | 1.7 | Body text, story descriptions, card text |
| `text-lg` | 18px | 1.6 | Card titles on large cards |
| `text-xl` | 20px | 1.5 | Sub-section headings, sidebar titles |
| `text-2xl` | 24px | 1.4 | Section headings (h3) |
| `text-3xl` | 30px | 1.3 | Page titles (h2) |
| `text-4xl` | 36px | 1.2 | Major section headings (h2 on homepage) |
| `text-5xl` | 48px | 1.1 | Hero subtitle |
| `text-6xl` | 60px | 1.0 | Hero main title (desktop only) |
| `text-7xl` | 72px | 1.0 | Channel name in hero (desktop only) |

**Mobile scale** — headings reduce on small screens:

```css
/* Hero title: 72px desktop → 36px mobile */
.hero-title {
  font-size: clamp(2.25rem, 6vw, 4.5rem);
}

/* Section heading: 36px desktop → 24px mobile */  
.section-heading {
  font-size: clamp(1.5rem, 4vw, 2.25rem);
}
```

### 12.5 Font Weights

**Outfit weights** (body font — used for 95% of text):

| Weight | Usage |
|---|---|
| 300 (Light) | Long story descriptions, subtitles |
| 400 (Regular) | All body text, descriptions |
| 500 (Medium) | Card titles, navigation links, labels |
| 600 (SemiBold) | Section sub-headings, button text |
| 700 (Bold) | Major CTAs only |

**Creepster** has only weight 400. It derives its impact from size, not weight. Use it at `text-2xl` and above only.

---

## 13. Search Functionality

### 13.1 Navbar Search Behavior

1. User sees a search input in the navbar at all times on desktop
2. On mobile, a search icon button expands to full-width input on tap
3. User types keyword (e.g. "thursday" or "বৃহস্পতিবার")
4. User presses Enter OR clicks the search icon button
5. Browser navigates to `/search?q=thursday`
6. The search query persists in the URL — the page is shareable and bookmarkable

### 13.2 Search Page Behavior

1. On page load, the query is read from `searchParams.q`
2. All video data is already cached from the YouTube API (same ISR cache as homepage)
3. Client-side filtering runs: `videos.filter(v => v.title.toLowerCase().includes(q.toLowerCase()))`
4. Results render from the cache — no additional API call is made
5. As the user types in the on-page search bar, results update live (debounced 300ms)

### 13.3 Search Implementation

```typescript
// app/search/page.tsx
export default async function SearchPage({
  searchParams
}: {
  searchParams: { q?: string; category?: string }
}) {
  const allVideos = await getAllVideos()  // from ISR cache
  return <SearchClient videos={allVideos} initialQuery={searchParams.q} />
}

// components/search-client.tsx
'use client'
export function SearchClient({ videos, initialQuery }) {
  const [query, setQuery] = useState(initialQuery ?? '')

  const results = videos.filter(v =>
    v.title.toLowerCase().includes(query.toLowerCase())
  )
  // ...render results
}
```

### 13.4 Search Scope and Limitations

- Search is against **video titles only** (not descriptions)
- Case-insensitive, exact substring match
- Both Bangla and English queries work (searches raw title string as-is)
- No fuzzy matching, no synonym expansion, no typo correction — keeps it simple and predictable
- No server-side search API call — all filtering runs in the browser on pre-cached data
- Maximum searchable videos: up to 500 (YouTube API `maxResults` pagination limit per channel); for a growing channel this is more than enough
- No country filter — removed from search scope (not enough tagged videos at launch)

---

*Tech Spec updated April 2026 — added Color System (§11), Typography System (§12), Search Functionality (§13)*

---

## 14. YouTube Description Parsing

### 14.1 What Gets Parsed

The website parses two optional pieces of data from every YouTube video description. Both are opt-in — if absent, no broken state occurs.

### 14.2 Timestamp / Story List (optional)

**Detection:** The parser scans the description for lines matching the pattern:
`HH:MM:SS <any text>` or `H:MM:SS <any text>`

If 2 or more such lines are found, the story list feature activates for that video.

```typescript
// lib/parse-description.ts
export function parseTimestamps(description: string) {
  const lines = description.split('\n')
  const pattern = /^(\d{1,2}:\d{2}:\d{2})\s+(.+)/
  const stories = []

  for (const line of lines) {
    const match = line.match(pattern)
    if (match) {
      const [, time, title] = match
      const seconds = timeToSeconds(time)  // "00:18:58" → 1138
      stories.push({ time, title: title.trim(), seconds })
    }
  }
  return stories.length >= 2 ? stories : []  // need at least 2 to be useful
}

function timeToSeconds(time: string): number {
  const parts = time.split(':').map(Number)
  return parts[0] * 3600 + parts[1] * 60 + parts[2]
}
```

**Real example output from Afnan's description:**
```
[
  { time: "00:00:48", title: "First Story: দন্তদানব",   seconds: 48   },
  { time: "00:18:58", title: "2nd Story: পিশাচের খত",   seconds: 1138 },
  { time: "00:34:05", title: "3rd Story: পিশাচ দর্শন",  seconds: 2045 },
  { time: "00:48:17", title: "4th Story: পীরবাবার জ্বিন", seconds: 2897 },
  { time: "00:58:12", title: "5th Story: খাদক",          seconds: 3492 },
  { time: "01:10:17", title: "6th Story: বটতলী",         seconds: 4217 },
]
```

**Jump link format:**
`https://www.youtube.com/watch?v=VIDEO_ID&t=1138s`

**Where this appears:** Story page (`/story/[id]`) only. Never on cards.

**When absent:** Section is completely hidden. No empty state.

### 14.3 Country Tag (optional)

**Format:** Afnan adds `#country:CountryName` anywhere in the description — recommended at the very end.

```
#country:Nigeria
#country:United Kingdom
#country:Bangladesh   ← rarely needed since Bangladesh is the default assumption
```

**Detection:**
```typescript
export function parseCountry(description: string): string | null {
  const match = description.match(/#country:([a-zA-Z\s]+)/i)
  return match ? match[1].trim() : null
}
```

**Where this appears:** Story page and hero card only. Never on browse cards.

**When absent:** No country label shown anywhere. Silent default. No broken state.

**Effort for Afnan:** 3 words at the end of one description, only when the story is from outside Bangladesh. Completely optional.

### 14.4 Story Count Badge (derived from timestamps)

If `parseTimestamps()` returns results, the video card and story page can show a small badge: **"6 stories"**. This is computed from the timestamp array length — no extra work from Afnan.

**Where this appears:** Hero card (homepage) and story page. Not on regular browse cards — too much noise.

### 14.5 What Is NOT Parsed

The following features were considered and removed:

| Feature | Why removed |
|---|---|
| Submitter name per story | Would require Afnan to restructure every description |
| Submitter location | Same — unrealistic habit change |
| Per-story country (multiple per video) | Too granular, requires new format |
| World map / country aggregation | Depends on data that mostly doesn't exist |

These can be revisited if Afnan ever adopts a structured description format voluntarily.

---

*Tech Spec updated — added §14 Description Parsing, removed country aggregation, removed submitter data, clarified card vs story page data split*

---

## 15. React 19 Modern Features

Next.js 16.2 ships with React 19.2. Several React 19 features directly improve this project. Each one below is mapped to a specific component or situation in the codebase.

---

### 15.1 React Compiler — biggest win, zero code change

Next.js 16 has built-in stable support for React Compiler. Just enable it in your config.

```typescript
// next.config.ts
const nextConfig: NextConfig = {
  reactCompiler: true,
}
export default nextConfig
```

**What this means for this project:** You never write `useMemo`, `useCallback`, or `React.memo` anywhere in the codebase. The compiler analyses every component at build time and applies memoization automatically where needed. Instead of deciding where to add useMemo, useCallback, and memo, you write straightforward code and let the compiler optimize it.

Components that benefit most in this project:
- `VideoGrid` — re-renders when filter state changes, compiler memoizes unchanged cards automatically
- `SearchClient` — live filtering on every keystroke, compiler prevents unnecessary card re-renders
- `CategoryRow` — scroll arrow state changes won't re-render the entire video list

**Old approach (never write this):**
```tsx
const filteredVideos = useMemo(
  () => videos.filter(v => v.title.includes(query)),
  [videos, query]
)
```

**New approach (just write this):**
```tsx
const filteredVideos = videos.filter(v => v.title.includes(query))
```

The compiler handles the rest.

---

### 15.2 `use(Context)` — replaces useContext everywhere

The `use()` hook replaces useContext for consuming context data. It simplifies your code by handling context with a single, elegant solution.

**Where it applies in this project:** Any shared state passed via Context (for example, the active category, or mobile menu open state) uses `use()` instead of `useContext`.

```tsx
// Old React 18 way — never write this
const { activeCategory } = useContext(NavigationContext)

// React 19 way
const { activeCategory } = use(NavigationContext)
```

The key difference: `use()` can be called conditionally inside `if` blocks, which `useContext` cannot. This matters for components that only need context under certain conditions.

---

### 15.3 `useActionState` + `useFormStatus` — for the Submit page

The `useActionState` Hook streamlines form state management by consolidating multiple state updates into a single, easy-to-use API, providing seamless form submissions.

**Where it applies:** The `/submit` page form. Instead of three separate `useState` calls for loading, error, and success states, one `useActionState` handles all three.

**Old approach (3 separate states):**
```tsx
const [isLoading, setIsLoading] = useState(false)
const [error, setError] = useState<string | null>(null)
const [success, setSuccess] = useState(false)
```

**React 19 approach (one hook):**
```tsx
// components/submit-form/submit-form.tsx
'use client'
import { useActionState } from 'react'
import { submitStoryAction } from '@/app/actions/submit-story'

export function SubmitForm() {
  const [state, action, isPending] = useActionState(submitStoryAction, null)

  return (
    <form action={action}>
      <NameInput />
      <StoryTextarea />
      <SubmitButton />  {/* useFormStatus lives here */}
      {state?.error && <ErrorMessage message={state.error} />}
      {state?.success && <SuccessMessage />}
    </form>
  )
}
```

`useFormStatus` lives in the submit button child component — it reads the parent form's pending state without prop drilling:

```tsx
// components/submit-form/submit-button.tsx
'use client'
import { useFormStatus } from 'react-dom'

export function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Sending...' : 'Send Your Story'}
    </button>
  )
}
```

---

### 15.4 `useOptimistic` — not needed for this project

This hook is designed for apps where users create, update, or delete data and you want instant UI feedback before the server confirms. This website is almost entirely read-only — visitors watch videos, search, and browse. The only write action is the story submission which opens a `mailto:` link.

**Decision: do not use `useOptimistic` in this project.** Nothing to be optimistic about.

---

### 15.5 `use(promise)` with Suspense — for client data needs

The `use()` hook lets you read a value from a Promise or Context inside a render function — and it works with Suspense natively. The mental model: `use(promise)` suspends the component until the promise resolves, then returns the value.

**Where it applies:** The search page loads all video data from cache. Rather than `useEffect` + `useState` for loading state, `use()` + `<Suspense>` handles it declaratively:

```tsx
// app/search/page.tsx (Server Component — passes promise to client)
export default function SearchPage({ searchParams }) {
  const videosPromise = getAllVideos()  // returns Promise, does NOT await
  return (
    <Suspense fallback={<SearchSkeleton />}>
      <SearchClient videosPromise={videosPromise} query={searchParams.q} />
    </Suspense>
  )
}

// components/search-client/search-client.tsx
'use client'
export function SearchClient({ videosPromise, query }) {
  const videos = use(videosPromise)  // suspends until ready, no useEffect needed
  const results = videos.filter(v =>
    v.title.toLowerCase().includes(query?.toLowerCase() ?? '')
  )
  return <VideoGrid videos={results} />
}
```

The loading skeleton shows automatically while the promise resolves. No manual loading state.

---

### 15.6 `ref` as a prop — no more `forwardRef`

In React 19, refs are passed like any other prop. `forwardRef` is no longer needed.

**Where it applies:** The search input in the navbar needs a ref so it can be focused programmatically when the mobile search icon is tapped.

```tsx
// Old React 18 — never write this
const SearchInput = forwardRef<HTMLInputElement, Props>((props, ref) => {
  return <input ref={ref} {...props} />
})

// React 19 — just pass ref as a prop
function SearchInput({ ref, ...props }: Props & { ref?: React.Ref<HTMLInputElement> }) {
  return <input ref={ref} {...props} />
}
```

---

### 15.7 Summary — hooks decision table

| Hook / Feature | Use in this project? | Where |
|---|---|---|
| React Compiler | Yes — enable in config | Entire project, automatic |
| `use(Context)` | Yes | Any shared context consumption |
| `useActionState` | Yes | `/submit` page form |
| `useFormStatus` | Yes | Submit button component |
| `useOptimistic` | No | Not applicable (read-only site) |
| `use(promise)` | Yes | Search page client component |
| `ref` as prop | Yes | Navbar search input |
| `useMemo` | Never | Replaced by React Compiler |
| `useCallback` | Never | Replaced by React Compiler |
| `React.memo` | Never | Replaced by React Compiler |
| `forwardRef` | Never | Replaced by ref-as-prop |
| `useContext` | Never | Replaced by `use(Context)` |

---

*Tech Spec updated — added §15 React 19 Modern Features*
