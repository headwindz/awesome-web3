import { Search, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface FilterProps {
  selectedYears: string[]
  onYearsChange: (years: string[]) => void
  searchQuery: string
  onSearchChange: (query: string) => void
}

export function Filter({
  selectedYears,
  onYearsChange,
  searchQuery,
  onSearchChange,
}: FilterProps) {
  const [inputValue, setInputValue] = useState(searchQuery)

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchChange(inputValue)
    }, 300)

    return () => clearTimeout(timer)
  }, [inputValue, onSearchChange])

  // Sync input value when searchQuery changes externally
  useEffect(() => {
    setInputValue(searchQuery)
  }, [searchQuery])
  const years = [
    '2008',
    '2009',
    '2010',
    '2011',
    '2012',
    '2013',
    '2014',
    '2015',
    '2016',
    '2017',
    '2018',
    '2019',
    '2020',
    '2021',
    '2022',
    '2023',
    '2024',
    '2025',
  ]

  const handleYearToggle = (year: string) => {
    if (selectedYears.includes(year)) {
      onYearsChange(selectedYears.filter((y) => y !== year))
    } else {
      onYearsChange([...selectedYears, year])
    }
  }

  const handleYearSelect = (year: string) => {
    if (year === 'ALL') {
      onYearsChange([])
    } else if (!selectedYears.includes(year)) {
      onYearsChange([...selectedYears, year])
    }
  }

  const clearAllYears = () => {
    onYearsChange([])
  }

  return (
    <section className="container mx-auto mb-6 px-4 z-10 relative md:mb-8">
      <div className="flex flex-col gap-3 md:gap-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:gap-4">
          {/* Search Input */}
          <div className="flex-1 relative">
            <Search className="top-1/2 left-3 absolute text-muted-foreground size-4 -translate-y-1/2" />
            <Input
              type="text"
              placeholder="Search events by title or content..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Year Selector */}
          <div className="w-full md:w-64">
            <Select value="" onValueChange={handleYearSelect}>
              <SelectTrigger>
                <SelectValue placeholder="Add year filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Years</SelectItem>
                {years.map((year) => (
                  <SelectItem
                    key={year}
                    value={year}
                    disabled={selectedYears.includes(year)}
                  >
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Selected Years Badges */}
        {selectedYears.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-muted-foreground">Filtering by:</span>
            {selectedYears.sort().map((year) => (
              <Badge
                key={year}
                variant="secondary"
                className="gap-1.5 cursor-pointer hover:bg-secondary/80"
                onClick={() => handleYearToggle(year)}
              >
                {year}
                <X className="size-3" />
              </Badge>
            ))}
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllYears}
              className="h-6 text-xs px-2"
            >
              Clear Year selections
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
