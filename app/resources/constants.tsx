import {
  FileTextIcon,
  ReaderIcon,
  RocketIcon,
  CodeIcon,
  VideoIcon,
  EnvelopeClosedIcon,
  UpdateIcon,
  BackpackIcon,
  CubeIcon,
  DrawingPinFilledIcon,
} from '@radix-ui/react-icons'

export enum Category {
  All = 'All',
  Documentation = 'Documentation',
  Solidity = 'Solidity',
  Courses = 'Courses',
  LearningResources = 'Learning Resources',
  DeveloperTools = 'Developer Tools',
  VideoContent = 'Video Content',
  Newsletters = 'Newsletters',
  NewsAndUpdates = 'News & Updates',
  Careers = 'Careers',
  Roadmap = 'Roadmap',
}

export type Resource = {
  title: string
  description: string
  url: string
  category: Category
}

export const CATEGORIES_LIST = [
  { name: Category.All, icon: null, color: '' },
  {
    name: Category.Documentation,
    icon: FileTextIcon,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    name: Category.Courses,
    icon: ReaderIcon,
    color: 'from-purple-500 to-pink-500',
  },
  {
    name: Category.LearningResources,
    icon: RocketIcon,
    color: 'from-green-500 to-emerald-500',
  },
  {
    name: Category.Solidity,
    icon: CubeIcon,
    color: 'from-slate-500 to-gray-500',
  },
  {
    name: Category.DeveloperTools,
    icon: CodeIcon,
    color: 'from-orange-500 to-red-500',
  },
  {
    name: Category.VideoContent,
    icon: VideoIcon,
    color: 'from-rose-500 to-pink-500',
  },
  {
    name: Category.Newsletters,
    icon: EnvelopeClosedIcon,
    color: 'from-indigo-500 to-purple-500',
  },
  {
    name: Category.NewsAndUpdates,
    icon: UpdateIcon,
    color: 'from-yellow-500 to-orange-500',
  },
  {
    name: Category.Roadmap,
    icon: DrawingPinFilledIcon,
    color: 'from-sky-500 to-blue-500',
  },
  {
    name: Category.Careers,
    icon: BackpackIcon,
    color: 'from-teal-500 to-cyan-500',
  },
]

export const RESOURCES: Resource[] = [
  {
    title: 'Bitcoin Whitepaper',
    description: 'The original Bitcoin paper by Satoshi Nakamoto',
    url: 'https://bitcoin.org/bitcoin.pdf',
    category: Category.Documentation,
  },
  {
    title: 'Ethereum Whitepaper',
    description: "Vitalik Buterin's vision for Ethereum",
    url: 'https://ethereum.org/en/whitepaper/',
    category: Category.Documentation,
  },
  {
    title: 'Ethereum Yellow Paper',
    description: 'Technical specification of Ethereum',
    url: 'https://ethereum.github.io/yellowpaper/paper.pdf',
    category: Category.Documentation,
  },
  {
    title: 'Introduction to Bitcoin, Web3 and Blockchain',
    description: 'Comprehensive introduction to Web3 fundamentals',
    url: 'https://www.web3brand.io/p/web3-101-materials',
    category: Category.Documentation,
  },
  {
    title: 'Binance Academy - Beginner Track',
    description: 'Highly recommended beginner course by Binance',
    url: 'https://academy.binance.com/en/track/beginner-track',
    category: Category.Courses,
  },
  {
    title: 'Binance Academy - Intermediate Track',
    description: 'Intermediate level crypto concepts',
    url: 'https://academy.binance.com/en/track/intermediate-track',
    category: Category.Courses,
  },
  {
    title: 'Web3 and Blockchain Fundamentals',
    description: 'Coursera course on Web3 basics',
    url: 'https://www.coursera.org/learn/web3-blockchain-fundamentals',
    category: Category.Courses,
  },
  {
    title: 'How to Get Into Blockchain',
    description: 'Career guidance for blockchain professionals',
    url: 'https://www.coursera.org/learn/how-to-get-into-blockchain/',
    category: Category.Courses,
  },
  {
    title: 'Bitcoin and Cryptocurrency Technologies',
    description: 'In-depth technical cryptocurrency course',
    url: 'https://www.coursera.org/learn/cryptocurrency',
    category: Category.Courses,
  },
  {
    title: 'Hackquest Learning Track',
    description: 'Structured Web3 development learning path',
    url: 'https://www.hackquest.io/learning-track',
    category: Category.Courses,
  },
  {
    title: 'Web3 University',
    description: 'Free Web3 education platform',
    url: 'https://www.web3.university/',
    category: Category.Courses,
  },
  {
    title: 'MIT: Blockchain and Money',
    description: 'MIT open course by Gary Gensler',
    url: 'https://ocw.mit.edu/courses/15-s12-blockchain-and-money-fall-2018/',
    category: Category.Courses,
  },
  {
    title: 'Stanford: Cryptocurrencies and Smart Contracts',
    description: 'Stanford CS course on blockchain technology',
    url: 'https://cs251.stanford.edu/',
    category: Category.Courses,
  },
  {
    title: 'Blockchain Technology and Application',
    description: 'Technical course on blockchain systems',
    url: 'http://zhenxiao.com/blockchain/',
    category: Category.Courses,
  },
  {
    title: 'CryptoZombies',
    description: 'Learn Solidity by building a game',
    url: 'https://cryptozombies.io/',
    category: Category.LearningResources,
  },
  {
    title: 'Ethereum.org Learn',
    description: 'Official Ethereum learning hub',
    url: 'https://ethereum.org/en/learn/',
    category: Category.LearningResources,
  },
  {
    title: 'Mastering Bitcoin',
    description: 'Technical book explaining Bitcoin and how it works',
    url: 'https://github.com/bitcoinbook/bitcoinbook',
    category: Category.LearningResources,
  },
  {
    title: 'Hardhat',
    description: 'Ethereum development environment',
    url: 'https://hardhat.org/',
    category: Category.DeveloperTools,
  },
  {
    title: 'Etherscan',
    description: 'Ethereum block explorer and analytics platform',
    url: 'https://etherscan.io/',
    category: Category.DeveloperTools,
  },
  {
    title: 'Nexth',
    description: 'Next.js boilerplate for Web3 projects',
    url: 'https://github.com/wslyvh/nexth',
    category: Category.DeveloperTools,
  },
  {
    title: 'Foundry',
    description: 'Fast, portable Ethereum toolkit',
    url: 'https://getfoundry.sh/',
    category: Category.DeveloperTools,
  },
  {
    title: 'Remix IDE',
    description: 'Online Solidity IDE',
    url: 'https://remix.ethereum.org/',
    category: Category.DeveloperTools,
  },
  {
    title: 'Web3.js',
    description: 'JavaScript library for Ethereum',
    url: 'https://web3js.readthedocs.io/',
    category: Category.DeveloperTools,
  },
  {
    title: 'Ethers.js',
    description: 'Complete Ethereum library',
    url: 'https://docs.ethers.org/',
    category: Category.DeveloperTools,
  },
  {
    title: 'Blockchain 101 - A Visual Demo',
    description: 'YouTube video by Anders Brownworth',
    url: 'https://www.youtube.com/watch?v=_160oMzblY8',
    category: Category.VideoContent,
  },
  {
    title: 'Next Bitcoin',
    description: 'Educational playlist on Bitcoin',
    url: 'https://www.youtube.com/playlist?list=PLPOkajvdhrB3R3cg8KtN8Sr5bRKsYDljM',
    category: Category.VideoContent,
  },
  {
    title: 'Stability and Freedom in Chaos: The Story of Tether',
    description: 'Documentary on stablecoins',
    url: 'https://www.youtube.com/watch?v=ZPaY3kdhVTw',
    category: Category.VideoContent,
  },
  {
    title: 'Finematics',
    description: 'DeFi explained visually',
    url: 'https://www.youtube.com/@Finematics',
    category: Category.VideoContent,
  },
  {
    title: 'Whiteboard Crypto',
    description: 'Crypto concepts simplified',
    url: 'https://www.youtube.com/@WhiteboardCrypto',
    category: Category.VideoContent,
  },
  {
    title: 'ChainFeeds',
    description: 'Curated Web3 news and insights',
    url: 'https://substack.chainfeeds.xyz/subscribe',
    category: Category.Newsletters,
  },
  {
    title: 'The Block Newsletter',
    description: 'Latest news and analysis of crypto markets',
    url: 'https://www.theblock.co/newsletters',
    category: Category.Newsletters,
  },
  {
    title: 'Bitcoin Breakdown',
    description: 'Bitcoin-only twice-weekly newsletter',
    url: 'https://www.btcbreakdown.com/subscribe',
    category: Category.Newsletters,
  },
  {
    title: 'Bay Area Times',
    description: 'Visual daily newsletter on business and tech',
    url: 'https://www.bayareatimes.com/',
    category: Category.Newsletters,
  },
  {
    title: 'Bankless',
    description: 'Master the frontier of crypto',
    url: 'https://www.bankless.com/',
    category: Category.Newsletters,
  },
  {
    title: 'The Defiant',
    description: 'Get an edge in crypto',
    url: 'https://thedefiant.io/',
    category: Category.Newsletters,
  },
  {
    title: 'The Block',
    description: 'Crypto news and research',
    url: 'https://www.theblock.co/',
    category: Category.NewsAndUpdates,
  },
  {
    title: 'CoinDesk',
    description: 'Leading blockchain news',
    url: 'https://www.coindesk.com/',
    category: Category.NewsAndUpdates,
  },
  {
    title: 'Decrypt',
    description: 'Web3 news and culture',
    url: 'https://decrypt.co/',
    category: Category.NewsAndUpdates,
  },
  {
    title: 'Anders Brownworth Blog',
    description: 'Technical insights on blockchain',
    url: 'https://andersbrownworth.com/',
    category: Category.NewsAndUpdates,
  },
  {
    title: 'A Better Web3',
    description: 'Curated list of Web3 job opportunities',
    url: 'https://abetterweb3.notion.site/',
    category: Category.Careers,
  },
  {
    title: 'Solidity Documentation',
    description: 'Official Solidity language documentation',
    url: 'https://docs.soliditylang.org/en/latest/',
    category: Category.Solidity,
  },
  {
    title: 'Solidity Cheatsheet',
    description: 'Handy reference for Solidity syntax and features',
    url: 'https://docs.soliditylang.org/en/latest/cheatsheet.html',
    category: Category.Solidity,
  },
  {
    title: 'Full Stack Ethereum Development Guide',
    description: 'Comprehensive guide to full-stack Ethereum development',
    url: 'https://dev.to/dabit3/the-complete-guide-to-full-stack-ethereum-development-3j13',
    category: Category.Solidity,
  },
  {
    title: 'Web3 Jobs',
    description: 'Web3 Jobs: Blockchain, Smart Contract and Crypto Jobs',
    url: 'https://web3.career',
    category: Category.Careers,
  },
  {
    title: 'Blockend Developer Roadmap',
    description: 'Comprehensive roadmap for blockchain developers',
    url: 'https://github.com/envoy1084/blockend-developer-roadmap',
    category: Category.Roadmap,
  },
  {
    title: 'DeFi Developer Roadmap',
    description: 'Roadmap for becoming a DeFi developer',
    url: 'https://github.com/OffcierCia/DeFi-Developer-Road-Map',
    category: Category.Roadmap,
  },
  {
    title: 'HackQuest Learning Track',
    description: 'Interactive learning platform for blockchain and Web3',
    url: 'https://www.hackquest.io/learning-track',
    category: Category.LearningResources,
  },
  {
    url 
  }
]
