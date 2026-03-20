'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { EditorPanel } from './carousel-editor-panel'
import { AdminPinModal } from './carousel-pin-modal'
import type { Slide } from './carousel-types'

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
