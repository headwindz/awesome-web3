import type React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import type { Event as EventType } from '@/lib/events'

interface EventProps {
  event: EventType
}

export function Event({ event }: EventProps) {
  const { month, year, title, mdxContent } = event

  return (
    <div className="group grid gap-4 grid-cols-[auto_1fr] relative md:gap-6 lg:gap-10">
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
        <Card className="border transition-all group-hover:shadow-2xl group-hover:shadow-primary/20 group-hover:scale-[1.01] group-hover:border-primary/50 group-hover:-translate-y-1 gap-1">
          <CardHeader className="px-3 md:px-4">
            <CardTitle className="font-bold text-base md:text-lg lg:text-xl group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-primary group-hover:to-secondary group-hover:text-transparent">
              {title}
            </CardTitle>
          </CardHeader>
          <CardContent className="px-3 md:px-4">
            <CardDescription className="text-xs md:text-sm leading-relaxed text-foreground/70 prose prose-sm prose-neutral max-w-none dark:prose-invert">
              {mdxContent}
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
