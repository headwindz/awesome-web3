"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeftIcon, ExternalLinkIcon } from "@radix-ui/react-icons"
import Link from "next/link"

type Resource = {
  id: string
  title: string
  description: string
  url: string
  category: string
}

const resources: Resource[] = [
  {
    id: "1",
    title: "Bitcoin Whitepaper",
    description: "The original Bitcoin paper by Satoshi Nakamoto",
    url: "https://bitcoin.org/bitcoin.pdf",
    category: "Documentation",
  },
  {
    id: "2",
    title: "Ethereum Whitepaper",
    description: "Vitalik Buterin's vision for Ethereum",
    url: "https://ethereum.org/en/whitepaper/",
    category: "Documentation",
  },
  {
    id: "3",
    title: "Ethereum Yellow Paper",
    description: "Technical specification of Ethereum",
    url: "https://ethereum.github.io/yellowpaper/paper.pdf",
    category: "Documentation",
  },
  {
    id: "4",
    title: "Introduction to Bitcoin, Web3 and Blockchain",
    description: "Comprehensive introduction to Web3 fundamentals",
    url: "https://www.web3brand.io/p/web3-101-materials",
    category: "Documentation",
  },
  {
    id: "5",
    title: "Binance Academy - Beginner Track",
    description: "Highly recommended beginner course by Binance",
    url: "https://academy.binance.com/en/track/beginner-track",
    category: "Courses",
  },
  {
    id: "6",
    title: "Binance Academy - Intermediate Track",
    description: "Intermediate level crypto concepts",
    url: "https://academy.binance.com/en/track/intermediate-track",
    category: "Courses",
  },
  {
    id: "7",
    title: "Web3 and Blockchain Fundamentals",
    description: "Coursera course on Web3 basics",
    url: "https://www.coursera.org/learn/web3-blockchain-fundamentals",
    category: "Courses",
  },
  {
    id: "8",
    title: "How to Get Into Blockchain",
    description: "Career guidance for blockchain professionals",
    url: "https://www.coursera.org/learn/how-to-get-into-blockchain/",
    category: "Courses",
  },
  {
    id: "9",
    title: "Bitcoin and Cryptocurrency Technologies",
    description: "In-depth technical cryptocurrency course",
    url: "https://www.coursera.org/learn/cryptocurrency",
    category: "Courses",
  },
  {
    id: "10",
    title: "Hackquest Learning Track",
    description: "Structured Web3 development learning path",
    url: "https://www.hackquest.io/learning-track",
    category: "Courses",
  },
  {
    id: "11",
    title: "Web3 University",
    description: "Free Web3 education platform",
    url: "https://www.web3.university/",
    category: "Courses",
  },
  {
    id: "12",
    title: "MIT: Blockchain and Money",
    description: "MIT open course by Gary Gensler",
    url: "https://ocw.mit.edu/courses/15-s12-blockchain-and-money-fall-2018/",
    category: "Courses",
  },
  {
    id: "13",
    title: "Stanford: Cryptocurrencies and Smart Contracts",
    description: "Stanford CS course on blockchain technology",
    url: "https://cs251.stanford.edu/",
    category: "Courses",
  },
  {
    id: "14",
    title: "Blockchain Technology and Application",
    description: "Technical course on blockchain systems",
    url: "http://zhenxiao.com/blockchain/",
    category: "Courses",
  },
  {
    id: "15",
    title: "CryptoZombies",
    description: "Learn Solidity by building a game",
    url: "https://cryptozombies.io/",
    category: "Learning Resources",
  },
  {
    id: "16",
    title: "Ethereum.org Learn",
    description: "Official Ethereum learning hub",
    url: "https://ethereum.org/en/learn/",
    category: "Learning Resources",
  },
  {
    id: "17",
    title: "Mastering Bitcoin",
    description: "Technical book explaining Bitcoin and how it works",
    url: "https://github.com/bitcoinbook/bitcoinbook",
    category: "Learning Resources",
  },
  {
    id: "18",
    title: "Hardhat",
    description: "Ethereum development environment",
    url: "https://hardhat.org/",
    category: "Developer Tools",
  },
  {
    id: "19",
    title: "Foundry",
    description: "Fast, portable Ethereum toolkit",
    url: "https://getfoundry.sh/",
    category: "Developer Tools",
  },
  {
    id: "20",
    title: "Remix IDE",
    description: "Online Solidity IDE",
    url: "https://remix.ethereum.org/",
    category: "Developer Tools",
  },
  {
    id: "21",
    title: "Web3.js",
    description: "JavaScript library for Ethereum",
    url: "https://web3js.readthedocs.io/",
    category: "Developer Tools",
  },
  {
    id: "22",
    title: "Ethers.js",
    description: "Complete Ethereum library",
    url: "https://docs.ethers.org/",
    category: "Developer Tools",
  },
  {
    id: "23",
    title: "Blockchain 101 - A Visual Demo",
    description: "YouTube video by Anders Brownworth",
    url: "https://www.youtube.com/watch?v=_160oMzblY8",
    category: "Video Content",
  },
  {
    id: "24",
    title: "Next Bitcoin",
    description: "Educational playlist on Bitcoin",
    url: "https://www.youtube.com/playlist?list=PLPOkajvdhrB3R3cg8KtN8Sr5bRKsYDljM",
    category: "Video Content",
  },
  {
    id: "25",
    title: "Stability and Freedom in Chaos: The Story of Tether",
    description: "Documentary on stablecoins",
    url: "https://www.youtube.com/watch?v=ZPaY3kdhVTw",
    category: "Video Content",
  },
  {
    id: "26",
    title: "Finematics",
    description: "DeFi explained visually",
    url: "https://www.youtube.com/@Finematics",
    category: "Video Content",
  },
  {
    id: "27",
    title: "Whiteboard Crypto",
    description: "Crypto concepts simplified",
    url: "https://www.youtube.com/@WhiteboardCrypto",
    category: "Video Content",
  },
  {
    id: "28",
    title: "ChainFeeds",
    description: "Curated Web3 news and insights",
    url: "https://substack.chainfeeds.xyz/subscribe",
    category: "Newsletters",
  },
  {
    id: "29",
    title: "The Block Newsletter",
    description: "Latest news and analysis of crypto markets",
    url: "https://www.theblock.co/newsletters",
    category: "Newsletters",
  },
  {
    id: "30",
    title: "Bitcoin Breakdown",
    description: "Bitcoin-only twice-weekly newsletter",
    url: "https://www.btcbreakdown.com/subscribe",
    category: "Newsletters",
  },
  {
    id: "31",
    title: "Bay Area Times",
    description: "Visual daily newsletter on business and tech",
    url: "https://www.bayareatimes.com/",
    category: "Newsletters",
  },
  {
    id: "32",
    title: "Bankless",
    description: "Master the frontier of crypto",
    url: "https://www.bankless.com/",
    category: "Newsletters",
  },
  {
    id: "33",
    title: "The Defiant",
    description: "Get an edge in crypto",
    url: "https://thedefiant.io/",
    category: "Newsletters",
  },
  {
    id: "34",
    title: "The Block",
    description: "Crypto news and research",
    url: "https://www.theblock.co/",
    category: "News & Updates",
  },
  {
    id: "35",
    title: "CoinDesk",
    description: "Leading blockchain news",
    url: "https://www.coindesk.com/",
    category: "News & Updates",
  },
  {
    id: "36",
    title: "Decrypt",
    description: "Web3 news and culture",
    url: "https://decrypt.co/",
    category: "News & Updates",
  },
  {
    id: "37",
    title: "Anders Brownworth Blog",
    description: "Technical insights on blockchain",
    url: "https://andersbrownworth.com/",
    category: "News & Updates",
  },
  {
    id: "38",
    title: "A Better Web3",
    description: "Curated list of Web3 job opportunities",
    url: "https://abetterweb3.notion.site/",
    category: "Careers",
  },
]

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")

  const categories = [
    "All",
    "Documentation",
    "Courses",
    "Learning Resources",
    "Developer Tools",
    "Video Content",
    "Newsletters",
    "News & Updates",
    "Careers",
  ]

  const filteredResources =
    selectedCategory === "All" ? resources : resources.filter((resource) => resource.category === selectedCategory)

  const getCategoryColor = (category: string) => {
    const colors = {
      Documentation: "from-blue-500 to-cyan-500",
      Courses: "from-purple-500 to-pink-500",
      "Learning Resources": "from-green-500 to-emerald-500",
      "Developer Tools": "from-orange-500 to-red-500",
      "Video Content": "from-rose-500 to-pink-500",
      Newsletters: "from-indigo-500 to-purple-500",
      "News & Updates": "from-yellow-500 to-orange-500",
      Careers: "from-teal-500 to-cyan-500",
    }
    return colors[category as keyof typeof colors] || "from-gray-500 to-slate-500"
  }

  return (
    <div className="bg-background min-h-screen">

      {/* Hero Section */}
      <section className="container mx-auto py-6 px-4 md:py-8">
        <Link
          href="/"
          className="text-sm text-muted-foreground mb-3 gap-1.5 inline-flex items-center hover:text-foreground"
        >
          <ArrowLeftIcon className="size-3.5" />
          Back to Timeline
        </Link>
        <h1 className="font-bold text-balance mb-1.5 text-2xl md:text-3xl">Resources</h1>
        <p className="text-muted-foreground text-sm text-balance max-w-2xl">
          Curated links to help you learn more about Web3, blockchain, and decentralized technology
        </p>
      </section>

      {/* Filter Section */}
      <section className="container mx-auto mb-4 px-4">
        <div className="flex flex-wrap gap-1.5">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              className="h-7 text-xs px-2.5"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </section>

      {/* Resources Grid */}
      <section className="container mx-auto px-4 pb-10">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredResources.map((resource, index) => (
            <a
              key={resource.id}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Card
                className="cursor-pointer flex flex-col h-full border-2 animate-fade-in relative overflow-hidden hover:border-primary/50"
              >
                <div
                  className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${getCategoryColor(resource.category)} opacity-60 group-hover:opacity-100`}
                />
                <div className="bg-gradient-to-br rounded-full from-primary/5 to-secondary/5 top-2 right-2 absolute size-16 blur-2xl group-hover:scale-150" />
                <CardHeader className="flex-1 p-3 pb-2 relative">
                  <div className="flex mb-1 gap-2 items-start justify-between">
                    <CardTitle className="font-bold text-sm leading-snug line-clamp-2 group-hover:text-primary">
                      {resource.title}
                    </CardTitle>
                    <div className="bg-gradient-to-br rounded-full flex from-primary/10 to-secondary/10 flex-shrink-0 items-center justify-center size-6 group-hover:scale-110 group-hover:rotate-12">
                      <ExternalLinkIcon className="text-primary size-3 group-hover:text-secondary" />
                    </div>
                  </div>
                  <CardDescription className="text-xs leading-relaxed text-muted-foreground/90 line-clamp-2">
                    {resource.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="p-3 pt-0 relative">
                  <div
                    className={`inline-flex items-center gap-1 text-[10px] font-medium bg-gradient-to-r ${getCategoryColor(resource.category)} bg-clip-text text-transparent px-2 py-0.5 rounded-full border border-primary/20`}
                  >
                    {resource.category}
                  </div>
                </CardContent>

                <div className="bg-gradient-to-br via-transparent from-primary/0 to-secondary/0 opacity-0 inset-0 absolute pointer-events-none group-hover:opacity-10" />
              </Card>
            </a>
          ))}
        </div>
      </section>
    </div>
  )
}
