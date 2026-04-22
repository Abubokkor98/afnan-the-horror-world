export async function GET(request: Request) {
  const secret = request.headers.get("x-revalidate-secret")

  if (secret !== process.env.REVALIDATE_SECRET) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Revalidation logic will be added in Phase 2
  return Response.json({ revalidated: true, timestamp: Date.now() })
}
