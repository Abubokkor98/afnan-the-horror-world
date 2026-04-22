# AfnanTheHorrorWorldBD — Pages, Sections & Features

**Document Type:** Product Specification  
**Version:** 1.0 | April 2026  
**Scope:** All website pages, every landing page section, and full feature list per section/page

---

## Table of Contents

1. [Website Pages Overview](#1-website-pages-overview)
2. [Page 1 — Homepage (/)](#2-homepage)
3. [Page 2 — All Stories (/stories)](#3-all-stories)
4. [Page 3 — Category Page (/category/[slug])](#4-category-page)
5. [Page 4 — Story Page (/story/[id])](#5-story-page)
6. [Page 5 — Submit a Story (/submit)](#6-submit-a-story)
7. [Page 6 — About (/about)](#7-about-page)
8. [Page 7 — Search (/search)](#8-search-page)

---

## 1. Website Pages Overview

| # | Page | Route | Type | Purpose |
|---|---|---|---|---|
| 1 | Homepage | `/` | ISR (1hr) | Entry point — all categories, latest, featured |
| 2 | All Stories | `/stories` | ISR (1hr) | Complete archive of every video |
| 3 | Category | `/category/[slug]` | ISR (1hr) | All videos in one playlist |
| 4 | Story | `/story/[id]` | ISR (1hr) | Individual video player + details |
| 5 | Submit | `/submit` | Static | Story submission form |
| 6 | About | `/about` | Static | About Afnan and the platform |
| 7 | Search | `/search` | Client-side | Search by title keyword |

**Total: 7 pages**

---

## 2. Homepage (/)

The homepage is the most important page. It must immediately communicate what the platform is, show the latest content, and guide visitors to the right category. It contains **10 sections** in order from top to bottom.

---

### Section 1 — Sticky Navbar

**Position:** Fixed top, full width, z-index highest  
**Behavior:** Starts semi-transparent over the hero. Becomes fully opaque with background `#181414` after scrolling 80px.

**Features:**
- Channel logo / wordmark on the far left (links to `/`)
- Navigation links in the centre: up to 5 category names visible. If there are more than 5 playlists, a "More" dropdown shows the rest
- Active state: current page's category link gets a crimson `#B91C1C` underline
- Search input field with a search icon button (magnifying glass) on the right side of the navbar. When the user types a keyword and presses Enter or clicks the button, they are redirected to `/search?q=<keyword>`
- "Submit Your Story" button — crimson background, links to `/submit`
- On mobile (below 768px): all nav links collapse into a hamburger menu. The search input becomes a search icon that expands into a full-width search bar when tapped. The Submit button remains visible.

---

### Section 2 — Hero

**Height:** 100vh (full screen height) on desktop, 90vh on mobile  
**Background:** The thumbnail of the latest uploaded video rendered as a blurred, darkened background image

**Features:**
- Large display heading: channel name "Afnan's Horror World" (or English equivalent when EN mode active)
- Tagline in parchment text: e.g. "Real horror stories — from your neighbourhood, from every corner of the world"
- Featured latest video card overlaid on the hero:
  - Video thumbnail (16:9, rounded corners)
  - "Latest Story" pill badge in crimson
  - Story title (large, bone-white)
  - Short excerpt from the video description (max 2 lines, parchment color)
  - Category badge showing which playlist it belongs to (amber)
  - Country badge ONLY if `#country:` tag found in description — otherwise not shown
  - Video duration badge
  - Story count badge if timestamps detected (e.g. "6 stories") — otherwise not shown
  - "Watch Now" button in crimson, links to `/story/[id]`
- YouTube subscriber count badge at bottom-left of hero (fetched from `channels.list`)
- Scroll indicator arrow animation at bottom centre

---

### Section 3 — Browse by Category

**Label:** "Browse by Category"

**Features:**
- One card per YouTube playlist (auto-generated from `config/playlists.ts`)
- Each category card shows:
  - Category name (large, bone-white)
  - Short description (1 line, ash color) — defined in `config/playlists.ts`
  - 3 mini thumbnails stacked diagonally as a preview
  - Story count badge: "23 stories"
  - Hover effect: card lifts and crimson border appears
  - Clicking the card navigates to `/category/[slug]`
- Cards displayed in a responsive grid: 4 columns on desktop, 2 on tablet, 1 on mobile (stacked full-width)
- "See all categories" (See all categories) link at the bottom right

---

### Section 4 — Latest Stories

**Label:** "Latest Stories"

**Features:**
- Horizontally scrollable row of the 10 most recently uploaded videos across ALL playlists (fetched from the channel Uploads playlist)
- Left/right arrow navigation buttons visible on desktop, swipe gesture on mobile
- Each story card shows:
  - Thumbnail (16:9)
  - Story title (2 lines max, truncated with ellipsis)
  - Category badge (amber pill, e.g. "Horror Night")
  - Time since upload: "3 days ago"
  - Video duration in corner of thumbnail
  - Play icon overlay on thumbnail hover
  - Clicking navigates to `/story/[id]`
- "View all stories →" link at the section header right side, links to `/stories`
- Section auto-updates on every hourly cache refresh

---

### Section 5 — Featured Story (Editor's Pick)

**Label:** "Featured Story — Editor's Pick"

**Features:**
- Cinematic large layout: thumbnail on left (60% width on desktop), text on right
- "Editor's Pick" badge in crimson at top
- Full story title in large display font
- 3-4 line excerpt from the story description, in parchment color, styled like a pull-quote
- Origin country with flag emoji: "Story origin: 🇳🇬 Nigeria"
- Video duration, view count, publish date
- "Listen to the Story" button linking to `/story/[id]`
- **How to update:** Afnan changes a single value in `config/featured.ts`:
  ```
  export const FEATURED_VIDEO_ID = 'dQw4w9WgXcW'
  ```
- On mobile: thumbnail stacks on top, text below (single column)

---

### Section 6 — Channel Stats & Trust

**Label:** "The platform in numbers"

**Features:**
- 3–4 stat cards in a row showing real data from the YouTube API:
  - Total videos published (from channel `videoCount`)
  - Total views across all videos (from channel `viewCount`)
  - Subscribers (from channel `subscriberCount`)
  - Years active (calculated from channel `publishedAt`)
- Below the stats: a short trust statement — "All stories are real. Afnan personally reviews every submission before narrating."
- Subtle, dark background variant (`#221C1C`) to create visual separation from surrounding sections
- Responsive: 2×2 grid on mobile

**Note:** The "Stories From Around the World" map/country section has been removed. Country tags (`#country:Nigeria`) are still supported but only appear on individual story pages — not aggregated globally.

---

### Section 7 — Fresh Drops (Uncategorized Videos)

**Label:** "Fresh Drops — Recently Added, Not Yet Categorized"

**Visibility:** This section ONLY renders if uncategorized videos exist. If all videos are in playlists, this section is hidden.

**Features:**
- Up to 6 video cards in a responsive grid
- Each card shows: thumbnail, title, upload date, duration
- A subtle amber dashed border around the section to visually distinguish it from categorized content
- Small tooltip/note: "These stories will be categorized soon"
- "View all published stories" links to `/stories?filter=uncategorized`

**Technical note:** Computed by comparing all videos in the Uploads playlist (UUxxxxxx) against the union of all custom playlist video IDs. The difference is the uncategorized set.

---

### Section 8 — Most Watched

**Label:** "Most Watched"

**Features:**
- Top 6 videos sorted by `statistics.viewCount` descending (fetched from `videos.list` with `part=statistics`)
- Cards displayed in 3-column grid on desktop, 2 on tablet, 1 on mobile
- Each card shows:
  - Thumbnail with view count badge overlaid at bottom-left: "120K views"
  - Story title
  - Category badge
  - Publish date
  - Rank badge (1st, 2nd, 3rd) with a small fire icon for top 3
- Updates on every hourly cache refresh
- "More popular stories →" links to `/stories?sort=views`

---

### Section 9 — Submit Your Story CTA

**Label:** "Could Your Story Be Here?"

**Features:**
- Full-width dark section with a slightly different background (`#221C1C`) to create visual separation
- Large atmospheric headline
- 3-step process shown as icons + text:
  - Step 1: "Send your true horror story by email"
  - Step 2: "Afnan reviews and verifies the story"
  - Step 3: "If selected, Afnan narrates it himself"
- Submission guidelines callout box:
  - Story must be real and true
  - Can be from anywhere in the world
  - Any language accepted (Bangla, English, etc.)
  - Include your name, location, and when it happened
- Large "Submit Story" button linking to `/submit`
- Note: "50+ stories submitted per month on average" (social proof if available)

---

### Section 10 — Footer

**Features:**
- Channel logo and tagline
- 4 columns on desktop:
  - Column 1: Navigation (Home, All Stories, About, Submit)
  - Column 2: Categories (all playlist links)
  - Column 3: Connect (YouTube subscribe button, social links)
  - Column 4: Info (About, Privacy note, Contact email)
- "Made with ❤️ from Bangladesh" (Made with love from Bangladesh)
- Trust statement: "All stories are real and verified by Afnan"
- Copyright: "© 2026 Afnan's Horror World"
- Collapses to 2-column on tablet, 1-column on mobile

---

## 3. All Stories (/stories)

**Purpose:** The complete archive of every video on the channel, including uncategorized ones. This is the "library" of the platform.

**Features:**

### Header
- Page title: "All Stories"
- Subtitle: Total story count, e.g. "156 stories total"

### Filter Bar (sticky below navbar)
- Category filter chips: "All", then one chip per playlist, plus "Uncategorized"
- Sort dropdown: Newest first / Oldest first / Most viewed / Least viewed
- Duration filter: Short (< 10 min) / Medium (10-30 min) / Long (> 30 min)
- Active filters shown as dismissible pills
- "Clear filters" link when any filter is active

**Country filter removed:** not enough videos have country tags to make this useful at launch. Can be added later if Afnan consistently uses `#country:` tags.

### Video Grid
- Responsive grid: 4 columns desktop, 3 columns tablet, 2 columns mobile
- Each card: thumbnail, title, category badge, duration, upload date, view count
- Infinite scroll OR "Load More" pagination button — show 24 per page
- Loading skeleton shown while data loads
- If no results match the filter: "No stories found" empty state with illustration

---

## 4. Category Page (/category/[slug])

**Purpose:** Shows all videos belonging to a specific YouTube playlist.

**Features:**

### Category Header
- Category name in large display font
- Category description (from `config/playlists.ts`)
- Total story count in this category
- "Last updated: 2 hours ago" — last refresh time

### Story Grid
- Same grid and card design as `/stories`
- Sort options: Newest / Most Viewed
- No category filter (already on a specific category)
- Pagination or infinite scroll

**What every story card shows (same everywhere — homepage, category, search, all stories):**
- Thumbnail (16:9, rounded corners)
- Story title (2 lines max, truncated)
- Category badge (amber pill)
- Duration badge (overlaid on thumbnail corner)
- View count
- Upload date (e.g. "3 days ago")
- Play icon overlay on hover

Cards are for browsing only — no timestamps, no country, no submitter info. All rich detail is on the story page.

### Related Categories
- At the bottom: "Other categories" row showing other category cards (excluding current)

---

## 5. Story Page (/story/[id])

**Purpose:** The individual video page. This is the SEO goldmine — every story gets its own URL, title, and description indexed by Google.

**Features:**

### Video Player Section
- Embedded YouTube iframe player (16:9, full width on mobile)
- Title of the story in large font below the player
- Category badge, publish date, view count, duration
- Origin country tag: "Story origin: 🇬🇭 Ghana"
- YouTube channel subscribe button

### Story Description
- Full YouTube video description rendered below the player
- "About this story" heading
- Formatted: line breaks preserved, hashtags stripped

### Story Metadata Sidebar (desktop) / Below description (mobile)
- Narrator: Afnan (with small avatar/icon)
- Category: clickable badge linking to `/category/[slug]`
- Upload date
- View count
- Country badge (optional): only shown if Afnan added `#country:Nigeria` (or any country name) at the end of the YouTube description. If absent, no country label appears at all. Most stories are from Bangladesh — no label is shown by default, no broken state.

**Country tag format (optional, Afnan adds this himself):**
```
#country:Nigeria
```
3 words at the end of any description. Parser checks for it. If found → shows flag + country name. If not found → nothing shown.

### Share Section
- "Share this story"
- Share buttons: WhatsApp, Facebook, Copy link
- Note: WhatsApp sharing is critical for Bangladeshi audience — this is the primary sharing platform

### Stories in This Episode (optional — timestamp section)

This section only renders if the video description contains timestamp entries. The parser auto-detects the pattern `HH:MM:SS Story title` or `H:MM Story title`. No action needed from Afnan — it either finds timestamps or it doesn't.

**When timestamps ARE present (like Afnan's existing descriptions):**
```
00:00:48 First Story: দন্তদানব
00:18:58 2nd Story: পিশাচের খত
00:34:05 3rd Story: পিশাচ দর্শন
```
The website renders:
- Heading: "Stories in this episode" with a count badge e.g. "6 stories"
- Numbered list: story title + "Jump to story →" button (links to `youtube.com/watch?v=ID&t=48s`)
- Visitors can skip directly to any story inside the video

**When timestamps are NOT present:**
- This section is completely hidden
- No empty state, no placeholder
- Story page looks perfectly normal without it

### Related Stories
- Heading: "More stories in this category"
- 4 cards from the same playlist
- If story is uncategorized: show 4 most recent stories instead

### JSON-LD Structured Data (invisible, for Google)
- VideoObject schema with title, description, thumbnail, uploadDate, embedUrl
- Enables Google Video rich results in search

---

## 6. Submit a Story (/submit)

**Purpose:** Guides potential story contributors through the submission process. Does NOT use a database or contact form — directs to email.

**Features:**

### Hero Section
- Headline: "Share Your Real Horror Story"
- Subheading explaining what the channel is about

### Eligibility Section
- "Could Your Story Get Selected?" heading
- Checklist:
  - ✅ The story must be real and true
  - ✅ You or someone you know experienced it directly
  - ✅ Stories from any country are accepted
  - ✅ Can be submitted in English or Bangla
  - ❌ Fictional or movie-inspired stories are not accepted

### How to Submit Section
- "How to Submit Your Story" heading
- Step 1: Prepare the following information
- Step 2: Send by email
- Step 3: Afnan reviews it (7–14 days)
- Step 4: If selected, Afnan will contact you

### What to Include (formatted template)
- Your name (or "Anonymous" if preferred)
- Your location (city, country)
- When did it happen?
- The full story in as much detail as possible
- Any witnesses?
- Can your name be mentioned in the video?

### Email CTA Button
- "Send Story by Email" button that opens `mailto:` with pre-filled subject line
- Email address displayed as text (not hidden)

### Submission Stats (optional, manual)
- "X stories submitted so far, Y published" — updated manually in config

---

## 7. About Page (/about)

**Purpose:** Builds trust and connection between the audience and Afnan.

**Features:**

### Who is Afnan
- Afnan's photo or illustrated avatar
- Short bio: who he is, where he is from
- Why he started this channel
- His curation philosophy: "I only tell real stories"

### The Process
- How stories are collected
- How Afnan verifies them
- How he decides which ones to narrate
- "I never fabricate anyone's story" — authenticity statement

### The Mission
- Preserving real stories from Bangladesh and around the world
- Giving a voice to people whose terrifying experiences deserve to be heard
- Building a community of story-sharers

### Community Reach
- Total videos published (fetched from YouTube API — live)
- Total views across all videos (fetched from YouTube API — live)
- Subscriber count (fetched from YouTube API — live)
- Channel launch year

### Contact / Collab
- Email for collaborations, press, or partnerships (separate from story submissions)

---

## 8. Search Page (/search)

**Purpose:** Find specific stories by title keyword. This is primarily triggered from the navbar search.

**How it works:**
1. User types a keyword (e.g. "thursday") in the navbar search input
2. User presses Enter or clicks the search button
3. Browser navigates to `/search?q=thursday`
4. The search page loads all video titles from the YouTube API (cached, same ISR cache)
5. Client-side filtering: filters the video list where `title.toLowerCase().includes(query.toLowerCase())`
6. Results render immediately from the cache — no new API call needed
7. The URL is shareable and bookmarkable: `/search?q=thursday`

**Features:**

### Search Bar (repeated on page)
- Pre-filled with the current query from the URL parameter
- User can modify and search again
- Live filtering as user types (debounced 300ms)

### Results Count
- "X stories found for 'thursday'"
- If 0 results: "No stories found. Try a different keyword." with a suggestion to browse categories

### Results Grid
- Same card design as `/stories` (thumbnail, title, category badge, duration, view count, date)
- Keyword highlighted in yellow within the story title where it matches
- Filter by category still available alongside search results

### Search Behavior Notes
- Search is case-insensitive
- Search works in both Bangla and English (searches the raw title string)
- If Afnan titles videos in Bangla, users should search in Bangla
- No fuzzy matching (exact substring match only) — keeps it simple and fast
- Search scope: video titles only (not descriptions) for speed and relevance

---

*End of Pages, Sections & Features Document*
