'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { X } from 'lucide-react'

const CTA_LINKS = [
  { label: 'Inquire', href: '#inquire' },
  { label: 'Visit', href: '#visit' },
  { label: 'Apply', href: '#apply' },
]

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Academics', href: '#academics' },
  { label: 'Life at Stepping Stones', href: '#life' },
  { label: 'Admissions', href: '#admissions' },
  { label: 'News & Events', href: '#news' },
  { label: 'Contact', href: '#contact' },
]

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 30)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const isLight = scrolled || menuOpen

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? 'rgba(255,255,255,0.97)' : 'transparent',
          backdropFilter: scrolled ? 'blur(14px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(0,0,0,0.07)' : '1px solid transparent',
          boxShadow: scrolled ? '0 2px 24px rgba(0,0,0,0.07)' : 'none',
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="relative flex items-center justify-between" style={{ height: 80 }}>

            {/* LEFT — CTA links (desktop only) */}
            <nav className="hidden md:flex items-center gap-8 w-1/3" aria-label="Quick actions">
              {CTA_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="relative font-sans font-semibold tracking-[0.2em] uppercase transition-colors duration-300 group"
                  style={{
                    fontSize: '10.5px',
                    color: isLight ? 'var(--color-school-heading)' : '#ffffff',
                  }}
                >
                  {link.label}
                  <span
                    className="absolute -bottom-0.5 left-0 h-[1.5px] w-0 group-hover:w-full transition-all duration-300"
                    style={{ background: 'var(--color-accent-red)' }}
                  />
                </Link>
              ))}
            </nav>

            {/* Mobile left spacer */}
            <div className="md:hidden w-10" />

            {/* CENTRE — Logo */}
            <Link
              href="/"
              className="absolute left-1/2 -translate-x-1/2"
              aria-label="Stepping Stones School — home"
            >
              <div
                className="relative transition-all duration-500"
                style={{ width: 58, height: 58 }}
              >
                <Image
                  src="/images/logo-crest.png"
                  alt="Stepping Stones School crest"
                  fill
                  className="object-contain transition-all duration-500"
                  priority
                  style={{
                    filter: isLight ? 'none' : 'brightness(0) invert(1)',
                  }}
                />
              </div>
            </Link>

            {/* RIGHT — Hamburger */}
            <div className="flex items-center justify-end w-1/3 md:w-auto">
              <button
                onClick={() => setMenuOpen(true)}
                aria-label="Open navigation menu"
                aria-expanded={menuOpen}
                className="flex flex-col items-end justify-center gap-[5px] w-10 h-10"
              >
                <span
                  className="block h-[1.5px] w-6 transition-colors duration-300"
                  style={{ background: isLight ? 'var(--color-school-heading)' : '#ffffff' }}
                />
                <span
                  className="block h-[1.5px] w-4 transition-colors duration-300"
                  style={{ background: isLight ? 'var(--color-school-heading)' : '#ffffff' }}
                />
                <span
                  className="block h-[1.5px] w-6 transition-colors duration-300"
                  style={{ background: isLight ? 'var(--color-school-heading)' : '#ffffff' }}
                />
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* ── Full-screen Menu Overlay ────────────────────────────────── */}
      <div
        aria-hidden={!menuOpen}
        className="fixed inset-0 z-[100]"
        style={{
          pointerEvents: menuOpen ? 'all' : 'none',
          opacity: menuOpen ? 1 : 0,
          transition: 'opacity 0.35s ease',
        }}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0"
          style={{ background: 'rgba(15,44,76,0.6)', backdropFilter: 'blur(4px)' }}
          onClick={() => setMenuOpen(false)}
        />

        {/* Slide-in panel */}
        <div
          className="absolute top-0 right-0 h-full flex flex-col w-full md:w-[420px]"
          style={{
            background: 'var(--color-school-navy)',
            transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
            transition: 'transform 0.45s cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          {/* Header row */}
          <div className="flex items-center justify-between px-8 pt-8 pb-6">
            <div className="relative" style={{ width: 44, height: 44 }}>
              <Image
                src="/images/logo-crest.png"
                alt="Stepping Stones School"
                fill
                className="object-contain"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
            </div>
            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="w-9 h-9 flex items-center justify-center transition-colors"
              style={{ color: 'rgba(255,255,255,0.6)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
            >
              <X size={20} strokeWidth={1.5} />
            </button>
          </div>

          {/* Gold rule */}
          <div className="mx-8 h-px mb-8" style={{ background: 'var(--color-gold)', opacity: 0.25 }} />

          {/* Nav links */}
          <nav className="flex flex-col px-8 gap-0 flex-1" aria-label="Main navigation">
            {NAV_LINKS.map((link, i) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-serif py-4 transition-colors duration-200 border-b"
                style={{
                  fontSize: 'clamp(1.2rem,3.5vw,1.5rem)',
                  color: 'rgba(255,255,255,0.85)',
                  borderColor: 'rgba(255,255,255,0.07)',
                  transitionDelay: menuOpen ? `${60 + i * 40}ms` : '0ms',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.85)')}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA buttons */}
          <div className="px-8 pb-12 pt-8">
            <div className="h-px mb-8" style={{ background: 'var(--color-gold)', opacity: 0.25 }} />
            <div className="flex flex-wrap gap-3">
              {CTA_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-sans font-bold tracking-[0.2em] uppercase px-6 py-3 border transition-all duration-300"
                  style={{
                    fontSize: '10.5px',
                    color: '#ffffff',
                    borderColor: 'rgba(255,255,255,0.25)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#ffffff'
                    e.currentTarget.style.color = 'var(--color-school-navy)'
                    e.currentTarget.style.borderColor = '#ffffff'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.color = '#ffffff'
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
