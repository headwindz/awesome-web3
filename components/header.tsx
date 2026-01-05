"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { GitHubLogoIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons"
import Link from "next/link"
import Image from "next/image"
import { useTheme } from "next-themes"

export function Header() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header className="border-b border-border sticky top-0 bg-background/80 backdrop-blur-xl z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image src="/icon.svg" alt="Web3 Logo" width={28} height={28} />
          <span className="font-semibold text-lg bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Web3 History
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" asChild className="hover:bg-primary/10">
            <Link href="/resources">Resources</Link>
          </Button>
          <Button variant="ghost" size="icon" asChild className="hover:bg-primary/10">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <GitHubLogoIcon className="size-5" />
            </a>
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")} 
            className="hover:bg-primary/10"
          >
            {mounted ? (
              resolvedTheme === "light" ? <MoonIcon className="size-5" /> : <SunIcon className="size-5" />
            ) : (
              <div className="size-5" />
            )}
          </Button>
        </div>
      </div>
    </header>
  )
}

