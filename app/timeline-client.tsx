"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Event } from "@/lib/events"

interface TimelineClientProps {
  events: Event[]
}

export default function TimelineClient({ events }: TimelineClientProps) {
  const [selectedCategory, setSelectedCategory] = useState("ALL")
  const [hoveredEvent, setHoveredEvent] = useState<string | null>(null)

  const filteredEvents =
    selectedCategory === "ALL" ? events : events.filter((event) => event.category === selectedCategory)

  const categories = ["ALL", "2008-2013", "2014-2017", "2018-2020", "2021-2024"]

  return (
    <div className="bg-background min-h-screen relative overflow-hidden">
      {/* Hero Section */}
      <section className="container mx-auto text-center py-16 px-4 relative md:py-24">
        <h1 className="bg-gradient-to-r bg-clip-text from-primary via-secondary to-primary font-bold text-balance text-transparent mb-6 text-5xl md:text-6xl lg:text-7xl">
          Web3 Timeline
        </h1>
        <p className="mx-auto text-muted-foreground text-lg text-balance leading-relaxed max-w-2xl md:text-xl">
          Journey through the revolutionary history of blockchain, cryptocurrency, and decentralized technology
        </p>
      </section>

      {/* Filter Section */}
      <section className="container mx-auto mb-12 px-4 z-10 relative">
        <div className="flex flex-col gap-4">
          <h2 className="font-medium text-sm text-muted-foreground tracking-wider uppercase">Browse by era:</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={`${
                  selectedCategory === category ? "shadow-lg shadow-primary/25" : "hover:border-primary/50"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-16 relative">
        <div className="mx-auto max-w-5xl">
          <div className="relative">
            <div className="bg-gradient-to-b from-primary via-secondary to-primary top-0 bottom-0 left-24 w-0.5 absolute md:left-32" />

            {/* Events */}
            <div className="space-y-12">
              {filteredEvents.map((event, index) => (
                <div
                  key={event.id}
                  className="grid gap-8 grid-cols-[auto_1fr] relative md:gap-12"
                  onMouseEnter={() => setHoveredEvent(event.id)}
                  onMouseLeave={() => setHoveredEvent(null)}
                >
                  <div className="flex flex-col pt-8 pr-6 w-20 items-end md:pr-8 md:w-24">
                    <div className="text-right">
                      <div className="font-bold text-sm text-primary md:text-base">{event.month}</div>
                      <div className="bg-gradient-to-br bg-clip-text from-primary to-secondary font-bold text-transparent text-2xl md:text-3xl">
                        {event.year}
                      </div>
                    </div>
                  </div>

                  <div className="top-8 left-24 -translate-x-1/2 absolute md:left-32">
                    <div className="relative">
                      <div
                        className={`size-5 rounded-full bg-gradient-to-br from-primary to-secondary border-4 border-background shadow-lg ${
                          hoveredEvent === event.id ? "scale-150 shadow-xl shadow-primary/50" : ""
                        }`}
                      />
                      {hoveredEvent === event.id && (
                        <div className="rounded-full bg-primary/30 inset-0 animate-ping absolute size-5" />
                      )}
                    </div>
                  </div>

                  <div className="pl-4">
                    <div className="mb-3 inline-flex">
                      <Badge
                        className={`px-3 py-1.5 text-xs md:text-sm font-medium ${
                          hoveredEvent === event.id
                            ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-lg scale-105"
                            : "bg-primary/10 text-primary"
                        }`}
                      >
                        {event.category}
                      </Badge>
                    </div>

                    <Card
                      className={`group border-2 ${
                        hoveredEvent === event.id
                          ? "shadow-2xl shadow-primary/20 scale-[1.02] border-primary/50 -translate-y-1"
                          : "hover:shadow-xl hover:border-primary/30 hover:-translate-y-0.5"
                      }`}
                    >
                      <CardHeader className="space-y-3">
                        <CardTitle className="font-bold text-xl md:text-2xl group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-primary group-hover:to-secondary group-hover:text-transparent">
                          {event.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-sm leading-relaxed text-foreground/70 md:text-base">
                          {event.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
