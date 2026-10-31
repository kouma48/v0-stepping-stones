'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { ArrowRight, Settings } from 'lucide-react'
import { BeyondClassroomEditorPortals, type BeyondTab } from './beyond-classroom-editor'

interface TabContent extends BeyondTab {}

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
    ctaHref: 'https://steppingstones.co.ke/co-curricular-programs/',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image.png-T2vXCgMWEqFoHrCwdn6yp63OQ6Nxz1.jpeg',
    imageAlt: 'Titans sports team with trophy celebrating championship victory',
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
    ctaHref: 'https://steppingstones.co.ke/co-curricular-programs/',
    image: '/images/beyond-arts-main.jpg',
    imageAlt: 'Students with musical instruments in music room',
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
    ctaHref: 'https://steppingstones.co.ke/student-well-being/',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pastoralcare-tqeY9xkpNTOMKsJE1hzesl7RAWA8J2.jpg',
    imageAlt: 'Teacher nurturing young students in a collaborative learning environment',
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
    ctaHref: 'https://steppingstones.co.ke/student-development/',
    image: '/images/student-development.jpg',
    imageAlt: 'Students collaborating and studying together on campus',
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
    ctaHref: 'https://steppingstones.co.ke/student-development/',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5-wYaub8zVt5FfImG18OowA07AeFVVo1.jpg',
    imageAlt: 'Stepping Stones students and community members distributing donations and supplies',
  },
]

export default function BeyondClassroomSection() {
  const [tabs, setTabs] = useState<TabContent[]>(TABS)
  const [activeTab, setActiveTab] = useState('athletics')
  const [animating, setAnimating] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)
  // CMS state
  const [isAdmin, setIsAdmin] = useState(false)
  const [pinModalOpen, setPinModalOpen] = useState(false)
  const [editorOpen, setEditorOpen] = useState(false)
  const triggerClickCount = useRef(0)
  const triggerTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Mark as hydrated immediately on mount for instant interactivity
  useEffect(() => {
    setIsHydrated(true)
  }, [])

  const activeContent = tabs.find((t) => t.id === activeTab) || tabs[0]

  function handleTabChange(id: string) {
    if (id === activeTab || !isHydrated) return
    setAnimating(true)
    // Reduced timeout for snappier response
    setTimeout(() => {
      setActiveTab(id)
      setAnimating(false)
    }, 200)
  }

  function handleAdminTrigger() {
    triggerClickCount.current += 1
    if (triggerTimer.current) clearTimeout(triggerTimer.current)
    triggerTimer.current = setTimeout(() => { triggerClickCount.current = 0 }, 600)
    if (triggerClickCount.current >= 3) {
      triggerClickCount.current = 0
      if (isAdmin) setEditorOpen(true)
      else setPinModalOpen(true)
    }
  }

  return (
    <section className="overflow-hidden bg-[#fbfaf7] py-16 text-[#0d1e31] md:py-20">
      {/* Header */}
      <div className="relative mx-auto mb-10 max-w-[1500px] px-6 md:mb-12 md:px-12">
        <p
          className="font-sans text-[11px] font-semibold tracking-[0.3em] uppercase mb-5"
          style={{ color: 'var(--color-accent-red)' }}
        >
          Life at Stepping Stones
        </p>
        <h2
          className="max-w-[1300px] font-serif text-[clamp(3.2rem,7vw,6.8rem)] leading-[0.92] tracking-[-0.045em] text-balance"
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

        {/* Admin trigger — triple-click to unlock */}
        <button
          onClick={handleAdminTrigger}
          className="absolute top-0 right-6 font-sans text-[10px] tracking-widest uppercase px-3 py-1.5 border border-dashed border-school-divider text-school-subtle/50 hover:text-school-subtle hover:border-school-divider transition-colors"
          aria-label="Admin trigger"
        >
          Edit Section
        </button>

        {/* Gear icon after PIN unlock */}
        {isAdmin && (
          <button
            onClick={() => setEditorOpen(true)}
            aria-label="Edit section"
            className="absolute top-0 right-6 inline-flex items-center gap-2 font-sans text-[10px] font-semibold tracking-widest uppercase px-3 py-1.5 border border-school-heading text-school-heading hover:bg-school-heading hover:text-white transition-colors"
          >
            <Settings size={12} />
            Edit Section
          </button>
        )}
      </div>

      {/* Main Split Panel */}
      <div className="mx-auto grid max-w-[1500px] gap-6 px-6 md:px-12 lg:grid-cols-[145px_minmax(0,1fr)_minmax(380px,0.72fr)] lg:gap-0">
        <nav className="flex gap-4 overflow-x-auto pb-5 lg:block lg:overflow-visible lg:pb-0 lg:pt-1" aria-label="Life at Stepping Stones programmes">
          {tabs.map((tab, index) => {
            const isActive = activeTab === tab.id
            return (
              <button key={tab.id} type="button" onClick={() => handleTabChange(tab.id)} onKeyDown={(e) => e.key === 'Enter' && handleTabChange(tab.id)} className="group relative flex min-w-[125px] items-center gap-3 border-b-2 border-[#d1d5db] pb-3 text-left lg:min-w-0 lg:w-full lg:gap-4 lg:border-b-0 lg:border-l-2 lg:pb-8 lg:pl-5 lg:pt-1">
                <span className={`font-serif text-3xl leading-none ${isActive ? 'text-[#e21d2b]' : 'text-[#56606d]'}`}>{String(index + 1).padStart(2, '0')}</span>
                <span className={`font-sans text-[10px] font-semibold uppercase leading-snug tracking-[0.16em] ${isActive ? 'text-[#e21d2b]' : 'text-[#56606d]'}`}>{tab.label}</span>
                {isActive && <span className="absolute -left-[7px] top-4 h-3 w-3 rounded-full border-2 border-[#fbfaf7] bg-[#e21d2b] lg:left-[-7px]" />}
              </button>
            )
          })}
        </nav>

        {/* Content Grid - Image and Card */}
        <div className="grid overflow-hidden lg:grid-cols-[minmax(0,1fr)_minmax(380px,0.72fr)] lg:col-span-2" style={{ minHeight: '610px' }}>
          {/* Left: Image */}
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
                crossOrigin="anonymous"
                loading="lazy"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to top, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.05) 50%, transparent 100%)',
                }}
              />
            </div>
          </div>

          {/* Right: Content Card */}
          <div
            key={`card-${activeContent.id}`}
            className="flex flex-col justify-between p-10 md:p-12 lg:p-14"
            style={{
              background: '#0b2238',
              opacity: animating ? 0 : 1,
              transform: animating ? 'translateX(12px)' : 'translateX(0)',
              transition: 'opacity 0.4s ease, transform 0.4s ease',
            }}
          >
            <div>
              <div className="mb-7">
                <span
                  className="font-sans font-semibold text-white/80 tracking-[0.22em] uppercase block mb-3"
                  style={{ fontSize: '10px' }}
                >
                  {activeContent.eyebrow}
                </span>
                <div className="w-10 h-[2px] bg-white/50" />
              </div>

              <h3
                className="font-serif text-white leading-[1.15] mb-7"
                style={{ fontSize: 'clamp(2.4rem, 4vw, 4rem)' }}
              >
                {activeContent.title}
              </h3>

              <p
                className="font-sans text-white/90 leading-relaxed"
                style={{ fontSize: '0.97rem' }}
              >
                {activeContent.description}
              </p>
            </div>

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
      </div>

      {/* CMS Editor Portals */}
      <BeyondClassroomEditorPortals
        tabs={tabs}
        editorOpen={editorOpen}
        pinModalOpen={pinModalOpen}
        onEditorClose={() => setEditorOpen(false)}
        onPinSuccess={() => { setPinModalOpen(false); setIsAdmin(true); setEditorOpen(true) }}
        onPinClose={() => setPinModalOpen(false)}
        onTabsChange={setTabs}
      />
    </section>
  )
}
