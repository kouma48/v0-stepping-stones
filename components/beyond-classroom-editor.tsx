'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { X, ImageIcon, ChevronDown, ChevronUp, Upload } from 'lucide-react'
import { AdminPinModal } from './carousel-pin-modal'

export interface BeyondTab {
  id: string
  label: string
  eyebrow: string
  title: string
  boldIntro: string
  description: string
  ctaText: string
  ctaHref: string
  image: string
  imageAlt: string
}

const inputCls =
  'w-full font-sans text-sm text-school-heading border border-school-divider px-3 py-2 focus:outline-none focus:border-accent-red transition-colors bg-white'

const textareaCls = `${inputCls} resize-none`

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

function TabEditor({
  tabs,
  onClose,
  onChange,
}: {
  tabs: BeyondTab[]
  onClose: () => void
  onChange: (tabs: BeyondTab[]) => void
}) {
  const [activeId, setActiveId] = useState<string>(tabs[0]?.id ?? '')
  const [dragging, setDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const tab = tabs.find((t) => t.id === activeId) ?? tabs[0]

  function update(patch: Partial<BeyondTab>) {
    onChange(tabs.map((t) => (t.id === activeId ? { ...t, ...patch } : t)))
  }

  function handleFile(file: File) {
    if (!file.type.startsWith('image/')) return
    const url = URL.createObjectURL(file)
    update({ image: url, imageAlt: tab?.imageAlt ?? file.name })
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) handleFile(file)
  }

  function moveUp(id: string) {
    const idx = tabs.findIndex((t) => t.id === id)
    if (idx <= 0) return
    const next = [...tabs]
    ;[next[idx - 1], next[idx]] = [next[idx], next[idx - 1]]
    onChange(next)
  }

  function moveDown(id: string) {
    const idx = tabs.findIndex((t) => t.id === id)
    if (idx >= tabs.length - 1) return
    const next = [...tabs]
    ;[next[idx], next[idx + 1]] = [next[idx + 1], next[idx]]
    onChange(next)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-stretch">
      {/* Backdrop */}
      <div className="flex-1 bg-black/40 cursor-default" onClick={onClose} />

      {/* Panel */}
      <div className="w-full max-w-lg bg-white shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-school-divider shrink-0">
          <span className="font-sans font-semibold text-school-heading text-sm tracking-widest uppercase">
            Section Editor
          </span>
          <button
            onClick={onClose}
            aria-label="Close editor"
            className="text-school-subtle hover:text-school-heading transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Tab list sidebar */}
          <div className="w-40 border-r border-school-divider flex flex-col overflow-y-auto shrink-0">
            {tabs.map((t, idx) => (
              <div
                key={t.id}
                onClick={() => setActiveId(t.id)}
                className={`group relative px-3 py-3 border-b border-school-divider cursor-pointer select-none transition-colors ${
                  activeId === t.id
                    ? 'border-l-2 border-l-accent-red bg-accent-red/5'
                    : 'hover:bg-gray-50'
                }`}
              >
                <p className="font-sans text-xs font-semibold text-school-heading leading-tight">
                  {t.label}
                </p>
                {/* Move up/down */}
                <div className="absolute top-2 right-1 flex flex-col gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => { e.stopPropagation(); moveUp(t.id) }}
                    aria-label="Move up"
                    className="text-school-subtle hover:text-school-heading"
                  >
                    <ChevronUp size={11} />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); moveDown(t.id) }}
                    aria-label="Move down"
                    className="text-school-subtle hover:text-school-heading"
                  >
                    <ChevronDown size={11} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Field editor */}
          <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4">
            {tab ? (
              <>
                {/* Image Upload */}
                <div className="flex items-center gap-2 pb-1 border-b border-school-divider">
                  <ImageIcon size={13} className="text-school-subtle" />
                  <span className="font-sans text-xs font-semibold tracking-widest uppercase text-school-subtle">
                    Image
                  </span>
                </div>

                {/* Drop zone */}
                <div
                  onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className="relative flex flex-col items-center justify-center gap-2 border-2 border-dashed cursor-pointer transition-colors py-5"
                  style={{ borderColor: dragging ? 'var(--color-accent-red)' : '#d1d5db', background: dragging ? 'rgba(193,31,30,0.04)' : '#fafafa' }}
                >
                  {tab?.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={tab.image} alt="preview" className="w-full h-32 object-cover" />
                  ) : (
                    <>
                      <Upload size={20} className="text-school-subtle" />
                      <span className="font-sans text-xs text-school-subtle">Drop image or click to upload</span>
                    </>
                  )}
                  {tab?.image && (
                    <div className="absolute inset-0 bg-black/0 hover:bg-black/30 flex items-center justify-center transition-colors group">
                      <span className="font-sans text-xs text-white opacity-0 group-hover:opacity-100 font-semibold tracking-widest uppercase">
                        Replace Image
                      </span>
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f) }}
                  />
                </div>

                <Field label="Image Alt Text">
                  <input
                    type="text"
                    value={tab?.imageAlt ?? ''}
                    onChange={(e) => update({ imageAlt: e.target.value })}
                    className={inputCls}
                  />
                </Field>

                {/* Content */}
                <div className="flex items-center gap-2 pb-1 border-b border-school-divider pt-2">
                  <span className="font-sans text-xs font-semibold tracking-widest uppercase text-school-subtle">
                    Content
                  </span>
                </div>
                <Field label="Tab Label">
                  <input
                    type="text"
                    value={tab.label}
                    onChange={(e) => update({ label: e.target.value })}
                    className={inputCls}
                  />
                </Field>
                <Field label="Eyebrow">
                  <input
                    type="text"
                    value={tab.eyebrow}
                    onChange={(e) => update({ eyebrow: e.target.value })}
                    className={inputCls}
                  />
                </Field>
                <Field label="Title">
                  <input
                    type="text"
                    value={tab.title}
                    onChange={(e) => update({ title: e.target.value })}
                    className={inputCls}
                  />
                </Field>
                <Field label="Bold Intro">
                  <input
                    type="text"
                    value={tab.boldIntro}
                    onChange={(e) => update({ boldIntro: e.target.value })}
                    className={inputCls}
                  />
                </Field>
                <Field label="Description">
                  <textarea
                    value={tab.description}
                    rows={4}
                    onChange={(e) => update({ description: e.target.value })}
                    className={textareaCls}
                  />
                </Field>

                {/* CTA */}
                <div className="flex items-center gap-2 pb-1 border-b border-school-divider pt-2">
                  <span className="font-sans text-xs font-semibold tracking-widest uppercase text-school-subtle">
                    CTA Button
                  </span>
                </div>
                <Field label="Button Text">
                  <input
                    type="text"
                    value={tab.ctaText}
                    onChange={(e) => update({ ctaText: e.target.value })}
                    className={inputCls}
                  />
                </Field>
                <Field label="Button Link">
                  <input
                    type="text"
                    value={tab.ctaHref}
                    onChange={(e) => update({ ctaHref: e.target.value })}
                    className={inputCls}
                    placeholder="/sports"
                  />
                </Field>
              </>
            ) : (
              <p className="font-sans text-sm text-school-subtle">Select a tab to edit.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

interface BeyondClassroomEditorPortalsProps {
  tabs: BeyondTab[]
  editorOpen: boolean
  pinModalOpen: boolean
  onEditorClose: () => void
  onPinSuccess: () => void
  onPinClose: () => void
  onTabsChange: (tabs: BeyondTab[]) => void
}

export function BeyondClassroomEditorPortals({
  tabs,
  editorOpen,
  pinModalOpen,
  onEditorClose,
  onPinSuccess,
  onPinClose,
  onTabsChange,
}: BeyondClassroomEditorPortalsProps) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  return (
    <>
      {pinModalOpen &&
        createPortal(
          <AdminPinModal onSuccess={onPinSuccess} onClose={onPinClose} />,
          document.body
        )}
      {editorOpen &&
        createPortal(
          <TabEditor tabs={tabs} onClose={onEditorClose} onChange={onTabsChange} />,
          document.body
        )}
    </>
  )
}
