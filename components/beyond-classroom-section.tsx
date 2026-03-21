'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ArrowRight, Shield, Music, Heart, Globe, HandHeart } from 'lucide-react'

interface TabContent {
  id: string
  label: string
  icon: typeof Shield
  title: string
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
    title: 'Sports & Athletics',
    description:
      'Building physical vitality, resilience, and the power of teamwork. Whether on the court or the track, we teach our students how to push their limits and lead with sportsmanship.',
    ctaText: 'EXPLORE SPORTS',
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
    title: 'Performing Arts',
    description:
      'Fostering bold creativity and self-confidence. Through music, drama, and dance, students find their voice and learn the art of passionate self-expression on stage.',
    ctaText: 'EXPLORE ARTS',
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
    title: 'Pastoral Care',
    description:
      'Nurturing principled hearts. We prioritize emotional well-being, spiritual grounding, and moral character, ensuring every child feels deeply known, valued, and supported.',
    ctaText: 'OUR CARE APPROACH',
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
    title: 'Student Development',
    description:
      'Empowering the changemakers of tomorrow. Through leadership clubs, life skills training, and global engagement like Model UN, we equip students to make a profound impact.',
    ctaText: 'DISCOVER PROGRAMS',
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
    title: 'Community Service',
    description:
      'Putting empathy into action. We teach our students that true leadership is rooted in service, giving them practical ways to build strong character and make a lasting, positive impact in their community.',
    ctaText: 'SEE OUR IMPACT',
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
    <section className="py-20 md:py-32 bg-light-gray">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-serif text-[clamp(2.2rem,5vw,4rem)] leading-tight tracking-tight text-school-heading text-balance">
            A{' '}
            <em className="text-accent-red" style={{ fontStyle: 'italic' }}>
              well-balanced
            </em>{' '}
            experience
          </h2>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-12 border-b border-school-divider pb-4">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`font-sans text-sm md:text-base font-medium tracking-wide transition-all duration-300 pb-3 relative ${
                activeTab === tab.id
                  ? 'text-accent-red'
                  : 'text-school-heading hover:text-accent-red'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-red transition-all duration-300" />
              )}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left: Images */}
          <div className="relative h-[500px] md:h-[600px]">
            {/* Main Image */}
            <div
              key={`main-${activeContent.id}`}
              className="absolute inset-0 animate-in fade-in duration-700"
            >
              <Image
                src={activeContent.mainImage}
                alt={activeContent.mainImageAlt}
                fill
                className="object-cover rounded-sm"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Inset Image */}
            <div
              key={`inset-${activeContent.id}`}
              className="absolute bottom-6 left-6 w-52 h-52 md:w-64 md:h-64 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150"
            >
              <Image
                src={activeContent.insetImage}
                alt={activeContent.insetImageAlt}
                fill
                className="object-cover rounded-sm"
                sizes="256px"
              />
            </div>
          </div>

          {/* Right: Content Card */}
          <div
            key={`content-${activeContent.id}`}
            className="bg-accent-red text-white p-10 md:p-12 animate-in fade-in slide-in-from-right-4 duration-700"
          >
            <div className="mb-6">
              <Icon size={48} strokeWidth={1.5} className="text-white/90" />
            </div>

            <h3 className="font-serif text-3xl md:text-4xl mb-6 leading-tight">
              {activeContent.title}
            </h3>

            <p className="font-sans text-base md:text-lg leading-relaxed mb-8 text-white/95">
              {activeContent.description}
            </p>

            <a
              href={activeContent.ctaHref}
              className="inline-flex items-center gap-2 font-sans text-sm font-semibold tracking-widest uppercase border-b-2 border-white pb-1 hover:gap-3 transition-all duration-300"
            >
              {activeContent.ctaText}
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
