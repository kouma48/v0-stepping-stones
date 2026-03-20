export default function SchoolIntroSection() {
  return (
    <section className="bg-background text-school-body font-sans py-16 px-6 md:px-12 lg:px-20">
      {/* Top icon + rule */}
      <div className="flex flex-col items-center mb-8">
        {/* Stepping stones icon — stylised stacked stones SVG */}
        <svg
          width="28"
          height="36"
          viewBox="0 0 28 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="text-crimson mb-3"
        >
          {/* Stone 1 – bottom */}
          <ellipse cx="14" cy="30" rx="12" ry="4.5" fill="currentColor" opacity="0.25" />
          {/* Stone 2 – middle */}
          <ellipse cx="14" cy="20" rx="9" ry="4" fill="currentColor" opacity="0.5" />
          {/* Stone 3 – top */}
          <ellipse cx="14" cy="11" rx="6" ry="3.5" fill="currentColor" opacity="0.75" />
          {/* Stone 4 – cap */}
          <ellipse cx="14" cy="4" rx="3.5" ry="2.5" fill="currentColor" />
        </svg>

        {/* Vertical line */}
        <div className="w-px h-8 bg-school-divider mb-6" />

        {/* Subtitle */}
        <p className="text-xs tracking-[0.25em] uppercase text-school-subtle font-sans font-medium mb-3">
          Day School from Age 3–18&nbsp;&nbsp;•&nbsp;&nbsp;Boarding from 11–18
        </p>

        {/* Short horizontal rule */}
        <div className="w-10 h-px bg-school-subtle" />
      </div>

      {/* Main heading */}
      <h1 className="font-serif text-center text-[clamp(2.4rem,6vw,5rem)] leading-[1.1] tracking-tight text-school-heading text-balance mb-16">
        A{' '}
        <em className="text-crimson font-serif" style={{ fontStyle: 'italic' }}>
          nurturing
        </em>{' '}
        independent school
      </h1>

      {/* Three-column content */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 lg:gap-16">
        {/* Column 1 */}
        <div className="space-y-5 text-[0.95rem] leading-relaxed text-school-body">
          <p>
            When you choose Stepping Stones as the school for your son or daughter you open up a
            world of opportunities for them. Wherever a pupil starts their journey, we are confident
            that the thread of the Stepping Stones experience is consistently woven throughout their
            daily lives.
          </p>
          <p>
            We help pupils to find meaning and purpose in their endeavours and fuel them with the
            optimism they need to believe that they can make a difference. We want pupils to love
            being at school and to throw themselves into the opportunities this wonderful place has
            to offer.
          </p>
        </div>

        {/* Column 2 */}
        <div className="space-y-5 text-[0.95rem] leading-relaxed text-school-body">
          <p>
            At Stepping Stones we focus on teaching pupils how to have good relationships, both with
            each other and with the adults in their lives. Overall, we want their lives at school to
            be deeply engaging.
          </p>
          <p>
            Happiness, we believe, is a consequence of doing these things well, rather than an end
            unto itself.
          </p>
          <div className="pt-2">
            <p className="text-crimson text-[0.92rem] font-sans">
              Mrs Sarah Thompson, MA, PGCE
            </p>
            <p className="text-school-body font-semibold text-[0.92rem]">
              Head of Stepping Stones School
            </p>
          </div>
        </div>

        {/* Column 3 — blockquote */}
        <div className="relative border-l-2 border-school-divider pl-8">
          {/* Large decorative quote mark */}
          <span
            className="absolute -top-1 left-4 text-crimson font-serif leading-none select-none"
            style={{ fontSize: '3.5rem', lineHeight: 1 }}
            aria-hidden="true"
          >
            &#8220;
          </span>
          <blockquote className="pt-8 text-[1.05rem] leading-[1.65] text-crimson font-serif italic">
            At Stepping Stones we see education as being so much more than exam results. We see
            education as being about developing young women and men who are ready to make a
            meaningful difference to their communities.
          </blockquote>
        </div>
      </div>
    </section>
  )
}
