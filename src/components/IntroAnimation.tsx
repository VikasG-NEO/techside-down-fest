import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import techxpressionLogo from '@/assets/techxpression-logo.png';

interface IntroAnimationProps {
  onComplete: () => void;
}

const IntroAnimation = ({ onComplete }: IntroAnimationProps) => {
  const [phase, setPhase] = useState<'logo' | 'subtitle' | 'fadeout'>('logo');
  const [visibleLetters, setVisibleLetters] = useState(0);
  const subtitle = "TECHSIDE DOWN";

  useEffect(() => {
    // Show logo for 2.5 seconds then move to subtitle
    if (phase === 'logo') {
      const timer = setTimeout(() => {
        setPhase('subtitle');
      }, 2500);
      return () => clearTimeout(timer);
    }

    // Letter by letter reveal for subtitle
    if (phase === 'subtitle' && visibleLetters < subtitle.length) {
      const timer = setTimeout(() => {
        setVisibleLetters(prev => prev + 1);
      }, 80);
      return () => clearTimeout(timer);
    }

    // Fade out after subtitle
    if (phase === 'subtitle' && visibleLetters >= subtitle.length) {
      const timer = setTimeout(() => {
        setPhase('fadeout');
      }, 1200);
      return () => clearTimeout(timer);
    }

    // Complete animation
    if (phase === 'fadeout') {
      const timer = setTimeout(() => {
        onComplete();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [phase, visibleLetters, onComplete]);

  const showSubtitle = phase === 'subtitle' || phase === 'fadeout';

  return (
    <AnimatePresence>
      {phase !== 'fadeout' ? (
        <motion.div
          className="fixed inset-0 z-50 bg-background flex items-center justify-center overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
        >
          {/* Smoke/Fog Background */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl smoke-effect"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${i * 1.5}s`,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ duration: 2 }}
              />
            ))}
          </div>

          {/* Center Red Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.15)_0%,transparent_50%)]" />

          {/* Scanlines Overlay */}
          <div className="absolute inset-0 scanlines opacity-20" />

          {/* Main Content */}
          <div className="relative z-10 text-center">
            {/* Logo Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="mb-8"
            >
              <motion.img
                src={techxpressionLogo}
                alt="TechXpression"
                className="max-w-[80vw] md:max-w-[600px] lg:max-w-[800px] h-auto mx-auto"
                animate={{
                  filter: [
                    'brightness(1) drop-shadow(0 0 20px rgba(220, 38, 38, 0.5))',
                    'brightness(1.2) drop-shadow(0 0 40px rgba(220, 38, 38, 0.8))',
                    'brightness(1) drop-shadow(0 0 20px rgba(220, 38, 38, 0.5))',
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />
            </motion.div>

            {/* Subtitle - appears after logo */}
            {showSubtitle && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-stranger tracking-[0.3em] text-foreground/80">
                  {subtitle.split('').map((letter, index) => {
                    const shouldShow = index < visibleLetters;
                    return (
                      <motion.span
                        key={index}
                        className={`inline-block ${letter === ' ' ? 'mx-2' : ''}`}
                        initial={{ opacity: 0, rotateX: 180, y: -20 }}
                        animate={
                          shouldShow
                            ? { opacity: 1, rotateX: 0, y: 0 }
                            : { opacity: 0, rotateX: 180, y: -20 }
                        }
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                      >
                        {letter === ' ' ? '\u00A0' : letter}
                      </motion.span>
                    );
                  })}
                </h2>
              </motion.div>
            )}

            {/* Glitch Lines */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.5, 0, 0.3, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
            >
              <div className="absolute top-1/4 left-0 right-0 h-[2px] bg-primary/50" />
              <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-primary/30" />
              <div className="absolute top-3/4 left-0 right-0 h-[2px] bg-primary/40" />
            </motion.div>
          </div>

          {/* Corner Decorations */}
          <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-primary/50" />
          <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-primary/50" />
          <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-primary/50" />
          <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-primary/50" />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default IntroAnimation;
