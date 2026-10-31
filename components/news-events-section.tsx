'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { ArrowUpRight, Clock } from 'lucide-react'

const BASE_URL = 'https://steppingstones.co.ke'

const decodeHtmlEntities = (text: string): string => {
  const entities: Record<string, string> = {
    '&amp;': '&', '&#038;': '&', '&lt;': '<', '&#060;': '<', '&gt;': '>',
    '&#062;': '>', '&quot;': '"', '&#034;': '"', '&#8211;': '–', '&#8212;': '—',
    '&#039;': "'", '&#047;': '/',
  }
  return Object.entries(entities).reduce((result, [entity, value]) => result.replace(new RegExp(entity, 'g'), value), text)
}

interface NewsArticle {
  id: string | number
  title: string
  author: string
  date: string
  excerpt: string
  image: string
  link: string
}

interface CalendarEvent {
  date: string
  month: string
  title: string
  time: string
  link?: string
  description?: string
}

const FALLBACK_NEWS: NewsArticle[] = [
  { id: 1, title: 'Curiosity in action: learning beyond the classroom', author: 'School Life', date: 'Feb 26 2026', excerpt: 'Our students are exploring, creating and solving real-world problems through hands-on learning, guided by passionate teachers and a culture of curiosity.', image: '/images/news-feature-1.jpg', link: '#' },
  { id: 2, title: 'Leadership in action: our student council', author: 'Our Community', date: 'Mar 15 2026', excerpt: 'Meet the students shaping school life with purpose, energy and a generous spirit.', image: '/images/news-feature-2.jpg', link: '#' },
  { id: 3, title: 'Building bright futures, together', author: 'Academic Excellence', date: 'Mar 20 2026', excerpt: 'A closer look at the people and ideas inspiring our next generation.', image: '/images/news-feature-3.jpg', link: '#' },
]

const UPCOMING_EVENTS: CalendarEvent[] = [
  { date: '23', month: 'Mar', title: 'Fourth Quarter Begins', time: 'All day', description: 'The start of our fourth quarter. A time for renewed focus, continued growth and finishing the year strong.' },
  { date: '25', month: 'Mar', title: 'National Honor Society Induction Ceremony', time: '6:30 PM – 8:30 PM', description: 'Join us as we celebrate our new inductees and their commitment to scholarship, leadership, service and character.' },
  { date: '26', month: 'Mar', title: 'Board of Directors Meeting', time: '6:00 PM – 9:00 PM', description: 'Regular meeting of the Stepping Stones School Board of Directors.' },
]

export default function NewsEventsSection() {
  const [featuredNews, setFeaturedNews] = useState(FALLBACK_NEWS)
  const [upcomingEvents, setUpcomingEvents] = useState(UPCOMING_EVENTS)

  useEffect(() => {
    const controller = new AbortController()
    fetch('/api/news', { signal: controller.signal }).then((res) => res.ok ? res.json() : null).then((data) => {
      if (data?.length) setFeaturedNews(data)
    }).catch(() => undefined)
    return () => controller.abort()
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    fetch('/api/events', { signal: controller.signal }).then((res) => res.ok ? res.json() : null).then((data) => {
      if (data?.length) setUpcomingEvents(data.slice(0, 3))
    }).catch(() => undefined)
    return () => controller.abort()
  }, [])

  const featured = featuredNews[0]
  const supporting = featuredNews.slice(1, 3)

  return (
    <section className="overflow-hidden bg-[#0d3156] py-20 text-[#f7f5f0] md:py-24">
      <div className="mx-auto max-w-[1500px] px-6 md:px-12">
        <header className="mb-10 max-w-5xl">
          <p className="mb-3 font-sans text-xs font-bold uppercase tracking-[0.32em] text-[#ff4d57]">Life at Stepping Stones</p>
          <h2 className="font-serif text-[clamp(3rem,6vw,5.6rem)] leading-[0.95] tracking-[-0.035em]">Stories, moments &amp; milestones<span className="text-[#ff4d57]">.</span></h2>
          <p className="mt-4 font-sans text-lg text-white/85 md:text-xl">Discover what&apos;s happening across our school community.</p>
        </header>

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.7fr)_minmax(360px,0.9fr)] lg:gap-9">
          <div>
            <SectionLabel>Latest News</SectionLabel>
            <article>
              <a href={featured.link} className="group block">
                <div className="relative aspect-[2.35/1] overflow-hidden bg-white/10">
                  <Image src={featured.image} alt={featured.title} fill className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" sizes="(min-width: 1024px) 65vw, 100vw" unoptimized />
                </div>
                {featured.author && !featured.author.toLowerCase().includes('komondi') && <p className="mt-4 font-sans text-xs font-bold uppercase tracking-[0.24em] text-[#ff4d57]">{featured.author}</p>}
                <h3 className="mt-2 max-w-4xl font-serif text-3xl leading-tight md:text-4xl">{decodeHtmlEntities(featured.title)}</h3>
                <p className="mt-2 max-w-3xl font-sans text-base leading-relaxed text-white/80 md:text-lg">{decodeHtmlEntities(featured.excerpt)}</p>
                <StoryLink />
              </a>
            </article>

            <div className="mt-7 grid gap-7 border-t border-white/20 pt-7 md:grid-cols-2">
              {supporting.map((article) => (
                <article key={article.id} className="grid gap-5 sm:grid-cols-[minmax(130px,0.8fr)_1fr]">
                  <a href={article.link} className="relative aspect-[1.45/1] overflow-hidden bg-white/10">
                    <Image src={article.image} alt={article.title} fill className="object-cover transition-transform duration-700 hover:scale-[1.04]" sizes="(min-width: 768px) 20vw, 90vw" unoptimized />
                  </a>
                  <div>
                    {article.author && !article.author.toLowerCase().includes('komondi') && <p className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-[#ff4d57]">{article.author}</p>}
                    <h3 className="mt-2 font-serif text-xl leading-tight">{decodeHtmlEntities(article.title)}</h3>
                    <StoryLink />
                  </div>
                </article>
              ))}
            </div>
            <a href={`${BASE_URL}/news/`} target="_top" className="mt-8 inline-flex items-center gap-2 border-b-2 border-[#ff4d57] pb-2 font-sans text-xs font-bold uppercase tracking-[0.22em] hover:text-[#ffb0b3]">View all news <ArrowUpRight className="h-4 w-4" /></a>
          </div>

          <aside className="border-l border-white/25 pl-8 lg:pl-12">
            <SectionLabel>Upcoming Events</SectionLabel>
            <div>
              {upcomingEvents.map((event, index) => (
                <article key={`${event.date}-${event.title}`} className={`grid grid-cols-[102px_1fr] gap-5 py-8 ${index === 0 ? 'pt-3' : 'border-t border-dashed border-white/20'}`}>
                  <div className="border-r border-white/35 pr-5 text-center">
                    <p className="font-serif text-6xl leading-none">{event.date}</p>
                    <p className="mt-3 font-sans text-xs font-semibold uppercase tracking-[0.28em]">{event.month}</p>
                  </div>
                  <div>
                    <h3 className="font-serif text-xl leading-tight md:text-2xl">{decodeHtmlEntities(event.title)}</h3>
                    <div className="mt-4 flex items-center gap-2 font-sans text-sm text-white/75"><Clock className="h-4 w-4" />{event.time}</div>
                    {event.description && <p className="mt-3 font-sans text-sm leading-relaxed text-white/75">{decodeHtmlEntities(event.description)}</p>}
                  </div>
                </article>
              ))}
            </div>
            <a href={`${BASE_URL}/events/`} target="_top" className="mt-2 flex items-center justify-center gap-2 border border-white/70 px-5 py-3 font-sans text-xs font-semibold uppercase tracking-[0.22em] transition-colors hover:bg-white hover:text-[#0d3156]">View full calendar <ArrowUpRight className="h-4 w-4" /></a>
          </aside>
        </div>
      </div>
    </section>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <div className="mb-4 flex items-center gap-4 font-sans text-xs font-bold uppercase tracking-[0.3em]"><span>{children}</span><span className="h-[2px] w-10 bg-[#ff4d57]" /></div>
}

function StoryLink() {
  return <span className="mt-4 inline-flex items-center gap-2 border-b-2 border-[#ff4d57] pb-2 font-sans text-[10px] font-bold uppercase tracking-[0.22em]">Read story <ArrowUpRight className="h-3.5 w-3.5" /></span>
}
