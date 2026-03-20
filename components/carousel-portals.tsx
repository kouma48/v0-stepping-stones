'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import dynamic from 'next/dynamic'
import { AdminPinModal } from './carousel-pin-modal'
import type { Slide } from './carousel-types'

// Dynamic import with ssr:false so Next.js never server-renders EditorPanel
// This prevents any nested <button> hydration mismatch
const EditorPanel = dynamic(
  () => import('./carousel-editor-panel').then((m) => m.EditorPanel),
  { ssr: false }
)

interface CarouselPortalsProps {
  slides: Slide[]
  editorOpen: boolean
  pinModalOpen: boolean
  onEditorClose: () => void
  onPinSuccess: () => void
  onPinClose: () => void
  onSlidesChange: (slides: Slide[]) => void
}

export function CarouselPortals({
  slides,
  editorOpen,
  pinModalOpen,
  onEditorClose,
  onPinSuccess,
  onPinClose,
  onSlidesChange,
}: CarouselPortalsProps) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  return (
    <>
      {pinModalOpen && createPortal(
        <AdminPinModal onSuccess={onPinSuccess} onClose={onPinClose} />,
        document.body
      )}
      {editorOpen && createPortal(
        <EditorPanel slides={slides} onClose={onEditorClose} onChange={onSlidesChange} />,
        document.body
      )}
    </>
  )
}
