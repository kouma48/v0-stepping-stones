import HeroCarousel from '@/components/hero-carousel'
import SchoolIntroSection from '@/components/school-intro-section'
import ScrollGallery from '@/components/scroll-gallery'
import LearningSection from '@/components/learning-section'
import BeyondClassroomSection from '@/components/beyond-classroom-section'

export default function Home() {
  return (
    <main>
      <HeroCarousel />
      <SchoolIntroSection />
      <ScrollGallery />
      <LearningSection />
      <BeyondClassroomSection />
    </main>
  )
}
