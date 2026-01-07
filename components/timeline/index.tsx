'use client'

import { useState } from 'react'
import { Categories } from './categories'
import { Event } from './event'
import type { Event as EventType } from '@/lib/events'

interface TimelineClientProps {
  events: EventType[]
}

export default function TimelineClient({ events }: TimelineClientProps) {
  const [selectedCategory, setSelectedCategory] = useState('ALL')

  const filteredEvents =
    selectedCategory === 'ALL'
      ? events
      : events.filter((event) => event.category === selectedCategory)

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

      <Categories
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <section className="container mx-auto px-4 pb-8 relative md:pb-12">
        <div className="mx-auto max-w-6xl relative">
          <div className="bg-gradient-to-b from-primary via-secondary to-primary top-0 bottom-0 left-14 w-0.5 absolute md:left-20 lg:left-28" />

          {/* Events */}
          <div className="space-y-6 md:space-y-8">
            {filteredEvents.map((event) => (
              <Event key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
