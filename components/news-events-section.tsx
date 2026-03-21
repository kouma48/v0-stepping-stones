'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Clock, ArrowRight } from 'lucide-react'

const FEATURED_NEWS = [
  {
    id: 1,
    title: 'The Nexus of Greatness',
    author: 'Jennifer Kepley, Latin Instructor',
    date: 'Feb 26 2026',
    excerpt:
      "This year has been a defining moment for Stepping Stones' seventh- and eighth-grade students. They have shaped the future of the campus by being the first to attend independently of both the elementary and secondary campuses.",
    image: '/images/news-feature-1.jpg',
  },
  {
    id: 2,
    title: 'Science Fair Excellence',
    author: 'Dr. Michael Ouma, Science Department',
    date: 'Mar 15 2026',
    excerpt:
      'Our annual Science Fair showcased remarkable innovation from students across all year groups. From renewable energy projects to biological research, our young scientists demonstrated exceptional creativity and scientific rigor.',
    image: '/images/news-feature-2.jpg',
  },
  {
    id: 3,
    title: 'Drama Production Success',
    author: 'Sarah Wanjiru, Performing Arts',
    date: 'Mar 20 2026',
    excerpt:
      "The spring theatrical production of 'A Midsummer Night's Dream' captivated audiences with stunning performances, elaborate costumes, and creative staging. Our students brought Shakespeare's comedy to life with remarkable talent.",
    image: '/images/news-feature-3.jpg',
  },
]

const UPCOMING_EVENTS = [
  {
    date: '23',
    month: 'March',
    title: 'Fourth Quarter Begins',
    time: 'all day',
  },
  {
    date: '25',
    month: 'March',
    title: 'National Honor Society Induction Ceremony',
    time: '6:30 PM - 8:30 PM',
  },
  {
    date: '26',
    month: 'March',
    title: 'Board of Directors Meeting',
    time: '6:00 PM - 9:00 PM',
  },
]

export default function NewsEventsSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [hoveredSlide, setHoveredSlide] = useState<number | null>(null)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % FEATURED_NEWS.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + FEATURED_NEWS.length) % FEATURED_NEWS.length)
  }

  return (
    <section
      className="relative py-20 md:py-24 overflow-hidden"
      style={{ background: '#0F2C4C' }}
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        {/* Three red stars decoration */}
        <div className="flex justify-center gap-6 mb-8">
          {[1, 2, 3].map((i) => (
            <svg
              key={i}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="opacity-90"
            >
              <path
                d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                fill="#c11f1e"
              />
            </svg>
          ))}
        </div>

        {/* Section heading */}
        <h2 className="font-serif text-[clamp(2.5rem,5vw,4rem)] text-white text-center mb-16 leading-tight">
          What's On & What's New
        </h2>

        <div className="grid lg:grid-cols-[1fr_500px] gap-12 lg:gap-16 items-start">
          {/* Left: Featured News Carousel */}
          <div className="relative">
            {/* Vertical "FEATURED NEWS" label */}
            <div
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 hidden xl:block"
              style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
            >
              <span
                className="font-sans text-xs tracking-[0.3em] uppercase"
                style={{ color: 'rgba(255,255,255,0.5)' }}
              >
                FEATURED NEWS
              </span>
            </div>

            {/* Carousel container */}
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden">
              {FEATURED_NEWS.map((article, index) => (
                <div
                  key={article.id}
                  className={`absolute inset-0 transition-opacity duration-700 ${
                    index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}
                  onMouseEnter={() => setHoveredSlide(index)}
                  onMouseLeave={() => setHoveredSlide(null)}
                >
                  {/* Image */}
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 60vw, 90vw"
                  />

                  {/* Default overlay - title at bottom */}
                  <div
                    className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-8 transition-opacity duration-300 ${
                      hoveredSlide === index ? 'opacity-0' : 'opacity-100'
                    }`}
                  >
                    <h3 className="font-serif text-3xl md:text-4xl text-white">{article.title}</h3>
                  </div>

                  {/* Hover overlay - darker red with vignette */}
                  <div
                    className={`absolute inset-0 flex flex-col justify-center px-10 md:px-16 py-12 transition-all duration-500 ${
                      hoveredSlide === index
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-8 pointer-events-none'
                    }`}
                    style={{ 
                      background: 'linear-gradient(135deg, rgba(153, 25, 24, 0.96) 0%, rgba(193, 31, 30, 0.96) 100%)'
                    }}
                  >
                    <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white mb-4 leading-tight">
                      {article.title}
                    </h3>
                    <p className="font-sans text-sm text-white/80 mb-2">{article.author}</p>
                    <p className="font-sans text-sm text-white/70 mb-6">{article.date}</p>
                    <p className="font-sans text-base md:text-lg text-white leading-relaxed mb-8 max-w-2xl">
                      {article.excerpt}
                    </p>
                    <a
                      href="#"
                      className="inline-flex items-center gap-2 font-sans text-sm tracking-widest uppercase text-white hover:gap-3 transition-all"
                    >
                      READ MORE <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}

              {/* Navigation arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-colors"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-colors"
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Carousel dots and arrows */}
            <div className="flex justify-between items-center mt-6">
              <div className="flex gap-2">
                {FEATURED_NEWS.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentSlide
                        ? 'bg-white w-8'
                        : 'bg-white/30 hover:bg-white/50'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              {/* Arrow navigation */}
              <div className="flex gap-3">
                <button
                  onClick={prevSlide}
                  className="w-10 h-10 flex items-center justify-center border border-white/30 hover:bg-white/10 rounded-sm transition-colors"
                  aria-label="Previous article"
                >
                  <ChevronLeft className="w-5 h-5 text-white/80" />
                </button>
                <button
                  onClick={nextSlide}
                  className="w-10 h-10 flex items-center justify-center border border-white/30 hover:bg-white/10 rounded-sm transition-colors"
                  aria-label="Next article"
                >
                  <ChevronRight className="w-5 h-5 text-white/80" />
                </button>
              </div>
            </div>
          </div>

          {/* Right: Upcoming Events */}
          <div className="flex flex-col">
            <div className="space-y-8">
              {UPCOMING_EVENTS.map((event, index) => (
                <div key={index}>
                  <div className="flex items-start gap-6 group cursor-pointer">
                    {/* Date */}
                    <div className="flex-shrink-0 text-center">
                      <div
                        className="font-serif text-7xl leading-none mb-2 transition-colors"
                        style={{ color: 'rgba(255,255,255,0.85)' }}
                      >
                        {event.date}
                      </div>
                      <div
                        className="font-sans text-sm uppercase tracking-wider"
                        style={{ color: 'rgba(255,255,255,0.5)' }}
                      >
                        {event.month}
                      </div>
                    </div>

                    {/* Event details */}
                    <div className="flex-1 pt-3">
                      <h3 className="font-serif text-xl md:text-2xl text-white mb-3 leading-snug group-hover:text-white/80 transition-colors">
                        {event.title}
                      </h3>
                      <div className="flex items-center gap-2 mb-4">
                        <Clock className="w-4 h-4" style={{ color: 'rgba(255,255,255,0.6)' }} />
                        <span
                          className="font-sans text-sm"
                          style={{ color: 'rgba(255,255,255,0.7)' }}
                        >
                          {event.time}
                        </span>
                      </div>
                      <a
                        href="#"
                        className="inline-flex items-center gap-2 font-sans text-xs tracking-widest uppercase group-hover:gap-3 transition-all"
                        style={{ color: 'rgba(255,255,255,0.9)' }}
                      >
                        READ MORE <ArrowRight className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                  {/* Dotted separator */}
                  {index < UPCOMING_EVENTS.length - 1 && (
                    <div
                      className="mt-8 border-b border-dotted"
                      style={{ borderColor: 'rgba(255,255,255,0.2)' }}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Bottom buttons */}
            <div className="flex gap-4 mt-12 pt-8">
              <a
                href="#"
                className="flex-1 px-6 py-3 text-center font-sans text-xs tracking-widest uppercase text-white border border-white/30 hover:bg-white/10 transition-colors rounded-sm"
              >
                MORE NEWS
              </a>
              <a
                href="#"
                className="flex-1 px-6 py-3 text-center font-sans text-xs tracking-widest uppercase text-white border border-white/30 hover:bg-white/10 transition-colors rounded-sm"
              >
                FULL CALENDAR
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
