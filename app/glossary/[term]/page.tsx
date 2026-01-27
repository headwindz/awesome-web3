import glossary from '../../../data/glossary.json'
import { notFound } from 'next/navigation'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import Link from 'next/link'

interface GlossaryDetailProps {
  params: Promise<{ term: string }>
}

export default async function GlossaryDetail({ params }: GlossaryDetailProps) {
  const { term } = await params
  const decodedTerm = decodeURIComponent(term)
  const item = glossary.find((g: any) => g.term === decodedTerm)

  if (!item) return notFound()

  return (
    <main className="bg-background min-h-screen">
      <section className="container mx-auto py-6 px-4 md:py-8">
        <div className="mx-auto space-y-4 max-w-2xl">
          <Link
            href="/glossary"
            className="text-xs text-muted-foreground inline-flex hover:text-primary"
          >
            ← Back to glossary
          </Link>
      <Card>
        <CardHeader>
              <CardTitle className="mb-2 text-3xl">{item.term}</CardTitle>
          <CardDescription className="text-lg mb-2">
            {item.definition}
          </CardDescription>
        </CardHeader>
        <CardContent>
              <div className="text-sm mb-4 leading-relaxed text-foreground/80">
                {item.details}
              </div>
        </CardContent>
      </Card>
    </div>
      </section>
    </main>
  )
}
