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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "Afnan The Horror World - Feel The Real Fear With Us",
    template: "%s - Afnan The Horror World",
  },
  description:
    "Real horror stories narrated by Afnan bhai — from your neighbourhood, your village, and every dark corner of the world. Feel the real fear with us.",
  alternates: {
    canonical: "/",
  },
  authors: [{ name: "Afnan", url: "https://www.youtube.com/@AfnanTheHorrorWorldBD" }],
  openGraph: {
    siteName: "Afnan The Horror World",
    locale: "bn_BD",
    type: "website",
    images: [{ url: "/og-default.png", width: 1731, height: 909, alt: "Afnan The Horror World" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@AfnanHorrorWorld",
    creator: "@AfnanHorrorWorld",
  },
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
