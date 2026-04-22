export default function StoryLoading() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center">
      <div className="aspect-video w-full max-w-2xl animate-pulse rounded-lg bg-(--color-bg-elevated)" />
      <div className="mt-4 h-6 w-72 animate-pulse rounded bg-(--color-bg-elevated)" />
    </main>
  )
}
