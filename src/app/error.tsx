'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Home, RefreshCw, AlertTriangle } from 'lucide-react'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log error to error reporting service
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-red-50 to-orange-50">
      <div className="max-w-md w-full text-center">
        {/* Error visual */}
        <div className="mb-8 flex justify-center">
          <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center">
            <AlertTriangle className="w-10 h-10 text-red-600" />
          </div>
        </div>

        {/* Message */}
        <h1 className="text-2xl font-bold text-neutral-900 mb-3">
          Something went wrong
        </h1>
        <p className="text-neutral-600 mb-8">
          We encountered an unexpected error. Please try again, or contact support
          if the problem persists.
        </p>

        {/* Error digest for support */}
        {error.digest && (
          <p className="text-xs text-neutral-400 mb-6">
            Error ID: {error.digest}
          </p>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white text-neutral-900 font-medium rounded-lg border border-neutral-200 hover:bg-neutral-50 transition-colors"
          >
            <Home className="w-4 h-4" />
            Go home
          </Link>
        </div>
      </div>
    </div>
  )
}
