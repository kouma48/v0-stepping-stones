'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

const STAGES = [
  {
    id: 'earlyyears',
    label: 'Early Years - Kindergarten',
    ages: 'Ages 3–6',
    image: '/images/learning-earlyyears.jpg',
    alt: 'Kindergarten children playing on colorful playground equipment',
    href: '#early-years',
  },
  {
    id: 'upperprimary',
    label: 'Upper Primary',
    ages: 'Ages 7–11',
    image: '/images/learning-upperprimary.jpg',
    alt: 'Teacher helping upper primary students with art activity',
    href: '#upper-primary',
  },
  {
    id: 'senior',
    label: 'Senior School',
    ages: 'Ages 13–16',
    image: '/images/learning-senior.jpg',
    alt: 'Senior school student at whiteboard',
    href: '#senior',
  },
  {
    id: 'sixthform',
    label: 'Sixth Form',
    ages: 'Ages 16–18',
    image: '/images/learning-sixthform.jpg',
    alt: 'Sixth form students reviewing work together',
    href: '#sixth-form',
  },
]

export default function LearningSection() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  return (
    <section className="bg-background py-20 md:py-28">
      <div className="mx-auto px-6 md:px-10 max-w-[1440px]">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-sans text-xs font-semibold tracking-[0.2em] uppercase text-accent-red mb-4">
            Learning at Stepping Stones
          </p>
          <h2 className="font-serif text-[clamp(1.9rem,4vw,3.2rem)] leading-[1.12] text-school-heading text-balance max-w-3xl mx-auto">
            Where principled hearts and brilliant minds take shape.
          </h2>
        </div>

        {/* 4-column grid — nearly full width */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {STAGES.map((stage) => {
            const isHovered = hoveredId === stage.id
            return (
              <a
                key={stage.id}
                href={stage.href}
                className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-red"
                onMouseEnter={() => setHoveredId(stage.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  transform: isHovered ? 'translateY(-10px)' : 'translateY(0)',
                  transition: 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
                }}
                aria-label={`${stage.label} — ${stage.ages}`}
              >
                {/* Image */}
                <div
                  className="relative overflow-hidden aspect-[3/4]"
                  style={{
                    boxShadow: isHovered
                      ? '0 24px 48px -8px rgba(0,0,0,0.22)'
                      : '0 4px 12px -2px rgba(0,0,0,0.08)',
                    transition: 'box-shadow 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
                  }}
                >
                  <Image
                    src={stage.image}
                    alt={stage.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out"
                    style={{
                      transform: isHovered ? 'scale(1.04)' : 'scale(1)',
                    }}
                  />
                </div>

                {/* Label row — no border */}
                <div className="flex items-center justify-between pt-5">
                  <div>
                    <span className="font-serif text-[1.1rem] text-school-heading block leading-tight">
                      {stage.label}
                    </span>
                    <span className="font-sans text-sm text-school-subtle">
                      ({stage.ages})
                    </span>
                  </div>

                  {/* Arrow — no underline, slides right on hover, turns accent-red */}
                  <div
                    style={{
                      transform: isHovered ? 'translateX(5px)' : 'translateX(0)',
                      color: isHovered ? '#c11f1e' : '#2D3748',
                      transition: 'transform 0.35s cubic-bezier(0.22,1,0.36,1), color 0.3s ease',
                    }}
                  >
                    <ArrowRight size={22} strokeWidth={1.5} />
                  </div>
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
