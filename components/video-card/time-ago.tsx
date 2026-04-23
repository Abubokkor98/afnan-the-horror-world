"use client"

import { formatTimeAgo } from "@/lib/format"

interface TimeAgoProps {
  date: string
}

export function TimeAgo({ date }: TimeAgoProps) {
  return <>{formatTimeAgo(date)}</>
}
