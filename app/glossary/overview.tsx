'use client'

import { ALPHABET } from './constant'

interface OverviewProps {
  activeLetter: string
  availableLetters: Set<string>
  onLetterClick: (letter: string) => void
}

export function Overview({
  activeLetter,
  availableLetters,
  onLetterClick,
}: OverviewProps) {
  return (
    <aside className="lg:w-30 lg:shrink-0 py-4 order-1 lg:order-2">
      <div className="lg:sticky lg:top-16 lg:pl-8">
        {/* Alphabet Navigation */}
        <nav className="space-y-1">
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-4 block">
            Overview
          </span>
          <div className="flex flex-wrap lg:flex-col gap-1">
            {ALPHABET.filter((letter) => availableLetters.has(letter)).map(
              (letter) => {
                const isActive = activeLetter === letter
                return (
                  <button
                    key={letter}
                    onClick={() => onLetterClick(letter)}
                    className={`
                        cursor-pointer relative px-2 py-1 text-sm font-medium rounded-lg transition-all text-left
                        ${
                          isActive
                            ? 'bg-foreground text-background'
                            : 'text-foreground hover:bg-muted'
                        }
                      `}
                  >
                    <span className="flex items-center gap-3">
                      <span className="w-6 text-center">{letter}</span>
                    </span>
                  </button>
                )
              }
            )}
          </div>
        </nav>
      </div>
    </aside>
  )
}
