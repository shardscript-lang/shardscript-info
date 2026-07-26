import { useState, useEffect, useMemo, Suspense, lazy } from 'react'
import type { ComponentType } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Search, ChevronDown } from 'lucide-react'
import ScrollReveal from '../components/ScrollReveal'
import MdxPage from '../components/docs/MdxPage'
import manifest from '../docs/manifest'

const mdxModules = import.meta.glob('../docs/**/*.mdx') as Record<
  string,
  () => Promise<{ default: ComponentType<Record<string, unknown>> }>
>

type DocSection = 'getting-started' | 'syntax' | 'stdlib'

const SECTION_LABELS: Record<DocSection, string> = {
  'getting-started': 'Getting Started',
  syntax: 'Syntax',
  stdlib: 'Std. Library',
}

const allGroupTitles: Record<DocSection, string[]> = {
  'getting-started': manifest['getting-started'].map((g) => g.title),
  syntax: manifest.syntax.map((g) => g.title),
  stdlib: manifest.stdlib.map((g) => g.title),
}

function firstSlug(mode: DocSection): string {
  const groups = manifest[mode]
  return groups[0]?.items[0]?.slug ?? ''
}

function findGroup(mode: DocSection, slug: string) {
  return manifest[mode].find((g) => g.items.some((item) => item.slug === slug))
}

function findArticle(slug: string) {
  return manifest.articles[slug]
}

interface ArticleLoaderProps {
  file: string
}

function ArticleLoader({ file }: ArticleLoaderProps) {
  const Component = useMemo(() => {
    const key = `../docs/${file}`
    const loader = mdxModules[key]
    if (!loader) {
      const MissingModule = () => (
        <div className="bg-[#252538] border border-[#3A3A50] rounded-card p-6">
          <p className="text-text-secondary">Could not load article module: {file}</p>
        </div>
      )
      return lazy(() => Promise.resolve({ default: MissingModule }))
    }
    return lazy(loader)
  }, [file])

  return (
    <Suspense
      fallback={
        <div className="space-y-6 animate-pulse">
          <div className="h-8 bg-[#2D2D45] rounded w-2/3" />
          <div className="h-4 bg-[#2D2D45] rounded w-full" />
          <div className="h-4 bg-[#2D2D45] rounded w-5/6" />
          <div className="h-32 bg-[#2D2D45] rounded w-full" />
        </div>
      }
    >
      <MdxPage Component={Component} />
    </Suspense>
  )
}

export default function Docs() {
  const location = useLocation()
  const navigate = useNavigate()

  const getInitialState = (): { mode: DocSection; slug: string } => {
    const hash = location.hash
    const match = hash.match(/^#\/docs\/(getting-started|syntax|stdlib)\/([^/]+)$/)
    if (match) {
      const mode = match[1] as DocSection
      const slug = decodeURIComponent(match[2])
      if (findArticle(slug)) {
        return { mode, slug }
      }
      return { mode, slug: firstSlug(mode) }
    }
    return { mode: 'getting-started', slug: firstSlug('getting-started') }
  }

  const initialState = getInitialState()
  const [docMode, setDocMode] = useState<DocSection>(initialState.mode)
  const docGroups = manifest[docMode]
  const [expandedGroups, setExpandedGroups] = useState<string[]>(allGroupTitles[docMode])
  const [activeSlug, setActiveSlug] = useState(initialState.slug)
  const [searchQuery, setSearchQuery] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const activeArticle = findArticle(activeSlug)
  const activeGroup = findGroup(docMode, activeSlug)

  useEffect(() => {
    const hash = `#/docs/${docMode}/${encodeURIComponent(activeSlug)}`
    if (location.hash !== hash) {
      navigate(hash, { replace: true })
    }
  }, [activeSlug, docMode])

  useEffect(() => {
    document.title = 'Documentation — ShardScript'
    window.scrollTo(0, 0)
  }, [activeSlug])

  const toggleGroup = (title: string) => {
    setExpandedGroups((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    )
  }

  const filteredGroups = useMemo(() => {
    if (!searchQuery.trim()) return docGroups
    const query = searchQuery.toLowerCase()
    return docGroups
      .map((group) => ({
        ...group,
        items: group.items.filter((item) => item.title.toLowerCase().includes(query)),
      }))
      .filter((group) => group.items.length > 0)
  }, [searchQuery, docGroups])

  const switchMode = (mode: DocSection) => {
    setDocMode(mode)
    setExpandedGroups(allGroupTitles[mode])
    setActiveSlug(firstSlug(mode))
  }

  const breadcrumbs = useMemo(() => {
    const sector = SECTION_LABELS[docMode]
    if (activeGroup) {
      return `Docs / ${sector} / ${activeGroup.title} / ${activeArticle?.title ?? activeSlug}`
    }
    return `Docs / ${sector} / ${activeArticle?.title ?? activeSlug}`
  }, [docMode, activeGroup, activeArticle, activeSlug])

  return (
    <div className="bg-[#1E1E2E] min-h-screen">
      <div className="lg:hidden fixed top-[72px] left-0 right-0 z-30 bg-[#252538] border-b border-[#3A3A50] px-6 py-3">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="flex items-center gap-2 text-text-secondary font-inter text-sm"
        >
          <ChevronDown
            size={16}
            className={`transition-transform duration-200 ${sidebarOpen ? 'rotate-180' : ''}`}
          />
          {activeArticle?.title ?? activeSlug}
        </button>
      </div>

      <div className="flex pt-[70px]">
        <aside
          className={`fixed lg:sticky top-[72px] left-0 w-[360px] h-[calc(100vh-72px)] bg-[#252538] border-r border-[#3A3A50] overflow-y-auto z-20 transition-transform duration-300 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          <div className="p-0">
            <div className="flex gap-1 mb-5 bg-[#1E1E2E] m-4 rounded-card p-1 border border-[#3A3A50]">
              {(Object.keys(SECTION_LABELS) as DocSection[]).map((section) => (
                <button
                  key={section}
                  onClick={() => switchMode(section)}
                  className={`flex-1 py-2 text-xs font-medium font-inter rounded-md transition-all duration-200 ${
                    docMode === section
                      ? 'bg-burgundy text-white shadow-md'
                      : 'text-text-muted hover:text-text-secondary'
                  }`}
                >
                  {SECTION_LABELS[section]}
                </button>
              ))}
            </div>

            <div className="relative mb-6 m-4">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#2D2D45] border border-[#3A3A50] rounded-input py-2.5 pl-10 pr-4 text-sm text-text-primary placeholder:text-text-muted font-inter focus:outline-none focus:border-burgundy focus:shadow-glowBurgundy transition-all duration-300"
              />
            </div>

            <div className="space-y-6">
              {filteredGroups.map((group) => (
                <div key={group.title}>
                  <button
                    onClick={() => toggleGroup(group.title)}
                    className="w-full flex items-center justify-between underline pl-2 pr-3 py-2 text-base font-semibold text-text-secondary hover:bg-[rgba(155,45,48,0.1)] hover:text-text-primary bg-[rgba(30,30,46,0.5)] transition-colors duration-200"
                  >
                    <span className="truncate">{group.title}</span>
                    <ChevronDown
                      size={14}
                      className={`ml-2 flex-shrink-0 transition-transform duration-200 ${
                        expandedGroups.includes(group.title) ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {expandedGroups.includes(group.title) && (
                    <div className="mt-1">
                      {group.items.map((item) => (
                        <button
                          key={item.slug}
                          onClick={() => {
                            setActiveSlug(item.slug)
                            setSidebarOpen(false)
                          }}
                          className={`w-full text-left pl-7 pr-5 py-2 text-sm font-inter rounded transition-all duration-200 ${
                            activeSlug === item.slug
                              ? 'bg-[rgba(100,110,160,0.15)] text-[#7A8AB5] border-l-[3px] border-l-burgundy'
                              : 'text-text-secondary hover:bg-[rgba(155,45,48,0.1)] hover:text-text-primary'
                          }`}
                        >
                          {item.title}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </aside>

        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/60 z-10 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <main className="flex-1 min-w-0 lg:ml-0">
          <div className="max-w-[800px] mx-auto px-6 md:px-16 py-12 lg:py-12 pt-[140px] lg:pt-12">
            <ScrollReveal>
              <p className="text-xs font-medium tracking-[0.05em] uppercase text-text-muted mb-4">
                {breadcrumbs}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.05}>
              <h1 className="font-space text-4xl md:text-5xl font-bold text-text-primary leading-[1.1] tracking-tight mb-2">
                {activeArticle?.title ?? activeSlug}
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <p className="text-xs font-medium tracking-[0.05em] uppercase text-text-muted mb-10">
                Updated: July 2026
              </p>
            </ScrollReveal>

            <div className="docs-content">
              {activeArticle ? (
                <ArticleLoader file={activeArticle.file} />
              ) : (
                <div className="bg-[#252538] border border-[#3A3A50] rounded-card p-6">
                  <p className="text-text-secondary">
                    This article has not been migrated yet. Slug: <code>{activeSlug}</code>
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>

        <aside className="hidden xl:block w-[200px] sticky top-[72px] h-[calc(100vh-72px)] overflow-y-auto p-6">
          <p className="text-xs font-medium tracking-[0.05em] uppercase text-text-muted mb-4">
            IN THIS SECTION
          </p>
          <div className="space-y-1">
            {(activeGroup?.items ?? []).map((item) => (
              <button
                key={item.slug}
                onClick={() => setActiveSlug(item.slug)}
                className={`block w-full text-left text-sm py-1 transition-colors duration-200 ${
                  activeSlug === item.slug
                    ? 'text-[#7A8AB5] font-medium'
                    : 'text-text-muted hover:text-text-secondary'
                }`}
              >
                {item.title}
              </button>
            ))}
          </div>
          <div className="mt-8 pt-6 border-t border-[#3A3A50]">
            <p className="text-xs font-medium tracking-[0.05em] uppercase text-text-muted mb-3">
              REFERENCE
            </p>
            <a
              href="https://github.com/Rikitav/ShardScript"
              target="_blank"
              rel="noreferrer"
              className="block text-sm text-text-muted hover:text-text-secondary transition-colors duration-200"
            >
              Source &amp; examples ↗
            </a>
          </div>
        </aside>
      </div>
    </div>
  )
}
