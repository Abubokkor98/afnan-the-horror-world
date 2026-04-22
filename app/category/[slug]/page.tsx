export default function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center">
      <h1 className="text-4xl">Category</h1>
      <p className="mt-4 text-(--color-text-muted)">
        Stories in this category
      </p>
    </main>
  )
}
