'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      {/* Fixed header bar with MENU text + hamburger button */}
      <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
        <div className="flex items-center justify-between px-6 md:px-10 py-6">
          {/* MENU text + hamburger button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-4 pointer-events-auto group"
            aria-label="Toggle menu"
          >
            <span className="font-sans font-semibold text-white text-lg tracking-[0.2em] uppercase">
              Menu
            </span>
            <div className="w-12 h-12 rounded-full bg-accent-red flex items-center justify-center transition-transform group-hover:scale-105">
              <div className="grid grid-cols-3 gap-1">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full bg-white" />
                ))}
              </div>
            </div>
          </button>
        </div>
      </header>

      {/* Full-screen menu overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] bg-navy/98 backdrop-blur-sm">
          <div className="container max-w-5xl mx-auto px-6 py-8 h-full flex flex-col">
            {/* Close button */}
            <div className="flex justify-end">
              <button
                onClick={() => setMenuOpen(false)}
                className="w-12 h-12 rounded-full bg-accent-red flex items-center justify-center hover:scale-105 transition-transform"
                aria-label="Close menu"
              >
                <X size={24} className="text-white" />
              </button>
            </div>

            {/* Navigation links */}
            <nav className="flex-1 flex items-center justify-center">
              <ul className="space-y-8 text-center">
                <li>
                  <Link
                    href="/"
                    onClick={() => setMenuOpen(false)}
                    className="font-serif text-5xl md:text-6xl text-white hover:text-accent-red transition-colors block"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="#learning"
                    onClick={() => setMenuOpen(false)}
                    className="font-serif text-5xl md:text-6xl text-white hover:text-accent-red transition-colors block"
                  >
                    Learning
                  </Link>
                </li>
                <li>
                  <Link
                    href="#admissions"
                    onClick={() => setMenuOpen(false)}
                    className="font-serif text-5xl md:text-6xl text-white hover:text-accent-red transition-colors block"
                  >
                    Admissions
                  </Link>
                </li>
                <li>
                  <Link
                    href="#about"
                    onClick={() => setMenuOpen(false)}
                    className="font-serif text-5xl md:text-6xl text-white hover:text-accent-red transition-colors block"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="#contact"
                    onClick={() => setMenuOpen(false)}
                    className="font-serif text-5xl md:text-6xl text-white hover:text-accent-red transition-colors block"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
