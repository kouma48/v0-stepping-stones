'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ArrowRight, Shield, Music, Heart, Globe, HandHeart, Play } from 'lucide-react'

interface TabContent {
  id: string
  label: string
  icon: typeof Shield
  eyebrow: string
  title: string
  boldIntro: string
  description: string
  ctaText: string
  ctaHref: string
  mainImage: string
  insetImage: string
  mainImageAlt: string
  insetImageAlt: string
}

const TABS: TabContent[] = [
  {
    id: 'athletics',
    label: 'Sports & Athletics',
    icon: Shield,
    eyebrow: 'SPORTS & ATHLETICS',
    title: 'Champions in Body and Spirit',
    boldIntro: 'Excellence starts on the field.',
    description:
      "For Stepping Stones School's athletes, adopting the discipline of sport builds resilience, teamwork, and lifelong character.",
    ctaText: 'Explore our sports programmes',
    ctaHref: '#sports',
    mainImage: '/images/beyond-athletics-main.jpg',
    insetImage: '/images/beyond-athletics-inset.jpg',
    mainImageAlt: 'Students playing basketball',
    insetImageAlt: 'Student running on track',
  },
  {
    id: 'arts',
    label: 'Performing Arts',
    icon: Music,
    eyebrow: 'PERFORMING ARTS',
    title: 'Creative Minds, Bold Voices',
    boldIntro: 'Artistry begins with courage.',
    description:
      "Through music, drama, and dance, Stepping Stones students discover their unique creative voice and learn the power of passionate expression.",
    ctaText: 'Discover our arts programmes',
    ctaHref: '#arts',
    mainImage: '/images/beyond-arts-main.jpg',
    insetImage: '/images/beyond-arts-inset.jpg',
    mainImageAlt: 'Dance performance on stage',
    insetImageAlt: 'Student playing violin',
  },
  {
    id: 'pastoral',
    label: 'Pastoral Care',
    icon: Heart,
    eyebrow: 'PASTORAL CARE',
    title: 'Principled Hearts, Guided Growth',
    boldIntro: 'Character is cultivated with care.',
    description:
      "For Stepping Stones School's pastoral team, nurturing emotional well-being and moral character ensures every child feels deeply valued and supported.",
    ctaText: 'Learn about our care approach',
    ctaHref: '#pastoral',
    mainImage: '/images/beyond-pastoral-main.jpg',
    insetImage: '/images/beyond-pastoral-inset.jpg',
    mainImageAlt: 'Teacher mentoring student',
    insetImageAlt: 'Students laughing together',
  },
  {
    id: 'development',
    label: 'Student Development',
    icon: Globe,
    eyebrow: 'STUDENT DEVELOPMENT',
    title: 'Leaders for Tomorrow',
    boldIntro: 'Change begins with vision.',
    description:
      "Through leadership clubs, life skills training, and global engagement, Stepping Stones equips students with the tools to make a profound impact in the world.",
    ctaText: 'View development programmes',
    ctaHref: '#development',
    mainImage: '/images/beyond-development-main.jpg',
    insetImage: '/images/beyond-development-inset.jpg',
    mainImageAlt: 'Students in cultural attire',
    insetImageAlt: 'Student at Model UN podium',
  },
  {
    id: 'service',
    label: 'Community Service',
    icon: HandHeart,
    eyebrow: 'COMMUNITY SERVICE',
    title: 'Compassion in Action',
    boldIntro: 'Service shapes leaders.',
    description:
      "For Stepping Stones students, putting empathy into action through community service builds character and creates lasting positive impact.",
    ctaText: 'See our community impact',
    ctaHref: '#service',
    mainImage: '/images/beyond-service-main.jpg',
    insetImage: '/images/beyond-service-inset.jpg',
    mainImageAlt: 'Students planting trees',
    insetImageAlt: 'Student at community drive',
  },
]

export default function BeyondClassroomSection() {
  const [activeTab, setActiveTab] = useState('athletics')
  const activeContent = TABS.find((tab) => tab.id === activeTab) || TABS[0]
  const Icon = activeContent.icon

  return (
    <section className="relative py-24 md:py-32 bg-white overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="font-serif text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[1.1] tracking-tight text-school-heading text-balance">
            A{' '}
            <em className="text-accent-red not-italic font-serif">
              well-balanced
            </em>{' '}
            experience
          </h2>
        </div>

        {/* Split Layout */}
        <div className="grid lg:grid-cols-[1fr_550px] gap-0 items-stretch min-h-[700px]">
          {/* Left: Image Area */}
          <div className="relative bg-neutral-900 overflow-hidden">
            {/* Main Background Image */}
            <div
              key={`main-${activeContent.id}`}
              className="absolute inset-0 animate-in fade-in duration-1000"
            >
              <Image
                src={activeContent.mainImage}
                alt={activeContent.mainImageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
              {/* Dark overlay for contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
            </div>

            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                className="group flex items-center gap-4 bg-black/70 hover:bg-accent-red text-white px-8 py-4 transition-all duration-500 hover:px-10"
                aria-label="Play video"
              >
                <span className="font-sans text-sm font-medium tracking-[0.2em] uppercase">
                  Play Full Video
                </span>
                <div className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-white group-hover:border-white/90 transition-all">
                  <Play size={20} fill="white" className="ml-0.5" />
                </div>
              </button>
            </div>

            {/* Inset Image - Bottom Left */}
            <div
              key={`inset-${activeContent.id}`}
              className="absolute bottom-8 left-8 w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 shadow-2xl animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300"
            >
              <Image
                src={activeContent.insetImage}
                alt={activeContent.insetImageAlt}
                fill
                className="object-cover"
                sizes="256px"
              />
            </div>
          </div>

          {/* Right: Content Card */}
          <div
            key={`content-${activeContent.id}`}
            className="bg-accent-red text-white p-10 md:p-12 lg:p-16 flex flex-col justify-center animate-in fade-in slide-in-from-right-8 duration-1000"
          >
            {/* Eyebrow */}
            <div className="mb-6">
              <span className="font-sans text-xs font-bold tracking-[0.25em] uppercase text-white/90">
                {activeContent.eyebrow}
              </span>
              <div className="w-12 h-[2px] bg-white mt-4" />
            </div>

            {/* Title */}
            <h3 className="font-serif text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.15] mb-8 tracking-tight">
              {activeContent.title}
            </h3>

            {/* Bold Intro */}
            <p className="font-sans text-lg md:text-xl font-semibold leading-relaxed mb-4">
              {activeContent.boldIntro}
            </p>

            {/* Description */}
            <p className="font-sans text-base md:text-lg leading-relaxed mb-10 text-white/95">
              {activeContent.description}
            </p>

            {/* CTA Link */}
            <a
              href={activeContent.ctaHref}
              className="inline-flex items-center gap-3 font-sans text-xs font-bold tracking-[0.2em] uppercase hover:gap-4 transition-all duration-300 group"
            >
              <span>{activeContent.ctaText}</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

        {/* Bottom Tab Navigation */}
        <div className="mt-0 bg-white border-t border-school-divider">
          <div className="flex flex-wrap justify-center lg:justify-between items-center gap-6 md:gap-8 lg:gap-12 py-6 px-6 md:px-8">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`font-sans text-xs md:text-sm font-bold tracking-[0.15em] uppercase transition-all duration-300 relative ${
                  activeTab === tab.id
                    ? 'text-accent-red'
                    : 'text-school-heading hover:text-accent-red'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <span className="absolute -bottom-6 left-0 right-0 h-1 bg-accent-red" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
