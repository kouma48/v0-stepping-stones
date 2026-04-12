'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { X, Info, MapPin, Send } from 'lucide-react'

// Base URL for all internal links
const BASE_URL = 'https://steppingstones.co.ke'

// Bottom CTA bar links
const CTA_LINKS = [
  { label: 'Inquire', href: `${BASE_URL}/contact-us/`, icon: Info },
  { label: 'Visit', href: `${BASE_URL}/book-a-visit/`, icon: MapPin },
  { label: 'Apply', href: `${BASE_URL}/apply-now/`, icon: Send },
]

// Utility bar links
const UTILITY_LINKS = [
  { label: 'News', href: `${BASE_URL}/news/` },
  { label: 'Events', href: `${BASE_URL}/events/` },
  { label: 'Careers', href: `${BASE_URL}/careers/` },
  { label: 'Contact', href: `${BASE_URL}/contact-us/` },
]

// Mega menu navigation structure with submenus and contextual images
const MEGA_NAV = [
  {
    label: 'About Us',
    href: `${BASE_URL}/#`,
    image: '/images/about-us.jpg',
    submenu: [
      { label: 'Welcome Message', href: `${BASE_URL}/welcome-message/` },
      { label: 'Our Story', href: `${BASE_URL}/our-story/` },
      { label: 'Our Leadership', href: `${BASE_URL}/our-leadership/` },
      { label: 'Our Campus', href: `${BASE_URL}/our-campus/` },
      { label: 'Careers', href: `${BASE_URL}/careers/` },
    ],
  },
  {
    label: 'Academics',
    href: `${BASE_URL}/#`,
    image: '/images/academics.jpg',
    submenu: [
      { label: 'Kindergarten', href: `${BASE_URL}/kindergarten/` },
      { label: 'Lower Primary', href: `${BASE_URL}/lower-primary/` },
      { label: 'Upper Primary', href: `${BASE_URL}/upper-primary/` },
      { label: 'Junior Secondary', href: `${BASE_URL}/junior-secondary/` },
      { label: 'Learning Support', href: `${BASE_URL}/learning-support/` },
      { label: 'Beyond Classroom', href: `${BASE_URL}/beyond-classroom/` },
    ],
  },
  {
    label: 'Admissions',
    href: `${BASE_URL}/#`,
    image: '/images/admissions.jpg',
    submenu: [
      { label: 'Why Stepping Stones', href: `${BASE_URL}/why-stepping-stones/` },
      { label: 'Admissions Process', href: `${BASE_URL}/admissions-process/` },
      { label: 'Apply Now', href: `${BASE_URL}/apply-now/` },
      { label: 'Fees Structure', href: `${BASE_URL}/fees-structure/` },
      { label: 'Book a Visit', href: `${BASE_URL}/book-a-visit/` },
    ],
  },
  {
    label: 'School Life',
    href: `${BASE_URL}/#`,
    image: '/images/school-life.jpg',
    submenu: [
      { label: 'Daily Life', href: `${BASE_URL}/daily-life/` },
      { label: 'Co-curricular Programs', href: `${BASE_URL}/co-curricular-programs/` },
      { label: 'Student Development', href: `${BASE_URL}/student-development/` },
      { label: 'Student Well Being', href: `${BASE_URL}/student-well-being/` },
    ],
  },
  {
    label: 'News',
    href: `${BASE_URL}/news/`,
    image: '/images/academics.jpg',
    submenu: [],
  },
  {
    label: 'Events',
    href: `${BASE_URL}/events/`,
    image: '/images/school-life.jpg',
    submenu: [],
  },
]

export default function HeaderPreview() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [hoveredNav, setHoveredNav] = useState<number | null>(null)
  const [submenuTop, setSubmenuTop] = useState(0)
  const navItemRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const navColumnRef = useRef<HTMLElement | null>(null)

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

  function handleNavHover(i: number) {
    setHoveredNav(i)
    const item = navItemRefs.current[i]
    const col = navColumnRef.current
    if (item && col) {
      const itemRect = item.getBoundingClientRect()
      const colRect = col.getBoundingClientRect()
      setSubmenuTop(itemRect.top - colRect.top)
    }
  }

  return (
    <>
      <style>{`
        @font-face {
          font-family: 'Roxborough CF';
          src: url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/RoxboroughCF-4ithLz81mwg1G5YNF5eeNDJZ2REPvd.ttf') format('truetype');
          font-weight: 400;
          font-style: normal;
        }
        
        :root {
          --color-school-heading: #1a1a2e;
          --color-accent-red: #c11f1e;
        }
        
        .font-serif {
          font-family: 'Roxborough CF', serif;
        }
      `}</style>

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
                <a
                  key={link.label}
                  href={link.href}
                  target="_top"
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
                </a>
              ))}
            </div>

            {/* CENTRE — Logo */}
            <a
              href={BASE_URL}
              target="_top"
              className="absolute flex flex-col items-center"
              style={{
                left: '50%',
                top: scrolled ? '50%' : '16px',
                transform: scrolled ? 'translate(-50%, -50%)' : 'translateX(-50%)',
                transition: 'top 0.5s ease, transform 0.5s ease',
              }}
              aria-label="Stepping Stones School — home"
            >
              <div
                className="transition-opacity duration-500 relative"
                style={{ opacity: isLight ? 0 : 1, position: isLight ? 'absolute' : 'relative', width: scrolled ? 80 : 160, height: scrolled ? 80 : 160 }}
              >
                <Image
                  src="/images/logo-white.png"
                  alt="Stepping Stones School"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div
                className="transition-opacity duration-500 relative"
                style={{ opacity: isLight ? 1 : 0, position: isLight ? 'relative' : 'absolute', width: scrolled ? 80 : 160, height: scrolled ? 80 : 160 }}
              >
                <Image
                  src="/images/logo-colour.png"
                  alt="Stepping Stones School"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </a>

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

      {/* ── Mega Menu ─────────────────────────────── */}
      <div
        aria-hidden={!menuOpen}
        className="fixed inset-0 z-[100]"
        style={{
          pointerEvents: menuOpen ? 'all' : 'none',
          opacity: menuOpen ? 1 : 0,
          transition: 'opacity 0.4s ease',
        }}
      >
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
                  priority={i === 0}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  className="object-cover"
                />
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
                  <a
                    key={link.label}
                    href={link.href}
                    target="_top"
                    onClick={() => setMenuOpen(false)}
                    className="font-sans font-semibold tracking-[0.18em] uppercase text-gray-500 hover:text-gray-900 transition-colors duration-200"
                    style={{ fontSize: '9px' }}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
              <div className="md:hidden" />
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-900 text-white hover:bg-gray-800 transition-colors duration-200"
              >
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>

            {/* Main content: nav + submenu */}
            <div
              className="flex flex-col md:flex-row flex-1 overflow-y-auto md:overflow-hidden"
              onMouseLeave={() => setHoveredNav(null)}
            >
              {/* Primary nav column */}
              <nav
                ref={navColumnRef}
                className="relative flex flex-col px-8 md:px-12 pt-12 md:pt-16 pb-8 md:pb-10 w-full md:w-1/2 md:justify-start border-r-0 md:border-r border-gray-100"
                aria-label="Main navigation"
              >
                {MEGA_NAV.map((nav, i) => (
                  <div key={nav.label}>
                    {nav.submenu.length > 0 ? (
                      <>
                        {/* Desktop: Link on hover */}
                        <a
                          ref={(el) => { navItemRefs.current[i] = el as any }}
                          href={nav.href}
                          target="_top"
                          onClick={() => setMenuOpen(false)}
                          onMouseEnter={() => handleNavHover(i)}
                          className="hidden md:block w-full text-left relative font-serif py-3 transition-colors duration-200"
                          style={{
                            fontSize: 'clamp(1.1rem, 2.5vw, 1.75rem)',
                            color: hoveredNav === i ? '#c11f1e' : 'var(--color-school-heading)',
                          }}
                        >
                          <span>{nav.label}</span>
                          <span
                            className="absolute -bottom-0.5 h-[2px] transition-all duration-300"
                            style={{
                              left: 0,
                              width: hoveredNav === i ? 'calc(100% + 3rem)' : '0%',
                              background: '#c11f1e',
                            }}
                          />
                        </a>
                        {/* Mobile: Button to toggle */}
                        <button
                          onClick={() => setHoveredNav(hoveredNav === i ? null : i)}
                          className="md:hidden w-full text-left relative font-serif py-3 transition-colors duration-200"
                          style={{
                            fontSize: 'clamp(1.1rem, 2.5vw, 1.75rem)',
                            color: hoveredNav === i ? '#c11f1e' : 'var(--color-school-heading)',
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <span>{nav.label}</span>
                            <span
                              className="text-sm transition-transform duration-200"
                              style={{
                                transform: hoveredNav === i ? 'rotate(180deg)' : 'rotate(0deg)',
                              }}
                            >
                              ▾
                            </span>
                          </div>
                        </button>
                      </>
                    ) : (
                      <a
                        ref={(el) => { navItemRefs.current[i] = el as any }}
                        href={nav.href}
                        target="_top"
                        onClick={() => setMenuOpen(false)}
                        onMouseEnter={() => handleNavHover(i)}
                        className="block w-full text-left relative font-serif py-3 transition-colors duration-200"
                        style={{
                          fontSize: 'clamp(1.1rem, 2.5vw, 1.75rem)',
                          color: hoveredNav === i ? '#c11f1e' : 'var(--color-school-heading)',
                        }}
                      >
                        <span>{nav.label}</span>
                        <span
                          className="absolute -bottom-0.5 h-[2px] transition-all duration-300 hidden md:block"
                          style={{
                            left: 0,
                            width: hoveredNav === i ? 'calc(100% + 3rem)' : '0%',
                            background: '#c11f1e',
                          }}
                        />
                      </a>
                    )}

                    {/* Mobile submenu */}
                    {nav.submenu.length > 0 && hoveredNav === i && (
                      <div className="md:hidden pl-4 pb-2 flex flex-col gap-1">
                        {nav.submenu.map((sub) => (
                          <a
                            key={sub.label}
                            href={sub.href}
                            target="_top"
                            onClick={() => setMenuOpen(false)}
                            className="font-sans py-2 text-base text-gray-600 hover:text-gray-900 active:text-gray-900 transition-colors duration-200"
                          >
                            {sub.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>

              {/* Desktop submenu column */}
              <div className="hidden md:block relative w-1/2">
                <div
                  className="absolute left-0 h-[2px]"
                  style={{
                    top: submenuTop + 14,
                    width: hoveredNav !== null && activeNav?.submenu.length ? '48px' : '0px',
                    background: '#c11f1e',
                    opacity: hoveredNav !== null && activeNav?.submenu.length ? 1 : 0,
                    transition: 'top 0.25s ease, width 0.3s ease, opacity 0.2s ease',
                  }}
                />
                <div
                  className="absolute px-10 transition-opacity duration-200"
                  style={{
                    left: '40px',
                    top: submenuTop,
                    opacity: hoveredNav !== null ? 1 : 0,
                    pointerEvents: hoveredNav !== null ? 'all' : 'none',
                  }}
                >
                  {activeNav && (
                    <div className="flex flex-col gap-0">
                      {activeNav.submenu.map((sub, i) => (
                        <a
                          key={sub.label}
                          href={sub.href}
                          target="_top"
                          onClick={() => setMenuOpen(false)}
                          className="font-sans py-2 text-gray-500 hover:text-gray-900 transition-colors duration-200"
                          style={{
                            fontSize: '14px',
                            opacity: hoveredNav !== null ? 1 : 0,
                            transform: hoveredNav !== null ? 'translateX(0)' : 'translateX(8px)',
                            transition: `opacity 0.25s ease ${i * 35}ms, transform 0.25s ease ${i * 35}ms, color 0.2s`,
                          }}
                        >
                          {sub.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom CTA bar */}
            <div
              className="flex flex-col md:flex-row items-stretch border-t border-gray-100"
              style={{ background: '#c11f1e' }}
            >
              {CTA_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_top"
                  onClick={() => setMenuOpen(false)}
                  className="flex-1 flex items-center justify-center gap-2 text-white font-sans font-semibold tracking-[0.22em] uppercase transition-colors duration-200 py-4 md:py-6 border-b md:border-b-0 md:border-r last:border-0 hover:bg-red-700"
                  style={{ fontSize: '11px' }}
                >
                  <link.icon size={18} />
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section with Image */}
      <div 
        style={{ 
          minHeight: '100vh',
          backgroundImage: 'url(/hero-preview.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          position: 'relative'
        }}
      >
        {/* Dark overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.4)'
        }}></div>
        
        {/* Hero content */}
        <div style={{ 
          position: 'relative', 
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          padding: 40,
          color: '#fff',
          textAlign: 'center'
        }}>
          <h1 style={{ fontSize: 64, fontWeight: 300, marginBottom: 20, fontFamily: "'Roxborough CF', serif" }}>
            Impact Starts Here
          </h1>
          <p style={{ fontSize: 18, opacity: 0.95, maxWidth: 600, marginBottom: 40 }}>
            Scroll to see the transparent header overlay in action. Click MENU to explore the mega navigation.
          </p>
        </div>
      </div>
      
      {/* Additional content to enable scrolling */}
      <div style={{ padding: 60, background: '#fff' }}>
        <h2 style={{ fontSize: 36, fontWeight: 400, marginBottom: 20, fontFamily: "'Roxborough CF', serif", color: '#000' }}>
          Below the Fold
        </h2>
        <p style={{ fontSize: 16, color: '#666', lineHeight: 1.6, marginBottom: 20 }}>
          Scroll back up to see how the transparent header overlay adapts as you move through the page. The header maintains transparency over the hero image and becomes solid white with a blur effect as you scroll down.
        </p>
        <div style={{ height: 400, background: 'linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999', fontSize: 18 }}>
          Additional content space for scrolling
        </div>
      </div>
    </>
  )
}
