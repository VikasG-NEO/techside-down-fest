import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Volume1 } from 'lucide-react';
import { motion } from 'framer-motion';

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const audioSrc = "/audio/bgsong.mp3";

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Auto-play on mount
  useEffect(() => {
    const playAudio = async () => {
      if (audioRef.current) {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (error) {
          // Browser may block autoplay, user will need to click play
          console.log('Autoplay blocked by browser');
        }
      }
    };
    playAudio();
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const setVolumeLevel = (level: number) => {
    setVolume(level);
    setIsMuted(false);
  };

  const VolumeIcon = isMuted || volume === 0 
    ? VolumeX 
    : volume < 0.5 
      ? Volume1 
      : Volume2;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="fixed bottom-6 right-6 z-40 flex items-center gap-3 bg-card/95 backdrop-blur-sm px-4 py-3 rounded-lg border border-primary/40 shadow-lg shadow-primary/20"
    >
      <audio ref={audioRef} src={audioSrc} loop />
      
      {/* Play/Pause Button - Circular */}
      <button
        onClick={togglePlay}
        className="w-12 h-12 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center hover:bg-primary/30 transition-colors shadow-[0_0_15px_hsl(var(--primary)/0.5)]"
        aria-label={isPlaying ? 'Pause' : 'Play'}
      >
        {isPlaying ? (
          <Pause className="w-5 h-5 text-primary" />
        ) : (
          <Play className="w-5 h-5 text-primary ml-0.5" />
        )}
      </button>

      {/* Volume Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={toggleMute}
          className="p-1.5 rounded-full hover:bg-primary/20 transition-colors"
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          <VolumeIcon className="w-5 h-5 text-muted-foreground" />
        </button>

        {/* Volume Dots */}
        <div className="flex gap-1.5 items-center">
          {[0.33, 0.66, 1].map((level, i) => (
            <button
              key={level}
              onClick={() => setVolumeLevel(level)}
              className={`w-2 h-2 rounded-full transition-all ${
                volume >= level && !isMuted
                  ? 'bg-primary shadow-[0_0_6px_hsl(var(--primary))]'
                  : 'bg-muted-foreground/40 hover:bg-muted-foreground/60'
              }`}
              aria-label={`Set volume to ${Math.round(level * 100)}%`}
            />
          ))}
        </div>
      </div>

      {/* PRESS PLAY Text */}
      <span className="text-sm text-muted-foreground font-stranger tracking-wider ml-2">
        {isPlaying ? 'NOW PLAYING' : 'PRESS PLAY'}
      </span>
    </motion.div>
  );
};

export default AudioPlayer;
