import Image from 'next/image'
import Link from 'next/link'
import { Facebook, Twitter, Youtube, Linkedin } from 'lucide-react'

// Base URL for all internal links
const BASE_URL = 'https://steppingstones.co.ke'

export default function Footer() {
  return (
    <footer className="bg-[#0a2463] text-white">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        {/* Top section with logo and CTA - Winchester College style */}
        <div className="text-center mb-20 pb-20 border-b border-white/20">
          {/* School Logo */}
          <div className="mb-12 flex justify-center">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Copy%20of%20stepping%20stones%20%20logo%20white%20%283%29-aAtNWkmhyFZYigdigK1lpwHS42fmVe.png"
              alt="Stepping Stones School Logo"
              width={120}
              height={120}
              className="w-auto h-auto"
            />
          </div>

          {/* CTA buttons - Winchester style bordered boxes - wider */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 w-full max-w-5xl mx-auto mb-24 border border-white/30">
            <Link
              href={`${BASE_URL}/apply-now/`}
              target="_top"
              className="px-8 md:px-16 py-10 md:py-12 text-white font-sans font-light text-2xl md:text-3xl tracking-widest hover:bg-white/10 transition-colors duration-300 border-r border-white/30 text-center uppercase"
            >
              Apply Now
            </Link>
            <Link
              href={`${BASE_URL}/book-a-visit/`}
              target="_top"
              className="px-8 md:px-16 py-10 md:py-12 text-white font-sans font-light text-2xl md:text-3xl tracking-widest hover:bg-white/10 transition-colors duration-300 text-center uppercase"
            >
              Book Now
            </Link>
          </div>

          {/* Large tagline - Winchester College style semi-transparent - single line */}
          <div className="relative left-1/2 -translate-x-1/2 overflow-hidden text-center" style={{ width: '70vw' }}>
            <h2
              className="font-serif text-white/25 tracking-widest font-light whitespace-nowrap"
              style={{ fontSize: 'clamp(1.5rem, 4.5vw, 3.5rem)' }}
            >
              EMBRACING EXCELLENCE
            </h2>
          </div>
        </div>

        {/* Four column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1: Contact Info */}
          <div>
            <h4 className="font-sans font-semibold text-sm tracking-widest uppercase mb-6 text-white">
              Stepping Stones Schools
            </h4>
            <ul className="space-y-3 text-sm text-white/75">
              <li className="leading-relaxed">
                Namanga Road Estate (Opp. EPZA) P.O. Box 57754 - 00200 Nairobi, Kenya.
              </li>
              <li>
                Main Office: <a href="tel:+254722854897" className="hover:text-white transition-colors">+254 722 854 897</a>
              </li>
              <li>
                <a href="mailto:info@steppingstones.sc.ke" className="hover:text-white transition-colors">
                  info@steppingstones.sc.ke
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: About Us */}
          <div>
            <h4 className="font-sans font-semibold text-sm tracking-widest uppercase mb-6 text-white">
              About Us
            </h4>
            <ul className="space-y-2 text-sm text-white/75">
              <li>
                <Link href={`${BASE_URL}/our-story/`} target="_top" className="hover:text-white transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href={`${BASE_URL}/our-leadership/`} target="_top" className="hover:text-white transition-colors">
                  Our Leadership
                </Link>
              </li>
              <li>
                <Link href={`${BASE_URL}/our-campus/`} target="_top" className="hover:text-white transition-colors">
                  Our Campus
                </Link>
              </li>
              <li>
                <Link href={`${BASE_URL}/careers/`} target="_top" className="hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Admissions */}
          <div>
            <h4 className="font-sans font-semibold text-sm tracking-widest uppercase mb-6 text-white">
              Admissions
            </h4>
            <ul className="space-y-2 text-sm text-white/75">
              <li>
                <Link href={`${BASE_URL}/apply-now/`} target="_top" className="hover:text-white transition-colors">
                  Apply
                </Link>
              </li>
              <li>
                <Link href={`${BASE_URL}/book-a-visit/`} target="_top" className="hover:text-white transition-colors">
                  Book a Visit
                </Link>
              </li>
              <li>
                <Link href={`${BASE_URL}/tuition/`} target="_top" className="hover:text-white transition-colors">
                  Tuition
                </Link>
              </li>
              <li>
                <Link href={`${BASE_URL}/contact-us/`} target="_top" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Academics */}
          <div>
            <h4 className="font-sans font-semibold text-sm tracking-widest uppercase mb-6 text-white">
              Academics
            </h4>
            <ul className="space-y-2 text-sm text-white/75">
              <li>
                <Link href={`${BASE_URL}/kindergarten/`} target="_top" className="hover:text-white transition-colors">
                  Kindergarten
                </Link>
              </li>
              <li>
                <Link href={`${BASE_URL}/lower-primary/`} target="_top" className="hover:text-white transition-colors">
                  Lower Primary
                </Link>
              </li>
              <li>
                <Link href={`${BASE_URL}/upper-primary/`} target="_top" className="hover:text-white transition-colors">
                  Upper Primary
                </Link>
              </li>
              <li>
                <Link href={`${BASE_URL}/junior-secondary/`} target="_top" className="hover:text-white transition-colors">
                  Junior Secondary
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section with copyright and social */}
        <div className="pt-8 border-t border-white/20 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-white/60 text-center md:text-left">
            © 2026 The Stepping Stones Schools - All rights reserved
          </p>
          
          {/* Social Media Icons */}
          <div className="flex gap-4">
            <a
              href="https://facebook.com/steppingstones"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-8 h-8 rounded-full border border-white/50 flex items-center justify-center hover:bg-white/10 hover:border-white transition-all"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="https://twitter.com/steppingstones"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="w-8 h-8 rounded-full border border-white/50 flex items-center justify-center hover:bg-white/10 hover:border-white transition-all"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href="https://youtube.com/steppingstones"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="w-8 h-8 rounded-full border border-white/50 flex items-center justify-center hover:bg-white/10 hover:border-white transition-all"
            >
              <Youtube className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com/company/steppingstones"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-8 h-8 rounded-full border border-white/50 flex items-center justify-center hover:bg-white/10 hover:border-white transition-all"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
