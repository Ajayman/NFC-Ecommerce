import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import Headers from "./components/headers";
import Footer from "./components/footer"
const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })
const _playfair = Playfair_Display({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Nina Fashion Collection - Premium Fashion Boutique",
  description: "Curated collections for all occasions, timeless elegance, and exquisite design",
  icons: {
    icon: [
      {
        url: "/Nina-logo-small.jpg",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/Nina-logo-small.jpg",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/Nina-logo-small.jpg",
        type: "image/svg+xml",
      },
    ],
    apple: "/Nina-logo-small.jpg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <Headers />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
