"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, RocketIcon, LightningBoltIcon, StarIcon } from "@radix-ui/react-icons"
import type { Event } from "@/lib/events"

interface TimelineClientProps {
  events: Event[]
}

export default function TimelineClient({ events }: TimelineClientProps) {
  const [selectedCategory, setSelectedCategory] = useState("ALL")
  const [hoveredEvent, setHoveredEvent] = useState<string | null>(null)

  const filteredEvents =
    selectedCategory === "ALL" ? events : events.filter((event) => event.category === selectedCategory)

  const categories = [
    { name: "ALL", icon: CalendarIcon },
    { name: "2008-2013", icon: RocketIcon },
    { name: "2014-2017", icon: LightningBoltIcon },
    { name: "2018-2020", icon: StarIcon },
    { name: "2021-2024", icon: StarIcon },
  ]

  return (
    <div className="bg-background min-h-screen relative overflow-hidden">
      <section className="container mx-auto text-center py-12 px-4 relative md:py-16">
        <h1 className="bg-gradient-to-r bg-clip-text from-primary via-secondary to-primary font-bold text-balance text-transparent mb-4 text-4xl md:text-5xl lg:text-6xl">
          Web3 Timeline
        </h1>
        <p className="mx-auto text-muted-foreground text-base text-balance leading-relaxed max-w-2xl md:text-lg">
          Journey through the revolutionary history of blockchain, cryptocurrency, and decentralized technology
        </p>
      </section>

      <section className="container mx-auto mb-8 px-4 z-10 relative">
        <div className="flex flex-col gap-3">
          <h2 className="font-medium text-xs text-muted-foreground tracking-wider uppercase">Browse by era:</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <Button
                  key={category.name}
                  variant={selectedCategory === category.name ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`gap-1.5 ${
                    selectedCategory === category.name ? "shadow-lg shadow-primary/25" : "hover:border-primary/50"
                  }`}
                >
                  <Icon className="size-4" />
                  {category.name}
                </Button>
              )
            })}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-12 relative">
        <div className="mx-auto max-w-6xl">
          <div className="relative">
            <div className="bg-gradient-to-b from-primary via-secondary to-primary top-0 bottom-0 left-20 w-0.5 absolute md:left-28" />

            {/* Events */}
            <div className="space-y-8">
              {filteredEvents.map((event, index) => (
                <div
                  key={event.id}
                  className="grid gap-6 grid-cols-[auto_1fr] relative md:gap-10"
                  onMouseEnter={() => setHoveredEvent(event.id)}
                  onMouseLeave={() => setHoveredEvent(null)}
                >
                  <div className="flex flex-col pt-6 pr-4 w-16 items-end md:pr-6 md:w-20">
                    <div className="text-right">
                      <div className="font-bold text-xs text-primary md:text-sm">{event.month}</div>
                      <div className="bg-gradient-to-br bg-clip-text from-primary to-secondary font-bold text-transparent text-xl md:text-2xl">
                        {event.year}
                      </div>
                    </div>
                  </div>

                  <div className="top-6 left-20 -translate-x-1/2 absolute md:left-28">
                    <div className="relative">
                      <div
                        className={`size-4 rounded-full bg-gradient-to-br from-primary to-secondary border-4 border-background shadow-lg transition-all ${
                          hoveredEvent === event.id ? "scale-150 shadow-xl shadow-primary/50" : ""
                        }`}
                      />
                      {hoveredEvent === event.id && (
                        <div className="rounded-full bg-primary/30 inset-0 animate-ping absolute size-4" />
                      )}
                    </div>
                  </div>

                  <div className="pl-3">
                    <div className="mb-2 inline-flex">
                      <Badge
                        className={`px-2.5 py-1 text-xs font-medium transition-all ${
                          hoveredEvent === event.id
                            ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-lg scale-105"
                            : "bg-primary/10 text-primary"
                        }`}
                      >
                        {event.category}
                      </Badge>
                    </div>

                    <Card
                      className={`group border transition-all ${
                        hoveredEvent === event.id
                          ? "shadow-2xl shadow-primary/20 scale-[1.02] border-primary/50 -translate-y-1"
                          : "hover:shadow-xl hover:border-primary/30 hover:-translate-y-0.5"
                      }`}
                    >
                      <CardHeader className="space-y-2 p-4 pb-2">
                        <CardTitle className="font-bold text-lg md:text-xl group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-primary group-hover:to-secondary group-hover:text-transparent">
                          {event.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <CardDescription className="text-sm leading-relaxed text-foreground/70">
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
