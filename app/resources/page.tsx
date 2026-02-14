'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { ResourceCard } from '@/app/resources/resource-card'
import { CATEGORIES_LIST, RESOURCES, Category } from './constants'
import { Hero } from '../../components/hero'

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState(Category.All)
  const [isSticky, setIsSticky] = useState(false)
  const filterRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting)
      },
      { threshold: [1], rootMargin: '-57px 0px 0px 0px' }
    )

    if (filterRef.current) {
      observer.observe(filterRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const filteredResources =
    selectedCategory === Category.All
      ? RESOURCES
      : RESOURCES.filter((resource) => resource.category === selectedCategory)

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <Hero
        title="Resources"
        description="Curated links to help you learn more about Web3, blockchain, and decentralized technology"
      />

      {/* Sentinel for sticky detection */}
      <div ref={filterRef} className="h-0" />

      {/* Filter Section */}
      <section
        className={`sticky top-14 z-10 py-4 mb-4 transition-all ${
          isSticky
            ? 'bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b'
            : ''
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-1.5">
            {CATEGORIES_LIST.map((category) => {
              const Icon = category.icon
              return (
                <Button
                  key={category.name}
                  variant={
                    selectedCategory === category.name ? 'default' : 'outline'
                  }
                  size="sm"
                  className="h-7 text-xs px-2.5 gap-1.5 cursor-pointer"
                  onClick={() => setSelectedCategory(category.name)}
                >
                  {Icon && <Icon className="size-3" />}
                  {category.name}
                </Button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="container mx-auto px-4 pb-8">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {filteredResources.map((resource, index) => (
            <ResourceCard
              key={index}
              resource={resource}
              index={index}
              showCategory={selectedCategory === Category.All}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
