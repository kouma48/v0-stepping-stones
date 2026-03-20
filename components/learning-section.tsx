'use client'

import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { useRef } from 'react'

const STAGES = [
  {
    label: 'Pre-Prep',
    ages: 'Ages 3–6',
    image: '/images/learning-preprep.jpg',
    alt: 'Young children doing hands-on outdoor learning activity',
    description:
      'A nurturing environment where curiosity is sparked through play, exploration and discovery.',
    href: '#pre-prep',
  },
  {
    label: 'Prep School',
    ages: 'Ages 6–13',
    image: '/images/learning-prep.jpg',
    alt: 'Primary school children engaged in classroom discussion',
    description:
      'Building confidence, character and academic foundations through rich, engaging learning.',
    href: '#prep',
  },
  {
    label: 'Senior School',
    ages: 'Ages 13–16',
    image: '/images/learning-senior.jpg',
    alt: 'Senior school student working on whiteboard',
    description:
      'Deepening knowledge and developing independent thinkers ready for the wider world.',
    href: '#senior',
  },
  {
    label: 'Sixth Form',
    ages: 'Ages 16–18',
    image: '/images/learning-sixthform.jpg',
    alt: 'Sixth form students reviewing work together in library',
    description:
      'Where ambition meets opportunity — preparing students for top universities and beyond.',
    href: '#sixth-form',
  },
]

export default function LearningSection() {
  return (
    <section className="bg-background py-20 md:py-28 px-6 md:px-12 lg:px-20">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14 reveal-on-scroll">
          <p className="font-sans text-xs font-semibold tracking-[0.2em] uppercase text-accent-red mb-4">
            Learning at Stepping Stones
          </p>
          <h2 className="font-serif text-[clamp(2rem,4vw,3.2rem)] leading-[1.1] text-school-heading text-balance max-w-3xl mx-auto">
            Where principled hearts and brilliant minds take shape.
          </h2>
          {/* Rule */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <span className="h-px w-16 bg-school-divider" />
            <span className="w-1.5 h-1.5 rounded-full bg-accent-red" />
            <span className="h-px w-16 bg-school-divider" />
          </div>
        </div>

        {/* Eyebrow for grid */}
        <p className="font-serif text-[1.6rem] text-school-heading text-center mb-10">
          Our main entry points
        </p>

        {/* 4-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STAGES.map((stage) => (
            <StageCard key={stage.label} stage={stage} />
          ))}
        </div>
      </div>
    </section>
  )
}

function StageCard({ stage }: { stage: (typeof STAGES)[number] }) {
  return (
    <a
      href={stage.href}
      className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-red"
      aria-label={`${stage.label} — ${stage.ages}`}
    >
      {/* Image container */}
      <div className="relative overflow-hidden aspect-[3/4] bg-light-gray">
        {/* Photo */}
        <Image
          src={stage.image}
          alt={stage.alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Dark gradient always visible at bottom */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Crimson overlay — slides up from bottom on hover */}
        <div className="absolute inset-0 bg-navy/80 translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0" />

        {/* Description — visible only on hover */}
        <div className="absolute inset-0 flex flex-col justify-center items-center px-6 opacity-0 translate-y-4 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-y-0">
          <p className="font-sans text-white text-sm leading-relaxed text-center">
            {stage.description}
          </p>
          <span className="mt-5 inline-flex items-center gap-2 font-sans text-xs font-semibold tracking-widest uppercase text-accent-red border border-accent-red px-4 py-2 transition-colors duration-300 group-hover:bg-accent-red group-hover:text-white">
            Learn more
            <ArrowRight size={12} />
          </span>
        </div>
      </div>

      {/* Label row */}
      <div className="flex items-center justify-between pt-4 pb-1 border-b border-school-divider transition-colors duration-300 group-hover:border-accent-red">
        <div>
          <span className="font-sans text-[0.95rem] font-medium text-school-heading group-hover:text-accent-red transition-colors duration-300">
            {stage.label}
          </span>
          <span className="font-sans text-xs text-school-subtle ml-2">({stage.ages})</span>
        </div>
        <ArrowRight
          size={15}
          className="text-school-subtle transition-all duration-300 group-hover:text-accent-red group-hover:translate-x-1"
        />
      </div>
    </a>
  )
}
