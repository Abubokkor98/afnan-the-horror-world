import type { Metadata } from "next"
import { Creepster, Oswald, Outfit } from "next/font/google"

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
  title: "Afnan's Horror World | Real Horror Stories",
  description:
    "Real horror stories narrated by Afnan — from your neighbourhood, from every corner of the world.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${creepster.variable} ${oswald.variable} ${outfit.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  )
}
