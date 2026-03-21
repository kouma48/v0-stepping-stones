'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

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
  const [isExpanded, setIsExpanded] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % GALLERY_IMAGES.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length)
  }, [])

  // Keyboard navigation when expanded
  useEffect(() => {
    if (!isExpanded) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsExpanded(false)
      if (e.key === 'ArrowRight') nextSlide()
      if (e.key === 'ArrowLeft') prevSlide()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isExpanded, nextSlide, prevSlide])

  // Handle click to expand
  const handleExpand = () => {
    setIsExpanded(true)
  }

  // Handle click to collapse (click on image area)
  const handleCollapse = () => {
    setIsExpanded(false)
  }

  return (
    <section
      ref={sectionRef}
      className={`relative overflow-hidden transition-all duration-700 ease-out ${
        isExpanded ? 'h-screen' : 'py-16 md:py-24'
      }`}
      style={{ background: isExpanded ? '#000' : '#fff' }}
    >
      {/* Collapsed state - small preview image */}
      <div
        className={`max-w-[1000px] mx-auto px-6 md:px-12 transition-all duration-700 ${
          isExpanded ? 'opacity-0 pointer-events-none scale-110' : 'opacity-100'
        }`}
      >
        <button
          onClick={handleExpand}
          className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-lg overflow-hidden group cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-4"
          style={{ '--tw-ring-color': '#c11f1e' } as React.CSSProperties}
          aria-label="Expand gallery"
        >
          <Image
            src={GALLERY_IMAGES[0].src}
            alt={GALLERY_IMAGES[0].alt}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 1000px) 100vw, 1000px"
            priority
            crossOrigin="anonymous"
          />
          {/* Overlay with expand hint */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end justify-center pb-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex items-center gap-3 text-white">
              <span className="font-sans text-sm tracking-wide uppercase">View Campus Gallery</span>
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                </svg>
              </div>
            </div>
          </div>
          {/* Image count badge */}
          <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm text-white text-xs font-sans px-3 py-1.5 rounded-full">
            {GALLERY_IMAGES.length} Photos
          </div>
        </button>
      </div>

      {/* Expanded state - full screen carousel */}
      <div
        className={`absolute inset-0 transition-all duration-700 ${
          isExpanded ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Close hint area - clicking anywhere on image closes */}
        <div
          className="absolute inset-0 z-10 cursor-pointer"
          onClick={handleCollapse}
          aria-label="Close gallery"
        />

        {/* Images */}
        {GALLERY_IMAGES.map((image, index) => (
          <div
            key={image.src}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              sizes="100vw"
              priority={index === 0 || index === currentIndex}
              crossOrigin="anonymous"
            />
          </div>
        ))}

        {/* Navigation - Previous */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            prevSlide()
          }}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-transform hover:scale-110"
          style={{ background: '#c11f1e' }}
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>

        {/* Navigation - Next */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            nextSlide()
          }}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-transform hover:scale-110"
          style={{ background: '#c11f1e' }}
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        {/* Dot indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
          {GALLERY_IMAGES.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation()
                setCurrentIndex(index)
              }}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-white scale-125'
                  : 'bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>

        {/* Close hint */}
        <div className="absolute top-6 right-6 z-20 text-white/60 text-xs font-sans tracking-wide uppercase">
          Click anywhere to close
        </div>
      </div>
    </section>
  )
}
