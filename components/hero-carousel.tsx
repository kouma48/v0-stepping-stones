'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Pause, Play, Volume2, VolumeX, Settings } from 'lucide-react'
import type { Slide, SlideMedia } from './carousel-types'
import { CarouselPortals } from './carousel-portals'

const defaultSlides: Slide[] = [
  {
    id: '1',
    media: { type: 'image', src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DSC_4219-PjvUy4VQ7yQrEJF9T1NTuIlxjnKzrp.jpg' },
    heading: 'Nurturing Principled Hearts',
    subheading: 'A co-educational independent school from Early Years to Sixth Form',
    primaryCta: { label: 'Learn More', href: '#about' },
    secondaryCta: { label: 'Apply Now', href: '#admissions' },
  },
  {
    id: '2',
    media: { type: 'image', src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DSC_4754-AhfjvtchhsLEcDDAb3gKneB8EhVPRW.jpg' },
    heading: 'Brilliant Minds in the Making',
    subheading: 'Small classes, exceptional teachers, and boundless opportunity',
    primaryCta: { label: 'Our Approach', href: '#approach' },
    secondaryCta: { label: 'Open Days', href: '#events' },
  },
  {
    id: '3',
    media: { type: 'image', src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DSC_4801-1fqYCvYi05mWOyhCtnQTVINJLeFbHV.jpg' },
    heading: 'Every Child Finds Their Stage',
    subheading: 'Arts, sport, academia — a whole-child education that lasts a lifetime',
    primaryCta: { label: 'Discover More', href: '#discover' },
    secondaryCta: { label: 'Apply Now', href: '#admissions' },
  },
  {
    id: '4',
    media: { type: 'image', src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DSC_3729-p7kXtNozwyiIYyDW9N3Ns06ZwoV8kA.jpg' },
    heading: 'Hands-On Learning Experience',
    subheading: 'STEM education and practical exploration at every level',
    primaryCta: { label: 'Explore Academics', href: '#academics' },
    secondaryCta: { label: 'Learn More', href: '#about' },
  },
  {
    id: '5',
    media: { type: 'image', src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DSC_4673-KIiKnUrkK5Hu00YfKWLA3D5olxwI6Y.jpg' },
    heading: 'Community & Leadership',
    subheading: 'Students growing together in service and character',
    primaryCta: { label: 'Student Life', href: '#student-life' },
    secondaryCta: { label: 'Events', href: '#events' },
  },
  {
    id: '6',
    media: { type: 'image', src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DSC_4099-OFaJGhqwKjZULAsDhgSKgy4TNcXAgD.jpg' },
    heading: 'Technology & Innovation',
    subheading: 'Preparing students for tomorrow through cutting-edge learning',
    primaryCta: { label: 'Discover Our Labs', href: '#labs' },
    secondaryCta: { label: 'Apply Now', href: '#admissions' },
  },
]

const AUTOPLAY_INTERVAL = 7000
const TRANSITION_DURATION = 1200 // ms for crossfade

// Ken Burns animation variants - subtle zoom and pan effects
const kenBurnsVariants = [
  'animate-ken-burns-1',
  'animate-ken-burns-2',
  'animate-ken-burns-3',
  'animate-ken-burns-4',
]

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
  const [isHydrated, setIsHydrated] = useState(false)
  const adminClickTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  // Randomize image load order and starting slide after hydration
  useEffect(() => {
    // Use requestAnimationFrame to ensure we're past the hydration phase
    const raf = requestAnimationFrame(() => {
      setIsHydrated(true)
      // Small timeout to ensure hydration is fully complete before randomizing
      const timeout = setTimeout(() => {
        // Shuffle slides array to randomize load order
        const shuffled = [...defaultSlides].sort(() => Math.random() - 0.5)
        setSlides(shuffled)
        
        // Set random starting slide
        const randomIndex = Math.floor(Math.random() * shuffled.length)
        if (randomIndex !== 0) {
          setCurrent(randomIndex)
        }
      }, 50)
      return () => clearTimeout(timeout)
    })
    return () => cancelAnimationFrame(raf)
  }, [])

  // Clamp current index if slides are removed
  useEffect(() => {
    if (current >= slides.length) setCurrent(Math.max(0, slides.length - 1))
  }, [slides.length, current])

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning) return
      setIsTransitioning(true)
      setCurrent((index + slides.length) % slides.length)
      setTimeout(() => {
        setIsTransitioning(false)
      }, TRANSITION_DURATION)
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
        {slides.map((s, i) => {
          const isActive = i === current
          const kenBurnsClass = kenBurnsVariants[i % kenBurnsVariants.length]
          
          return (
            <div
              key={s.id}
              suppressHydrationWarning
              className={`absolute inset-0 transition-opacity ease-in-out ${
                isActive ? 'opacity-100 z-[1]' : 'opacity-0 z-0 pointer-events-none'
              }`}
              style={{ transitionDuration: `${TRANSITION_DURATION}ms` }}
              aria-hidden={!isActive}
            >
              {s.media.type === 'image' ? (
                <div className="absolute inset-0 overflow-hidden">
                  <Image
                    src={s.media.src}
                    alt={s.heading}
                    fill
                    priority={i === 0}
                    fetchPriority={i === 0 ? 'high' : 'low'}
                    loading={i === 0 ? 'eager' : 'lazy'}
                    className={`object-cover ${isActive ? kenBurnsClass : ''}`}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                    quality={85}
                  />
                </div>
              ) : (
                <video
                  ref={(el) => { videoRefs.current[i] = el }}
                  src={s.media.src}
                  poster={(s.media as SlideMedia & { type: 'video'; poster?: string }).poster}
                  autoPlay={isActive && isPlaying}
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
          )
        })}

        {/* Centered text positioned toward bottom with downward arrow */}
        <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center pb-20 md:pb-32 z-10 px-8">
          <h1 className="font-serif text-white text-[clamp(3rem,8vw,5.5rem)] leading-[1.1] tracking-tight text-center text-balance">
            Impact Starts Here
          </h1>
          {/* Downward arrow animation */}
          <div className="mt-8 md:mt-12 animate-bounce">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white"
            >
              <polyline points="8 12 16 20 24 12"></polyline>
            </svg>
          </div>
        </div>

        {/* Right-edge dot indicators */}
        <div className="absolute right-5 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-10" suppressHydrationWarning>
          {slides.map((_, i) => (
            <button
              key={i}
              suppressHydrationWarning
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
