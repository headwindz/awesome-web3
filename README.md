# Awesome web3 📚

A comprehensive web3 educational platform featuring a complete timeline of cryptocurrency and blockchain history, an extensive glossary of web3 terms, and curated learning resources.

## 🌟 Features

### 📅 Interactive timeline

- Comprehensive chronological timeline of web3 history
- Filter events by year with an intuitive interface
- Detailed descriptions with links to primary sources

### 📖 Web3 glossary

- Extensive dictionary of web3, blockchain, and cryptocurrency terms
- Alphabetically organized with search functionality
- Clear, concise definitions for beginners and experts alike
- Quick navigation with letter-based filtering

### 🔗 Curated resources

- Categorized collection of web3 learning materials
- Links to tools, documentation, tutorials, and educational content
- Filter resources by category for easy discovery

## 🚀 Getting started - Local development

### Prerequisites

- Node.js 18+
- pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/awesome-web3.git

# Navigate to the project directory
cd awesome-web3

# Install dependencies
pnpm install

# Run the development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🛠️ Tech stack

- **Framework:** Next.js 15 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI primitives
- **Content:** MDX for event descriptions

## 📁 Project structure

```
awesome-web3/
├── app/                   # Next.js app directory
│   ├── page.tsx           # Timeline homepage
│   ├── glossary/          # Glossary feature
│   └── resources/         # Resources section
├── components/            # Reusable React components
├── events/                # MDX files for timeline events
├── data/                  # JSON data files
├── lib/                   # Utility functions and helpers
└── public/                # Static assets
```

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Add historical events:** Submit new significant web3 events with proper documentation
2. **Expand the glossary:** Add new terms or improve existing definitions
3. **Share resources:** Suggest valuable learning resources and tools
4. **Improve documentation:** Help make the content more accessible

### Adding a new event

Create a new MDX file in the appropriate year/month directory:

```bash
events/YYYY/MM/event-name.mdx
```

### Adding a new glossary term

Add a new entry in the `data/glossary.json` file:

```json
{
  "term": "New Term",
  "definition": "Definition of the new term."
}
```

### Adding a new resource

Add a new entry in the `data/resources.json` file:

```json
{
  "title": "Resource Title",
  "url": "https://resource-link.com",
  "category": "Category Name",
  "description": "Brief description of the resource."
}
```

## 📝 License

This project is open source and available under the MIT License.

Built with ❤️ for the Web3 community
