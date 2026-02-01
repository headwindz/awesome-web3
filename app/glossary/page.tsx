'use client'

import { useMemo, useState, useEffect } from 'react'
import glossary from '../../data/glossary.json'
import Link from 'next/link'
import { Search, ArrowUpRight } from 'lucide-react'

const ALPHABET = ['#', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

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

    const grouped = sorted.reduce(
      (acc: Record<string, any[]>, item: any) => {
        const letter = (item.term?.[0] || '').toUpperCase()
        const key = /[A-Z]/.test(letter) ? letter : '#'
        if (!acc[key]) acc[key] = []
        acc[key].push(item)
        return acc
      },
      {},
    )

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
      const sections = letters.map(letter => ({
        letter,
        element: document.getElementById(`letter-${letter}`)
      })).filter(s => s.element)

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
      <div className="border-b border-border">
        <div className="container mx-auto px-6 py-16 lg:py-24">
          <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-foreground mb-6 text-balance">
            Web3 Glossary
          </h1>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-8">
            Your comprehensive guide to understanding blockchain, cryptocurrency, and decentralized technology terminology.
          </p>
          {/* Search */}
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
        </div>
      </div>

      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row">
          {/* Main Content */}
          <main className="flex-1 lg:pr-16 py-8 lg:py-12 lg:border-r lg:border-border order-2 lg:order-1">
            {letters.length === 0 ? (
              <div className="text-center py-24">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-6">
                  <Search className="size-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">No results found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search to find what you&apos;re looking for.
                </p>
              </div>
            ) : (
              <div className="space-y-16">
                {letters.map((letter) => (
                  <section key={letter} id={`letter-${letter}`} className="scroll-mt-8">
                    {/* Letter Header */}
                    <div className="flex items-center gap-4 mb-8">
                      <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-primary text-primary-foreground text-2xl font-bold">
                        {letter}
                      </div>
                      <div className="h-px flex-1 bg-border" />
                      <span className="text-sm text-muted-foreground">
                        {groupedByLetter[letter].length} {groupedByLetter[letter].length === 1 ? 'term' : 'terms'}
                      </span>
                    </div>

                    {/* Terms Grid */}
                    <div className="grid gap-4">
                      {groupedByLetter[letter].map((item: any) => (
                        <Link
                          key={item.term}
                          href={`/glossary/${encodeURIComponent(item.term)}`}
                          className="group relative p-6 rounded-2xl border border-border bg-card hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0">
                              <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                                {item.term}
                              </h3>
                              <p className="text-muted-foreground leading-relaxed line-clamp-2">
                                {item.definition}
                              </p>
                            </div>
                            <div className="shrink-0 w-10 h-10 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                              <ArrowUpRight className="size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            )}

            {/* Back to Top */}
            <div className="mt-16 pt-8 border-t border-border">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Back to top
              </button>
            </div>
          </main>

          {/* Sidebar - Fixed on desktop (Right Side) */}
          <aside className="lg:w-64 lg:shrink-0 py-8 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto lg:pl-16 order-1 lg:order-2">
            {/* Alphabet Navigation */}
            <nav className="space-y-1">
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-4 block">
                Navigate
              </span>
              <div className="flex flex-wrap lg:flex-col gap-1">
                {ALPHABET.map((letter) => {
                  const isAvailable = availableLetters.has(letter)
                  const isActive = activeLetter === letter
                  return (
                    <button
                      key={letter}
                      onClick={() => isAvailable && scrollToLetter(letter)}
                      disabled={!isAvailable}
                      className={`
                        relative px-3 py-1.5 text-sm font-medium rounded-lg transition-all text-left
                        ${isActive && isAvailable
                          ? 'bg-foreground text-background'
                          : isAvailable
                            ? 'text-foreground hover:bg-muted'
                            : 'text-muted-foreground/30 cursor-not-allowed'
                        }
                      `}
                    >
                      <span className="flex items-center gap-3">
                        <span className="w-6 text-center">{letter}</span>
                        {isAvailable && (
                          <span className="hidden lg:inline text-xs text-muted-foreground">
                            {groupedByLetter[letter]?.length || 0} terms
                          </span>
                        )}
                      </span>
                    </button>
                  )
                })}
              </div>
            </nav>
          </aside>
        </div>
      </div>
    </main>
  )
}
