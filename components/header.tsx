"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { GitHubLogoIcon, MoonIcon, SunIcon, HamburgerMenuIcon, Cross1Icon } from "@radix-ui/react-icons"
import Link from "next/link"
import Image from "next/image"
import { useTheme } from "next-themes"
import { usePathname } from "next/navigation"

export function Header() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [mobileMenuOpen])

  const navItems = [
    { href: "/", label: "History",  },
    { href: "/resources", label: "Resources", },
    { href: "/components", label: "Components" },
  ]

  const handleNavClick = () => {
    setMobileMenuOpen(false)
  }

  const getNavLinkClassName = (isActive: boolean) =>
    `text-muted-foreground hover:text-primary transition-colors relative h-full flex items-center px-3 rounded-md ${
      isActive
        ? "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-gradient-to-r after:from-primary after:to-secondary"
        : ""
    }`

  const getMobileNavLinkClassName = (isActive: boolean) =>
    `block py-3 px-4 text-base rounded-md transition-colors ${
      isActive
        ? "bg-primary text-primary-foreground font-medium"
        : "text-muted-foreground hover:text-primary hover:bg-primary/10"
    }`

  return (
    <>
      <header className="border-b border-border sticky top-0 bg-background/80 backdrop-blur-xl z-50">
        <div className="container mx-auto px-4 h-14 flex justify-between items-center">
          {/* left content */}
          <div className="flex items-center gap-2 min-w-0">
            <Image src="/icon.svg" alt="Awesome web3" width={24} height={24} className="flex-shrink-0" />
            <span className="font-semibold text-base md:text-lg bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent capitalize truncate">
              Awesome web3
            </span>
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1 ml-3 h-full">
              {navItems.map((item) => {
                const { href, label } = item
                const isActive = pathname === href
                return (
                  <div key={href} className={getNavLinkClassName(isActive)}>
                    <Link href={href}>{label}</Link>
                  </div>
                )
              })}
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
            {/* Hamburger Menu Button - Mobile Only */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden hover:bg-primary/10"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <Cross1Icon className="size-5" /> : <HamburgerMenuIcon className="size-5" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed top-14 right-0 bottom-0 w-64 bg-background border-l border-border z-40 md:hidden transform transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="flex flex-col p-4 gap-2">
          {navItems.map((item) => {
            const { href, label } = item
            const isActive = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className={getMobileNavLinkClassName(isActive)}
                onClick={handleNavClick}
              >
                {label}
              </Link>
            )
          })}
        </nav>
      </div>
    </>
  )
}
