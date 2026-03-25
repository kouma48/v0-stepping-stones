import Image from 'next/image'
import Link from 'next/link'
import { Facebook, Twitter, Youtube, Linkedin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#0a2463] text-white">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        {/* Top section with logo and CTA */}
        <div className="text-center mb-16 pb-16 border-b border-white/20">
          {/* School Logo */}
          <div className="mb-6 flex justify-center">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Copy%20of%20stepping%20stones%20%20logo%20white%20%283%29-aAtNWkmhyFZYigdigK1lpwHS42fmVe.png"
              alt="Stepping Stones School Logo"
              width={100}
              height={100}
              className="w-auto h-auto"
            />
          </div>

          {/* School Name */}
          <div className="mb-8">
            <p className="font-serif text-sm text-white/80 tracking-widest">
              THE
            </p>
            <p className="font-serif text-xl font-semibold text-white tracking-widest">
              STEPPING STONES
            </p>
            <p className="font-serif text-sm text-white/80 tracking-widest">
              SCHOOLS
            </p>
          </div>

          {/* CTA buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 max-w-2xl mx-auto mb-8 border border-white/30">
            <Link
              href="/apply/"
              className="px-8 py-5 text-white font-sans font-light text-lg tracking-wide hover:bg-white/10 transition-colors duration-300 border-r border-white/30 text-center"
            >
              Apply Now
            </Link>
            <Link
              href="/book-a-visit/"
              className="px-8 py-5 text-white font-sans font-light text-lg tracking-wide hover:bg-white/10 transition-colors duration-300 text-center"
            >
              Book Now
            </Link>
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
                <Link href="/about/" className="hover:text-white transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/leadership/" className="hover:text-white transition-colors">
                  Our Leadership
                </Link>
              </li>
              <li>
                <Link href="/campus/" className="hover:text-white transition-colors">
                  Our Campus
                </Link>
              </li>
              <li>
                <Link href="/careers/" className="hover:text-white transition-colors">
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
                <Link href="/apply/" className="hover:text-white transition-colors">
                  Apply
                </Link>
              </li>
              <li>
                <Link href="/book-a-visit/" className="hover:text-white transition-colors">
                  Book a Visit
                </Link>
              </li>
              <li>
                <Link href="/tuition/" className="hover:text-white transition-colors">
                  Tuition
                </Link>
              </li>
              <li>
                <Link href="/contact/" className="hover:text-white transition-colors">
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
                <Link href="/kindergarten/" className="hover:text-white transition-colors">
                  Kindergarten
                </Link>
              </li>
              <li>
                <Link href="/lower-primary/" className="hover:text-white transition-colors">
                  Lower Primary
                </Link>
              </li>
              <li>
                <Link href="/upper-primary/" className="hover:text-white transition-colors">
                  Upper Primary
                </Link>
              </li>
              <li>
                <Link href="/junior-secondary/" className="hover:text-white transition-colors">
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
