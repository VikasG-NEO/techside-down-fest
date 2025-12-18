import { useState, useEffect, memo } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// Memoized time unit component to prevent unnecessary re-renders
const TimeUnit = memo(({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center">
    {/* Number Box - using CSS animations instead of framer-motion */}
    <div className="relative w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-card border border-primary/30 rounded-lg flex items-center justify-center neon-border overflow-hidden">
      {/* Glowing Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent" />

      {/* Number - static, no animation on change */}
      <span className="relative text-3xl md:text-4xl lg:text-5xl font-display text-primary neon-text-subtle tabular-nums">
        {String(value).padStart(2, '0')}
      </span>
    </div>

    {/* Label */}
    <span className="mt-2 text-xs md:text-sm font-stranger tracking-wider text-muted-foreground">
      {label}
    </span>
  </div>
));

TimeUnit.displayName = 'TimeUnit';

// Static separator - no animation
const Separator = memo(() => (
  <div className="flex flex-col gap-1 mx-1 md:mx-2">
    <div className="w-1.5 h-1.5 rounded-full bg-primary opacity-80" />
    <div className="w-1.5 h-1.5 rounded-full bg-primary opacity-80" />
  </div>
));

Separator.displayName = 'Separator';

const Countdown = memo(() => {
  const targetDate = new Date('2026-01-30T00:00:00');

  const calculateTimeLeft = (): TimeLeft => {
    const difference = targetDate.getTime() - new Date().getTime();

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center justify-center">
      <TimeUnit value={timeLeft.days} label="DAYS" />
      <Separator />
      <TimeUnit value={timeLeft.hours} label="HOURS" />
      <Separator />
      <TimeUnit value={timeLeft.minutes} label="MINS" />
      <Separator />
      <TimeUnit value={timeLeft.seconds} label="SECS" />
    </div>
  );
});

Countdown.displayName = 'Countdown';

export default Countdown;
