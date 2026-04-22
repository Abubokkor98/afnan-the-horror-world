# Component Architecture Rules

## Folder Structure for Every New Component

When creating any component that has more than one visual piece, use a folder:

```
components/
  <component-name>/
    <component-name>.tsx      ← parent (assembles children, exports the component)
    <child-name>.tsx          ← each child has its own file
    <child-name>.tsx
```

Single-responsibility components that have no children can be a single file directly in `components/`.

## The 80-Line Rule

If any component file exceeds 80 lines, stop and extract a child component. No exceptions. Count the lines before finishing a component.

## Props Always Typed

Every component must define a TypeScript interface for its props:

```tsx
// CORRECT
interface VideoCardProps {
  video: Video
  priority?: boolean
}
export function VideoCard({ video, priority = false }: VideoCardProps) { ... }

// WRONG
export function VideoCard({ video, priority }: any) { ... }
export function VideoCard(props: any) { ... }
```

## No Pointless Wrappers

Every wrapper element must earn its place with at least one className that does real work. If deleting the wrapper changes nothing visually — delete it.

```tsx
// CORRECT — <article> carries card styling, children carry their own spacing
export function VideoCard({ video }: VideoCardProps) {
  return (
    <article className="bg-(--color-bg-card) rounded-lg border ...">
      <VideoThumbnail video={video} />
      <CategoryBadge category={video.category} />
      <VideoMeta video={video} />
    </article>
  )
}

// WRONG — nested divs with no purpose
export function VideoCard({ video }: VideoCardProps) {
  return (
    <div>
      <div>
        <VideoThumbnail video={video} />
        <div>
          <CategoryBadge category={video.category} />
          <VideoMeta video={video} />
        </div>
      </div>
    </div>
  )
}
```

Use React Fragments `<>...</>` when you need to return siblings with no visual container needed:
```tsx
return (
  <>
    <CategoryBadge category={video.category} />
    <VideoMeta video={video} />
  </>
)
```

## No Logic in JSX

Extract conditional logic and computed values above the return statement:

```tsx
// CORRECT
export function VideoMeta({ video }: VideoMetaProps) {
  const timeAgo = formatTimeAgo(video.publishedAt)
  const formattedViews = formatViewCount(video.viewCount)

  return (
    <div>
      <span>{formattedViews}</span>
      <span>{timeAgo}</span>
    </div>
  )
}

// WRONG
export function VideoMeta({ video }: VideoMetaProps) {
  return (
    <div>
      <span>{new Intl.NumberFormat('en', { notation: 'compact' }).format(video.viewCount)}</span>
      <span>{Math.floor((Date.now() - new Date(video.publishedAt).getTime()) / 86400000)} days ago</span>
    </div>
  )
}
```

## Shared Components Live in components/

If a component is used in more than one page, it lives in `components/`, not inside a route folder. Route-specific components (used only by one page) can live in the route folder.

## Export Style

Always use named exports. Never use default exports for components.

```tsx
// CORRECT
export function VideoCard(...) { ... }

// WRONG
export default function VideoCard(...) { ... }
```

Exception: `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx` — Next.js requires default exports for these.
