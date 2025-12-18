import { memo } from 'react';

/**
 * VecnaVeins - Lightweight CSS/SVG-based vein effect
 * Stays behind all content with z-index: -10
 * Uses CSS animations instead of Three.js for better performance
 */
const VecnaVeins = memo(() => {
  // Pre-defined vein paths for organic look
  const veins = [
    // Left side veins (coming from left edge)
    { d: "M-50,100 Q50,150 150,120 T300,180 T450,160", delay: 0 },
    { d: "M-50,250 Q100,200 200,280 T400,250 T550,300", delay: 0.5 },
    { d: "M-50,400 Q80,450 180,380 T350,420 T500,400", delay: 1 },
    { d: "M-50,550 Q120,500 220,580 T400,540 T600,580", delay: 1.5 },
    { d: "M-50,700 Q60,750 160,700 T320,750 T480,720", delay: 2 },

    // Right side veins (coming from right edge)
    { d: "M1970,80 Q1850,120 1750,80 T1550,150 T1400,100", delay: 0.3 },
    { d: "M1970,220 Q1880,280 1780,240 T1600,290 T1450,260", delay: 0.8 },
    { d: "M1970,380 Q1820,350 1720,400 T1520,360 T1350,420", delay: 1.3 },
    { d: "M1970,520 Q1900,580 1800,530 T1620,580 T1480,540", delay: 1.8 },
    { d: "M1970,680 Q1850,720 1750,670 T1550,720 T1380,690", delay: 2.3 },

    // Top veins (coming from top)
    { d: "M200,-50 Q250,80 180,180 T220,350 T180,500", delay: 0.2 },
    { d: "M500,-50 Q450,100 520,200 T480,380 T520,550", delay: 0.7 },
    { d: "M900,-50 Q950,120 880,220 T920,400 T880,580", delay: 1.2 },
    { d: "M1300,-50 Q1250,80 1320,180 T1280,360 T1320,520", delay: 1.7 },
    { d: "M1700,-50 Q1750,100 1680,200 T1720,380 T1680,560", delay: 2.2 },

    // Bottom veins (coming from bottom)
    { d: "M300,1150 Q250,1000 320,880 T280,700 T320,550", delay: 0.4 },
    { d: "M700,1150 Q750,980 680,860 T720,680 T680,520", delay: 0.9 },
    { d: "M1100,1150 Q1050,1020 1120,900 T1080,720 T1120,560", delay: 1.4 },
    { d: "M1500,1150 Q1550,980 1480,860 T1520,680 T1480,520", delay: 1.9 },

    // Corner veins for organic spread
    { d: "M-30,-30 Q100,100 180,250 T300,400 T380,600", delay: 0.1 },
    { d: "M1950,-30 Q1820,80 1780,200 T1650,380 T1580,550", delay: 0.6 },
    { d: "M-30,1130 Q120,980 200,820 T320,650 T420,480", delay: 1.1 },
    { d: "M1950,1130 Q1800,1000 1720,850 T1600,680 T1500,500", delay: 1.6 },
  ];

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      <svg
        className="w-full h-full"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradient for vein color */}
          <linearGradient id="veinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6b0000" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#8b0000" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#6b0000" stopOpacity="0.8" />
          </linearGradient>

          {/* Glow filter */}
          <filter id="veinGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Render veins */}
        {veins.map((vein, index) => (
          <path
            key={index}
            d={vein.d}
            fill="none"
            stroke="url(#veinGradient)"
            strokeWidth={2 + (index % 3)}
            strokeLinecap="round"
            filter="url(#veinGlow)"
            opacity={0.5}
            style={{
              animation: `veinPulse 6s ease-in-out infinite`,
              animationDelay: `${vein.delay}s`,
            }}
          />
        ))}

        {/* Secondary thinner veins for detail */}
        {veins.slice(0, 12).map((vein, index) => (
          <path
            key={`thin-${index}`}
            d={vein.d}
            fill="none"
            stroke="#6b0000"
            strokeWidth={1}
            strokeLinecap="round"
            strokeDasharray="10,20"
            opacity={0.2}
            style={{
              animation: `veinPulse 8s ease-in-out infinite`,
              animationDelay: `${vein.delay + 1}s`,
            }}
          />
        ))}
      </svg>

      {/* CSS for animations */}
      <style>{`
        @keyframes veinPulse {
          0%, 100% {
            opacity: 0.2;
            stroke-width: 2;
          }
          50% {
            opacity: 0.4;
            stroke-width: 3;
          }
        }
      `}</style>
    </div>
  );
});

VecnaVeins.displayName = 'VecnaVeins';

export default VecnaVeins;

