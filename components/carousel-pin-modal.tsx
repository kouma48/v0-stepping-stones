'use client'

import { useState } from 'react'
import { X } from 'lucide-react'

const ADMIN_PIN = '1234'

export function AdminPinModal({
  onSuccess,
  onClose,
}: {
  onSuccess: () => void
  onClose: () => void
}) {
  const [pin, setPin] = useState('')
  const [error, setError] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (pin === ADMIN_PIN) {
      onSuccess()
    } else {
      setError(true)
      setPin('')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white w-full max-w-xs mx-4 p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-sans font-semibold text-school-heading text-sm tracking-widest uppercase">
            Admin Access
          </h2>
          <button
            onClick={onClose}
            className="text-school-subtle hover:text-school-heading transition-colors"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-sans text-xs font-semibold tracking-widest uppercase text-school-subtle block mb-1">
              Enter PIN
            </label>
            <input
              type="password"
              inputMode="numeric"
              maxLength={8}
              value={pin}
              onChange={(e) => { setPin(e.target.value); setError(false) }}
              autoFocus
              className={`w-full font-sans text-sm border px-3 py-2 focus:outline-none transition-colors ${
                error ? 'border-red-400 bg-red-50' : 'border-school-divider focus:border-accent-red'
              }`}
              placeholder="••••"
            />
            {error && (
              <p className="font-sans text-xs text-red-500 mt-1">Incorrect PIN. Try again.</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full font-sans font-semibold text-sm tracking-widest uppercase px-4 py-2.5 bg-accent-red text-white hover:bg-accent-red/90 transition-colors"
          >
            Unlock
          </button>
        </form>
      </div>
    </div>
  )
}
