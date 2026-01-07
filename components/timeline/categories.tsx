import { Button } from '@/components/ui/button'
import {
  CalendarIcon,
  RocketIcon,
  LightningBoltIcon,
  StarIcon,
} from '@radix-ui/react-icons'

interface CategoriesProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
}

export function Categories({
  selectedCategory,
  onCategoryChange,
}: CategoriesProps) {
  const categories = [
    { name: 'ALL', icon: CalendarIcon },
    { name: '2008-2013', icon: RocketIcon },
    { name: '2014-2017', icon: LightningBoltIcon },
    { name: '2018-2020', icon: StarIcon },
    { name: '2021-2024', icon: StarIcon },
  ]

  return (
    <section className="container mx-auto mb-6 px-4 z-10 relative md:mb-8">
      <div className="flex flex-col gap-2 md:gap-3">
        <h2 className="font-medium text-xs text-muted-foreground tracking-wider uppercase">
          Browse by era:
        </h2>
        <div className="flex flex-wrap gap-1.5 md:gap-2">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <Button
                key={category.name}
                variant={
                  selectedCategory === category.name ? 'default' : 'outline'
                }
                onClick={() => onCategoryChange(category.name)}
                size="sm"
                className={`gap-1.5 text-xs md:text-sm h-8 md:h-9 ${
                  selectedCategory === category.name
                    ? 'shadow-lg shadow-primary/25'
                    : 'hover:border-primary/50'
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
  )
}
