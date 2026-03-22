'use client'

import { useState, useCallback, useEffect } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

// Gallery images - using the new campus main image first
const GALLERY_IMAGES = [
  {
    src: '/images/campus-main.jpg',
    alt: 'Students in burgundy blazers walking across the school lawn',
  },
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
]

export default function ScrollGallery() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % GALLERY_IMAGES.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length)
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide()
      if (e.key === 'ArrowLeft') prevSlide()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [nextSlide, prevSlide])

  return (
    <section className="relative h-[70vh] md:h-[85vh] overflow-hidden">
      {/* Images with dark overlay */}
      {GALLERY_IMAGES.map((image, index) => (
        <div
          key={image.src}
          className={`absolute inset-0 transition-opacity duration-700 ease-out ${
            index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover"
            sizes="100vw"
            priority={index === 0}
            crossOrigin="anonymous"
          />
          {/* Dark overlay with light text */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end justify-center pb-16 md:pb-24">
            <p className="text-white text-center font-serif text-lg md:text-2xl max-w-2xl px-6 text-pretty">
              {image.alt}
            </p>
          </div>
        </div>
      ))}

      {/* Navigation - Previous (red circular button) */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg"
        style={{ background: '#c11f1e' }}
        aria-label="Previous image"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>

      {/* Navigation - Next (red circular button) */}
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg"
        style={{ background: '#c11f1e' }}
        aria-label="Next image"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Dot indicators - centered at bottom */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {GALLERY_IMAGES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-white scale-125'
                : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
