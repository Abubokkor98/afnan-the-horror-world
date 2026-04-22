export default function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center">
      <h1 className="text-4xl">Search</h1>
      <p className="mt-4 text-(--color-text-muted)">
        Find a horror story
      </p>
    </main>
  )
}
