import Link from 'next/link'
import { Home, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-primary-50 to-accent-50">
      <div className="max-w-md w-full text-center">
        {/* 404 visual */}
        <div className="mb-8">
          <span className="text-8xl font-bold text-primary-200">404</span>
        </div>

        {/* Message */}
        <h1 className="text-2xl font-bold text-neutral-900 mb-3">
          Page not found
        </h1>
        <p className="text-neutral-600 mb-8">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It may have been
          moved or deleted.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Home className="w-4 h-4" />
            Go home
          </Link>
          <Link
            href="/procedures"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white text-neutral-900 font-medium rounded-lg border border-neutral-200 hover:bg-neutral-50 transition-colors"
          >
            <Search className="w-4 h-4" />
            Browse procedures
          </Link>
        </div>
      </div>
    </div>
  )
}
