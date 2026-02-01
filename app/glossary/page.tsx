'use client'

import { useMemo, useState } from 'react'
import glossary from '../../data/glossary.json'
import Link from 'next/link'
import { Search, Hash, Layers, FileText, Code, Wallet, Users, Shield, Zap, Globe, Database, Key, Lock, Gem, Coins, ArrowRight } from 'lucide-react'

const ALPHABET = ['#', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

// Icons for different letter sections
const letterIcons: Record<string, React.ReactNode> = {
  '#': <Hash className="size-10 stroke-[1.5]" />,
  'A': <Layers className="size-10 stroke-[1.5]" />,
  'B': <Database className="size-10 stroke-[1.5]" />,
  'C': <Code className="size-10 stroke-[1.5]" />,
  'D': <FileText className="size-10 stroke-[1.5]" />,
  'E': <Zap className="size-10 stroke-[1.5]" />,
  'F': <Coins className="size-10 stroke-[1.5]" />,
  'G': <Globe className="size-10 stroke-[1.5]" />,
  'H': <Shield className="size-10 stroke-[1.5]" />,
  'I': <Key className="size-10 stroke-[1.5]" />,
  'J': <Gem className="size-10 stroke-[1.5]" />,
  'K': <Lock className="size-10 stroke-[1.5]" />,
  'L': <Layers className="size-10 stroke-[1.5]" />,
  'M': <Wallet className="size-10 stroke-[1.5]" />,
  'N': <Gem className="size-10 stroke-[1.5]" />,
  'O': <Globe className="size-10 stroke-[1.5]" />,
  'P': <Users className="size-10 stroke-[1.5]" />,
  'Q': <FileText className="size-10 stroke-[1.5]" />,
  'R': <Zap className="size-10 stroke-[1.5]" />,
  'S': <Code className="size-10 stroke-[1.5]" />,
  'T': <Database className="size-10 stroke-[1.5]" />,
  'U': <Shield className="size-10 stroke-[1.5]" />,
  'V': <Key className="size-10 stroke-[1.5]" />,
  'W': <Wallet className="size-10 stroke-[1.5]" />,
  'X': <Lock className="size-10 stroke-[1.5]" />,
  'Y': <Coins className="size-10 stroke-[1.5]" />,
  'Z': <Zap className="size-10 stroke-[1.5]" />,
}

export default function Glossary() {
  const [query, setQuery] = useState('')

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

  const scrollToLetter = (letter: string) => {
    const element = document.getElementById(`letter-${letter}`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <main className="bg-background min-h-screen">
      {/* Sticky Navigation Bar */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            {/* Search Input */}
            <div className="relative w-64 shrink-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search terms here..."
                className="w-full bg-muted/50 border border-border rounded-lg outline-none text-sm py-2.5 pl-10 pr-4 placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
              />
            </div>

            {/* Alphabet Navigation */}
            <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
              {ALPHABET.map((letter) => {
                const isAvailable = availableLetters.has(letter)
                return (
                  <button
                    key={letter}
                    onClick={() => isAvailable && scrollToLetter(letter)}
                    disabled={!isAvailable}
                    className={`px-2 py-1 text-sm font-medium transition-colors ${
                      isAvailable
                        ? 'text-muted-foreground hover:text-foreground cursor-pointer'
                        : 'text-muted-foreground/30 cursor-default'
                    }`}
                  >
                    {letter}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Glossary Content */}
      <div className="container mx-auto px-4 py-8">
        {letters.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground">
              No terms match your search. Try a different keyword.
            </p>
          </div>
        ) : (
          <div className="space-y-0">
            {letters.map((letter, letterIndex) => (
              <div key={letter} id={`letter-${letter}`}>
                {/* Section divider */}
                {letterIndex > 0 && (
                  <div className="border-t border-border my-8" />
                )}
                
                {/* Letter Section */}
                <div className="py-8">
                  {groupedByLetter[letter].map((item: any, itemIndex: number) => (
                    <div
                      key={item.term}
                      className="flex gap-8 py-6 group"
                    >
                      {/* Left side - Icon (only show for first item in section) */}
                      <div className="w-32 shrink-0 flex justify-center">
                        {itemIndex === 0 && (
                          <div className="text-muted-foreground/50">
                            {letterIcons[letter] || <Hash className="size-10 stroke-[1.5]" />}
                          </div>
                        )}
                      </div>

                      {/* Right side - Content */}
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/glossary/${encodeURIComponent(item.term)}`}
                          className="block group/link"
                        >
                          <h2 className="text-2xl font-semibold text-foreground mb-3 group-hover/link:text-primary transition-colors flex items-center gap-2">
                            {item.term}
                            <ArrowRight className="size-5 opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all" />
                          </h2>
                          <p className="text-muted-foreground leading-relaxed max-w-2xl">
                            {item.definition}
                          </p>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
