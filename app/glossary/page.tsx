 'use client'

import { useMemo, useState } from 'react'
import glossary from '../../data/glossary.json'
import Link from 'next/link'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeftIcon } from '@radix-ui/react-icons'

export default function Glossary() {
  const [query, setQuery] = useState('')

  const { groupedByLetter, totalCount, letters } = useMemo(() => {
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

    const letterKeys = Object.keys(grouped).sort()

    return {
      groupedByLetter: grouped,
      totalCount: sorted.length,
      letters: letterKeys,
    }
  }, [query])

  return (
    <main className="bg-background min-h-screen">
      {/* Intro section */}
      <section className="container mx-auto py-6 px-4 md:py-8">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/"
            className="text-xs text-muted-foreground mb-3 gap-1.5 inline-flex items-center hover:text-foreground"
          >
            <ArrowLeftIcon className="size-3.5" />
            Back to Timeline
          </Link>
          <p className="font-medium text-xs text-muted-foreground mb-2 tracking-[0.2em] uppercase">
            Reference
          </p>
          <h1 className="font-bold mb-3 text-3xl md:text-4xl">
            Web3 Glossary
          </h1>
          <p className="text-sm text-muted-foreground mb-4 max-w-2xl">
            A concise reference for important terms in Web3, blockchain, and
            decentralized technology. Browse the list below and click any term
            to see a deeper explanation and context.
          </p>

          {/* Search */}
          <div className="flex flex-col mb-4 gap-1">
            <label className="font-medium text-xs text-muted-foreground">
              Search terms
            </label>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by term or definition..."
              className="bg-background border border-border rounded-md outline-none text-sm w-full py-2 px-3 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
            />
            <p className="text-muted-foreground text-[11px]">
              Showing {totalCount} {totalCount === 1 ? 'entry' : 'entries'}
              {query.trim()
                ? ` for “${query.trim()}”`
                : ''}
            </p>
          </div>

          {/* Alphabet index */}
          {letters.length > 0 && (
            <div className="flex flex-wrap text-muted-foreground text-[11px] gap-1.5">
              {letters.map((letter) => {
                const label = letter === '#' ? '0-9' : letter
                return (
                  <a
                    key={letter}
                    href={`#letter-${label}`}
                    className="bg-background border border-border rounded-full py-1 px-2 hover:border-primary/50"
                  >
                    {label}
                  </a>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* Glossary list */}
      <section className="container mx-auto px-4 pb-10">
        <div className="mx-auto space-y-3 max-w-3xl">
          {letters.length === 0 ? (
            <p className="text-sm text-muted-foreground pt-4">
              No terms match your search. Try a different keyword.
            </p>
          ) : (
            letters.map((letter) => {
              const label = letter === '#' ? '0-9' : letter
              return (
                <div key={letter} className="space-y-3" id={`letter-${label}`}>
                  <div className="pt-4">
                    <div className="rounded-full font-semibold bg-primary/10 text-xs text-primary py-1 px-3 gap-2 inline-flex items-center">
                      <span>{label}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {groupedByLetter[letter].map((item: any) => (
                      <Card
                        key={item.term}
                        className="h-full bg-card/60 border-border/70 hover:border-primary/40"
                      >
                        <Link
                          href={`/glossary/${encodeURIComponent(item.term)}`}
                          className="h-full no-underline block"
                        >
                          <CardHeader className="h-full space-y-2">
                            <div className="flex gap-3 items-center justify-between">
                              <div className="flex min-w-0 gap-2 items-center">
                                <Badge variant="secondary" className="shrink-0">
                                  Term
                                </Badge>
                                <h2 className="font-semibold text-base text-primary truncate md:text-lg">
                                  {item.term}
                                </h2>
                              </div>
                              <span className="text-muted-foreground text-[11px] shrink-0">
                                Learn more →
                              </span>
                            </div>
                            <CardDescription className="text-sm line-clamp-2">
                              {item.definition}
                            </CardDescription>
                          </CardHeader>
                        </Link>
                      </Card>
                    ))}
                  </div>
                </div>
              )
            })
          )}
        </div>
      </section>
    </main>
  )
}
