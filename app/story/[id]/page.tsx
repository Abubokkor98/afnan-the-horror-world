export default function StoryPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center">
      <h1 className="text-4xl">Story</h1>
      <p className="mt-4 text-(--color-text-muted)">
        Watch the full story
      </p>
    </main>
  )
}
