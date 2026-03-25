import Image from 'next/image'
import Link from 'next/link'

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
        priority
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
        {/* School Logo */}
        <div className="mb-8 md:mb-12">
          <Image
            src="/images/stepping-stones-logo-white.png"
            alt="Stepping Stones School Logo"
            width={120}
            height={120}
          />
        </div>

        {/* School Name */}
        <div className="mb-12">
          <p className="font-serif text-lg md:text-xl text-white/90 tracking-widest">
            THE
          </p>
          <p className="font-serif text-2xl md:text-3xl text-white font-semibold tracking-widest">
            STEPPING STONES
          </p>
          <p className="font-serif text-lg md:text-xl text-white/90 tracking-widest">
            SCHOOLS
          </p>
        </div>

        {/* CTA buttons - Apply Now and Book Now */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 w-full max-w-2xl mb-16 border border-white/30">
          <Link
            href="/apply-now/"
            className="px-8 md:px-12 py-6 md:py-8 text-white font-sans font-light text-xl md:text-2xl tracking-wide hover:bg-white/10 transition-colors duration-300 border-r border-white/30 text-center"
          >
            Apply Now
          </Link>
          <Link
            href="/book-a-visit/"
            className="px-8 md:px-12 py-6 md:py-8 text-white font-sans font-light text-xl md:text-2xl tracking-wide hover:bg-white/10 transition-colors duration-300 text-center"
          >
            Book Now
          </Link>
        </div>

        {/* Embracing Excellence tagline */}
        <h3 className="font-serif text-3xl md:text-5xl text-white/40 tracking-widest font-light">
          EMBRACING EXCELLENCE
        </h3>
      </div>
    </section>
  )
}
