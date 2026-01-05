import fs from "fs"
import path from "path"
import matter from "gray-matter"

export type Event = {
  id: string
  date: string
  month: string
  year: string
  title: string
  description: string
  category: string
  slug: string
}

const eventsDirectory = path.join(process.cwd(), "events")

function getCategoryFromYear(year: number): string {
  if (year >= 2008 && year <= 2013) return "2008-2013"
  if (year >= 2014 && year <= 2017) return "2014-2017"
  if (year >= 2018 && year <= 2020) return "2018-2020"
  if (year >= 2021 && year <= 2024) return "2021-2024"
  return "2021-2024"
}

function getMonthName(month: number): string {
  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]
  return months[month - 1] || "JAN"
}

export function getAllEvents(): Event[] {
  const events: Event[] = []

  // Check if events directory exists
  if (!fs.existsSync(eventsDirectory)) {
    return events
  }

  // Read all year directories
  const years = fs.readdirSync(eventsDirectory).filter((file) => {
    const yearPath = path.join(eventsDirectory, file)
    return fs.statSync(yearPath).isDirectory()
  })

  for (const year of years) {
    const yearPath = path.join(eventsDirectory, year)
    const months = fs.readdirSync(yearPath).filter((file) => {
      const monthPath = path.join(yearPath, file)
      return fs.statSync(monthPath).isDirectory()
    })

    for (const month of months) {
      const monthPath = path.join(yearPath, month)
      const files = fs.readdirSync(monthPath).filter((file) => file.endsWith(".mdx"))

      for (const file of files) {
        const filePath = path.join(monthPath, file)
        const fileContents = fs.readFileSync(filePath, "utf8")
        const { data, content } = matter(fileContents)

        const slug = file.replace(/\.mdx$/, "")
        const eventDate = new Date(data.date)
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
        })
      }
    }
  }

  // Sort events by date (oldest first)
  events.sort((a, b) => {
    const dateA = new Date(`${a.year}-${a.month}-01`)
    const dateB = new Date(`${b.year}-${b.month}-01`)
    return dateA.getTime() - dateB.getTime()
  })

  return events
}
