import type { Metadata } from "next"
import { Suspense } from "react"
import { Creepster, Oswald, Outfit } from "next/font/google"
import { Navbar } from "@/components/navbar/navbar"
import { Footer } from "@/components/footer/footer"
import { MotionProvider } from "@/components/providers/motion-provider"

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
      <body className="flex min-h-svh flex-col">
        <MotionProvider>
          <Suspense>
            <Navbar />
          </Suspense>
          <div className="flex-1">{children}</div>
          <Suspense>
            <Footer />
          </Suspense>
        </MotionProvider>
      </body>
    </html>
  )
}
