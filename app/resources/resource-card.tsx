import { Card } from '@/components/ui/card'
import { ExternalLinkIcon } from '@radix-ui/react-icons'
import { CATEGORIES_LIST } from './constants'

type Resource = {
  id: string
  title: string
  description: string
  url: string
  category: string
}

interface ResourceCardProps {
  resource: Resource
  index: number
  showCategory?: boolean
}

export function ResourceCard({
  resource,
  index,
  showCategory = true,
}: ResourceCardProps) {
  const categoryColor =
    CATEGORIES_LIST.find((c) => c.name === resource?.category)?.color ||
    'from-gray-500 to-slate-500'
  const { title, description, url, category } = resource
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block group"
      style={{ animationDelay: `${index * 30}ms` }}
    >
      <Card className="cursor-pointer h-full border hover:border-primary/50 transition-all duration-300 relative overflow-hidden backdrop-blur-sm group-hover:-translate-y-1 group-hover:shadow-xl group-hover:shadow-primary/20 rounded-sm pb-0">
        {/* Gradient top border */}
        <div
          className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${categoryColor} rounded-xl`}
        />

        {/* Animated gradient background on hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${categoryColor} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
        />

        {/* Content */}
        <div className="px-3 py-3 relative flex flex-col gap-2 h-full md:px-4 md:gap-2.5">
          {/* Title */}
          <h3 className="font-semibold text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h3>

          {/* Description */}
          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 flex-1">
            {description}
          </p>

          {/* Footer with category and link icon */}
          <div className="flex items-center justify-between pt-2 border-t border-border/50">
            {showCategory && (
              <span
                className={`text-[11px] font-medium bg-gradient-to-r ${categoryColor} bg-clip-text text-transparent`}
              >
                {category}
              </span>
            )}
            <ExternalLinkIcon
              className={`size-3.5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 ${!showCategory ? 'ml-auto' : ''}`}
            />
          </div>
        </div>
      </Card>
    </a>
  )
}
