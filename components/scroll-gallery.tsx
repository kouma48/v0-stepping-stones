'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { useScroll, useTransform, useMotionValue, useSpring, motion } from 'framer-motion'
import Image from 'next/image'

// ─── Images — real Stepping Stones school photos ─────────────────────────────

const IMAGES = [
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image.png-ICuR5nH7GMCIYFdxnwCmmO7mURmZe6.jpeg',
    alt: 'Students walking across manicured school grounds',
    col: 'left',
    row: 0,
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-6YNMOSy3CyVNB8JnHVqfVuLb6VJfbW.png',
    alt: 'Students gathered around campfire at night',
    col: 'centre',
    row: 0,
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image.png-BTOcA4S3qa8a3WRVNhZi9lbzr0QdZw.jpeg',
    alt: 'Cricket match on school grounds',
    col: 'right',
    row: 0,
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image.png-dTVspKtQ5pxszbhCDF94unXM7XvV8f.jpeg',
    alt: 'Victorian school building with large trees',
    col: 'left',
    row: 1,
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image.png-QHVOXC5DWv2MWRPeCpWRkyJrc0U1k0.jpeg',
    alt: 'Modern school dormitory buildings surrounded by trees',
    col: 'centre',
    row: 1,
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image.png-iHJRdw1yKdBnmJCQA3vGupLcXx5jT5.jpeg',
    alt: 'Students hiking outdoors with backpacks',
    col: 'right',
    row: 1,
  },
]

const CAROUSEL_IMAGES = [
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image.png-ICuR5nH7GMCIYFdxnwCmmO7mURmZe6.jpeg',
    alt: 'Historic brick school building',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-6YNMOSy3CyVNB8JnHVqfVuLb6VJfbW.png',
    alt: 'Students around campfire',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image.png-QHVOXC5DWv2MWRPeCpWRkyJrc0U1k0.jpeg',
    alt: 'School dormitory buildings',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image.png-dTVspKtQ5pxszbhCDF94unXM7XvV8f.jpeg',
    alt: 'Victorian school building and grounds',
  },
]

// ─── Carousel (STATE 2) ───────────────────────────────────────────────────────

function FullscreenCarousel({ visible }: { visible: boolean }) {
  const [current, setCurrent] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % CAROUSEL_IMAGES.length)
  }, [])

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + CAROUSEL_IMAGES.length) % CAROUSEL_IMAGES.length)
  }, [])

  useEffect(() => {
    if (!visible || !isPlaying) return
    timerRef.current = setTimeout(next, 5000)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [current, visible, isPlaying, next])

  return (
    <div
      className="absolute inset-0 transition-opacity duration-500"
      style={{ opacity: visible ? 1 : 0, pointerEvents: visible ? 'auto' : 'none' }}
      aria-hidden={!visible}
    >
      {/* Slides */}
      {CAROUSEL_IMAGES.map((img, i) => (
        <div
          key={img.src}
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            className="object-cover"
            priority={i === 0}
            crossOrigin="anonymous"
          />
        </div>
      ))}

      {/* Left arrow */}
      <button
        onClick={prev}
        className="absolute left-5 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full flex items-center justify-center"
        style={{ background: '#c11f1e' }}
        aria-label="Previous image"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      {/* Right arrow */}
      <button
        onClick={next}
        className="absolute right-5 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full flex items-center justify-center"
        style={{ background: '#c11f1e' }}
        aria-label="Next image"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* Top-right: MENU label + dot-grid */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
        <span className="font-sans text-xs tracking-[0.2em] uppercase text-white font-semibold">
          Menu
        </span>
        <button
          onClick={() => setIsPlaying((p) => !p)}
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ background: '#c11f1e' }}
          aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
            {[0, 8, 16].map((cx) =>
              [0, 8, 16].map((cy) => (
                <circle key={`${cx}-${cy}`} cx={cx + 4} cy={cy + 4} r="1.8" />
              ))
            )}
          </svg>
        </button>
      </div>

      {/* Dot indicators bottom centre */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {CAROUSEL_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="w-2 h-2 rounded-full transition-all duration-300"
            style={{ background: i === current ? '#fff' : 'rgba(255,255,255,0.4)' }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

// ─── Main scroll gallery ──────────────────────────────────────────────────────

export default function ScrollGallery() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  // Spring-smoothed progress — lower stiffness + higher damping = silky glide
  const smooth = useSpring(scrollYProgress, { stiffness: 40, damping: 30, restDelta: 0.001 })

  // Left column slides out to the left — starts moving at 0.1, fully gone at 0.75
  const leftX = useTransform(smooth, [0.1, 0.75], ['0%', '-115%'])
  // Right column slides out to the right
  const rightX = useTransform(smooth, [0.1, 0.75], ['0%', '115%'])
  // Centre column expands to fill — starts later, ends later
  const centreScale = useTransform(smooth, [0.05, 0.8], [0.78, 1])
  // Border radius collapses smoothly
  const radius = useTransform(smooth, [0.05, 0.75], [14, 0])
  const radiusStr = useTransform(radius, (r) => `${r}px`)
  // Gap collapses
  const gap = useTransform(smooth, [0.05, 0.7], [16, 0])
  const gapStr = useTransform(gap, (g) => `${g}px`)
  // Carousel fades in gently after collage is mostly gone
  const carouselOpacity = useTransform(smooth, [0.82, 1], [0, 1])
  // Collage fades out
  const collageOpacity = useTransform(smooth, [0.7, 0.88], [1, 0])

  const [carouselVisible, setCarouselVisible] = useState(false)

  useEffect(() => {
    return smooth.on('change', (v) => {
      setCarouselVisible(v > 0.85)
    })
  }, [smooth])

  return (
    // Tall section — scroll distance determines animation progress
    <div ref={sectionRef} className="relative" style={{ height: '400vh' }}>
      {/* Sticky viewport-filling container */}
      <div
        ref={stickyRef}
        className="sticky top-0 w-full overflow-hidden bg-white"
        style={{ height: '100svh' }}
      >
        {/* ── COLLAGE (STATE 1) ── */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{ opacity: collageOpacity }}
        >
          <motion.div
            className="flex items-stretch w-full h-full px-6 py-6"
            style={{ gap: gapStr }}
          >
            {/* Left column */}
            <motion.div
              className="flex flex-col flex-shrink-0"
              style={{ width: '27%', gap: gapStr, x: leftX, willChange: 'transform' }}
            >
              {IMAGES.filter((img) => img.col === 'left').map((img) => (
                <motion.div
                  key={img.alt}
                  className="relative overflow-hidden flex-1"
                  style={{ borderRadius: radiusStr }}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    crossOrigin="anonymous"
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Centre column */}
            <motion.div
              className="flex flex-col flex-1"
              style={{ gap: gapStr, scale: centreScale, transformOrigin: 'center center', willChange: 'transform' }}
            >
              {IMAGES.filter((img) => img.col === 'centre').map((img) => (
                <motion.div
                  key={img.alt}
                  className="relative overflow-hidden flex-1"
                  style={{ borderRadius: radiusStr }}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    crossOrigin="anonymous"
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Right column */}
            <motion.div
              className="flex flex-col flex-shrink-0"
              style={{ width: '27%', gap: gapStr, x: rightX, willChange: 'transform' }}
            >
              {IMAGES.filter((img) => img.col === 'right').map((img) => (
                <motion.div
                  key={img.alt}
                  className="relative overflow-hidden flex-1"
                  style={{ borderRadius: radiusStr }}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    crossOrigin="anonymous"
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ── CAROUSEL (STATE 2) ── */}
        <FullscreenCarousel visible={carouselVisible} />
      </div>
    </div>
  )
}
