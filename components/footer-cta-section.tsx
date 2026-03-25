import Image from 'next/image'
import Link from 'next/link'

export default function FooterCtaSection() {
  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center overflow-hidden bg-[#0a2463]">
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 md:px-12 max-w-4xl mx-auto">
        {/* School Logo */}
        <div className="mb-12 w-[140px] h-[140px] relative">
          <Image
            src="/images/stepping-stones-logo-white.png"
            alt="Stepping Stones School Logo"
            fill
            className="object-contain"
          />
        </div>

        {/* Heading */}
        <h2 
          className="font-serif text-[clamp(2rem,5vw,3.5rem)] leading-[1.15] text-balance mb-12 text-white"
        >
          We would love to discuss your place at Stepping Stones.
        </h2>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
          <a
            href="/contact-us/"
            target="_parent"
            className="px-10 py-4 text-sm font-sans font-semibold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:brightness-110"
            style={{ background: 'var(--color-accent-red)' }}
          >
            Inquire
          </a>
          <a
            href="/apply-now/"
            target="_parent"
            className="px-10 py-4 text-sm font-sans font-semibold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:brightness-110"
            style={{ background: 'var(--color-accent-red)' }}
          >
            Apply
          </a>
          <a
            href="/book-a-visit/"
            target="_parent"
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
