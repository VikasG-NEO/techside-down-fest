import { motion } from 'framer-motion';

const MindFlayer = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-5 overflow-hidden">
      {/* Sky glow effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(220,38,38,0.08)_0%,transparent_60%)]" />
      
      {/* Mind Flayer silhouette */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[20%]"
        animate={{
          rotate: [0, 5, -5, 3, -3, 0],
          scale: [1, 1.02, 1, 1.01, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg
          width="800"
          height="600"
          viewBox="0 0 800 600"
          className="opacity-[0.15]"
          style={{
            filter: 'blur(2px)',
          }}
        >
          {/* Main body */}
          <motion.ellipse
            cx="400"
            cy="350"
            rx="80"
            ry="120"
            fill="hsl(0, 50%, 20%)"
            animate={{
              ry: [120, 125, 120],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          {/* Head */}
          <motion.ellipse
            cx="400"
            cy="200"
            rx="60"
            ry="70"
            fill="hsl(0, 50%, 18%)"
            animate={{
              ry: [70, 75, 70],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          {/* Tentacles/Legs - Left side */}
          {[...Array(6)].map((_, i) => (
            <motion.path
              key={`left-${i}`}
              d={`M ${380 - i * 10} ${300 + i * 30} 
                  Q ${250 - i * 40} ${350 + i * 50} ${100 - i * 30} ${450 + i * 40}
                  Q ${50 - i * 20} ${500 + i * 30} ${-50 + i * 10} ${550 + i * 20}`}
              fill="none"
              stroke="hsl(0, 50%, 18%)"
              strokeWidth={12 - i}
              strokeLinecap="round"
              animate={{
                d: [
                  `M ${380 - i * 10} ${300 + i * 30} 
                   Q ${250 - i * 40} ${350 + i * 50} ${100 - i * 30} ${450 + i * 40}
                   Q ${50 - i * 20} ${500 + i * 30} ${-50 + i * 10} ${550 + i * 20}`,
                  `M ${380 - i * 10} ${300 + i * 30} 
                   Q ${260 - i * 40} ${340 + i * 50} ${110 - i * 30} ${440 + i * 40}
                   Q ${60 - i * 20} ${490 + i * 30} ${-40 + i * 10} ${540 + i * 20}`,
                  `M ${380 - i * 10} ${300 + i * 30} 
                   Q ${250 - i * 40} ${350 + i * 50} ${100 - i * 30} ${450 + i * 40}
                   Q ${50 - i * 20} ${500 + i * 30} ${-50 + i * 10} ${550 + i * 20}`,
                ],
              }}
              transition={{
                duration: 6 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3,
              }}
            />
          ))}
          
          {/* Tentacles/Legs - Right side */}
          {[...Array(6)].map((_, i) => (
            <motion.path
              key={`right-${i}`}
              d={`M ${420 + i * 10} ${300 + i * 30} 
                  Q ${550 + i * 40} ${350 + i * 50} ${700 + i * 30} ${450 + i * 40}
                  Q ${750 + i * 20} ${500 + i * 30} ${850 - i * 10} ${550 + i * 20}`}
              fill="none"
              stroke="hsl(0, 50%, 18%)"
              strokeWidth={12 - i}
              strokeLinecap="round"
              animate={{
                d: [
                  `M ${420 + i * 10} ${300 + i * 30} 
                   Q ${550 + i * 40} ${350 + i * 50} ${700 + i * 30} ${450 + i * 40}
                   Q ${750 + i * 20} ${500 + i * 30} ${850 - i * 10} ${550 + i * 20}`,
                  `M ${420 + i * 10} ${300 + i * 30} 
                   Q ${540 + i * 40} ${360 + i * 50} ${690 + i * 30} ${460 + i * 40}
                   Q ${740 + i * 20} ${510 + i * 30} ${840 - i * 10} ${560 + i * 20}`,
                  `M ${420 + i * 10} ${300 + i * 30} 
                   Q ${550 + i * 40} ${350 + i * 50} ${700 + i * 30} ${450 + i * 40}
                   Q ${750 + i * 20} ${500 + i * 30} ${850 - i * 10} ${550 + i * 20}`,
                ],
              }}
              transition={{
                duration: 6 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3 + 0.15,
              }}
            />
          ))}
          
          {/* Upper tentacles */}
          {[...Array(4)].map((_, i) => (
            <motion.path
              key={`upper-${i}`}
              d={`M ${370 + i * 20} ${200} 
                  Q ${350 + i * 25 - 50} ${100 - i * 20} ${320 + i * 40 - 30} ${20 - i * 10}`}
              fill="none"
              stroke="hsl(0, 50%, 18%)"
              strokeWidth={8 - i}
              strokeLinecap="round"
              animate={{
                d: [
                  `M ${370 + i * 20} ${200} 
                   Q ${350 + i * 25 - 50} ${100 - i * 20} ${320 + i * 40 - 30} ${20 - i * 10}`,
                  `M ${370 + i * 20} ${200} 
                   Q ${360 + i * 25 - 50} ${110 - i * 20} ${330 + i * 40 - 30} ${30 - i * 10}`,
                  `M ${370 + i * 20} ${200} 
                   Q ${350 + i * 25 - 50} ${100 - i * 20} ${320 + i * 40 - 30} ${20 - i * 10}`,
                ],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.2,
              }}
            />
          ))}
        </svg>
      </motion.div>

      {/* Red lightning/energy effect */}
      <motion.div
        className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[600px] h-[400px]"
        animate={{
          opacity: [0, 0.3, 0, 0.2, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg width="100%" height="100%" viewBox="0 0 600 400">
          <motion.path
            d="M 300 350 L 280 250 L 320 260 L 290 150 L 330 170 L 300 50"
            fill="none"
            stroke="hsl(0, 100%, 50%)"
            strokeWidth="2"
            filter="url(#lightning-glow)"
            animate={{
              d: [
                "M 300 350 L 280 250 L 320 260 L 290 150 L 330 170 L 300 50",
                "M 300 350 L 290 250 L 310 260 L 300 150 L 320 170 L 310 50",
                "M 300 350 L 280 250 L 320 260 L 290 150 L 330 170 L 300 50",
              ],
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
            }}
          />
          <defs>
            <filter id="lightning-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
        </svg>
      </motion.div>

      {/* Atmospheric particles around Mind Flayer */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px]">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/50 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0, 0.6, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default MindFlayer;
