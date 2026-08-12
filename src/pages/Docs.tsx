import { useState, useEffect, useMemo, Suspense, lazy } from 'react'
import type { ComponentType } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Search, ChevronDown } from 'lucide-react'
import ScrollReveal from '../components/ScrollReveal'
import MdxPage from '../components/docs/MdxPage'
import manifest from '../docs/manifest'

const mdxModules = import.meta.glob('../docs/**/*.mdx') as Record<
  string,
  () => Promise<{ default: ComponentType<Record<string, unknown>> }>
>

type DocSection = 'getting-started' | 'syntax' | 'stdlib' | 'library-building'

const SECTION_LABELS: Record<DocSection, string> = {
  'getting-started': 'Getting Started',
  syntax: 'Syntax',
  stdlib: 'Std. Library',
  'library-building': 'Library Building',
}

const allGroupTitles: Record<DocSection, string[]> = {
  'getting-started': manifest['getting-started'].map((g) => g.title),
  syntax: manifest.syntax.map((g) => g.title),
  stdlib: manifest.stdlib.map((g) => g.title),
  'library-building': manifest['library-building'].map((g) => g.title),
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
        <div className="bg-[#1B1B1E] border border-[#353539] rounded-card p-6">
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
          <div className="h-8 bg-[#252529] rounded w-2/3" />
          <div className="h-4 bg-[#252529] rounded w-full" />
          <div className="h-4 bg-[#252529] rounded w-5/6" />
          <div className="h-32 bg-[#252529] rounded w-full" />
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
  const params = useParams()

  const parseDocPath = (path: string): { mode: DocSection; slug: string } | null => {
    const normalized = path.replace(/^\//, '').replace(/\/$/, '')
    const match = normalized.match(/^(getting-started|syntax|stdlib|library-building)(?:\/([^/]+))?$/)
    if (!match) {
      return null
    }
    const mode = match[1] as DocSection
    const slug = match[2] ? decodeURIComponent(match[2]) : firstSlug(mode)
    if (findArticle(slug)) {
      return { mode, slug }
    }
    return { mode, slug: firstSlug(mode) }
  }

  const getInitialState = (): { mode: DocSection; slug: string } => {
    // Prefer the clean pathname (/shardscript-info/docs/<section>/<slug>).
    const docsPath = (params['*'] ?? '').trim()
    const parsedPath = docsPath ? parseDocPath(docsPath) : null
    if (parsedPath) {
      return parsedPath
    }

    // Fall back to the legacy hash format (#/docs/<section>/<slug>).
    const hashMatch = location.hash.match(/^#\/docs\/(getting-started|syntax|stdlib|library-building)(?:\/([^/]+))?$/)
    if (hashMatch) {
      const mode = hashMatch[1] as DocSection
      const slug = hashMatch[2] ? decodeURIComponent(hashMatch[2]) : firstSlug(mode)
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
    const slugPart = activeSlug ? `/${encodeURIComponent(activeSlug)}` : ''
    const expectedPath = `/shardscript-info/docs/${docMode}${slugPart}`
    if (location.pathname !== expectedPath) {
      navigate(expectedPath, { replace: true })
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
    if (!activeSlug) {
      return `Docs / ${sector}`
    }
    if (activeGroup) {
      return `Docs / ${sector} / ${activeGroup.title} / ${activeArticle?.title ?? activeSlug}`
    }
    return `Docs / ${sector} / ${activeArticle?.title ?? activeSlug}`
  }, [docMode, activeGroup, activeArticle, activeSlug])

  return (
    <div className="bg-[#1F1F23] min-h-screen">
      <div className="lg:hidden fixed top-[72px] left-0 right-0 z-30 bg-[#1B1B1E] border-b border-[#353539] px-6 py-3">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="flex items-center gap-2 text-text-secondary font-inter text-sm"
        >
          <ChevronDown
            size={16}
            className={`transition-transform duration-200 ${sidebarOpen ? 'rotate-180' : ''}`}
          />
          {activeArticle?.title ?? SECTION_LABELS[docMode]}
        </button>
      </div>

      <div className="flex pt-[70px]">
        <aside
          className={`fixed lg:sticky top-[72px] left-0 w-[360px] h-[calc(100vh-72px)] bg-[#1B1B1E] border-r border-[#353539] overflow-y-auto z-20 transition-transform duration-300 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          <div className="p-0">
            <div className="m-4 mb-5 p-3 border-2 border-[#5A6A82] rounded-card bg-[#151518]">
              <p className="text-xs font-bold tracking-[0.05em] uppercase text-text-muted mb-2">
                Section
              </p>
              <ul className="space-y-1">
                {(Object.keys(SECTION_LABELS) as DocSection[]).map((section) => (
                  <li key={section}>
                    <button
                      onClick={() => switchMode(section)}
                      className={`w-full text-left px-3 py-2 rounded text-sm font-inter transition-colors duration-200 ${
                        docMode === section
                          ? 'bg-[rgba(100,110,130,0.18)] text-[#7F90A8] border-l-[3px] border-l-[#7F90A8] font-bold'
                          : 'text-text-secondary hover:bg-[rgba(90,106,130,0.1)] hover:text-text-primary'
                      }`}
                      aria-current={docMode === section ? 'page' : undefined}
                    >
                      {SECTION_LABELS[section]}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative mb-6 m-4">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#252529] border border-[#353539] rounded-input py-2.5 pl-10 pr-4 text-sm text-text-primary placeholder:text-text-muted font-inter focus:outline-none focus:border-[#5A6A82] focus:shadow-[0_0_40px_rgba(90,106,130,0.25)] transition-all duration-300"
              />
            </div>

            <div className="space-y-6">
              {filteredGroups.map((group) => (
                <div key={group.title}>
                  <button
                    onClick={() => toggleGroup(group.title)}
                    className="w-full flex items-center justify-between underline pl-2 pr-3 py-2 text-base font-semibold text-text-secondary hover:bg-[rgba(90,106,130,0.1)] hover:text-text-primary bg-[rgba(30,30,34,0.6)] transition-colors duration-200"
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
                              ? 'bg-[rgba(100,110,130,0.12)] text-[#7F90A8] border-l-[3px] border-l-[#5A6A82]'
                              : 'text-text-secondary hover:bg-[rgba(90,106,130,0.1)] hover:text-text-primary'
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
                {activeArticle?.title ?? SECTION_LABELS[docMode]}
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
                <div className="bg-[#1B1B1E] border border-[#353539] rounded-card p-6">
                  <p className="text-text-secondary">
                    {activeSlug
                      ? <>This article has not been migrated yet. Slug: <code>{activeSlug}</code></>
                      : 'No articles in this section yet.'}
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
                    ? 'text-[#7F90A8] font-medium'
                    : 'text-text-muted hover:text-text-secondary'
                }`}
              >
                {item.title}
              </button>
            ))}
          </div>
          <div className="mt-8 pt-6 border-t border-[#353539]">
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
