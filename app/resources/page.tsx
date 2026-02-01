'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ResourceCard } from '@/app/resources/resource-card'
import { CATEGORIES_LIST, RESOURCES, Category } from './constants'
import { Hero } from '../../components/hero'

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState(Category.All)

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

      {/* Filter Section */}
      <section className="container mx-auto mb-4 px-4">
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
                className="h-7 text-xs px-2.5 gap-1.5"
                onClick={() => setSelectedCategory(category.name)}
              >
                {Icon && <Icon className="size-3" />}
                {category.name}
              </Button>
            )
          })}
        </div>
      </section>

      {/* Resources Grid */}
      <section className="container mx-auto px-4 pb-8">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {filteredResources.map((resource, index) => (
            <ResourceCard
              key={resource.id}
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
