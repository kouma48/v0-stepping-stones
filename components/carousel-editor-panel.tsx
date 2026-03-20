'use client'

import { useState } from 'react'
import { X, Plus, GripVertical, ImageIcon, Video } from 'lucide-react'
import type { Slide, SlideMedia } from './carousel-types'

const inputCls =
  'w-full font-sans text-sm text-school-heading border border-school-divider px-3 py-2 focus:outline-none focus:border-accent-red transition-colors bg-white'

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

export function EditorPanel({
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
      {/* Backdrop — div not button to avoid nesting issues */}
      <div
        tabIndex={0}
        className="flex-1 pointer-events-auto bg-black/40 cursor-default"
        onClick={onClose}
        onKeyDown={(e) => e.key === 'Escape' && onClose()}
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
          {/* Slide list — all interactive elements are divs/spans, no buttons */}
          <div className="w-36 border-r border-school-divider flex flex-col overflow-y-auto shrink-0">
            {slides.map((slide, i) => (
              <div
                key={slide.id}
                tabIndex={0}
                onClick={() => setEditingId(slide.id)}
                onKeyDown={(e) => e.key === 'Enter' && setEditingId(slide.id)}
                className={`group relative px-3 py-3 border-b border-school-divider transition-colors cursor-pointer select-none ${
                  editingId === slide.id
                    ? 'bg-accent-red/5 border-l-2 border-l-accent-red'
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
                {/* Delete — span with onPointerDown to avoid any nested button */}
                <span
                  tabIndex={0}
                  aria-label="Delete slide"
                  onPointerDown={(e) => {
                    e.stopPropagation()
                    if (slides.length > 1) removeSlide(slide.id)
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && slides.length > 1) {
                      e.stopPropagation()
                      removeSlide(slide.id)
                    }
                  }}
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-school-subtle hover:text-red-500 transition cursor-pointer"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6"/>
                    <path d="M19 6l-1 14H6L5 6"/>
                    <path d="M10 11v6"/>
                    <path d="M14 11v6"/>
                    <path d="M9 6V4h6v2"/>
                  </svg>
                </span>
              </div>
            ))}
            {/* Add Slide — span to avoid any button nesting */}
            <span
              tabIndex={0}
              onClick={addSlide}
              onKeyDown={(e) => e.key === 'Enter' && addSlide()}
              className="flex items-center gap-2 px-3 py-3 text-accent-red hover:bg-accent-red/5 transition-colors font-sans text-xs font-semibold tracking-wider uppercase cursor-pointer"
            >
              <Plus size={13} />
              Add Slide
            </span>
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
                        onClick={() => updateMedia(editing.id, { type: t, src: editing.media.src })}
                        className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-sans font-semibold border transition-colors ${
                          editing.media.type === t
                            ? 'border-accent-red bg-accent-red/5 text-accent-red'
                            : 'border-school-divider text-school-subtle hover:border-school-body'
                        }`}
                      >
                        {t === 'image' ? <ImageIcon size={13} /> : <Video size={13} />}
                        {t.charAt(0).toUpperCase() + t.slice(1)}
                      </button>
                    ))}
                  </div>
                </fieldset>

                <Field label={editing.media.type === 'image' ? 'Image URL' : 'Video URL'}>
                  <input
                    type="text"
                    value={editing.media.src}
                    placeholder={editing.media.type === 'image' ? '/images/hero.jpg' : '/videos/hero.mp4'}
                    onChange={(e) => updateMedia(editing.id, { src: e.target.value })}
                    className={inputCls}
                  />
                </Field>

                {editing.media.type === 'video' && (
                  <Field label="Poster Image URL (optional)">
                    <input
                      type="text"
                      value={(editing.media as { type: 'video'; src: string; poster?: string }).poster ?? ''}
                      placeholder="/images/poster.jpg"
                      onChange={(e) => updateMedia(editing.id, { poster: e.target.value } as Partial<SlideMedia>)}
                      className={inputCls}
                    />
                  </Field>
                )}

                <Field label="Heading">
                  <input
                    type="text"
                    value={editing.heading}
                    onChange={(e) => update(editing.id, { heading: e.target.value })}
                    className={inputCls}
                  />
                </Field>

                <Field label="Subheading">
                  <textarea
                    value={editing.subheading}
                    rows={2}
                    onChange={(e) => update(editing.id, { subheading: e.target.value })}
                    className={`${inputCls} resize-none`}
                  />
                </Field>

                <fieldset className="border border-school-divider p-3 space-y-3">
                  <legend className="font-sans text-xs font-semibold tracking-widest uppercase text-school-subtle px-1">
                    Primary Button
                  </legend>
                  <Field label="Label">
                    <input
                      type="text"
                      value={editing.primaryCta.label}
                      onChange={(e) => update(editing.id, { primaryCta: { ...editing.primaryCta, label: e.target.value } })}
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Link">
                    <input
                      type="text"
                      value={editing.primaryCta.href}
                      onChange={(e) => update(editing.id, { primaryCta: { ...editing.primaryCta, href: e.target.value } })}
                      className={inputCls}
                    />
                  </Field>
                </fieldset>

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
