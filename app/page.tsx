import HeroCarousel from '@/components/hero-carousel'
import SchoolIntroSection from '@/components/school-intro-section'
import ScrollGallery from '@/components/scroll-gallery'
import LearningSection from '@/components/learning-section'
import BeyondClassroomSection from '@/components/beyond-classroom-section'
import NewsEventsSection from '@/components/news-events-section'
import FooterCtaSection from '@/components/footer-cta-section'

export default function Home() {
  return (
    <main>
      <HeroCarousel />
      <SchoolIntroSection />
      <ScrollGallery />
      <LearningSection />
      <BeyondClassroomSection />
      <NewsEventsSection />
      <FooterCtaSection />
    </main>
  )
}
