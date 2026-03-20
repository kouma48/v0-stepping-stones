'use client'

import { useEffect, useRef, ReactNode } from 'react'

// ─── Scroll-reveal wrapper ───────────────────────────────────────────────────

function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transitionDelay = `${delay}ms`
          el.classList.add('is-visible')
          observer.unobserve(el)
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  return (
    <div ref={ref} className={`reveal-on-scroll ${className}`}>
      {children}
    </div>
  )
}

// ─── Stats strip ────────────────────────────────────────────────────────────

const stats = [
  { value: '3–18', label: 'Ages welcomed' },
  { value: '250+', label: 'Pupils enrolled' },
  { value: '95%', label: 'University placement' },
  { value: '40+', label: 'Co-curricular activities' },
]

// ─── Main section ───────────────────────────────────────────────────────────

export default function SchoolIntroSection() {
  return (
    <section className="bg-background text-school-body font-sans overflow-hidden">

      {/* ── Top centred lockup ── */}
      <div className="flex flex-col items-center pt-20 pb-12 px-6">
        {/* Stepping stones SVG */}
        <Reveal>
          <svg
            width="28" height="36" viewBox="0 0 28 36"
            fill="none" xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true" className="text-crimson mb-3"
          >
            <ellipse cx="14" cy="30" rx="12" ry="4.5" fill="currentColor" opacity="0.25" />
            <ellipse cx="14" cy="20" rx="9"  ry="4"   fill="currentColor" opacity="0.5"  />
            <ellipse cx="14" cy="11" rx="6"  ry="3.5" fill="currentColor" opacity="0.75" />
            <ellipse cx="14" cy="4"  rx="3.5" ry="2.5" fill="currentColor" />
          </svg>
        </Reveal>

        {/* Vertical rule */}
        <div className="w-px h-8 bg-school-divider mb-6" />

        {/* Subtitle */}
        <Reveal delay={80}>
          <p className="text-[0.65rem] tracking-[0.3em] uppercase text-school-subtle font-sans font-semibold mb-3">
            Day School from Age 3–18&nbsp;&nbsp;•&nbsp;&nbsp;Boarding from 11–18
          </p>
        </Reveal>

        {/* Short rule */}
        <div className="w-8 h-px bg-school-divider mb-10" />

        {/* Main heading */}
        <Reveal delay={160} className="w-full">
          <h1 className="font-serif text-center text-[clamp(2.6rem,6.5vw,5.5rem)] leading-[1.08] tracking-tight text-school-heading text-balance max-w-4xl mx-auto">
            Nurturing{' '}
            <em className="text-crimson" style={{ fontStyle: 'italic' }}>principled</em>{' '}
            hearts<br className="hidden md:block" /> and{' '}
            <em className="text-crimson" style={{ fontStyle: 'italic' }}>brilliant</em>{' '}
            minds.
          </h1>
        </Reveal>
      </div>

      {/* ── Full-width rule ── */}
      <div className="w-full h-px bg-school-divider" />

      {/* ── Three-column body ── */}
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-school-divider">

        {/* Col 1 */}
        <Reveal delay={0} className="px-8 lg:px-12 py-14 space-y-5">
          <p className="text-[0.7rem] tracking-[0.25em] uppercase text-school-subtle font-semibold mb-6">
            Our Philosophy
          </p>
          <p className="text-[0.95rem] leading-relaxed text-school-body">
            When you choose Stepping Stones as the school for your son or daughter you open
            up a world of opportunities for them. Wherever a pupil starts their journey, we
            are confident that the thread of the Stepping Stones experience is consistently
            woven throughout their daily lives.
          </p>
          <p className="text-[0.95rem] leading-relaxed text-school-body">
            We help pupils to find meaning and purpose in their endeavours and fuel them with
            the optimism they need to believe that they can make a difference. We want pupils
            to love being at school and to throw themselves into the opportunities this
            wonderful place has to offer.
          </p>
        </Reveal>

        {/* Col 2 */}
        <Reveal delay={120} className="px-8 lg:px-12 py-14 space-y-5">
          <p className="text-[0.7rem] tracking-[0.25em] uppercase text-school-subtle font-semibold mb-6">
            Our Approach
          </p>
          <p className="text-[0.95rem] leading-relaxed text-school-body">
            At Stepping Stones we focus on teaching pupils how to have good relationships,
            both with each other and with the adults in their lives. Overall, we want their
            lives at school to be deeply engaging.
          </p>
          <p className="text-[0.95rem] leading-relaxed text-school-body">
            Happiness, we believe, is a consequence of doing these things well, rather than
            an end unto itself.
          </p>
          <div className="pt-4 border-t border-school-divider">
            <p className="text-crimson text-[0.88rem] font-sans tracking-wide">
              Mrs Sarah Thompson, MA, PGCE
            </p>
            <p className="text-school-body font-semibold text-[0.88rem] tracking-wide">
              Head of Stepping Stones School
            </p>
          </div>
        </Reveal>

        {/* Col 3 — blockquote */}
        <Reveal delay={240} className="relative px-8 lg:px-12 py-14 flex flex-col justify-center">
          {/* Decorative quote mark — bisects the left border */}
          <span
            className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 text-crimson font-serif leading-none select-none bg-background px-1"
            style={{ fontSize: '3.5rem', lineHeight: 1 }}
            aria-hidden="true"
          >
            &#8220;
          </span>
          <blockquote className="text-[1.08rem] leading-[1.85] text-crimson font-serif">
            At Stepping Stones we see education as being so much more than exam results. We
            see education as being about developing young women and men who are ready to make
            a meaningful difference to their communities.
          </blockquote>
        </Reveal>
      </div>

      {/* ── Full-width rule ── */}
      <div className="w-full h-px bg-school-divider" />

      {/* ── Stats strip ── */}
      <div className="max-w-screen-xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-school-divider">
        {stats.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 80} className="px-8 lg:px-12 py-10 text-center">
            <p
              className="font-serif text-[clamp(2rem,4vw,3rem)] leading-none text-school-heading mb-2"
            >
              {stat.value}
            </p>
            <p className="text-[0.65rem] tracking-[0.25em] uppercase text-school-subtle font-semibold">
              {stat.label}
            </p>
          </Reveal>
        ))}
      </div>

      {/* ── Full-width rule ── */}
      <div className="w-full h-px bg-school-divider" />

    </section>
  )
}
