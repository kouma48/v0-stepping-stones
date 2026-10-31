import Image from 'next/image'

const stats = [
  { value: '16+', label: 'Years of excellence' },
  { value: '1,500+', label: 'Learners in our community' },
  { value: '500+', label: 'Girls supported annually' },
  { value: '15+', label: 'Community projects' },
]

export default function SchoolIntroSection() {
  return (
    <section className="overflow-hidden bg-[#fbfaf7] text-[#10223a]">
      <div className="grid min-h-[680px] lg:grid-cols-[0.92fr_1.08fr]">
        <div className="flex flex-col justify-center px-8 py-20 sm:px-14 lg:px-[7vw] lg:py-24">
          <p className="font-sans text-xs font-bold uppercase tracking-[0.28em] text-[#d8212b]">Welcome to Stepping Stones</p>
          <span className="mt-6 block h-px w-16 bg-[#d8212b]" />
          <h2 className="mt-8 max-w-[650px] font-serif text-[clamp(3.2rem,5.5vw,6rem)] leading-[0.94] tracking-[-0.045em]">
            Nurturing <em className="text-[#d8212b]">principled</em> hearts and <em className="text-[#d8212b]">brilliant</em> minds.
          </h2>
          <p className="mt-8 max-w-xl font-sans text-lg leading-relaxed text-[#637084] md:text-xl">A Christ-centred school where every child is known, encouraged and inspired to make a difference.</p>
          <a href="#about" className="mt-10 inline-flex w-fit border-b-2 border-[#e52a32] pb-2 font-sans text-xs font-bold uppercase tracking-[0.24em] text-[#10223a] transition-colors hover:text-[#d8212b]">Discover our story <span className="ml-2">↗</span></a>
        </div>

        <div className="relative min-h-[480px] lg:min-h-0">
          <Image src="/images/news-feature-1.jpg" alt="A Stepping Stones teacher learning alongside students in class" fill priority className="object-cover" sizes="(min-width: 1024px) 58vw, 100vw" />
          <div className="absolute right-0 bottom-0 max-w-[430px] border-l-[8px] border-[#e52a32] bg-[#062746] px-8 py-8 text-white sm:px-12 sm:py-10">
            <p className="font-serif text-2xl italic leading-tight sm:text-3xl">Education is about more than exam results.</p>
            <span className="mt-6 block h-px w-14 bg-white/60" />
            <p className="mt-5 font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-white/80">Lily Kitala, Principal</p>
          </div>
          <span className="absolute right-8 top-8 h-16 w-16 border-r-4 border-t-4 border-[#d8212b]" aria-hidden="true" />
        </div>
      </div>

      <div className="grid border-t border-[#dfe2e5] sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div key={stat.label} className={`px-6 py-10 text-center lg:py-11 ${index > 0 ? 'border-t border-[#dfe2e5] sm:border-l sm:border-t-0' : ''}`}>
            <p className="font-serif text-[clamp(2.8rem,4vw,4rem)] leading-none">{stat.value}</p>
            <p className="mx-auto mt-4 max-w-[210px] font-sans text-[10px] font-bold uppercase tracking-[0.24em] text-[#6b7585]">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
