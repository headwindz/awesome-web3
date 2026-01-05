"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GitHubLogoIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons"
import Link from "next/link"

type Event = {
  id: string
  date: string
  month: string
  year: string
  title: string
  description: string
  category: string
}

const events: Event[] = [
  {
    id: "1",
    date: "OCT 2008",
    month: "OCT",
    year: "2008",
    title: "Bitcoin Whitepaper",
    description:
      'Satoshi Nakamoto publishes "Bitcoin: A Peer-to-Peer Electronic Cash System," introducing the concept of a decentralized digital currency. This whitepaper lays the foundation for blockchain technology and cryptocurrency, proposing a system where transactions are verified by network nodes through cryptography and recorded in a public distributed ledger.',
    category: "2008-2013",
  },
  {
    id: "2",
    date: "JAN 2009",
    month: "JAN",
    year: "2009",
    title: "Bitcoin Network Launch",
    description:
      'The Bitcoin network comes into existence with Satoshi Nakamoto mining the genesis block of bitcoin (block number 0), which had a reward of 50 bitcoins. Embedded in the coinbase of this block was the text: "The Times 03/Jan/2009 Chancellor on brink of second bailout for banks," a reference to a headline in The Times newspaper.',
    category: "2008-2013",
  },
  {
    id: "3",
    date: "MAY 2010",
    month: "MAY",
    year: "2010",
    title: "Bitcoin Pizza Day",
    description:
      "Laszlo Hanyecz makes the first real-world transaction using Bitcoin, paying 10,000 BTC for two Papa John's pizzas. This event, now celebrated annually as Bitcoin Pizza Day, demonstrated Bitcoin's potential as a medium of exchange and established a real-world price point for the cryptocurrency.",
    category: "2008-2013",
  },
  {
    id: "4",
    date: "NOV 2013",
    month: "NOV",
    year: "2013",
    title: "Ethereum Whitepaper",
    description:
      "Vitalik Buterin publishes the Ethereum whitepaper, proposing a blockchain with a built-in Turing-complete programming language. This vision would enable developers to create decentralized applications and smart contracts, expanding blockchain use cases far beyond digital currency.",
    category: "2008-2013",
  },
  {
    id: "5",
    date: "JUL 2015",
    month: "JUL",
    year: "2015",
    title: "Ethereum Mainnet Launch",
    description:
      "Ethereum launches its mainnet, introducing smart contracts to the blockchain ecosystem. Created by Vitalik Buterin and a team of developers, Ethereum enables developers to build decentralized applications (dApps) and introduces the concept of programmable blockchain, expanding the use cases beyond simple transactions.",
    category: "2014-2017",
  },
  {
    id: "6",
    date: "JUN 2016",
    month: "JUN",
    year: "2016",
    title: "The DAO Hack",
    description:
      "The DAO, a decentralized autonomous organization built on Ethereum, is hacked for $60 million worth of Ether. This leads to a controversial hard fork of Ethereum, creating Ethereum (ETH) and Ethereum Classic (ETC), and sparking important debates about immutability and governance in blockchain systems.",
    category: "2014-2017",
  },
  {
    id: "7",
    date: "DEC 2017",
    month: "DEC",
    year: "2017",
    title: "CryptoKitties Craze",
    description:
      "CryptoKitties, one of the first blockchain-based games, launches on Ethereum and quickly becomes so popular that it congests the Ethereum network. This demonstrated both the potential for NFTs (non-fungible tokens) and the scalability challenges facing blockchain networks. The game allowed users to purchase, collect, breed, and sell virtual cats.",
    category: "2014-2017",
  },
  {
    id: "8",
    date: "DEC 2017",
    month: "DEC",
    year: "2017",
    title: "Bitcoin Reaches $20,000",
    description:
      "Bitcoin reaches its then all-time high of nearly $20,000, marking the peak of the 2017 bull run. This milestone brings unprecedented mainstream media attention and public interest to cryptocurrency, though it's followed by a significant market correction in 2018.",
    category: "2014-2017",
  },
  {
    id: "9",
    date: "JAN 2018",
    month: "JAN",
    year: "2018",
    title: "Crypto Winter Begins",
    description:
      'Following the 2017 bull run, cryptocurrency markets enter a prolonged bear market known as "Crypto Winter." Bitcoin falls from its peak, and many altcoins lose 90% or more of their value. Despite the downturn, development of blockchain technology and infrastructure continues.',
    category: "2018-2020",
  },
  {
    id: "10",
    date: "NOV 2019",
    month: "NOV",
    year: "2019",
    title: "DeFi Protocols Emerge",
    description:
      "Decentralized Finance (DeFi) protocols like Compound and Uniswap gain traction, introducing new financial primitives like automated market makers and yield farming. These protocols demonstrate the potential for creating a decentralized financial system without traditional intermediaries.",
    category: "2018-2020",
  },
  {
    id: "11",
    date: "MAY 2020",
    month: "MAY",
    year: "2020",
    title: "Bitcoin Halving",
    description:
      "Bitcoin undergoes its third halving event, reducing the block reward from 12.5 to 6.25 BTC. Halving events occur approximately every four years and reduce the rate at which new bitcoins are created, increasing scarcity and historically preceding bull markets.",
    category: "2018-2020",
  },
  {
    id: "12",
    date: "JUN 2020",
    month: "JUN",
    year: "2020",
    title: "DeFi Summer",
    description:
      'The decentralized finance (DeFi) movement explodes with the launch of yield farming protocols like Compound. This period, known as "DeFi Summer," sees unprecedented growth in decentralized lending, borrowing, and trading platforms, with total value locked in DeFi protocols surging from under $1 billion to over $15 billion.',
    category: "2018-2020",
  },
  {
    id: "13",
    date: "MAR 2021",
    month: "MAR",
    year: "2021",
    title: "Beeple's NFT Sale",
    description:
      'Digital artist Beeple sells an NFT artwork at Christie\'s auction house for $69 million, bringing mainstream attention to NFTs and digital art. This sale, titled "Everydays: The First 5000 Days," marks a watershed moment for the art world and cryptocurrency, demonstrating the value and legitimacy of digital ownership.',
    category: "2021-2024",
  },
  {
    id: "14",
    date: "APR 2021",
    month: "APR",
    year: "2021",
    title: "Coinbase IPO",
    description:
      "Coinbase, one of the largest cryptocurrency exchanges, goes public on the Nasdaq through a direct listing, valued at around $86 billion on its first day. This marks a significant milestone for the crypto industry's legitimacy and mainstream adoption.",
    category: "2021-2024",
  },
  {
    id: "15",
    date: "SEP 2021",
    month: "SEP",
    year: "2021",
    title: "El Salvador Adopts Bitcoin",
    description:
      "El Salvador becomes the first country to adopt Bitcoin as legal tender, sparking global debate about cryptocurrency's role in national economies. The move includes distributing Bitcoin wallets to citizens and accepting BTC for taxes and payments.",
    category: "2021-2024",
  },
  {
    id: "16",
    date: "NOV 2021",
    month: "NOV",
    year: "2021",
    title: "Bitcoin Reaches $69,000",
    description:
      "Bitcoin reaches its all-time high of approximately $69,000, driven by increased institutional adoption, the launch of Bitcoin futures ETFs, and growing mainstream acceptance of cryptocurrency as an asset class.",
    category: "2021-2024",
  },
  {
    id: "17",
    date: "MAY 2022",
    month: "MAY",
    year: "2022",
    title: "Terra/LUNA Collapse",
    description:
      "The Terra blockchain and its algorithmic stablecoin UST collapse, wiping out nearly $40 billion in value within days. This event triggers a broader crypto market downturn and raises important questions about algorithmic stablecoins and systemic risk in DeFi.",
    category: "2021-2024",
  },
  {
    id: "18",
    date: "SEP 2022",
    month: "SEP",
    year: "2022",
    title: "The Merge",
    description:
      'Ethereum successfully transitions from Proof-of-Work to Proof-of-Stake consensus mechanism in an upgrade called "The Merge." This historic upgrade reduces Ethereum\'s energy consumption by approximately 99.95% and sets the stage for future scalability improvements, marking one of the most significant technical achievements in blockchain history.',
    category: "2021-2024",
  },
  {
    id: "19",
    date: "NOV 2022",
    month: "NOV",
    year: "2022",
    title: "FTX Collapse",
    description:
      "FTX, once the third-largest cryptocurrency exchange, collapses amid revelations of misused customer funds and fraudulent activities by founder Sam Bankman-Fried. The collapse wipes out billions in customer assets and triggers increased regulatory scrutiny of the crypto industry.",
    category: "2021-2024",
  },
  {
    id: "20",
    date: "JAN 2024",
    month: "JAN",
    year: "2024",
    title: "Bitcoin ETF Approvals",
    description:
      "The U.S. Securities and Exchange Commission approves multiple spot Bitcoin ETFs, including offerings from BlackRock, Fidelity, and other major financial institutions. This milestone makes Bitcoin more accessible to traditional investors and marks a significant step toward mainstream financial integration.",
    category: "2021-2024",
  },
  {
    id: "21",
    date: "MAR 2024",
    month: "MAR",
    year: "2024",
    title: "Ethereum Dencun Upgrade",
    description:
      "Ethereum implements the Dencun upgrade, introducing proto-danksharding (EIP-4844) which significantly reduces transaction costs on Layer 2 networks. This upgrade is a crucial step toward Ethereum's long-term scalability goals.",
    category: "2021-2024",
  },
  {
    id: "22",
    date: "APR 2024",
    month: "APR",
    year: "2024",
    title: "Bitcoin Halving",
    description:
      "Bitcoin undergoes its fourth halving event, reducing the block reward from 6.25 to 3.125 BTC. This halving occurs amid increased institutional adoption and the recent approval of spot Bitcoin ETFs, marking a new era for the cryptocurrency.",
    category: "2021-2024",
  },
]

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("ALL")
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [hoveredEvent, setHoveredEvent] = useState<string | null>(null)

  const filteredEvents =
    selectedCategory === "ALL" ? events : events.filter((event) => event.category === selectedCategory)

  const categories = ["ALL", "2008-2013", "2014-2017", "2018-2020", "2021-2024"]

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    document.documentElement.classList.toggle("dark")
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 size-96 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-10 size-96 bg-gradient-to-br from-secondary/10 to-accent/10 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="border-b border-border sticky top-0 bg-background/80 backdrop-blur-xl z-50 transition-all">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-lg bg-gradient-to-br from-[#F7931A] to-[#FFA500] text-white flex items-center justify-center font-bold text-xl shadow-lg">
              ₿
            </div>
            <span className="font-semibold text-lg bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Web3 History
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" asChild className="hover:bg-primary/10">
              <Link href="/resources">Resources</Link>
            </Button>
            <Button variant="ghost" size="icon" asChild className="hover:bg-primary/10">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <GitHubLogoIcon className="size-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="hover:bg-primary/10">
              {theme === "light" ? <MoonIcon className="size-5" /> : <SunIcon className="size-5" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24 text-center animate-fade-in relative">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
          Web3 Timeline
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto text-balance leading-relaxed">
          Journey through the revolutionary history of blockchain, cryptocurrency, and decentralized technology
        </p>
      </section>

      {/* Filter Section */}
      <section
        className="container mx-auto px-4 mb-12 animate-fade-in relative z-10"
        style={{ animationDelay: "0.1s" }}
      >
        <div className="flex flex-col gap-4">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Browse by era:</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={`transition-all duration-300 ${
                  selectedCategory === category ? "shadow-lg shadow-primary/25" : "hover:border-primary/50"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-16 relative">
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            <div className="absolute left-24 md:left-32 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-primary" />

            {/* Events */}
            <div className="space-y-12">
              {filteredEvents.map((event, index) => (
                <div
                  key={event.id}
                  className="relative animate-slide-in grid grid-cols-[auto_1fr] gap-8 md:gap-12"
                  style={{
                    animationDelay: `${index * 0.05 + 0.2}s`,
                    opacity: 0,
                    animationFillMode: "forwards",
                  }}
                  onMouseEnter={() => setHoveredEvent(event.id)}
                  onMouseLeave={() => setHoveredEvent(null)}
                >
                  <div className="w-20 md:w-24 flex flex-col items-end pt-8 pr-6 md:pr-8">
                    <div className="text-right">
                      <div className="text-sm md:text-base font-bold text-primary">{event.month}</div>
                      <div className="text-2xl md:text-3xl font-bold bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent">
                        {event.year}
                      </div>
                    </div>
                  </div>

                  <div className="absolute left-24 md:left-32 top-8 -translate-x-1/2">
                    <div className="relative">
                      <div
                        className={`size-5 rounded-full bg-gradient-to-br from-primary to-secondary border-4 border-background shadow-lg transition-all duration-300 ${
                          hoveredEvent === event.id ? "scale-150 shadow-xl shadow-primary/50" : ""
                        }`}
                      />
                      {hoveredEvent === event.id && (
                        <div className="absolute inset-0 size-5 rounded-full bg-primary/30 animate-ping" />
                      )}
                    </div>
                  </div>

                  <div className="pl-4">
                    <div className="mb-3 inline-flex">
                      <Badge
                        className={`px-3 py-1.5 text-xs md:text-sm font-medium transition-all duration-300 ${
                          hoveredEvent === event.id
                            ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-lg scale-105"
                            : "bg-primary/10 text-primary"
                        }`}
                      >
                        {event.category}
                      </Badge>
                    </div>

                    <Card
                      className={`group transition-all duration-500 border-2 ${
                        hoveredEvent === event.id
                          ? "shadow-2xl shadow-primary/20 scale-[1.02] border-primary/50 -translate-y-1"
                          : "hover:shadow-xl hover:border-primary/30 hover:-translate-y-0.5"
                      }`}
                    >
                      <CardHeader className="space-y-3">
                        <CardTitle className="text-xl md:text-2xl font-bold group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-secondary group-hover:bg-clip-text group-hover:text-transparent transition-all">
                          {event.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-sm md:text-base leading-relaxed text-foreground/70">
                          {event.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-16">
        <div className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
          <p>Built with Next.js and passion for Web3</p>
        </div>
      </footer>
    </div>
  )
}
