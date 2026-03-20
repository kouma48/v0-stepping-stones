'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Volume2,
  VolumeX,
  Settings,
  X,
  Plus,
  Trash2,
  GripVertical,
  ImageIcon,
  Video,
} from 'lucide-react'

type SlideMedia =
  | { type: 'image'; src: string }
  | { type: 'video'; src: string; poster?: string }

interface Slide {
  id: string
  media: SlideMedia
  heading: string
  subheading: string
  primaryCta: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
}

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

// ─── Editor Panel ────────────────────────────────────────────────────────────

function EditorPanel({
  slides,
  onClose,
  onChange,
}: {
  slides: Slide[]
  onClose: () => void
  onChange: (slides: Slide[]) => void
}) {
  const [editingId, setEditingId] = useState<string | null>(slides[0]?.id ?? null)

  const editing = slides.find((s) => s.id === editingId) ?? null

  function update(id: string, patch: Partial<Slide>) {
    onChange(slides.map((s) => (s.id === id ? { ...s, ...patch } : s)))
  }

  function updateMedia(id: string, patch: Partial<SlideMedia>) {
    const slide = slides.find((s) => s.id === id)
    if (!slide) return
    onChange(
      slides.map((s) =>
        s.id === id ? { ...s, media: { ...s.media, ...patch } as SlideMedia } : s
      )
    )
  }

  function addSlide() {
    const id = Date.now().toString()
    const newSlide: Slide = {
      id,
      media: { type: 'image', src: '' },
      heading: 'New Slide Heading',
      subheading: 'Add a subheading here',
      primaryCta: { label: 'Learn More', href: '#' },
    }
    onChange([...slides, newSlide])
    setEditingId(id)
  }

  function removeSlide(id: string) {
    const next = slides.filter((s) => s.id !== id)
    onChange(next)
    if (editingId === id) setEditingId(next[0]?.id ?? null)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-stretch pointer-events-none">
      {/* Backdrop */}
      <button
        className="flex-1 pointer-events-auto bg-black/40"
        onClick={onClose}
        aria-label="Close editor"
      />

      {/* Panel */}
      <div className="pointer-events-auto w-full max-w-md bg-white shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-school-divider">
          <h2 className="font-sans font-semibold text-school-heading text-sm tracking-widest uppercase">
            Carousel Editor
          </h2>
          <button
            onClick={onClose}
            className="text-school-subtle hover:text-school-heading transition-colors"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Slide list */}
          <div className="w-36 border-r border-school-divider flex flex-col overflow-y-auto shrink-0">
            {slides.map((slide, i) => (
              <div
                key={slide.id}
                role="button"
                tabIndex={0}
                onClick={() => setEditingId(slide.id)}
                onKeyDown={(e) => e.key === 'Enter' && setEditingId(slide.id)}
                className={`group relative text-left px-3 py-3 border-b border-school-divider transition-colors cursor-pointer select-none ${
                  editingId === slide.id
                    ? 'bg-crimson/5 border-l-2 border-l-crimson'
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1.5">
                  <GripVertical size={12} className="text-school-subtle shrink-0" />
                  <span className="font-sans text-xs font-semibold text-school-subtle uppercase tracking-wider">
                    Slide {i + 1}
                  </span>
                </div>
                <p className="font-sans text-xs text-school-heading leading-tight line-clamp-2">
                  {slide.heading}
                </p>
                <button
                  onClick={(e) => { e.stopPropagation(); removeSlide(slide.id) }}
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-school-subtle hover:text-red-500 transition"
                  aria-label="Delete slide"
                  disabled={slides.length <= 1}
                >
                  <Trash2 size={12} />
                </button>
              </div>
            ))}
            <button
              onClick={addSlide}
              className="flex items-center gap-2 px-3 py-3 text-crimson hover:bg-crimson/5 transition-colors font-sans text-xs font-semibold tracking-wider uppercase"
            >
              <Plus size={13} />
              Add Slide
            </button>
          </div>

          {/* Field editor */}
          <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5">
            {editing ? (
              <>
                {/* Media type toggle */}
                <fieldset>
                  <legend className="font-sans text-xs font-semibold tracking-widest uppercase text-school-subtle mb-2">
                    Media Type
                  </legend>
                  <div className="flex gap-2">
                    {(['image', 'video'] as const).map((t) => (
                      <button
                        key={t}
                        onClick={() =>
                          updateMedia(editing.id, {
                            type: t,
                            src: editing.media.src,
                          })
                        }
                        className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-sans font-semibold border transition-colors ${
                          editing.media.type === t
                            ? 'border-crimson bg-crimson/5 text-crimson'
                            : 'border-school-divider text-school-subtle hover:border-school-body'
                        }`}
                      >
                        {t === 'image' ? <ImageIcon size={13} /> : <Video size={13} />}
                        {t.charAt(0).toUpperCase() + t.slice(1)}
                      </button>
                    ))}
                  </div>
                </fieldset>

                {/* Media URL */}
                <Field label={editing.media.type === 'image' ? 'Image URL' : 'Video URL'}>
                  <input
                    type="text"
                    value={editing.media.src}
                    placeholder={editing.media.type === 'image' ? '/images/hero.jpg' : '/videos/hero.mp4'}
                    onChange={(e) => updateMedia(editing.id, { src: e.target.value })}
                    className={inputCls}
                  />
                </Field>

                {/* Video poster */}
                {editing.media.type === 'video' && (
                  <Field label="Poster Image URL (optional)">
                    <input
                      type="text"
                      value={(editing.media as { type: 'video'; src: string; poster?: string }).poster ?? ''}
                      placeholder="/images/poster.jpg"
                      onChange={(e) =>
                        updateMedia(editing.id, { poster: e.target.value } as Partial<SlideMedia>)
                      }
                      className={inputCls}
                    />
                  </Field>
                )}

                {/* Heading */}
                <Field label="Heading">
                  <input
                    type="text"
                    value={editing.heading}
                    onChange={(e) => update(editing.id, { heading: e.target.value })}
                    className={inputCls}
                  />
                </Field>

                {/* Subheading */}
                <Field label="Subheading">
                  <textarea
                    value={editing.subheading}
                    rows={2}
                    onChange={(e) => update(editing.id, { subheading: e.target.value })}
                    className={`${inputCls} resize-none`}
                  />
                </Field>

                {/* Primary CTA */}
                <fieldset className="border border-school-divider p-3 space-y-3">
                  <legend className="font-sans text-xs font-semibold tracking-widest uppercase text-school-subtle px-1">
                    Primary Button
                  </legend>
                  <Field label="Label">
                    <input
                      type="text"
                      value={editing.primaryCta.label}
                      onChange={(e) =>
                        update(editing.id, {
                          primaryCta: { ...editing.primaryCta, label: e.target.value },
                        })
                      }
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Link">
                    <input
                      type="text"
                      value={editing.primaryCta.href}
                      onChange={(e) =>
                        update(editing.id, {
                          primaryCta: { ...editing.primaryCta, href: e.target.value },
                        })
                      }
                      className={inputCls}
                    />
                  </Field>
                </fieldset>

                {/* Secondary CTA */}
                <fieldset className="border border-school-divider p-3 space-y-3">
                  <legend className="font-sans text-xs font-semibold tracking-widest uppercase text-school-subtle px-1">
                    Secondary Button (optional)
                  </legend>
                  <Field label="Label">
                    <input
                      type="text"
                      value={editing.secondaryCta?.label ?? ''}
                      placeholder="Leave blank to hide"
                      onChange={(e) =>
                        update(editing.id, {
                          secondaryCta: e.target.value
                            ? { label: e.target.value, href: editing.secondaryCta?.href ?? '#' }
                            : undefined,
                        })
                      }
                      className={inputCls}
                    />
                  </Field>
                  {editing.secondaryCta && (
                    <Field label="Link">
                      <input
                        type="text"
                        value={editing.secondaryCta.href}
                        onChange={(e) =>
                          update(editing.id, {
                            secondaryCta: { ...editing.secondaryCta!, href: e.target.value },
                          })
                        }
                        className={inputCls}
                      />
                    </Field>
                  )}
                </fieldset>
              </>
            ) : (
              <p className="font-sans text-sm text-school-subtle">Select a slide to edit.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const inputCls =
  'w-full font-sans text-sm text-school-heading border border-school-divider px-3 py-2 focus:outline-none focus:border-crimson transition-colors bg-white'

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <label className="font-sans text-xs font-semibold tracking-widest uppercase text-school-subtle block">
        {label}
      </label>
      {children}
    </div>
  )
}

// ─── Main Carousel ────────────────────────────────────────────────────────────

export default function HeroCarousel() {
  const [slides, setSlides] = useState<Slide[]>(defaultSlides)
  const [current, setCurrent] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [editorOpen, setEditorOpen] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  // Clamp current index if slides are removed
  useEffect(() => {
    if (current >= slides.length) setCurrent(Math.max(0, slides.length - 1))
  }, [slides, current])

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
  }, [current, goTo, slides.length])

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length)
  }, [current, goTo, slides.length])

  useEffect(() => {
    if (!isPlaying || editorOpen) {
      if (timerRef.current) clearTimeout(timerRef.current)
      return
    }
    timerRef.current = setTimeout(next, AUTOPLAY_INTERVAL)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [isPlaying, current, next, editorOpen])

  useEffect(() => {
    videoRefs.current.forEach((v) => {
      if (v) v.muted = isMuted
    })
  }, [isMuted])

  useEffect(() => {
    const slide = slides[current]
    videoRefs.current.forEach((v, i) => {
      if (!v) return
      if (i === current && slide?.media.type === 'video') {
        isPlaying ? v.play().catch(() => {}) : v.pause()
      } else {
        v.pause()
        v.currentTime = 0
      }
    })
  }, [current, isPlaying, slides])

  const currentSlide = slides[current]
  const showMuteButton = currentSlide?.media.type === 'video'

  if (!currentSlide) return null

  return (
    <>
      <section
        aria-label="Hero carousel"
        className="relative w-full h-svh min-h-[560px] overflow-hidden bg-school-heading"
      >
        {/* Slides */}
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            aria-hidden={i !== current}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              i === current ? (isTransitioning ? 'opacity-0' : 'opacity-100') : 'opacity-0'
            }`}
          >
            {slide.media.type === 'image' ? (
              slide.media.src ? (
                <Image
                  src={slide.media.src}
                  alt={slide.heading}
                  fill
                  priority={i === 0}
                  className="object-cover object-center"
                  sizes="100vw"
                />
              ) : (
                <div className="absolute inset-0 bg-school-heading/80" />
              )
            ) : (
              <video
                ref={(el) => { videoRefs.current[i] = el }}
                src={slide.media.src}
                poster={(slide.media as { type: 'video'; src: string; poster?: string }).poster}
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

        {/* Slide content */}
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

        {/* Dot indicators */}
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
          <button
            onClick={prev}
            aria-label="Previous slide"
            className="w-10 h-10 flex items-center justify-center rounded-full border border-white/50 text-white hover:bg-white/15 transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={next}
            aria-label="Next slide"
            className="w-10 h-10 flex items-center justify-center rounded-full border border-white/50 text-white hover:bg-white/15 transition-colors"
          >
            <ChevronRight size={18} />
          </button>
          <span className="w-px h-5 bg-white/40 mx-1" aria-hidden="true" />
          <button
            onClick={() => setIsPlaying((p) => !p)}
            aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-white/50 text-white hover:bg-white/15 transition-colors"
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </button>
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
          <span className="w-px h-5 bg-white/40 mx-1" aria-hidden="true" />
          {/* Edit button */}
          <button
            onClick={() => setEditorOpen(true)}
            aria-label="Edit carousel"
            className="w-10 h-10 flex items-center justify-center rounded-full border border-white/50 text-white hover:bg-white/15 transition-colors"
          >
            <Settings size={16} />
          </button>
        </div>
      </section>

      {/* Editor panel */}
      {editorOpen && (
        <EditorPanel
          slides={slides}
          onClose={() => setEditorOpen(false)}
          onChange={setSlides}
        />
      )}
    </>
  )
}
