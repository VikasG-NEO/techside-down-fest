import { useRef, useEffect, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioSrc = "/audio/bgsong.mp3";
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
    }
  }, []);

  // Auto-play on mount
  useEffect(() => {
    const playAudio = async () => {
      if (audioRef.current) {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (error) {
          // Browser may block autoplay, add click listener to start
          const startAudio = () => {
            audioRef.current?.play();
            setIsPlaying(true);
            document.removeEventListener('click', startAudio);
          };
          document.addEventListener('click', startAudio);
        }
      }
    };
    playAudio();
  }, []);

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.muted = false;
        // Try to play if not already playing
        if (audioRef.current.paused) {
          audioRef.current.play();
          setIsPlaying(true);
        }
      } else {
        audioRef.current.muted = true;
      }
      setIsMuted(!isMuted);
    }
  };

  return (
    <>
      <audio ref={audioRef} src={audioSrc} loop />

      {/* Mute/Unmute Button - Fixed at bottom right */}
      <motion.button
        onClick={toggleMute}
        className="fixed bottom-4 right-4 z-50 p-3 md:p-4 rounded-full bg-card/80 backdrop-blur-sm border border-primary/30 shadow-lg shadow-primary/10 hover:bg-card hover:border-primary/50 transition-all duration-300 group"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 200 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isMuted ? 'Unmute background music' : 'Mute background music'}
      >
        <AnimatePresence mode="wait">
          {isMuted ? (
            <motion.div
              key="muted"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <VolumeX className="w-5 h-5 md:w-6 md:h-6 text-muted-foreground group-hover:text-primary transition-colors" />
            </motion.div>
          ) : (
            <motion.div
              key="unmuted"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Volume2 className="w-5 h-5 md:w-6 md:h-6 text-primary group-hover:text-primary transition-colors" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sound wave animation when playing */}
        {isPlaying && !isMuted && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-primary/50"
            initial={{ scale: 1, opacity: 0.5 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
          />
        )}
      </motion.button>
    </>
  );
};

export default AudioPlayer;
