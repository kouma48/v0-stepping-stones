'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Settings } from 'lucide-react'
import { GalleryEditorPortals } from './gallery-editor'
import type { GalleryImage } from './gallery-types'

// Default gallery images
const defaultGalleryImages: GalleryImage[] = [
  {
    id: '1',
    src: '/images/campus-main.jpg',
    alt: 'Students in burgundy blazers walking across the school lawn',
    caption: 'Our Campus Community',
  },
  {
    id: '2',
    src: '/images/campus-computer-lab.jpg',
    alt: 'Teacher guiding students in computer lab with green uniforms',
    caption: 'Technology & Learning',
  },
]

export default function ScrollGallery() {
  const [images, setImages] = useState<GalleryImage[]>(defaultGalleryImages)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [editorOpen, setEditorOpen] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [pinModalOpen, setPinModalOpen] = useState(false)
  const [adminClickCount, setAdminClickCount] = useState(0)
  const adminClickTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Clamp current index if images are removed
  useEffect(() => {
    if (currentIndex >= images.length) setCurrentIndex(Math.max(0, images.length - 1))
  }, [images.length, currentIndex])

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }, [images.length])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }, [images.length])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide()
      if (e.key === 'ArrowLeft') prevSlide()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [nextSlide, prevSlide])

  function handleAdminTrigger() {
    const next = adminClickCount + 1
    setAdminClickCount(next)
    if (adminClickTimer.current) clearTimeout(adminClickTimer.current)
    if (next >= 3) {
      setAdminClickCount(0)
      if (!isAdmin) setPinModalOpen(true)
      else setIsAdmin(false)
    } else {
      adminClickTimer.current = setTimeout(() => setAdminClickCount(0), 600)
    }
  }

  return (
    <>
      <section className="relative h-[70vh] md:h-[85vh] overflow-hidden">
        {/* Images */}
        {images.map((image, index) => (
          <div
            key={image.id}
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
            
            {/* Dark overlay with light text caption */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end justify-center pb-12">
              <h3 className="font-serif text-2xl md:text-4xl text-white text-center leading-tight tracking-tight">
                {image.caption}
              </h3>
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

        {/* Dot indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3 items-center">
          {images.map((_, index) => (
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

        {/* Admin trigger zone - triple click the image counter to unlock */}
        <button
          onClick={handleAdminTrigger}
          className="absolute bottom-2 right-4 md:right-8 z-20 font-sans text-xs text-white/40 hover:text-white/60 transition-colors px-2 py-1"
          aria-label="Image counter"
        >
          {currentIndex + 1} / {images.length}
        </button>

        {/* Admin gear - visible after PIN unlock */}
        {isAdmin && (
          <button
            onClick={() => setEditorOpen(true)}
            aria-label="Edit gallery"
            className="absolute top-4 right-4 md:top-6 md:right-8 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 transition-colors"
          >
            <Settings size={16} />
          </button>
        )}
      </section>

      {/* Editor portals */}
      <GalleryEditorPortals
        images={images}
        editorOpen={editorOpen}
        pinModalOpen={pinModalOpen}
        onEditorClose={() => setEditorOpen(false)}
        onPinSuccess={() => { setIsAdmin(true); setPinModalOpen(false) }}
        onPinClose={() => setPinModalOpen(false)}
        onImagesChange={setImages}
      />
    </>
  )
}
