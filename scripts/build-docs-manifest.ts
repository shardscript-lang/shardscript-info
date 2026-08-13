import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import matter from 'gray-matter'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export type DocSection =
  | 'getting-started'
  | 'language-overview'
  | 'language-fundamentals'
  | 'language-rules'
  | 'syntax'
  | 'stdlib'
  | 'library-building'
  | 'build-your-project'
  | 'implementation-details'
  | 'faq'
  | 'common-language-features'

export interface DocArticle {
  slug: string
  title: string
  group: string
  groupOrder: number
  order: number
  file: string
  section: DocSection
}

export interface DocGroup {
  title: string
  items: { slug: string; title: string }[]
}

export interface DocManifest {
  'getting-started': DocGroup[]
  'language-overview': DocGroup[]
  'language-fundamentals': DocGroup[]
  'language-rules': DocGroup[]
  syntax: DocGroup[]
  stdlib: DocGroup[]
  'library-building': DocGroup[]
  'build-your-project': DocGroup[]
  'implementation-details': DocGroup[]
  faq: DocGroup[]
  'common-language-features': DocGroup[]
  articles: Record<string, DocArticle>
}

const docsRoot = path.resolve(__dirname, '../src/docs')
const outputPath = path.resolve(__dirname, '../src/docs/manifest.ts')

function scanDir(dir: string, section: DocSection): DocArticle[] {
  const articles: DocArticle[] = []

  function walk(current: string) {
    const entries = fs.readdirSync(current, { withFileTypes: true })
    for (const entry of entries) {
      const fullPath = path.join(current, entry.name)
      if (entry.isDirectory()) {
        walk(fullPath)
      } else if (entry.isFile() && entry.name.endsWith('.mdx')) {
        const raw = fs.readFileSync(fullPath, 'utf-8')
        const { data } = matter(raw)
        const relative = path.relative(docsRoot, fullPath).replace(/\\/g, '/')
        const slug = (data.slug as string) ?? entry.name.replace(/\.mdx$/, '')
        articles.push({
          slug,
          title: (data.title as string) ?? slug,
          group: (data.group as string) ?? 'Uncategorized',
          groupOrder: typeof data.groupOrder === 'number' ? data.groupOrder : 999,
          order: typeof data.order === 'number' ? data.order : 999,
          file: relative,
          section,
        })
      }
    }
  }

  walk(dir)
  return articles
}

function groupArticles(articles: DocArticle[]): DocGroup[] {
  const byGroup = new Map<string, DocArticle[]>()
  for (const article of articles) {
    const list = byGroup.get(article.group) ?? []
    list.push(article)
    byGroup.set(article.group, list)
  }

  const groups: DocGroup[] = []
  for (const [title, items] of byGroup) {
    items.sort((a, b) => a.order - b.order)
    groups.push({
      title,
      items: items.map((i) => ({ slug: i.slug, title: i.title })),
    })
  }

  // Sort groups by groupOrder, then by first article order as a tie-breaker
  groups.sort((a, b) => {
    const groupOrderA = articles.find((x) => x.group === a.title)?.groupOrder ?? 999
    const groupOrderB = articles.find((x) => x.group === b.title)?.groupOrder ?? 999
    if (groupOrderA !== groupOrderB) {
      return groupOrderA - groupOrderB
    }
    const firstA = articles.find((x) => x.group === a.title)?.order ?? 999
    const firstB = articles.find((x) => x.group === b.title)?.order ?? 999
    return firstA - firstB
  })

  return groups
}

const gettingStartedArticles = scanDir(path.join(docsRoot, 'getting-started'), 'getting-started')
const languageOverviewArticles = scanDir(path.join(docsRoot, 'language-overview'), 'language-overview')
const languageFundamentalsArticles = scanDir(path.join(docsRoot, 'language-fundamentals'), 'language-fundamentals')
const languageRulesArticles = scanDir(path.join(docsRoot, 'language-rules'), 'language-rules')
const syntaxArticles = scanDir(path.join(docsRoot, 'syntax'), 'syntax')
const stdlibArticles = scanDir(path.join(docsRoot, 'stdlib'), 'stdlib')
const libraryBuildingArticles = scanDir(path.join(docsRoot, 'library-building'), 'library-building')
const buildYourProjectArticles = scanDir(path.join(docsRoot, 'build-your-project'), 'build-your-project')
const implementationDetailsArticles = scanDir(path.join(docsRoot, 'implementation-details'), 'implementation-details')
const faqArticles = scanDir(path.join(docsRoot, 'faq'), 'faq')
const commonLanguageFeaturesArticles = scanDir(path.join(docsRoot, 'common-language-features'), 'common-language-features')
const allArticles = [
  ...gettingStartedArticles,
  ...languageOverviewArticles,
  ...languageFundamentalsArticles,
  ...languageRulesArticles,
  ...syntaxArticles,
  ...stdlibArticles,
  ...libraryBuildingArticles,
  ...buildYourProjectArticles,
  ...implementationDetailsArticles,
  ...faqArticles,
  ...commonLanguageFeaturesArticles,
]

const articlesRecord: Record<string, DocArticle> = {}
for (const article of allArticles) {
  articlesRecord[article.slug] = article
}

const manifest: DocManifest = {
  'getting-started': groupArticles(gettingStartedArticles),
  'language-overview': groupArticles(languageOverviewArticles),
  'language-fundamentals': groupArticles(languageFundamentalsArticles),
  'language-rules': groupArticles(languageRulesArticles),
  syntax: groupArticles(syntaxArticles),
  stdlib: groupArticles(stdlibArticles),
  'library-building': groupArticles(libraryBuildingArticles),
  'build-your-project': groupArticles(buildYourProjectArticles),
  'implementation-details': groupArticles(implementationDetailsArticles),
  faq: groupArticles(faqArticles),
  'common-language-features': groupArticles(commonLanguageFeaturesArticles),
  articles: articlesRecord,
}

const fileContent = `// Auto-generated by scripts/build-docs-manifest.ts
// Do not edit manually.

export type DocSection =
  | 'getting-started'
  | 'language-overview'
  | 'language-fundamentals'
  | 'language-rules'
  | 'syntax'
  | 'stdlib'
  | 'library-building'
  | 'build-your-project'
  | 'implementation-details'
  | 'faq'
  | 'common-language-features'

export interface DocArticle {
  slug: string
  title: string
  group: string
  groupOrder: number
  order: number
  file: string
  section: DocSection
}

export interface DocGroup {
  title: string
  items: { slug: string; title: string }[]
}

export interface DocManifest {
  'getting-started': DocGroup[]
  'language-overview': DocGroup[]
  'language-fundamentals': DocGroup[]
  'language-rules': DocGroup[]
  syntax: DocGroup[]
  stdlib: DocGroup[]
  'library-building': DocGroup[]
  'build-your-project': DocGroup[]
  'implementation-details': DocGroup[]
  faq: DocGroup[]
  'common-language-features': DocGroup[]
  articles: Record<string, DocArticle>
}

const manifest: DocManifest = ${JSON.stringify(manifest, null, 2)}

export default manifest
`

fs.writeFileSync(outputPath, fileContent)
console.log(`Docs manifest written to ${path.relative(process.cwd(), outputPath)} (${allArticles.length} articles)`)
