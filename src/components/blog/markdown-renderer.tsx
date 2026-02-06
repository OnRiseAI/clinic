'use client'

import { useMemo, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug'
import {
    Info,
    AlertTriangle,
    CheckCircle,
    Lightbulb,
    ExternalLink
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface MarkdownRendererProps {
    content: string
    className?: string
    /** Skip the first H1 heading (useful when title is shown separately) */
    skipFirstH1?: boolean
}

// Callout box patterns for special content
const CALLOUT_PATTERNS = {
    info: /^\[!INFO\]/i,
    warning: /^\[!WARNING\]/i,
    success: /^\[!SUCCESS\]/i,
    tip: /^\[!TIP\]/i,
}

const CalloutIcon = {
    info: Info,
    warning: AlertTriangle,
    success: CheckCircle,
    tip: Lightbulb,
}

const calloutStyles = {
    info: 'bg-blue-50 border-blue-400 text-blue-800',
    warning: 'bg-amber-50 border-amber-400 text-amber-800',
    success: 'bg-emerald-50 border-emerald-400 text-emerald-800',
    tip: 'bg-purple-50 border-purple-400 text-purple-800',
}

/**
 * MarkdownRenderer - Beautifully styled markdown content renderer
 * 
 * Features:
 * - GitHub Flavored Markdown (tables, strikethrough, etc.)
 * - Syntax highlighting for code blocks
 * - Auto-generated heading slugs
 * - Custom callout boxes
 * - Emoji support
 * - Responsive tables
 * - Styled blockquotes
 */
export function MarkdownRenderer({ content, className, skipFirstH1 = false }: MarkdownRendererProps) {
    const pCountRef = useRef(0)

    // Preprocess content to remove the first H1 heading if skipFirstH1 is true
    const processedContent = useMemo(() => {
        pCountRef.current = 0
        if (!skipFirstH1) return content

        const lines = content.split('\n')
        const firstH1Index = lines.findIndex(line => line.trim().startsWith('# '))

        if (firstH1Index === -1) return content

        const newLines = [...lines]
        newLines.splice(firstH1Index, 1)
        return newLines.join('\n')
    }, [content, skipFirstH1])

    return (
        <div
            className={cn(
                'blog-content',
                className
            )}
        >
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw, rehypeSlug]}
                components={{
                    // Heading components with proper sizing
                    h1: ({ children, ...props }) => (
                        <h1
                            className="text-3xl md:text-4xl lg:text-[48px] font-bold leading-tight text-neutral-900 mt-12 mb-6 first:mt-0 text-balance"
                            {...props}
                        >
                            {children}
                        </h1>
                    ),
                    h2: ({ children, ...props }) => (
                        <h2
                            className="text-2xl md:text-[32px] font-semibold leading-snug text-neutral-900 mt-10 mb-4 pb-3 border-b border-neutral-200 text-balance"
                            {...props}
                        >
                            {children}
                        </h2>
                    ),
                    h3: ({ children, ...props }) => (
                        <h3
                            className="text-xl md:text-[24px] font-medium leading-snug text-neutral-900 mt-8 mb-3 text-balance"
                            {...props}
                        >
                            {children}
                        </h3>
                    ),
                    h4: ({ children, ...props }) => (
                        <h4
                            className="text-lg md:text-xl font-medium text-neutral-900 mt-6 mb-2"
                            {...props}
                        >
                            {children}
                        </h4>
                    ),

                    // Paragraphs with lead styling for the first one
                    p: ({ children, ...props }) => {
                        const isLead = ++pCountRef.current === 1

                        return (
                            <p
                                className={cn(
                                    'text-neutral-700 leading-[1.8] mb-6',
                                    isLead && 'text-xl sm:text-2xl text-neutral-600 font-medium leading-relaxed mb-8'
                                )}
                                {...props}
                            >
                                {children}
                            </p>
                        )
                    },

                    // Links with hover effects
                    a: ({ href, children, ...props }) => {
                        const isExternal = href?.startsWith('http')
                        return (
                            <a
                                href={href}
                                target={isExternal ? '_blank' : undefined}
                                rel={isExternal ? 'noopener noreferrer' : undefined}
                                className="text-primary-600 hover:text-primary-700 underline decoration-primary-300 hover:decoration-primary-500 underline-offset-2 transition-colors inline-flex items-center gap-1"
                                {...props}
                            >
                                {children}
                                {isExternal && <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />}
                            </a>
                        )
                    },

                    // Lists with custom styling
                    ul: ({ children, ...props }) => (
                        <ul
                            className="my-6 ml-6 list-disc space-y-2 text-neutral-700 marker:text-primary-500"
                            {...props}
                        >
                            {children}
                        </ul>
                    ),
                    ol: ({ children, ...props }) => (
                        <ol
                            className="my-6 ml-6 list-decimal space-y-2 text-neutral-700 marker:text-primary-600 marker:font-semibold"
                            {...props}
                        >
                            {children}
                        </ol>
                    ),
                    li: ({ children, ...props }) => (
                        <li
                            className="leading-relaxed pl-1"
                            {...props}
                        >
                            {children}
                        </li>
                    ),

                    // Blockquotes with accent styling
                    blockquote: ({ children }) => {
                        // Check if this is a callout
                        const textContent = children?.toString() || ''
                        let calloutType: keyof typeof CALLOUT_PATTERNS | null = null

                        for (const [type, pattern] of Object.entries(CALLOUT_PATTERNS)) {
                            if (pattern.test(textContent)) {
                                calloutType = type as keyof typeof CALLOUT_PATTERNS
                                break
                            }
                        }

                        if (calloutType) {
                            const Icon = CalloutIcon[calloutType]
                            return (
                                <div
                                    className={cn(
                                        'my-6 p-4 rounded-lg border-l-4',
                                        calloutStyles[calloutType]
                                    )}
                                >
                                    <div className="flex items-start gap-3">
                                        <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                        <div className="flex-1 [&>p]:mb-0 [&>p]:mt-0">
                                            {children}
                                        </div>
                                    </div>
                                </div>
                            )
                        }

                        return (
                            <blockquote
                                className="my-6 border-l-4 border-primary-400 bg-neutral-50 py-4 px-6 rounded-r-lg text-neutral-700 italic [&>p]:mb-0"
                            >
                                {children}
                            </blockquote>
                        )
                    },

                    // Tables with responsive wrapper and premium styling
                    table: ({ children, ...props }) => (
                        <div className="my-8 overflow-x-auto rounded-xl border border-neutral-200 shadow-sm">
                            <table
                                className="w-full border-collapse text-left"
                                {...props}
                            >
                                {children}
                            </table>
                        </div>
                    ),
                    thead: ({ children, ...props }) => (
                        <thead
                            className="bg-gradient-to-r from-primary-600 to-primary-700 text-white"
                            {...props}
                        >
                            {children}
                        </thead>
                    ),
                    tbody: ({ children, ...props }) => (
                        <tbody
                            className="divide-y divide-neutral-200"
                            {...props}
                        >
                            {children}
                        </tbody>
                    ),
                    tr: ({ children, ...props }) => (
                        <tr
                            className="hover:bg-primary-50/50 transition-colors even:bg-neutral-50"
                            {...props}
                        >
                            {children}
                        </tr>
                    ),
                    th: ({ children, ...props }) => (
                        <th
                            className="px-4 py-3 text-sm font-semibold tracking-wide whitespace-nowrap"
                            {...props}
                        >
                            {children}
                        </th>
                    ),
                    td: ({ children, ...props }) => (
                        <td
                            className="px-4 py-3 text-sm text-neutral-700"
                            {...props}
                        >
                            {children}
                        </td>
                    ),

                    // Code blocks with syntax highlighting
                    code: ({ className, children, ...props }) => {
                        const isInline = !className

                        if (isInline) {
                            return (
                                <code
                                    className="px-1.5 py-0.5 rounded bg-neutral-100 text-primary-700 text-sm font-mono"
                                    {...props}
                                >
                                    {children}
                                </code>
                            )
                        }

                        return (
                            <code
                                className={cn(
                                    'block rounded-lg bg-neutral-900 text-neutral-100 p-4 text-sm font-mono overflow-x-auto',
                                    className
                                )}
                                {...props}
                            >
                                {children}
                            </code>
                        )
                    },
                    pre: ({ children, ...props }) => (
                        <pre
                            className="my-6 rounded-xl bg-neutral-900 p-0 overflow-hidden shadow-lg"
                            {...props}
                        >
                            {children}
                        </pre>
                    ),

                    // Images with proper styling
                    img: ({ src, alt, ...props }) => (
                        <figure className="my-8">
                            <img
                                src={src}
                                alt={alt || ''}
                                className="rounded-xl shadow-md w-full"
                                loading="lazy"
                                {...props}
                            />
                            {alt && (
                                <figcaption className="mt-3 text-center text-sm text-neutral-500 italic">
                                    {alt}
                                </figcaption>
                            )}
                        </figure>
                    ),

                    // Horizontal rule
                    hr: () => (
                        <hr className="my-10 border-0 h-px bg-gradient-to-r from-transparent via-neutral-300 to-transparent" />
                    ),

                    // Strong and emphasis
                    strong: ({ children, ...props }) => (
                        <strong className="font-semibold text-neutral-900" {...props}>
                            {children}
                        </strong>
                    ),
                    em: ({ children, ...props }) => (
                        <em className="italic text-neutral-700" {...props}>
                            {children}
                        </em>
                    ),
                }}
            >
                {processedContent}
            </ReactMarkdown>
        </div>
    )
}
