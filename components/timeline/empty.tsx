interface EmptyProps {
  selectedYears: string[]
  onClearFilters: () => void
}

export function Empty({ selectedYears, onClearFilters }: EmptyProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="mb-6">
        <svg
          className="w-16 h-16 text-muted-foreground/40 mx-auto md:w-20 md:h-20"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <h3 className="text-xl font-semibold mb-2 md:text-2xl">
        No events found
      </h3>
      {selectedYears.length > 0 && (
        <button
          onClick={onClearFilters}
          className="px-4 py-2 text-sm font-medium text-primary border border-primary rounded-md hover:bg-primary/10 transition-colors"
        >
          Clear all filters
        </button>
      )}
    </div>
  )
}
