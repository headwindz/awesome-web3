import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { X, Check, ChevronDown } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

interface FilterProps {
  selectedYears: string[]
  onYearsChange: (years: string[]) => void
}

export function Filter({ selectedYears, onYearsChange }: FilterProps) {
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

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

  const clearAllYears = () => {
    onYearsChange([])
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <section className="container mx-auto mb-8 px-4 z-10 relative md:mb-12">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center gap-4">
          {/* Year Select with Multiple */}
          <div className="relative w-full max-w-2xl" ref={dropdownRef}>
            <Button
              variant="outline"
              onClick={() => setOpen(!open)}
              className="w-full justify-between h-auto min-h-[40px] py-2"
            >
              <div className="flex flex-wrap gap-1.5 flex-1 items-center">
                {selectedYears.length === 0 ? (
                  <span className="text-muted-foreground">
                    Select years to filter...
                  </span>
                ) : (
                  <>
                    {selectedYears.sort().map((year) => (
                      <Badge
                        key={year}
                        variant="secondary"
                        className="gap-1 text-xs"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleYearToggle(year)
                        }}
                      >
                        {year}
                        <X className="size-3" />
                      </Badge>
                    ))}
                  </>
                )}
              </div>
              <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>

            {open && (
              <div className="absolute z-50 w-full mt-2 bg-background border border-border rounded-md shadow-lg max-h-[300px] overflow-auto">
                <div className="sticky top-0 bg-background border-b border-border p-2 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {selectedYears.length} selected
                  </span>
                  {selectedYears.length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        clearAllYears()
                      }}
                      className="h-6 text-xs px-2"
                    >
                      Clear all
                    </Button>
                  )}
                </div>
                {years.map((year) => {
                  const isSelected = selectedYears.includes(year)
                  return (
                    <div
                      key={year}
                      onClick={() => handleYearToggle(year)}
                      className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-muted transition-colors"
                    >
                      <div
                        className={`flex h-4 w-4 items-center justify-center rounded-sm border border-primary ${
                          isSelected
                            ? 'bg-primary text-primary-foreground'
                            : 'opacity-50'
                        }`}
                      >
                        {isSelected && <Check className="h-3 w-3" />}
                      </div>
                      <span className="text-sm">{year}</span>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
