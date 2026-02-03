'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

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
 */
export function TableOfContents({ content, className }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')
  const [headings, setHeadings] = useState<TOCItem[]>([])

  // Extract headings from content
  useEffect(() => {
    const extractedHeadings: TOCItem[] = []
    const headingRegex = /^(#{2,3})\s+(.+)$/gm
    let match

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length
      const text = match[2].replace(/\*\*|__/g, '') // Remove bold markers
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')

      extractedHeadings.push({ id, text, level })
    }

    setHeadings(extractedHeadings)
  }, [content])

  // Track active heading based on scroll
  useEffect(() => {
    if (headings.length === 0) return

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

    return () => observer.disconnect()
  }, [headings])

  if (headings.length < 3) return null

  return (
    <nav
      className={cn('toc sticky top-24', className)}
      aria-label="Table of contents"
    >
      <h4 className="text-sm font-semibold text-neutral-900 mb-3">
        On this page
      </h4>
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li
            key={heading.id}
            style={{ paddingLeft: `${(heading.level - 2) * 12}px` }}
          >
            <a
              href={`#${heading.id}`}
              className={cn(
                'block text-sm transition-colors',
                activeId === heading.id
                  ? 'text-primary-600 font-medium'
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
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
