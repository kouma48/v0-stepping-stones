'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

interface TabContent {
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

const TABS: TabContent[] = [
  {
    id: 'athletics',
    label: 'Sports & Athletics',
    eyebrow: 'SPORTS & ATHLETICS',
    title: 'Champions in Body and Spirit',
    boldIntro: 'Excellence starts on the field.',
    description:
      'Through competitive sport, Stepping Stones students build resilience, teamwork, and the lifelong discipline that defines great character.',
    ctaText: 'View Programmes',
    ctaHref: '#sports',
    image: '/images/beyond-athletics-main.jpg',
    imageAlt: 'Students competing in athletics',
  },
  {
    id: 'arts',
    label: 'Performing Arts',
    eyebrow: 'PERFORMING ARTS',
    title: 'Creative Minds, Bold Voices',
    boldIntro: 'Artistry begins with courage.',
    description:
      'Through music, drama, and dance, Stepping Stones students discover their unique creative voice and learn the power of passionate self-expression.',
    ctaText: 'View Programmes',
    ctaHref: '#arts',
    image: '/images/beyond-arts-main.jpg',
    imageAlt: 'Students performing on stage',
  },
  {
    id: 'pastoral',
    label: 'Pastoral Care',
    eyebrow: 'PASTORAL CARE',
    title: 'Principled Hearts, Guided Growth',
    boldIntro: 'Character is cultivated with care.',
    description:
      'Our pastoral team nurtures emotional well-being and moral character, ensuring every child feels deeply valued, safe, and supported throughout their journey.',
    ctaText: 'View Programmes',
    ctaHref: '#pastoral',
    image: '/images/beyond-pastoral-main.jpg',
    imageAlt: 'Teacher mentoring a student',
  },
  {
    id: 'development',
    label: 'Student Development',
    eyebrow: 'STUDENT DEVELOPMENT',
    title: 'Leaders for Tomorrow',
    boldIntro: 'Change begins with vision.',
    description:
      'Through leadership clubs, life skills training, and global engagement, Stepping Stones equips students with the tools to make a profound impact in the world.',
    ctaText: 'View Programmes',
    ctaHref: '#development',
    image: '/images/beyond-development-main.jpg',
    imageAlt: 'Students in cultural event',
  },
  {
    id: 'service',
    label: 'Community Service',
    eyebrow: 'COMMUNITY SERVICE',
    title: 'Compassion in Action',
    boldIntro: 'Service shapes leaders.',
    description:
      'Putting empathy into action, our students engage in meaningful community service that builds character and creates lasting positive impact beyond the school gates.',
    ctaText: 'View Programmes',
    ctaHref: '#service',
    image: '/images/beyond-service-main.jpg',
    imageAlt: 'Students engaged in community service',
  },
]

export default function BeyondClassroomSection() {
  const [activeTab, setActiveTab] = useState('athletics')
  const [animating, setAnimating] = useState(false)

  const activeContent = TABS.find((t) => t.id === activeTab) || TABS[0]

  function handleTabChange(id: string) {
    if (id === activeTab) return
    setAnimating(true)
    setTimeout(() => {
      setActiveTab(id)
      setAnimating(false)
    }, 320)
  }

  return (
    <section className="py-20 md:py-28 overflow-hidden" style={{ background: '#f8f9fa' }}>
      {/* Header */}
      <div className="text-center mb-14 px-6">
        <p
          className="font-sans text-[11px] font-semibold tracking-[0.3em] uppercase mb-5"
          style={{ color: 'var(--color-accent-red)' }}
        >
          Life at Stepping Stones
        </p>
        <h2
          className="font-serif text-[clamp(2.8rem,6vw,5rem)] leading-[1.08] tracking-tight text-balance"
          style={{ color: 'var(--color-school-heading)' }}
        >
          A{' '}
          <em
            className="not-italic font-serif italic"
            style={{ color: 'var(--color-accent-red)' }}
          >
            well-balanced
          </em>{' '}
          experience
        </h2>
        <p
          className="font-serif italic text-[clamp(1rem,2vw,1.25rem)] mt-4 text-balance"
          style={{ color: 'var(--color-school-heading)', opacity: 0.65 }}
        >
          Where every child is known, valued and inspired
        </p>
      </div>

      {/* Main Split Panel */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div
          className="grid lg:grid-cols-[1fr_420px] overflow-hidden"
          style={{ minHeight: '520px' }}
        >
          {/* Left: Single Image */}
          <div className="relative bg-neutral-900 overflow-hidden" style={{ minHeight: '460px' }}>
            <div
              key={activeContent.id}
              style={{
                position: 'absolute',
                inset: 0,
                opacity: animating ? 0 : 1,
                transform: animating ? 'scale(1.03)' : 'scale(1)',
                transition: 'opacity 0.4s ease, transform 0.7s ease',
              }}
            >
              <Image
                src={activeContent.image}
                alt={activeContent.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
              {/* Subtle vignette */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(to top, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.05) 50%, transparent 100%)',
                }}
              />
            </div>

            {/* Play Button - Removed */}
            <div className="absolute inset-0" />
          </div>

          {/* Right: Red Content Card */}
          <div
            key={`card-${activeContent.id}`}
            className="flex flex-col justify-between p-10 md:p-12 lg:p-14"
            style={{
              background: 'var(--color-accent-red)',
              opacity: animating ? 0 : 1,
              transform: animating ? 'translateX(12px)' : 'translateX(0)',
              transition: 'opacity 0.4s ease, transform 0.4s ease',
            }}
          >
            <div>
              {/* Eyebrow */}
              <div className="mb-7">
                <span
                  className="font-sans font-semibold text-white/80 tracking-[0.22em] uppercase block mb-3"
                  style={{ fontSize: '10px' }}
                >
                  {activeContent.eyebrow}
                </span>
                <div className="w-10 h-[2px] bg-white/50" />
              </div>

              {/* Title */}
              <h3
                className="font-serif text-white leading-[1.15] mb-7"
                style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)' }}
              >
                {activeContent.title}
              </h3>

              {/* Bold intro */}
              <p
                className="font-sans font-bold text-white leading-snug mb-4"
                style={{ fontSize: '0.95rem', letterSpacing: '0.01em' }}
              >
                {activeContent.boldIntro.toUpperCase()}
              </p>

              {/* Body */}
              <p
                className="font-sans text-white/90 leading-relaxed"
                style={{ fontSize: '0.97rem' }}
              >
                {activeContent.description}
              </p>
            </div>

            {/* CTA */}
            <a
              href={activeContent.ctaHref}
              className="inline-flex items-center gap-3 text-white font-sans font-bold tracking-[0.18em] uppercase mt-10 group"
              style={{ fontSize: '11px', borderTop: '1px solid rgba(255,255,255,0.3)', paddingTop: '1.5rem' }}
            >
              <span>{activeContent.ctaText}</span>
              <ArrowRight
                size={16}
                style={{ transition: 'transform 0.3s' }}
                className="group-hover:translate-x-1"
              />
            </a>
          </div>
        </div>

        {/* Tab Bar */}
        <div
          className="flex items-stretch"
          style={{ borderTop: '1px solid #e5e5e5' }}
        >
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id
            return (
              <div
                key={tab.id}
                role="button"
                tabIndex={0}
                onClick={() => handleTabChange(tab.id)}
                onKeyDown={(e) => e.key === 'Enter' && handleTabChange(tab.id)}
                className="flex-1 flex items-center justify-center py-6 cursor-pointer relative transition-colors duration-300"
                style={{
                  borderRight: '1px solid #e5e5e5',
                  background: isActive ? '#fafafa' : 'white',
                }}
              >
                <span
                  className="font-sans font-semibold tracking-[0.16em] uppercase text-center leading-tight"
                  style={{
                    fontSize: '10.5px',
                    color: isActive
                      ? 'var(--color-accent-red)'
                      : 'var(--color-school-heading)',
                    transition: 'color 0.3s',
                  }}
                >
                  {tab.label}
                </span>
                {isActive && (
                  <div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px]"
                    style={{
                      background: 'var(--color-accent-red)',
                      width: '2.5rem',
                    }}
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
