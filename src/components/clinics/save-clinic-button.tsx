'use client'

import { useState, useEffect } from 'react'
import { m, AnimatePresence, LazyMotion, domAnimation } from 'framer-motion'
import { Heart, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'

interface SaveClinicButtonProps {
  clinicId: string
  initialSaved?: boolean
  isAuthenticated: boolean
  variant?: 'icon' | 'button'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function SaveClinicButton({
  clinicId,
  initialSaved = false,
  isAuthenticated,
  variant = 'icon',
  size = 'md',
  className,
}: SaveClinicButtonProps) {
  const router = useRouter()
  const [isSaved, setIsSaved] = useState(initialSaved)
  const [isLoading, setIsLoading] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  useEffect(() => {
    setIsSaved(initialSaved)
  }, [initialSaved])

  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
  }

  const iconSizes = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  }

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!isAuthenticated) {
      setShowTooltip(true)
      setTimeout(() => setShowTooltip(false), 3000)
      return
    }

    setIsLoading(true)

    // Optimistic update
    const wasLiked = isSaved
    setIsSaved(!wasLiked)

    try {
      if (wasLiked) {
        // Unsave
        const res = await fetch(`/api/saved-clinics/${clinicId}`, {
          method: 'DELETE',
        })
        if (!res.ok) {
          setIsSaved(wasLiked) // Revert on error
        }
      } else {
        // Save
        const res = await fetch('/api/saved-clinics', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ clinic_id: clinicId }),
        })
        if (!res.ok) {
          setIsSaved(wasLiked) // Revert on error
        }
      }
    } catch {
      setIsSaved(wasLiked) // Revert on error
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignIn = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setShowTooltip(false)
    router.push(`/auth/signin?redirect=${encodeURIComponent(window.location.pathname)}`)
  }

  if (variant === 'button') {
    return (
      <LazyMotion features={domAnimation}>
        <div className="relative">
          <m.button
            onClick={handleClick}
            disabled={isLoading}
            whileTap={{ scale: 0.95 }}
            className={cn(
              'flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors',
              isSaved
                ? 'border-red-200 bg-red-50 text-red-600 hover:bg-red-100'
                : 'border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50',
              className
            )}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <m.div
                animate={isSaved ? { scale: [1, 1.3, 1] } : { scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Heart
                  className={cn('h-4 w-4', isSaved && 'fill-red-500 text-red-500')}
                />
              </m.div>
            )}
            {isSaved ? 'Saved' : 'Save'}
          </m.button>

          <AnimatePresence>
            {showTooltip && !isAuthenticated && (
              <m.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute left-1/2 top-full z-50 mt-2 -translate-x-1/2"
              >
                <div className="rounded-lg bg-neutral-900 px-4 py-3 text-sm text-white shadow-lg">
                  <p className="whitespace-nowrap">Sign in to save clinics</p>
                  <button
                    onClick={handleSignIn}
                    className="mt-2 w-full rounded-md bg-white px-3 py-1.5 text-sm font-medium text-neutral-900 hover:bg-neutral-100"
                  >
                    Sign In
                  </button>
                  <div className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-neutral-900" />
                </div>
              </m.div>
            )}
          </AnimatePresence>
        </div>
      </LazyMotion>
    )
  }

  return (
    <LazyMotion features={domAnimation}>
      <div className="relative">
        <m.button
          onClick={handleClick}
          disabled={isLoading}
          whileTap={{ scale: 0.9 }}
          className={cn(
            'flex items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur-sm transition-colors hover:bg-white',
            sizeClasses[size],
            className
          )}
          aria-label={isSaved ? 'Remove from saved' : 'Save clinic'}
        >
          {isLoading ? (
            <Loader2 className={cn('animate-spin text-neutral-400', iconSizes[size])} />
          ) : (
            <m.div
              animate={isSaved ? { scale: [1, 1.4, 1] } : { scale: 1 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <Heart
                className={cn(
                  iconSizes[size],
                  'transition-colors',
                  isSaved ? 'fill-red-500 text-red-500' : 'text-neutral-600 hover:text-red-500'
                )}
              />
            </m.div>
          )}
        </m.button>

        <AnimatePresence>
          {showTooltip && !isAuthenticated && (
            <m.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute right-0 top-full z-50 mt-2"
            >
              <div className="rounded-lg bg-neutral-900 px-4 py-3 text-sm text-white shadow-lg">
                <p className="whitespace-nowrap">Sign in to save clinics</p>
                <button
                  onClick={handleSignIn}
                  className="mt-2 w-full rounded-md bg-white px-3 py-1.5 text-sm font-medium text-neutral-900 hover:bg-neutral-100"
                >
                  Sign In
                </button>
                <div className="absolute -top-1 right-4 h-2 w-2 rotate-45 bg-neutral-900" />
              </div>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </LazyMotion>
  )
}
