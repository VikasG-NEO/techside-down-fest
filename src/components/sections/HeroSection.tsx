import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useMemo, memo } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import NeonButton from '../NeonButton';
import Countdown from '../Countdown';

const HeroSection = memo(() => {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // Disable parallax on mobile for better performance
  const y = useTransform(scrollYProgress, [0, 1], isMobile ? ['0%', '0%'] : ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Reduce particles on mobile (20 -> 6)
  const particles = useMemo(() => {
    const count = isMobile ? 6 : 20;
    return [...Array(count)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 2,
    }));
  }, [isMobile]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Parallax Background - simplified on mobile */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 bg-gradient-to-b from-background via-background to-primary/10"
      />

      {/* Animated Grid - static on mobile */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(220,38,38,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(220,38,38,0.03)_1px,transparent_1px)] bg-[size:100px_100px]" />

      {/* Floating Particles - reduced on mobile */}
      {!isMobile && (
        <div className="absolute inset-0">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute w-1 h-1 bg-primary rounded-full"
              style={{ left: particle.left, top: particle.top }}
              animate={{ y: [0, -30, 0], opacity: [0.2, 0.8, 0.2] }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
              }}
            />
          ))}
        </div>
      )}

      {/* Content */}
      <motion.div
        style={{ opacity: isMobile ? 1 : opacity }}
        className="relative z-10 text-center px-4 max-w-5xl"
      >
        {/* Decorative Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="w-24 md:w-48 h-[2px] bg-primary mx-auto mb-4"
          style={{
            boxShadow: '0 0 10px hsl(var(--primary)), 0 0 20px hsl(var(--primary) / 0.5)'
          }}
        />

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-stranger tracking-[0.05em] md:tracking-[0.1em] stranger-title mb-2"
        >
          TECHXPRESSION
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-xl sm:text-2xl md:text-4xl font-stranger tracking-[0.15em] md:tracking-[0.3em] text-foreground/70 mb-6 md:mb-8"
        >
          TECHSIDE <span className="upside-down text-primary">DOWN</span>
        </motion.p>

        {/* Description - shorter on mobile */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 md:mb-10 font-sans px-2"
        >
          {isMobile
            ? "Enter the portal to the ultimate tech experience. Join us for innovation and creativity."
            : "Enter the portal to the ultimate tech experience. Where innovation meets the unknown. Join us for a journey through code, creativity, and the extraordinary."
          }
        </motion.p>

        {/* Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-8 md:mb-10"
        >
          <p className="text-xs md:text-sm font-stranger tracking-[0.2em] md:tracking-[0.3em] text-muted-foreground mb-3 md:mb-4">
            THE PORTAL OPENS IN
          </p>
          <Countdown />
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center"
        >
          <NeonButton variant="primary" size={isMobile ? 'md' : 'lg'}>
            Register Now
          </NeonButton>
          <NeonButton variant="outline" size={isMobile ? 'md' : 'lg'}>
            Explore Events
          </NeonButton>
        </motion.div>

        {/* Event Date - stacked on mobile */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
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
      </motion.div>

      {/* Scroll Indicator - hidden on mobile */}
      {!isMobile && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center pt-2"
          >
            <motion.div className="w-1 h-2 bg-primary rounded-full" />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
});

HeroSection.displayName = 'HeroSection';

export default HeroSection;
