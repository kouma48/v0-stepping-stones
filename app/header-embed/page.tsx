"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { X, Info, MapPin, Send } from "lucide-react"

const menuData = [
  {
    title: "About Us",
    image: "/images/about-us.jpg",
    links: [
      { label: "Welcome Message", href: "https://steppingstones.co.ke/welcome-message/" },
      { label: "Our Story", href: "https://steppingstones.co.ke/our-story/" },
      { label: "Our Leadership", href: "https://steppingstones.co.ke/our-leadership/" },
      { label: "Our Campus", href: "https://steppingstones.co.ke/our-campus/" },
      { label: "Careers", href: "https://steppingstones.co.ke/careers/" },
    ],
  },
  {
    title: "Academics",
    image: "/images/academics.jpg",
    links: [
      { label: "Kindergarten", href: "https://steppingstones.co.ke/kindergarten/" },
      { label: "Lower Primary", href: "https://steppingstones.co.ke/lower-primary/" },
      { label: "Upper Primary", href: "https://steppingstones.co.ke/upper-primary/" },
      { label: "Junior Secondary", href: "https://steppingstones.co.ke/junior-secondary/" },
      { label: "Learning Support", href: "https://steppingstones.co.ke/learning-support/" },
      { label: "Beyond Classroom", href: "https://steppingstones.co.ke/beyond-classroom/" },
    ],
  },
  {
    title: "Admissions",
    image: "/images/admissions.jpg",
    links: [
      { label: "Why Stepping Stones", href: "https://steppingstones.co.ke/why-stepping-stones/" },
      { label: "Admissions Process", href: "https://steppingstones.co.ke/admissions-process/" },
      { label: "Apply Now", href: "https://steppingstones.co.ke/apply-now/" },
      { label: "Fees Structure", href: "https://steppingstones.co.ke/fees-structure/" },
      { label: "Book a Visit", href: "https://steppingstones.co.ke/book-a-visit/" },
    ],
  },
  {
    title: "School Life",
    image: "/images/school-life.jpg",
    links: [
      { label: "Daily Life", href: "https://steppingstones.co.ke/daily-life/" },
      { label: "Co-curricular Programs", href: "https://steppingstones.co.ke/co-curricular-programs/" },
      { label: "Student Development", href: "https://steppingstones.co.ke/student-development/" },
      { label: "Student Well Being", href: "https://steppingstones.co.ke/student-well-being/" },
    ],
  },
  {
    title: "News",
    href: "https://steppingstones.co.ke/news/",
    image: "/images/academics.jpg",
    links: [],
  },
  {
    title: "Events",
    href: "https://steppingstones.co.ke/events/",
    image: "/images/school-life.jpg",
    links: [],
  },
]

const utilLinks = [
  { label: "News", href: "https://steppingstones.co.ke/news/" },
  { label: "Events", href: "https://steppingstones.co.ke/events/" },
  { label: "Careers", href: "https://steppingstones.co.ke/careers/" },
  { label: "Contact", href: "https://steppingstones.co.ke/contact-us/" },
]

const ctaLinks = [
  { label: "Inquire", href: "https://steppingstones.co.ke/contact-us/", icon: Info },
  { label: "Visit", href: "https://steppingstones.co.ke/book-a-visit/", icon: MapPin },
  { label: "Apply", href: "https://steppingstones.co.ke/apply-now/", icon: Send },
]

export default function HeaderEmbed() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [connectorTop, setConnectorTop] = useState(76)

  // Navigate in parent window
  const navigateTo = useCallback((url: string) => {
    if (typeof window !== "undefined" && window.parent !== window) {
      window.parent.postMessage({ type: "navigate", url }, "*")
    } else {
      window.location.href = url
    }
  }, [])

  // Listen for scroll messages from parent
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === "parentScroll") {
        const scrolled = event.data.scrollY > 50
        setIsScrolled(scrolled)
      }
    }
    window.addEventListener("message", handleMessage)
    return () => window.removeEventListener("message", handleMessage)
  }, [])

  // Notify parent when menu opens/closes
  useEffect(() => {
    if (typeof window !== "undefined" && window.parent !== window) {
      window.parent.postMessage({ type: menuOpen ? "menuOpen" : "menuClose" }, "*")
    }
  }, [menuOpen])

  // Update connector position
  const updateConnector = useCallback((index: number) => {
    const navItems = document.querySelectorAll(".nav-item")
    const navCol = document.getElementById("nav-col")
    if (navItems[index] && navCol) {
      const itemRect = navItems[index].getBoundingClientRect()
      const colRect = navCol.getBoundingClientRect()
      setConnectorTop(itemRect.top - colRect.top + 14)
    }
  }, [])

  const handleNavHover = (index: number) => {
    setActiveIndex(index)
    updateConnector(index)
  }

  const handleLinkClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault()
    setMenuOpen(false)
    navigateTo(href)
  }

  return (
    <div className="relative w-full" style={{ background: "transparent" }}>
      {/* Header Bar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? "bg-white/98 backdrop-blur-md shadow-sm" : "bg-transparent"
        }`}
      >
        <div
          className={`max-w-[1400px] mx-auto px-14 flex items-center relative transition-all duration-500 ${
            isScrolled ? "h-20" : "h-40"
          }`}
        >
          {/* Left CTAs */}
          <div className="flex items-center gap-7 flex-1">
            {ctaLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`font-montserrat text-[10px] font-semibold tracking-[0.22em] uppercase relative group ${
                  isScrolled ? "text-[#1a1a2e]" : "text-white/90"
                }`}
              >
                {link.label}
                <span className="absolute bottom-[-2px] left-0 w-0 h-[1.5px] bg-[#c11f1e] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Center Logo */}
          <a
            href="https://steppingstones.co.ke/"
            onClick={(e) => handleLinkClick(e, "https://steppingstones.co.ke/")}
            className={`absolute left-1/2 -translate-x-1/2 transition-all duration-500 ${
              isScrolled ? "top-1/2 -translate-y-1/2" : "top-4"
            }`}
          >
            <div className={`relative transition-all duration-500 ${isScrolled ? "w-[60px] h-[60px]" : "w-[140px] h-[140px]"}`}>
              <Image
                src="/images/logo-white.png"
                alt="Stepping Stones School"
                fill
                className={`object-contain transition-opacity duration-500 ${isScrolled ? "opacity-0" : "opacity-100"}`}
                priority
              />
              <Image
                src="/images/logo-colour.png"
                alt="Stepping Stones School"
                fill
                className={`object-contain transition-opacity duration-500 ${isScrolled ? "opacity-100" : "opacity-0"}`}
                priority
              />
            </div>
          </a>

          {/* Right Menu Button */}
          <div className="flex items-center justify-end gap-3 flex-1">
            <span
              className={`font-montserrat text-[10px] font-semibold tracking-[0.22em] uppercase transition-colors duration-300 ${
                isScrolled ? "text-[#1a1a2e]" : "text-white/90"
              }`}
            >
              Menu
            </span>
            <button
              onClick={() => setMenuOpen(true)}
              className="flex flex-col items-center justify-center gap-[5px] w-10 h-10"
              aria-label="Open menu"
            >
              <span className={`block h-[1.5px] w-6 transition-colors ${isScrolled ? "bg-[#1a1a2e]" : "bg-white"}`} />
              <span className={`block h-[1.5px] w-4 transition-colors ${isScrolled ? "bg-[#1a1a2e]" : "bg-white"}`} />
              <span className={`block h-[1.5px] w-6 transition-colors ${isScrolled ? "bg-[#1a1a2e]" : "bg-white"}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Mega Menu */}
      <div
        className={`fixed inset-0 z-[100] flex transition-opacity duration-400 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Left Image Panel */}
        <div className="relative w-1/2 overflow-hidden hidden md:block">
          {menuData.map((item, i) => (
            <div
              key={item.title}
              className={`absolute inset-0 transition-opacity duration-500 ${i === activeIndex ? "opacity-100" : "opacity-0"}`}
            >
              <Image src={item.image} alt={item.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-black/20" />
            </div>
          ))}
        </div>

        {/* Right Content Panel */}
        <div
          className={`w-full md:w-1/2 h-full bg-white flex flex-col transition-transform duration-500 ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Util Bar */}
          <div className="flex items-center justify-between px-12 py-5 border-b border-gray-100">
            <nav className="hidden md:flex gap-6">
              {utilLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="font-montserrat text-[9px] font-semibold tracking-[0.18em] uppercase text-gray-500 hover:text-gray-900 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <button
              onClick={() => setMenuOpen(false)}
              className="w-12 h-12 rounded-full bg-gray-900 text-white flex items-center justify-center hover:bg-gray-700 transition-colors"
              aria-label="Close menu"
            >
              <X size={18} />
            </button>
          </div>

          {/* Nav Body */}
          <div className="flex flex-1 overflow-hidden">
            {/* Nav Column */}
            <nav id="nav-col" className="w-full md:w-1/2 px-12 py-16 border-r border-gray-100 flex flex-col">
              {menuData.map((item, i) => (
                <div key={item.title}>
                  {item.href ? (
                    <a
                      href={item.href}
                      onClick={(e) => handleLinkClick(e, item.href!)}
                      onMouseEnter={() => handleNavHover(i)}
                      className={`nav-item block font-roxborough text-[clamp(18px,2.5vw,28px)] py-3 relative transition-colors ${
                        activeIndex === i ? "text-[#c11f1e]" : "text-[#1a1a2e] hover:text-[#c11f1e]"
                      }`}
                    >
                      {item.title}
                      <span
                        className={`absolute bottom-0 left-0 h-[2px] bg-[#c11f1e] transition-all duration-300 ${
                          activeIndex === i ? "w-[calc(100%+3rem)]" : "w-0"
                        }`}
                      />
                    </a>
                  ) : (
                    <button
                      onMouseEnter={() => handleNavHover(i)}
                      className={`nav-item block w-full text-left font-roxborough text-[clamp(18px,2.5vw,28px)] py-3 relative transition-colors ${
                        activeIndex === i ? "text-[#c11f1e]" : "text-[#1a1a2e] hover:text-[#c11f1e]"
                      }`}
                    >
                      {item.title}
                      <span
                        className={`absolute bottom-0 left-0 h-[2px] bg-[#c11f1e] transition-all duration-300 ${
                          activeIndex === i ? "w-[calc(100%+3rem)]" : "w-0"
                        }`}
                      />
                    </button>
                  )}
                  {/* Mobile submenu */}
                  <div className={`md:hidden pl-4 flex flex-col gap-1 overflow-hidden transition-all duration-300 ${
                    activeIndex === i && item.links.length > 0 ? "max-h-[500px] py-2" : "max-h-0"
                  }`}>
                    {item.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        onClick={(e) => handleLinkClick(e, link.href)}
                        className="font-montserrat text-sm text-[#c11f1e] py-2 hover:text-gray-900 transition-colors"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </nav>

            {/* Desktop Submenu Column */}
            <div className="hidden md:block w-1/2 pt-16 relative">
              <div
                className="absolute left-0 h-[2px] bg-[#c11f1e] transition-all duration-300"
                style={{ top: connectorTop, width: activeIndex < 4 ? 48 : 0, opacity: activeIndex < 4 ? 1 : 0 }}
              />
              {menuData.slice(0, 4).map((item, i) => (
                <div
                  key={item.title}
                  className={`absolute left-10 top-16 transition-opacity duration-200 ${
                    activeIndex === i ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                  }`}
                >
                  {item.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className={`block font-montserrat text-sm text-gray-500 py-2 pr-10 transition-all duration-200 hover:text-gray-900 ${
                        activeIndex === i ? "translate-x-0" : "translate-x-2"
                      }`}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* CTA Bar */}
          <div className="flex flex-col md:flex-row bg-[#c11f1e]">
            {ctaLinks.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`flex-1 flex items-center justify-center gap-2 py-5 text-white font-montserrat text-[10px] font-bold tracking-[0.2em] uppercase transition-colors hover:bg-white/10 ${
                  i < ctaLinks.length - 1 ? "border-r border-white/20 md:border-r md:border-b-0 border-b" : ""
                }`}
              >
                <link.icon size={18} strokeWidth={1.5} />
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
