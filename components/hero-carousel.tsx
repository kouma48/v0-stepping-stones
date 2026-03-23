'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Pause, Play, Volume2, VolumeX, Settings } from 'lucide-react'
import type { Slide, SlideMedia } from './carousel-types'
import { CarouselPortals } from './carousel-portals'

const defaultSlides: Slide[] = [
  {
    id: '1',
    media: { type: 'image', src: '/images/hero-1.jpg' },
    heading: 'Nurturing Principled Hearts',
    subheading: 'A co-educational independent school from Early Years to Sixth Form',
    primaryCta: { label: 'Learn More', href: '#about' },
    secondaryCta: { label: 'Apply Now', href: '#admissions' },
  },
  {
    id: '2',
    media: { type: 'image', src: '/images/hero-2.jpg' },
    heading: 'Brilliant Minds in the Making',
    subheading: 'Small classes, exceptional teachers, and boundless opportunity',
    primaryCta: { label: 'Our Approach', href: '#approach' },
    secondaryCta: { label: 'Open Days', href: '#events' },
  },
  {
    id: '3',
    media: { type: 'image', src: '/images/hero-3.jpg' },
    heading: 'Every Child Finds Their Stage',
    subheading: 'Arts, sport, academia — a whole-child education that lasts a lifetime',
    primaryCta: { label: 'Discover More', href: '#discover' },
    secondaryCta: { label: 'Apply Now', href: '#admissions' },
  },
]

const AUTOPLAY_INTERVAL = 6000

export default function HeroCarousel() {
  const [slides, setSlides] = useState<Slide[]>(defaultSlides)
  const [current, setCurrent] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [editorOpen, setEditorOpen] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [pinModalOpen, setPinModalOpen] = useState(false)
  const [adminClickCount, setAdminClickCount] = useState(0)
  const adminClickTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  // Clamp current index if slides are removed
  useEffect(() => {
    if (current >= slides.length) setCurrent(Math.max(0, slides.length - 1))
  }, [slides.length, current])

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning) return
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrent((index + slides.length) % slides.length)
        setIsTransitioning(false)
      }, 300)
    },
    [isTransitioning, slides.length]
  )

  const goNext = useCallback(() => goTo(current + 1), [goTo, current])
  const goPrev = useCallback(() => goTo(current - 1), [goTo, current])

  // Autoplay
  useEffect(() => {
    if (!isPlaying) return
    timerRef.current = setTimeout(goNext, AUTOPLAY_INTERVAL)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [isPlaying, current, goNext])

  // Sync video play/pause
  useEffect(() => {
    const video = videoRefs.current[current]
    if (!video) return
    if (isPlaying) {
      video.play().catch(() => {})
    } else {
      video.pause()
    }
  }, [current, isPlaying])

  // Sync mute on all videos
  useEffect(() => {
    videoRefs.current.forEach((v) => { if (v) v.muted = isMuted })
  }, [isMuted])

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

  const slide = slides[current]
  const isVideo = slide?.media.type === 'video'

  return (
    <>
      <section
        className="relative w-full h-svh min-h-[560px] overflow-hidden bg-school-heading"
        aria-label="Hero carousel"
      >
        {/* Slides */}
        {slides.map((s, i) => (
          <div
            key={s.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              i === current
                ? isTransitioning ? 'opacity-0' : 'opacity-100'
                : 'opacity-0 pointer-events-none'
            }`}
            aria-hidden={i !== current}
          >
            {s.media.type === 'image' ? (
              <Image
                src={s.media.src}
                alt={s.heading}
                fill
                priority
                fetchPriority="high"
                loading="eager"
                className="object-cover"
                sizes="100vw"
              />
            ) : (
              <video
                ref={(el) => { videoRefs.current[i] = el }}
                src={s.media.src}
                poster={(s.media as SlideMedia & { type: 'video'; poster?: string }).poster}
                autoPlay={i === current && isPlaying}
                loop
                muted={isMuted}
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
            {/* Bottom overlay — darkens lower portion for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            {/* Top overlay — darkens upper portion for header/logo legibility */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/10 to-transparent" />
          </div>
        ))}

        {/* Text content */}
        <div className="absolute bottom-0 left-0 right-0 px-8 md:px-16 pb-28 md:pb-32 z-10 max-w-3xl">
          <h1
            key={`h-${current}`}
            className="font-serif text-white text-[clamp(2rem,5vw,4rem)] leading-[1.1] tracking-tight mb-4 animate-fade-up"
          >
            {slide?.heading}
          </h1>
          <p
            key={`p-${current}`}
            className="font-sans text-white/80 text-[clamp(0.9rem,1.5vw,1.1rem)] leading-relaxed mb-8 max-w-xl animate-fade-up"
          >
            {slide?.subheading}
          </p>
          <div className="flex flex-wrap gap-4">
            {slide?.primaryCta && (
              <a
                href={slide.primaryCta.href}
                className="font-sans font-semibold tracking-widest uppercase text-sm px-7 py-3 bg-white text-school-heading hover:bg-white/90 transition-colors"
              >
                {slide.primaryCta.label}
              </a>
            )}
            {slide?.secondaryCta && (
              <a
                href={slide.secondaryCta.href}
                className="font-sans font-semibold tracking-widest uppercase text-sm px-7 py-3 border border-white text-white hover:bg-white/10 transition-colors"
              >
                {slide.secondaryCta.label}
              </a>
            )}
          </div>
        </div>

        {/* Right-edge dot indicators */}
        <div className="absolute right-5 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-10">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`w-2 rounded-full transition-all duration-300 ${
                i === current ? 'h-8 bg-white' : 'h-2 bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>

        {/* Bottom-right controls */}
        <div
          className="absolute bottom-10 right-8 md:right-12 flex items-center gap-1 z-10"
          onClick={handleAdminTrigger}
        >
          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); goPrev() }}
            aria-label="Previous slide"
            className="w-10 h-10 flex items-center justify-center rounded-full border border-white/50 text-white hover:bg-white/15 transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); goNext() }}
            aria-label="Next slide"
            className="w-10 h-10 flex items-center justify-center rounded-full border border-white/50 text-white hover:bg-white/15 transition-colors"
          >
            <ChevronRight size={18} />
          </button>

          <span className="w-px h-5 bg-white/40 mx-1" aria-hidden="true" />

          {/* Play / Pause */}
          <button
            onClick={(e) => { e.stopPropagation(); setIsPlaying((p) => !p) }}
            aria-label={isPlaying ? 'Pause autoplay' : 'Resume autoplay'}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-white/50 text-white hover:bg-white/15 transition-colors"
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </button>

          {/* Mute — only shown for video slides */}
          {isVideo && (
            <button
              onClick={(e) => { e.stopPropagation(); setIsMuted((m) => !m) }}
              aria-label={isMuted ? 'Unmute' : 'Mute'}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-white/50 text-white hover:bg-white/15 transition-colors"
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
          )}

          {/* Admin gear — only visible after PIN unlock */}
          {isAdmin && (
            <>
              <span className="w-px h-5 bg-white/40 mx-1" aria-hidden="true" />
              <button
                onClick={(e) => { e.stopPropagation(); setEditorOpen(true) }}
                aria-label="Edit carousel"
                className="w-10 h-10 flex items-center justify-center rounded-full border border-white/50 text-white hover:bg-white/15 transition-colors"
              >
                <Settings size={16} />
              </button>
            </>
          )}
        </div>
      </section>

      {/* Portalled modals rendered via dedicated client component */}
      <CarouselPortals
        slides={slides}
        editorOpen={editorOpen}
        pinModalOpen={pinModalOpen}
        onEditorClose={() => setEditorOpen(false)}
        onPinSuccess={() => { setIsAdmin(true); setPinModalOpen(false) }}
        onPinClose={() => setPinModalOpen(false)}
        onSlidesChange={setSlides}
      />
    </>
  )
}
