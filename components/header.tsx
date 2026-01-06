"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { GitHubLogoIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons"
import Link from "next/link"
import Image from "next/image"
import { useTheme } from "next-themes"
import { usePathname } from "next/navigation"

export function Header() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
  }, [])

  const navItems = [
    { href: "/", label: "History",  },
    { href: "/resources", label: "Resources", },
    { href: "/components", label: "Components" },
  ]

  const getNavLinkClassName = (isActive: boolean) =>
    `text-muted-foreground hover:text-primary transition-colors relative h-full flex items-center px-3 rounded-md ${
      isActive
        ? "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-gradient-to-r after:from-primary after:to-secondary"
        : ""
    }`

  return (
    <header className="border-b border-border sticky top-0 bg-background/80 backdrop-blur-xl z-50">
      <div className="container mx-auto px-4 h-14 flex justify-between">
        {/* left content */}
        <div className="flex items-center gap-2">
          <Image src="/icon.svg" alt="Awesome web3" width={28} height={28} />
          <span className="font-semibold text-lg bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent capitalize">
            Awesome web3
          </span>
          <nav className="flex items-center gap-1 ml-3 h-full">
            {navItems.map((item) => {
              const { href, label, } = item
              const isActive = pathname === href
              return <div key={href} className={getNavLinkClassName(isActive)}>
                <Link href={href}>{label}</Link>
              </div>
            }
            )}
          </nav>
        </div>
        {/* right content */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild className="hover:bg-primary/10">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <GitHubLogoIcon className="size-5" />
            </a>
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")} 
            className="hover:bg-primary/10 cursor-pointer"
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
