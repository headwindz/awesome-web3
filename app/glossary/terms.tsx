interface GlossaryItem {
  term: string
  definition: string
}

interface TermsProps {
  letters: string[]
  groupedByLetter: Record<string, GlossaryItem[]>
  query?: string
}

function highlightText(text: string, query: string) {
  if (!query.trim()) return text

  const parts = text.split(new RegExp(`(${query})`, 'gi'))
  return (
    <>
      {parts.map((part, index) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark
            key={index}
            className="bg-primary/40 text-foreground font-medium rounded px-0.5"
          >
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  )
}

export function Terms({ letters, groupedByLetter, query = '' }: TermsProps) {
  return (
    <div className="space-y-16">
      {letters.map((letter) => (
        <section key={letter} id={`letter-${letter}`} className="scroll-mt-8">
          {/* Letter Header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-primary text-primary-foreground text-2xl font-bold">
              {letter}
            </div>
            <div className="h-px flex-1 bg-border" />
            <span className="text-sm text-muted-foreground">
              {groupedByLetter[letter].length}{' '}
              {groupedByLetter[letter].length === 1 ? 'term' : 'terms'}
            </span>
          </div>

          {/* Terms Grid */}
          <div className="grid gap-4">
            {groupedByLetter[letter].map((item) => (
              <div
                key={item.term}
                className="group relative p-6 rounded-2xl border border-border bg-card hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                      {highlightText(item.term, query)}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed line-clamp-2">
                      {highlightText(item.definition, query)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
