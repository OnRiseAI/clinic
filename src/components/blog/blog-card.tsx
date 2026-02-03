import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, User } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BlogCardProps {
  title: string
  slug: string
  excerpt: string
  imageUrl: string | null
  authorName: string
  publishedAt: string
  readingTime?: number
  category?: string
  className?: string
}

export function BlogCard({
  title,
  slug,
  excerpt,
  imageUrl,
  authorName,
  publishedAt,
  readingTime,
  category,
  className,
}: BlogCardProps) {
  const formattedDate = new Date(publishedAt).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

  return (
    <article
      className={cn(
        'group bg-white rounded-xl border border-neutral-200 overflow-hidden hover:shadow-lg transition-shadow',
        className
      )}
    >
      <Link href={`/blog/${slug}`} className="block">
        {/* Image */}
        <div className="relative aspect-[16/9] bg-neutral-100 overflow-hidden">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-neutral-400">
              <span className="text-sm">No image</span>
            </div>
          )}
          {category && (
            <span className="absolute top-3 left-3 px-2 py-1 bg-primary-600 text-white text-xs font-medium rounded">
              {category}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-lg font-semibold text-neutral-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
            {title}
          </h3>
          <p className="text-neutral-600 text-sm mb-4 line-clamp-2">{excerpt}</p>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-neutral-500">
            <span className="flex items-center gap-1">
              <User className="w-3 h-3 flex-shrink-0" />
              <span className="truncate max-w-[100px]">{authorName}</span>
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3 flex-shrink-0" />
              {formattedDate}
            </span>
            {readingTime && (
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 flex-shrink-0" />
                {readingTime} min
              </span>
            )}
          </div>
        </div>
      </Link>
    </article>
  )
}

interface BlogCardSkeletonProps {
  className?: string
}

export function BlogCardSkeleton({ className }: BlogCardSkeletonProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-xl border border-neutral-200 overflow-hidden animate-pulse',
        className
      )}
    >
      <div className="aspect-[16/9] bg-neutral-200" />
      <div className="p-5">
        <div className="h-5 bg-neutral-200 rounded mb-2 w-3/4" />
        <div className="h-4 bg-neutral-200 rounded mb-1 w-full" />
        <div className="h-4 bg-neutral-200 rounded mb-4 w-2/3" />
        <div className="flex gap-4">
          <div className="h-3 bg-neutral-200 rounded w-20" />
          <div className="h-3 bg-neutral-200 rounded w-20" />
        </div>
      </div>
    </div>
  )
}
