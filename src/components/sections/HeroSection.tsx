import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import NeonButton from '../NeonButton';
import techxpressionLogo from '@/assets/techxpression-logo.png';

const HeroSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Parallax Background */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 bg-gradient-to-b from-background via-background to-primary/10"
      />

      {/* Animated Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(220,38,38,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(220,38,38,0.03)_1px,transparent_1px)] bg-[size:100px_100px]" />

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div 
        style={{ opacity }}
        className="relative z-10 text-center px-4 max-w-5xl"
      >
        {/* Upside Down Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-6"
        >
          <span className="inline-block px-4 py-2 text-sm font-stranger tracking-widest text-primary border border-primary/30 rounded-full neon-border">
            <span className="upside-down-float">2025</span> • THE PORTAL OPENS
          </span>
        </motion.div>

        {/* Main Title - Logo Image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="mb-6"
        >
          <motion.img
            src={techxpressionLogo}
            alt="TechXpression"
            className="max-w-[80vw] md:max-w-[500px] lg:max-w-[600px] h-auto mx-auto"
            animate={{
              filter: [
                'brightness(1) drop-shadow(0 0 10px rgba(220, 38, 38, 0.3))',
                'brightness(1.1) drop-shadow(0 0 25px rgba(220, 38, 38, 0.6))',
                'brightness(1) drop-shadow(0 0 10px rgba(220, 38, 38, 0.3))',
              ]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="text-2xl md:text-4xl font-stranger tracking-[0.3em] text-foreground/70 mb-8"
        >
          TECHSIDE <span className="upside-down text-primary">DOWN</span>
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 font-sans"
        >
          Enter the portal to the ultimate tech experience. Where innovation meets the unknown. 
          Join us for a journey through code, creativity, and the extraordinary.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <NeonButton variant="primary" size="lg">
            Register Now
          </NeonButton>
          <NeonButton variant="outline" size="lg">
            Explore Events
          </NeonButton>
        </motion.div>

        {/* Event Date */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-12 flex items-center justify-center gap-8 text-muted-foreground"
        >
          <div className="text-center">
            <div className="text-3xl font-display text-primary neon-text-subtle">15-17</div>
            <div className="text-sm font-stranger tracking-wider">MARCH</div>
          </div>
          <div className="w-px h-12 bg-primary/30" />
          <div className="text-center">
            <div className="text-3xl font-display text-primary neon-text-subtle">2025</div>
            <div className="text-sm font-stranger tracking-wider">THE YEAR</div>
          </div>
          <div className="w-px h-12 bg-primary/30" />
          <div className="text-center">
            <div className="text-3xl font-display text-primary neon-text-subtle">∞</div>
            <div className="text-sm font-stranger tracking-wider">POSSIBILITIES</div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center pt-2"
        >
          <motion.div className="w-1 h-2 bg-primary rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
