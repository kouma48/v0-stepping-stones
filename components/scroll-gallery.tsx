'use client'

import { useState, useCallback, useEffect } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

// Gallery images
const GALLERY_IMAGES = [
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image.png-ICuR5nH7GMCIYFdxnwCmmO7mURmZe6.jpeg',
    alt: 'Students walking across manicured school grounds',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-6YNMOSy3CyVNB8JnHVqfVuLb6VJfbW.png',
    alt: 'Students gathered around campfire at night',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image.png-BTOcA4S3qa8a3WRVNhZi9lbzr0QdZw.jpeg',
    alt: 'Cricket match on school grounds',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image.png-dTVspKtQ5pxszbhCDF94unXM7XvV8f.jpeg',
    alt: 'Victorian school building with large trees',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image.png-QHVOXC5DWv2MWRPeCpWRkyJrc0U1k0.jpeg',
    alt: 'Modern school dormitory buildings surrounded by trees',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image.png-iHJRdw1yKdBnmJCQA3vGupLcXx5jT5.jpeg',
    alt: 'Students hiking outdoors with backpacks',
  },
]

export default function ScrollGallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const openLightbox = (index: number) => {
    setCurrentIndex(index)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
  }

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % GALLERY_IMAGES.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length)
  }, [])

  // Keyboard navigation
  useEffect(() => {
    if (!lightboxOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') nextSlide()
      if (e.key === 'ArrowLeft') prevSlide()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxOpen, nextSlide, prevSlide])

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

  return (
    <>
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          {/* Section header */}
          <div className="text-center mb-12">
            <span
              className="font-sans text-xs tracking-[0.25em] uppercase font-semibold block mb-4"
              style={{ color: '#c11f1e' }}
            >
              Campus Life
            </span>
            <h2
              className="font-serif text-[clamp(2.5rem,5vw,4rem)] leading-tight text-balance"
              style={{ color: 'var(--color-school-heading)' }}
            >
              A glimpse into our world
            </h2>
          </div>

          {/* Thumbnail grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {GALLERY_IMAGES.map((image, index) => (
              <button
                key={image.src}
                onClick={() => openLightbox(index)}
                className="relative aspect-[4/3] overflow-hidden rounded-lg group cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={{ '--tw-ring-color': '#c11f1e' } as React.CSSProperties}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 33vw"
                  crossOrigin="anonymous"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-75 group-hover:scale-100">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#0F2C4C"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                    </svg>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox carousel */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            aria-label="Close gallery"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Previous button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              prevSlide()
            }}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full flex items-center justify-center transition-colors"
            style={{ background: '#c11f1e' }}
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          {/* Next button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              nextSlide()
            }}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full flex items-center justify-center transition-colors"
            style={{ background: '#c11f1e' }}
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          {/* Main image */}
          <div
            className="relative w-full h-full max-w-6xl max-h-[80vh] mx-4 md:mx-16"
            onClick={(e) => e.stopPropagation()}
          >
            {GALLERY_IMAGES.map((image, index) => (
              <div
                key={image.src}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  index === currentIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority={index === currentIndex}
                  crossOrigin="anonymous"
                />
              </div>
            ))}
          </div>

          {/* Dot indicators */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {GALLERY_IMAGES.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation()
                  setCurrentIndex(index)
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-white w-6' : 'bg-white/40 hover:bg-white/60'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>

          {/* Image counter */}
          <div className="absolute bottom-8 right-8 z-20 font-sans text-sm text-white/60">
            {currentIndex + 1} / {GALLERY_IMAGES.length}
          </div>
        </div>
      )}
    </>
  )
}
