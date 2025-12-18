import { useState, lazy, Suspense, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import IntroAnimation from '@/components/IntroAnimation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AudioPlayer from '@/components/AudioPlayer';

// Lazy load heavy sections for better initial load
const HeroSection = lazy(() => import('@/components/sections/HeroSection'));
const AboutSection = lazy(() => import('@/components/sections/AboutSection'));
const EventsSection = lazy(() => import('@/components/sections/EventsSection'));
const ScheduleSection = lazy(() => import('@/components/sections/ScheduleSection'));
const GallerySection = lazy(() => import('@/components/sections/GallerySection'));
const SponsorsSection = lazy(() => import('@/components/sections/SponsorsSection'));

// Lazy load atmosphere components (heavy on mobile)
const VecnaVeins = lazy(() => import('@/components/VecnaVeins'));
const StrangerThingsCharacters = lazy(() => import('@/components/StrangerThingsCharacters'));
const AnimatedVines = lazy(() => import('@/components/AnimatedVines'));
const MindFlayer = lazy(() => import('@/components/MindFlayer'));

// Simple loading placeholder
const SectionLoader = () => (
  <div className="min-h-[50vh] flex items-center justify-center">
    <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const Index = () => {
  const [showIntro, setShowIntro] = useState(true);
  const isMobile = useIsMobile();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Detect reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Skip intro on mobile for faster load
  const shouldShowIntro = showIntro && !isMobile;

  // Disable heavy atmosphere effects on mobile or reduced motion
  const showAtmosphere = !isMobile && !prefersReducedMotion;

  return (
    <>
      {shouldShowIntro && (
        <IntroAnimation onComplete={() => setShowIntro(false)} />
      )}

      <div className={`min-h-screen bg-background transition-opacity duration-500 ${shouldShowIntro ? 'opacity-0' : 'opacity-100'}`}>
        {/* Stranger Things Atmosphere Elements - only on desktop */}
        {showAtmosphere && (
          <Suspense fallback={null}>
            <MindFlayer />
            <VecnaVeins />
            <AnimatedVines />
            <StrangerThingsCharacters />
          </Suspense>
        )}

        <Navbar />

        <main className="relative z-10">
          <Suspense fallback={<SectionLoader />}>
            <HeroSection />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <AboutSection />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <EventsSection />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <ScheduleSection />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <GallerySection />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <SponsorsSection />
          </Suspense>
        </main>

        <Footer />

        <AudioPlayer />
      </div>
    </>
  );
};

export default Index;
