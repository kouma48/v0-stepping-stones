'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { X, Info, MapPin, Send } from 'lucide-react'

const CTA_LINKS = [
  { label: 'Inquire', href: '#inquire', icon: Info },
  { label: 'Visit', href: '#visit', icon: MapPin },
  { label: 'Apply', href: '#apply', icon: Send },
]

const UTILITY_LINKS = [
  { label: 'Parents', href: '#parents' },
  { label: 'Alumni', href: '#alumni' },
  { label: 'Calendar', href: '#calendar' },
  { label: 'Careers', href: '#careers' },
  { label: 'Giving', href: '#giving' },
]

// Mega menu navigation structure with submenus and images
const MEGA_NAV = [
  {
    label: 'About',
    href: '#about',
    image: '/images/hero-1.jpg',
    submenu: [
      { label: 'Our Story', href: '#our-story' },
      { label: 'Mission & Values', href: '#mission' },
      { label: 'Leadership', href: '#leadership' },
      { label: 'Campus & Facilities', href: '#campus' },
      { label: 'Accreditation', href: '#accreditation' },
    ],
  },
  {
    label: 'Academics',
    href: '#academics',
    image: '/images/hero-2.jpg',
    submenu: [
      { label: 'Early Years', href: '#early-years' },
      { label: 'Primary School', href: '#primary' },
      { label: 'Middle School', href: '#middle' },
      { label: 'Upper School', href: '#upper' },
      { label: 'Curriculum', href: '#curriculum' },
      { label: 'Learning Support', href: '#learning-support' },
    ],
  },
  {
    label: 'Life at Stepping Stones',
    href: '#life',
    image: '/images/hero-3.jpg',
    submenu: [
      { label: 'Sports & Athletics', href: '#sports' },
      { label: 'Performing Arts', href: '#arts' },
      { label: 'Pastoral Care', href: '#pastoral' },
      { label: 'Clubs & Activities', href: '#clubs' },
      { label: 'Student Leadership', href: '#leadership' },
    ],
  },
  {
    label: 'Admissions',
    href: '#admissions',
    image: '/images/hero-1.jpg',
    submenu: [
      { label: 'How to Apply', href: '#how-to-apply' },
      { label: 'Tuition & Fees', href: '#tuition' },
      { label: 'Scholarships', href: '#scholarships' },
      { label: 'Open Days', href: '#open-days' },
      { label: 'FAQs', href: '#faqs' },
    ],
  },
  {
    label: 'News & Events',
    href: '#news',
    image: '/images/hero-2.jpg',
    submenu: [
      { label: 'Latest News', href: '#latest-news' },
      { label: 'Upcoming Events', href: '#events' },
      { label: 'School Calendar', href: '#calendar' },
      { label: 'Newsletter', href: '#newsletter' },
    ],
  },
  {
    label: 'Contact',
    href: '#contact',
    image: '/images/hero-3.jpg',
    submenu: [
      { label: 'Get in Touch', href: '#get-in-touch' },
      { label: 'Location & Directions', href: '#location' },
      { label: 'Enquiry Form', href: '#enquiry' },
    ],
  },
]

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [hoveredNav, setHoveredNav] = useState<number | null>(null)

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 40) }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    if (!menuOpen) setHoveredNav(null)
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const isLight = scrolled
  const activeNav = hoveredNav !== null ? MEGA_NAV[hoveredNav] : null
  const activeImage = activeNav?.image || '/images/hero-1.jpg'

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? 'rgba(255,255,255,0.98)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(0,0,0,0.08)' : '1px solid transparent',
          boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.06)' : 'none',
        }}
      >
        <div className="max-w-[1400px] mx-auto px-8 md:px-14">
          <div className="relative flex items-center" style={{ height: scrolled ? 80 : 160, transition: 'height 0.5s ease' }}>

            {/* LEFT — Inquire / Visit / Apply */}
            <div className="flex items-center gap-7 flex-1" style={{ opacity: scrolled ? 1 : 0.95, transition: 'opacity 0.5s ease' }}>
              {CTA_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="relative font-sans font-semibold tracking-[0.22em] uppercase transition-colors duration-300 group hidden md:block"
                  style={{
                    fontSize: '10px',
                    color: isLight ? 'var(--color-school-heading)' : 'rgba(255,255,255,0.92)',
                  }}
                >
                  {link.label}
                  <span
                    className="absolute -bottom-0.5 left-0 h-[1.5px] w-0 group-hover:w-full transition-all duration-300"
                    style={{ background: 'var(--color-accent-red)' }}
                  />
                </Link>
              ))}
            </div>

            {/* CENTRE — Logo pinned to horizontal & vertical centre with top offset */}
            <Link
              href="/"
              className="absolute flex flex-col items-center"
              style={{
                left: '50%',
                top: scrolled ? '50%' : '16px',
                transform: scrolled ? 'translate(-50%, -50%)' : 'translateX(-50%)',
                transition: 'top 0.5s ease, transform 0.5s ease',
              }}
              aria-label="Stepping Stones School — home"
            >
              {/* White logo: shown on transparent header */}
              <div
                className="transition-opacity duration-500"
                style={{ opacity: isLight ? 0 : 1, position: isLight ? 'absolute' : 'relative' }}
              >
                <div
                  className="relative transition-all duration-500"
                  style={{ width: scrolled ? 80 : 160, height: scrolled ? 80 : 160 }}
                >
                  <Image
                    src="/images/logo-white.png"
                    alt="Stepping Stones School"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
              {/* Colour logo: shown on scrolled white header */}
              <div
                className="transition-opacity duration-500"
                style={{ opacity: isLight ? 1 : 0, position: isLight ? 'relative' : 'absolute' }}
              >
                <div
                  className="relative transition-all duration-500"
                  style={{ width: scrolled ? 80 : 160, height: scrolled ? 80 : 160 }}
                >
                  <Image
                    src="/images/logo-colour.png"
                    alt="Stepping Stones School"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
            </Link>

            {/* RIGHT — Menu label + Hamburger */}
            <div className="flex items-center justify-end gap-3 flex-1" style={{ opacity: scrolled ? 1 : 0.95, transition: 'opacity 0.5s ease' }}>
              <span
                className="hidden md:block font-sans font-semibold tracking-[0.22em] uppercase transition-colors duration-300"
                style={{
                  fontSize: '10px',
                  color: isLight ? 'var(--color-school-heading)' : 'rgba(255,255,255,0.92)',
                }}
              >
                Menu
              </span>
              <button
                onClick={() => setMenuOpen(true)}
                aria-label="Open navigation menu"
                aria-expanded={menuOpen}
                className="flex flex-col items-center justify-center gap-[5px] w-10 h-10"
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

      {/* ── Baylor-style Full-screen Mega Menu ─────────────────────────────── */}
      <div
        aria-hidden={!menuOpen}
        className="fixed inset-0 z-[100]"
        style={{
          pointerEvents: menuOpen ? 'all' : 'none',
          opacity: menuOpen ? 1 : 0,
          transition: 'opacity 0.4s ease',
        }}
      >
        {/* Full-screen layout: image left, content right */}
        <div className="flex h-full">

          {/* LEFT — Dynamic image panel (hidden on mobile) */}
          <div className="hidden md:block relative w-1/2 h-full overflow-hidden">
            {MEGA_NAV.map((nav, i) => (
              <div
                key={nav.label}
                className="absolute inset-0 transition-opacity duration-500"
                style={{ opacity: hoveredNav === i ? 1 : (hoveredNav === null && i === 0) ? 1 : 0 }}
              >
                <Image
                  src={nav.image}
                  alt={nav.label}
                  fill
                  priority
                  loading="eager"
                  className="object-cover"
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/20" />
              </div>
            ))}
          </div>

          {/* RIGHT — Menu content panel */}
          <div
            className="flex flex-col w-full md:w-1/2 h-full bg-white"
            style={{
              transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
              transition: 'transform 0.5s cubic-bezier(0.22,1,0.36,1)',
            }}
          >
            {/* Utility bar + close button */}
            <div className="flex items-center justify-between px-8 md:px-12 py-5 border-b border-gray-100">
              <nav className="hidden md:flex items-center gap-6" aria-label="Utility navigation">
                {UTILITY_LINKS.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="font-sans font-semibold tracking-[0.18em] uppercase text-gray-500 hover:text-gray-900 transition-colors duration-200"
                    style={{ fontSize: '9px' }}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="md:hidden" /> {/* Spacer on mobile */}
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-900 text-white hover:bg-gray-800 transition-colors duration-200"
              >
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>

            {/* Main content: nav + submenu */}
            <div className="flex flex-1 overflow-hidden">
              {/* Primary nav column */}
              <nav
                className="flex flex-col justify-center px-8 md:px-12 py-10 w-full md:w-1/2 border-r border-gray-100"
                aria-label="Main navigation"
                onMouseLeave={() => setHoveredNav(null)}
              >
                {MEGA_NAV.map((nav, i) => (
                  <Link
                    key={nav.label}
                    href={nav.href}
                    onClick={() => setMenuOpen(false)}
                    onMouseEnter={() => setHoveredNav(i)}
                    className="group relative font-serif py-3 transition-colors duration-200"
                    style={{
                      fontSize: 'clamp(1.4rem, 2.5vw, 1.75rem)',
                      color: hoveredNav === i ? '#c11f1e' : 'var(--color-school-heading)',
                    }}
                  >
                    {nav.label}
                    {/* Red underline on active */}
                    <span
                      className="absolute left-0 -bottom-0.5 h-[2px] transition-all duration-300"
                      style={{
                        width: hoveredNav === i ? '100%' : '0%',
                        background: '#c11f1e',
                      }}
                    />
                  </Link>
                ))}
              </nav>

              {/* Submenu column (visible when item hovered) */}
              <div
                className="hidden md:flex flex-col justify-center px-10 py-10 w-1/2 transition-opacity duration-300"
                style={{ opacity: hoveredNav !== null ? 1 : 0 }}
              >
                {activeNav && (
                  <div className="flex flex-col gap-1">
                    {activeNav.submenu.map((sub, i) => (
                      <Link
                        key={sub.label}
                        href={sub.href}
                        onClick={() => setMenuOpen(false)}
                        className="font-sans py-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
                        style={{
                          fontSize: '14px',
                          opacity: hoveredNav !== null ? 1 : 0,
                          transform: hoveredNav !== null ? 'translateX(0)' : 'translateX(8px)',
                          transition: `opacity 0.3s ease ${i * 40}ms, transform 0.3s ease ${i * 40}ms, color 0.2s`,
                        }}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Bottom CTA bar (red) */}
            <div
              className="flex items-stretch border-t border-gray-100"
              style={{ background: '#c11f1e' }}
            >
              {CTA_LINKS.map((link) => {
                const Icon = link.icon
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex-1 flex items-center justify-center gap-3 py-5 text-white hover:bg-white/10 transition-colors duration-200 border-r border-white/20 last:border-r-0"
                  >
                    <Icon size={16} strokeWidth={1.5} />
                    <span
                      className="font-sans font-bold tracking-[0.2em] uppercase"
                      style={{ fontSize: '10px' }}
                    >
                      {link.label}
                    </span>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
