import type { Metadata } from "next"
import { Creepster, Oswald, Outfit } from "next/font/google"
import { Navbar } from "@/components/navbar/navbar"
import { Footer } from "@/components/footer/footer"
import { getSortedPlaylists } from "@/lib/youtube/playlist/get-sorted-playlists"

import "./globals.css"

const creepster = Creepster({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
})

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
})

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Afnan The Horror World | Feel The Real Fear With Us",
  description:
    "Real horror stories narrated by Afnan — from your neighbourhood, from every corner of the world.",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const playlists = await getSortedPlaylists().catch(() => [])

  return (
    <html
      lang="en"
      className={`${creepster.variable} ${oswald.variable} ${outfit.variable} antialiased`}
    >
      <body className="flex min-h-svh flex-col">
        <Navbar playlists={playlists} />
        <div className="flex-1">{children}</div>
        <Footer playlists={playlists} />
      </body>
    </html>
  )
}
