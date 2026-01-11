'use client'

import { useState, useMemo } from 'react'
import { Filter } from './filter'
import { Event } from './event'
import { Empty } from './empty'
import type { Event as EventType } from '@/lib/events'

interface TimelineClientProps {
  events: EventType[]
}

export default function TimelineClient({ events }: TimelineClientProps) {
  const [selectedYears, setSelectedYears] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState('')

  const filteredEvents = useMemo(() => {
    let filtered = events

    // Filter by years
    if (selectedYears.length > 0) {
      filtered = filtered.filter((event) => selectedYears.includes(event.year))
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(query) ||
          event.description.toLowerCase().includes(query) ||
          event.tags.some((tag) => tag.toLowerCase().includes(query))
      )
    }

    return filtered
  }, [events, selectedYears, searchQuery])

  return (
    <div className="bg-background min-h-screen relative overflow-hidden">
      <section className="container mx-auto text-center py-8 px-4 relative md:py-12 lg:py-16">
        <h1 className="bg-gradient-to-r bg-clip-text from-primary via-secondary to-primary font-bold text-balance text-transparent mb-3 text-3xl md:text-4xl md:mb-4 lg:text-5xl xl:text-6xl">
          Web3 Timeline
        </h1>
        <p className="mx-auto text-muted-foreground text-sm text-balance leading-relaxed max-w-2xl md:text-base lg:text-lg">
          Journey through the revolutionary history of blockchain,
          cryptocurrency, and decentralized technology
        </p>
      </section>

      <Filter
        selectedYears={selectedYears}
        onYearsChange={setSelectedYears}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <section className="container mx-auto px-4 pb-8 relative md:pb-12">
        <div className="mx-auto max-w-6xl relative">
          {filteredEvents.length > 0 && (
            <div className="bg-gradient-to-b from-primary via-secondary to-primary top-0 bottom-0 left-14 w-0.5 absolute md:left-20 lg:left-28" />
          )}

          {/* Events */}
          <div className="space-y-6 md:space-y-8">
            {filteredEvents.length > 0 ? (
              <>
                {filteredEvents.map((event) => (
                  <Event key={event.id} event={event} />
                ))}
              </>
            ) : (
              <Empty
                searchQuery={searchQuery}
                selectedYears={selectedYears}
                onClearFilters={() => {
                  setSearchQuery('')
                  setSelectedYears([])
                }}
              />
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
