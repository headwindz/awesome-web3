import type { ReactNode } from 'react'

interface HeroProps {
  title: string
  description: string
  children?: ReactNode
}

export function Hero({ title, description, children }: HeroProps) {
  return (
    <div className="container mx-auto px-6 pt-8 lg:pt-12">
      <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-foreground mb-4 text-balance">
        {title}
      </h1>
      <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-4">
        {description}
      </p>
      {children}
    </div>
  )
}
