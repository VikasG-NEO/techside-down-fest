import { motion } from 'framer-motion';

const VecnaVeins = () => {
  // Generate random vein paths
  const generateVeinPath = (startX: number, startY: number, length: number, direction: 'up' | 'down' | 'left' | 'right') => {
    let path = `M ${startX} ${startY}`;
    let x = startX;
    let y = startY;
    
    for (let i = 0; i < length; i++) {
      const variation = Math.random() * 30 - 15;
      
      switch (direction) {
        case 'up':
          y -= 20 + Math.random() * 20;
          x += variation;
          break;
        case 'down':
          y += 20 + Math.random() * 20;
          x += variation;
          break;
        case 'left':
          x -= 20 + Math.random() * 20;
          y += variation;
          break;
        case 'right':
          x += 20 + Math.random() * 20;
          y += variation;
          break;
      }
      
      const cx1 = x + (Math.random() * 20 - 10);
      const cy1 = y + (Math.random() * 20 - 10);
      path += ` Q ${cx1} ${cy1} ${x} ${y}`;
    }
    
    return path;
  };

  const veins = [
    // Left side veins
    { path: generateVeinPath(0, 200, 25, 'right'), delay: 0 },
    { path: generateVeinPath(0, 400, 20, 'right'), delay: 0.5 },
    { path: generateVeinPath(0, 600, 30, 'right'), delay: 1 },
    { path: generateVeinPath(0, 800, 22, 'right'), delay: 1.5 },
    // Right side veins
    { path: generateVeinPath(1920, 300, 25, 'left'), delay: 0.3 },
    { path: generateVeinPath(1920, 500, 20, 'left'), delay: 0.8 },
    { path: generateVeinPath(1920, 700, 28, 'left'), delay: 1.3 },
    { path: generateVeinPath(1920, 900, 18, 'left'), delay: 1.8 },
    // Top veins
    { path: generateVeinPath(400, 0, 15, 'down'), delay: 0.2 },
    { path: generateVeinPath(800, 0, 18, 'down'), delay: 0.7 },
    { path: generateVeinPath(1200, 0, 20, 'down'), delay: 1.2 },
    { path: generateVeinPath(1600, 0, 16, 'down'), delay: 1.7 },
    // Bottom veins
    { path: generateVeinPath(300, 1080, 15, 'up'), delay: 0.4 },
    { path: generateVeinPath(700, 1080, 20, 'up'), delay: 0.9 },
    { path: generateVeinPath(1100, 1080, 18, 'up'), delay: 1.4 },
    { path: generateVeinPath(1500, 1080, 22, 'up'), delay: 1.9 },
    // Corner veins
    { path: generateVeinPath(0, 0, 20, 'right'), delay: 0.1 },
    { path: generateVeinPath(1920, 0, 20, 'left'), delay: 0.6 },
    { path: generateVeinPath(0, 1080, 18, 'right'), delay: 1.1 },
    { path: generateVeinPath(1920, 1080, 18, 'left'), delay: 1.6 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      <svg
        className="w-full h-full"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Glow filter */}
          <filter id="vein-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          
          {/* Gradient for veins */}
          <linearGradient id="vein-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(0, 72%, 30%)" stopOpacity="0" />
            <stop offset="50%" stopColor="hsl(0, 72%, 40%)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="hsl(0, 72%, 30%)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {veins.map((vein, index) => (
          <g key={index}>
            {/* Main vein */}
            <motion.path
              d={vein.path}
              fill="none"
              stroke="url(#vein-gradient)"
              strokeWidth="3"
              strokeLinecap="round"
              filter="url(#vein-glow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: [0, 1, 1, 0],
                opacity: [0, 0.7, 0.7, 0],
              }}
              transition={{
                duration: 8,
                delay: vein.delay,
                repeat: Infinity,
                repeatDelay: 2,
                ease: "easeInOut",
              }}
            />
            
            {/* Pulsing overlay */}
            <motion.path
              d={vein.path}
              fill="none"
              stroke="hsl(0, 100%, 50%)"
              strokeWidth="1"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: [0, 1],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 4,
                delay: vein.delay + 1,
                repeat: Infinity,
                repeatDelay: 6,
                ease: "easeOut",
              }}
            />
          </g>
        ))}
      </svg>
    </div>
  );
};

export default VecnaVeins;
