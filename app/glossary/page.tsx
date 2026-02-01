'use client'

import { useMemo, useState, useEffect } from 'react'
import glossary from '../../data/glossary.json'
import { Search, ArrowUpRight } from 'lucide-react'
import { Hero } from '../../components/hero'
import { ALPHABET } from './constant'
import { Terms } from './terms'
import { Overview } from './overview'

export default function Glossary() {
  const [query, setQuery] = useState('')
  const [activeLetter, setActiveLetter] = useState<string>('#')

  const { groupedByLetter, letters, availableLetters } = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    const filtered = (glossary as any[]).filter((item) => {
      if (!normalizedQuery) return true
      const term = (item.term ?? '').toLowerCase()
      const definition = (item.definition ?? '').toLowerCase()
      return (
        term.includes(normalizedQuery) || definition.includes(normalizedQuery)
      )
    })

    const sorted = [...filtered].sort((a, b) => a.term.localeCompare(b.term))

    const grouped = sorted.reduce((acc: Record<string, any[]>, item: any) => {
      const letter = (item.term?.[0] || '').toUpperCase()
      const key = /[A-Z]/.test(letter) ? letter : '#'
      if (!acc[key]) acc[key] = []
      acc[key].push(item)
      return acc
    }, {})

    const letterKeys = Object.keys(grouped).sort((a, b) => {
      if (a === '#') return -1
      if (b === '#') return 1
      return a.localeCompare(b)
    })

    return {
      groupedByLetter: grouped,
      letters: letterKeys,
      availableLetters: new Set(letterKeys),
    }
  }, [query])

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = letters
        .map((letter) => ({
          letter,
          element: document.getElementById(`letter-${letter}`),
        }))
        .filter((s) => s.element)

      for (const section of sections) {
        if (section.element) {
          const rect = section.element.getBoundingClientRect()
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveLetter(section.letter)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [letters])

  const scrollToLetter = (letter: string) => {
    const element = document.getElementById(`letter-${letter}`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section with Search */}
      <Hero
        title="Web3 Glossary"
        description="Your comprehensive guide to understanding blockchain, cryptocurrency, and decentralized technology terminology."
      >
        <div className="relative max-w-xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search terms..."
            className="w-full bg-muted/50 border border-border rounded-xl text-base py-3.5 pl-12 pr-4 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
          />
        </div>
      </Hero>

      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row">
          {/* Main Content */}
          <main className="flex-1 lg:pr-16 py-8 lg:py-12 lg:border-r lg:border-border order-2 lg:order-1">
            {letters.length === 0 ? (
              <div className="text-center py-24">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-6">
                  <Search className="size-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  No results found
                </h3>
                <p className="text-muted-foreground">
                  Try adjusting your search to find what you&apos;re looking
                  for.
                </p>
              </div>
            ) : (
              <Terms
                letters={letters}
                groupedByLetter={groupedByLetter}
                query={query}
              />
            )}
          </main>

          <Overview
            activeLetter={activeLetter}
            availableLetters={availableLetters}
            onLetterClick={scrollToLetter}
          />
        </div>
      </div>
    </main>
  )
}
