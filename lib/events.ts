import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'
import { evaluate } from 'next-mdx-remote-client/rsc'
import type { EvaluateResult } from 'next-mdx-remote-client/rsc'
import { mdxComponents } from './mdx-components'

export type Event = {
  id: string
  date: string
  month: string
  year: string
  title: string
  description: string
  category: string
  slug: string
  tags: string[]
  mdxContent: React.JSX.Element
}

const MONTHS = [
  'JAN',
  'FEB',
  'MAR',
  'APR',
  'MAY',
  'JUN',
  'JUL',
  'AUG',
  'SEP',
  'OCT',
  'NOV',
  'DEC',
] as const

const eventsDirectory = path.join(process.cwd(), 'events')

function getCategoryFromYear(year: number): string {
  if (year >= 2008 && year <= 2013) return '2008-2013'
  if (year >= 2014 && year <= 2017) return '2014-2017'
  if (year >= 2018 && year <= 2020) return '2018-2020'
  if (year >= 2021 && year <= 2024) return '2021-2024'
  return '2021-2024'
}

function getMonthName(month: number): string {
  return MONTHS[month - 1] || 'JAN'
}

export async function getAllEvents(): Promise<Event[]> {
  const events: Event[] = []

  try {
    await fs.access(eventsDirectory)
  } catch (error) {
    return events
  }

  const years = (await fs.readdir(eventsDirectory, { withFileTypes: true }))
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name)

  for (const year of years) {
    const yearPath = path.join(eventsDirectory, year)
    const months = (await fs.readdir(yearPath, { withFileTypes: true }))
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name)

    for (const month of months) {
      const monthPath = path.join(yearPath, month)
      const files = (await fs.readdir(monthPath)).filter((file) =>
        file.endsWith('.mdx')
      )

      for (const file of files) {
        const filePath = path.join(monthPath, file)
        const fileContents = await fs.readFile(filePath, 'utf8')
        const { data, content } = matter(fileContents)

        const { content: mdxContent } = await evaluate({
          source: content,
          options: {
            parseFrontmatter: false,
            scope: data,
          },
          components: mdxComponents,
        })

        const slug = file.replace(/\.mdx$/, '')
        const yearNum = parseInt(year)
        const monthNum = parseInt(month)

        events.push({
          id: `${year}-${month}-${slug}`,
          date: `${getMonthName(monthNum)} ${yearNum}`,
          month: getMonthName(monthNum),
          year: year,
          title: data.title || slug,
          description: content.trim(),
          category: getCategoryFromYear(yearNum),
          slug: `${year}/${month}/${slug}`,
          tags: Array.isArray(data.tags) ? data.tags : [],
          mdxContent,
        })
      }
    }
  }

  // Sort events by date (oldest first)
  events.sort((a, b) => {
    const dateA = new Date(parseInt(a.year), getMonthNameIndex(a.month), 1)
    const dateB = new Date(parseInt(b.year), getMonthNameIndex(b.month), 1)
    return dateA.getTime() - dateB.getTime()
  })

  return events
}

function getMonthNameIndex(monthName: string): number {
  const index = MONTHS.indexOf(monthName.toUpperCase() as any)
  return index >= 0 ? index : 0
}
