# Afnan Horror World — Project Rules

## Project
YouTube channel companion website for @AfnanTheHorrorWorldBD. All video data comes from YouTube Data API v3. No database. No backend server. No admin panel.

---

## Tech Stack
Next.js 16.2 · TypeScript (strict) · Tailwind CSS v4 · shadcn/ui · Remix Icons · Lucide React (if needed) · Framer Motion · googleapis · React Hook Form + Zod · Cloudflare Pages

Never use: Redux, Zustand, Prisma, any database, Express, styled-components, Emotion, CSS-in-JS, Material UI, Ant Design, axios, moment.js, `useMemo`, `useCallback`, `React.memo`, `forwardRef`, `useContext`.

---

## File Naming — Always
- All files and folders: **kebab-case** only
- **Never create `index.tsx` or `index.ts`** — name every file after what it does
- CORRECT: `video-card.tsx`, `category-badge.tsx`, `video-thumbnail.tsx`
- WRONG: `index.tsx`, `VideoCard.tsx`, `videoCard.tsx`
- Next.js route files are the only exception: `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`

---

## Server vs Client — Always
- Default: Server Component (no directive)
- Add `'use client'` only when the component uses `useState`, `useEffect`, `onClick`, or browser APIs
- Data fetching happens in Server Components only — never in Client Components
- Client Components receive data as props — they never fetch

---

## Wrappers — Always
Every `<div>`, `<article>`, `<section>` must have at least one className doing real work. If deleting it changes nothing visually — delete it. Use `<>...</>` Fragment for grouping siblings with no visual container.

---

## React 19 — Always
- `use(Context)` not `useContext`
- `ref` as a prop — not `forwardRef`
- React Compiler is ON (`reactCompiler: true` in next.config.ts) — never write `useMemo`, `useCallback`, or `React.memo`

---

## Colours — Always
```
--color-bg-page:       #0E0C0C
--color-bg-navbar:     #181414
--color-bg-card:       #221C1C
--color-bg-elevated:   #2E2424
--color-crimson:       #B91C1C   (CTAs, active nav, badges)
--color-crimson-hover: #7F1D1D
--color-amber:         #B45309   (category badges, secondary)
--color-amber-hover:   #78350F
--color-text-primary:  #F0EBE3   (headings)
--color-text-body:     #C8B89A   (body text)
--color-text-muted:    #9A8E86   (secondary)
--color-text-subtle:   #5C5450   (timestamps, metadata)
```
Never hardcode hex values in component files. Use CSS variables.

---

## Behaviour — Always
1. **Ask before coding** if the task is unclear — never assume and proceed
2. **Do exactly what was asked** — nothing extra, no unrequested improvements
3. **Surgical changes only** — touch only lines the task requires, do not reformat surrounding code or adjust unrelated comments
4. **State what "done" looks like** before starting any non-trivial task
5. **Never touch** `package.json`, `next.config.ts`, `tailwind.config.ts`, `globals.css`, `config/playlists.ts`, or any `.env` file unless explicitly asked
6. **Never create a component over 80 lines** — propose extracting a child component first

---

## Imports — Always
- Absolute imports with `@/` prefix only — never relative paths like `../../components`
- Never use `export default` for components — named exports only
- Exception: `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx` require default exports (Next.js)
