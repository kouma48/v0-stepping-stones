'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { X, Plus, GripVertical, ImageIcon } from 'lucide-react'
import { AdminPinModal } from './carousel-pin-modal'
import type { GalleryImage } from './gallery-types'

const inputCls =
  'w-full font-sans text-sm text-school-heading border border-school-divider px-3 py-2 focus:outline-none focus:border-accent-red transition-colors bg-white'

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <span className="font-sans text-xs font-semibold tracking-widest uppercase text-school-subtle block">
        {label}
      </span>
      {children}
    </div>
  )
}

function GalleryImageEditor({ images, onClose, onChange }: { images: GalleryImage[]; onClose: () => void; onChange: (imgs: GalleryImage[]) => void }) {
  const [editingId, setEditingId] = useState<string | null>(images[0]?.id ?? null)
  const editing = images.find((img) => img.id === editingId) ?? null

  function update(id: string, patch: Partial<GalleryImage>) {
    onChange(images.map((img) => (img.id === id ? { ...img, ...patch } : img)))
  }

  function addImage() {
    const id = Date.now().toString()
    onChange([...images, { id, src: '', alt: 'New image', caption: 'New Caption' }])
    setEditingId(id)
  }

  function removeImage(id: string) {
    const next = images.filter((img) => img.id !== id)
    onChange(next)
    if (editingId === id) setEditingId(next[0]?.id ?? null)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-stretch">
      <div className="flex-1 bg-black/40 cursor-default" onClick={onClose} />
      <div className="w-full max-w-md bg-white shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-school-divider">
          <span className="font-sans font-semibold text-school-heading text-sm tracking-widest uppercase">Gallery Editor</span>
          <span role="button" tabIndex={0} aria-label="Close editor" onClick={onClose} onKeyDown={(e) => e.key === 'Enter' && onClose()} className="text-school-subtle hover:text-school-heading cursor-pointer">
            <X size={18} />
          </span>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Image list */}
          <div className="w-36 border-r border-school-divider flex flex-col overflow-y-auto shrink-0">
            {images.map((image, i) => (
              <div
                key={image.id}
                tabIndex={0}
                onClick={() => setEditingId(image.id)}
                onKeyDown={(e) => e.key === 'Enter' && setEditingId(image.id)}
                className={`group relative px-3 py-3 border-b border-school-divider transition-colors cursor-pointer select-none ${
                  editingId === image.id ? 'border-l-2 border-l-accent-red bg-accent-red/5' : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1.5">
                  <GripVertical size={12} className="text-school-subtle shrink-0" />
                  <span className="font-sans text-xs font-semibold text-school-subtle uppercase tracking-wider">Image {i + 1}</span>
                </div>
                <p className="font-sans text-xs text-school-heading leading-tight line-clamp-2">{image.caption}</p>
                <span
                  tabIndex={0}
                  aria-label="Delete image"
                  onPointerDown={(e) => { e.stopPropagation(); if (images.length > 1) removeImage(image.id) }}
                  onKeyDown={(e) => { if (e.key === 'Enter' && images.length > 1) { e.stopPropagation(); removeImage(image.id) } }}
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-school-subtle hover:text-red-500 transition cursor-pointer"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
                  </svg>
                </span>
              </div>
            ))}
            <span
              role="button"
              tabIndex={0}
              onClick={addImage}
              onKeyDown={(e) => e.key === 'Enter' && addImage()}
              className="flex items-center gap-2 px-3 py-3 text-accent-red hover:bg-accent-red/5 font-sans text-xs font-semibold tracking-wider uppercase cursor-pointer transition-colors"
            >
              <Plus size={13} />
              Add Image
            </span>
          </div>

          {/* Field editor */}
          <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5">
            {editing ? (
              <>
                <div className="space-y-2">
                  <span className="font-sans text-xs font-semibold tracking-widest uppercase text-school-subtle flex items-center gap-2">
                    <ImageIcon size={13} /> Image
                  </span>
                </div>
                <Field label="Image URL">
                  <input
                    type="text"
                    value={editing.src}
                    placeholder="/images/campus.jpg"
                    onChange={(e) => update(editing.id, { src: e.target.value })}
                    className={inputCls}
                  />
                </Field>
                <Field label="Caption">
                  <input
                    type="text"
                    value={editing.caption}
                    onChange={(e) => update(editing.id, { caption: e.target.value })}
                    className={inputCls}
                  />
                </Field>
                <Field label="Alt Text (for accessibility)">
                  <textarea
                    value={editing.alt}
                    rows={2}
                    onChange={(e) => update(editing.id, { alt: e.target.value })}
                    className={`${inputCls} resize-none`}
                    placeholder="Describe the image for screen readers"
                  />
                </Field>
              </>
            ) : (
              <p className="font-sans text-sm text-school-subtle">Select an image to edit.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

interface GalleryEditorPortalsProps {
  images: GalleryImage[]
  editorOpen: boolean
  pinModalOpen: boolean
  onEditorClose: () => void
  onPinSuccess: () => void
  onPinClose: () => void
  onImagesChange: (images: GalleryImage[]) => void
}

export function GalleryEditorPortals({ images, editorOpen, pinModalOpen, onEditorClose, onPinSuccess, onPinClose, onImagesChange }: GalleryEditorPortalsProps) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  return (
    <>
      {pinModalOpen && createPortal(<AdminPinModal onSuccess={onPinSuccess} onClose={onPinClose} />, document.body)}
      {editorOpen && createPortal(<GalleryImageEditor images={images} onClose={onEditorClose} onChange={onImagesChange} />, document.body)}
    </>
  )
}
