import type React from "react"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "next-themes"
import { Header } from "@/components/header"
import "./globals.css"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Web3 Timeline | History of Blockchain Evolution",
  description: "Awesome timeline of web3 and blockchain technology evolution.",
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <Header />
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
