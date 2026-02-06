'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { List } from 'lucide-react'

interface TOCItem {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  content: string
  className?: string
}

/**
 * TableOfContents - Auto-generated TOC from markdown headings
 *
 * Parses content for headings and generates anchor links.
 * Highlights current section based on scroll position.
 * Premium styling with progress indicator.
 */
export function TableOfContents({ content, className }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')
  const [headings, setHeadings] = useState<TOCItem[]>([])
  const [progress, setProgress] = useState(0)

  // Extract headings from content
  useEffect(() => {
    const extractedHeadings: TOCItem[] = []
    const headingRegex = /^(#{2,3})\s+(.+)$/gm
    let match

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length
      const text = match[2]
        .replace(/\*\*|__/g, '') // Remove bold markers
        .replace(/\[!.*?\]/g, '') // Remove callout markers
        .trim()
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')

      extractedHeadings.push({ id, text, level })
    }

    setHeadings(extractedHeadings)
  }, [content])

  // Track active heading and reading progress
  useEffect(() => {
    if (headings.length === 0) return

    const handleScroll = () => {
      // Calculate reading progress
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollProgress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      setProgress(Math.min(100, Math.max(0, scrollProgress)))
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-100px 0px -66%',
      }
    )

    headings.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [headings])

  if (headings.length < 3) return null

  return (
    <nav
      className={cn('toc', className)}
      aria-label="Table of contents"
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-neutral-200">
        <List className="w-4 h-4 text-primary-600" />
        <h4 className="text-sm font-semibold text-neutral-900">On this page</h4>
      </div>

      {/* Progress Bar */}
      <div className="h-1 bg-neutral-200 rounded-full mb-4 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* TOC Items */}
      <ul className="space-y-1">
        {headings.map((heading, index) => {
          const isActive = activeId === heading.id
          const isPast = headings.findIndex(h => h.id === activeId) > index

          return (
            <li
              key={heading.id}
              style={{ paddingLeft: `${(heading.level - 2) * 12}px` }}
            >
              <a
                href={`#${heading.id}`}
                className={cn(
                  'group flex items-center gap-2 py-1.5 text-sm transition-all duration-200 rounded-md hover:bg-neutral-100 px-2 -ml-2',
                  isActive
                    ? 'text-primary-600 font-medium bg-primary-50'
                    : isPast
                      ? 'text-neutral-400'
                      : 'text-neutral-600 hover:text-neutral-900'
                )}
                onClick={(e) => {
                  e.preventDefault()
                  const element = document.getElementById(heading.id)
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' })
                    setActiveId(heading.id)
                  }
                }}
              >
                {/* Active indicator dot */}
                <span
                  className={cn(
                    'w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-200',
                    isActive
                      ? 'bg-primary-500 scale-100'
                      : isPast
                        ? 'bg-neutral-300 scale-75'
                        : 'bg-transparent scale-0 group-hover:bg-neutral-300 group-hover:scale-75'
                  )}
                />
                <span className="truncate">{heading.text}</span>
              </a>
            </li>
          )
        })}
      </ul>

      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="w-full mt-4 pt-3 border-t border-neutral-200 text-xs text-neutral-500 hover:text-primary-600 transition-colors flex items-center justify-center gap-1"
      >
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
        Back to top
      </button>
    </nav>
  )
}
