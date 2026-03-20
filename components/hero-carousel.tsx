'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Pause, Play, Volume2, VolumeX } from 'lucide-react'

type SlideMedia =
  | { type: 'image'; src: string }
  | { type: 'video'; src: string; poster?: string }

interface Slide {
  media: SlideMedia
  heading: string
  subheading: string
  primaryCta: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
}

const slides: Slide[] = [
  {
    media: { type: 'image', src: '/images/hero-1.jpg' },
    heading: 'Nurturing Principled Hearts',
    subheading: 'A co-educational independent school from Early Years to Sixth Form',
    primaryCta: { label: 'Learn More', href: '#about' },
    secondaryCta: { label: 'Apply Now', href: '#admissions' },
  },
  {
    media: { type: 'image', src: '/images/hero-2.jpg' },
    heading: 'Brilliant Minds in the Making',
    subheading: 'Small classes, exceptional teachers, and boundless opportunity',
    primaryCta: { label: 'Our Approach', href: '#approach' },
    secondaryCta: { label: 'Open Days', href: '#events' },
  },
  {
    media: { type: 'image', src: '/images/hero-3.jpg' },
    heading: 'Every Child Finds Their Stage',
    subheading: 'Arts, sport, academia — a whole-child education that lasts a lifetime',
    primaryCta: { label: 'Discover More', href: '#discover' },
    secondaryCta: { label: 'Apply Now', href: '#admissions' },
  },
]

const AUTOPLAY_INTERVAL = 6000

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning || index === current) return
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrent(index)
        setIsTransitioning(false)
      }, 400)
    },
    [current, isTransitioning]
  )

  const next = useCallback(() => {
    goTo((current + 1) % slides.length)
  }, [current, goTo])

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length)
  }, [current, goTo])

  // Autoplay
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearTimeout(timerRef.current)
      return
    }
    timerRef.current = setTimeout(next, AUTOPLAY_INTERVAL)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [isPlaying, current, next])

  // Sync video mute state
  useEffect(() => {
    videoRefs.current.forEach((v) => {
      if (v) v.muted = isMuted
    })
  }, [isMuted])

  // Play/pause current video slide
  useEffect(() => {
    const slide = slides[current]
    videoRefs.current.forEach((v, i) => {
      if (!v) return
      if (i === current && slide.media.type === 'video') {
        isPlaying ? v.play().catch(() => {}) : v.pause()
      } else {
        v.pause()
        v.currentTime = 0
      }
    })
  }, [current, isPlaying])

  const currentSlide = slides[current]
  const showMuteButton = currentSlide.media.type === 'video'

  return (
    <section
      aria-label="Hero carousel"
      className="relative w-full h-screen min-h-[560px] max-h-[900px] overflow-hidden bg-school-heading"
    >
      {/* Slides */}
      {slides.map((slide, i) => (
        <div
          key={i}
          aria-hidden={i !== current}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            i === current ? (isTransitioning ? 'opacity-0' : 'opacity-100') : 'opacity-0'
          }`}
        >
          {slide.media.type === 'image' ? (
            <Image
              src={slide.media.src}
              alt={slide.heading}
              fill
              priority={i === 0}
              className="object-cover object-center"
              sizes="100vw"
            />
          ) : (
            <video
              ref={(el) => { videoRefs.current[i] = el }}
              src={slide.media.src}
              poster={slide.media.poster}
              loop
              muted={isMuted}
              playsInline
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
          )}
        </div>
      ))}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10 pointer-events-none" />

      {/* Slide content — bottom left */}
      <div
        className={`absolute bottom-0 left-0 right-0 px-8 pb-32 md:px-16 md:pb-36 lg:px-24 max-w-4xl transition-all duration-500 ${
          isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
        }`}
      >
        <h1 className="font-serif text-white text-[clamp(2rem,5vw,4rem)] leading-[1.1] tracking-tight text-balance mb-3">
          {currentSlide.heading}
        </h1>
        <p className="font-sans text-white/85 text-[clamp(0.9rem,1.8vw,1.1rem)] mb-7 italic">
          {currentSlide.subheading}
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href={currentSlide.primaryCta.href}
            className="font-sans font-semibold text-sm tracking-widest uppercase px-7 py-3 bg-white text-school-heading hover:bg-white/90 transition-colors"
          >
            {currentSlide.primaryCta.label}
          </a>
          {currentSlide.secondaryCta && (
            <a
              href={currentSlide.secondaryCta.href}
              className="font-sans font-semibold text-sm tracking-widest uppercase px-7 py-3 border border-white text-white hover:bg-white/10 transition-colors"
            >
              {currentSlide.secondaryCta.label}
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
            className={`w-2.5 h-2.5 rounded-full border border-white transition-colors ${
              i === current ? 'bg-white' : 'bg-white/30 hover:bg-white/60'
            }`}
          />
        ))}
      </div>

      {/* Bottom-right controls */}
      <div className="absolute bottom-10 right-8 md:right-12 flex items-center gap-1 z-10">
        {/* Prev */}
        <button
          onClick={prev}
          aria-label="Previous slide"
          className="w-10 h-10 flex items-center justify-center rounded-full border border-white/50 text-white hover:bg-white/15 transition-colors"
        >
          <ChevronLeft size={18} />
        </button>

        {/* Next */}
        <button
          onClick={next}
          aria-label="Next slide"
          className="w-10 h-10 flex items-center justify-center rounded-full border border-white/50 text-white hover:bg-white/15 transition-colors"
        >
          <ChevronRight size={18} />
        </button>

        {/* Divider */}
        <span className="w-px h-5 bg-white/40 mx-1" aria-hidden="true" />

        {/* Play / Pause */}
        <button
          onClick={() => setIsPlaying((p) => !p)}
          aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
          className="w-10 h-10 flex items-center justify-center rounded-full border border-white/50 text-white hover:bg-white/15 transition-colors"
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        </button>

        {/* Mute — only shown when current slide is a video */}
        {showMuteButton && (
          <>
            <span className="w-px h-5 bg-white/40 mx-1" aria-hidden="true" />
            <button
              onClick={() => setIsMuted((m) => !m)}
              aria-label={isMuted ? 'Unmute video' : 'Mute video'}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-white/50 text-white hover:bg-white/15 transition-colors"
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
          </>
        )}
      </div>
    </section>
  )
}
