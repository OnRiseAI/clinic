'use client'

import { useState, useCallback, useEffect } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface Photo {
  id: string
  url: string
  alt_text: string | null
}

interface PhotoGalleryProps {
  photos: Photo[]
  clinicName: string
  className?: string
}

export function PhotoGallery({ photos, clinicName, className }: PhotoGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const openLightbox = (index: number) => {
    setCurrentIndex(index)
    setLightboxOpen(true)
  }

  const closeLightbox = () => setLightboxOpen(false)

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1))
  }, [photos.length])

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1))
  }, [photos.length])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') goToPrevious()
      if (e.key === 'ArrowRight') goToNext()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxOpen, goToPrevious, goToNext])

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [lightboxOpen])

  if (photos.length === 0) {
    return (
      <div className={cn('overflow-hidden rounded-2xl', className)}>
        <div className="flex aspect-[16/9] items-center justify-center bg-neutral-100">
          <div className="text-center">
            <span className="text-6xl text-neutral-300">📷</span>
            <p className="mt-4 text-neutral-500">Photos coming soon</p>
          </div>
        </div>
      </div>
    )
  }

  // Grid layout based on number of photos
  const renderGrid = () => {
    if (photos.length === 1) {
      return (
        <button
          onClick={() => openLightbox(0)}
          className="aspect-[16/9] w-full overflow-hidden rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          <img
            src={photos[0].url}
            alt={photos[0].alt_text || clinicName}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </button>
      )
    }

    if (photos.length === 2) {
      return (
        <div className="grid grid-cols-2 gap-2">
          {photos.map((photo, index) => (
            <button
              key={photo.id}
              onClick={() => openLightbox(index)}
              className="aspect-[4/3] overflow-hidden rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              <img
                src={photo.url}
                alt={photo.alt_text || `${clinicName} - Photo ${index + 1}`}
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </button>
          ))}
        </div>
      )
    }

    // 3+ photos: main image with grid
    return (
      <div className="grid grid-cols-4 gap-2">
        {/* Main large image */}
        <button
          onClick={() => openLightbox(0)}
          className="col-span-2 row-span-2 aspect-square overflow-hidden rounded-l-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          <img
            src={photos[0].url}
            alt={photos[0].alt_text || clinicName}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </button>

        {/* Secondary images */}
        {photos.slice(1, 5).map((photo, index) => (
          <button
            key={photo.id}
            onClick={() => openLightbox(index + 1)}
            className={cn(
              'aspect-square overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
              index === 1 && 'rounded-tr-2xl',
              index === 3 && 'rounded-br-2xl'
            )}
          >
            <div className="relative h-full w-full">
              <img
                src={photo.url}
                alt={photo.alt_text || `${clinicName} - Photo ${index + 2}`}
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
              />
              {/* Show more overlay on last visible image */}
              {index === 3 && photos.length > 5 && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <span className="text-lg font-semibold text-white">
                    +{photos.length - 5} more
                  </span>
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
    )
  }

  return (
    <>
      <div className={cn('overflow-hidden', className)}>{renderGrid()}</div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              aria-label="Close gallery"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Counter */}
            <div className="absolute left-4 top-4 rounded-full bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-sm">
              {currentIndex + 1} / {photos.length}
            </div>

            {/* Previous button */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                goToPrevious()
              }}
              className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              aria-label="Previous photo"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* Main image */}
            <m.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="max-h-[85vh] max-w-[90vw]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={photos[currentIndex].url}
                alt={
                  photos[currentIndex].alt_text ||
                  `${clinicName} - Photo ${currentIndex + 1}`
                }
                className="max-h-[85vh] max-w-full rounded-lg object-contain"
              />
            </m.div>

            {/* Next button */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                goToNext()
              }}
              className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              aria-label="Next photo"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {/* Thumbnail strip */}
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 overflow-x-auto rounded-lg bg-white/10 p-2 backdrop-blur-sm">
              {photos.map((photo, index) => (
                <button
                  key={photo.id}
                  onClick={(e) => {
                    e.stopPropagation()
                    setCurrentIndex(index)
                  }}
                  className={cn(
                    'h-16 w-16 flex-shrink-0 overflow-hidden rounded transition-all',
                    index === currentIndex
                      ? 'ring-2 ring-white'
                      : 'opacity-60 hover:opacity-100'
                  )}
                >
                  <img
                    src={photo.url}
                    alt={photo.alt_text || `Thumbnail ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  )
}
