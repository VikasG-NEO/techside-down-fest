import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import vecna from '@/assets/vecna.png';

interface IntroAnimationProps {
  onComplete: () => void;
}

// Generate vein path
const generateVeinPath = (startX: number, startY: number, length: number, direction: 'up' | 'down' | 'left' | 'right') => {
  let path = `M ${startX} ${startY}`;
  let x = startX;
  let y = startY;
  
  for (let i = 0; i < length; i++) {
    const variation = Math.random() * 20 - 10;
    
    switch (direction) {
      case 'up':
        y -= 15 + Math.random() * 15;
        x += variation;
        break;
      case 'down':
        y += 15 + Math.random() * 15;
        x += variation;
        break;
      case 'left':
        x -= 15 + Math.random() * 15;
        y += variation;
        break;
      case 'right':
        x += 15 + Math.random() * 15;
        y += variation;
        break;
    }
    
    path += ` L ${x} ${y}`;
  }
  
  return path;
};

const IntroAnimation = ({ onComplete }: IntroAnimationProps) => {
  const [phase, setPhase] = useState<'title' | 'subtitle' | 'fadeout'>('title');
  const [visibleLetters, setVisibleLetters] = useState(0);
  const title = "TECHXPRESSION";
  const subtitle = "TECHSIDE DOWN";

  // Pre-generate veins
  const [veins] = useState(() => [
    { path: generateVeinPath(0, 300, 20, 'right'), delay: 0 },
    { path: generateVeinPath(0, 500, 18, 'right'), delay: 0.3 },
    { path: generateVeinPath(0, 700, 22, 'right'), delay: 0.6 },
    { path: generateVeinPath(1920, 400, 20, 'left'), delay: 0.2 },
    { path: generateVeinPath(1920, 600, 18, 'left'), delay: 0.5 },
    { path: generateVeinPath(1920, 800, 22, 'left'), delay: 0.8 },
    { path: generateVeinPath(500, 0, 15, 'down'), delay: 0.1 },
    { path: generateVeinPath(960, 0, 18, 'down'), delay: 0.4 },
    { path: generateVeinPath(1400, 0, 15, 'down'), delay: 0.7 },
    { path: generateVeinPath(400, 1080, 15, 'up'), delay: 0.2 },
    { path: generateVeinPath(960, 1080, 18, 'up'), delay: 0.5 },
    { path: generateVeinPath(1500, 1080, 15, 'up'), delay: 0.8 },
  ]);

  useEffect(() => {
    if (phase === 'title' && visibleLetters < title.length) {
      const timer = setTimeout(() => {
        setVisibleLetters(prev => prev + 1);
      }, 120);
      return () => clearTimeout(timer);
    }
    
    if (phase === 'title' && visibleLetters >= title.length) {
      const timer = setTimeout(() => {
        setPhase('subtitle');
        setVisibleLetters(0);
      }, 600);
      return () => clearTimeout(timer);
    }

    if (phase === 'subtitle' && visibleLetters < subtitle.length) {
      const timer = setTimeout(() => {
        setVisibleLetters(prev => prev + 1);
      }, 80);
      return () => clearTimeout(timer);
    }

    if (phase === 'subtitle' && visibleLetters >= subtitle.length) {
      const timer = setTimeout(() => {
        setPhase('fadeout');
      }, 1200);
      return () => clearTimeout(timer);
    }

    if (phase === 'fadeout') {
      const timer = setTimeout(() => {
        onComplete();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [phase, visibleLetters, onComplete]);

  const showTitle = phase === 'title' || phase === 'subtitle' || phase === 'fadeout';
  const showSubtitle = phase === 'subtitle' || phase === 'fadeout';

  return (
    <AnimatePresence>
      {phase !== 'fadeout' ? (
        <motion.div
          className="fixed inset-0 z-50 bg-background flex items-center justify-center overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
        >
          {/* Vecna Veins SVG Overlay */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 1920 1080"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <filter id="intro-vein-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {veins.map((vein, index) => (
              <motion.path
                key={index}
                d={vein.path}
                fill="none"
                stroke="hsl(0, 72%, 40%)"
                strokeWidth="3"
                strokeLinecap="round"
                filter="url(#intro-vein-glow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: 1,
                  opacity: [0, 0.8, 0.6],
                }}
                transition={{
                  duration: 3,
                  delay: vein.delay,
                  ease: "easeOut",
                }}
              />
            ))}
          </svg>

          {/* Vecna silhouette in background */}
          <motion.div
            className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 0.15, x: 0 }}
            transition={{ duration: 2, delay: 0.5 }}
          >
            <img
              src={vecna}
              alt=""
              className="h-[80vh] w-auto object-contain"
              style={{
                filter: 'brightness(0.3) saturate(2) hue-rotate(-10deg)',
                maskImage: 'linear-gradient(to left, black 30%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to left, black 30%, transparent 100%)',
              }}
            />
          </motion.div>

          {/* Smoke/Fog Background */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl smoke-effect"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${20 + i * 10}%`,
                  animationDelay: `${i * 1.5}s`,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ duration: 2 }}
              />
            ))}
          </div>

          {/* Center Red Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.2)_0%,transparent_50%)]" />

          {/* Scanlines Overlay */}
          <div className="absolute inset-0 scanlines opacity-20" />

          {/* Main Content */}
          <div className="relative z-10 text-center">
            {/* Decorative Line Above Title */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="w-48 md:w-64 h-[2px] bg-primary mx-auto mb-4 origin-center"
              style={{
                boxShadow: '0 0 10px hsl(var(--primary)), 0 0 20px hsl(var(--primary) / 0.5)'
              }}
            />

            {/* Main Title */}
            <motion.div className="mb-2">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-stranger tracking-[0.1em] stranger-title">
                {title.split('').map((letter, index) => (
                  <motion.span
                    key={index}
                    className="inline-block"
                    initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                    animate={
                      index < visibleLetters && showTitle
                        ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                        : { opacity: 0, y: 30, filter: 'blur(10px)' }
                    }
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </h1>
            </motion.div>

            {/* Subtitle */}
            {showSubtitle && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-xl md:text-3xl lg:text-4xl font-stranger tracking-[0.4em] text-foreground/70">
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
