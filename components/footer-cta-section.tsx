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
      <div className="relative z-10 flex flex-col items-center text-center px-6 md:px-12 max-w-5xl mx-auto">
        {/* CTA buttons - Winchester College style with borders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 w-full max-w-3xl mb-20 border border-white/30">
          <a
            href="/apply-now/"
            className="px-8 md:px-12 py-8 md:py-10 text-white font-sans font-light text-xl md:text-2xl tracking-wide hover:bg-white/10 transition-colors duration-300 border-r border-white/30 text-center"
          >
            Apply Now
          </a>
          <a
            href="/book-a-visit/"
            className="px-8 md:px-12 py-8 md:py-10 text-white font-sans font-light text-xl md:text-2xl tracking-wide hover:bg-white/10 transition-colors duration-300 text-center"
          >
            Book Now
          </a>
        </div>

        {/* Tagline - Large semi-transparent elegant text (Winchester style) */}
        <h3 className="font-serif text-6xl md:text-7xl lg:text-8xl text-white/25 tracking-widest font-light text-balance leading-tight">
          EMBRACING<br />EXCELLENCE
        </h3>
      </div>
    </section>
  )
}
