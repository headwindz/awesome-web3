'use client'

import { useState, useRef, useEffect } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ChevronDown, ChevronUp } from 'lucide-react'
import type { Event as EventType } from '@/lib/events'

interface EventProps {
  event: EventType
}

export function Event({ event }: EventProps) {
  const { month, year, title, tags, mdxContent } = event
  const [isExpanded, setIsExpanded] = useState(true)
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            // Once visible, stop observing
            observer.unobserve(entry.target)
          }
        })
      },
      {
        rootMargin: '100px', // Start loading 100px before entering viewport
        threshold: 0.01,
      }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current)
      }
    }
  }, [])

  return (
    <div
      ref={cardRef}
      className="group grid gap-4 grid-cols-[auto_1fr] relative md:gap-6 lg:gap-10"
    >
      <div className="flex flex-col pt-6 pr-3 w-12 items-end md:pr-4 md:w-16 lg:pr-6 lg:w-20">
        <div className="text-right">
          <div className="font-bold text-[10px] text-primary md:text-xs">
            {month}
          </div>
          <div className="bg-gradient-to-br bg-clip-text from-primary to-secondary font-bold text-transparent text-lg md:text-xl lg:text-2xl">
            {year}
          </div>
        </div>
      </div>

      <div className="top-6 left-14 -translate-x-1/2 absolute md:left-20 lg:left-28">
        <div className="relative">
          <div className="size-4 rounded-full bg-gradient-to-br from-primary to-secondary border-4 border-background shadow-lg" />
        </div>
      </div>

      <div className="pl-2 md:pl-3">
        {isVisible ? (
          <Card className="border transition-all group-hover:shadow-2xl group-hover:shadow-primary/20 group-hover:border-primary/50 gap-1">
            <CardHeader className="px-3 md:px-4 flex flex-col gap-3 mb-1">
              <div className="flex flex-row items-center justify-between space-y-0 w-full">
                <CardTitle className="font-bold text-base md:text-lg lg:text-xl group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-primary group-hover:to-secondary group-hover:text-transparent flex-1 pr-2">
                  {title}
                </CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="cursor-pointer h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10 flex-shrink-0 -mt-1"
                  aria-label={isExpanded ? 'Collapse event' : 'Expand event'}
                >
                  {isExpanded ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </Button>
              </div>
              {tags && tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-[10px] px-2 py-0.5 md:text-xs"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </CardHeader>
            <CardContent className="px-3 md:px-4 pb-3 md:pb-4">
              <CardDescription
                className={`text-xs md:text-sm leading-relaxed text-foreground/70 prose prose-sm prose-neutral max-w-none dark:prose-invert transition-all duration-300 ${
                  isExpanded ? '' : 'line-clamp-8'
                }`}
              >
                {mdxContent}
              </CardDescription>
            </CardContent>
          </Card>
        ) : (
          <Card className="border gap-1 animate-pulse">
            <CardHeader className="px-3 md:px-4">
              <div className="h-6 bg-muted rounded w-3/4" />
            </CardHeader>
            <CardContent className="px-3 md:px-4 pb-3 md:pb-4">
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded" />
                <div className="h-4 bg-muted rounded w-5/6" />
                <div className="h-4 bg-muted rounded w-4/6" />
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
