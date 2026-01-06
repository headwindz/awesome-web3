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
      <section className="container mx-auto text-center py-8 px-4 relative md:py-12 lg:py-16">
        <h1 className="bg-gradient-to-r bg-clip-text from-primary via-secondary to-primary font-bold text-balance text-transparent mb-3 text-3xl md:text-4xl md:mb-4 lg:text-5xl xl:text-6xl">
          Web3 Timeline
        </h1>
        <p className="mx-auto text-muted-foreground text-sm text-balance leading-relaxed max-w-2xl md:text-base lg:text-lg">
          Journey through the revolutionary history of blockchain, cryptocurrency, and decentralized technology
        </p>
      </section>

      <section className="container mx-auto mb-6 px-4 z-10 relative md:mb-8">
        <div className="flex flex-col gap-2 md:gap-3">
          <h2 className="font-medium text-xs text-muted-foreground tracking-wider uppercase">Browse by era:</h2>
          <div className="flex flex-wrap gap-1.5 md:gap-2">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <Button
                  key={category.name}
                  variant={selectedCategory === category.name ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.name)}
                  size="sm"
                  className={`gap-1.5 text-xs md:text-sm h-8 md:h-9 ${
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

      <section className="container mx-auto px-4 pb-8 relative md:pb-12">
        <div className="mx-auto max-w-6xl">
          <div className="relative">
            <div className="bg-gradient-to-b from-primary via-secondary to-primary top-0 bottom-0 left-14 w-0.5 absolute md:left-20 lg:left-28" />

            {/* Events */}
            <div className="space-y-6 md:space-y-8">
              {filteredEvents.map((event, index) => (
                <div
                  key={event.id}
                  className="grid gap-4 grid-cols-[auto_1fr] relative md:gap-6 lg:gap-10"
                  onMouseEnter={() => setHoveredEvent(event.id)}
                  onMouseLeave={() => setHoveredEvent(null)}
                >
                  <div className="flex flex-col pt-6 pr-3 w-12 items-end md:pr-4 md:w-16 lg:pr-6 lg:w-20">
                    <div className="text-right">
                      <div className="font-bold text-[10px] text-primary md:text-xs">{event.month}</div>
                      <div className="bg-gradient-to-br bg-clip-text from-primary to-secondary font-bold text-transparent text-lg md:text-xl lg:text-2xl">
                        {event.year}
                      </div>
                    </div>
                  </div>

                  <div className="top-6 left-14 -translate-x-1/2 absolute md:left-20 lg:left-28">
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

                  <div className="pl-2 md:pl-3">
                    <div className="mb-2 inline-flex">
                      <Badge
                        className={`px-2 py-0.5 text-[10px] md:text-xs font-medium transition-all md:px-2.5 md:py-1 ${
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
                      <CardHeader className="space-y-2 p-3 pb-2 md:p-4">
                        <CardTitle className="font-bold text-base md:text-lg lg:text-xl group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-primary group-hover:to-secondary group-hover:text-transparent">
                          {event.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-3 pt-0 md:p-4 md:pt-0">
                        <CardDescription className="text-xs md:text-sm leading-relaxed text-foreground/70">
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
