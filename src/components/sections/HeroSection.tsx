import { motion } from 'framer-motion';
import { useMemo, memo } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import NeonButton from '../NeonButton';
import Countdown from '../Countdown';

const HeroSection = memo(() => {
  const isMobile = useIsMobile();

  // Static particles - no animation, just positioned dots
  const particles = useMemo(() => {
    const count = isMobile ? 0 : 8; // Disabled on mobile, reduced on desktop
    return [...Array(count)].map((_, i) => ({
      id: i,
      left: `${15 + i * 10}%`,
      top: `${20 + (i % 3) * 25}%`,
    }));
  }, [isMobile]);

  // One-time entry animations only (no continuous animations)
  const entryVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay, duration: 0.5, ease: 'easeOut' as const }
    })
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Static Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-primary/10" />

      {/* Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(220,38,38,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(220,38,38,0.03)_1px,transparent_1px)] bg-[size:100px_100px]" />

      {/* Static particles - no animation */}
      <div className="absolute inset-0">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-primary/40 rounded-full"
            style={{ left: particle.left, top: particle.top }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl">
        {/* Decorative Line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="w-24 md:w-48 h-[2px] bg-primary mx-auto mb-4"
          style={{
            boxShadow: '0 0 10px hsl(var(--primary)), 0 0 20px hsl(var(--primary) / 0.5)'
          }}
        />

        {/* Main Title */}
        <motion.h1
          variants={entryVariants}
          initial="hidden"
          animate="visible"
          custom={0.3}
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-stranger tracking-[0.05em] md:tracking-[0.1em] stranger-title mb-2"
        >
          TECHXPRESSION
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={entryVariants}
          initial="hidden"
          animate="visible"
          custom={0.4}
          className="text-xl sm:text-2xl md:text-4xl font-stranger tracking-[0.15em] md:tracking-[0.3em] text-foreground/70 mb-6 md:mb-8"
        >
          TECHSIDE <span className="upside-down text-primary">DOWN</span>
        </motion.p>

        {/* Description */}
        <motion.p
          variants={entryVariants}
          initial="hidden"
          animate="visible"
          custom={0.5}
          className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 md:mb-10 font-sans px-2"
        >
          {isMobile
            ? "Enter the portal to the ultimate tech experience. Join us for innovation and creativity."
            : "Enter the portal to the ultimate tech experience. Where innovation meets the unknown. Join us for a journey through code, creativity, and the extraordinary."
          }
        </motion.p>

        {/* Countdown Timer */}
        <motion.div
          variants={entryVariants}
          initial="hidden"
          animate="visible"
          custom={0.6}
          className="mb-8 md:mb-10"
        >
          <p className="text-xs md:text-sm font-stranger tracking-[0.2em] md:tracking-[0.3em] text-muted-foreground mb-3 md:mb-4">
            THE PORTAL OPENS IN
          </p>
          <Countdown />
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          variants={entryVariants}
          initial="hidden"
          animate="visible"
          custom={0.7}
          className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center"
        >
          <NeonButton variant="primary" size={isMobile ? 'md' : 'lg'}>
            Register Now
          </NeonButton>
          <NeonButton variant="outline" size={isMobile ? 'md' : 'lg'}>
            Explore Events
          </NeonButton>
        </motion.div>

        {/* Event Date */}
        <motion.div
          variants={entryVariants}
          initial="hidden"
          animate="visible"
          custom={0.8}
          className="mt-8 md:mt-12 flex items-center justify-center gap-4 md:gap-8 text-muted-foreground"
        >
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-display text-primary neon-text-subtle">30-31</div>
            <div className="text-xs md:text-sm font-stranger tracking-wider">JANUARY</div>
          </div>
          <div className="w-px h-8 md:h-12 bg-primary/30" />
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-display text-primary neon-text-subtle">2026</div>
            <div className="text-xs md:text-sm font-stranger tracking-wider">THE YEAR</div>
          </div>
          <div className="w-px h-8 md:h-12 bg-primary/30" />
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-display text-primary neon-text-subtle">2</div>
            <div className="text-xs md:text-sm font-stranger tracking-wider">DAYS</div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator - CSS animation instead of framer-motion */}
      {!isMobile && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block animate-bounce">
          <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-primary rounded-full" />
          </div>
        </div>
      )}
    </section>
  );
});

HeroSection.displayName = 'HeroSection';

export default HeroSection;
