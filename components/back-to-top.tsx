'use client'

import { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show button when page is scrolled down 300px
      setIsVisible(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (!isVisible) return null

  return (
    <button
      onClick={scrollToTop}
      className="cursor-pointer fixed bottom-8 right-8 inline-flex items-center justify-center w-12 h-12 rounded-full bg-foreground text-background hover:bg-foreground/90 shadow-lg transition-all z-50"
      aria-label="Back to top"
    >
      <ArrowUp className="size-5" />
    </button>
  )
}
