import Image from 'next/image'
import Link from 'next/link'

// Base URL for all internal links
const BASE_URL = 'https://steppingstones.co.ke'

export default function FooterCtaSection() {
  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center overflow-hidden">
      {/* Background image */}
      <Image
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DSC_4204-TbIbJ20xZirfQ8zlDLd5WNQHd9vlNo.jpg"
        alt="Stepping Stones School interior courtyard"
        fill
        className="object-cover"
        sizes="100vw"
        loading="lazy"
      />

      {/* Dark overlay for text readability */}
      <div 
        className="absolute inset-0" 
        style={{ 
          background: 'linear-gradient(to bottom, rgba(10, 36, 99, 0.6) 0%, rgba(10, 36, 99, 0.5) 50%, rgba(10, 36, 99, 0.65) 100%)' 
        }} 
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 md:px-12 max-w-4xl mx-auto">
        {/* Heading */}
        <h2 
          className="font-serif text-[clamp(2rem,5vw,3.5rem)] leading-[1.15] text-balance mb-12 text-white"
        >
          We would love to discuss your place at Stepping Stones.
        </h2>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
          <a
            href={`${BASE_URL}/contact-us/`}
            className="px-10 py-4 text-sm font-sans font-semibold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:brightness-110"
            style={{ background: 'var(--color-accent-red)' }}
          >
            Inquire
          </a>
          <a
            href={`${BASE_URL}/apply-now/`}
            className="px-10 py-4 text-sm font-sans font-semibold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:brightness-110"
            style={{ background: 'var(--color-accent-red)' }}
          >
            Apply
          </a>
          <a
            href={`${BASE_URL}/book-a-visit/`}
            className="px-10 py-4 text-sm font-sans font-semibold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:brightness-110"
            style={{ background: 'var(--color-accent-red)' }}
          >
            Arrange a Tour
          </a>
        </div>
      </div>
    </section>
  )
}
