import Image from 'next/image'
import Link from 'next/link'

export default function FooterCtaSection() {
  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/footer-cta-bg.jpg"
        alt="Students collaborating at Stepping Stones School"
        fill
        className="object-cover"
        sizes="100vw"
        priority={false}
      />

      {/* Light overlay for text readability */}
      <div 
        className="absolute inset-0" 
        style={{ 
          background: 'linear-gradient(to bottom, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.25) 50%, rgba(255,255,255,0.4) 100%)' 
        }} 
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 md:px-12 max-w-4xl mx-auto">
        {/* School logo */}
        <div className="mb-10 relative w-[140px] h-[140px]">
          <Image
            src="/images/stepping-stones-logo-white.png"
            alt="Stepping Stones School Logo"
            fill
            className="object-contain drop-shadow-lg"
            style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.15))' }}
          />
        </div>

        {/* Heading */}
        <h2 
          className="font-serif text-[clamp(2rem,5vw,3.5rem)] leading-[1.15] text-balance mb-12"
          style={{ color: 'var(--color-school-heading)' }}
        >
          We would love to discuss your place at Stepping Stones.
        </h2>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
          <Link
            href="#inquire"
            className="px-10 py-4 text-sm font-sans font-semibold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:brightness-110"
            style={{ background: 'var(--color-accent-red)' }}
          >
            Inquire
          </Link>
          <Link
            href="#apply"
            className="px-10 py-4 text-sm font-sans font-semibold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:brightness-110"
            style={{ background: 'var(--color-accent-red)' }}
          >
            Apply
          </Link>
          <Link
            href="#tour"
            className="px-10 py-4 text-sm font-sans font-semibold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:brightness-110"
            style={{ background: 'var(--color-accent-red)' }}
          >
            Arrange a Tour
          </Link>
        </div>
      </div>
    </section>
  )
}
